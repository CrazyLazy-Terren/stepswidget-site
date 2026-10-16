'use client'

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BookOpen, CornerDownLeft, FileText, Search as SearchIcon, X } from 'lucide-react'
import type { SearchIndexItem } from './search-index'
import { searchIndex } from './search-index'

type FilterType = 'all' | 'doc' | 'blog'

const SUGGESTIONS = ['Apple Watch', 'Lock Screen', 'Goal Reminders', 'Photo Styles', 'Siri & Shortcuts', 'Troubleshooting', 'Battery Drain', 'Walking Pad']

export function SearchTrigger({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('open-search-dialog'))
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label="Search documentation and blog"
        className={`flex size-10 items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)] ${className}`}>
        <SearchIcon className="size-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Search documentation and blog"
      className={`group flex items-center gap-3 rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)] ${className}`}>
      <SearchIcon className="size-3.5 text-[var(--text-subtle)] transition group-hover:text-[var(--text-strong)]" />
      <span className="pr-4">Search</span>
      <kbd className="hidden items-center gap-0.5 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-subtle)] sm:inline-flex">
        <span className="text-[11px]">⌘</span>K
      </kbd>
    </button>
  )
}

function filterForPath(pathname: string | null): FilterType {
  if (pathname?.startsWith('/docs')) return 'doc'
  if (pathname?.startsWith('/blog')) return 'blog'
  return 'all'
}

let cachedIndex: SearchIndexItem[] | null = null

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [items, setItems] = useState<SearchIndexItem[]>(cachedIndex ?? [])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchInputId = useId()

  // Fetch index once on open
  useEffect(() => {
    if (!isOpen) return

    if (!cachedIndex) {
      setIsLoading(true)
      fetch('/api/search')
        .then((res) => res.json())
        .then((data: SearchIndexItem[]) => {
          cachedIndex = data
          setItems(data)
        })
        .catch((err) => {
          console.error('Failed to load search index:', err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setItems(cachedIndex)
    }
  }, [isOpen])

  // Open/close listeners
  useEffect(() => {
    // Default the filter to the section being browsed
    const open = () => {
      setFilter(filterForPath(pathname))
      setIsOpen(true)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) setIsOpen(false)
        else open()
        return
      }

      // '/' shortcut (when not in an input, textarea, or contentEditable)
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName) && !(e.target as HTMLElement)?.isContentEditable) {
        e.preventDefault()
        open()
        return
      }

      if (e.key === 'Escape' && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }
    }

    window.addEventListener('open-search-dialog', open)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('open-search-dialog', open)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, pathname])

  // Focus input when dialog opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setSelectedIndex(0)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Filtered & scored results
  const results = useMemo(() => {
    return searchIndex(items, query, filter)
  }, [items, query, filter])

  // Reset selected index when query or filter changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query, filter])

  // Ensure active result is scrolled into view
  useEffect(() => {
    if (!listRef.current) return
    const selectedEl = listRef.current.children[selectedIndex] as HTMLElement | undefined
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const handleSelect = useCallback(
    (url: string) => {
      setIsOpen(false)
      router.push(url)
    },
    [router]
  )

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url)
      }
    }
  }

  if (!isOpen) return null

  const docsCount = items.filter((i) => i.type === 'doc').length
  const blogCount = items.filter((i) => i.type === 'blog').length

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-3 pt-[10vh] transition-opacity sm:p-6 sm:pt-[12vh]">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={() => setIsOpen(false)} aria-hidden="true" />

      {/* Dialog box */}
      <div className="relative flex max-h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-[color:var(--border)] bg-[var(--surface-3)]">
        {/* Top search bar */}
        <div className="flex items-center gap-3 border-b border-[color:var(--border)] px-4 py-3.5 sm:px-6">
          <SearchIcon className="size-5 shrink-0 text-[var(--text-subtle)]" />
          <input
            ref={inputRef}
            id={searchInputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search docs, guides, troubleshooting..."
            className="w-full bg-transparent text-base font-medium text-[var(--text-strong)] placeholder:text-[var(--text-subtle)] focus:outline-hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              aria-label="Clear query"
              className="rounded-lg p-1 text-[var(--text-subtle)] hover:text-[var(--text-strong)]">
              <X className="size-4" />
            </button>
          ) : (
            <kbd className="hidden rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-subtle)] sm:inline-block">
              ESC
            </kbd>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 border-b border-[color:var(--border)] px-4 py-2 text-xs font-medium sm:px-6">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`rounded-full px-3 py-1 transition ${
              filter === 'all' ? 'bg-[var(--accent-color)] text-[var(--button-text)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            All ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('doc')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition ${
              filter === 'doc' ? 'bg-[var(--accent-color)] text-[var(--button-text)] font-semibold' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            <BookOpen className="size-3" />
            Docs ({docsCount})
          </button>
          <button
            type="button"
            onClick={() => setFilter('blog')}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 transition ${
              filter === 'blog'
                ? 'bg-[var(--accent-color)] text-[var(--button-text)] font-semibold'
                : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
            }`}>
            <FileText className="size-3" />
            Blog ({blogCount})
          </button>
        </div>

        {/* Results container */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3">
          {isLoading && <div className="py-12 text-center text-sm text-[var(--text-muted)]">Loading search index...</div>}

          {!isLoading && results.length === 0 && query && (
            <div className="py-12 text-center">
              <p className="text-base font-semibold text-[var(--text-strong)]">No results found</p>
              <p className="mt-1 text-sm text-[var(--text-muted)]">We couldn&apos;t find anything matching &ldquo;{query}&rdquo;.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="w-full text-xs text-[var(--text-subtle)]">Try searching for:</span>
                {SUGGESTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag)
                      inputRef.current?.focus()
                    }}
                    className="rounded-full border border-[color:var(--border)] bg-[var(--surface-1)] px-2.5 py-1 text-xs text-[var(--text-muted)] transition hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)]">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLoading && results.length === 0 && !query && (
            <div className="py-8 px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-subtle)]">Popular topics</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setQuery(tag)
                      inputRef.current?.focus()
                    }}
                    className="rounded-full border border-[color:var(--border)] bg-[var(--surface-1)] px-3 py-1 text-xs font-medium text-[var(--text-muted)] transition hover:border-[color:var(--accent-color)] hover:text-[var(--text-strong)]">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.map((item, index) => {
            const isSelected = index === selectedIndex
            const isDoc = item.type === 'doc'

            return (
              <div
                key={item.id}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.url)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`group flex cursor-pointer items-start justify-between gap-4 rounded-lg p-3 transition ${
                  isSelected ? 'bg-[var(--surface-1)] text-[var(--text-strong)]' : 'text-[var(--text-muted)]'
                }`}>
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div
                    className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border transition ${
                      isSelected ? 'border-[color:var(--accent-color)] text-[var(--accent-color)]' : 'border-[color:var(--border)] text-[var(--text-subtle)]'
                    }`}>
                    {isDoc ? <BookOpen className="size-3.5" /> : <FileText className="size-3.5" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{item.title}</span>
                      <span className="shrink-0 rounded-lg px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.06em] text-[var(--text-subtle)]">
                        {isDoc ? 'Doc' : 'Blog'} · {item.category}
                      </span>
                    </div>

                    <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-[var(--text-muted)]">{item.description}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center pt-1 text-[var(--text-subtle)] opacity-0 transition group-hover:opacity-100 group-aria-selected:opacity-100">
                  <CornerDownLeft className="size-3.5 text-[var(--accent-color)]" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="hidden items-center justify-between border-t border-[color:var(--border)] px-4 py-2.5 text-xs text-[var(--text-subtle)] sm:flex">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1 font-mono text-[10px]">↑</kbd>
              <kbd className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1 font-mono text-[10px]">↓</kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1 font-mono text-[10px]">↵</kbd>
              open
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-1 font-mono text-[10px]">esc</kbd>
              close
            </span>
          </div>
          <span>
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  )
}
