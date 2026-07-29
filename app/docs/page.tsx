import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLink, ArrowRight } from '../arrow'
import { defaultOgImages, siteName } from '../shared-metadata'
import { JsonLd, absoluteUrl, applicationId, applicationSchema, breadcrumbSchema, organizationSchema, websiteSchema } from '../structured-data'
import { docPath, getDocTree, getDocs, getDocsLastUpdated } from './docs'
import { DocsShell } from './docs-shell'

const title = 'Documentation - Steps Widget'
const description =
  'Documentation for Steps Widget: setup, Apple Health access, the on-device goal reminder model, every widget, Apple Watch, and troubleshooting.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    title,
    description,
    url: '/docs',
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

export default function DocsIndexPage() {
  const tree = getDocTree()
  const docs = getDocs()
  const docsUrl = absoluteUrl('/docs')
  const lastUpdated = getDocsLastUpdated()

  const collectionPageSchema = {
    '@type': 'CollectionPage',
    '@id': docsUrl,
    url: docsUrl,
    name: title,
    description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    breadcrumb: { '@id': `${docsUrl}#breadcrumb` },
    mainEntity: { '@id': `${docsUrl}#doclist` },
    about: { '@id': applicationId },
    ...(lastUpdated ? { dateModified: lastUpdated } : {}),
  }

  // One flat, ordered index of every doc page, so a crawler gets the full map
  // from a single URL rather than having to walk four section pages.
  const itemListSchema = {
    '@type': 'ItemList',
    '@id': `${docsUrl}#doclist`,
    name: 'Steps Widget documentation',
    numberOfItems: docs.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: docs.map((doc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(docPath(doc)),
      name: doc.title,
    })),
  }

  return (
    <>
      <JsonLd
        id="schema-docs"
        data={[
          organizationSchema(),
          websiteSchema(),
          applicationSchema(),
          collectionPageSchema,
          itemListSchema,
          breadcrumbSchema(
            [
              { name: 'Home', path: '/' },
              { name: 'Docs', path: '/docs' },
            ],
            `${docsUrl}#breadcrumb`
          ),
        ]}
      />
      <DocsShell>
        <header className="max-w-2xl pb-12">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">Documentation</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">
            Everything Steps Widget does, explained.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
            Reference pages for every feature, surface, and setting. Start at the top if the app is new to you, or jump straight to the page you need.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <Link
              href="/docs/getting-started/install-and-set-up"
              className="inline-flex h-9 items-center rounded-[4px] bg-[var(--button-bg)] px-4 font-medium text-[var(--button-text)] transition hover:opacity-90">
              Start here
            </Link>
            <ArrowLink href="/blog" className="font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">Read the blog instead</ArrowLink>
          </div>
        </header>

        <div className="grid gap-14 border-t border-[color:var(--border)] pt-12">
          {tree.map(({ section, docs: sectionDocs }) => (
            <section key={section.slug} className="grid gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10">
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">
                  <Link href={`/docs/${section.slug}`} className="transition hover:text-[var(--accent-color)]">
                    {section.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-[var(--text-subtle)]">{section.description}</p>
              </div>

              <ul className="grid border-[color:var(--border)]">
                {sectionDocs.map((doc) => (
                  <li key={doc.slug} className="border-t border-[color:var(--border)]">
                    <Link href={docPath(doc)} className="group block py-4">
                      <span className="flex items-baseline gap-2">
                        <span className="font-medium text-[var(--text-strong)] transition group-hover:text-[var(--accent-color)]">{doc.title}</span>
                        <ArrowRight className="text-[var(--accent-color)] opacity-0 transition group-hover:opacity-100" />
                      </span>
                      <span className="mt-1.5 block text-sm leading-6 text-[var(--text-muted)]">{doc.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </DocsShell>
    </>
  )
}
