import { Children, type ReactNode, isValidElement } from 'react'
import Image from 'next/image'
import type { Components } from 'react-markdown'

/**
 * Markdown rendering for docs.
 *
 * Close to the blog's renderer but tuned for reference reading rather than
 * long-form prose: tighter line height, linkable headings so a support reply
 * can point at one paragraph, and numbered steps that stay legible when a
 * procedure runs long.
 */

/** `Add a widget to the Lock Screen` -> `add-a-widget-to-the-lock-screen`. */
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

/** Flattens react-markdown children back to plain text for ids and TOC labels. */
function toText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return ''
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(toText).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return Children.toArray(node.props.children).map(toText).join('')
  }

  return ''
}

function AnchoredHeading({ level, children }: { level: 2 | 3; children: ReactNode }) {
  const id = slugifyHeading(toText(children))
  const Tag = level === 2 ? 'h2' : 'h3'
  const size = level === 2 ? 'mt-12 text-2xl' : 'mt-9 text-xl'

  return (
    <Tag id={id} className={`group scroll-mt-28 ${size} mb-4 font-semibold tracking-[-0.01em] text-[var(--text-strong)]`}>
      <a href={`#${id}`} className="no-underline">
        {children}
        <span aria-hidden="true" className="ml-2 align-middle text-base font-normal text-[var(--accent-color)] opacity-0 transition group-hover:opacity-100">
          #
        </span>
      </a>
    </Tag>
  )
}

export const docMarkdownComponents: Components = {
  h2: ({ children }) => <AnchoredHeading level={2}>{children}</AnchoredHeading>,
  h3: ({ children }) => <AnchoredHeading level={3}>{children}</AnchoredHeading>,
  p: ({ children }) => <p className="mb-5 leading-7 text-[var(--text-muted)] last:mb-0">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--text-strong)]">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => {
    const isExternal = /^https?:\/\//.test(href ?? '')
    return (
      <a
        href={href}
        className="font-medium text-[var(--accent-color)] underline underline-offset-2 hover:opacity-80"
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {children}
      </a>
    )
  },
  ul: ({ children }) => <ul className="mb-5 ml-5 list-disc space-y-2 leading-7 text-[var(--text-muted)] marker:text-[var(--accent-color)]">{children}</ul>,
  ol: ({ children }) => (
    <ol className="mb-5 ml-5 list-decimal space-y-3 leading-7 text-[var(--text-muted)] marker:font-semibold marker:text-[var(--accent-color)]">{children}</ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  // Blockquotes are the callout primitive: `> **Note:** ...` in the markdown.
  blockquote: ({ children }) => (
    <div className="my-6 rounded-[4px] border border-[color:var(--border)] border-l-4 border-l-[color:var(--accent-color)] bg-[var(--surface-media)] px-5 py-4 [&_p]:mb-2 [&_p:last-child]:mb-0">
      {children}
    </div>
  ),
  hr: () => <hr className="my-10 border-[color:var(--border)]" />,
  code: ({ className, children }) => {
    if (className) {
      return <code className={className}>{children}</code>
    }
    return <code className="rounded bg-[var(--surface-media)] px-1.5 py-0.5 font-mono text-[0.9em] text-[var(--text-strong)]">{children}</code>
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-[4px] bg-[var(--surface-media)] p-4 font-mono text-sm leading-6">{children}</pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-[color:var(--border-strong)] px-0 py-2.5 pr-6 text-xs font-medium uppercase tracking-[0.08em] text-[var(--text-subtle)] last:pr-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[color:var(--border)] px-0 py-3 pr-6 align-top leading-6 text-[var(--text-muted)] last:pr-0">{children}</td>
  ),
  img: ({ src, alt }) => (
    <span className="my-6 block overflow-hidden rounded-[4px] bg-[var(--surface-media)]">
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={alt ?? ''}
        width={800}
        height={500}
        sizes="(max-width: 768px) 100vw, 720px"
        className="h-auto w-full object-cover"
      />
    </span>
  ),
}

export type TocEntry = {
  id: string
  title: string
}

/**
 * Pulls `##` headings out of the raw markdown for the on-page contents list.
 *
 * Reads the source rather than the rendered tree so the page can render the
 * TOC before the markdown component ever runs, and skips fenced code blocks so
 * a `# comment` inside a snippet never becomes a nav entry.
 */
export function extractToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = []
  let insideFence = false

  for (const line of markdown.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      insideFence = !insideFence
      continue
    }

    if (insideFence) {
      continue
    }

    const match = line.match(/^##\s+(.+?)\s*$/)

    if (match) {
      const title = match[1].replace(/\*\*/g, '').replace(/`/g, '')
      entries.push({ id: slugifyHeading(title), title })
    }
  }

  return entries
}
