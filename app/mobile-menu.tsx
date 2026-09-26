'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The phone menu's disclosure.
 *
 * A bare `<details>` opens and closes on its own, but it never closes by
 * itself: tapping an in-page link such as Features scrolled the page with the
 * menu still covering it, and a tap outside did nothing. This closes it on a
 * link tap, a tap anywhere else, and Escape. Everything else stays in the
 * server-rendered markup passed as children.
 */
export function MobileMenu({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const close = () => {
      if (ref.current) ref.current.open = false
    }
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current?.open && !ref.current.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <details ref={ref} className="group relative">
      {summary}
      <div
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('a') && ref.current) ref.current.open = false
        }}>
        {children}
      </div>
    </details>
  )
}
