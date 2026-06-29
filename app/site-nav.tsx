import Image from 'next/image'
import Link from 'next/link'
import { AccentToggle, ThemeToggle } from './theme-toggle'

export const appStoreUrl = 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=website&mt=8'

type SiteNavProps = {
  fixed?: boolean
  maxWidth?: '6xl' | '7xl'
}

const maxWidthClass = {
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

const productLinks = [
  { href: '/', label: 'Overview' },
  { href: '/#features', label: 'Features' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/#faq', label: 'FAQ' },
]

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
]

export function SiteLogo({ textOnly = false }: { textOnly?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3">
      {!textOnly && (
        <div className="relative size-10 overflow-hidden rounded-[12px] shadow-[var(--icon-shadow)]">
          <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="size-full object-cover" priority />
        </div>
      )}
      <span className="text-md font-semibold tracking-[-0.0125em] text-[var(--text-strong)]">Steps Widget</span>
    </Link>
  )
}

export function SiteNav({ fixed = false, maxWidth = '7xl' }: SiteNavProps) {
  return (
    <header className={`${fixed ? 'fixed inset-x-0 top-0 z-50' : ''} border-b border-[color:var(--border)] bg-[var(--header-bg)] backdrop-blur-xl `}>
      <nav className={`mx-auto flex w-full ${maxWidthClass[maxWidth]} items-center justify-between gap-4 px-5 py-2 sm:px-6 sm:py-0 lg:px-0`}>
        <SiteLogo textOnly={true} />
        <div className="hidden items-center gap-7 text-md font-medium text-[var(--text-muted)] md:flex">
          <div className="group relative py-5">
            <Link className="inline-flex items-center gap-1 transition hover:text-[var(--text-strong)]" href="/">
              Product
              <span className="size-1.5 rotate-45 border-b border-r border-current opacity-60 transition group-hover:opacity-100" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-full z-50 w-40 -translate-x-1/2 translate-y-2 rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-1)] p-1.5 opacity-0 shadow-[var(--soft-shadow)] backdrop-blur-xl transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-[10px] px-3 py-2 text-md text-[var(--text-muted)] transition hover:bg-[var(--surface-1)] hover:text-[var(--text-strong)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((item) => (
            <Link key={item.href} className="transition hover:text-[var(--text-strong)]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden flex-wrap items-center justify-end gap-2 md:flex">
          <AccentToggle />
          <ThemeToggle />
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center justify-center rounded-full bg-[var(--button-bg)] px-4 py-2.5 text-sm font-semibold leading-none text-[var(--button-text)] transition hover:opacity-90 sm:inline-flex">
            Get app
          </a>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <AccentToggle compact />
          <ThemeToggle compact />
          <details className="group relative">
            <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] text-[var(--text-strong)] shadow-[var(--soft-shadow)] transition hover:border-[color:var(--border-strong)]">
              <span className="sr-only">Open navigation menu</span>
              <svg className="size-5 group-open:hidden" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 6.5h12M4 10h12M4 13.5h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <svg className="hidden size-5 group-open:block" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m6 6 8 8M14 6l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 w-[calc(100vw-2.5rem)] max-w-sm rounded-[22px] border border-[color:var(--border)] bg-[var(--surface-3)] p-3 shadow-[var(--soft-shadow)] backdrop-blur-xl">
              <div className="grid gap-1">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Product</p>
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[12px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-1)] hover:text-[var(--text-strong)]">
                    {item.label}
                  </Link>
                ))}
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[12px] px-3 py-2.5 text-sm font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-1)] hover:text-[var(--text-strong)]">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="mt-3 border-t border-[color:var(--border)] pt-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full bg-[var(--button-bg)] px-4 py-2.5 text-sm font-semibold leading-none text-[var(--button-text)] transition hover:opacity-90">
                  Get app
                </a>
              </div>
            </div>
          </details>
        </div>
      </nav>
    </header>
  )
}
