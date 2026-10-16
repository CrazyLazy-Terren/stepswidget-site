'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IPhoneMockup } from './iphone-mockup'

export type CarouselScreen = {
  src: string
  /** Describes what the screen shows. */
  alt: string
  caption: string
}

type IPhoneCarouselProps = {
  screens: readonly CarouselScreen[]
  /** Time each screen stays up, in milliseconds. */
  interval?: number
  /** Sets the phone's width. */
  className?: string
  sizes?: string
}

/**
 * One phone that slides through its screenshots in order, like a swipe between
 * screens. It holds still while hovered or focused, and never advances on its
 * own for people who prefer reduced motion; the bars below still switch screens.
 */
export function IPhoneCarousel({ screens, interval = 4000, className = '', sizes = '(max-width: 640px) 80vw, 320px' }: IPhoneCarouselProps) {
  const [index, setIndex] = useState(0)
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
    if (paused || reducedMotion || screens.length < 2) {
      return
    }

    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % screens.length), interval)
    return () => window.clearTimeout(timer)
  }, [index, paused, reducedMotion, interval, screens.length])

  return (
    <figure
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      <IPhoneMockup sizes={sizes}>
        <div
          className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}>
          {screens.map((screen, screenIndex) => (
            <div key={screen.src} className="relative h-full w-full shrink-0" aria-hidden={screenIndex !== index}>
              <Image src={screen.src} alt={screen.alt} fill sizes={sizes} className="object-cover object-top" />
            </div>
          ))}
        </div>
      </IPhoneMockup>

      <div className="mt-2 flex justify-center gap-2">
        {screens.map((screen, screenIndex) => (
          <button
            key={screen.src}
            type="button"
            onClick={() => setIndex(screenIndex)}
            aria-label={`Show screen ${screenIndex + 1} of ${screens.length}`}
            aria-current={screenIndex === index}
            className="group py-2">
            <span
              className={`block h-0.5 w-8 transition-colors ${
                screenIndex === index ? 'bg-[var(--accent-color)]' : 'bg-[var(--border-strong)] group-hover:bg-[var(--text-subtle)]'
              }`}
            />
          </button>
        ))}
      </div>
      <figcaption aria-live="polite" className="mt-2 min-h-12 text-left text-sm leading-6 text-[var(--text-muted)]">
        {screens[index].caption}
      </figcaption>
    </figure>
  )
}
