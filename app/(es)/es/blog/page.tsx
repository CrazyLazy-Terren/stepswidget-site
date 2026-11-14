import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from '@/app/arrow'
import { ContentShell } from '@/app/content-shell'
import { defaultOgImages, siteName } from '@/app/shared-metadata'
import {
  JsonLd,
  absoluteUrl,
  applicationId,
  applicationSchema,
  breadcrumbSchema,
  organizationId,
  organizationSchema,
  websiteSchema,
} from '@/app/structured-data'
import type { BlogPost } from '@/app/(en)/blog/posts'
import { getEsBlogPosts } from '@/app/(es)/es/blog/posts'

/** `2026-09-08` -> `8 de septiembre de 2026`. */
function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('es-ES', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${isoDate}T00:00:00Z`))
}

function PostCard({ post }: { post: BlogPost }) {
  const updatedDate = post.updated ?? post.date
  return (
    <Link
      href={`/es/blog/${post.slug}`}
      className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 transition hover:border-[color:var(--border-strong)]">
      {/* Top corners: category left, updated date right */}
      <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">
        <span className="text-[var(--accent-color)]">{post.category}</span>
        <time dateTime={updatedDate}>{formatDate(updatedDate)}</time>
      </div>

      {/* Center: the content */}
      <div className="flex flex-col items-start justify-center gap-4 py-10">
        <h3 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{post.title}</h3>
        <p className="leading-7 text-[var(--text-muted)]">{post.description}</p>
      </div>

      {/* Bottom corners: reading time left, Read link right */}
      <div className="flex items-center justify-between gap-3 text-sm text-[var(--text-subtle)]">
        <span>{post.readingTime}</span>
        <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">
          Leer <ArrowRight className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100" />
        </span>
      </div>
    </Link>
  )
}

const title = 'Blog - Steps Widget'
const description =
  'Guías, consejos y artículos sobre widgets de pasos para iPhone, pantalla de bloqueo, recordatorios de movimiento, Apple Health y Apple Watch.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/es/blog',
    languages: {
      en: '/blog',
      es: '/es/blog',
      'x-default': '/blog',
    },
  },
  openGraph: {
    title,
    description,
    url: '/es/blog',
    siteName,
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: defaultOgImages,
  },
}

export default function SpanishBlogPage() {
  const blogPosts = getEsBlogPosts()
  const blogUrl = absoluteUrl('/es/blog')

  const blogSchema = {
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    name: title,
    description,
    url: blogUrl,
    inLanguage: 'es-ES',
    publisher: { '@id': organizationId },
    about: { '@id': applicationId },
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      '@id': `${absoluteUrl(`/es/blog/${post.slug}`)}#article`,
      headline: post.title,
      description: post.description,
      url: absoluteUrl(`/es/blog/${post.slug}`),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      articleSection: post.category,
      inLanguage: 'es-ES',
    })),
  }

  const graph = [
    organizationSchema(),
    websiteSchema(),
    applicationSchema(),
    blogSchema,
    breadcrumbSchema(
      [
        { name: 'Inicio', path: '/es' },
        { name: 'Blog', path: '/es/blog' },
      ],
      `${blogUrl}#breadcrumb`
    ),
  ]

  return (
    <>
      <JsonLd id="schema-blog-es" data={graph} />
      <ContentShell
        lang="es"
        eyebrow="Blog"
        title="Ideas y guías para moverte más."
        description="Artículos sobre widgets de pasos, pantalla de bloqueo, Apple Health y hábitos sencillos para mantenerte activo cada día.">
        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </ContentShell>
    </>
  )
}
