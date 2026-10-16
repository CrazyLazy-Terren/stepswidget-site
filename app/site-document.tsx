import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { siteUrl } from './shared-metadata'
import './globals.css'

/** Metadata every root layout shares; each layout adds its own title and copy. */
export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/assets/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/assets/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/assets/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

type Accent = 'neutral' | 'pink' | 'sky'

/**
 * The accent the site renders with.
 *
 * Fixed rather than read from the `accent` cookie: the AccentToggle that wrote
 * that cookie is hidden in the nav, so honouring a stale `pink`/`sky` value
 * would strand earlier visitors on a palette they have no way to leave. The
 * `pink` and `sky` rules still exist in globals.css — restore the toggle and
 * the cookie read together to bring them back.
 */
const accent: Accent = 'neutral'

/**
 * Applies the saved theme before first paint.
 *
 * The HTML is prerendered as light so pages stay static; reading the `theme`
 * cookie on the server would make every route render per request. ThemeToggle
 * writes the cookie this reads.
 */
const themeScript = `(function(){try{if(/(?:^|; )theme=dark(?:;|$)/.test(document.cookie))document.documentElement.setAttribute("data-theme","dark")}catch(e){}})()`

/**
 * The `<html>` document shared by the root layouts.
 *
 * There is one root layout per language (`app/(en)`, `app/(es)`) so that
 * `<html lang>` is known at build time instead of being read from a request
 * header.
 */
export function SiteDocument({ lang, children }: Readonly<{ lang: 'en' | 'es'; children: React.ReactNode }>) {
  return (
    <html lang={lang} className="h-full antialiased" data-theme="light" data-accent={accent} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="apple-itunes-app" content="app-id=6756297788, affiliate-data=pt=120739140&ct=website" />
      </head>
      <GoogleTagManager gtmId="GTM-KKL76RP3" />
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
