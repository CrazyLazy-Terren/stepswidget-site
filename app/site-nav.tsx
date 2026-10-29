import Image from 'next/image'
import Link from 'next/link'
import { Menu, Search as SearchIcon, X } from 'lucide-react'
import { appStoreUrl } from './app-store'
import { MobileMenu } from './mobile-menu'
import { SearchTrigger } from './search-dialog'
import { ThemeToggle } from './theme-toggle'

type SiteNavProps = {
  fixed?: boolean
  maxWidth?: '6xl' | '7xl'
  lang?: 'en' | 'es'
}

const maxWidthClass = {
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

const productLinksEn = [
  { href: '/', label: 'Overview' },
  { href: '/#features', label: 'Features' },
  { href: '/#watch', label: 'Apple Watch' },
  { href: '/#privacy', label: 'Privacy' },
  { href: '/#faq', label: 'FAQ' },
]

const productLinksEs = [
  { href: '/es', label: 'Resumen' },
  { href: '/es#features', label: 'Funciones' },
  { href: '/es#watch', label: 'Apple Watch' },
  { href: '/es#privacy', label: 'Privacidad' },
  { href: '/es#faq', label: 'FAQ' },
]

const navLinksEn = [
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

const navLinksEs = [
  { href: '/docs', label: 'Docs' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'Acerca de' },
]

export function SiteLogo({ textOnly = false, href }: { textOnly?: boolean; href?: string }) {
  return (
    <Link href={href ?? '/'} className="flex items-center gap-3">
      {!textOnly && (
        <div className="relative size-8 ">
          <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="size-full object-cover" priority />
        </div>
      )}
      <span className="text-md font-semibold tracking-[-0.0125em] text-[var(--text-strong)]">Steps Widget</span>
    </Link>
  )
}

export function SiteNav({ fixed = false, maxWidth = '7xl', lang = 'en' }: SiteNavProps) {
  const isEs = lang === 'es'
  const productLinks = isEs ? productLinksEs : productLinksEn
  const navLinks = isEs ? navLinksEs : navLinksEn
  const homeHref = isEs ? '/es' : '/'

  return (
    <header className={`${fixed ? 'fixed inset-x-0 top-0 z-50' : ''} border-b border-[color:var(--border)] bg-[var(--header-bg)] py-2 sm:py-0 px-6 lg:px-8`}>
      <nav className={`mx-auto flex w-full ${maxWidthClass[maxWidth]} items-center justify-between gap-4`}>
        <SiteLogo href={homeHref} />
        <div className="hidden items-center gap-7 text-md font-medium text-[var(--text-strong)] md:flex">
          <div className="group relative py-5">
            <Link className="inline-flex items-center gap-1 transition hover:text-[var(--text-muted)]" href={homeHref}>
              {isEs ? 'Producto' : 'Product'}
              <span className="size-1.5 rotate-45 border-b border-r border-current opacity-60 transition group-hover:opacity-100" />
            </Link>
            <div className="pointer-events-none absolute left-1/2 top-[80%] z-50 w-40 -translate-x-1/2 translate-y-2 rounded-lg border border-[color:var(--border)] bg-[var(--page-bg)] bg-[image:linear-gradient(var(--surface-1),var(--surface-1))] p-1.5 opacity-0 transition duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-md text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-strong)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          {navLinks.map((item) => (
            <Link key={item.href} className="transition hover:text-[var(--text-muted)]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden flex-wrap items-center justify-end gap-3 md:flex">
          <SearchTrigger />

          <ThemeToggle lang={lang} />
          {isEs && (
            <Link href="/" hrefLang="en" lang="en" className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
              English
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <SearchTrigger compact />
          <ThemeToggle compact lang={lang} />
          <MobileMenu
            summary={
              <summary className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] text-(--text-muted) transition hover:border-[color:var(--border-strong)]">
                <span className="sr-only">{isEs ? 'Abrir menú de navegación' : 'Open navigation menu'}</span>

                <Menu className="size-5 group-open:hidden" />
                <X className="hidden size-5 group-open:block" />
              </summary>
            }>
            <div className="absolute right-0 top-full z-50 mt-3 w-[calc(100vw-3rem)] max-w-sm rounded-lg border border-[color:var(--border)] bg-[var(--page-bg)] bg-[image:linear-gradient(var(--surface-1),var(--surface-1))] p-3">
              <div className="grid gap-1">
                <Link
                  href="/search"
                  className="flex items-center gap-2 rounded-lg bg-[var(--surface-1)] px-3 py-2.5 text-base font-medium text-[var(--text-strong)] transition hover:bg-[var(--surface-2)]">
                  <SearchIcon className="size-4 text-[var(--accent-color)]" />
                  {isEs ? 'Buscar' : 'Search'}
                </Link>
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{isEs ? 'Producto' : 'Product'}</p>
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-strong)]">
                    {item.label}
                  </Link>
                ))}
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 text-base font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-strong)]">
                    {item.label}
                  </Link>
                ))}
                {isEs && (
                  <Link
                    href="/"
                    hrefLang="en"
                    lang="en"
                    className="rounded-lg px-3 py-3 text-base font-medium text-[var(--text-muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text-strong)]">
                    English
                  </Link>
                )}
              </div>
              <div className="mt-3 border-t border-[color:var(--border)] pt-3">
                <a
                  href={appStoreUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center rounded-full bg-[var(--button-bg)] px-4 py-3.5 text-base font-semibold leading-none text-[var(--button-text)] transition hover:opacity-90">
                  {isEs ? 'Obtener app' : 'Get app'}
                </a>
              </div>
            </div>
          </MobileMenu>
        </div>
      </nav>
    </header>
  )
}
