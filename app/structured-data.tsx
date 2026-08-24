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
  logo: `${siteUrl}/assets/stepswidget-icon.png`,
  screenshot: 'https://static.crazylazy.xyz/pic/f01.png',
  /** Minimum OS versions as listed on the App Store product page. */
  requirements: {
    ios: '18.6',
    ipados: '18.6',
    watchos: '11.6',
    visionos: '2.6',
  },
  features: [
    'Step widgets styled to match the Home Screen, in light, dark, and tinted looks',
    'An on-device model that projects your end-of-day step count and nudges you only when you are heading for a miss',
    'Nudge settings, including how each nudge is worded and sounds, all free',
    'A daily step count that shows whether the movement actually happened',
    'Step progress on the Home Screen, Lock Screen, StandBy mode, Apple Watch, and the Mac desktop',
    'Standalone Apple Watch app with its own goal reminders',
    'Apple Health (HealthKit) step data read on device',
    'Optional Customization subscription to apply extra widget styles, colours, and tinted matching for iOS 18 and later',
    'No account, no leaderboard, no social feed',
    'Optional iCloud sync across your own devices',
  ],
  /**
   * Pricing *structure*, not amounts.
   *
   * Deliberately no dollar figures anywhere on the site: prices change, and a
   * stale number in copy or in schema is worse than no number. The App Store
   * listing is the single source of truth for what things cost.
   *
   * The model in one line: the reminder is free, you subscribe to *apply* a new
   * widget style. Nothing that makes the app *work* sits behind the paywall,
   * and a style already applied survives a lapsed subscription — only
   * switching to a different one needs an active subscription.
   */
  pricing: {
    freeToDownload: true,
    adsInFreeTier: false,
    remindersFree: true,
    paidUnlockCovers: 'applying widget styles and colours',
    hasOneTimeUnlock: false,
    hasSubscription: true,
    appliedStyleSurvivesLapse: true,
  },
  /** Who the product is actually built for. Drives copy and keyword focus. */
  audience: [
    'People who want their step count on the Home Screen without opening a fitness app',
    'Software developers, desk workers, and remote knowledge workers who lose whole afternoons to a screen',
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
      'A step counter with two halves: the glance and the nudge. Your Apple Health steps sit on the Home Screen, Lock Screen, Apple Watch, and Mac in a style you choose, and an on-device model projects the step count you are heading for so it nudges you only when you are on track to miss your goal. Nudges are free; an optional subscription lets you apply extra widget styles.',
    screenshot: appFacts.screenshot,
    featureList: [...appFacts.features],
    audience: {
      '@type': 'Audience',
      audienceType: 'People who want their step count visible on the Home Screen and a movement nudge only on the days they need one',
    },
    // Only the download price is asserted, because it is the one figure that
    // cannot go stale. Paid tiers are described in `featureList` without
    // amounts — see the note on `appFacts.pricing`.
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      category: 'Free download with no ads. Reminders are free; an optional subscription applies extra widget styles, and a style already applied keeps working without one.',
      availability: 'https://schema.org/InStock',
    },
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
