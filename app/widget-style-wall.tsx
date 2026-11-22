'use client'

import Image from 'next/image'
import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { SectionHeading } from './section-heading'
import { widgetTiles } from './widget-tiles'

/**
 * The Widget Style section: heading and collage, then every Home Screen widget
 * the app draws, as tiles exported straight from the app (see
 * `WidgetGalleryExporter.swift` in the app project). Each tile carries a light
 * and a dark render; CSS shows the one matching the site theme
 * (the other is display: none, so it is out of the accessibility tree too).
 *
 * The tiles are listed in the order the 6-column wall shows them, with the hue
 * sweeping diagonally across it. They rise into place in a wave along that
 * sweep the first time the wall scrolls into view.
 */
export function WidgetStyleWall({ heading }: { heading?: ReactNode }) {
  const wallRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const wall = wallRef.current
    if (!wall) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          wall.dataset.visible = 'true'
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    )
    observer.observe(wall)

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-6">
        <div className="min-w-0 flex-1">
          {heading ?? (
            <SectionHeading eyebrow="Widget Style" title="The Widget, You Keep.">
              Minimal step counts, progress rings, hourly charts, and Lock Screen gauges keep your progress visible across iPhone, Apple Watch, and Mac.
            </SectionHeading>
          )}
        </div>
        {/* Below the heading at full width on phones, beside it from md up. A full photo, so it gets a rounded frame rather than a fade. */}
        <div className="pointer-events-none w-full shrink-0 overflow-hidden rounded-lg md:w-72 lg:w-[28rem]">
          <Image
            src="/assets/find-your-style-collage.webp"
            alt=""
            width={960}
            height={640}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 288px, 448px"
            className="h-auto w-full"
          />
        </div>
      </div>

      <ul ref={wallRef} className="widget-wall mt-12 grid grid-cols-3 gap-5 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6 lg:gap-5">
        {widgetTiles.map((tile) => {
          // The list is already in grid order; the wave follows the colour
          // sweep's diagonals.
          return (
            <li key={tile.id} className="widget-tile" style={{ '--tile-delay': `${tile.wave * 120}ms` } as CSSProperties}>
              <Image
                src={tile.light}
                alt={tile.alt}
                width={504}
                height={504}
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 200px"
                className="widget-tile-light h-auto w-full"
              />
              <Image
                src={tile.dark}
                alt={tile.alt}
                width={504}
                height={504}
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 200px"
                className="widget-tile-dark h-auto w-full"
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
