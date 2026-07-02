import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ContentShell } from '../../content-shell'
import { blogPosts, getBlogPost } from '../posts'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
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
      type: 'article',
      publishedTime: post.date,
      tags: post.keywords,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

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

          <div className="mt-8 space-y-5 text-lg leading-8 text-[var(--text-muted)]">
            {post.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-[var(--text-muted)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="ml-5 list-disc space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
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
