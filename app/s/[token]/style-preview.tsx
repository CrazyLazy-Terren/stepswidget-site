import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { PageSection } from '../../page-shell'
import type { BackgroundRecipe, PaletteRecipe, ShareRecipe } from './share-code'

/**
 * The page's header: the title over a photograph, with the shared style's
 * widget beside it.
 *
 * The card's own picture never reaches the site — only its recipe does — so
 * the recipe is applied to a stand-in. The framing, tone, blur and colours are
 * the sender's; the photograph is not, and the caption says so.
 *
 * Sample photo by Andrew Ridley, Unsplash License
 * (https://unsplash.com/photos/Kt5hRENuotI), via Lorem Picsum.
 */

const photo = { src: '/assets/shared-style-sample.jpg', width: 2800, height: 1867 }

/** Six colours clustered from the sample photo, heaviest first. */
const samplePalette = ['514947', '7A502D', 'F4B442', 'FEE9BC']

/** Shown for a link that is not a card this page can read. */
const fallback: BackgroundRecipe = { mode: 'background', tone: -0.2, blur: 0, scale: 1.6, offsetX: 0.12, offsetY: 0, foreground: '#FFFFFF' }

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

function isLight(hex: string) {
  const [r, g, b] = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.6
}

/** The widget's square. A size container, so everything inside scales with it. */
const widgetFrame =
  'relative aspect-square w-44 overflow-hidden rounded-[22%] shadow-[0_24px_60px_rgba(0,0,0,0.5)] ring-2 ring-white/85 [container-type:size] sm:w-64 lg:w-72'

/**
 * The widget a Background style makes: the square window onto the photo the
 * sender framed, laid out by the app's rules. The widget sees the photo's
 * shorter edge divided by the zoom, panned by the offsets.
 */
function BackgroundWidget({ recipe }: { recipe: BackgroundRecipe }) {
  // In units of the photo's height, its shorter edge.
  const aspect = photo.width / photo.height
  const side = 1 / clamp(recipe.scale, 1, 6)
  // The app pans the picture by the offset; the window moves the other way.
  const left = clamp(aspect / 2 - recipe.offsetX * side, side / 2, aspect - side / 2) - side / 2
  const top = clamp(0.5 - recipe.offsetY * side, side / 2, 1 - side / 2) - side / 2

  // Same rules as `WidgetBackgroundImage`: the darker half lowers brightness,
  // the lighter half is a white veil, saturation swings with both, and a full
  // blur spans 12% of the widget.
  const tone = clamp(recipe.tone, -0.85, 0.85)
  const crop: CSSProperties = {
    width: `${(aspect / side) * 100}%`,
    height: `${(1 / side) * 100}%`,
    left: `${-(left / side) * 100}%`,
    top: `${-(top / side) * 100}%`,
    filter: `brightness(${1 + Math.min(0, tone)}) saturate(${1 - tone * 0.6})`,
  }
  // Not `filter: blur()` on the photo: the browser only blurs the part inside
  // the rounded clip, so the edge pixels average in transparency and the
  // widget gets a dark rim. A backdrop blur repeats the edge pixels instead —
  // the web's version of the app's `.blur(radius:, opaque: true)`.
  const blur = clamp(recipe.blur, 0, 1) * 12
  const blurLayer: CSSProperties = { backdropFilter: `blur(${blur}cqw)`, WebkitBackdropFilter: `blur(${blur}cqw)` }

  return (
    <div className={widgetFrame}>
      <Image src={photo.src} alt="" width={photo.width} height={photo.height} sizes="600px" className="absolute max-w-none" style={crop} />
      {blur > 0 && <div className="absolute inset-0" style={blurLayer} />}
      {tone > 0 && <div className="absolute inset-0 bg-white" style={{ opacity: tone }} />}
      {/* <WidgetFace color={recipe.foreground} /> */}
    </div>
  )
}

/** The widget a Colors Palette style makes, and the colours it came from. */
function PaletteWidget({ recipe }: { recipe: PaletteRecipe }) {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* <div className={widgetFrame} style={{ backgroundColor: recipe.hint }}>
        <WidgetFace color={isLight(recipe.hint) ? '#111111' : '#FFFFFF'} />
      </div> */}
      <div className="flex gap-2" role="img" aria-label="Colours taken from the photo">
        {samplePalette.map((color) => (
          <span key={color} className="size-12 rounded-full ring-2 ring-white/80" style={{ backgroundColor: '#' + color }} />
        ))}
      </div>
    </div>
  )
}

type StyleHeroProps = {
  recipe?: ShareRecipe
  eyebrow: string
  title: string
  description: string
  /**
   * The download button, shown in the hero on phones only. Someone who scanned
   * a card is on a phone, and should not have to scroll past the steps to find
   * it; on desktop the page's own download block sits right under the steps.
   */
  cta?: ReactNode
}

export function StyleHero({ recipe, eyebrow, title, description, cta }: StyleHeroProps) {
  const shown = recipe ?? fallback
  const caption = !recipe
    ? 'A photo style, shown on a sample.'
    : shown.mode === 'palette'
      ? 'Colors Palette style: the widget takes its colours from the photo instead of showing it.'
      : 'Background style: the photo sits behind the step count.'

  return (
    <PageSection
      paddingY="none"
      className="overflow-hidden bg-black pb-12 pt-24 sm:pb-24 sm:pt-36"
      overlay={
        <div aria-hidden="true" className="absolute inset-0">
          <Image src={photo.src} alt="" fill sizes="100vw" className="object-cover" priority />
          {/*
            Dark enough for white type everywhere, heaviest where the text sits:
            the bottom on a phone, where the text follows the widget, and the
            left on desktop, where it sits beside it.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 from-0% via-black/60 via-45% to-black/85 lg:bg-gradient-to-r lg:from-black/75 lg:from-0% lg:via-black/45 lg:via-50% lg:to-black/10" />
        </div>
      }
      containerClassName="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
      <div className="text-center lg:text-left">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/80">{eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-3xl text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:mt-4 sm:text-6xl lg:mx-0">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-7 text-white/85 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">{description}</p>

        {cta && (
          <div className="mt-7 flex flex-col items-center gap-3 lg:hidden">
            {cta}
            <a href="#steps" className="py-2 text-sm font-medium text-white/85 underline-offset-4 hover:underline">
              Already have the app? See the steps
            </a>
          </div>
        )}
      </div>

      {/* First on a phone: the style is the hook, the explanation follows it. */}
      <figure className="-order-1 flex flex-col items-center lg:order-none">
        {shown.mode === 'palette' ? <PaletteWidget recipe={shown} /> : <BackgroundWidget recipe={shown} />}
        <figcaption className="mt-4 max-w-72 text-center text-xs leading-5 text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] lg:mt-5">{caption}</figcaption>
      </figure>
    </PageSection>
  )
}
