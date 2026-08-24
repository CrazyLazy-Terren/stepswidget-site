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

const glanceCards = [
  {
    title: 'Styled to fit the way you use your phone',
    eyebrow: 'Widget styles',
    description: 'Your steps can look at home on your Home Screen. Pick a look that belongs there — light, dark, tinted, and a colour of your own.',
    image: '/assets/f01.png',
    // A tall Home Screen capture: anchor the crop to the top so the widgets
    // stay in frame instead of a centre band of wallpaper.
    imageClassName: 'object-top',
    href: '/docs/widgets/widget-gallery',
    linkLabel: 'Every widget style',
  },
  {
    title: 'On every screen you already look at',
    eyebrow: 'Home Screen, Lock Screen, Watch, Mac',
    description: 'Home Screen, Lock Screen, StandBy, Apple Watch, and your Mac. Your steps, always one glance away.',
    image: '/assets/f02.png',
    href: '/docs/widgets/widget-gallery',
    linkLabel: 'Where it can live',
  },
]

const nudgeCards = [
  {
    title: 'It knows how your day is going to end',
    eyebrow: 'On-device model',
    description:
      'A model on your iPhone projects the step count you are heading for. A nudge arrives only when that projection falls short of your goal, so a day you are already walking stays quiet.',
    image: '/assets/f03.png',
    href: '/docs/goal-reminders/how-goal-reminders-work',
    linkLabel: 'How the projection works',
  },
  {
    title: 'Your day, your way',
    eyebrow: 'Reminder settings',
    description:
      'Set the day to match your routine. Move the day boundary up to six hours past midnight, or use a rolling 24-hour window for shift work. Local Sunset makes it easier to get a nudge as the light fades. Insight shows a month of real days under a draggable goal line, so the target comes from your own activity.',
    image: '/assets/f04.png',
    href: '/docs/goal-reminders/reminder-timing-and-devices',
    linkLabel: 'Timing and settings',
  },
]

const notThis = ['No feeds.', 'No streaks.', 'No guilt.', 'No noise.']

const trustFacts = [
  { label: 'Step data', value: 'Read from Apple Health on device' },
  { label: 'The model', value: 'Trains and runs on your device' },
  { label: 'Account', value: 'None — there is nothing to sign in to' },
  { label: 'Nudges', value: 'Free, including every setting' },
]

const storyParagraphs = [
  'Steps started with a simple idea: if you want to move more, make it easier to stay aware of how much you have already moved. That is where the glance came from.',
  'Step widgets are supposed to make your progress visible, but many feel like something you have to compromise your Home Screen for. I wanted to make one people would actually want to keep there — something that looks like it belongs on their phone. Because when your steps are always in sight, you do not have to remember to check.',
  'Then came the nudge. Most reminders work on a schedule: every hour, every day, the same notification whether you need it or not. Eventually, you mute them.',
  'Nudge takes a different approach. It runs quietly on your device and looks at your actual day. When you are on track to fall short of your goal, it speaks up when you actually might need it.',
  'Steps is built solo, backwards from what seems to actually help people move more — not from what a fitness app is supposed to include.',
]

const privacyCards = [
  {
    title: 'The model stays on your device',
    description:
      'Your activity pattern is learned on your iPhone and retrained there. Nothing about your routine is uploaded, and no server is involved in deciding when to nudge you.',
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
    description: 'Your goal, nudge preferences, and widget styles follow you through your own private iCloud. Your step history stays in Apple Health.',
  },
]

const watchCards = [
  {
    title: 'Nudges on your wrist',
    description: 'Goal nudges run on Apple Watch itself, so a tap still reaches you when your iPhone is in another room.',
    image: '/assets/s01.png',
  },
  {
    title: 'Steps at a glance',
    description: 'Three complication styles for any watch face. The rectangular one marks the hours you stood alongside the chart.',
    image: '/assets/w02.png',
  },
  {
    title: 'Your style, on your wrist',
    description: 'Pick a look that matches your watch face from the wrist. Styles and your subscription stay in sync with your iPhone.',
    image: '/assets/w03.png',
  },
]

const faqItems = [
  {
    question: 'What is Steps Widget?',
    answer:
      'Steps Widget is a step counter and goal reminder app for iPhone. Your steps sit on your Home Screen in a style you choose, and a model on your device projects the step count you are heading for so it can nudge you when you are on track to miss your daily goal. It works on the Home Screen, Lock Screen, Apple Watch, and Mac.',
  },
  {
    question: 'How is this different from an hourly stand reminder?',
    answer:
      'An hourly reminder fires on a timer no matter what you did, which is why most people mute it. Steps Widget projects your end-of-day total from your own step history and only nudges you when that projection falls short of your goal, so hours where you are already walking stay quiet.',
  },
  {
    question: 'Can I change how the nudges are worded?',
    answer:
      'Yes. Describe the tone you want in plain language and Apple Intelligence rewrites each nudge on your device to match. A live preview in Settings shows the exact wording your current day would produce. This requires iOS 26 with Apple Intelligence; otherwise you get the standard wording.',
  },
  {
    question: 'Does the on-device model send my activity anywhere?',
    answer:
      'No. The model trains and runs on your iPhone, and your step data is not sent to our servers. There is no account to create and no sign-in. Optional iCloud sync keeps your settings consistent across your own devices, using your private iCloud account rather than ours.',
  },
  {
    question: 'What does the app read from Apple Health?',
    answer:
      'Three read-only types: your step count, your stand hours, and your daily activity summary. It never writes to Apple Health, and it does not request location for step counting. Location is used only if you turn on Local Sunset, which shifts evening nudges earlier.',
  },
  {
    question: 'Is Steps Widget free?',
    answer:
      'The app is free to download with no ads at any tier, and the entire nudge system is free, including the on-device model and every setting behind it. An optional Customization subscription lets you apply extra widget styles and colours. An active subscription is only needed to change to a different style — one you have already applied keeps working if it lapses.',
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
      'Yes. Steps Widget runs on Apple Watch with its own settings and goal nudges, so you are notified even when your iPhone is not nearby. You can change styles and subscribe from the wrist, and the subscription syncs with your iPhone automatically.',
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

type FeatureCard = {
  title: string
  eyebrow: string
  description: string
  image: string
  /** Extra classes on the `<Image>`, for cards whose art needs a different crop. */
  imageClassName?: string
  href: string
  linkLabel: string
}

/** The card used by both the glance and the nudge sections. */
function FeatureCards({ cards }: { cards: readonly FeatureCard[] }) {
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2">
      {cards.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col rounded-2xl overflow-hidden border border-[color:var(--border)] bg-[var(--surface-1)]  transition duration-300 hover:border-[color:var(--border-strong)]">
          <div className="relative aspect-[16/9]   bg-[var(--surface-media)]">
            <Image
              src={feature.image}
              alt={`${feature.title} preview`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className={`object-cover ${feature.imageClassName ?? ''}`.trim()}
            />
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{feature.eyebrow}</p>
            <h3 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h3>
            <p className="mt-2 flex-1 leading-7 text-[var(--text-muted)]">{feature.description}</p>
            <ArrowLink href={feature.href} className="mt-5 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
              {feature.linkLabel}
            </ArrowLink>
          </div>
        </article>
      ))}
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
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">Styled steps. Smart nudges.</p>
          <h1 className="mt-12 text-balance text-center text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-7xl">
            The Glance. The Nudge.
          </h1>
          <p className="mt-6 max-w-3xl text-center text-pretty text-lg leading-8 text-[var(--text-muted)]">
            <strong>A glance that stays in sight. A nudge when it’s time to move.</strong> Steps live on the screen in a style that belongs there, while an
            on-device model speaks up only when a little extra motivation is needed.
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
        <SectionHeading eyebrow="The glance" title="A glance when you need to know." centered>
          Your steps are already there — right on your screen, styled to fit your and the wallpaper. Just a quick look at how much you have moved today.
        </SectionHeading>

        <FeatureCards cards={glanceCards} />
      </PageSection>

      <PageSection id="nudge" containerClassName="pt-14 pb-0!">
        <SectionHeading eyebrow="The nudge" title="A little nudge, when it counts." centered>
          An on-device model learns your patterns and steps in only when you’re heading for a miss, giving a timely nudge when it matters.
        </SectionHeading>

        <FeatureCards cards={nudgeCards} />

        <ul className="mt-14 grid  overflow-hidden rounded-[12px] border border-(--border-strong) sm:grid-cols-4 -p-1">
          {notThis.map((line) => (
            <li
              key={line}
              className="bg-[var(--surface-1)] sm:border-x border-y border-[color:var(--border)] px-5 py-6 text-center text-lg font-medium tracking-[-0.01em] text-[var(--text-strong)]">
              {line}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="story" containerClassName="grid gap-10 pt-14 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">The story</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-4xl">Built backwards.</h2>
          <ArrowLink href="/about" className="mt-5 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
            About the developer
          </ArrowLink>
        </div>
        <div className="max-w-2xl space-y-5 text-lg leading-8 text-[var(--text-muted)]">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PageSection>

      <PageSection id="watch" containerClassName="border-[color:var(--border)] pt-14">
        <SectionHeading eyebrow="Apple Watch" title="Not required,<br/>but it is the better setup." centered>
          The Watch counts the walks your phone slept through, delivers nudges as a tap wherever the phone is, and is the only source of the stand hours the
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
            <div key={card.title} className="rounded-[12px] border border-[color:var(--border)] bg-[var(--surface-1)] overflow-hidden">
              <div className="relative  aspect-[40/27]  bg-[var(--surface-media)]">
                <Image src={card.image} alt={`${card.title} preview`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="p-6 ">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-muted)]">{card.description}</p>
              </div>
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
          The model that decides when to nudge you runs on your iPhone, not on a server. There is no account, no social feed, and nothing to sign in to.
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
        <div className="rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-1)] p-8 text-center sm:p-12">
          <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="mx-auto rounded-[18px]" />
          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">
            The glance. The nudge. That&rsquo;s it.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Your steps when you want to see them, and a nudge when you need to move. Free to download, no ads at any tier, and the nudges cost nothing.
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
