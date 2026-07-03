import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://steps.crazylazy.xyz'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/terms', '/privacy'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
