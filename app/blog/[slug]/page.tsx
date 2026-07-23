import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ContentShell } from '../../content-shell'
import { siteName } from '../../shared-metadata'
import { blogPosts, getBlogPost } from '../posts'

const markdownComponents: Components = {
  h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{children}</h3>,
  p: ({ children }) => <p className="mb-4 text-lg leading-8 text-[var(--text-muted)] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--text-strong)]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        className="font-medium text-[var(--accent-color)] underline underline-offset-2 hover:opacity-80"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-2 text-lg leading-8 text-[var(--text-muted)]">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-2 text-lg leading-8 text-[var(--text-muted)]">{children}</ol>,
  li: ({ children }) => <li className="pl-1">{children}</li>,
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
  const others = blogPosts.filter((post) => post.slug !== currentSlug)
  const sameCategory = others.filter((post) => post.category === category)
  const otherCategory = others.filter((post) => post.category !== category)

  return [...sameCategory, ...otherCategory].slice(0, limit)
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
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

  const images = [{ url: post.image, alt: post.title }]

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

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'CrazyLazy OU',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Steps Widget',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.crazylazy.xyz/icon/stepsWidget.png',
      },
    },
    mainEntityOfPage: `/blog/${post.slug}`,
    keywords: post.keywords.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <ContentShell eyebrow={post.category} title={post.title} description={post.description}>
        <article className="mx-auto max-w-4xl rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)] sm:p-8">
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

          <div className="mt-8 overflow-hidden rounded-3xl">
            <Image src={post.image} alt={`${post.title} hero`} width={900} height={600} sizes=" 100vw, 896px" className="h-auto w-full object-cover" priority />
          </div>

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
                    className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-[20px] border border-[color:var(--border)] bg-[var(--surface-1)] p-5 shadow-[var(--soft-shadow)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{recommended.category}</p>
                    <h3 className="mt-3 text-lg font-semibold leading-6 tracking-[-0.01em] text-[var(--text-strong)]">{recommended.title}</h3>
                    <div className="flex items-center justify-between gap-3 pt-5 text-sm text-[var(--text-subtle)]">
                      <span>{recommended.readingTime}</span>
                      <span className="font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">Read -&gt;</span>
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
          <div className="mt-10 rounded-[20px] border border-[color:var(--border)] bg-[image:var(--cta-bg)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Try Steps Widget</p>
            <p className="mt-3 leading-7 text-[var(--text-muted)]">
              Keep your daily steps visible on iPhone, Lock Screen, Home Screen, and Apple Watch with a private Apple Health step counter widget.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-[var(--button-bg)] px-5 text-sm font-semibold text-[var(--button-text)] transition hover:opacity-90">
              Back to home
            </Link>
          </div>
        </article>
      </ContentShell>
    </>
  )
}
