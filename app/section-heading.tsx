import { Fragment, type ReactNode } from 'react'

const lineBreakPattern = /<br\s*\/?>/i

/**
 * Renders a heading string, turning literal `<br/>` markers into real line
 * breaks so the copy can control where it wraps.
 *
 * The string is split and each piece is rendered as a text node — nothing
 * reaches `dangerouslySetInnerHTML`, so a heading can never become an HTML
 * injection point. Only `<br>` is understood; any other markup stays visible
 * as plain text, which makes a mistake obvious rather than silent.
 */
function withLineBreaks(text: string) {
  return text.split(lineBreakPattern).map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ))
}

/**
 * The heading every page section opens with: an accent eyebrow, the title, and
 * an optional lead paragraph 48px below. Sections share it so they read as
 * one level.
 */
export function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  // `text-balance` redistributes lines on its own, which fights a break the
  // author placed deliberately. Drop it when the copy sets its own.
  const hasManualBreak = lineBreakPattern.test(title)

  return (
    <div className="max-w-3xl">
      <p className="mt-12 text-md font-bold uppercase tracking-[0.14em] text-[var(--accent-color)]">{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl ${hasManualBreak ? '' : 'text-balance'}`}>
        {withLineBreaks(title)}
      </h2>
      {children ? <p className="mt-8 text-lg leading-8 text-[var(--text-muted)]">{children}</p> : null}
    </div>
  )
}
