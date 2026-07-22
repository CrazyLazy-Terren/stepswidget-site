import type { Metadata } from 'next'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import { defaultOgImages, siteName, siteUrl } from './shared-metadata'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Steps Widget - Move Reminders & Step Counter for iPhone',
  description:
    'Steps Widget sends smart, activity-aware move reminders that nudge you to get up when you have actually been sitting, plus a private step counter widget for Home Screen, Lock Screen, and Apple Watch.',
  keywords: [
    'Steps Widget',
    'steps widget',
    'move reminder app',
    'stand up reminder app',
    'sedentary reminder app',
    'get up and move notifications iPhone',
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
    title: 'Steps Widget - Move Reminders & Step Counter for iPhone',
    description: 'Smart move reminders that nudge you when you have been sitting, plus a private Apple Health steps widget for iPhone and Apple Watch.',
    url: siteUrl,
    siteName,
    type: 'website',
    locale: 'en_US',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steps Widget - Move Reminders & Step Counter for iPhone',
    description: 'Smart move reminders that nudge you when you have been sitting, plus a private Apple Health steps widget for iPhone and Apple Watch.',
    images: defaultOgImages,
  },
}

type Theme = 'dark' | 'light'
type Accent = 'pink' | 'sky'

function normalizeTheme(value: string | undefined): Theme {
  return value === 'dark' ? 'dark' : 'light'
}

function normalizeAccent(value: string | undefined): Accent {
  return value === 'sky' ? 'sky' : 'pink'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const theme = normalizeTheme(cookieStore.get('theme')?.value)
  const accent = normalizeAccent(cookieStore.get('accent')?.value)

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
