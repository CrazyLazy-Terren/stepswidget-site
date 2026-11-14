import type { Metadata } from 'next'
import { isValidElement, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@/app/arrow'
import { notFound } from 'next/navigation'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { ContentShell } from '@/app/content-shell'
import { DuoDemo } from '@/app/duo-demo'
import { DuoMockup } from '@/app/duo-mockup'
import { DuoShots } from '@/app/duo-shots'
import { isDuoShotsName } from '@/app/duo-shots-names'
import { defaultOgImages, siteName } from '@/app/shared-metadata'
import {
  JsonLd,
  absoluteUrl,
  applicationId,
  applicationSchema,
  breadcrumbSchema,
  countWords,
  faqSchema,
  imageSchema,
  organizationId,
  organizationSchema,
  readingTimeToDuration,
  webPageSchema,
  websiteSchema,
} from '@/app/structured-data'
import { extractFaqEntries } from '@/app/(en)/blog/extract-faq'
import { getEsBlogPost, getEsBlogPosts } from '@/app/(es)/es/blog/posts'

/** Flattens a heading's rendered children back to the plain text it reads as. */
function toPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(toPlainText).join('')
  }

  if (isValidElement(node)) {
    return toPlainText((node.props as { children?: ReactNode }).children)
  }

  return ''
}

/** Anchor id for a heading. */
function headingId(children: ReactNode) {
  return toPlainText(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const duoDemoSrc = '/demos/iphone-duo'

const markdownComponents: Components = {
  h2: ({ children, id }) => {
    const isFootnoteLabel = id === 'footnote-label'

    return (
      <h2
        id={isFootnoteLabel ? 'referencias' : headingId(children)}
        className="my-8 scroll-mt-24 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
        {isFootnoteLabel ? 'Referencias' : children}
      </h2>
    )
  },
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="my-8 scroll-mt-24 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
      {children}
    </h3>
  ),
  p: ({ node, children }) => {
    const only = node?.children.length === 1 ? node.children[0] : undefined
    if (only?.type === 'element' && only.tagName === 'img' && typeof only.properties.src === 'string') {
      const src = only.properties.src
      if (src === duoDemoSrc) return <DuoDemo lang="es" className="my-10" />
      const name = src.startsWith(`${duoDemoSrc}/`) ? src.slice(duoDemoSrc.length + 1) : ''
      if (isDuoShotsName(name)) return <DuoShots name={name} />
      if (src.endsWith('.mp4')) {
        const caption = typeof only.properties.title === 'string' ? only.properties.title : undefined
        return (
          <figure className="my-10">
            <video
              src={src}
              aria-label={String(only.properties.alt ?? '')}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full rounded-lg"
            />
            {caption ? <figcaption className="mt-4 text-center text-sm text-[var(--text-muted)]">{caption}</figcaption> : null}
          </figure>
        )
      }
      if (src.endsWith('-duo.webp')) {
        const caption = typeof only.properties.title === 'string' ? only.properties.title : undefined
        return (
          <figure className="my-10">
            <DuoMockup pose="closed" src={src} alt={String(only.properties.alt ?? '')} className="mx-auto w-full max-w-96" sizes="288px" />
            {caption ? <figcaption className="mt-4 text-center text-sm text-[var(--text-muted)]">{caption}</figcaption> : null}
          </figure>
        )
      }
    }
    return <p className="mb-4 text-lg leading-8 text-[var(--text-muted)] last:mb-0">{children}</p>
  },
  strong: ({ children }) => <strong className="font-semibold text-[var(--text-strong)]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children, id }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        id={id}
        className="font-medium text-[var(--accent-color)] underline underline-offset-2 hover:opacity-80 [&:has(img)]:no-underline"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-2 text-lg leading-8 text-[var(--text-muted)]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-2 text-lg leading-8 text-[var(--text-muted)]">{children}</ol>,
  li: ({ children, id }) => (
    <li id={id} className="scroll-mt-24 pl-1">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-[color:var(--border-strong)] pl-4 italic text-[var(--text-muted)]">{children}</blockquote>
  ),
  hr: () => <hr className="my-8 border-[color:var(--border)]" />,
  code: ({ className, children }) => {
    const isBlock = Boolean(className)
    if (isBlock) {
      return <code className={className}>{children}</code>
    }
    return <code className="rounded-lg px-1.5 py-0.5 font-mono text-sm text-[var(--text-strong)]">{children}</code>
  },
  pre: ({ children }) => <pre className="my-4 overflow-x-auto rounded-lg border border-[color:var(--border)] p-4 font-mono text-sm">{children}</pre>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-lg border border-[color:var(--border)]">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-[color:var(--border)] px-3 py-2 font-semibold text-[var(--text-strong)]">{children}</th>,
  td: ({ children }) => <td className="border-b border-[color:var(--border)] px-3 py-2 text-[var(--text-muted)]">{children}</td>,
  img: ({ src, alt }) => {
    const resolved = typeof src === 'string' ? src : ''

    if (/-icon\.[a-z]+$/i.test(resolved)) {
      return (
        <Image src={resolved} alt={alt ?? ''} width={56} height={56} className="inline-block h-14 w-14 rounded-[22%] border border-[color:var(--border)]" />
      )
    }

    return (
      <span className="my-4 block overflow-hidden rounded-lg border border-[color:var(--border)]">
        <Image src={resolved} alt={alt ?? ''} width={800} height={500} sizes="(max-width: 768px) 100vw, 800px" className="h-auto w-full object-cover" />
      </span>
    )
  },
}

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

function getRecommendedPosts(currentSlug: string, category: string, limit = 3) {
  const others = getEsBlogPosts().filter((post) => post.slug !== currentSlug)
  const sameCategory = others.filter((post) => post.category === category)
  const otherCategory = others.filter((post) => post.category !== category)

  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export function generateStaticParams() {
  return getEsBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getEsBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog - Steps Widget',
    }
  }

  const images = post.image ? [{ url: post.image, alt: post.title }] : defaultOgImages

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/es/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        es: `/es/blog/${post.slug}`,
        'x-default': `/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: `/es/blog/${post.slug}`,
      siteName,
      type: 'article',
      locale: 'es_ES',
      alternateLocale: ['en_US'],
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.keywords,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.description,
      images,
    },
  }
}

export default async function SpanishBlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getEsBlogPost(slug)

  if (!post) {
    notFound()
  }

  const recommendedPosts = getRecommendedPosts(post.slug, post.category)
  const url = absoluteUrl(`/es/blog/${post.slug}`)
  const faqEntries = extractFaqEntries(post.content)

  const articleSchema = {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@id': url },
    ...(post.image
      ? {
          image: { '@id': `${url}#primaryimage` },
          thumbnailUrl: absoluteUrl(post.image),
        }
      : {}),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: 'es-ES',
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    wordCount: countWords(post.content),
    timeRequired: readingTimeToDuration(post.readingTime),
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    isPartOf: { '@id': `${absoluteUrl('/es/blog')}#blog` },
    about: { '@id': applicationId },
    mentions: { '@id': applicationId },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  }

  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    websiteSchema(),
    applicationSchema(),
    webPageSchema({ url, name: post.metaTitle, description: post.description, image: post.image }),
    ...(post.image ? [imageSchema(post.image, `${url}#primaryimage`, `${post.title} hero`)] : []),
    articleSchema,
    breadcrumbSchema(
      [
        { name: 'Inicio', path: '/es' },
        { name: 'Blog', path: '/es/blog' },
        { name: post.title, path: `/es/blog/${post.slug}` },
      ],
      `${url}#breadcrumb`
    ),
  ]

  if (faqEntries.length > 0) {
    graph.push(faqSchema(faqEntries, `${url}#faq`))
  }

  return (
    <>
      <JsonLd id={`schema-post-es-${post.slug}`} data={graph} />
      <ContentShell lang="es" eyebrow={post.category} title={post.title} description={post.description}>
        <article className="mx-auto max-w-5xl p-0 sm:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-subtle)]">
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat('es-ES', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(`${post.date}T00:00:00Z`))}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
            {post.updated && post.updated !== post.date && (
              <>
                <span aria-hidden="true">/</span>
                <span>
                  Actualizado el{' '}
                  <time dateTime={post.updated}>
                    {new Intl.DateTimeFormat('es-ES', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    }).format(new Date(`${post.updated}T00:00:00Z`))}
                  </time>
                </span>
              </>
            )}
          </div>

          {post.image && (
            <div className="mt-8 overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={`${post.title} hero`}
                width={900}
                height={600}
                sizes="100vw, 896px"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>

          {recommendedPosts.length > 0 && (
            <section className="mt-12 border-t border-[color:var(--border)] pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Artículos recomendados</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedPosts.map((recommended) => (
                  <Link
                    key={recommended.slug}
                    href={`/es/blog/${recommended.slug}`}
                    className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 transition hover:border-[color:var(--border-strong)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{recommended.category}</p>
                    <h3 className="mt-4 text-lg font-semibold leading-6 tracking-[-0.01em] text-[var(--text-strong)]">{recommended.title}</h3>
                    <div className="flex items-center justify-between gap-3 pt-6 text-sm text-[var(--text-subtle)]">
                      <span>{recommended.readingTime}</span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">
                        Leer <ArrowRight className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/es/blog"
              className="inline-flex items-center justify-center rounded-full bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] transition hover:opacity-90">
              Volver al blog
            </Link>
          </div>

          <Link href="/es">
            <div className="mt-10 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Prueba Steps Widget</p>
              <p className="mt-4 leading-7 text-[var(--text-muted)]">
                Mantén tus pasos diarios a la vista en iPhone, pantalla de bloqueo, pantalla de inicio y Apple Watch con un widget privado basado en Apple Health.
              </p>
            </div>
          </Link>
        </article>
      </ContentShell>
    </>
  )
}
