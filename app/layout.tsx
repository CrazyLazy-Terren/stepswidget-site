import type { Metadata } from 'next'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import { defaultOgImages, siteName, siteUrl } from './shared-metadata'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Steps Widget - Step Counter and Goal Reminder for iPhone and Apple Watch',
    description:
    'A step counter that projects how your day will end. An on-device model forecasts your end-of-day step count and reminds you only when you are heading to miss your goal. Apple Health steps on your Home Screen, Lock Screen, Apple Watch, and Mac. Free reminders, no account.',
  keywords: [
    'Steps Widget',
    'stand up reminder app',
    'move reminder app',
    'sedentary reminder app',
    'movement reminder app for desk workers',
    'customizable stand reminder iPhone',
    'activity aware move reminders',
    'on-device step reminder app',
    'get up and move notifications iPhone',
    'stand up reminder for programmers',
    'iPhone step counter widget',
    'Apple Health steps widget',
    'Lock Screen steps widget',
    'Apple Watch steps widget',
    'pedometer widget for iPhone',
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
    title: 'Steps Widget - Step Counter and Goal Reminder for iPhone and Apple Watch',
    description:
      'An on-device model projects your end-of-day step count and reminds you only when you are heading for a miss. Apple Health steps on iPhone, Apple Watch, and Mac.',
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_US',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steps Widget - Step Counter and Goal Reminder for iPhone and Apple Watch',
    description:
      'An on-device model projects your end-of-day step count and reminds you only when you are heading for a miss. Apple Health steps on iPhone, Apple Watch, and Mac.',
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
