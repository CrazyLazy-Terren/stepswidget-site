'use client'
import { useSyncExternalStore } from 'react'
import { PageSection } from '../../page-shell'

/** The fragment is base64url JSON, UTF-8 inside, so a name in any script reads right. */
function senderName(fragment: string): string | null {
  try {
    const bytes = Uint8Array.from(atob(fragment.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0))
    const card = JSON.parse(new TextDecoder().decode(bytes)) as { n?: unknown }
    return typeof card.n === 'string' && card.n.trim() ? card.n.trim() : null
  } catch {
    return null
  }
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

// Empty on the server: the fragment exists only in the browser.
function useFragment() {
  return useSyncExternalStore(subscribeToHash, () => window.location.hash.slice(1), () => '')
}

type InviteHeroProps = {
  eyebrow: string
  title: string
  /** The title once the sender's name is known; `{name}` marks where it goes. */
  titleWithName: string
  description: string
}

export function InviteHero({ eyebrow, title, titleWithName, description }: InviteHeroProps) {
  const fragment = useFragment()
  const name = fragment ? senderName(fragment) : null

  return (
    <PageSection paddingY="top">
      <p className="text-md font-bold uppercase tracking-[0.14em] text-[var(--accent-color)]">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
        {name ? titleWithName.replace('{name}', name) : title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">{description}</p>
    </PageSection>
  )
}

/** Hands the card to the app; only there when the link carried one. */
export function OpenInStepsButton({ label }: { label: string }) {
  const fragment = useFragment()
  if (!fragment) return null
  return (
    <a
      href={`stepsapp://invite#${fragment}`}
      className="inline-flex h-12 w-fit items-center rounded-full bg-[var(--text-strong)] px-6 font-semibold text-background transition hover:opacity-90">
      {label}
    </a>
  )
}
