import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers()
  const host = headersList.get('host') || 'steps.crazylazy.xyz'

  // Define production hostname. Can be configured via env var if needed.
  const prodHost = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : 'steps.crazylazy.xyz'

  // Additional production hosts allowed to be indexed alongside prodHost.
  const additionalProdHosts = ['stepswidget.app', 'www.stepswidget.app']

  const isProduction = host === prodHost || host === `www.${prodHost}` || additionalProdHosts.includes(host)

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        // Named explicitly so AI crawler access is unambiguous rather than
        // merely implied by the wildcard rule above. Retrieval bots
        // (OAI-SearchBot, ChatGPT-User, PerplexityBot) are what put the site
        // into AI answers; the training bots build long-term brand recall.
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot',
          'Applebot-Extended',
          'Bingbot',
          'Amazonbot',
          'meta-externalagent',
          'cohere-ai',
        ],
        allow: '/',
      },
    ],
    sitemap: `https://${host}/sitemap.xml`,
  }
}
