import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { estimateReadingTime, getOptionalNumber, getOptionalString, getString, getStringList, splitFrontMatter } from '@/app/front-matter'
import type { BlogPost } from '@/app/(en)/blog/posts'

export const esPostsDirectory = path.join(process.cwd(), 'app/(es)/es/blog/posts')

function parsePostFile(filename: string): BlogPost {
  const raw = readFileSync(path.join(esPostsDirectory, filename), 'utf8')
  const label = `Spanish blog post "${filename}"`
  const { frontMatter, body } = splitFrontMatter(raw, label)

  return {
    slug: getString(frontMatter, 'slug', label),
    category: getString(frontMatter, 'category', label),
    title: getString(frontMatter, 'title', label),
    metaTitle: getString(frontMatter, 'metaTitle', label),
    description: getString(frontMatter, 'description', label),
    date: getString(frontMatter, 'date', label),
    updated: getOptionalString(frontMatter, 'updated'),
    readingTime: estimateReadingTime(body, 'es'),
    order: getOptionalNumber(frontMatter, 'order', label),
    keywords: getStringList(frontMatter, 'keywords', label),
    image: getOptionalString(frontMatter, 'image'),
    content: body,
  }
}

export function getEsBlogPosts(): BlogPost[] {
  try {
    return readdirSync(esPostsDirectory)
      .filter((filename) => filename.endsWith('.md'))
      .map(parsePostFile)
      .sort((firstPost, secondPost) => {
        return new Date(secondPost.date).getTime() - new Date(firstPost.date).getTime()
      })
  } catch {
    return []
  }
}

export function getEsBlogPost(slug: string): BlogPost | undefined {
  return getEsBlogPosts().find((post) => post.slug === slug)
}

export function getEsBlogPostMarkdown(slug: string): string | undefined {
  const post = getEsBlogPost(slug)

  if (!post) {
    return undefined
  }

  return readFileSync(path.join(esPostsDirectory, `${post.slug}.md`), 'utf8')
}
