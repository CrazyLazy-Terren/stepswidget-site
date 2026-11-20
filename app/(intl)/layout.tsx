import type { Metadata } from 'next'
import { SearchDialog } from '../search-dialog'
import { siteName } from '../shared-metadata'
import { SiteDocument, baseMetadata } from '../site-document'
import { getLocale } from './locale'

/**
 * Root layout for the pages a shared link lands on (`/invite`, `/s/…`).
 *
 * Unlike the rest of the site, these follow the visitor's device language, so
 * `<html lang>` is read from the request instead of fixed at build time. The
 * pages set their own titles and copy.
 */
export const metadata: Metadata = {
  ...baseMetadata,
  openGraph: { siteName, type: 'website' },
}

export default async function SharedLinkRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <SiteDocument lang={locale}>
      {children}
      <SearchDialog />
    </SiteDocument>
  )
}
