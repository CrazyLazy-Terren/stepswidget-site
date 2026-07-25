import { siteName, siteUrl } from './shared-metadata'

/**
 * Central source of truth for schema.org structured data.
 *
 * Every fact in `appFacts` is also surfaced in /llms.txt, so search engines and
 * language models read the same numbers. Update this file, not the pages.
 */

export const organizationId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`
export const applicationId = `${siteUrl}/#app`

export const appFacts = {
  name: 'Steps Widget',
  legalName: 'CrazyLazy OU',
  appStoreId: '6756297788',
  appStoreUrl: 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=website&mt=8',
  logo: 'https://www.crazylazy.xyz/icon/stepsWidget.png',
  screenshot: 'https://static.crazylazy.xyz/pic/f01.png',
  /** Minimum OS versions as listed on the App Store product page. */
  requirements: {
    ios: '18.6',
    ipados: '18.6',
    watchos: '11.6',
    visionos: '2.6',
  },
  features: [
    'Activity-aware move reminders that fire only after real sedentary time',
    'An on-device model that learns your daily activity pattern and times nudges around it',
    'Full control over how reminders look and sound, so alerts fit your focus time',
    'Home Screen step counter widgets in multiple sizes',
    'Lock Screen steps widget',
    'StandBy mode support',
    'Standalone Apple Watch app with its own goal reminders',
    'Apple Health (HealthKit) step data read on device',
    'Tinted widget colour matching for iOS 18 and later',
    'No account, no leaderboard, no social feed',
    'Optional iCloud sync across your own devices',
  ],
  /**
   * In-app purchase tiers, as listed on the App Store product page.
   * Keep in sync with the store — pricing claims appear in blog comparisons.
   */
  pricing: {
    customizationOneTime: '2.99',
    subscriptionMonthly: '1.99',
    subscriptionYearly: '7.99',
    currency: 'USD',
  },
  /** Who the product is actually built for. Drives copy and keyword focus. */
  audience: [
    'Software developers and other desk-bound knowledge workers',
    'Remote and hybrid workers who sit through long focus blocks',
    'People who want movement prompts without a fitness app, an account, or social comparison',
  ],
} as const

type JsonLdProps = {
  /** A schema.org node, or an array of nodes to emit as a @graph. */
  data: Record<string, unknown> | Record<string, unknown>[]
  /** Stable id so React does not duplicate the tag across navigations. */
  id: string
}

/**
 * Renders a JSON-LD script tag.
 *
 * `JSON.stringify` is safe here because every value originates in this
 * codebase or in trusted front matter, but we still escape `<` to avoid any
 * possibility of breaking out of the script element.
 */
export function JsonLd({ data, id }: JsonLdProps) {
  const payload = Array.isArray(data) ? { '@context': 'https://schema.org', '@graph': data } : data

  return <script type="application/ld+json" id={id} dangerouslySetInnerHTML={{ __html: JSON.stringify(payload).replace(/</g, '\\u003c') }} />
}

export function absoluteUrl(pathname: string) {
  return pathname.startsWith('http') ? pathname : `${siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: appFacts.legalName,
    alternateName: appFacts.name,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: appFacts.logo,
    },
    sameAs: ['https://www.crazylazy.xyz', `https://apps.apple.com/app/id${appFacts.appStoreId}`],
  }
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': websiteId,
    name: siteName,
    url: siteUrl,
    inLanguage: 'en-US',
    publisher: { '@id': organizationId },
  }
}

/**
 * The most important node on the site: it tells search engines and language
 * models exactly what the product is, what it costs, and what it runs on.
 *
 * Deliberately omits `aggregateRating`. Rating markup must reflect the live
 * App Store score and review count; shipping a stale or invented value is a
 * structured-data policy violation. Add it only when it can be kept in sync.
 */
export function applicationSchema() {
  const { requirements } = appFacts

  return {
    '@type': 'MobileApplication',
    '@id': applicationId,
    name: appFacts.name,
    alternateName: `${appFacts.name} by CrazyLazy`,
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Pedometer',
    operatingSystem: `iOS ${requirements.ios}+, iPadOS ${requirements.ipados}+, watchOS ${requirements.watchos}+, visionOS ${requirements.visionos}+`,
    url: siteUrl,
    downloadUrl: appFacts.appStoreUrl,
    installUrl: appFacts.appStoreUrl,
    description:
      'A move reminder app for desk workers, built around an on-device model that learns when you have actually been sitting. You control how each reminder looks and sounds, and a private Apple Health step counter keeps progress visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    screenshot: appFacts.screenshot,
    featureList: [...appFacts.features],
    audience: {
      '@type': 'Audience',
      audienceType: 'Desk workers, software developers, and remote knowledge workers who sit for long stretches',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: appFacts.pricing.currency,
        category: 'Free download, no ads',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Customization',
        price: appFacts.pricing.customizationOneTime,
        priceCurrency: appFacts.pricing.currency,
        category: 'One-time in-app purchase',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        name: 'Yearly subscription',
        price: appFacts.pricing.subscriptionYearly,
        priceCurrency: appFacts.pricing.currency,
        category: 'Subscription',
        availability: 'https://schema.org/InStock',
      },
    ],
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    isAccessibleForFree: true,
  }
}

/**
 * The WebPage node the article lives on. Ties the breadcrumb trail and the
 * hero image into the graph so crawlers do not have to infer the relationship.
 */
export function webPageSchema({ url, name, description, image }: { url: string; name: string; description: string; image?: string }) {
  return {
    '@type': 'WebPage',
    '@id': url,
    url,
    name,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    ...(image ? { primaryImageOfPage: { '@id': `${url}#primaryimage` } } : {}),
  }
}

export function imageSchema(url: string, id: string, caption?: string) {
  return {
    '@type': 'ImageObject',
    '@id': id,
    url: absoluteUrl(url),
    contentUrl: absoluteUrl(url),
    ...(caption ? { caption } : {}),
  }
}

/** `6 min read` -> `PT6M`, the ISO 8601 duration schema.org expects. */
export function readingTimeToDuration(readingTime: string) {
  const minutes = readingTime.match(/(\d+)/)

  return minutes ? `PT${minutes[1]}M` : undefined
}

export function countWords(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#*_>|`-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length
}

export type FaqEntry = {
  question: string
  answer: string
}

export function faqSchema(entries: readonly FaqEntry[], id: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: entries.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  }
}

export type Crumb = {
  name: string
  /** Site-relative path, e.g. `/blog`. */
  path: string
}

export function breadcrumbSchema(crumbs: readonly Crumb[], id?: string) {
  return {
    '@type': 'BreadcrumbList',
    ...(id ? { '@id': id } : {}),
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}
