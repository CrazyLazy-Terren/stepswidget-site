import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'
import { getBlogPosts } from './blog/posts'
import { docPath, getDocTree, getDocs } from './docs/docs'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers()
  const host = headersList.get('host') || 'steps.crazylazy.xyz'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  // Dynamic routes (blog posts)
  const blogUrls = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Documentation: section index pages plus one entry per doc page.
  const docSectionUrls = getDocTree().map(({ section, docs }) => ({
    url: `${baseUrl}/docs/${section.slug}`,
    // A section is as fresh as its most recently edited page.
    lastModified: new Date(`${docs.map((doc) => doc.updated).sort().at(-1)}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const docUrls = getDocs().map((doc) => ({
    url: `${baseUrl}${docPath(doc)}`,
    lastModified: new Date(`${doc.updated}T00:00:00Z`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Static routes
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  return [...staticUrls, ...docSectionUrls, ...docUrls, ...blogUrls]
}
