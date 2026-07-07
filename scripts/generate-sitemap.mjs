import { writeFileSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const baseUrl = 'https://steps.crazylazy.xyz'
const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

function cleanValue(value) {
  return value.trim().replace(/^["']|["']$/g, '')
}

function parseFrontMatter(rawFrontMatter) {
  const result = {}
  const lines = rawFrontMatter.split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.trim()) continue

    const match = line.match(/^([A-Za-z]+):\s*(.*)$/)
    if (!match) continue

    const [, key, rawValue] = match
    const value = rawValue.trim()

    if (value) {
      result[key] = cleanValue(value)
      continue
    }

    const list = []
    let nextIndex = index + 1

    while (nextIndex < lines.length) {
      const listMatch = lines[nextIndex].match(/^\s*-\s+(.+)$/)
      if (!listMatch) break
      list.push(cleanValue(listMatch[1]))
      nextIndex += 1
    }

    result[key] = list
    index = nextIndex - 1
  }

  return result
}

function parsePostFile(filename) {
  const raw = readFileSync(path.join(postsDirectory, filename), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Blog post "${filename}" is missing front matter.`)
  }

  const [, rawFrontMatter] = match
  const frontMatter = parseFrontMatter(rawFrontMatter)

  return {
    slug: frontMatter.slug,
    date: frontMatter.date,
  }
}

try {
  // 1. Get blog posts
  const blogPosts = readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map(parsePostFile)

  // 2. Generate Sitemap XML
  const currentDate = new Date().toISOString()
  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
`

  for (const post of blogPosts) {
    sitemapXml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.date}T00:00:00Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  }

  sitemapXml += `</urlset>\n`

  // Write to public folder
  writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemapXml, 'utf8')

  // Generate Robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /blog/posts/
Disallow: /blog/posts/*

Sitemap: ${baseUrl}/sitemap.xml
`

  writeFileSync(path.join(process.cwd(), 'public/robots.txt'), robotsTxt, 'utf8')

  console.log('Successfully generated public/sitemap.xml and public/robots.txt as part of build!')
} catch (error) {
  console.error('Failed to generate sitemap:', error)
  process.exit(1)
}
