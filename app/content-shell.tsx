import type { ReactNode } from 'react'
import Link from 'next/link'
import { SiteNav } from './site-nav'

type ContentShellProps = {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}

export function ContentShell({ eyebrow, title, description, children }: ContentShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <SiteNav fixed />

      <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-96 bg-[image:var(--hero-glow)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="my-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-muted)] shadow-[var(--soft-shadow)]">
            <span className="size-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_18px_var(--accent-glow)]" />
            {eyebrow}
          </div>

          <h1 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">{description}</p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">{children}</div>
      </section>

      <footer className="border-t border-[color:var(--border)] px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            Back to Home
          </Link>
          <div className="flex gap-4">
            <Link href="/privacy" className="transition hover:text-[var(--text-strong)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--text-strong)]">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
