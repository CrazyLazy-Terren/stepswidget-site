import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import closedFrame from '../public/assets/iPhone Duo - Night Sky - Outer Closed Portrait.webp'
import openFrame from '../public/assets/iPhone Duo - Night Sky - Inner Open Landscape.webp'

export type DuoPose = 'closed' | 'open'

/*
 * Measured from the frame PNGs. Closed: the outer display's opening is exactly
 * 1398×2034 (its native 466×678pt at 3x) at (88, 80); the spine side is almost
 * square and the far side carries the ~177px corner. Open: the inner display,
 * landscape, is 2853×2007 at (120, 120), with the fold at its middle.
 */
const FRAMES = {
  closed: {
    frame: closedFrame,
    size: { width: 1574, height: 2194 },
    screen: { x: 88, y: 80, width: 1398, height: 2034 },
    radius: { leading: 26, trailing: 177 },
  },
  open: {
    frame: openFrame,
    size: { width: 3093, height: 2247 },
    screen: { x: 120, y: 120, width: 2853, height: 2007 },
    radius: { leading: 165, trailing: 165 },
  },
} as const

// The screen layer runs under the bezel so no hairline of page shows between them.
const BLEED = 4

const pct = (value: number, of: number) => `${((value / of) * 100).toFixed(4)}%`

function screenStyle(pose: DuoPose): CSSProperties {
  const { size, screen, radius } = FRAMES[pose]
  const width = screen.width + BLEED * 2
  const height = screen.height + BLEED * 2
  const corner = (r: number) => `${pct(r + BLEED, width)} ${pct(r + BLEED, height)}`

  return {
    left: pct(screen.x - BLEED, size.width),
    top: pct(screen.y - BLEED, size.height),
    width: pct(width, size.width),
    height: pct(height, size.height),
    borderTopLeftRadius: corner(radius.leading),
    borderBottomLeftRadius: corner(radius.leading),
    borderTopRightRadius: corner(radius.trailing),
    borderBottomRightRadius: corner(radius.trailing),
    containerType: 'size',
  }
}

type DuoMockupProps = {
  pose: DuoPose
  /** A screenshot to fill the screen: 1398×2034 closed, 2670×1878 open. */
  src?: string
  /** Required with `src`. Describes what the screen shows, not the phone. */
  alt?: string
  /** Live content for the screen instead of `src`; the screen is a size container. */
  children?: ReactNode
  className?: string
  sizes?: string
  eager?: boolean
}

export function DuoMockup({ pose, src, alt = '', children, className = '', sizes = '(max-width: 640px) 90vw, 720px', eager = false }: DuoMockupProps) {
  const { frame, size } = FRAMES[pose]
  const loading = eager ? 'eager' : 'lazy'

  return (
    <div className={`relative ${className}`.trim()} style={{ aspectRatio: `${size.width} / ${size.height}` }}>
      <div className="absolute overflow-hidden bg-black" style={screenStyle(pose)}>
        {src ? <Image src={src} alt={alt} fill sizes={sizes} loading={loading} className="object-cover object-top" /> : children}
      </div>
      <Image src={frame} alt="" fill sizes={sizes} loading={loading} draggable={false} className="pointer-events-none select-none" />
    </div>
  )
}
