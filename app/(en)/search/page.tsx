import type { Metadata } from 'next'
import { ContentShell } from '../../content-shell'
import { getSearchIndex } from '../../search-index-data'
import { defaultOgImages, siteName } from '../../shared-metadata'
import {
  JsonLd,
  absoluteUrl,
  applicationSchema,
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from '../../structured-data'
import { SearchClient } from './search-client'

type SearchPageProps = {
  searchParams: Promise<{
    q?: string
  }>
}

const title = 'Search Documentation and Guides - Steps Widget'
const description =
  'Search across all Steps Widget reference documentation, setup guides, troubleshooting steps, and fitness tips.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/search',
  },
  openGraph: {
    title,
    description,
    url: '/search',
    siteName,
    type: 'website',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: defaultOgImages,
  },
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams
  const items = getSearchIndex()
  const searchUrl = absoluteUrl('/search')

  return (
    <ContentShell
      eyebrow="Search"
      title="Find what you need."
      description="Instant search across all feature documentation, Apple Health guides, and walking tips.">
      <JsonLd
        id="schema-search"
        data={[
          organizationSchema(),
          websiteSchema(),
          applicationSchema(),
          breadcrumbSchema(
            [
              { name: 'Home', path: '/' },
              { name: 'Search', path: '/search' },
            ],
            `${searchUrl}#breadcrumb`
          ),
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <SearchClient initialItems={items} initialQuery={q ?? ''} />
      </div>
    </ContentShell>
  )
}
