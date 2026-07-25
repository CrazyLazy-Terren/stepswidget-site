import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentShell } from '../content-shell'
import { defaultOgImages, siteName } from '../shared-metadata'
import { JsonLd, absoluteUrl, applicationId, applicationSchema, breadcrumbSchema, organizationId, organizationSchema, websiteSchema } from '../structured-data'
import { blogPosts } from './posts'

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
      image: [absoluteUrl(post.image)],
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
      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
            <div className="min-h-[8.75rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{post.category}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{post.title}</h2>
            </div>
            <p className="leading-7 text-[var(--text-muted)]">{post.description}</p>
            <div className="flex items-center justify-between gap-3 pt-8 text-sm text-[var(--text-subtle)]">
              <span>{post.readingTime}</span>
              <span className="font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">Read -&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </ContentShell>
  )
}
