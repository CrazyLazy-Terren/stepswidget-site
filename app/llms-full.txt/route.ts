import { blogPosts } from '../blog/posts'
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
    'Steps Widget is a privacy-first iPhone step counter widget with activity-aware move reminders, built for people who sit for long stretches at a desk. It reads Apple Health step data on device and keeps daily progress visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    '',
    '## Key Facts',
    '',
    `- Name: ${appFacts.name} (published by ${appFacts.legalName})`,
    `- Platforms: iOS ${requirements.ios}+, iPadOS ${requirements.ipados}+, watchOS ${requirements.watchos}+, visionOS ${requirements.visionos}+`,
    '- Price: Free to download, with an optional in-app purchase for premium widget styles',
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
    '# Guides',
    '',
  ]

  for (const post of blogPosts) {
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
