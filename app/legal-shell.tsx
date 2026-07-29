import Link from 'next/link'
import { PageSection, pageGutter } from './page-shell'
import { SiteNav } from './site-nav'

type LegalSection = {
  title: string
  body: string[]
}

type LegalShellProps = {
  eyebrow: string
  title: string
  description: string
  updated: string
  sections: LegalSection[]
}

export function LegalShell({ eyebrow, title, description, updated, sections }: LegalShellProps) {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
        <PageSection
          paddingY="top"
          overlay={<div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-55 bg-[image:var(--hero-glow)]" />}>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{description}</p>
          <p className="mt-5 text-sm font-medium text-[var(--text-subtle)]">Last updated: {updated}</p>
        </PageSection>

        <PageSection>
          <article className="max-w-3xl">
            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{section.title}</h2>
                  <div className="mt-4 space-y-4">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-[var(--text-muted)]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </PageSection>

        <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
              Back to Steps Widget
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
    </>
  )
}
