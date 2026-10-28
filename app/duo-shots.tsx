'use client'

import { useState } from 'react'
import { DuoMockup } from './duo-mockup'
import type { DuoShotsName } from './duo-shots-names'

type Shot = { src: string; alt: string; label: string; caption: string }

const OPEN_SCREENS: Shot[] = [
  {
    src: '/duo/home-open.webp',
    alt: 'Steps Widget home screen on the open iPhone Duo: the widget preview in the middle, every style below it, and the appearance, time and chart menu opened from the side bar',
    label: 'Home',
    caption: 'The widget in the middle, every style below it, and its options a tap away in the side bar.',
  },
  {
    src: '/duo/settings-insight-open.webp',
    alt: 'Settings on the left page of the open iPhone Duo and Insight on the right, meeting at the fold',
    label: 'Settings',
    caption: 'The settings list on the left, what you open from it on the right.',
  },
  {
    src: '/duo/photo-style-open.webp',
    alt: 'Photo style editor on the open iPhone Duo: the widget preview on the left page, tone, blur and colour controls on the right',
    label: 'Photo styles',
    caption: 'The preview on one page, the controls on the other.',
  },
]

function Frame({ children, caption }: { children: React.ReactNode; caption: string }) {
  return (
    <figure className="not-prose my-10">
      {children}
      <figcaption className="mt-4 text-center text-sm text-[var(--text-muted)]">{caption}</figcaption>
    </figure>
  )
}

function Folded() {
  return (
    <Frame caption="Folded: one column, with Settings, the photo style button and Save in the side bar.">
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-6">
        <DuoMockup
          pose="closed"
          src="/duo/home-folded.webp"
          alt="Steps Widget home screen on the folded iPhone Duo, with the toolbar in the vertical bar beside the content"
          sizes="(max-width: 640px) 45vw, 280px"
        />
        <DuoMockup
          pose="closed"
          src="/duo/photo-style-folded.webp"
          alt="Photo style editor on the folded iPhone Duo, with its tabs in the vertical bar"
          sizes="(max-width: 640px) 45vw, 280px"
        />
      </div>
    </Frame>
  )
}

function Open() {
  const [index, setIndex] = useState(0)
  const shot = OPEN_SCREENS[index]
  return (
    <Frame caption={shot.caption}>
      <DuoMockup pose="open" src={shot.src} alt={shot.alt} sizes="(max-width: 640px) 90vw, 720px" className="mx-auto w-full max-w-3xl" />
      <div className="mt-6 flex justify-center">
        <div className="inline-flex rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] p-1 text-sm font-medium">
          {OPEN_SCREENS.map((option, optionIndex) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setIndex(optionIndex)}
              aria-pressed={index === optionIndex}
              className={`rounded-full px-4 py-1.5 transition ${
                index === optionIndex ? 'bg-[var(--control-active)] text-[var(--control-active-text)]' : 'text-[var(--text-muted)] hover:text-[var(--text-strong)]'
              }`}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </Frame>
  )
}

function Sheets() {
  return (
    <Frame caption="Open flat, Insight's month selector sits at the bottom. Half-folded, it moves onto the right page, so the picker it opens appears where your finger already is.">
      <DuoMockup
        pose="open"
        src="/duo/settings-insight-open.webp"
        alt="Settings on the left page of the open iPhone Duo and Insight on the right, with Insight's month selector at the bottom"
        sizes="(max-width: 640px) 90vw, 720px"
        className="mx-auto w-full max-w-3xl"
      />
    </Frame>
  )
}

// Both frames at one physical scale: the closed frame is 1574px wide, the open one 3093px.
function Space() {
  return (
    <Frame caption="The same Insight screen on both displays. One layout, sized by the room it has.">
      <div className="mx-auto flex max-w-3xl items-end gap-4">
        <div style={{ flex: '1574 1 0' }}>
          <DuoMockup pose="closed" src="/duo/insight-folded.webp" alt="Insight on the folded iPhone Duo, in a single column" sizes="(max-width: 640px) 30vw, 250px" />
        </div>
        <div style={{ flex: '3093 1 0' }}>
          <DuoMockup
            pose="open"
            src="/duo/settings-insight-open.webp"
            alt="Settings and Insight side by side on the open iPhone Duo"
            sizes="(max-width: 640px) 60vw, 500px"
          />
        </div>
      </div>
    </Frame>
  )
}

const DEMOS: Record<DuoShotsName, () => React.JSX.Element> = { folded: Folded, open: Open, sheets: Sheets, space: Space }

/** One of the iPhone Duo post's section demos, embedded as `![…](/demos/iphone-duo/<name>)`. */
export function DuoShots({ name }: { name: DuoShotsName }) {
  const Demo = DEMOS[name]
  return <Demo />
}
