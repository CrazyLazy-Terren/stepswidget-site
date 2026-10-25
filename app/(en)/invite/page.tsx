import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { AppStoreButton } from '../../app-store-button'
import { ContentShell } from '../../content-shell'
import { InviteHero, OpenInStepsButton } from './invite-client'

/**
 * Where a shared Steps card link lands when the app isn't installed, or the
 * link was opened somewhere iOS doesn't hand to the app.
 *
 * The card itself, the sender's ID, name and key, is in the URL's fragment,
 * which the browser never sends to the site. The page only reads the name out
 * of it and hands the whole fragment to the app.
 */

const title = 'Someone wants to walk with you'
const description =
  'Someone shared their name card with you! Open it in the app to connect and see each other’s steps side by side, right on your Home Screens.'

// Every card has its own link, and none of them should be indexed.
export const metadata: Metadata = {
  title: `${title} - Steps Widget`,
  description,
  robots: { index: false, follow: true },
  referrer: 'no-referrer',
}

// Separate campaign token so installs from shared cards show up on their own.
const cardShareAppStoreUrl = 'https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=card-share&mt=8'

const steps: { heading: string; body: string; action?: ReactNode }[] = [
  {
    heading: 'Get the app',
    body: 'Install Steps Widget on your iPhone. It reads your step count from Apple Health.',
    action: <AppStoreButton href={cardShareAppStoreUrl} className="mr-auto" label="Download Steps Widget on the App Store" />,
  },
  {
    heading: 'Open the card',
    body: 'Come back to this page and tap Open in Steps, or tap the link you were sent again.',
    action: <OpenInStepsButton />,
  },
  { heading: 'Walk together', body: 'Their card is added and yours goes to them. Once they accept, you see each other’s steps.' },
]

export default function InvitePage() {
  return (
    <ContentShell eyebrow="Shared card" title={title} description={description} hero={<InviteHero title={title} description={description} />}>
      <ol className="grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.heading}
            className="grid grid-cols-[auto_minmax(0,1fr)] content-start gap-4 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] px-6 pt-6 pb-8 lg:grid-cols-1">
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-[var(--text-strong)]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--text-strong)] text-md font-semibold text-background">
                  {index + 1}
                </span>
                {step.heading}
              </h3>
              <p className="leading-7 text-[var(--text-muted)]">{step.body}</p>
              {step.action}
            </div>
          </li>
        ))}
      </ol>
    </ContentShell>
  )
}
