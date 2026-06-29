import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentShell } from '../content-shell'
import { blogPosts } from './posts'

export const metadata: Metadata = {
  title: 'Blog - Steps Widget',
  description:
    'SEO-friendly guides and product notes about iPhone step counter widgets, Lock Screen steps widgets, Apple Health, and Apple Watch step tracking.',
}

export default function BlogPage() {
  return (
    <ContentShell
      eyebrow="Blog"
      title="Every step counts."
      description="Practical articles about keeping daily steps visible on iPhone, Lock Screen, Home Screen, Apple Health, and Apple Watch.">
      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group grid h-full grid-rows-[auto_minmax(0,1fr)_auto] rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)] transition hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
            <div className="min-h-[8.75rem]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">{post.category}</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{post.title}</h2>
            </div>
            <p className="leading-7 text-[var(--text-muted)]">{post.description}</p>
            <div className="flex items-center justify-between gap-3 pt-8 text-sm text-[var(--text-subtle)]">
              <span>{post.readingTime}</span>
              <span className="font-medium text-[var(--accent-color)] transition group-hover:translate-x-1">Read -&gt;</span>
            </div>
          </Link>
        ))}
      </div>
    </ContentShell>
  )
}
