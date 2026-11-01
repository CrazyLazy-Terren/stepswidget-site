import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { NEW_ARTICLE_BASE_PATH, isValidSlug, log, saveArticle, storeConfig, type NewArticle } from '@/app/(en)/newarticle/store'

export const dynamic = 'force-dynamic'

const EVENT_TYPES = new Set(['publish_articles', 'update_articles'])

type WebhookPayload = {
  event_type?: string
  timestamp?: string
  data?: { articles?: Partial<NewArticle>[] }
}

// Receives articles from the publishing service and saves them for /newarticle.
// Auth: `Authorization: Bearer <POSTARTICLE_WEBHOOK_SECRET>`.
export async function POST(request: NextRequest) {
  log('webhook received', storeConfig())
  const secret = process.env.POSTARTICLE_WEBHOOK_SECRET
  if (!secret) {
    console.error('[newarticle] POSTARTICLE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 })
  }
  const authorization = request.headers.get('authorization')
  if (authorization !== `Bearer ${secret}`) {
    log('rejected: bad authorization', { hasHeader: Boolean(authorization), bearer: authorization?.startsWith('Bearer ') ?? false })
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: WebhookPayload
  try {
    payload = await request.json()
  } catch (error) {
    log('rejected: body is not JSON', { error: String(error) })
    return NextResponse.json({ error: 'Body must be JSON' }, { status: 400 })
  }

  log('payload', {
    event_type: payload.event_type,
    timestamp: payload.timestamp,
    articles: payload.data?.articles?.map((a) => ({ id: a.id, slug: a.slug, status: a.status, is_update: a.is_update })),
  })
  if (!payload.event_type || !EVENT_TYPES.has(payload.event_type)) {
    return NextResponse.json({ error: `Unsupported event_type: ${payload.event_type}` }, { status: 400 })
  }
  const articles = payload.data?.articles
  if (!Array.isArray(articles) || articles.length === 0) {
    return NextResponse.json({ error: 'data.articles must be a non-empty array' }, { status: 400 })
  }

  const saved: string[] = []
  const errors: { id?: string; slug?: string; error: string }[] = []
  let storageFailed = false
  const receivedAt = new Date().toISOString()

  for (const article of articles) {
    const slug = article.slug?.trim().toLowerCase() ?? ''
    if (!article.id || !article.title || !article.content_html || !isValidSlug(slug)) {
      const error = 'Needs id, title, content_html and a URL-safe slug'
      log('rejected article', { id: article.id, slug: article.slug, error, hasTitle: Boolean(article.title), hasContentHtml: Boolean(article.content_html) })
      errors.push({ id: article.id, slug: article.slug, error })
      continue
    }
    try {
      await saveArticle({
        ...article,
        id: String(article.id),
        title: article.title,
        slug,
        content_html: article.content_html,
        tags: Array.isArray(article.tags) ? article.tags : [],
        received_at: receivedAt,
      })
      saved.push(slug)
      revalidatePath(`${NEW_ARTICLE_BASE_PATH}/${slug}`)
    } catch (error) {
      storageFailed = true
      // AWS SDK errors carry the HTTP status and request id in $metadata.
      const metadata = (error as { $metadata?: unknown }).$metadata
      console.error('[newarticle] save failed', JSON.stringify({
        slug,
        name: error instanceof Error ? error.name : undefined,
        message: error instanceof Error ? error.message : String(error),
        metadata,
        config: storeConfig(),
      }))
      errors.push({ id: article.id, slug, error: error instanceof Error ? error.message : String(error) })
    }
  }
  revalidatePath(NEW_ARTICLE_BASE_PATH)
  log('webhook done', { saved, errors: errors.length })

  return NextResponse.json(
    {
      success: errors.length === 0,
      saved: saved.map((slug) => ({ slug, url: `${NEW_ARTICLE_BASE_PATH}/${slug}` })),
      errors,
    },
    // 207: some saved, some rejected; nothing saved: 500 if storage failed, else 400.
    { status: errors.length === 0 ? 200 : saved.length > 0 ? 207 : storageFailed ? 500 : 400 }
  )
}
