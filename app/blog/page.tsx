import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '../arrow'
import { ContentShell } from '../content-shell'
import { defaultOgImages, siteName } from '../shared-metadata'
import { JsonLd, absoluteUrl, applicationId, applicationSchema, breadcrumbSchema, organizationId, organizationSchema, websiteSchema } from '../structured-data'
import { type BlogPost, getBlogPosts } from './posts'

/** `2026-09-08` -> `September 8, 2026`. */
function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${isoDate}T00:00:00Z`))
}

function PostCard({ post }: { post: BlogPost }) {
  const updatedDate = post.updated ?? post.date
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 transition hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
      {/* Top corners: category left, updated date right */}
      <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">
        <span className="text-[var(--accent-color)]">{post.category}</span>
        <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
      </div>

      {/* Center: the content */}
      <div className="flex flex-col items-start justify-center gap-3 py-10">
        <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{post.title}</h3>
        <p className="leading-7 text-[var(--text-muted)]">{post.description}</p>
      </div>

      {/* Bottom corners: reading time left, Read link right */}
      <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-subtle)]">
        <span>{post.readingTime}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">
          Read <ArrowRight />
        </span>
      </div>
    </Link>
  )
}

const title = 'Blog - Steps Widget'
const description =
  'Guides and product notes about iPhone step counter widgets, Lock Screen steps widgets, move reminders, Apple Health, and Apple Watch step tracking.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title,
    description,
    url: '/blog',
    siteName,
    type: 'website',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: defaultOgImages,
  },
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()
  const blogUrl = absoluteUrl('/blog')

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    name: title,
    description,
    url: blogUrl,
    inLanguage: 'en-US',
    publisher: { '@id': organizationId },
    about: { '@id': applicationId },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`,
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      articleSection: post.category,
      ...(post.image ? { image: [absoluteUrl(post.image)] } : {}),
      author: { '@id': organizationId },
    })),
  }

  // An explicit, ordered list of every post. Crawlers read this as the
  // canonical index of the site's content, independent of page layout.
  const itemListSchema = {
    '@type': 'ItemList',
    '@id': `${blogUrl}#postlist`,
    name: 'Steps Widget guides',
    numberOfItems: blogPosts.length,
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    itemListElement: blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  }

  const collectionPageSchema = {
    '@type': 'CollectionPage',
    '@id': blogUrl,
    url: blogUrl,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    breadcrumb: { '@id': `${blogUrl}#breadcrumb` },
    mainEntity: { '@id': `${blogUrl}#postlist` },
  }

  // Newest post gets the highlight treatment; the rest are catalogued by category.
  const [featuredPost, ...remainingPosts] = blogPosts

  // `blogPosts` is already newest-first, so first-seen order gives category
  // sections ordered by their freshest post, with posts newest-first inside each.
  const categorySections: { name: string; posts: BlogPost[] }[] = []
  for (const post of remainingPosts) {
    const existing = categorySections.find((section) => section.name === post.category)
    if (existing) {
      existing.posts.push(post)
    } else {
      categorySections.push({ name: post.category, posts: [post] })
    }
  }

  return (
    <ContentShell
      eyebrow="Blog"
      title="Every step counts."
      description="Practical guides on iPhone step counter widgets, Lock Screen steps, move reminders, and Apple Watch step tracking.">
      <JsonLd
        id="schema-blog"
        data={[
          organizationSchema(),
          websiteSchema(),
          applicationSchema(),
          collectionPageSchema,
          blogSchema,
          itemListSchema,
          breadcrumbSchema(
            [
              { name: 'Home', path: '/' },
              { name: 'Blog', path: '/blog' },
            ],
            `${blogUrl}#breadcrumb`
          ),
        ]}
      />
      {featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group grid overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[var(--surface-1)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)] md:grid-cols-2">
          {featuredPost.image && (
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
              <Image
                src={featuredPost.image}
                alt={`${featuredPost.title} hero`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="flex flex-col gap-4 p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Latest · {featuredPost.category}</p>
            <h2 className="text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-strong)] sm:text-4xl">{featuredPost.title}</h2>
            <p className="leading-7 text-[var(--text-muted)]">{featuredPost.description}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm text-[var(--text-subtle)]">
              <span>{featuredPost.readingTime}</span>
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">
                Read <ArrowRight />
              </span>
            </div>
          </div>
        </Link>
      )}

      <div className="mt-16 flex flex-col gap-16">
        {categorySections.map((section) => (
          <section key={section.name}>
            <div className="flex items-center gap-4">
              <h2 className="shrink-0 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{section.name}</h2>
              <hr className="flex-1 border-0 border-t border-[color:var(--border)]" />
              <span className="shrink-0 text-xs font-medium tabular-nums text-[var(--text-subtle)]">
                {section.posts.length} {section.posts.length === 1 ? 'post' : 'posts'}
              </span>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              {section.posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </ContentShell>
  )
}
