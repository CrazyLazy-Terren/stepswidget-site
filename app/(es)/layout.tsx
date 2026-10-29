import type { Metadata } from 'next'
import { SearchDialog } from '../search-dialog'
import { SiteDocument, baseMetadata } from '../site-document'

// The Spanish landing page sets its own title and copy.
export const metadata: Metadata = baseMetadata

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SiteDocument lang="es">
      {children}
      <SearchDialog />
    </SiteDocument>
  )
}

