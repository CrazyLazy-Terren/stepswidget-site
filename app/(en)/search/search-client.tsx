'use client'

import { useId, useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, FileText, Search as SearchIcon, X } from 'lucide-react'
import { ArrowRight } from '../../arrow'
import type { SearchIndexItem } from '../../search-index'
import { searchIndex } from '../../search-index'

type FilterType = 'all' | 'doc' | 'blog'

const SUGGESTIONS = [
  'Apple Watch',
  'Lock Screen',
  'Goal Reminders',
  'Photo Styles',
  'Siri & Shortcuts',
  'Troubleshooting',
  'Battery Drain',
  'Under-desk Walking Pad',
]

export function SearchClient({ initialItems, initialQuery = '' }: { initialItems: SearchIndexItem[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery)
  const [filter, setFilter] = useState<FilterType>('all')
  const searchInputId = useId()

  const results = useMemo(() => {
    return searchIndex(initialItems, query, filter)
  }, [initialItems, query, filter])

  const docsCount = initialItems.filter((i) => i.type === 'doc').length
  const blogCount = initialItems.filter((i) => i.type === 'blog').length

  return (
    <div className="flex flex-col gap-8">
      {/* Search Input Bar */}
      <div className="relative flex items-center rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-2 transition focus-within:border-[color:var(--border-strong)]">
        <SearchIcon className="ml-3 size-5 text-[var(--text-subtle)]" />
        <input
          id={searchInputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by topic, feature, question, or error message..."
          className="w-full bg-transparent px-3 py-2 text-base font-medium text-[var(--text-strong)] placeholder:text-[var(--text-subtle)] focus:outline-hidden"
          autoFocus
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mr-2 rounded-lg p-1.5 text-[var(--text-subtle)] hover:text-[var(--text-strong)]"
            aria-label="Clear search">
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs & Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--border)] pb-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === 'all' ? 'bg-[var(--accent-color)] text-[var(--button-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            All ({initialItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('doc')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === 'doc' ? 'bg-[var(--accent-color)] text-[var(--button-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            <BookOpen className="size-3.5" />
            Docs ({docsCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('blog')}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              filter === 'blog' ? 'bg-[var(--accent-color)] text-[var(--button-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            <FileText className="size-3.5" />
            Blog ({blogCount})
          </button>
        </div>

        <span className="text-xs text-[var(--text-subtle)]">
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </span>
      </div>

      {/* Empty State */}
      {results.length === 0 && (
        <div className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-8 sm:p-12">
          <p className="text-lg font-semibold text-[var(--text-strong)]">No matching articles found</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try another term or explore popular topics:
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="rounded-full border border-[color:var(--border)] bg-[var(--surface-3)] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)]">
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      <div className="grid gap-4">
        {results.map((item) => {
          const isDoc = item.type === 'doc'
          return (
            <Link
              key={item.id}
              href={item.url}
              className="group flex flex-col justify-between gap-4 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 transition hover:border-[color:var(--border-strong)] sm:flex-row sm:items-center sm:p-6">
              <div className="flex min-w-0 flex-1 items-start gap-4">
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-[color:var(--border)] text-[var(--accent-color)]">
                  {isDoc ? <BookOpen className="size-4" /> : <FileText className="size-4" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-color)]">
                      {isDoc ? 'Docs' : 'Blog'} · {item.category}
                    </span>
                  </div>
                  <h2 className="mt-1 text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)] transition group-hover:text-[var(--accent-color)]">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end text-sm font-medium text-[var(--accent-color)] transition group-hover:translate-x-1 sm:self-center">
                <span>View</span>
                <ArrowRight />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
