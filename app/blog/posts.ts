import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { getOptionalNumber, getOptionalString, getString, getStringList, splitFrontMatter } from '../front-matter'

export type BlogPost = {
  slug: string
  category: string
  title: string
  metaTitle: string
  description: string
  date: string
  /**
   * Last meaningful content edit, as `YYYY-MM-DD`.
   * Optional; falls back to `date`. Bump it whenever a post is refreshed so
   * `dateModified` in the Article schema stays honest — search engines and AI
   * answer engines both weight recency.
   */
  updated?: string
  readingTime: string
  order?: number
  keywords: string[]
  /**
   * Hero image shown above the post body, as a `/assets/…` path.
   * Optional: a post that leads with its own inline imagery can omit it rather
   * than repeat a picture the body already shows. Social cards fall back to
   * the site-wide OG image, and the primary-image schema node is dropped.
   */
  image?: string
  content: string
}

export const postsDirectory = path.join(process.cwd(), 'app/blog/posts')

function parsePostFile(filename: string): BlogPost {
  const raw = readFileSync(path.join(postsDirectory, filename), 'utf8')
  const label = `Blog post "${filename}"`
  const { frontMatter, body } = splitFrontMatter(raw, label)

  return {
    slug: getString(frontMatter, 'slug', label),
    category: getString(frontMatter, 'category', label),
    title: getString(frontMatter, 'title', label),
    metaTitle: getString(frontMatter, 'metaTitle', label),
    description: getString(frontMatter, 'description', label),
    date: getString(frontMatter, 'date', label),
    updated: getOptionalString(frontMatter, 'updated'),
    readingTime: getString(frontMatter, 'readingTime', label),
    order: getOptionalNumber(frontMatter, 'order', label),
    keywords: getStringList(frontMatter, 'keywords', label),
    image: getOptionalString(frontMatter, 'image'),
    content: body,
  }
}

// A function, not a top-level constant: the bundler only re-runs a module
// when its own source changes, so a cached top-level array would keep
// serving stale posts in dev whenever only a `.md` file is edited.
export function getBlogPosts() {
  return readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map(parsePostFile)
    .sort((firstPost, secondPost) => {
      // const firstOrder = firstPost.order
      // const secondOrder = secondPost.order

      // const hasFirstOrder = firstOrder !== undefined
      // const hasSecondOrder = secondOrder !== undefined

      // if (hasFirstOrder && hasSecondOrder) {
      //   if (firstOrder !== secondOrder) {
      //     return firstOrder - secondOrder
      //   }
      //   return new Date(secondPost.date).getTime() - new Date(firstPost.date).getTime()
      // }

      // if (hasFirstOrder) {
      //   return -1
      // }

      // if (hasSecondOrder) {
      //   return 1
      // }

      return new Date(secondPost.date).getTime() - new Date(firstPost.date).getTime()
    })
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug)
}

export function getBlogPostMarkdown(slug: string) {
  const post = getBlogPost(slug)

  if (!post) {
    return undefined
  }

  return readFileSync(path.join(postsDirectory, `${post.slug}.md`), 'utf8')
}
