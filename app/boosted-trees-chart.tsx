'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * How the on-device MLBoostedTreeRegressor builds tonight's projection, drawn
 * as the trees themselves, left to right: gradient-boosted trees (the LightGBM
 * pattern). Each tree asks a few yes/no questions about today and lands on a
 * leaf; the leaves add to an average day, and the sum is the projected
 * end-of-day step count.
 *
 * Two drawings of the same model: a wide one from `lg` up, where the leaves
 * fan into a Σ beside the trees, and a compact one below that, where the
 * leaves drop down a rail into the result. Both scale to their container, so
 * neither ever clips or scrolls.
 *
 * It plays through a few example days. On each, the trees answer differently:
 * every branch stays drawn and the highlight moves to a different path and
 * leaf, and the projection counts to its new total — with a nudge only when it lands short of the goal.
 * It cycles by itself while on screen (not under reduced motion), with a
 * label naming the day. Illustrative values.
 */
type Tree = {
  name: string
  root: string
  /** The split under the root's "yes" branch. */
  split: string
  /** Leaf values: yes→yes→yes, yes→no, and no. */
  leaves: readonly [number, number, number]
  /**
   * The third question, under yes→yes: its "yes" leaf is `leaves[0]` and its
   * "no" leaf is `no`. The compact drawing folds it into one yes→yes leaf.
   */
  deep: { question: string; no: number }
}

const trees: readonly Tree[] = [
  { name: 'Tree 1', root: 'Behind usual pace?', split: 'After 2 PM?', deep: { question: 'Under 3,000 so far?', no: -700 }, leaves: [-1100, -400, 300] },
  { name: 'Tree 2', root: 'Evening walker?', split: 'Weekday?', deep: { question: 'Walked last evening?', no: 200 }, leaves: [450, 150, -200] },
  { name: 'Tree 3', root: 'Quiet weekday?', split: 'Still last hour?', deep: { question: 'Before 6 PM?', no: -150 }, leaves: [-380, -90, 120] },
]

/** One tree's answers on a given day. A later answer only counts if the earlier ones were "yes". */
type Path = readonly [root: boolean, split: boolean, deep: boolean]

type Day = {
  label: string
  paths: readonly [Path, Path, Path]
  /** What the long tail of smaller trees adds up to. */
  rest: number
}

const days: readonly Day[] = [
  // The day the notification beside the chart is about: 2,100 short at 2 PM.
  {
    label: '2 PM, behind pace',
    paths: [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ],
    rest: -270,
  },
  {
    label: '2 PM, busy morning',
    paths: [
      [false, false, false],
      [true, true, true],
      [false, false, false],
    ],
    rest: 180,
  },
  {
    label: '5 PM, slow afternoon',
    paths: [
      [true, true, false],
      [true, false, false],
      [true, false, false],
    ],
    rest: -120,
  },
]

const baseline = 7200
const restCount = 197
const goal = 8000

/** The leaf a path lands on. */
function leafValue(tree: Tree, [root, split, deep]: Path) {
  if (!root) return tree.leaves[2]
  if (!split) return tree.leaves[1]
  return deep ? tree.leaves[0] : tree.deep.no
}

function projectionFor(day: Day) {
  return baseline + trees.reduce((sum, tree, index) => sum + leafValue(tree, day.paths[index]), 0) + day.rest
}

const format = (n: number) => Math.abs(Math.round(n)).toLocaleString('en-US')
const signed = (n: number) => `${n >= 0 ? '+' : '−'}${format(n)}`

const colors = {
  active: 'var(--accent-color)',
  idle: 'var(--border-strong)',
  nodeFill: 'var(--page-bg)',
  activeFill: 'color-mix(in oklch, var(--accent-color) 12%, var(--page-bg))',
  onAccent: 'var(--button-text)',
  text: 'var(--text-strong)',
  muted: 'var(--text-muted)',
  subtle: 'var(--text-subtle)',
}

function describe(day: Day) {
  const projection = projectionFor(day)
  const leaves = trees.map((tree, index) => `${tree.name} adds ${signed(leafValue(tree, day.paths[index]))}`).join(', ')
  const outcome =
    projection < goal
      ? `${format(goal - projection)} short of an ${format(goal)} goal, so a nudge is sent`
      : `on track for an ${format(goal)} goal, so no nudge`
  return `${day.label}: starting from an average day of ${format(baseline)} steps, ${leaves}, and ${restCount} more trees add ${signed(day.rest)}. The projection is ${format(projection)} steps, ${outcome}.`
}

/**
 * The timing every change shares. A day change hands over level by level:
 * at each level the old branch fades out as the new one fades in, `stepMs`
 * after the level before; the result block changes last (level 4), as the
 * count lands. Path ≈ 3 × 160 + 450 ms, block ≈ 4 × 160 + 450 ms, count 1,050 ms.
 */
const stepMs = 160
const fadeMs = 450
const ease = 'cubic-bezier(0.4, 0, 0.2, 1)'
const countMs = 4 * stepMs + fadeMs - 40

/** `property` fading over `fadeMs` after `depth` levels. */
const fade = (depth: number, ...properties: string[]) => properties.map((property) => `${property} ${fadeMs}ms ${ease} ${depth * stepMs}ms`).join(', ')

/** Counts from the last value to `target` over `ms`, easing in and out. */
function useCountTo(target: number, ms = countMs) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const start = performance.now()
    const from = current.current
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / ms, 1)
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      const next = from + (target - from) * eased
      current.current = next
      setValue(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, ms])

  return value
}

/** A horizontal S-curve from the right edge of one node to the left edge of the next. */
function link(x1: number, y1: number, x2: number, y2: number) {
  const mid = (x1 + x2) / 2
  return `M${x1},${y1} C${mid},${y1} ${mid},${y2} ${x2},${y2}`
}

/**
 * A branch. Every branch is always drawn; changing day only changes which
 * ones are active, crossfading their colour at their level (`depth`), so the
 * old path hands over to the new one level by level from the root.
 */
function Edge({ d, active = false, faint, dashed, depth = 0 }: { d: string; active?: boolean; faint?: boolean; dashed?: boolean; depth?: number }) {
  return (
    <path
      d={d}
      fill="none"
      style={{
        stroke: active ? colors.active : colors.idle,
        strokeWidth: active ? 2 : 1.5,
        opacity: faint ? (active ? 0.55 : 0.3) : 1,
        strokeDasharray: dashed ? '4 4' : undefined,
        transition: fade(depth, 'stroke', 'stroke-width', 'opacity'),
      }}
    />
  )
}

function Node({
  x,
  y,
  w,
  h,
  fontSize,
  label,
  active = false,
  strong,
  depth = 0,
}: {
  x: number
  y: number
  w: number
  h: number
  fontSize: number
  label: string
  active?: boolean
  strong?: boolean
  depth?: number
}) {
  // Changes with its level, in step with the branches into it.
  const transition = fade(depth, 'fill', 'stroke', 'stroke-width')
  return (
    <g>
      <rect
        x={x}
        y={y - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        style={{ fill: active ? colors.activeFill : colors.nodeFill, stroke: active ? colors.active : colors.idle, strokeWidth: active ? 2 : 1.5, transition }}
      />
      {/* Keyed by its label, so a value that changes fades in rather than snapping. */}
      <text
        key={label}
        x={x + w / 2}
        y={y}
        dominantBaseline="central"
        textAnchor="middle"
        className="chart-fade-in tabular-nums"
        style={{ fill: active ? colors.text : colors.muted, fontSize, fontWeight: active && strong ? 600 : 500, transition }}>
        {label}
      </text>
    </g>
  )
}

function SmallText({ x, y, label, anchor = 'middle' }: { x: number; y: number; label: string; anchor?: 'start' | 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} style={{ fill: colors.subtle, fontSize: 11 }}>
      {label}
    </text>
  )
}

/** Column positions and sizes for one drawing of the trees. */
type Geometry = {
  rootX: number
  rootW: number
  splitX: number
  splitW: number
  leafX: number
  leafW: number
  nodeH: number
  fontSize: number
  bandHeight: number
}

/** Where a compact tree's nodes sit within its band, so callers can wire the active leaf onward. */
function treeRows(top: number) {
  // The leaf pair sits 18 apart, either side of the question that splits them.
  return { label: top + 20, root: top + 50, split: top + 22, no: top + 82, yesYes: top - 2, yesNo: top + 46 }
}

/** The compact leaf a path lands on: its row, where its node ends, and how many stages in it is. */
function compactLeaf(top: number, g: Geometry, [root, split]: Path) {
  const y = treeRows(top)
  if (!root) return { y: y.no, end: g.splitX + g.leafW, depth: 1 }
  return { y: split ? y.yesYes : y.yesNo, end: g.leafX + g.leafW, depth: 2 }
}

/** One compact tree, two questions deep: root → split → leaves. */
function TreeBand({ tree, path, top, g }: { tree: Tree; path: Path; top: number; g: Geometry }) {
  const [root, split, deep] = path
  const y = treeRows(top)
  const node = { h: g.nodeH, fontSize: g.fontSize }
  const branchMid = (g.rootX + g.rootW + g.splitX) / 2 - 8
  const leafMid = (g.splitX + g.splitW + g.leafX) / 2
  return (
    <g>
      <text x={g.rootX + 4} y={y.label} style={{ fill: colors.subtle, fontSize: 11, letterSpacing: '0.08em' }}>
        {tree.name.toUpperCase()}
      </text>

      <Edge d={link(g.rootX + g.rootW, y.root, g.splitX, y.no)} active={!root} />
      <Edge d={link(g.rootX + g.rootW, y.root, g.splitX, y.split)} active={root} />
      <Edge d={link(g.splitX + g.splitW, y.split, g.leafX, y.yesNo)} active={root && !split} depth={1} />
      <Edge d={link(g.splitX + g.splitW, y.split, g.leafX, y.yesYes)} active={root && split} depth={1} />

      <SmallText x={branchMid} y={y.split + 4} label="yes" />
      <SmallText x={branchMid} y={y.no + 2} label="no" />
      <SmallText x={leafMid} y={y.yesYes - 4} label="yes" />
      <SmallText x={leafMid} y={y.yesNo + 14} label="no" />

      <Node {...node} x={g.rootX} y={y.root} w={g.rootW} label={tree.root} active />
      <Node {...node} x={g.splitX} y={y.split} w={g.splitW} label={tree.split} active={root} depth={1} />
      <Node {...node} x={g.splitX} y={y.no} w={g.leafW} label={signed(tree.leaves[2])} active={!root} strong depth={1} />
      {/* The third question folds into this leaf, so it shows whichever of its two leaves the day lands on. */}
      <Node {...node} x={g.leafX} y={y.yesYes} w={g.leafW} label={signed(deep ? tree.leaves[0] : tree.deep.no)} active={root && split} strong depth={2} />
      <Node {...node} x={g.leafX} y={y.yesNo} w={g.leafW} label={signed(tree.leaves[1])} active={root && !split} strong depth={2} />
    </g>
  )
}

/** The long tail of smaller trees, collapsed into one row. Always part of the sum. */
function RestRow({ y, g, rootW, value }: { y: number; g: Geometry; rootW: number; value: number }) {
  const node = { h: g.nodeH, fontSize: g.fontSize }
  return (
    <g>
      <Edge d={link(g.rootX + rootW, y, g.leafX, y)} dashed active />
      <Node {...node} x={g.rootX} y={y} w={rootW} label={`+ ${restCount} smaller trees`} />
      <Node {...node} x={g.leafX} y={y} w={g.leafW} label={signed(value)} active strong />
    </g>
  )
}

const wide: Geometry = { rootX: 0, rootW: 150, splitX: 220, splitW: 110, leafX: 600, leafW: 60, nodeH: 24, fontSize: 11, bandHeight: 118 }
/** The extra column the desktop trees get: their third question. */
const wideDeep = { x: 390, w: 140 }

/** Where a desktop tree's nodes sit within its band. */
function deepRows(top: number) {
  // The last leaf pair sits 12 apart, either side of the question that splits them.
  return { label: top + 34, root: top + 58, split: top + 32, no: top + 86, deep: top + 12, splitNo: top + 50, yes: top - 6, deepNo: top + 30 }
}

/** The desktop leaf a path lands on: its row, where its node ends, and how many stages in it is. */
function wideLeaf(top: number, [root, split, deep]: Path) {
  const y = deepRows(top)
  if (!root) return { y: y.no, end: wide.splitX + wide.leafW, depth: 1 }
  if (!split) return { y: y.splitNo, end: wideDeep.x + wide.leafW, depth: 2 }
  return { y: deep ? y.yes : y.deepNo, end: wide.leafX + wide.leafW, depth: 3 }
}

/** One desktop tree, three questions deep, left to right. */
function DeepTreeBand({ tree, path, top }: { tree: Tree; path: Path; top: number }) {
  const [root, split, deep] = path
  const g = wide
  const y = deepRows(top)
  const node = { h: g.nodeH, fontSize: g.fontSize }
  const mid = (x1: number, x2: number) => (x1 + x2) / 2 - 6
  const rootEnd = g.rootX + g.rootW
  const splitEnd = g.splitX + g.splitW
  const deepEnd = wideDeep.x + wideDeep.w
  return (
    <g>
      <text x={g.rootX + 4} y={y.label} style={{ fill: colors.subtle, fontSize: 10, letterSpacing: '0.08em' }}>
        {tree.name.toUpperCase()}
      </text>

      <Edge d={link(rootEnd, y.root, g.splitX, y.no)} active={!root} />
      <Edge d={link(rootEnd, y.root, g.splitX, y.split)} active={root} />
      <Edge d={link(splitEnd, y.split, wideDeep.x, y.splitNo)} active={root && !split} depth={1} />
      <Edge d={link(splitEnd, y.split, wideDeep.x, y.deep)} active={root && split} depth={1} />
      <Edge d={link(deepEnd, y.deep, g.leafX, y.deepNo)} active={root && split && !deep} depth={2} />
      <Edge d={link(deepEnd, y.deep, g.leafX, y.yes)} active={root && split && deep} depth={2} />

      <SmallText x={mid(rootEnd, g.splitX)} y={y.split + 2} label="yes" />
      <SmallText x={mid(rootEnd, g.splitX)} y={y.no} label="no" />
      <SmallText x={mid(splitEnd, wideDeep.x)} y={y.deep + 2} label="yes" />
      <SmallText x={mid(splitEnd, wideDeep.x)} y={y.splitNo} label="no" />
      <SmallText x={mid(deepEnd, g.leafX)} y={y.yes - 3} label="yes" />
      <SmallText x={mid(deepEnd, g.leafX)} y={y.deepNo + 12} label="no" />

      <Node {...node} x={g.rootX} y={y.root} w={g.rootW} label={tree.root} active />
      <Node {...node} x={g.splitX} y={y.split} w={g.splitW} label={tree.split} active={root} depth={1} />
      <Node {...node} x={g.splitX} y={y.no} w={g.leafW} label={signed(tree.leaves[2])} active={!root} strong depth={1} />
      <Node {...node} x={wideDeep.x} y={y.deep} w={wideDeep.w} label={tree.deep.question} active={root && split} depth={2} />
      <Node {...node} x={wideDeep.x} y={y.splitNo} w={g.leafW} label={signed(tree.leaves[1])} active={root && !split} strong depth={2} />
      <Node {...node} x={g.leafX} y={y.yes} w={g.leafW} label={signed(tree.leaves[0])} active={root && split && deep} strong depth={3} />
      <Node {...node} x={g.leafX} y={y.deepNo} w={g.leafW} label={signed(tree.deep.no)} active={root && split && !deep} strong depth={3} />
    </g>
  )
}

/** One path to each desktop leaf: no; yes→no; yes→yes→yes; yes→yes→no. */
const leafPaths: readonly Path[] = [
  [false, false, false],
  [true, false, false],
  [true, true, true],
  [true, true, false],
]

/** One path to each compact leaf: no; yes→no; yes→yes. */
const compactPaths: readonly Path[] = [
  [false, false, false],
  [true, false, false],
  [true, true, true],
]

/**
 * The result block's rows, from its top: sized to the content, with even
 * spacing and no slack. `h` is the block's height.
 */
function resultLayout(numberSize: number) {
  // The number's baseline: 16 of padding plus its cap height.
  const number = 16 + Math.round(numberSize * 0.74)
  const divider = number + 14
  const status = divider + 22
  return { number, divider, status, h: status + 14 }
}

/**
 * The result: the projected total and whether it sends a nudge, in one block.
 * Short of the goal, it fills with the accent; on track, it fades to a quiet
 * tint. It changes after the path has lit up (`depth` 4).
 */
function ResultBlock({
  x,
  top,
  w,
  projection,
  target,
  numberSize,
}: {
  x: number
  top: number
  w: number
  projection: number
  target: number
  numberSize: number
}) {
  const short = target < goal
  // Last, as the count lands.
  const transition = fade(4, 'fill', 'stroke', 'stroke-width', 'opacity')
  // Text on the solid accent takes the theme's on-accent ink.
  const ink = short ? colors.onAccent : colors.text
  const cx = x + w / 2
  const rows = resultLayout(numberSize)
  const h = rows.h
  const dividerY = top + rows.divider
  return (
    <g>
      <rect
        x={x}
        y={top}
        width={w}
        height={h}
        rx={16}
        style={{ fill: short ? colors.active : colors.activeFill, stroke: colors.active, strokeWidth: short ? 0 : 1.5, transition }}
      />
      <text x={cx} y={top + rows.number} textAnchor="middle" className="tabular-nums" style={{ fill: ink, fontSize: numberSize, fontWeight: 600, transition }}>
        {format(projection)}
      </text>
      <line
        x1={x + 16}
        x2={x + w - 16}
        y1={dividerY}
        y2={dividerY}
        style={{ stroke: short ? 'color-mix(in oklch, var(--button-text) 30%, transparent)' : colors.idle, strokeWidth: 1, transition }}
      />
      {/* Both statuses are always there and crossfade with the block; the gap counts with the total. */}
      <text x={cx} y={top + rows.status} textAnchor="middle" className="tabular-nums" style={{ fill: colors.onAccent, fontSize: 12, opacity: short ? 1 : 0, transition }}>
        <tspan style={{ opacity: 0.85 }}>{`${format(Math.max(goal - projection, 0))} short of ${format(goal)} `}</tspan>
        <tspan style={{ fontWeight: 600 }}>Send</tspan>
      </text>
      <text x={cx} y={top + rows.status} textAnchor="middle" style={{ fill: colors.text, fontSize: 12, opacity: short ? 0 : 1, transition }}>
        <tspan style={{ opacity: 0.85 }}>{`on track for ${format(goal)} `}</tspan>
        <tspan style={{ fontWeight: 600 }}>Silence</tspan>
      </text>
    </g>
  )
}

/** Breathing room around the wide drawing, in viewBox units. */
const widePadding = 24

/** From `lg` up: the trees on the left fan into Σ, then the result block on the right. */
function WideDiagram({ day, projection }: { day: Day; projection: number }) {
  const g = wide
  const sumX = 790
  const sumR = 20
  const sumY = 190
  const outX = 900
  const outW = 240
  const outH = resultLayout(28).h
  // As wide as the drawing, so nothing pads the right.
  const width = outX + outW
  const bandTop = (index: number) => 14 + index * g.bandHeight
  const restY = bandTop(trees.length) + 14
  const height = restY + g.nodeH / 2
  const lastColumn = g.leafX + g.leafW

  return (
    <svg
      viewBox={`${-widePadding} ${-widePadding} ${width + widePadding * 2} ${height + widePadding * 2}`}
      className="hidden h-auto w-full lg:block"
      role="img"
      aria-labelledby="boosted-trees-wide-title boosted-trees-wide-desc">
      <title id="boosted-trees-wide-title">How boosted trees project where today ends</title>
      <desc id="boosted-trees-wide-desc">{describe(day)}</desc>

      {trees.map((tree, index) => {
        const top = bandTop(index)
        const path = day.paths[index]
        // Every leaf has a line to Σ: along its own row to the last column
        // (each row is clear by then), then curving in. The one the day lands
        // on is active.
        const landed = wideLeaf(top, path)
        return (
          <g key={tree.name}>
            {leafPaths.map((candidate) => {
              const leaf = wideLeaf(top, candidate)
              const curve = link(lastColumn, leaf.y, sumX - sumR, sumY).replace(/^M\S+ /, '')
              return (
                <Edge
                  key={candidate.join()}
                  d={`M${leaf.end},${leaf.y} L${lastColumn},${leaf.y} ${curve}`}
                  active={leaf.y === landed.y && leaf.end === landed.end}
                  faint
                  depth={leaf.depth}
                />
              )
            })}
            <DeepTreeBand tree={tree} path={path} top={top} />
          </g>
        )
      })}

      <Edge d={link(lastColumn, restY, sumX - sumR, sumY)} active faint />
      <RestRow y={restY} g={g} rootW={g.rootW} value={day.rest} />

      <circle cx={sumX} cy={sumY} r={sumR} style={{ fill: colors.activeFill, stroke: colors.active, strokeWidth: 2 }} />
      <text x={sumX} y={sumY} dominantBaseline="central" textAnchor="middle" style={{ fill: colors.text, fontSize: 18, fontWeight: 600 }}>
        Σ
      </text>

      <Edge d={`M${sumX + sumR},${sumY} L${outX},${sumY}`} active />

      <ResultBlock x={outX} top={sumY - outH / 2} w={outW} projection={projection} target={projectionFor(day)} numberSize={28} />
    </svg>
  )
}

const compact: Geometry = { rootX: 0, rootW: 124, splitX: 152, splitW: 108, leafX: 284, leafW: 60, nodeH: 30, fontSize: 12, bandHeight: 105 }

/**
 * Below `lg`: the same trees, still left to right, in a 360-wide drawing.
 * The leaf each tree lands on runs along its row to a rail on the right,
 * which drops into the result below.
 */
function CompactDiagram({ day, projection }: { day: Day; projection: number }) {
  const g = compact
  const width = 360
  const bandTop = (index: number) => 24 + index * g.bandHeight
  const restY = bandTop(trees.length) + 30
  const railX = 354
  const outTop = restY + 44
  const outH = resultLayout(34).h
  const height = outTop + outH + 2
  const leafEnd = g.leafX + g.leafW

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      // On phones it reaches into the card's 24px padding, leaving 4px each side.
      className="-mx-5 h-auto w-[calc(100%+2.5rem)] max-w-none sm:mx-auto sm:w-full sm:max-w-md lg:hidden"
      role="img"
      aria-labelledby="boosted-trees-compact-title boosted-trees-compact-desc">
      <title id="boosted-trees-compact-title">How boosted trees project where today ends</title>
      <desc id="boosted-trees-compact-desc">{describe(day)}</desc>

      {/* The rail every leaf drops into, down to the result. */}
      <Edge d={`M${railX},${treeRows(bandTop(0)).yesYes} L${railX},${outTop}`} active faint />
      {trees.map((tree, index) => {
        const top = bandTop(index)
        const path = day.paths[index]
        const landed = compactLeaf(top, g, path)
        return (
          <g key={tree.name}>
            {/* Every leaf has a line to the rail; the one the day lands on is active. */}
            {compactPaths.map((candidate) => {
              const leaf = compactLeaf(top, g, candidate)
              return <Edge key={candidate.join()} d={`M${leaf.end},${leaf.y} L${railX},${leaf.y}`} active={leaf.y === landed.y} faint depth={leaf.depth + 1} />
            })}
            <TreeBand tree={tree} path={path} top={top} g={g} />
          </g>
        )
      })}
      <Edge d={`M${leafEnd},${restY} L${railX},${restY}`} active faint />
      <RestRow y={restY} g={g} rootW={g.splitX + g.splitW - g.rootX} value={day.rest} />

      <ResultBlock x={0} top={outTop} w={width} projection={projection} target={projectionFor(day)} numberSize={34} />
    </svg>
  )
}

/** How long each example day stays up before the next. */
const dayMs = 2800

export function BoostedTreesChart() {
  const [dayIndex, setDayIndex] = useState(0)
  const [onScreen, setOnScreen] = useState(false)
  const figureRef = useRef<HTMLElement>(null)
  const day = days[dayIndex]
  const projection = useCountTo(projectionFor(day))

  // Only cycle while the chart is on screen, and never under reduced motion.
  useEffect(() => {
    const figure = figureRef.current
    if (!figure) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.8 })
    observer.observe(figure)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!onScreen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setTimeout(() => setDayIndex((index) => (index + 1) % days.length), dayMs)
    return () => window.clearTimeout(timer)
  }, [onScreen, dayIndex])

  return (
    <figure ref={figureRef} className="mt-12 rounded-2xl border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8 lg:p-10">
      {/* Which example day is showing; just a label, it changes by itself. */}

      <WideDiagram day={day} projection={projection} />
      <CompactDiagram day={day} projection={projection} />
      <p className="mt-6 text-xs font-medium text-[var(--text-subtle)]" aria-hidden="true">
        {/* Keyed by the day, so the name fades in rather than snapping. */}
        <span key={day.label} className="chart-fade-in ">
          {day.label}
        </span>
      </p>
      <figcaption className="mt-8 border-t border-[color:var(--border)] pt-6 text-sm leading-6 text-[var(--text-muted)]">
        Gradient-boosted trees, the same approach behind LightGBM, run right on your iPhone using Core ML’s MLBoostedTreeRegressor. Each tree asks a few
        questions about your day, then corrects what the earlier trees got wrong. Together, their predictions estimate where your day will end. Illustrative
        example.
      </figcaption>
    </figure>
  )
}
