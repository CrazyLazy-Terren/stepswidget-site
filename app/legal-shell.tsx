import Link from 'next/link'
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
      <SiteNav maxWidth="6xl" />
      <main className="min-h-screen bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
        <section className="relative overflow-hidden px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="absolute inset-x-0 top-0 h-96 bg-[image:var(--hero-glow)]" />
          <div className="relative mx-auto max-w-4xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-muted)] shadow-[var(--soft-shadow)]">
              <span className="size-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_18px_var(--accent-glow)]" />
              {eyebrow}
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--text-muted)]">{description}</p>
            <p className="mt-5 text-sm font-medium text-[var(--text-subtle)]">Last updated: {updated}</p>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)] sm:p-8">
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
        </section>

        <footer className="border-t border-[color:var(--border)] px-5 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
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
