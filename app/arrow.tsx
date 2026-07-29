import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * The site's one forward arrow.
 *
 * Replaces the `->` ASCII digraph that used to be typed inline: it rendered at
 * whatever weight the font gave it, sat on the text baseline rather than the
 * optical centre, and read as a code comment rather than an affordance.
 *
 * Sized in `em` so it scales with whatever type it sits next to, and stroked
 * with `currentColor` so it inherits the link's colour and hover state.
 */
export function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`h-[1em] w-[1em] shrink-0 ${className}`.trim()}>
      <path d="M3.25 8h9.5M9 4.25 12.75 8 9 11.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * A text link that ends in the arrow, which nudges forward on hover.
 *
 * The group is named so it cannot be triggered by an unrelated ancestor that
 * happens to use a bare `group` — card wrappers on this site do.
 */
export function ArrowLink({ href, className = '', children }: { href: string; className?: string; children: ReactNode }) {
  // `w-fit` because a flex-column parent blockifies `inline-flex` into `flex`,
  // which would stretch the link — and its hit area — across the whole column.
  return (
    <Link href={href} className={`group/arrow inline-flex w-fit items-center gap-1.5 ${className}`.trim()}>
      {children}
      <ArrowRight className="transition-transform duration-200 group-hover/arrow:translate-x-0.5" />
    </Link>
  )
}
