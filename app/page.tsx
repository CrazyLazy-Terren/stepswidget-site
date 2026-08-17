import type { Metadata } from 'next'
import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from './arrow'
import { AppStoreButton } from './app-store-button'
import { HeroPreview } from './hero-preview'
import { PageSection, pageGutter } from './page-shell'
import { SiteLogo, SiteNav } from './site-nav'
import { siteUrl } from './shared-metadata'
import { JsonLd, applicationSchema, faqSchema, organizationSchema, websiteSchema } from './structured-data'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const featureCards = [
  {
    title: 'It projects how your day will end',
    eyebrow: 'On-device model',
    description:
      'A model on your iPhone predicts the step count you are heading for. A reminder arrives only when that projection falls short of your goal, so a day you are already walking stays quiet.',
    image: '/assets/feature-nudges.png',
    href: '/docs/goal-reminders/how-goal-reminders-work',
    linkLabel: 'How the projection works',
  },
  {
    title: 'It sounds the way you ask it to',
    eyebrow: 'Apple Intelligence',
    description:
      'Describe the tone you want in plain language and each reminder is rewritten on device to match. Encouraging, short and direct, or something of your own.',
    image: '/assets/feature-styles.png',
    href: '/docs/goal-reminders/reminder-messages',
    linkLabel: 'Setting the tone',
  },
  {
    title: 'Progress stays one glance away',
    eyebrow: 'Home Screen, Lock Screen, Watch',
    description: 'Between reminders your step count sits on the screens you already look at, including your Mac desktop. No fitness app to open.',
    image: '/assets/feature-every-screen.png',
    href: '/docs/widgets/widget-gallery',
    linkLabel: 'Every widget',
  },
]

const trustFacts = [
  { label: 'Step data', value: 'Read from Apple Health on device' },
  { label: 'The model', value: 'Trains and runs on your iPhone' },
  { label: 'Account', value: 'None — there is nothing to sign in to' },
  { label: 'Reminders', value: 'Free, including every setting' },
]

const privacyCards = [
  {
    title: 'The model stays on your phone',
    description:
      'Your activity pattern is learned on your iPhone and retrained there. Nothing about your routine is uploaded, and no server is involved in deciding when to remind you.',
  },
  {
    title: 'Three read-only Health types',
    description: 'Step count, stand hours, and your activity summary — read with your permission. The app never writes to Health and never asks for more.',
  },
  {
    title: 'No account, no leaderboard',
    description: 'There is no sign-in, no password, and no social feed. A database that was never assembled cannot leak.',
  },
  {
    title: 'iCloud carries settings only',
    description: 'Your goal, reminder preferences, and widget styles follow you through your own private iCloud. Your step history stays in Apple Health.',
  },
]

const watchCards = [
  {
    title: 'Reminders on your wrist',
    description: 'Goal reminders run on Apple Watch itself, so a tap still reaches you when your iPhone is in another room.',
    image: '/assets/s01.png',
  },
  {
    title: 'Steps at a glance',
    description: 'Three complication styles for any watch face. The rectangular one marks the hours you stood alongside the chart.',
    image: '/assets/w02.png',
  },
  {
    title: 'Your style, on your wrist',
    description: 'Pick a look that matches your watch face from the wrist. Styles and purchases stay in sync with your iPhone.',
    image: '/assets/w03.png',
  },
]

const faqItems = [
  {
    question: 'What is Steps Widget?',
    answer:
      'Steps Widget is a step counter and goal reminder app for iPhone. A model on your device projects the step count you are heading for, and reminds you when you are on track to miss your daily goal. It also shows your Apple Health steps on the Home Screen, Lock Screen, Apple Watch, and Mac.',
  },
  {
    question: 'How is this different from an hourly stand reminder?',
    answer:
      'An hourly reminder fires on a timer no matter what you did. Steps Widget projects your end-of-day total from your own step history and only sends a reminder when that projection falls short of your goal, so hours where you are already walking stay quiet.',
  },
  {
    question: 'Can I change how the reminders are worded?',
    answer:
      'Yes. Describe the tone you want in plain language and Apple Intelligence rewrites each reminder on your device to match. A live preview in Settings shows the exact wording your current day would produce. This requires iOS 26 with Apple Intelligence; otherwise you get the standard wording.',
  },
  {
    question: 'Does the on-device model send my activity anywhere?',
    answer:
      'No. The model trains and runs on your iPhone, and your step data is not sent to our servers. There is no account to create and no sign-in. Optional iCloud sync keeps your settings consistent across your own devices, using your private iCloud account rather than ours.',
  },
  {
    question: 'What does the app read from Apple Health?',
    answer:
      'Three read-only types: your step count, your stand hours, and your daily activity summary. It never writes to Apple Health, and it does not request location for step counting. Location is used only if you turn on Local Sunset, which shifts evening reminders earlier.',
  },
  {
    question: 'Is Steps Widget free?',
    answer:
      'The app is free to download with no ads at any tier, and the entire reminder system is free, including the on-device model and every setting behind it. An optional Customization purchase adds extra widget styles and colours, available as a one-time purchase or a subscription.',
  },
  {
    question: 'Can I show my step count on the iPhone Lock Screen?',
    answer: 'Yes. Add a Steps Widget Lock Screen widget to keep your current step count visible without opening a fitness app.',
  },
  {
    question: 'Can I put the widget on my Mac?',
    answer:
      'Yes. On macOS Sonoma or later the Mac can show your iPhone widgets over Continuity, so your step count can sit on the desktop you are already working at. There is no separate Mac app to install.',
  },
  {
    question: 'Does Steps Widget support Apple Watch?',
    answer:
      'Yes. Steps Widget runs on Apple Watch with its own settings and goal reminders, so you are notified even when your iPhone is not nearby. You can change styles and buy the unlock from the wrist, and purchases sync with your iPhone automatically.',
  },
  {
    question: 'Why is my step widget not updating right away?',
    answer:
      'iOS manages widget refreshes to preserve battery life, so updates are not instant. Apple Health also shares step updates roughly once an hour. If it looks stuck, check Apple Health permission and open Steps Widget once. Turning on Motion Sensor reads the pedometer directly for a fresher count.',
  },
]

const lineBreakPattern = /<br\s*\/?>/i

/**
 * Renders a heading string, turning literal `<br/>` markers into real line
 * breaks so the copy can control where it wraps.
 *
 * The string is split and each piece is rendered as a text node — nothing
 * reaches `dangerouslySetInnerHTML`, so a heading can never become an HTML
 * injection point. Only `<br>` is understood; any other markup stays visible
 * as plain text, which makes a mistake obvious rather than silent.
 */
function withLineBreaks(text: string) {
  return text.split(lineBreakPattern).map((part, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {part}
    </Fragment>
  ))
}

function SectionHeading({ eyebrow, title, centered = false, children }: { eyebrow: string; title: string; centered?: boolean; children?: React.ReactNode }) {
  // `text-balance` redistributes lines on its own, which fights a break the
  // author placed deliberately. Drop it when the copy sets its own.
  const hasManualBreak = lineBreakPattern.test(title)

  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">{eyebrow}</p>
      <h2 className={`mt-12 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl ${hasManualBreak ? '' : 'text-balance'}`}>
        {withLineBreaks(title)}
      </h2>
      {children ? <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">{children}</p> : null}
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <JsonLd id="schema-home" data={[organizationSchema(), websiteSchema(), applicationSchema(), faqSchema(faqItems, `${siteUrl}/#faq`)]} />
      <SiteNav fixed />

      <PageSection paddingY="top" overlay={<div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-55 bg-[image:var(--hero-glow)]" />}>
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">Step counter and goal reminder</p>
          <h1 className="mt-12 text-balance text-center text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-7xl">
            The Nudge at a Glance.
          </h1>
          <p className="mt-6 max-w-3xl text-center text-pretty text-lg leading-8 text-[var(--text-muted)]">
            Stay active enough to be healthy, without starting a new fitness hobby. Since the phone already collects step data, this widget just places that
            number right on the home screen.
          </p>

          <AppStoreButton className="mt-12" />
        </div>

        <div className="mt-16 w-full">
          <HeroPreview />
        </div>
      </PageSection>

      <PageSection paddingY="top" containerClassName="border-t border-[color:var(--border)] pt-10">
        <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{fact.label}</dt>
              <dd className="mt-2 leading-7 text-[var(--text-strong)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="features" containerClassName="border-t border-[color:var(--border)] pt-14 pb-0!">
        <SectionHeading eyebrow="Why hourly timers fail" title="A reminder that knows what you already did." centered>
          An hourly alarm buzzes whether or not you moved, so it interrupts you when there is nothing to act on and you mute it within a week. Steps Widget
          decides from a forecast instead.
        </SectionHeading>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-1)] p-2 transition duration-300 hover:border-[color:var(--border-strong)]">
              <div className="relative aspect-[40/27] overflow-hidden rounded-[8px] bg-[var(--surface-media)]">
                <Image src={feature.image} alt={`${feature.title} preview`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{feature.eyebrow}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h3>
                <p className="mt-3 flex-1 leading-7 text-[var(--text-muted)]">{feature.description}</p>
                <ArrowLink href={feature.href} className="mt-5 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
                  {feature.linkLabel}
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="watch" containerClassName="border-[color:var(--border)] pt-14">
        <SectionHeading eyebrow="Apple Watch" title="Not required,<br/>but it is the better setup." centered>
          The Watch counts the walks your phone slept through, delivers reminders as a tap wherever the phone is, and is the only source of the stand hours the
          chart marks.
        </SectionHeading>

        <div className="relative mx-auto my-14 aspect-[1] max-w-2xl overflow-hidden">
          <Image
            src="/assets/watch_feature.png"
            alt="Steps Widget step counts on two Apple Watch faces alongside iPhone Lock Screen and Home Screen widgets"
            fill
            sizes="(max-width: 880px) 80vw, 672px"
            className="object-contain"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {watchCards.map((card) => (
            <div key={card.title} className="rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-1)] p-5">
              <div className="relative mb-6 aspect-[40/27] overflow-hidden rounded-[8px] bg-[var(--surface-media)]">
                <Image src={card.image} alt={`${card.title} preview`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <ArrowLink href="/docs/widgets/apple-watch" className="text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Apple Watch documentation
          </ArrowLink>
        </div>
      </PageSection>

      <PageSection id="privacy" containerClassName="border-t border-[color:var(--border)] pt-14">
        <SectionHeading eyebrow="Private by construction" title="Everything happens on your device.">
          The model that decides when to remind you runs on your iPhone, not on a server. There is no account, no social feed, and nothing to sign in to.
        </SectionHeading>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {privacyCards.map((card) => (
            <div key={card.title} className="rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
              <h3 className="font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">{card.description}</p>
            </div>
          ))}
        </div>

        <ArrowLink href="/docs/steps-and-data/privacy-and-sync" className="mt-10 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
          How to verify each of these
        </ArrowLink>
      </PageSection>

      <PageSection id="faq" containerClassName="grid gap-10 border-t border-[color:var(--border)] pt-14 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">FAQ</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-4xl">Questions, answered.</h2>
          <ArrowLink href="/docs" className="mt-5 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            Full documentation
          </ArrowLink>
        </div>
        <div className="border-[color:var(--border)]">
          {faqItems.map((item) => (
            <details key={item.question} className="group border-b border-[color:var(--border)] py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                <span className="font-medium text-[var(--text-strong)]">{item.question}</span>
                <span className="mt-0.5 shrink-0 text-[var(--text-subtle)] transition group-open:rotate-45">
                  <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 max-w-2xl leading-7 text-[var(--text-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </PageSection>

      <PageSection paddingY="bottom" containerClassName=" border-[color:var(--border)] pt-14">
        <div className="rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-2)] p-8 text-center sm:p-12">
          <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="mx-auto rounded-[18px]" />
          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">
            Sit less. Move more.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Free to download, no ads at any tier, and the reminders cost nothing.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreButton />
          </div>
        </div>
      </PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo textOnly={true} />
          <div className="flex gap-5">
            <Link href="/docs" className="transition hover:text-[var(--text-strong)]">
              Docs
            </Link>
            <Link href="/blog" className="transition hover:text-[var(--text-strong)]">
              Blog
            </Link>
            <Link href="/about" className="transition hover:text-[var(--text-strong)]">
              About
            </Link>
            <Link href="/terms" className="transition hover:text-[var(--text-strong)]">
              Terms
            </Link>
            <Link href="/privacy" className="transition hover:text-[var(--text-strong)]">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
