'use client'

import { useCallback, useId, useState, useSyncExternalStore } from 'react'
import posthog from 'posthog-js'

/**
 * "Was this helpful?" strip at the foot of every documentation page.
 *
 * Two stages on purpose. The vote is one click and fires immediately, so the
 * signal survives readers who never type anything; the note is optional and
 * fires as its own event. That keeps the ratio honest — a page rated by fifty
 * people and corrected by two reads very differently from two of each.
 *
 * The vote is remembered per page, and each rating fires at most once per page
 * per browser. Without that, toggling Yes/No is an unbounded event tap: one
 * restless reader could outvote a hundred honest ones and the ratio the strip
 * exists to measure would be worthless.
 *
 * Events go straight to PostHog, already initialised in
 * `instrumentation-client.ts`, so there is no endpoint to run.
 */

type DocFeedbackProps = {
  /** Section slug, e.g. `troubleshooting`. */
  section: string
  /** Doc slug, e.g. `widget-not-updating`. */
  slug: string
  /** Human title of the page, so events are readable without a lookup. */
  title: string
  /** Site-relative path of the page. */
  path: string
}

type Rating = 'helpful' | 'not-helpful'

/** What we remember about one page. `reported` is the set of ratings already sent. */
type StoredVote = {
  rating: Rating
  reported: Rating[]
}

/** Long notes are the useful ones, but an unbounded field is an abuse vector. */
const maxNoteLength = 1000

const keyPrefix = 'stepswidget:docs-feedback:'

/**
 * The vote store.
 *
 * Memory is the source of truth and localStorage is best-effort persistence
 * behind it, so a reader with storage blocked still gets a strip that behaves —
 * they just vote again next visit. The cache also gives `useSyncExternalStore`
 * the stable snapshot reference it requires; parsing JSON on every call would
 * hand React a new object each render and spin.
 */
const cache = new Map<string, StoredVote | null>()
const listeners = new Set<() => void>()

/**
 * Storage can throw or hold anything at all — Safari private mode, a full quota,
 * a key another tab wrote. A bad read counts as no vote rather than an error, so
 * the strip always renders.
 */
function readVote(path: string): StoredVote | null {
  try {
    const raw = window.localStorage.getItem(`${keyPrefix}${path}`)

    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)

    if (typeof parsed !== 'object' || parsed === null) {
      return null
    }

    const { rating, reported } = parsed as Partial<StoredVote>

    if (rating !== 'helpful' && rating !== 'not-helpful') {
      return null
    }

    return {
      rating,
      reported: Array.isArray(reported) ? reported.filter(isRating) : [],
    }
  } catch {
    return null
  }
}

function isRating(value: unknown): value is Rating {
  return value === 'helpful' || value === 'not-helpful'
}

function getVote(path: string): StoredVote | null {
  if (!cache.has(path)) {
    cache.set(path, readVote(path))
  }

  return cache.get(path) ?? null
}

function setVote(path: string, vote: StoredVote) {
  cache.set(path, vote)

  try {
    window.localStorage.setItem(`${keyPrefix}${path}`, JSON.stringify(vote))
  } catch {
    // Ignored: the vote still holds for this page load, it just will not persist.
  }

  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  // A vote cast in another tab should show here too, and `storage` only fires
  // in the tabs that did not write, so it never fights our own updates.
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key.startsWith(keyPrefix)) {
      cache.clear()
      listener()
    }
  }

  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/**
 * PostHog is only initialised outside development, and `capture` on an
 * uninitialised client throws noisy console errors. Analytics must never be the
 * reason a click does nothing, so failures are swallowed.
 */
function capture(event: string, properties: Record<string, unknown>) {
  try {
    if (posthog.__loaded) {
      posthog.capture(event, properties)
    }
  } catch {
    // Ignored: the reader's feedback UI should not depend on analytics.
  }
}

export function DocFeedback({ section, slug, title, path }: DocFeedbackProps) {
  // These pages are statically generated, so the server snapshot is always "no
  // vote" — React swaps in the stored one after hydration.
  const stored = useSyncExternalStore(
    subscribe,
    useCallback(() => getVote(path), [path]),
    () => null
  )

  // Kept apart from the stored vote so a remembered rating shows its button
  // pressed without springing the note form open on every later visit.
  const [formOpen, setFormOpen] = useState(false)
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)
  const noteId = useId()

  const rating = stored?.rating ?? null
  const reported = stored?.reported ?? []

  const docProperties = {
    doc_section: section,
    doc_slug: slug,
    doc_title: title,
    doc_path: path,
  }

  function vote(next: Rating) {
    // Re-clicking the current rating collapses the form rather than re-counting.
    if (rating === next && formOpen) {
      setFormOpen(false)
      return
    }

    setFormOpen(true)
    setSent(false)

    // Each rating counts once per page per browser. Changing your mind is real
    // signal and still counts; flipping back and forth after that is not.
    const alreadyReported = reported.includes(next)

    setVote(path, {
      rating: next,
      reported: alreadyReported ? reported : [...reported, next],
    })

    if (!alreadyReported) {
      capture('docs_feedback_voted', {
        ...docProperties,
        rating: next,
        // True when they had already rated this page and switched sides.
        changed_vote: reported.length > 0,
      })
    }
  }

  function submitNote(event: React.FormEvent) {
    event.preventDefault()

    const message = note.trim()

    if (!message) {
      return
    }

    capture('docs_feedback_note_submitted', {
      ...docProperties,
      rating,
      message: message.slice(0, maxNoteLength),
      message_length: message.length,
    })

    setNote('')
    setSent(true)
  }

  return (
    <section aria-labelledby={`${noteId}-heading`} className="mt-14 border-t border-[color:var(--border)] pt-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <p id={`${noteId}-heading`} className="text-sm font-medium text-[var(--text-strong)]">
          Was this page helpful?
        </p>
        <div className="flex gap-2">
          {(
            [
              { value: 'helpful', label: 'Yes' },
              { value: 'not-helpful', label: 'No' },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => vote(option.value)}
              aria-pressed={rating === option.value}
              className={`h-8 rounded-[3px] border px-4 text-sm transition ${
                rating === option.value
                  ? 'border-[color:var(--accent-color)] font-medium text-[var(--text-strong)]'
                  : 'border-[color:var(--border)] text-[var(--text-muted)] hover:border-[color:var(--border-strong)] hover:text-[var(--text-strong)]'
              }`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {rating && !formOpen && !sent && (
        <p className="mt-3 text-sm text-[var(--text-subtle)]">You rated this page already. Pick either button to add a note.</p>
      )}

      {rating && formOpen && !sent && (
        <form onSubmit={submitNote} className="mt-5 max-w-xl">
          <label htmlFor={noteId} className="block text-sm text-[var(--text-muted)]">
            {rating === 'helpful' ? 'Anything we should add? (optional)' : 'What is wrong or missing on this page?'}
          </label>
          <textarea
            id={noteId}
            name="feedback"
            rows={4}
            value={note}
            maxLength={maxNoteLength}
            onChange={(event) => setNote(event.target.value)}
            placeholder={rating === 'helpful' ? 'A step you would like spelled out, an example that would help…' : 'A wrong step, an outdated screenshot, a question this page left open…'}
            className="mt-2 block w-full resize-y rounded-[3px] border border-[color:var(--border)] bg-[var(--surface-1)] p-3 text-sm leading-6 text-[var(--text-strong)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-[color:var(--accent-color)]"
          />
          <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="submit"
              disabled={note.trim().length === 0}
              className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-[3px] bg-[var(--button-bg)] px-4 text-sm font-medium text-[var(--button-text)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
              Send feedback
            </button>
            <p className="text-xs text-[var(--text-subtle)]">Sent anonymously. Do not include personal details — we cannot reply.</p>
          </div>
        </form>
      )}

      {sent && (
        <p role="status" className="mt-5 text-sm text-[var(--text-muted)]">
          Thanks — this goes straight to the people who write these pages.
        </p>
      )}
    </section>
  )
}
