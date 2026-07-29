import type { ReactNode } from 'react'
import Link from 'next/link'
import { PageSection, pageGutter } from '../page-shell'
import { SiteNav } from '../site-nav'
import { docPath, getDocTree } from './docs'

/**
 * The docs chrome: persistent section navigation plus the page body.
 *
 * Deliberately flat — hairline rules and surface tints instead of cards and
 * shadows. Reference pages are read, not browsed, so the chrome's job is to
 * stay out of the way of a column of text.
 *
 * The active page is passed down rather than read from `usePathname` so the
 * whole shell stays a Server Component — a documentation sidebar is static
 * markup and should not cost the reader a client bundle.
 */

type DocsShellProps = {
  /** Section slug of the page being viewed, for the active state. */
  activeSection?: string
  /** Doc slug of the page being viewed, for the active state. */
  activeSlug?: string
  children: ReactNode
}

function DocsNavList({ activeSection, activeSlug }: { activeSection?: string; activeSlug?: string }) {
  const tree = getDocTree()

  return (
    <nav aria-label="Documentation" className="grid gap-8 text-sm">
      {tree.map(({ section, docs }) => {
        const isActiveSection = section.slug === activeSection

        return (
          <div key={section.slug}>
            <Link
              href={`/docs/${section.slug}`}
              className={`block text-xs font-medium uppercase tracking-[0.14em] transition ${
                isActiveSection ? 'text-[var(--accent-color)]' : 'text-[var(--text-subtle)] hover:text-[var(--text-strong)]'
              }`}>
              {section.title}
            </Link>
            <ul className="mt-3 grid">
              {docs.map((doc) => {
                const isActive = isActiveSection && doc.slug === activeSlug

                return (
                  <li key={doc.slug}>
                    <Link
                      href={docPath(doc)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`block border-l py-1.5 pl-3 transition ${
                        isActive
                          ? 'border-l-[color:var(--accent-color)] font-medium text-[var(--text-strong)]'
                          : 'border-l-[color:var(--border)] text-[var(--text-muted)] hover:border-l-[color:var(--text-subtle)] hover:text-[var(--text-strong)]'
                      }`}>
                      {doc.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </nav>
  )
}

export function DocsShell({ activeSection, activeSlug, children }: DocsShellProps) {
  return (
    <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <SiteNav fixed />

      <PageSection containerClassName="grid gap-x-12 gap-y-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
            <DocsNavList activeSection={activeSection} activeSlug={activeSlug} />
          </div>
        </aside>

        <details className="group border-y border-[color:var(--border)] lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-[var(--text-strong)]">
            Browse documentation
            <svg className="size-4 text-[var(--text-subtle)] transition group-open:rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="border-t border-[color:var(--border)] py-6">
            <DocsNavList activeSection={activeSection} activeSlug={activeSlug} />
          </div>
        </details>

        <div className="min-w-0">{children}</div>
      </PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            Steps Widget
          </Link>
          <div className="flex gap-5">
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

/** Small breadcrumb strip reused by the section and doc pages. */
export function DocsBreadcrumb({ trail }: { trail: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-subtle)]">
      {trail.map((crumb, index) => (
        <span key={crumb.name} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="opacity-50">
              /
            </span>
          )}
          {crumb.href ? (
            <Link href={crumb.href} className="transition hover:text-[var(--text-strong)]">
              {crumb.name}
            </Link>
          ) : (
            <span className="text-[var(--text-muted)]">{crumb.name}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
