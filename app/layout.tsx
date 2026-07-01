import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { cookies } from 'next/headers'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.crazylazy.xyz'),
  title: 'Steps Widget - iPhone Step Counter Widget',
  description: 'Steps Widget is a private iPhone step counter widget for Home Screen, Lock Screen, Apple Health, and Apple Watch step tracking.',
  keywords: [
    'Steps Widget',
    'steps widget',
    'iPhone step counter widget',
    'Apple Health steps widget',
    'Lock Screen steps widget',
    'Apple Watch steps widget',
    'pedometer widget for iPhone',
  ],
  icons: {
    icon: '/assets/stepswidget-icon.png',
    apple: '/assets/stepswidget-icon.png',
  },
  openGraph: {
    title: 'Steps Widget - iPhone Step Counter Widget',
    description: 'A private Apple Health steps widget for iPhone Home Screen, Lock Screen, and Apple Watch.',
    images: [
      {
        url: 'https://static.crazylazy.xyz/pic/f01.png',
        width: 1600,
        height: 1080,
        alt: 'Steps Widget preview across iPhone and Apple Watch',
      },
    ],
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
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
