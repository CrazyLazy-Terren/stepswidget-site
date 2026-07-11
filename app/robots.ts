import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || 'steps.crazylazy.xyz'

  // Define production hostname. Can be configured via env var if needed.
  const prodHost = process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host
    : 'steps.crazylazy.xyz'

  const isProduction = host === prodHost || host === `www.${prodHost}`

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/blog/posts/', '/blog/posts/*'],
    },
    sitemap: `https://${host}/sitemap.xml`,
  }
}

