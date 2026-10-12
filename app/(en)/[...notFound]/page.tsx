import { notFound } from 'next/navigation'

/**
 * Sends every unmatched URL to app/(en)/not-found.tsx.
 *
 * With one root layout per language there is no top-level layout for a root
 * `app/not-found.tsx` to render inside, so unmatched URLs are caught here.
 */
export default function CatchAllNotFound() {
  notFound()
}
