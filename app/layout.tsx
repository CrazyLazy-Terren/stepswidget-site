import type { Metadata } from 'next'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import { defaultOgImages, siteName, siteUrl } from './shared-metadata'
import './globals.css'

const title = 'Steps Widget - See Your Steps, Get a Gentle Nudge on iPhone and Apple Watch'
const description =
  'See your steps, get a gentle nudge, and move a little more every day. Step counter widgets for iPhone, Apple Watch, and Mac, with reminders at the right moment, not every hour. No workout plans, no account.'
const shareDescription =
  'No workout plans, no calorie counting. Just your step count in sight and a gentle nudge at the right moment. Move a little more every day.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'Steps Widget',
    'iPhone step counter widget',
    'Apple Health steps widget',
    'Lock Screen steps widget',
    'Apple Watch steps widget',
    'steps widget on Mac',
    'walk more reminder app',
    'gentle move reminder iPhone',
    'reminder to walk more for desk workers',
    'daily step goal reminder',
    'healthy walking habit app',
    'simple step counter no workout plans',
    'pedometer widget for iPhone',
    'private step counter no account',
  ],
  icons: {
    icon: [
      { url: '/assets/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/assets/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/assets/stepswidget-icon.png', sizes: '1024x1024', type: 'image/png' }],
  },
  openGraph: {
    title,
    description: shareDescription,
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_US',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: shareDescription,
    images: defaultOgImages,
  },
}

type Theme = 'dark' | 'light'
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

function normalizeTheme(value: string | undefined): Theme {
  return value === 'dark' ? 'dark' : 'light'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const theme = normalizeTheme(cookieStore.get('theme')?.value)

  return (
    <html lang="en" className="h-full antialiased" data-theme={theme} data-accent={accent} suppressHydrationWarning>
      <head>
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
