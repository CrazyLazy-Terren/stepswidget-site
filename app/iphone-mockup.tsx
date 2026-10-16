import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import frame from '../public/assets/iPhone 18 Pro Max - Black - Portrait.webp'

/*
 * Measured from the frame PNG (1470×3000). The screen opening is 1320×2868 at
 * (75, 66), which is the 440×956pt display at 3x, and its corners follow a
 * ~190px radius. The screen layer bleeds 4px under the bezel on every side so
 * no hairline of page shows between the two at fractional sizes.
 */
const FRAME = { width: 1470, height: 3000 }
const BLEED = 4
const SCREEN = { x: 75 - BLEED, y: 66 - BLEED, width: 1320 + BLEED * 2, height: 2868 + BLEED * 2, radius: 190 + BLEED }

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(4)}%`

const screenStyle: CSSProperties = {
  left: pct(SCREEN.x, FRAME.width),
  top: pct(SCREEN.y, FRAME.height),
  width: pct(SCREEN.width, FRAME.width),
  height: pct(SCREEN.height, FRAME.height),
  borderRadius: `${pct(SCREEN.radius, SCREEN.width)} / ${pct(SCREEN.radius, SCREEN.height)}`,
  containerType: 'size',
}

type IPhoneMockupProps = {
  /** A screenshot to fill the screen. Cropped to cover, so a 1320×2868 capture fits exactly. */
  src?: string
  /** Required with `src`. Describes what the screen shows, not the phone. */
  alt?: string
  /**
   * Live content for the screen, used instead of `src`. The screen is a size
   * container, so children can scale with `cqw` / `cqh` units.
   */
  children?: ReactNode
  /** Sets the width; the height follows the frame's 49:100 ratio. */
  className?: string
  /** Rendered width hint for the screenshot and frame. */
  sizes?: string
  /** Load eagerly, for a mockup above the fold. */
  eager?: boolean
}

export function IPhoneMockup({ src, alt = '', children, className = '', sizes = '(max-width: 640px) 80vw, 400px', eager = false }: IPhoneMockupProps) {
  const loading = eager ? 'eager' : 'lazy'

  return (
    <div className={`relative aspect-[1470/3000] ${className}`.trim()}>
      <div className="absolute overflow-hidden bg-black" style={screenStyle}>
        {src ? <Image src={src} alt={alt} fill sizes={sizes} loading={loading} className="object-cover object-top" /> : children}
      </div>
      <Image
        src={frame}
        alt=""
        fill
        sizes={sizes}
        loading={loading}
        draggable={false}
        className="pointer-events-none select-none"
      />
    </div>
  )
}
