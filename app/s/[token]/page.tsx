import type { Metadata } from 'next'
import Link from 'next/link'
import { AppStoreButton } from '../../app-store-button'
import { ArrowRight } from '../../arrow'
import { ContentShell } from '../../content-shell'

/**
 * Where the QR code on a shared style card lands.
 *
 * The app never needs this page: it reads the style's recipe straight out of
 * the code in the image. The page is only for someone who pointed the Camera
 * at a card, so the token is ignored — it says how to get the app and how to
 * turn the image they were sent into a style.
 */

const title = 'Someone shared a widget style with you'
const description =
  'The image you were sent is a Steps Widget style card: a photo with the style built into it. Get the app, then open the image in it to make the same widget style in one step.'

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
    heading: 'Get the app',
    body: 'Download Steps Widget from the App Store. It is free, and it reads your step count from Apple Health.',
  },
  {
    heading: 'Save the image',
    body: 'Keep the whole picture, including the white strip with the code along the bottom. In Messages or Photos, touch and hold it and choose Save to Photos, or save it to Files.',
  },
  {
    heading: 'Open it in the app',
    body: 'In the app, tap Style from Photo, then Select Photo or Files, and pick the image. From Files, Mail, or AirDrop you can also share the image straight to Steps.',
  },
  {
    heading: 'Save the style',
    body: 'The app reads the code, removes the strip, and sets up the same framing and colours as the original. Adjust anything you like, then tap the checkmark to put it on a widget.',
  },
]

export default function SharedStylePage() {
  return (
    <ContentShell eyebrow="Shared widget style" title={title} description={description}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">Don&apos;t have the app yet?</h2>
          <p className="mt-4 max-w-md leading-7 text-[var(--text-muted)]">
            Install it on the iPhone you want the widget on, then come back to the image. Already have it? Skip straight to step two.
          </p>
          <AppStoreButton className="mt-8" href={styleShareAppStoreUrl} label="Download Steps Widget on the App Store" />
        </div>

        <ol className="grid gap-5">
          {steps.map((step, index) => (
            <li
              key={step.heading}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-color)] text-sm font-semibold text-white">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-strong)]">{step.heading}</h3>
                <p className="mt-2 leading-7 text-[var(--text-muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">If the image opens as a plain photo</h2>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--text-muted)]">
          The app needs the original card. A screenshot of it, or a copy with the bottom strip cropped off, no longer carries the style, so ask for
          the image itself to be sent again. Applying a style to a widget needs the Customization subscription; opening and saving the style is
          free.
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
