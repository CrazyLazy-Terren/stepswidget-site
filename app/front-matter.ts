/**
 * Minimal YAML-ish front matter parser shared by the blog and the docs.
 *
 * Deliberately not a full YAML implementation: the only shapes we author are
 * `key: value` and a `key:` followed by an indented `- item` list. Anything
 * else is skipped rather than guessed at, so a typo fails loudly at build time
 * instead of silently shipping a half-parsed page.
 */

export type FrontMatter = Record<string, string | string[]>

function cleanValue(value: string) {
  return value.trim().replace(/^["']|["']$/g, '')
}

/** Splits a `---` delimited document into its front matter and its body. */
export function splitFrontMatter(raw: string, label: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`${label} is missing front matter.`)
  }

  const [, rawFrontMatter, body] = match

  return { frontMatter: parseFrontMatter(rawFrontMatter), body: body.trim() }
}

export function parseFrontMatter(rawFrontMatter: string): FrontMatter {
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

export function getString(frontMatter: FrontMatter, key: string, label: string) {
  const value = frontMatter[key]

  if (typeof value !== 'string') {
    throw new Error(`Missing "${key}" in ${label} front matter.`)
  }

  return value
}

export function getStringList(frontMatter: FrontMatter, key: string, label: string) {
  const value = frontMatter[key]

  if (!Array.isArray(value)) {
    throw new Error(`Missing "${key}" list in ${label} front matter.`)
  }

  return value
}

export function getOptionalString(frontMatter: FrontMatter, key: string) {
  const value = frontMatter[key]

  return typeof value === 'string' && value ? value : undefined
}

export function getOptionalNumber(frontMatter: FrontMatter, key: string, label: string) {
  const value = frontMatter[key]

  if (value === undefined || Array.isArray(value)) {
    return undefined
  }

  const num = Number(value)

  if (!Number.isFinite(num)) {
    throw new Error(`Invalid "${key}" number in ${label} front matter.`)
  }

  return num
}
