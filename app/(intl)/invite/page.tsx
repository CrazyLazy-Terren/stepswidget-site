import type { Metadata } from 'next'
import { AppStoreButton } from '../../app-store-button'
import { ContentShell } from '../../content-shell'
import { defaultOgImages } from '../../shared-metadata'
import { appDisplayName, appStoreBadgeAlt, chromeLang, getLocale, ogLocale } from '../locale'
import { InviteHero, OpenInStepsButton } from './invite-client'
import { fill, inviteMessages } from './messages'

/**
 * Where a shared Steps card link lands when the app isn't installed, or the
 * link was opened somewhere iOS doesn't hand to the app.
 *
 * The card itself, the sender's ID, name and key, is in the URL's fragment,
 * which the browser never sends to the site. The page only reads the name out
 * of it and hands the whole fragment to the app.
 *
 * The copy follows the visitor's device language (see `../locale.ts`).
 */

// Every card has its own link, and none of them should be indexed.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = inviteMessages[locale]
  return {
    title: `${t.title} - Steps Widget`,
    description: t.description,
    robots: { index: false, follow: true },
    referrer: 'no-referrer',
    openGraph: { title: t.title, description: t.description, locale: ogLocale[locale], images: defaultOgImages },
  }
}

// Separate campaign token so installs from shared cards show up on their own.
const cardShareAppStoreUrl = 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=card-share&mt=8'

export default async function InvitePage() {
  const locale = await getLocale()
  const t = inviteMessages[locale]
  const app = appDisplayName[locale]
  const lang = chromeLang(locale)

  const actions = [
    <AppStoreButton
      key="app-store"
      href={cardShareAppStoreUrl}
      className="mr-auto"
      label={t.appStoreLabel}
      lang={lang}
      alt={appStoreBadgeAlt[locale]}
    />,
    <OpenInStepsButton key="open" label={fill(t.openInApp, { app })} />,
  ]

  return (
    <ContentShell
      lang={lang}
      eyebrow={t.eyebrow}
      title={t.title}
      description={t.description}
      hero={<InviteHero eyebrow={t.eyebrow} title={t.title} titleWithName={t.titleWithName} description={t.description} />}>
      <ol className="grid gap-6 lg:grid-cols-3">
        {t.steps.map((step, index) => (
          <li
            key={index}
            className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-4 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-6 pt-6 pb-8 lg:grid-cols-1">
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-[var(--text-strong)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text-strong)] text-md font-semibold text-background">
                  {index + 1}
                </span>
                {step.heading}
              </h3>
              <p className="leading-7 text-[var(--text-muted)]">{fill(step.body, { app })}</p>
              {actions[index]}
            </div>
          </li>
        ))}
      </ol>
    </ContentShell>
  )
}
