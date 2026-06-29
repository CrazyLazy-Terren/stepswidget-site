import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentShell } from '../../content-shell'
import { blogPosts } from '../posts'

export const metadata: Metadata = {
  title: 'Markdown Sources - Steps Widget Blog',
  description: 'Browse the Markdown source files used to publish Steps Widget blog posts.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function BlogPostSourcesPage() {
  return (
    <ContentShell
      eyebrow="Markdown sources"
      title="Blog source files."
      description="Browse the editable Markdown files that power the Steps Widget blog. Use the public blog pages for the reader-facing versions.">
      <div className="grid gap-5">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{post.category}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{post.title}</h2>
                <p className="mt-3 max-w-3xl leading-7 text-[var(--text-muted)]">{post.description}</p>
              </div>
              <p className="shrink-0 text-sm text-[var(--text-subtle)]">{post.readingTime}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
              <Link
                href={`/blog/${post.slug}`}
                className="rounded-full border border-[color:var(--border)] px-4 py-2 text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
                Public page
              </Link>
              <Link
                href={`/blog/posts/${post.slug}`}
                className="rounded-full bg-[var(--button-bg)] px-4 py-2 text-[var(--button-text)] transition hover:opacity-90"
                target="_blank"
                rel="noreferrer">
                View Markdown
              </Link>
            </div>
          </article>
        ))}
      </div>
    </ContentShell>
  )
}
