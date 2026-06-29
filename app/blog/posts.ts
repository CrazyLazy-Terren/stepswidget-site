import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

export type BlogPost = {
  slug: string
  category: string
  title: string
  metaTitle: string
  description: string
  date: string
  readingTime: string
  order: number
  keywords: string[]
  intro: string[]
  sections: {
    heading: string
    paragraphs: string[]
    bullets?: string[]
  }[]
}

type FrontMatter = Record<string, string | string[]>

export const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

function cleanValue(value: string) {
  return value.trim().replace(/^["']|["']$/g, '')
}

function parseFrontMatter(rawFrontMatter: string): FrontMatter {
  const result: FrontMatter = {}
  const lines = rawFrontMatter.split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]

    if (!line.trim()) {
      continue
    }

    const match = line.match(/^([A-Za-z]+):\s*(.*)$/)

    if (!match) {
      continue
    }

    const [, key, rawValue] = match
    const value = rawValue.trim()

    if (value) {
      result[key] = cleanValue(value)
      continue
    }

    const list: string[] = []
    let nextIndex = index + 1

    while (nextIndex < lines.length) {
      const listMatch = lines[nextIndex].match(/^\s*-\s+(.+)$/)

      if (!listMatch) {
        break
      }

      list.push(cleanValue(listMatch[1]))
      nextIndex += 1
    }

    result[key] = list
    index = nextIndex - 1
  }

  return result
}

function getString(frontMatter: FrontMatter, key: string) {
  const value = frontMatter[key]

  if (typeof value !== 'string') {
    throw new Error(`Missing "${key}" in blog post front matter.`)
  }

  return value
}

function getStringList(frontMatter: FrontMatter, key: string) {
  const value = frontMatter[key]

  if (!Array.isArray(value)) {
    throw new Error(`Missing "${key}" list in blog post front matter.`)
  }

  return value
}

function getNumber(frontMatter: FrontMatter, key: string) {
  const value = Number(getString(frontMatter, key))

  if (!Number.isFinite(value)) {
    throw new Error(`Invalid "${key}" number in blog post front matter.`)
  }

  return value
}

function parseMarkdownBody(markdown: string): Pick<BlogPost, 'intro' | 'sections'> {
  const intro: string[] = []
  const sections: BlogPost['sections'] = []
  let currentSection: BlogPost['sections'][number] | undefined

  const blocks = markdown
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)

  for (const block of blocks) {
    if (block.startsWith('## ')) {
      currentSection = {
        heading: block.replace(/^##\s+/, '').trim(),
        paragraphs: [],
      }
      sections.push(currentSection)
      continue
    }

    const lines = block.split('\n')
    const isBulletList = lines.every((line) => line.trim().startsWith('- '))

    if (isBulletList && currentSection) {
      currentSection.bullets = lines.map((line) => line.replace(/^\s*-\s+/, '').trim())
      continue
    }

    const paragraph = lines.join(' ')

    if (currentSection) {
      currentSection.paragraphs.push(paragraph)
    } else {
      intro.push(paragraph)
    }
  }

  return { intro, sections }
}

function parsePostFile(filename: string): BlogPost {
  const raw = readFileSync(path.join(postsDirectory, filename), 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Blog post "${filename}" is missing front matter.`)
  }

  const [, rawFrontMatter, markdown] = match
  const frontMatter = parseFrontMatter(rawFrontMatter)
  const body = parseMarkdownBody(markdown)

  return {
    slug: getString(frontMatter, 'slug'),
    category: getString(frontMatter, 'category'),
    title: getString(frontMatter, 'title'),
    metaTitle: getString(frontMatter, 'metaTitle'),
    description: getString(frontMatter, 'description'),
    date: getString(frontMatter, 'date'),
    readingTime: getString(frontMatter, 'readingTime'),
    order: getNumber(frontMatter, 'order'),
    keywords: getStringList(frontMatter, 'keywords'),
    ...body,
  }
}

export const blogPosts = readdirSync(postsDirectory)
  .filter((filename) => filename.endsWith('.md'))
  .map(parsePostFile)
  .sort((firstPost, secondPost) => firstPost.order - secondPost.order)

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostMarkdown(slug: string) {
  const post = getBlogPost(slug)

  if (!post) {
    return undefined
  }

  return readFileSync(path.join(postsDirectory, `${post.slug}.md`), 'utf8')
}
