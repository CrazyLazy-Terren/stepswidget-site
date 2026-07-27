import type { Metadata } from 'next'
import Link from 'next/link'
import { ContentShell } from './content-shell'
import { getBlogPosts } from './blog/posts'

const title = '404 - Page Not Found'
const description = 'The page you are looking for does not exist. Check out recent posts from the blog or head back home.'

export const metadata: Metadata = {
  title,
  description,
}

export default function NotFound() {
  const recentPosts = getBlogPosts().slice(0, 3)

  return (
    <ContentShell eyebrow="404" title="This page took a wrong turn." description="We couldn't find the page you were looking for. Here are some recent posts, or head back home.">
      <div className="grid gap-5 lg:grid-cols-3">
        {recentPosts.map((post) => (
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

      <div className="mt-12 flex justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-color)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--soft-shadow)] transition hover:-translate-y-0.5">
          Back to Home
        </Link>
      </div>
    </ContentShell>
  )
}
