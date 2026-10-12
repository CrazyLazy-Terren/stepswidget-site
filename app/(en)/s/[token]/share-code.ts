/**
 * Reads the recipe a style card's QR code carries.
 *
 * Mirrors `StyleShareCode` in the iOS app (`Steps/PhotoStyle/StyleShareCard.swift`):
 * a fixed byte layout, base64url in the URL path. The card's photo never
 * reaches the site, so this is only enough to describe the style — which mode
 * it is, how the window is framed, and its colours.
 */

export type BackgroundRecipe = {
  mode: 'background'
  /** -0.85…0.85. Negative darkens and deepens, positive lightens and washes out. */
  tone: number
  /** 0…1, as a fraction of a full-strength blur. */
  blur: number
  /** 1…6. How much larger than "fill the widget" the picture is drawn. */
  scale: number
  /** Where the picture sits, as a fraction of the widget's width and height. */
  offsetX: number
  offsetY: number
  /** `#RRGGBB` the step count is drawn in. */
  foreground: string
}

export type PaletteRecipe = {
  mode: 'palette'
  index: number
  /** `#RRGGBB`, the chosen palette's primary colour. */
  hint: string
}

export type ShareRecipe = BackgroundRecipe | PaletteRecipe

const formatVersion = 1
const headerLength = 5
const backgroundLength = headerLength + 13
const paletteLength = headerLength + 4

function hex(bytes: Uint8Array, start: number) {
  return `#${[...bytes.subarray(start, start + 3)].map((byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

/** Nil for anything that is not a card this format understands. */
export function decodeShareToken(token: string): ShareRecipe | undefined {
  let bytes: Uint8Array
  try {
    bytes = new Uint8Array(Buffer.from(decodeURIComponent(token), 'base64url'))
  } catch {
    return undefined
  }

  if (bytes.length < headerLength || bytes[0] !== formatVersion) {
    return undefined
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const photoFraction = view.getUint16(3) / 65535
  if (!(photoFraction > 0 && photoFraction < 1)) {
    return undefined
  }

  if (bytes[1] === 1 && bytes.length === backgroundLength) {
    const scale = view.getUint16(9) / 10_000
    if (scale < 1) {
      return undefined
    }
    return {
      mode: 'background',
      tone: view.getInt16(5) / 10_000,
      blur: Math.min(1, view.getUint16(7) / 10_000),
      scale,
      offsetX: view.getInt16(11) / 1_000,
      offsetY: view.getInt16(13) / 1_000,
      foreground: hex(bytes, 15),
    }
  }

  if (bytes[1] === 0 && bytes.length === paletteLength) {
    return { mode: 'palette', index: bytes[5], hint: hex(bytes, 6) }
  }

  return undefined
}
