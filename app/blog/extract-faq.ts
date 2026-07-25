import type { FaqEntry } from '../structured-data'

/**
 * Derives FAQPage entries from a post's markdown so we do not have to maintain
 * the same Q&A twice.
 *
 * Two authoring patterns are recognised:
 *
 *   1. `**Can I show steps on my Lock Screen?** Yes. Add the widget...`
 *      A bold question followed by its answer in the same paragraph.
 *
 *   2. `## How accurate are pedometer widgets?`
 *      A question-shaped heading; the prose beneath it is the answer.
 *
 * Only genuine question text is returned. Anything that fails the length or
 * shape checks is skipped rather than guessed at, because a FAQPage containing
 * junk is worse than no FAQPage at all.
 */

const MIN_ANSWER_LENGTH = 40
const MAX_ANSWER_LENGTH = 1200
const MAX_ENTRIES = 10

/** Reduces markdown to the plain sentence a search engine should quote. */
function toPlainText(markdown: string) {
  return markdown
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> label
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/\*\*([^*]+)\*\*/g, '$1') // bold
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '$1') // italic
    .replace(/^\s*[-*]\s+/gm, '') // list bullets
    .replace(/^\s*>\s?/gm, '') // blockquotes
    .replace(/\s+/g, ' ')
    .trim()
}

function isUsableAnswer(text: string) {
  return text.length >= MIN_ANSWER_LENGTH && text.length <= MAX_ANSWER_LENGTH
}

/** `**Question?** Answer.` on a single line. */
function fromBoldQuestions(markdown: string): FaqEntry[] {
  const entries: FaqEntry[] = []
  const pattern = /^\*\*(.+?\?)\*\*\s*(.+)$/gm

  for (const match of markdown.matchAll(pattern)) {
    const question = toPlainText(match[1])
    const answer = toPlainText(match[2])

    if (question && isUsableAnswer(answer)) {
      entries.push({ question, answer })
    }
  }

  return entries
}

/** `## Question?` followed by prose up to the next heading. */
function fromQuestionHeadings(markdown: string): FaqEntry[] {
  const entries: FaqEntry[] = []
  const lines = markdown.split('\n')

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^#{2,3}\s+(.*\?)\s*$/)

    if (!heading) {
      continue
    }

    const question = toPlainText(heading[1])
    const body: string[] = []

    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (/^#{1,6}\s/.test(lines[cursor])) {
        break
      }
      body.push(lines[cursor])
    }

    // Tables and images do not translate to a spoken answer; drop them.
    const answer = toPlainText(
      body
        .filter((line) => !line.trim().startsWith('|'))
        .join(' ')
    )

    if (question && isUsableAnswer(answer)) {
      entries.push({ question, answer })
    }
  }

  return entries
}

export function extractFaqEntries(markdown: string): FaqEntry[] {
  const seen = new Set<string>()
  const entries: FaqEntry[] = []

  for (const entry of [...fromBoldQuestions(markdown), ...fromQuestionHeadings(markdown)]) {
    const key = entry.question.toLowerCase()

    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    entries.push(entry)
  }

  return entries.slice(0, MAX_ENTRIES)
}
