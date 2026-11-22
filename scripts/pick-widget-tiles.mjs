import path from 'node:path'
import sharp from 'sharp'
import { columns, defaultExportDir, readManifest, rows, sweepCells, writeTiles } from './widget-tiles-lib.mjs'

/*
 * Builds the home page's widget wall from the app's export.
 *
 * The app's debug-only `WidgetGalleryExporter` (launch with
 * `-ExportWidgetGallery`) renders every Home Screen widget in every catalogue
 * style, light and dark, into its Documents/WidgetGallery folder. Copy that
 * folder out of the simulator to .widget-export/ and run:
 *
 *   node scripts/pick-widget-tiles.mjs [export-dir]
 *
 * To choose tiles by hand instead, or adjust what this picks, use
 * `pnpm widgets:pick` (scripts/widget-picker.mjs).
 *
 * Each light render's colour is measured (the circular mean hue of its
 * saturated pixels). Tiles are then picked to walk the colour wheel once, laid
 * on a 6×4 grid where each diagonal shares one hue, so the colour sweeps from
 * the top-left corner to the bottom-right, with no widget type next to itself.
 * Styles that colour the whole background are capped at a quarter of the wall.
 * Neutral (grey/black), very dark (navy, wine) and two-tone styles are left
 * out: they have no single, readable place on a colour wheel.
 *
 * Writes WebPs to public/assets/widgets/ (clearing old ones) and the tile list
 * to app/widget-tiles.ts.
 */

const count = columns * rows
/** Where the sweep starts, in degrees: just before red, so it reads red → pink. */
const startHue = 350
const diagonals = rows + columns - 1
/** Above this share of coloured pixels, the colour is the widget's background. */
const backgroundShare = 0.35
/** At most this many coloured-background tiles, so the wall reads as widgets, not swatches. */
const maxFilled = Math.floor(count / 4)

const exportDir = process.argv[2] ?? defaultExportDir

function rgbToHsv(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max ? d / max : 0, v: max / 255 }
}

/** The render's dominant hue and how much of it is coloured at all. */
async function measure(file) {
  const { data, info } = await sharp(file).resize(84, 84).raw().toBuffer({ resolveWithObject: true })
  let x = 0
  let y = 0
  let weight = 0
  let brightness = 0
  let coloured = 0
  let opaque = 0
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 200) continue
    opaque++
    const { h, s, v } = rgbToHsv(data[i], data[i + 1], data[i + 2])
    if (s < 0.3 || v < 0.25) continue
    coloured++
    const rad = (h * Math.PI) / 180
    x += Math.cos(rad) * s
    y += Math.sin(rad) * s
    weight += s
    brightness += v
  }
  const hue = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
  // 1 when every coloured pixel shares one hue; lower for two-tone styles
  // (a red ring round a green number), which would muddy the sweep.
  const coherence = weight ? Math.hypot(x, y) / weight : 0
  return { hue, coherence, brightness: coloured ? brightness / coloured : 0, colourfulness: coloured / Math.max(opaque, 1) }
}

const hueGap = (a, b) => {
  const d = Math.abs(a - b) % 360
  return Math.min(d, 360 - d)
}

const candidates = []
for (const { key, type } of readManifest(exportDir)) {
  const darkLook = await measure(path.join(exportDir, `${key}-dark.png`))
  // Placed by the light render's hue; the dark one must be one colour too.
  candidates.push({ key, type, ...(await measure(path.join(exportDir, `${key}-light.png`))), darkCoherence: darkLook.coherence })
}
const colourful = candidates.filter((c) => c.colourfulness > 0.03 && c.coherence > 0.9 && c.darkCoherence > 0.9 && c.brightness > 0.55)
// A style whose colour fills the widget's background rather than its marks.
const isFilled = (c) => c.colourfulness > backgroundShare
console.log(`${candidates.length} renders, ${colourful.length} colourful, ${colourful.filter(isFilled).length} with a coloured background`)

const cells = sweepCells()

const placed = new Map() // "row,col" -> candidate
const used = new Set()
const perType = {}
const picks = []
let filled = 0
cells.forEach((cell) => {
  // One hue per diagonal, so each diagonal reads as one band of colour.
  const target = (startHue + ((cell.row + cell.col) / diagonals) * 360) % 360
  const neighbours = [
    placed.get(`${cell.row},${cell.col - 1}`),
    placed.get(`${cell.row - 1},${cell.col}`),
    placed.get(`${cell.row - 1},${cell.col + 1}`),
  ].filter(Boolean)
  let best
  let bestScore = Infinity
  for (const c of colourful) {
    if (used.has(c.key) || (isFilled(c) && filled >= maxFilled)) continue
    const score =
      // Matching the diagonal's colour comes first; type variety second.
      hueGap(c.hue, target) * 2 +
      (neighbours.some((n) => n.type === c.type) ? 30 : 0) +
      (perType[c.type] ?? 0) * 4 +
      // Colour on the widget's marks rather than all over it, where the hue allows.
      (isFilled(c) ? 12 : 0)
    if (score < bestScore) {
      bestScore = score
      best = c
    }
  }
  used.add(best.key)
  if (isFilled(best)) filled++
  perType[best.type] = (perType[best.type] ?? 0) + 1
  placed.set(`${cell.row},${cell.col}`, best)
  picks.push({ ...best, row: cell.row, col: cell.col })
})
console.log('per type', perType, 'coloured backgrounds', filled)

console.log(`wrote ${await writeTiles(exportDir, picks)} tiles`)
