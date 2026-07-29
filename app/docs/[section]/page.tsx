import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from '../../arrow'
import { notFound } from 'next/navigation'
import { defaultOgImages, siteName } from '../../shared-metadata'
import {
  JsonLd,
  absoluteUrl,
  applicationId,
  applicationSchema,
  breadcrumbSchema,
  organizationSchema,
  websiteSchema,
} from '../../structured-data'
import { docPath, docSections, getDocSection, getDocsBySection } from '../docs'
import { DocsBreadcrumb, DocsShell } from '../docs-shell'

type DocSectionPageProps = {
  params: Promise<{
    section: string
  }>
}

export function generateStaticParams() {
  return docSections.map((section) => ({ section: section.slug }))
}

export async function generateMetadata({ params }: DocSectionPageProps): Promise<Metadata> {
  const { section: sectionSlug } = await params
  const section = getDocSection(sectionSlug)

  if (!section) {
    return { title: 'Documentation - Steps Widget' }
  }

  const title = `${section.title} - Steps Widget Docs`

  return {
    title,
    description: section.description,
    alternates: {
      canonical: `/docs/${section.slug}`,
    },
    openGraph: {
      title,
      description: section.description,
      url: `/docs/${section.slug}`,
      siteName,
      type: 'website',
      images: defaultOgImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: section.description,
      images: defaultOgImages,
    },
  }
}

export default async function DocSectionPage({ params }: DocSectionPageProps) {
  const { section: sectionSlug } = await params
  const section = getDocSection(sectionSlug)

  if (!section) {
    notFound()
  }

  const docs = getDocsBySection(section.slug)

  // A declared section with no pages yet is a 404 rather than an empty shell:
  // an indexable page with nothing on it is worse than no page.
  if (docs.length === 0) {
    notFound()
  }

  const url = absoluteUrl(`/docs/${section.slug}`)

  const collectionPageSchema = {
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: `${section.title} - Steps Widget Docs`,
    description: section.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': `${absoluteUrl('/')}#website` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
    mainEntity: { '@id': `${url}#doclist` },
    about: { '@id': applicationId },
  }

  const itemListSchema = {
    '@type': 'ItemList',
    '@id': `${url}#doclist`,
    name: section.title,
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
        id={`schema-docs-${section.slug}`}
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
              { name: section.title, path: `/docs/${section.slug}` },
            ],
            `${url}#breadcrumb`
          ),
        ]}
      />
      <DocsShell activeSection={section.slug}>
        <DocsBreadcrumb
          trail={[
            { name: 'Docs', href: '/docs' },
            { name: section.title },
          ]}
        />

        <header className="mb-10 mt-6 max-w-2xl">
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">{section.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">{section.description}</p>
        </header>

        <ol className="grid border-t border-[color:var(--border)]">
          {docs.map((doc, index) => (
            <li key={doc.slug} className="border-b border-[color:var(--border)]">
              <Link href={docPath(doc)} className="group flex gap-5 py-5">
                <span className="w-5 shrink-0 pt-0.5 font-mono text-sm text-[var(--text-subtle)]">{String(index + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-medium tracking-[-0.01em] text-[var(--text-strong)] transition group-hover:text-[var(--accent-color)]">
                      {doc.title}
                    </span>
                    <ArrowRight className="text-[var(--accent-color)] opacity-0 transition group-hover:opacity-100" />
                  </span>
                  <span className="mt-1.5 block leading-7 text-[var(--text-muted)]">{doc.description}</span>
                </span>
                <span className="hidden shrink-0 pt-0.5 text-sm text-[var(--text-subtle)] sm:block">{doc.readingTime}</span>
              </Link>
            </li>
          ))}
        </ol>
      </DocsShell>
    </>
  )
}
