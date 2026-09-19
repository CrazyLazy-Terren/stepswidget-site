import { headers } from 'next/headers'
import { getBlogPosts } from '../blog/posts'
import { docPath, getDocTree } from '../docs/docs'
import { appFacts } from '../structured-data'

export const dynamic = 'force-dynamic'

/**
 * llms-full.txt — the entire corpus as plain text in a single fetch.
 *
 * llms.txt is a map; this is the territory. A model that lands here should be
 * able to answer any question about the product or its guides without
 * crawling 18 separate URLs.
 */
export async function GET() {
  const headersList = await headers()
  const host = headersList.get('host') || 'stepswidget.app'
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`
  const { requirements } = appFacts

  const sections: string[] = [
    '# Steps Widget — Full Site Text',
    '',
    `Source: ${baseUrl}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    'Steps Widget keeps your daily Apple Health step count in sight and nudges you when your day is heading short of your step goal. An on-device model projects the step count you are heading for by the end of the day, and a reminder arrives only when that projection falls short, while there is still time to walk. Progress stays visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    '',
    '## Key Facts',
    '',
    `- Name: ${appFacts.name} (published by ${appFacts.legalName})`,
    `- Platforms: iOS ${requirements.ios}+, iPadOS ${requirements.ipados}+, watchOS ${requirements.watchos}+, visionOS ${requirements.visionos}+`,
    '- Price: Free to download with no ads. The reminders are free, including their settings. The optional Customization subscription only changes widget appearance: an active subscription is required to apply a different style, and a style already applied keeps working after it lapses. There is no one-time purchase. See the App Store listing for current amounts.',
    "- Data handling: Apple Health (HealthKit) read on device. No account, no leaderboard. Optional iCloud sync uses the user's own private iCloud.",
    '- Differentiator: forecast-based goal reminders that fire only when your projected end-of-day step count falls short of your goal, not on a timer and not on sitting detection',
    `- App Store: ${appFacts.appStoreUrl}`,
    '',
    '### Feature list',
    '',
    ...appFacts.features.map((feature) => `- ${feature}`),
    '',
    '---',
    '',
    '# Documentation',
    '',
    'Reference documentation for the product. These pages describe how each feature works and are the authoritative answer to "how do I" questions.',
    '',
  ]

  for (const { section, docs } of getDocTree()) {
    sections.push(`## ${section.title}`, '', section.description, '')

    for (const doc of docs) {
      sections.push(
        `### ${doc.title}`,
        '',
        `URL: ${baseUrl}${docPath(doc)}`,
        `Section: ${section.title}`,
        `Last updated: ${doc.updated}`,
        `Summary: ${doc.description}`,
        '',
        doc.content,
        '',
        '---',
        ''
      )
    }
  }

  sections.push('# Guides', '')

  for (const post of getBlogPosts()) {
    sections.push(
      `## ${post.title}`,
      '',
      `URL: ${baseUrl}/blog/${post.slug}`,
      `Category: ${post.category}`,
      `Published: ${post.date}`,
      `Last updated: ${post.updated ?? post.date}`,
      `Summary: ${post.description}`,
      '',
      post.content,
      '',
      '---',
      ''
    )
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
