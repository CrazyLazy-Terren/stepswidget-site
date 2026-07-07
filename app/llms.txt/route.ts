import { blogPosts } from '../blog/posts'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://steps.crazylazy.xyz'

  const lines = [
    '# Steps Widget Website',
    '',
    'Steps Widget is a beautiful, privacy-first iPhone step counter widget supporting Home Screen, Lock Screen, Apple Health, and Apple Watch tracking.',
    '',
    '## Core Pages',
    `- [Homepage](${baseUrl}): Clean landing page promoting the app features and App Store links.`,
    `- [About](${baseUrl}/about): Information about the creators and the design principles of the app.`,
    `- [Blog](${baseUrl}/blog): Index page for guides and SEO articles on step tracking.`,
    '',
    '## Guides & Blog Articles',
  ]

  for (const post of blogPosts) {
    lines.push(`- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.description}`)
  }

  lines.push(
    '',
    '## Legal Policies',
    `- [Privacy Policy](${baseUrl}/privacy): Details on our strict privacy-first, on-device only storage policy.`,
    `- [Terms of Service](${baseUrl}/terms): Legal terms of service for the Steps Widget application.`,
    ''
  )

  const content = lines.join('\n')

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
