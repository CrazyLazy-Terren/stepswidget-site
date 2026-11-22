'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * A Lock Screen notification as iOS draws it: app icon, bold title, "now" on
 * the right, body below, on a frosted rounded card. A second, slimmer card
 * peeks out underneath, the way iOS stacks notifications from one app.
 *
 * The surface mixes from the theme tokens rather than iOS's own greys, so it
 * sits on the page in both light and dark.
 *
 * The first time it scrolls into view the notification springs up to size,
 * then the stacked card slides out from under it with a motion of its own
 * (see `.ios-notification-card` / `-stack` in globals.css).
 */
export function IOSNotification({ title, body, time = 'now', className = '' }: { title: string; body: string; time?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`ios-notification relative w-full max-w-sm px-1 pb-3 sm:px-0 ${className}`.trim()}
      role="img"
      aria-label={`Notification from Steps Widget, ${time}: ${title}. ${body}`}>
      {/* The stacked card behind. */}
      <div
        className="ios-notification-stack absolute inset-x-4 bottom-0 h-20 rounded-[20px] border border-[color:var(--border)] bg-[color-mix(in_oklch,var(--text-foreground)_10%,var(--page-bg))] "
        aria-hidden="true"
      />
      <div
        className="ios-notification-card relative flex items-center gap-3 transition-all hover:scale-105 rounded-[22px] border border-[color:var(--border)] bg-[color-mix(in_oklch,var(--text-foreground)_6%,var(--page-bg))]/90 p-4 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.25)] backdrop-blur-lg"
        aria-hidden="true">
        <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="size-10 shrink-0 rounded-[10px]" />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <p className="truncate text-[15px] font-semibold leading-5 text-[var(--text-strong)]">{title}</p>
            <p className="shrink-0 text-[13px] leading-5 text-[var(--text-subtle)]">{time}</p>
          </div>
          <p className="mt-0.5 text-[15px] leading-5 text-[var(--text-main)]">{body}</p>
        </div>
      </div>
    </div>
  )
}
