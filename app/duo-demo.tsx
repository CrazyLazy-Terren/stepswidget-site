'use client'

import { useEffect, useState } from 'react'
import { DuoMockup, type DuoPose } from './duo-mockup'

// Captured on the iPhone Duo simulator: the outer display folded, the inner one open.
const SCREENSHOTS: Record<DuoPose, string> = {
  closed: '/duo/home-folded.webp',
  open: '/duo/home-open.webp',
}

const captions: Record<DuoPose, string> = {
  closed: 'Folded: one column, with the toolbar in the vertical bar beside it.',
  open: 'Open: the widget and every style at full size, with its options a tap away in the side bar.',
}

/**
 * The home screen on iPhone Duo, folded and open. It alternates on its own,
 * holds still while hovered or focused, and never moves for people who prefer
 * reduced motion; the switch below changes pose either way.
 */
export function DuoDemo({ className = '', interval = 4500 }: { className?: string; interval?: number }) {
  const [pose, setPose] = useState<DuoPose>('closed')
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reducedMotion) {
      return
    }
    const timer = window.setTimeout(() => setPose((current) => (current === 'closed' ? 'open' : 'closed')), interval)
    return () => window.clearTimeout(timer)
  }, [pose, paused, reducedMotion, interval])

  const layer = (shown: boolean) =>
    `absolute transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
      shown ? 'opacity-100 scale-100' : 'pointer-events-none opacity-0 scale-[0.96]'
    }`

  return (
    <figure
      className={`not-prose ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      {/* Both frames share one physical scale, so they are drawn on the open frame's canvas. */}
      <div
        className="relative w-full"
        style={{ aspectRatio: '3093 / 2247' }}
        role="img"
        aria-label={`Steps home screen on iPhone Duo, ${pose === 'closed' ? 'folded' : 'open'}. ${captions[pose]}`}>
        <div className={layer(pose === 'closed')} style={{ left: '24.56%', width: '50.89%', top: '1.18%' }} aria-hidden>
          <DuoMockup pose="closed" src={SCREENSHOTS.closed} sizes="(max-width: 640px) 45vw, 360px" />
        </div>
        <div className={`${layer(pose === 'open')} inset-0`} aria-hidden>
          <DuoMockup pose="open" src={SCREENSHOTS.open} sizes="(max-width: 640px) 90vw, 720px" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="inline-flex rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] p-1 text-sm font-medium">
          {(['closed', 'open'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPose(option)}
              aria-pressed={pose === option}
              className={`rounded-full px-4 py-1.5 transition ${
                pose === option ? 'bg-[var(--control-active)] text-[var(--control-active-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
              }`}>
              {option === 'closed' ? 'Folded' : 'Open'}
            </button>
          ))}
        </div>
        <figcaption className="text-center text-sm text-[var(--text-muted)]">{captions[pose]}</figcaption>
      </div>
    </figure>
  )
}
