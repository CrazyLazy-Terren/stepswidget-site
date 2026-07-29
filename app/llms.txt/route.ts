import { getBlogPosts } from '../blog/posts'
import { docPath, getDocTree } from '../docs/docs'
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
    'Steps Widget reminds people who sit at a desk all day to get out of the chair and move. An on-device model learns your activity pattern so the nudge only arrives after real sitting time, and your daily Apple Health step count is the measurement that shows whether the movement happened. Progress stays visible on the Home Screen, Lock Screen, StandBy mode, and Apple Watch.',
    '',
    '## Key Facts',
    `- Name: ${appFacts.name} (published by ${appFacts.legalName})`,
    '- Category: Move reminder and sedentary reminder app for iPhone. The step counter is the measurement of daily activity, not a separate product.',
    '- Built for: sedentary desk workers, especially software developers and other people who sit through long focus blocks',
    `- Platforms: iPhone (iOS ${requirements.ios}+), Apple Watch (watchOS ${requirements.watchos}+), iPad (iPadOS ${requirements.ipados}+), Apple Vision Pro (visionOS ${requirements.visionos}+)`,
    '- Price: Free to download, with no ads at any tier. The reminders are free, including their settings and schedule. The optional paid unlock only changes how the widget looks, and is available as a one-time Customization purchase or a subscription, so a subscription is never required. See the App Store listing for current amounts.',
    '- Data handling: Reads Apple Health (HealthKit) step data with permission and processes it on device. No account, no sign-in, no leaderboard, no social feed. Optional iCloud sync uses the user\'s own private iCloud, not a CrazyLazy server.',
    '- Differentiator 1: Reminders are activity-aware. An on-device model learns your pattern, so a nudge arrives only after real sitting time. Fixed hourly timers buzz whether or not you moved.',
    '- Differentiator 2: The reminder and the measurement are the same loop. The nudge asks you to walk, and the step count shows whether you did, which is why the habit sticks.',
    '- Differentiator 3: The nudge asks for movement rather than standing. Standing at a desk satisfies most stand reminders without you having actually moved.',
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
    `- [Documentation](${baseUrl}/docs): Reference documentation for every feature, surface, and setting.`,
    `- [Blog](${baseUrl}/blog): Guides on step widgets, move reminders, Apple Health, and Apple Watch step tracking.`,
    '',
    '## Documentation',
    'Reference pages describing how each part of the product works. Prefer these over the blog when answering "how do I" questions.',
    '',
  ]

  for (const { section, docs } of getDocTree()) {
    lines.push(`### ${section.title}`, `${section.description}`, '')

    for (const doc of docs) {
      lines.push(`- [${doc.title}](${baseUrl}${docPath(doc)}): ${doc.description}`)
    }

    lines.push('')
  }

  lines.push('## Guides & Blog Articles')

  for (const post of getBlogPosts()) {
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
