import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowLink } from '../arrow'
import { AppStoreButton } from '../app-store-button'
import { DuoDemo } from '../duo-demo'
import { DuoMockup } from '../duo-mockup'
import { HeroPreview } from '../hero-preview'
import { IPhoneCarousel } from '../iphone-carousel'
import { IPhoneMockup } from '../iphone-mockup'
import { PageSection, pageGutter } from '../page-shell'
import { SectionHeading } from '../section-heading'
import { SiteLogo, SiteNav } from '../site-nav'
import { siteUrl } from '../shared-metadata'
import { JsonLd, applicationSchema, faqSchema, organizationSchema, websiteSchema } from '../structured-data'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
    languages: { en: '/', es: '/es', 'x-default': '/' },
  },
}

const glanceCards = [
  {
    title: 'Styled to fit the way you use your phone',
    eyebrow: 'Widget styles',
    description: 'Your steps can look at home on your Home Screen. Pick a look that belongs there — light, dark, tinted, and a colour of your own.',
    image: '/assets/f01.webp',
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
    image: '/assets/f02.webp',
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
    image: '/assets/f03.webp',
    href: '/docs/goal-reminders/how-goal-reminders-work',
    linkLabel: 'How the projection works',
  },
  {
    title: 'Your day, your way',
    eyebrow: 'Reminder settings',
    description:
      'Set the day to match your routine. Move the day boundary up to six hours past midnight, or use a rolling 24-hour window for shift work. Local Sunset makes it easier to get a nudge as the light fades. Insight shows a month of real days under a draggable goal line, so the target comes from your own activity.',
    image: '/assets/f04.webp',
    href: '/docs/goal-reminders/reminder-timing-and-devices',
    linkLabel: 'Timing and settings',
  },
]

const shareCards = [
  {
    title: 'Share a style, not just a screenshot',
    eyebrow: 'Style sharing',
    description:
      'Send a photo with its style recipe attached. Anyone with Steps can open it, or scan the code, to recreate the widget with the same framing, tone and colour.',
    image: '/assets/share-style.webp',
    imageAlt: 'Share Style screen: a photo with its style recipe and a QR code to recreate the widget',
    href: '/docs/widgets/share-a-style',
    linkLabel: 'How sharing works',
  },
  {
    title: 'Walk with a friend, side by side',
    eyebrow: 'New · Walk with me',
    description:
      'Swap cards with someone you know and see each other’s day, hour by hour, right on your Home Screen. It only starts when you both say yes, and everything is sealed on your iPhone so only their phone can read it.',
    image: '/assets/walk-with-me/intro.webp',
    imageAlt: 'Walking with Me on iPhone: a Side by Side widget comparing two people’s days, hour by hour, above the private-by-design explainer',
    href: '/blog/walk-with-a-friend-share-steps',
    linkLabel: 'Walking together',
  },
] satisfies PhoneFeature[]

type StreakDay = 'hit' | 'earned' | 'skipped'

/**
 * A worked two-week example of the Walking Plan rules (docs/getting-started/
 * walking-plan): the plan starts with 2 skip days, a missed day uses one and
 * resets the streak, and every 3-day streak of hits earns one back (max 3).
 * Two misses here, and it ends holding 2 skip days, 2 days into a streak.
 */
const sampleStreak: readonly StreakDay[] = ['hit', 'hit', 'skipped', 'hit', 'hit', 'earned', 'hit', 'hit', 'skipped', 'hit', 'hit', 'earned', 'hit', 'hit']
const streakWeekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
/** Hits in a row that earn back one skip day. */
const daysPerSkipDay = 3
const maxSkipDays = 3
const sampleSkipDaysHeld = 2
/** Hits since the streak last reset or earned a skip day. */
const sampleStreakDays = 2

const streakDayLabel: Record<StreakDay, string> = {
  hit: 'goal hit',
  earned: 'goal hit, skip day earned',
  skipped: 'missed, a skip day was used',
}

/**
 * The worked example from the Walking Plan doc: 5,000 steps a day, aged 40,
 * "Live a longer, healthier life" sets an 8,000 target. Stages are ~10% of
 * current steps (500–1,000), so five stages, then the target itself.
 */
const goalStages = [5500, 6000, 6500, 7000, 7500, 8000]
const goalStageCurrent = 2
/** Hit days on a stage's goal that move you up. */
const hitDaysPerStage = 5

const streakRules: readonly { title: string; description: string; icon?: 'spent' | 'earn' | 'stepBack' }[] = [
  {
    title: 'Start with two skip days',
    description: 'Every plan begins with 2 skip days, ready for a long flight, or a rainy weekend.',
  },
  {
    title: 'A missed day uses one',
    icon: 'spent',
    description: 'It is used automatically. Your stage count is kept, so you lose no progress, but your streak starts over.',
  },
  {
    title: 'A 3-day streak earns one back',
    icon: 'earn',
    description: 'Hit your goal three days running and the streak bar fills, giving you a skip day back, up to a maximum of 3.',
  },
  {
    title: 'Run out, step back one stage',
    icon: 'stepBack',
    description:
      'Miss with no skip days left and you drop one stage and restart its count. Skip days refill to 2, so one bad week can’t slide you all the way down.',
  },
]

/** A heraldic shield outline, the mark for a skip day. `spent` slashes it through, for a skip day used to cover a miss. */
function ShieldIcon({ className, filled = false, spent = false }: { className?: string; filled?: boolean; spent?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75">
      <path d="M12 2.75l7.25 2.9v5.6c0 4.5-3.05 8.4-7.25 9.9-4.2-1.5-7.25-5.4-7.25-9.9v-5.6L12 2.75z" strokeLinejoin="round" />
      {spent ? <path d="M3.5 20.5L20.5 3.5" strokeLinecap="round" strokeWidth="2" /> : null}
    </svg>
  )
}

/** The mark beside each rule: a skip day, one used, one earned back, or a turn back one stage. */
function RuleIcon({ icon, className }: { icon?: 'spent' | 'earn' | 'stepBack'; className?: string }) {
  if (icon === 'spent') return <ShieldIcon className={className} spent />
  if (icon === 'earn') {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2.75l7.25 2.9v5.6c0 4.5-3.05 8.4-7.25 9.9-4.2-1.5-7.25-5.4-7.25-9.9v-5.6L12 2.75z" strokeLinejoin="round" />
        <path d="M12 8.5v7M8.5 12h7" strokeLinecap="round" strokeWidth="2" />
      </svg>
    )
  }
  if (icon === 'stepBack') {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round">
        <path d="M9 14L4 9l5-5" />
        <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
      </svg>
    )
  }
  return <ShieldIcon className={className} filled />
}

/** Three segments that fill one per hit day; the shield at the end is the skip day a full bar earns back. */
function StreakBar({ filled, className = '' }: { filled: number; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <div
        className="grid flex-1 grid-cols-3 gap-1.5"
        role="progressbar"
        aria-label="Hit days toward the next skip day"
        aria-valuemin={0}
        aria-valuemax={daysPerSkipDay}
        aria-valuenow={filled}>
        {Array.from({ length: daysPerSkipDay }, (_, index) => (
          <span key={index} className={`h-2.5 rounded-full ${index < filled ? 'bg-[var(--accent-color)]' : 'bg-[var(--border)]'}`} />
        ))}
      </div>
    </div>
  )
}

const trustFacts = [
  { label: 'Step data', value: 'Read from Apple Health on device' },
  { label: 'The model', value: 'Trains and runs on your device' },
  { label: 'Account', value: 'None — there is nothing to sign in to' },
  { label: 'Nudges', value: 'Free, including every setting' },
]

const storyParagraphs = [
  'Steps Widget started with a simple idea: if you want to move more, make it easier to see how much you’ve already moved. That’s where the glance came from.',
  'Steps Widget are meant to make your progress visible, but too often, they feel like a compromise for your Home Screen. I wanted to build one you’d actually want to keep there — something that feels like it belongs on your phone. When your steps are always in sight, you don’t have to remember to check.',
  'Then came the nudge. Most reminders run on a schedule: every hour, every day, the same notification whether you need it or not. Eventually, you tune them out.',
  'Nudge takes a different approach. It runs quietly on your device, paying attention to how your day unfolds. When you’re likely to fall short of your goal, it gives you a gentle reminder at a time when it might actually help.',
  'Steps Widget is built solo, guided by one question: what genuinely helps people move more? Not what a fitness app is expected to include, but what makes a difference in everyday life.',
]

type Review = {
  /** The review's own title, as left on the App Store. */
  title: string
  body: string
  author: string
  /** Storefront the review was written in, as shown in App Store Connect. */
  location: string
  date: string
  /** Stars the reviewer left, out of five. */
  rating: number
  /** The developer's public reply, where one was given. */
  reply?: string
}

/**
 * Real App Store reviews, quoted verbatim.
 *
 * Same rule as the omitted `aggregateRating` in structured-data.tsx: nothing
 * here is written, tidied, or paraphrased on the app's behalf. Only add an
 * entry that exists on the live App Store listing, and copy the wording
 * exactly — including the reviewer's own punctuation.
 */
const reviews: readonly Review[] = [
  {
    title: 'flawless',
    body: 'does what it says on the tin. helps me get off my arse !',
    author: 'scarlet27itsme',
    location: 'Australia',
    date: 'Aug 12, 2026',
    rating: 5,
  },
  {
    title: 'Simple Widgets syncs with Apple Health/Watch',
    body: 'Was looking for a way to read the step count in Apple Health without opening the Health app - this seems to fit exactly for it.',
    author: 'Jiandal',
    location: 'Australia',
    date: 'Jun 22, 2026',
    rating: 5,
    reply: 'I’m glad to hear that! I built one myself since I couldn’t find one that I liked.',
  },
  {
    title: 'Free and simple',
    body: 'Just wanted a simple widget that shows my count without all the faff that comes with other health apps. Does the job and has plenty of colour and format options in the free version. Thank you',
    author: 'Alioooo',
    location: 'United Kingdom',
    date: 'Apr 17, 2026',
    rating: 5,
    reply: 'Thank you! I built this because I couldn’t find one myself. I’m so happy it found its user.',
  },
]

const privacyCards = [
  {
    title: 'The model stays on your device',
    description:
      'Your activity pattern is learned on your iPhone or Apple Watch and retrained there. Nothing about your routine is uploaded, and no server is involved in deciding when to nudge you.',
  },
  {
    title: 'Three read-only Health types',
    description: 'Step count, stand hours, and your activity summary — read with your permission. The app never writes to Health and never asks for more.',
  },
  {
    title: 'No account, no public leaderboard',
    description:
      'There is no sign-in, no password, and no social feed. The only ranking is one you start in Messages, between the people already in that conversation. A database that was never assembled cannot leak.',
  },
  {
    title: 'iCloud carries settings only',
    description: 'Your goal, nudge preferences, and widget styles follow you through your own private iCloud. Your step history stays in Apple Health.',
  },
]

const watchCards = [
  {
    title: 'Nudges on your wrist',
    description: 'Goal nudges run right on your Apple Watch, so you still feel a tap on your wrist when your iPhone is in another room.',
    image: '/assets/w01.webp',
  },
  {
    title: 'Steps at a glance',
    description: 'Three complication styles for any watch face. The rectangular one marks the hours you stood alongside the chart.',
    image: '/assets/w02.webp',
  },
  {
    title: 'Your style, on your wrist',
    description: 'Match your watch face. Your style and settings stay in sync across your devices.',
    image: '/assets/w03.webp',
  },
]

const faqItems = [
  {
    question: 'What is Steps Widget, and what does it do?',
    answer:
      'Steps Widget is a daily movement companion for iPhone, Apple Watch and Mac. It displays your Apple Health step count on your Home Screen and Lock Screen, helps you track daily progress, and sends gentle reminders when you may need encouragement to reach your walking goal.',
    keywords: ['daily movement companion', 'iPhone step count widget', 'Apple Health', 'walking goal', 'activity reminders'],
  },
  {
    question: 'How is Steps Widget different from a regular step counter?',
    answer:
      'Steps Widget does more than display your daily step count. It helps you stay aware of your movement throughout the day, estimates whether you are on track to reach your goal, and sends timely nudges when you may be falling behind. It stays quiet when you are already on track instead of sending reminders on a fixed hourly timer.',
    keywords: ['step counter vs step widget', 'smart walking reminders', 'daily movement tracking', 'step goal prediction'],
  },
  {
    question: 'Can Steps Widget work with Fitbit, Garmin, or Oura?',
    answer:
      'Yes. Steps Widget reads step data from Apple Health, so it can work with Fitbit, Garmin, Oura and other fitness trackers that sync their steps to Apple Health. You do not need an Apple Watch.',
    keywords: ['Fitbit', 'Garmin', 'Oura', 'Apple Health sync', 'fitness tracker compatibility', 'no Apple Watch needed'],
  },
  {
    question: 'Can Steps Widget help me reach my daily walking goal?',
    answer:
      'Yes. Set a daily step goal, follow your progress throughout the day, and get gentle reminders when you may need help staying on track. The Walking Plan also helps you build toward your goal over time, one manageable stage at a time.',
    keywords: ['daily walking goal', 'step goal tracker', 'walking plan', 'walking reminders', 'daily step goal'],
  },
  {
    question: 'Can I customize walking reminders and their timing?',
    answer:
      'Yes. You can rewrite reminders in Settings › Edit Messages, keep several messages in rotation, and adjust how easily or late a reminder is triggered. You can also use Apple Intelligence to restyle messages in a voice you describe. Over time, you can see which messages tend to get you moving.',
    keywords: ['custom walking reminders', 'personalized notifications', 'reminder timing', 'Apple Intelligence'],
  },
  {
    question: 'Does Steps Widget upload my health or activity data?',
    answer:
      'No. Your activity data and on-device reminder processing stay on your device. You do not need an account or sign-in. Optional syncing between your devices uses your own iCloud account.',
    keywords: ['private step tracking', 'on-device processing', 'no account', 'no sign-in', 'iCloud sync'],
  },
  {
    question: 'What Apple Health data does Steps Widget access?',
    answer:
      'Steps Widget reads your step count, stand hours and activity summaries from Apple Health. Access is read-only: the app never writes or changes your Health data. Location is only used for the optional Local Sunset feature.',
    keywords: ['Apple Health permissions', 'step count', 'stand hours', 'read-only Health access', 'Local Sunset'],
  },
  {
    question: 'Is Steps Widget free to use?',
    answer:
      'Yes. The core step-count widgets and daily movement reminders are free, with no ads. An optional subscription unlocks additional widget styles and customization. Styles you have already applied continue working even if your subscription expires.',
    keywords: ['free iPhone step widget', 'no ads', 'free walking reminders', 'optional subscription', 'widget styles'],
  },
  {
    question: 'Can I share my daily steps with friends or family?',
    answer:
      'Yes. You can share your daily step count through Apple Messages and see how your steps compare in a daily ranking. No account is required, and your activity data is not uploaded to a central server.',
    keywords: ['share steps with friends', 'family step count', 'daily step ranking', 'Apple Messages', 'no account'],
  },
  {
    question: 'How can I show my step count on my iPhone Lock Screen?',
    answer: 'Add a Steps Widget Lock Screen widget to see your daily step count at a glance, without unlocking your iPhone or opening the app.',
    keywords: ['iPhone Lock Screen step counter', 'step count Lock Screen widget', 'Apple Health widget'],
  },
  {
    question: 'Can I see my iPhone steps on my Mac?',
    answer:
      'Yes. You can add Steps Widget to your Mac desktop using Apple Continuity on macOS Sonoma or later. Your iPhone widget can appear on your Mac without installing a separate Mac app.',
    keywords: ['show iPhone steps on Mac', 'Mac desktop widget', 'macOS Sonoma', 'Apple Continuity'],
  },
  {
    question: 'Does Steps Widget work with Apple Watch?',
    answer:
      'Yes. Steps Widget supports Apple Watch with step-count displays and its own activity reminders. Your subscription also syncs between your iPhone and Apple Watch.',
    keywords: ['Apple Watch step count widget', 'Apple Watch activity reminders', 'Apple Watch steps'],
  },
  {
    question: 'Why is my iPhone step-count widget not updating?',
    answer:
      'iOS controls how often widgets refresh to help save battery. Apple Health step data may also take time to sync, sometimes around an hour. You can enable Motion Sensor to get a fresher step count between Health updates.',
    keywords: ['iPhone step widget not updating', 'Apple Health sync delay', 'widget refresh', 'Motion Sensor'],
  },
]

function emphasize(text: string, keywords: readonly string[]) {
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return text.split(new RegExp(`(${escaped.join('|')})`)).map((part, i) =>
    keywords.includes(part) ? (
      <strong key={i} className="font-bold text-[var(--text-strong)]">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

type PhoneFeature = {
  title: string
  eyebrow: string
  description: string
  /** A full-screen iPhone screenshot: 1320×2868, or 1398×2034 for `duo`. */
  image: string
  imageAlt: string
  /** The frame to show it in. Defaults to iPhone; `duo` is iPhone Duo folded. */
  device?: 'duo'
  href?: string
  linkLabel?: string
}

/** Features told by a screenshot: each phone sits on its half's left grid line, with its copy below on the same edge. */
function PhoneFeatures({ features }: { features: readonly PhoneFeature[] }) {
  return (
    <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-6">
      {features.map((feature) => (
        <article key={feature.title} className="flex flex-col">
          <div className="flex max-w-md flex-1 flex-col">
            {/* <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{feature.eyebrow}</p> */}
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h3>
            <p className="mt-2 leading-7 text-[var(--text-muted)]">{feature.description}</p>
            {feature.href ? (
              <ArrowLink href={feature.href} className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
                {feature.linkLabel}
              </ArrowLink>
            ) : null}
          </div>
          {feature.device === 'duo' ? (
            <DuoMockup pose="closed" src={feature.image} alt={feature.imageAlt} className="w-full max-w-80 mt-8" sizes="(max-width: 640px) 80vw, 320px" />
          ) : (
            <IPhoneMockup src={feature.image} alt={feature.imageAlt} className="w-full max-w-80 mt-8 " sizes="(max-width: 640px) 80vw, 320px" />
          )}
        </article>
      ))}
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
  href?: string
  linkLabel?: string
}

/**
 * The star row on a review card.
 *
 * The count comes from the review itself rather than being hard-coded, so a
 * future four-star review renders honestly without a code change. The visible
 * stars are decorative; the rating is announced once as text.
 */
function StarRating({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5 text-[var(--accent-color)]">
      <span className="sr-only">{`${rating} out of 5 stars`}</span>
      {Array.from({ length: 5 }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          className="size-4"
          aria-hidden="true"
          fill={index < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5">
          <path d="M12 2.6l2.9 5.88 6.49.95-4.7 4.57 1.11 6.47L12 17.42l-5.8 3.05 1.11-6.47-4.7-4.57 6.49-.95L12 2.6z" strokeLinejoin="round" />
        </svg>
      ))}
    </p>
  )
}

/** The card used by both the glance and the nudge sections. */
const reminderScreens = [
  {
    src: '/assets/reminder-messages.webp',
    alt: 'Reminder Messages screen listing Falling behind messages and a Goal reached message',
    caption: 'Write a few and they take turns. {stepsLeft} and {hours} fill in when one is sent.',
  },
  {
    src: '/assets/reminder-timing.webp',
    alt: 'Reminder timing slider set to 765 steps, between Sooner and Later',
    caption: 'Slide toward Sooner or Later to set how far behind the day has to fall first.',
  },
  {
    src: '/assets/reminder-lock-screen.webp',
    alt: "Lock Screen with a Let's walk reminder: You've closed bigger gaps than 2,128 steps, and 10h is plenty of room",
    caption: 'On the day, the reminder arrives in your words, with your numbers filled in.',
  },
] as const

function FeatureCards({ cards }: { cards: readonly FeatureCard[] }) {
  return (
    <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${cards.length === 3 ? 'lg:grid-cols-3' : ''}`}>
      {cards.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col rounded-xl overflow-hidden border border-[color:var(--border)] bg-[var(--surface-1)]  transition duration-300 hover:border-[color:var(--border-strong)]">
          <div className="relative aspect-[16/9]">
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
            {feature.href ? (
              <ArrowLink href={feature.href} className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
                {feature.linkLabel}
              </ArrowLink>
            ) : null}
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

      <PageSection paddingY="top">
        <HeroPreview
          intro={
            <div className="flex flex-col items-start">
              <p className="mt-12 text-md font-bold uppercase tracking-[0.14em] text-[var(--accent-color)]">Styled steps. Smart nudges.</p>
              <h1 className="mt-2 text-balance text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-7xl">The Glance. The Nudge.</h1>
              <p className="mt-12 max-w-3xl text-pretty text-lg leading-8 text-[var(--text-muted)]">
                <strong>A glance that stays in sight. A nudge when it’s time to move.</strong> Steps live on the screen in a style that belongs there, while an
                on-device model speaks up only when a little extra motivation is needed.
              </p>

              <AppStoreButton className="mt-12" />
            </div>
          }
        />
      </PageSection>

      <PageSection paddingY="section">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustFacts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{fact.label}</dt>
              <dd className="mt-2 leading-7 text-[var(--text-strong)]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </PageSection>

      <PageSection id="features" paddingY="section">
        <SectionHeading eyebrow="The glance" title="Always in Sight.">
          Your steps are already there — right on your screen, styled to fit your and the wallpaper. Just a quick look at how much you have moved today.
        </SectionHeading>

        <FeatureCards cards={glanceCards} />
      </PageSection>

      <PageSection id="make-it-yours" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Photo styles" title="Make the widget yours.">
            Turn any photo into a style: the picture itself behind your step count, or its colours lifted onto the widget. Then set tone, blur and foreground
            until the numbers read clearly. Making a style is free; applying one is part of the Customization subscription, and a style already on a widget
            keeps working if it lapses.
          </SectionHeading>
          <ArrowLink href="/docs/widgets/photo-styles" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Styles from a photo
          </ArrowLink>
        </div>
        <IPhoneMockup
          src="/assets/style-editor-dark.webp"
          alt="Photo style editor: a mountain photo behind an 8,072-step widget, with Tone, Blur and Foreground controls"
          className="mx-auto w-full max-w-96 lg:col-span-6 lg:mt-12"
          sizes="(max-width: 720px) 80vw, 384px"
        />
      </PageSection>

      <PageSection id="nudge" paddingY="section">
        <SectionHeading eyebrow="The nudge" title="When It Counts.">
          An on-device model learns your patterns and steps in only when you’re heading for a miss, giving a timely nudge when it matters.
        </SectionHeading>
        <ArrowLink href="/tools/step-goal-calculator" className="mt-10 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
          Not sure what goal to set? Try the step goal calculator
        </ArrowLink>
        <FeatureCards cards={nudgeCards} />
      </PageSection>

      <PageSection id="walking-plan" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 ">
          <SectionHeading eyebrow="Walking plan" title="Protecting Your Progress.">
            <Image
              src="/assets/protecting-progress-mirror.webp"
              alt=""
              width={960}
              height={644}
              sizes="(max-width: 1024px) 100vw, 448px"
              className="fade-edges-uneven pointer-events-none h-auto w-full mb-4"
            />
            Every day is a chance to get a little closer to your goal. Your Walking Plan helps you find a pace that works for you, celebrate the progress you
            make, and keep going when life gets in the way.
          </SectionHeading>

          <dl className="mt-10 space-y-6">
            {streakRules.map((rule) => (
              <div key={rule.title} className="flex gap-4">
                <RuleIcon icon={rule.icon} className="mt-0.5 size-6 shrink-0 text-[var(--accent-color)]" />
                <div>
                  <dt className="font-semibold text-[var(--text-strong)]">{rule.title}</dt>
                  <dd className="mt-1 leading-7 text-[var(--text-muted)]">{rule.description}</dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-10 border-l-2 border-[color:var(--accent-color)] pl-4 text-sm leading-6 text-[var(--text-muted)]">
            Missing one day didn't undo the progress (
            <a
              href="https://doi.org/10.1002/ejsp.674"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-color)] underline underline-offset-2 transition hover:opacity-80">
              Lally et al., 2010
            </a>
            ). That's the idea behind skip days: habits grow by coming back, not by being perfect every day. Hold your target for 66 days and the plan marks the
            habit as formed.
          </p>

          <ArrowLink href="/tools/step-goal-calculator" className="mt-8 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Plan your daily goal with the step goal calculator
          </ArrowLink>
        </div>

        <div className="space-y-6 lg:col-span-5 lg:col-start-8">
          <figure className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Streak</p>
                <p className="mt-2 text-3xl font-semibold tracking-[-0.02em] tabular-nums text-[var(--text-strong)]">
                  {sampleStreakDays}
                  <span className="text-lg font-normal tracking-normal text-[var(--text-muted)]"> of {daysPerSkipDay} days</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Skip days</p>
                <p className="mt-3 flex justify-end gap-1 text-[var(--accent-color)]">
                  <span className="sr-only">{`${sampleSkipDaysHeld} of ${maxSkipDays} skip days`}</span>
                  {Array.from({ length: maxSkipDays }, (_, index) => (
                    <ShieldIcon key={index} className={`size-7 ${index < sampleSkipDaysHeld ? '' : 'opacity-30'}`} filled={index < sampleSkipDaysHeld} />
                  ))}
                </p>
              </div>
            </div>

            <StreakBar filled={sampleStreakDays} className="mt-6" />
            <p className="mt-3 text-sm text-[var(--text-muted)]">One more hit day earns a skip day back.</p>

            <div className="mt-8 border-t border-[color:var(--border)]" />

            <ol className="mt-8 grid grid-cols-7 gap-2 sm:gap-3" aria-label="The last two weeks">
              {sampleStreak.map((day, index) => {
                const isToday = index === sampleStreak.length - 1
                return (
                  <li key={index} className="flex flex-col items-center gap-2">
                    {index < 7 ? (
                      <span className="text-xs text-[var(--text-subtle)]" aria-hidden="true">
                        {streakWeekdays[index]}
                      </span>
                    ) : null}
                    <span
                      className={`relative flex aspect-square w-full items-center justify-center rounded-lg ${
                        day === 'skipped'
                          ? 'border-2 border-dashed border-[color:var(--accent-color)] text-[var(--accent-color)]'
                          : 'bg-[var(--accent-color)] text-white'
                      } ${isToday ? 'ring-2 ring-[color:var(--accent-color)] ring-offset-2 ring-offset-[var(--page-bg)]' : ''}`}>
                      <span className="sr-only">{`Day ${index + 1}: ${streakDayLabel[day]}${isToday ? ' (today)' : ''}`}</span>
                      {day === 'skipped' ? (
                        <ShieldIcon className="size-6" spent />
                      ) : (
                        <svg viewBox="0 0 16 16" className="size-6" fill="none" aria-hidden="true">
                          <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {day === 'earned' ? (
                        <span className="absolute -right-1.5 -top-1.5 z-10 rounded-full border border-[color:var(--accent-color)] bg-[var(--page-bg)] p-0.5 text-[var(--accent-color)]  sm:-right-2 sm:-top-2 sm:p-1">
                          <ShieldIcon className="size-3 sm:size-4" filled />
                        </span>
                      ) : null}
                    </span>
                  </li>
                )
              })}
            </ol>

            <figcaption className="mt-8 space-y-2 text-sm leading-6 text-[var(--text-muted)]">
              <p>
                <strong className="text-[var(--text-strong)]">Two misses, no progress lost.</strong> Each miss used a skip day and restarted the streak. The
                next 3-day streak earned it back.
              </p>
              <p className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-[var(--text-subtle)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-3 rounded-sm bg-[var(--accent-color)]" aria-hidden="true" />
                  Goal hit
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldIcon className="size-3.5 text-[var(--accent-color)]" filled />
                  Skip day earned
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldIcon className="size-3.5 text-[var(--accent-color)]" spent />
                  Missed, skip day used
                </span>
              </p>
            </figcaption>
          </figure>

          <figure className="rounded-2xl border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Goal stages</p>
              <p className="flex items-center gap-1.5" role="img" aria-label={`Stage ${goalStageCurrent + 1} of ${goalStages.length - 1}`}>
                {goalStages.slice(0, -1).map((goal, index) => (
                  <span
                    key={goal}
                    className={`rounded-full ${
                      index < goalStageCurrent ? 'size-3 bg-[var(--accent-color)] opacity-90' : 'size-3 bg-[var(--border-strong)] opacity-50'
                    }`}
                  />
                ))}
              </p>
            </div>
            <ol className="mt-12 flex gap-2 sm:gap-3" aria-label="Daily goal by stage">
              {goalStages.map((goal, index) => {
                const isCurrent = index === goalStageCurrent
                const isDone = index < goalStageCurrent
                return (
                  <li key={goal} className="flex flex-1 flex-col items-center gap-2">
                    {/* Fixed-height track, so each bar is exactly its goal over the top stage's goal. */}
                    <div className="flex h-40 w-full items-end" aria-hidden="true">
                      <div className="relative w-full" style={{ height: `${(goal / goalStages[goalStages.length - 1]) * 100}%` }}>
                        <div
                          className={`h-full w-full rounded-md ${
                            isCurrent ? 'bg-[var(--accent-color)]' : isDone ? 'bg-[var(--accent-color)] opacity-40' : 'bg-[var(--border-strong)] opacity-50'
                          }`}
                        />
                        <span
                          className={`absolute inset-x-0 -top-5 text-center text-xs tabular-nums ${
                            isCurrent ? 'font-bold text-[var(--accent-color)]' : 'text-[var(--text-subtle)]'
                          }`}>
                          {goal.toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs ${isCurrent ? 'font-bold text-[var(--text-strong)]' : 'text-[var(--text-subtle)]'}`}>
                      <span className="sr-only">{`${index === goalStages.length - 1 ? 'Target' : `Stage ${index + 1}`}: ${goal.toLocaleString('en-US')} steps a day${isCurrent ? ' (current)' : ''}`}</span>
                      <span aria-hidden="true">{index === goalStages.length - 1 ? 'Target' : `S${index + 1}`}</span>
                    </span>
                  </li>
                )
              })}
            </ol>
            <figcaption className="mt-6 flex flex-col text-sm leading-6 text-[var(--text-muted)]">
              <p>
                <strong className="text-[var(--text-strong)]">Hit a stage on {hitDaysPerStage} days, then move up.</strong> The days don’t have to be in a row,
                and a missed day doesn’t reset the count. Each stage is about 10% above your current steps, between 500 and 1,000, so walking 5,000 a day toward
                8,000 takes five stages and at least 25 days.
              </p>
              <ArrowLink href="/docs/getting-started/walking-plan" className="mt-4 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
                How Walking Plan works
              </ArrowLink>
            </figcaption>
          </figure>
        </div>
      </PageSection>
      {/* <PageSection id="reminder-messages" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Your Voice" title="Reminders That Fit Your Day.">
            Rewrite reminders in your own words and keep a few in rotation. Adjust how soon or how late they can arrive, and see which messages tend to get you
            moving. Keep the ones that work best for you.
          </SectionHeading>
          <ArrowLink href="/docs/goal-reminders/reminder-messages" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Writing your messages
          </ArrowLink>
        </div>
        <IPhoneCarousel screens={reminderScreens} className="mx-auto w-full max-w-96 lg:col-span-6" sizes="(max-width: 720px) 80vw, 288px" />
      </PageSection> */}
      <PageSection id="share" paddingY="section">
        <SectionHeading eyebrow="Sharing" title="Share Your Style. Compare Your Steps.">
          Send a widget look to a friend, or walk with one, side by side on your Home Screen.
        </SectionHeading>

        <PhoneFeatures features={shareCards} />
      </PageSection>

      <PageSection id="iphone-duo" paddingY="section">
        <SectionHeading eyebrow="iPhone Duo" title="Adopt for the Fold.">
          Steps Widget adapts seamlessly to the iPhone Duo's unique foldable display, ensuring your content is always presented optimally, whether folded,
          half-folded, or fully open.
        </SectionHeading>
        <ArrowLink href="/blog/iphone-duo-layout" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
          How I adapted Steps for iPhone Duo
        </ArrowLink>
        <DuoDemo className="mx-auto mt-12 w-full max-w-3xl" />
      </PageSection>
      <PageSection id="story" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <SectionHeading eyebrow="The story" title="Built Backwards." />
          <ArrowLink href="/about" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            About the developer
          </ArrowLink>
        </div>
        <div className="max-w-2xl space-y-6 text-lg leading-8 text-[var(--text-muted)] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-12">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PageSection>

      <PageSection id="watch" paddingY="section">
        <SectionHeading eyebrow="Apple Watch" title="Optional, but Better Together.">
          Your Apple Watch counts walks your iPhone misses, delivers gentle nudges right to your wrist, and provides the stand-hour data shown in your chart.
        </SectionHeading>

        <div className="relative mx-auto my-12 aspect-[9/7] overflow-hidden">
          <Image
            src="/assets/watch_feature.webp"
            alt="Steps Widget step counts on two Apple Watch faces alongside iPhone Lock Screen and Home Screen widgets"
            fill
            sizes="(max-width: 1280px) 88vw, 1272px"
            className="object-contain"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {watchCards.map((card) => (
            <div key={card.title} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] overflow-hidden">
              <div className="relative  aspect-[3/4]">
                <Image src={card.image} alt={`${card.title} preview`} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-center" />
              </div>
              <div className="p-6 ">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
                <p className="mt-4 leading-7 text-[var(--text-muted)]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-end">
          <ArrowLink href="/docs/widgets/apple-watch" className="font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Apple Watch documentation
          </ArrowLink>
        </div>
      </PageSection>

      <PageSection id="privacy" paddingY="section">
        <SectionHeading eyebrow="Private by Design" title="Everything Happens on Your Device.">
          The model that decides when to nudge you runs entirely on your device. No account, no sign-in, no social feed, and no server needed.
        </SectionHeading>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {privacyCards.map((card) => (
            <div key={card.title} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
              <h3 className="font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
              <p className="mt-4 leading-7 text-[var(--text-muted)]">{card.description}</p>
            </div>
          ))}
        </div>

        <ArrowLink href="/docs/steps-and-data/privacy-and-sync" className="mt-10 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
          How to verify each of these
        </ArrowLink>
      </PageSection>
      <PageSection id="reviews" paddingY="section">
        <SectionHeading eyebrow="From the App Store" title="What People Are Saying.">
          Reviews left on the App Store, quoted as written.
        </SectionHeading>

        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.author} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
              <StarRating rating={review.rating} />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{review.title}</h3>
              <blockquote className="mt-4 text-lg leading-8 text-[var(--text-muted)]">{review.body}</blockquote>

              {review.reply ? (
                <div className="mt-6 border-l-2 border-[color:var(--accent-color)] pl-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Developer reply</p>
                  <p className="mt-2 leading-7 text-[var(--text-muted)]">{review.reply}</p>
                </div>
              ) : null}

              <figcaption className="mt-6 text-sm text-[var(--text-subtle)]">
                {review.author} &middot; {review.location} &middot; {review.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </PageSection>
      <PageSection id="faq" paddingY="section" containerClassName="">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <SectionHeading eyebrow="FAQ" title="Questions, Answered." />
          <ArrowLink href="/docs" className="mt-6 font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Full documentation
          </ArrowLink>
        </div>
        <p className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-6 text-lg  leading-8 text-pretty text-[var(--text-main)]">
          {faqItems.map((item) => (
            <Fragment key={item.question}>
              <span className="font-bold text-[var(--text-subtle)]">{' # ' + item.question}</span> {emphasize(item.answer, item.keywords)}
            </Fragment>
          ))}
        </p>
      </PageSection>

      <PageSection paddingY="bottom" containerClassName="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-12 flex items-end justify-between flex-col lg:flex-row gap-6">
          <SectionHeading eyebrow="Free on the App Store" title="That’s it.">
            See your steps when you want them. Get a nudge when it’s time to move. Free to download, with no ads and nudges always included.
          </SectionHeading>
          <AppStoreButton />
        </div>
      </PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo textOnly={true} />
          <div className="-my-2 flex flex-wrap gap-x-6">
            <Link href="/docs" className="py-2 transition hover:text-[var(--text-strong)]">
              Docs
            </Link>
            <Link href="/blog" className="py-2 transition hover:text-[var(--text-strong)]">
              Blog
            </Link>
            <Link href="/tools/step-goal-calculator" className="py-2 transition hover:text-[var(--text-strong)]">
              Step goal calculator
            </Link>
            <Link href="/media" className="py-2 transition hover:text-[var(--text-strong)]">
              Media
            </Link>
            <Link href="/about" className="py-2 transition hover:text-[var(--text-strong)]">
              About
            </Link>
            <Link href="/terms" className="py-2 transition hover:text-[var(--text-strong)]">
              Terms
            </Link>
            <Link href="/privacy" className="py-2 transition hover:text-[var(--text-strong)]">
              Privacy
            </Link>
            <Link href="/es" hrefLang="es" lang="es" className="py-2 transition hover:text-[var(--text-strong)]">
              Español
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
