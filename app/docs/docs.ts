import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { getOptionalNumber, getOptionalString, getString, getStringList, splitFrontMatter } from '../front-matter'

/**
 * The documentation corpus.
 *
 * Docs are deliberately separate from the blog. A blog post is dated opinion or
 * a search-landing guide; a doc page is the reference for one capability and is
 * expected to stay true forever. That difference drives everything here: docs
 * are grouped into ordered sections instead of sorted by date, they carry an
 * explicit `order` rather than a publish timestamp, and they render inside a
 * persistent sidebar so a reader can move sideways through related pages.
 *
 * Files live at `app/docs/content/<section>/<slug>.md`. The folder name is the
 * URL segment, so `content/features/move-reminders.md` serves
 * `/docs/features/move-reminders`.
 */

export type DocSection = {
  /** URL segment, e.g. `features`. */
  slug: string
  title: string
  /** Shown on the docs index card and as the section page description. */
  description: string
  /** Lower sorts first in the sidebar. */
  order: number
}

export type Doc = {
  slug: string
  section: DocSection
  title: string
  metaTitle: string
  description: string
  /** Sidebar order inside its section. */
  order: number
  /** `YYYY-MM-DD` of the last meaningful edit. */
  updated: string
  readingTime: string
  keywords: string[]
  /** Optional illustration; docs read fine without one. */
  image?: string
  content: string
}

export const docsDirectory = path.join(process.cwd(), 'app/docs/content')

/**
 * Sections are declared here rather than inferred from the filesystem: the
 * order and the prose are editorial decisions, and a stray folder should be a
 * build error rather than a mystery nav entry.
 */
export const docSections: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    description: 'Install Steps, grant Health access, and set the daily goal everything else is measured against.',
    order: 1,
  },
  {
    slug: 'goal-reminders',
    title: 'Goal reminders',
    description: 'The on-device model that projects your end-of-day steps, when it decides to nudge you, and how the message gets written.',
    order: 2,
  },
  {
    slug: 'widgets',
    title: 'Widgets',
    description: 'Every widget in the gallery, how to style each one, and the Lock Screen, StandBy, Live Activity, and Apple Watch surfaces.',
    order: 3,
  },
  {
    slug: 'steps-and-data',
    title: 'Steps and data',
    description: 'Where your step count comes from, how to reshape the day it measures, and what stays on your device.',
    order: 4,
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fixes for a widget that will not update, missing steps, and reminders that never arrive.',
    order: 5,
  },
]

export function getDocSection(slug: string) {
  return docSections.find((section) => section.slug === slug)
}

function parseDocFile(section: DocSection, filename: string): Doc {
  const raw = readFileSync(path.join(docsDirectory, section.slug, filename), 'utf8')
  const label = `Doc "${section.slug}/${filename}"`
  const { frontMatter, body } = splitFrontMatter(raw, label)

  const slug = getString(frontMatter, 'slug', label)

  if (slug !== filename.replace(/\.md$/, '')) {
    throw new Error(`${label} declares slug "${slug}" but its filename says otherwise. The two must match so URLs stay predictable.`)
  }

  return {
    slug,
    section,
    title: getString(frontMatter, 'title', label),
    metaTitle: getString(frontMatter, 'metaTitle', label),
    description: getString(frontMatter, 'description', label),
    order: getOptionalNumber(frontMatter, 'order', label) ?? 99,
    updated: getString(frontMatter, 'updated', label),
    readingTime: getString(frontMatter, 'readingTime', label),
    keywords: getStringList(frontMatter, 'keywords', label),
    image: getOptionalString(frontMatter, 'image'),
    content: body,
  }
}

// A function, not a top-level constant, for the same reason the blog loader is
// one: the bundler only re-evaluates a module when its own source changes, so a
// cached array would keep serving stale docs in dev after a `.md` edit.
export function getDocs(): Doc[] {
  return [...docSections]
    .sort((first, second) => first.order - second.order)
    .flatMap((section) => {
      const sectionDirectory = path.join(docsDirectory, section.slug)

      if (!existsSync(sectionDirectory)) {
        return []
      }

      return readdirSync(sectionDirectory)
        .filter((filename) => filename.endsWith('.md'))
        .map((filename) => parseDocFile(section, filename))
        .sort((first, second) => first.order - second.order || first.title.localeCompare(second.title))
    })
}

export function getDocsBySection(sectionSlug: string) {
  return getDocs().filter((doc) => doc.section.slug === sectionSlug)
}

export function getDoc(sectionSlug: string, slug: string) {
  return getDocs().find((doc) => doc.section.slug === sectionSlug && doc.slug === slug)
}

/** Sections paired with their pages, in sidebar order. Empty sections drop out. */
export function getDocTree() {
  const docs = getDocs()

  return [...docSections]
    .sort((first, second) => first.order - second.order)
    .map((section) => ({ section, docs: docs.filter((doc) => doc.section.slug === section.slug) }))
    .filter((group) => group.docs.length > 0)
}

/**
 * The previous and next page in reading order across the whole corpus, so a
 * reader who works front to back never hits a dead end at a section boundary.
 */
export function getDocNeighbours(sectionSlug: string, slug: string) {
  const docs = getDocs()
  const index = docs.findIndex((doc) => doc.section.slug === sectionSlug && doc.slug === slug)

  if (index === -1) {
    return { previous: undefined, next: undefined }
  }

  return { previous: docs[index - 1], next: docs[index + 1] }
}

export function docPath(doc: Pick<Doc, 'slug'> & { section: Pick<DocSection, 'slug'> }) {
  return `/docs/${doc.section.slug}/${doc.slug}`
}

/** The most recent `updated` date in the corpus, for the index page and sitemap. */
export function getDocsLastUpdated() {
  const dates = getDocs().map((doc) => doc.updated)

  return dates.sort().at(-1)
}
