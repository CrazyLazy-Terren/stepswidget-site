import type { Metadata } from 'next'
import Link from 'next/link'
import { AppStoreButton } from '../../app-store-button'
import { ArrowRight } from '../../arrow'
import { ContentShell } from '../../content-shell'
import { decodeShareToken } from './share-code'
import { StyleHero } from './style-preview'

/**
 * Where the QR code on a shared style card lands.
 *
 * The app never needs this page: it reads the style's recipe straight out of
 * the code in the image. The page is only for someone who pointed the Camera
 * at a card. The token is decoded only to preview the style on a sample
 * photo; beyond that the page says how to get the app and how to
 * turn the image they were sent into a style.
 */

const title = 'Someone shared a widget style with you'
const description =
  'The image you were sent is a Steps Widget style card: a photo with the style built into it. Open it in the app to make the same widget style in a few taps.'

// Every card has its own URL, and none of them should be indexed on its own.
export const metadata: Metadata = {
  title: `${title} - Steps Widget`,
  description,
  robots: { index: false, follow: true },
}

// Separate campaign token so installs from shared cards show up on their own.
const styleShareAppStoreUrl = 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=style-share&mt=8'

const steps = [
  {
    heading: 'Save the image',
    body: 'Save the whole card, code strip included, to Photos or Files.',
  },
  {
    heading: 'Tap Style from Photo',
    body: 'Pick the widget you want to restyle, then tap Style from Photo.',
  },
  {
    heading: 'Pick the card',
    body: 'Choose the saved image. Your style is set up automatically.',
  },
  {
    heading: 'Save the style',
    body: 'Tap the checkmark to put the style on your widget.',
  },
]

type SharedStylePageProps = {
  params: Promise<{ token: string }>
}

export default async function SharedStylePage({ params }: SharedStylePageProps) {
  const { token } = await params
  const recipe = decodeShareToken(token)

  return (
    <ContentShell
      eyebrow="Shared widget style"
      title={title}
      description={description}
      hero={
        <StyleHero
          recipe={recipe}
          eyebrow="Shared widget style"
          title={title}
          description={description}
          cta={<AppStoreButton href={styleShareAppStoreUrl} label="Download Steps Widget on the App Store" />}
        />
      }>
      <div className="grid gap-20">
        <ol id="steps" className="grid gap-5 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.heading}
              className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-3 rounded-[24px] lg:grid-cols-1 border border-[color:var(--border)] bg-[var(--surface-1)] px-6 pt-6 pb-8 shadow-[var(--soft-shadow)]">
              <div className="flex flex-col gap-3">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-[var(--text-strong)]">
                  <span className="flex  h-9 w-9 items-center justify-center rounded-full bg-[var(--text-strong)] text-md font-semibold text-background">
                    {index + 1}
                  </span>
                  {step.heading}
                </h3>
                <p className="text-[var(--text-muted)] leading-7">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* Phones get this button in the hero instead. */}
        <div className="hidden flex-col items-center gap-4 lg:flex">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">Don&apos;t have the app yet?</h2>
          <p className="max-w-md text-center leading-7 text-[var(--text-muted)]">
            Install it on the iPhone you want the widget on, then follow the steps above. It is free, and it reads your step count from Apple Health.
          </p>
          <AppStoreButton className="" href={styleShareAppStoreUrl} label="Download Steps Widget on the App Store" />
        </div>
      </div>

      <div className="mt-16 rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">If the image opens as a plain photo</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--text-muted)]">
          The app needs the original card. A screenshot of it, or a copy with the bottom strip cropped off, no longer carries the style, so ask for the image
          itself to be sent again. Applying a style to a widget needs the Customization subscription; opening and saving the style is free.
        </p>
        <Link
          href="/docs/widgets/share-a-style"
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-color)] transition hover:translate-x-1">
          How style sharing works <ArrowRight />
        </Link>
      </div>
    </ContentShell>
  )
}
