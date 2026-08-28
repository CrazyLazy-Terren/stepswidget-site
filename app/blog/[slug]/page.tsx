import type { Metadata } from 'next'
import { isValidElement, type ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '../../arrow'
import { notFound } from 'next/navigation'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ContentShell } from '../../content-shell'
import { defaultOgImages, siteName } from '../../shared-metadata'
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
} from '../../structured-data'
import { extractFaqEntries } from '../extract-faq'
import { getBlogPost, getBlogPosts } from '../posts'

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

/**
 * Anchor id for a heading, so posts can link to their own sections with a
 * `[Jump](#some-heading)` table of contents. Matches the usual GitHub-style
 * slug: lowercase, punctuation dropped, spaces to hyphens.
 */
function headingId(children: ReactNode) {
  return toPlainText(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

const markdownComponents: Components = {
  // `id` is only supplied by remark-gfm's auto-generated footnote label; every
  // other heading gets its slug from its own text. Posts that cite sources use
  // footnote syntax, so relabel that section "References" rather than the
  // generic "Footnotes" GitHub uses.
  h2: ({ children, id }) => {
    const isFootnoteLabel = id === 'footnote-label'

    return (
      <h2
        id={isFootnoteLabel ? 'references' : headingId(children)}
        className="my-8 scroll-mt-24 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]"
      >
        {isFootnoteLabel ? 'References' : children}
      </h2>
    )
  },
  h3: ({ children }) => (
    <h3 id={headingId(children)} className="mt-8 scroll-mt-24 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
      {children}
    </h3>
  ),
  p: ({ children }) => <p className="mb-4 text-lg leading-8 text-[var(--text-muted)] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--text-strong)]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children, id }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        id={id}
        className="font-medium text-[var(--accent-color)] underline underline-offset-2 hover:opacity-80"
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
    return <code className="rounded bg-[var(--surface-media)] px-1.5 py-0.5 font-mono text-sm text-[var(--text-strong)]">{children}</code>
  },
  pre: ({ children }) => (
    <pre className="my-4 overflow-x-auto rounded-2xl border border-[color:var(--border)] bg-[var(--surface-media)] p-4 font-mono text-sm">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-2xl border border-[color:var(--border)]">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[var(--surface-media)]">{children}</thead>,
  th: ({ children }) => <th className="border-b border-[color:var(--border)] px-3 py-2 font-semibold text-[var(--text-strong)]">{children}</th>,
  td: ({ children }) => <td className="border-b border-[color:var(--border)] px-3 py-2 text-[var(--text-muted)]">{children}</td>,
  img: ({ src, alt }) => (
    <span className="my-4 block overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--surface-media)] shadow-sm">
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={alt ?? ''}
        width={800}
        height={500}
        sizes="(max-width: 768px) 100vw, 800px"
        className="h-auto w-full object-cover"
      />
    </span>
  ),
}

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

function getRecommendedPosts(currentSlug: string, category: string, limit = 3) {
  const others = getBlogPosts().filter((post) => post.slug !== currentSlug)
  const sameCategory = others.filter((post) => post.category === category)
  const otherCategory = others.filter((post) => post.category !== category)

  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {
      title: 'Blog - Steps Widget',
    }
  }

  // A post without its own hero still needs a social card, so fall back to the
  // site-wide OG image rather than shipping a link preview with no picture.
  const images = post.image ? [{ url: post.image, alt: post.title }] : defaultOgImages

  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName,
      type: 'article',
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const recommendedPosts = getRecommendedPosts(post.slug, post.category)

  const url = absoluteUrl(`/blog/${post.slug}`)
  const faqEntries = extractFaqEntries(post.content)

  const articleSchema = {
    // BlogPosting rather than the generic Article: it is the accurate type for
    // a dated post inside a Blog, and it inherits everything Article supports.
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    name: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@id': url },
    // Only claim a primary image when the post actually has one on the page —
    // pointing `image` at a stock banner the article never shows is the kind of
    // mismatch structured-data validators flag.
    ...(post.image
      ? {
          image: { '@id': `${url}#primaryimage` },
          thumbnailUrl: absoluteUrl(post.image),
        }
      : {}),
    datePublished: post.date,
    // Falls back to the publish date when a post has never been revised.
    dateModified: post.updated ?? post.date,
    inLanguage: 'en-US',
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    wordCount: countWords(post.content),
    timeRequired: readingTimeToDuration(post.readingTime),
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    isPartOf: { '@id': `${absoluteUrl('/blog')}#blog` },
    // Names the product this post is about, so every guide reinforces the same
    // entity instead of reading as 18 unrelated articles.
    about: { '@id': applicationId },
    mentions: { '@id': applicationId },
    // Tells voice and assistant surfaces which parts are safe to read aloud.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  }

  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    websiteSchema(),
    // The full app node travels with every post, so a crawler that fetches one
    // article in isolation still gets the product facts.
    applicationSchema(),
    webPageSchema({ url, name: post.metaTitle, description: post.description, image: post.image }),
    ...(post.image ? [imageSchema(post.image, `${url}#primaryimage`, `${post.title} hero`)] : []),
    articleSchema,
    breadcrumbSchema(
      [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ],
      `${url}#breadcrumb`
    ),
  ]

  // Only emit FAQPage when the post genuinely contains Q&A content.
  if (faqEntries.length > 0) {
    graph.push(faqSchema(faqEntries, `${url}#faq`))
  }

  return (
    <>
      <JsonLd id={`schema-post-${post.slug}`} data={graph} />
      <ContentShell eyebrow={post.category} title={post.title} description={post.description}>
        <article className="mx-auto max-w-5xl  p-0  sm:p-12">
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-subtle)]">
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat('en', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(`${post.date}T00:00:00Z`))}
            </time>
            <span aria-hidden="true">/</span>
            <span>{post.readingTime}</span>
          </div>

          {post.image && (
            <div className="mt-8 overflow-hidden rounded-3xl">
              <Image src={post.image} alt={`${post.title} hero`} width={900} height={600} sizes=" 100vw, 896px" className="h-auto w-full object-cover" priority />
            </div>
          )}

          <div className="mt-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.content}
            </ReactMarkdown>
          </div>
          {recommendedPosts.length > 0 && (
            <section className="mt-12 border-t border-[color:var(--border)] pt-8">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Recommended posts</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedPosts.map((recommended) => (
                  <Link
                    key={recommended.slug}
                    href={`/blog/${recommended.slug}`}
                    className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-1)] p-5 transition hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{recommended.category}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-6 tracking-[-0.01em] text-[var(--text-strong)]">{recommended.title}</h3>
                    <div className="flex items-center justify-between gap-3 pt-5 text-sm text-[var(--text-subtle)]">
                      <span>{recommended.readingTime}</span>
                      <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">
                        Read <ArrowRight />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <Link
            href="/blog"
            className="mt-12 inline-flex items-center justify-center rounded-full bg-[var(--button-bg)] px-4 py-2 text-sm font-semibold text-[var(--button-text)] transition hover:opacity-90">
            Back to list
          </Link>
          <Link href="/" className="">
            <div className="mt-10 rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-1)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Try Steps Widget</p>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">
                Keep your daily steps visible on iPhone, Lock Screen, Home Screen, and Apple Watch with a private Apple Health step counter widget.
              </p>
            </div>
          </Link>
        </article>
      </ContentShell>
    </>
  )
}
