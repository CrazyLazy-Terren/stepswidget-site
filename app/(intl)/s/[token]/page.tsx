import type { Metadata } from 'next'
import Link from 'next/link'
import { AppStoreButton } from '../../../app-store-button'
import { ArrowRight } from '../../../arrow'
import { ContentShell } from '../../../content-shell'
import { defaultOgImages } from '../../../shared-metadata'
import { appStoreBadgeAlt, chromeLang, getLocale, ogLocale } from '../../locale'
import { styleMessages } from './messages'
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
 *
 * The copy follows the visitor's device language (see `../../locale.ts`).
 */

// Every card has its own URL, and none of them should be indexed on its own.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = styleMessages[locale]
  return {
    title: `${t.title} - Steps Widget`,
    description: t.description,
    robots: { index: false, follow: true },
    openGraph: { title: t.title, description: t.description, locale: ogLocale[locale], images: defaultOgImages },
  }
}

// Separate campaign token so installs from shared cards show up on their own.
const styleShareAppStoreUrl = 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=style-share&mt=8'

type SharedStylePageProps = {
  params: Promise<{ token: string }>
}

export default async function SharedStylePage({ params }: SharedStylePageProps) {
  const { token } = await params
  const recipe = decodeShareToken(token)
  const locale = await getLocale()
  const t = styleMessages[locale]
  const lang = chromeLang(locale)
  const appStoreButton = (
    <AppStoreButton href={styleShareAppStoreUrl} label={t.appStoreLabel} lang={lang} alt={appStoreBadgeAlt[locale]} />
  )

  return (
    <ContentShell
      lang={lang}
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
      hero={
        <StyleHero
          recipe={recipe}
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          cta={appStoreButton}
          labels={{
            seeSteps: t.seeSteps,
            captionSample: t.captionSample,
            captionPalette: t.captionPalette,
            captionBackground: t.captionBackground,
            paletteLabel: t.paletteLabel,
          }}
        />
      }>
      <div className="grid gap-20">
        <ol id="steps" className="grid gap-6 lg:grid-cols-4">
          {t.steps.map((step, index) => (
            <li
              key={index}
              className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-4 rounded-lg lg:grid-cols-1 border border-[color:var(--border)] bg-[var(--surface-1)] px-6 pt-6 pb-8">
              <div className="flex flex-col gap-4">
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
        <div className="hidden flex-col items-start gap-4 lg:flex">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{t.noAppHeading}</h2>
          <p className="max-w-md leading-7 text-[var(--text-muted)]">{t.noAppBody}</p>
          {appStoreButton}
        </div>
      </div>

      <div className="mt-16 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-[var(--text-strong)]">{t.plainPhotoHeading}</h2>
        <p className="mt-4 max-w-3xl leading-7 text-[var(--text-muted)]">{t.plainPhotoBody}</p>
        <Link
          href="/docs/widgets/share-a-style"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-color)] transition hover:translate-x-1">
          {t.howItWorks} <ArrowRight />
        </Link>
      </div>
    </ContentShell>
  )
}
