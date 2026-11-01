import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'
import { NEW_ARTICLE_BASE_PATH, isValidSlug, saveArticle, type NewArticle } from '@/app/(en)/newarticle/store'

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
  const secret = process.env.POSTARTICLE_WEBHOOK_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Webhook is not configured' }, { status: 500 })
  }
  if (request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: WebhookPayload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: 'Body must be JSON' }, { status: 400 })
  }

  if (!payload.event_type || !EVENT_TYPES.has(payload.event_type)) {
    return NextResponse.json({ error: `Unsupported event_type: ${payload.event_type}` }, { status: 400 })
  }
  const articles = payload.data?.articles
  if (!Array.isArray(articles) || articles.length === 0) {
    return NextResponse.json({ error: 'data.articles must be a non-empty array' }, { status: 400 })
  }

  const saved: string[] = []
  const errors: { id?: string; slug?: string; error: string }[] = []
  const receivedAt = new Date().toISOString()

  for (const article of articles) {
    const slug = article.slug?.trim().toLowerCase() ?? ''
    if (!article.id || !article.title || !article.content_html || !isValidSlug(slug)) {
      errors.push({ id: article.id, slug: article.slug, error: 'Needs id, title, content_html and a URL-safe slug' })
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
      errors.push({ id: article.id, slug, error: error instanceof Error ? error.message : String(error) })
    }
  }
  revalidatePath(NEW_ARTICLE_BASE_PATH)

  return NextResponse.json(
    {
      success: errors.length === 0,
      saved: saved.map((slug) => ({ slug, url: `${NEW_ARTICLE_BASE_PATH}/${slug}` })),
      errors,
    },
    // 207: some saved, some rejected; 400: nothing saved.
    { status: errors.length === 0 ? 200 : saved.length > 0 ? 207 : 400 }
  )
}
