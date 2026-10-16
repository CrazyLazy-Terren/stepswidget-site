import type { ReactNode } from 'react'

/**
 * The single source of truth for page gutters, content width, and vertical
 * rhythm.
 *
 * Every top-level surface — home, docs, blog, about, legal — lays out through
 * these, so a heading on one page lines up with a heading on another. Before
 * this existed the shells had drifted: the blog sat in `max-w-6xl` with 80px
 * of vertical padding while the docs used `max-w-7xl` and 96px, which put the
 * two content columns 32px out of alignment.
 *
 * Change a value here and it moves everywhere. Do not hand-roll
 * `px-6 lg:px-8` in a page.
 */

/** Horizontal gutter. Also used by footers and the nav so they align with content. */
export const pageGutter = 'px-6 lg:px-8'

/** Outer content width. */
export const pageMaxWidth = 'max-w-7xl'

// Two values only: 96px at the page's top and bottom edge, 64px from one
// section to the next. Sections pad their top edge alone, so a stack of them
// never doubles the gap. The 96px top also clears the fixed nav.
const paddingYClass = {
  /** A page that is a single section. */
  default: 'py-24',
  /** The first section on a page. */
  top: 'pt-24',
  /** Any section after the first. */
  section: 'pt-20',
  /** The last section on a page. */
  bottom: 'pt-20 pb-24',
  none: '',
} as const

type PageSectionProps = {
  id?: string
  /** Extra classes on the `<section>` itself. */
  className?: string
  /** Extra classes on the inner content container. */
  containerClassName?: string
  /**
   * Where this section sits on the page, which sets its vertical rhythm. Split out rather than left to
   * `className` because two competing Tailwind padding utilities resolve by
   * stylesheet order, not by the order they appear in the string.
   */
  paddingY?: keyof typeof paddingYClass
  /**
   * Rendered inside the section but outside the content container — for a
   * full-bleed background such as the hero glow.
   */
  overlay?: ReactNode
  children: ReactNode
}

export function PageSection({ id, className = '', containerClassName = '', paddingY = 'default', overlay, children }: PageSectionProps) {
  return (
    <section id={id} className={`${overlay ? 'relative ' : ''}${pageGutter} ${paddingYClass[paddingY]} ${className}`.trim()}>
      {overlay}
      <div className={`relative mx-auto w-full ${pageMaxWidth} ${containerClassName}`.trim()}>{children}</div>
    </section>
  )
}

/** The content container on its own, for places that manage their own section. */
export function PageContainer({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full ${pageMaxWidth} ${className}`.trim()}>{children}</div>
}
