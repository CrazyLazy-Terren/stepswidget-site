import { getBlogPosts } from '../blog/posts'
import { docPath, getDocTree } from '../docs/docs'
import { appFacts } from '../structured-data'

export const dynamic = 'force-static'

/**
 * llms-full.txt — the entire corpus as plain text in a single fetch.
 *
 * llms.txt is a map; this is the territory. A model that lands here should be
 * able to answer any question about the product or its guides without
 * crawling 18 separate URLs.
 */
export async function GET() {
  const baseUrl = 'https://steps.crazylazy.xyz'
  const { requirements } = appFacts

  const sections: string[] = [
    '# Steps Widget — Full Site Text',
    '',
    `Source: ${baseUrl}`,
    `Generated: ${new Date().toISOString().slice(0, 10)}`,
    '',
    'Steps Widget reminds people who sit at a desk all day to get out of the chair and move. An on-device model times the nudge around real sitting time, and the daily Apple Health step count is the measurement that shows whether the movement happened. Progress stays visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    '',
    '## Key Facts',
    '',
    `- Name: ${appFacts.name} (published by ${appFacts.legalName})`,
    `- Platforms: iOS ${requirements.ios}+, iPadOS ${requirements.ipados}+, watchOS ${requirements.watchos}+, visionOS ${requirements.visionos}+`,
    '- Price: Free to download with no ads. The reminders are free, including their settings. The optional paid unlock only changes widget appearance, as a one-time Customization purchase or a subscription; a subscription is never required. See the App Store listing for current amounts.',
    "- Data handling: Apple Health (HealthKit) read on device. No account, no leaderboard. Optional iCloud sync uses the user's own private iCloud.",
    '- Differentiator: activity-aware move reminders that fire only after real sedentary time',
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
