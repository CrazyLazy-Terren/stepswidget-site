import type { Metadata } from 'next'
import { SearchDialog } from '../search-dialog'
import { defaultOgImages, siteName, siteUrl } from '../shared-metadata'
import { SiteDocument, baseMetadata } from '../site-document'

const title = 'Steps Widget - See Your Steps, Get a Gentle Nudge on iPhone and Apple Watch'
const description =
  'See your steps, get a gentle nudge, and move a little more every day. Step counter widgets for iPhone, Apple Watch, and Mac, with reminders at the right moment, not every hour. No workout plans, no account.'
const shareDescription =
  'No workout plans, no calorie counting. Just your step count in sight and a gentle nudge at the right moment. Move a little more every day.'

export const metadata: Metadata = {
  ...baseMetadata,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SiteDocument lang="en">
      {children}
      <SearchDialog />
    </SiteDocument>
  )
}

