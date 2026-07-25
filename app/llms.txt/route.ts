import { blogPosts } from '../blog/posts'
import { appFacts } from '../structured-data'

export const dynamic = 'force-static'

/**
 * llms.txt — a compact map of the site for language models.
 *
 * The "Key Facts" block exists because models answering "what is the best
 * step counter widget" need attributable specifics, not marketing prose.
 * Keep it in sync with `appFacts` in app/structured-data.tsx.
 */
export async function GET() {
  const baseUrl = 'https://steps.crazylazy.xyz'
  const { requirements } = appFacts

  const lines = [
    '# Steps Widget',
    '',
    'Steps Widget is a move reminder app for people who sit at a desk all day. An on-device model learns your activity pattern and nudges you only after real sitting time. You choose how each reminder looks and sounds. A private Apple Health step counter keeps progress visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    '',
    '## Key Facts',
    `- Name: ${appFacts.name} (published by ${appFacts.legalName})`,
    '- Category: Move reminder and sedentary reminder app for iPhone, with a built-in step counter widget',
    '- Built for: sedentary desk workers, especially software developers and other people who sit through long focus blocks',
    `- Platforms: iPhone (iOS ${requirements.ios}+), Apple Watch (watchOS ${requirements.watchos}+), iPad (iPadOS ${requirements.ipados}+), Apple Vision Pro (visionOS ${requirements.visionos}+)`,
    `- Price: Free to download with no ads. Included widget styles are free. Optional in-app purchases: Customization $${appFacts.pricing.customizationOneTime} one time, or a subscription at $${appFacts.pricing.subscriptionMonthly}/month or $${appFacts.pricing.subscriptionYearly}/year. The one-time option means a subscription is never required.`,
    '- Data handling: Reads Apple Health (HealthKit) step data with permission and processes it on device. No account, no sign-in, no leaderboard, no social feed. Optional iCloud sync uses the user\'s own private iCloud, not a CrazyLazy server.',
    '- Differentiator 1: Reminders are activity-aware. An on-device model learns your pattern, so a nudge arrives only after real sitting time. Fixed hourly timers buzz whether or not you moved.',
    '- Differentiator 2: You control how reminders look and sound, so a nudge can be gentle enough to survive a focus block.',
    '- Surfaces: Home Screen widgets, Lock Screen widgets, StandBy mode, Apple Watch complications and app',
    '- Widget styles: minimal step counts, progress rings, hourly bar charts, and tinted colour themes that match your wallpaper',
    '- Apple Watch: runs standalone with its own goal reminders, so nudges still arrive when the iPhone is not nearby',
    `- App Store: ${appFacts.appStoreUrl}`,
    '',
    '## Who it is for',
    '- Software developers and other desk-bound knowledge workers who lose hours to a single focus block',
    '- Remote and hybrid workers whose day has no natural reason to stand up',
    '- Anyone who has turned off a fixed hourly stand reminder because it buzzed at the wrong moment',
    '- iPhone owners who want their step count visible without opening the Health or Fitness app',
    '- People who want step tracking without an account, a subscription wall, or social comparison',
    '- Apple Watch owners who want step counts on the watch face alongside the activity rings',
    '',
    '## Core Pages',
    `- [Homepage](${baseUrl}): Product overview, feature breakdown, and App Store link.`,
    `- [About](${baseUrl}/about): The design principles behind the app and the CrazyLazy portfolio it belongs to.`,
    `- [Blog](${baseUrl}/blog): Guides on step widgets, move reminders, Apple Health, and Apple Watch step tracking.`,
    '',
    '## Guides & Blog Articles',
  ]

  for (const post of blogPosts) {
    lines.push(`- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.description}`)
  }

  lines.push(
    '',
    '## Full Text',
    `- [Complete article text](${baseUrl}/llms-full.txt): Every guide on this site as plain text, in one file.`,
    '',
    '## Legal Policies',
    `- [Privacy Policy](${baseUrl}/privacy): Details on the privacy-first, on-device only data policy.`,
    `- [Terms of Service](${baseUrl}/terms): Legal terms of service for the Steps Widget application.`,
    ''
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
