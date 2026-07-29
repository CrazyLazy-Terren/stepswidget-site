import type { ReactNode } from 'react'
import Link from 'next/link'
import { PageSection, pageGutter } from './page-shell'
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

      <PageSection
        paddingY="top"
        overlay={<div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-55 bg-[image:var(--hero-glow)]" />}>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{description}</p>
      </PageSection>

      <PageSection paddingY="default">{children}</PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            Steps Widget
          </Link>
          <div className="flex gap-5">
            <Link href="/docs" className="transition hover:text-[var(--text-strong)]">
              Docs
            </Link>
            <Link href="/blog" className="transition hover:text-[var(--text-strong)]">
              Blog
            </Link>
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
