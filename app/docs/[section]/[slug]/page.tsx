import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { extractFaqEntries } from '../../../blog/extract-faq'
import { defaultOgImages, siteName } from '../../../shared-metadata'
import {
  JsonLd,
  absoluteUrl,
  applicationId,
  applicationSchema,
  breadcrumbSchema,
  countWords,
  faqSchema,
  imageSchema,
  organizationId,
  organizationSchema,
  readingTimeToDuration,
  webPageSchema,
  websiteSchema,
} from '../../../structured-data'
import { DocFeedback } from '../../doc-feedback'
import { docMarkdownComponents, extractToc } from '../../doc-markdown'
import { docPath, getDoc, getDocNeighbours, getDocs } from '../../docs'
import { DocsBreadcrumb, DocsShell } from '../../docs-shell'

type DocPageProps = {
  params: Promise<{
    section: string
    slug: string
  }>
}

export function generateStaticParams() {
  return getDocs().map((doc) => ({
    section: doc.section.slug,
    slug: doc.slug,
  }))
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { section, slug } = await params
  const doc = getDoc(section, slug)

  if (!doc) {
    return { title: 'Documentation - Steps Widget' }
  }

  const images = doc.image ? [{ url: doc.image, alt: doc.title }] : defaultOgImages

  return {
    title: doc.metaTitle,
    description: doc.description,
    keywords: doc.keywords,
    alternates: {
      canonical: docPath(doc),
    },
    openGraph: {
      title: doc.metaTitle,
      description: doc.description,
      url: docPath(doc),
      siteName,
      type: 'article',
      modifiedTime: doc.updated,
      tags: doc.keywords,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.metaTitle,
      description: doc.description,
      images,
    },
  }
}

export default async function DocPage({ params }: DocPageProps) {
  const { section, slug } = await params
  const doc = getDoc(section, slug)

  if (!doc) {
    notFound()
  }

  const { previous, next } = getDocNeighbours(doc.section.slug, doc.slug)
  const toc = extractToc(doc.content)
  const faqEntries = extractFaqEntries(doc.content)
  const url = absoluteUrl(docPath(doc))

  // TechArticle rather than BlogPosting: this is reference material for using a
  // product, it carries no publish date, and the distinction is what keeps the
  // docs from competing with the blog for the same queries.
  const techArticleSchema = {
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    headline: doc.title,
    name: doc.title,
    description: doc.description,
    url,
    mainEntityOfPage: { '@id': url },
    dateModified: doc.updated,
    inLanguage: 'en-US',
    articleSection: doc.section.title,
    keywords: doc.keywords.join(', '),
    wordCount: countWords(doc.content),
    timeRequired: readingTimeToDuration(doc.readingTime),
    proficiencyLevel: 'Beginner',
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
    isPartOf: { '@id': `${absoluteUrl('/docs')}#doclist` },
    about: { '@id': applicationId },
    mentions: { '@id': applicationId },
    ...(doc.image ? { image: { '@id': `${url}#primaryimage` } } : {}),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h2'],
    },
  }

  const graph: Record<string, unknown>[] = [
    organizationSchema(),
    websiteSchema(),
    applicationSchema(),
    webPageSchema({ url, name: doc.metaTitle, description: doc.description, image: doc.image }),
    techArticleSchema,
    breadcrumbSchema(
      [
        { name: 'Home', path: '/' },
        { name: 'Docs', path: '/docs' },
        { name: doc.section.title, path: `/docs/${doc.section.slug}` },
        { name: doc.title, path: docPath(doc) },
      ],
      `${url}#breadcrumb`
    ),
  ]

  if (doc.image) {
    graph.push(imageSchema(doc.image, `${url}#primaryimage`, `${doc.title} illustration`))
  }

  if (faqEntries.length > 0) {
    graph.push(faqSchema(faqEntries, `${url}#faq`))
  }

  return (
    <>
      <JsonLd id={`schema-doc-${doc.section.slug}-${doc.slug}`} data={graph} />
      <DocsShell activeSection={doc.section.slug} activeSlug={doc.slug}>
        <div className="grid gap-12 xl:grid-cols-[minmax(0,44rem)_12rem]">
          <article className="min-w-0">
            <DocsBreadcrumb
              trail={[
                { name: 'Docs', href: '/docs' },
                { name: doc.section.title, href: `/docs/${doc.section.slug}` },
                { name: doc.title },
              ]}
            />

            <header className="mt-6 border-b border-[color:var(--border)] pb-8">
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">{doc.title}</h1>
              <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">{doc.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[var(--text-subtle)]">
                <span>{doc.readingTime}</span>
                <span aria-hidden="true" className="opacity-50">
                  /
                </span>
                <span>
                  Updated{' '}
                  <time dateTime={doc.updated}>
                    {new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${doc.updated}T00:00:00Z`))}
                  </time>
                </span>
              </div>
            </header>

            {doc.image && (
              <div className="mt-8 overflow-hidden rounded-[4px] bg-[var(--surface-media)]">
                <Image
                  src={doc.image}
                  alt={`${doc.title} illustration`}
                  width={900}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}

            {toc.length > 2 && (
              <nav aria-label="On this page" className="mt-8 border-b border-[color:var(--border)] pb-6 xl:hidden">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">On this page</p>
                <ul className="mt-3 grid gap-2 text-sm">
                  {toc.map((entry) => (
                    <li key={entry.id}>
                      <a href={`#${entry.id}`} className="text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="mt-4">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={docMarkdownComponents}>
                {doc.content}
              </ReactMarkdown>
            </div>

            {(previous || next) && (
              <nav aria-label="Documentation pagination" className="mt-16 grid gap-6 border-t border-[color:var(--border)] pt-6 sm:grid-cols-2">
                {previous ? (
                  <Link href={docPath(previous)} className="group">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Previous</span>
                    <span className="mt-1.5 block font-medium text-[var(--text-strong)] transition group-hover:text-[var(--accent-color)]">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span />
                )}
                {next && (
                  <Link href={docPath(next)} className="group text-right sm:col-start-2">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Next</span>
                    <span className="mt-1.5 block font-medium text-[var(--text-strong)] transition group-hover:text-[var(--accent-color)]">{next.title}</span>
                  </Link>
                )}
              </nav>
            )}

            <DocFeedback section={doc.section.slug} slug={doc.slug} title={doc.title} path={docPath(doc)} />

            <div className="mt-14 border-t border-[color:var(--border)] pt-8">
              <p className="leading-7 text-[var(--text-muted)]">
                <span className="font-medium text-[var(--text-strong)]">Steps Widget</span> projects your end-of-day step total on device and reminds you only
                when you are heading for a miss — with your Apple Health count on every screen you already look at.
              </p>
              <Link
                href="/"
                className="mt-5 inline-flex h-9 items-center rounded-[3px] bg-[var(--button-bg)] px-4 text-sm font-medium text-[var(--button-text)] transition hover:opacity-90">
                See how it works
              </Link>
            </div>
          </article>

          {toc.length > 2 && (
            <aside className="hidden xl:block">
              <nav aria-label="On this page" className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">On this page</p>
                <ul className="mt-4 grid text-sm">
                  {toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className="block border-l border-[color:var(--border)] py-1.5 pl-3 leading-5 text-[var(--text-muted)] transition hover:border-l-[color:var(--text-subtle)] hover:text-[var(--text-strong)]">
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>
      </DocsShell>
    </>
  )
}
