import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from '../arrow'
import { AppStoreButton } from '../app-store-button'
import { DuoDemo } from '../duo-demo'
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
    title: 'Today’s step ranking, in Messages',
    eyebrow: 'New · iMessage app',
    description:
      'Drop today’s count into a conversation. Friends who have Steps tap to add theirs, and the bubble becomes the day’s ranking. The board travels inside the message itself, with no account and no server.',
    image: '/assets/imessage-ranking.webp',
    imageAlt: "Messages conversation with Today's Step Ranking: five friends' step counts, ranked",
  },
] satisfies PhoneFeature[]

const notThis = ['No feeds.', 'No streaks.', 'No guilt.', 'No noise.']

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
    question: 'What is Steps Widget?',
    answer:
      'Steps Widget is a step counter and goal reminder app for iPhone. Your steps sit on your Home Screen in a style you choose, and a model on your device projects the step count you are heading for so it can nudge you when you are on track to miss your daily goal. It works on the Home Screen, Lock Screen, Apple Watch, Mac, and in Messages.',
  },
  {
    question: 'How is this different from an hourly stand reminder?',
    answer:
      'An hourly reminder fires on a timer no matter what you did, which is why most people mute it. Steps Widget projects your end-of-day total from your own step history and only nudges you when that projection falls short of your goal, so hours where you are already walking stay quiet.',
  },
  {
    question: 'Can I change how the nudges are worded?',
    answer:
      'Yes. Settings › Edit Messages lets you rewrite every reminder title and message in your own words, with placeholders that fill in your remaining steps and hours. You can also set how far behind or ahead the day has to look before a reminder is sent, and each message shows how many steps tended to follow it. On iOS 26 with Apple Intelligence you can describe a voice, such as a sports coach, and the on-device model restyles them all for you to review before saving.',
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
    question: 'Can I share my steps with friends?',
    answer:
      'Yes, in Messages. Open Steps from the app drawer in a conversation to send today’s count. Friends who have Steps tap the bubble to add theirs, and it becomes a ranking for the day. The ranking lives inside the message, so there is no account and nothing is uploaded. Messages reads the count the app has already saved, never Apple Health directly.',
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

type PhoneFeature = {
  title: string
  eyebrow: string
  description: string
  /** A full-screen iPhone screenshot. */
  image: string
  imageAlt: string
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
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{feature.eyebrow}</p>
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h3>
            <p className="mt-2 leading-7 text-[var(--text-muted)]">{feature.description}</p>
            {feature.href ? (
              <ArrowLink href={feature.href} className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
                {feature.linkLabel}
              </ArrowLink>
            ) : null}
          </div>
          <IPhoneMockup src={feature.image} alt={feature.imageAlt} className="w-full max-w-80 mt-8 " sizes="(max-width: 640px) 80vw, 320px" />
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
        <div className="lg:col-span-5">
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
          className="mx-auto w-full max-w-96 lg:col-span-7 lg:mt-12"
          sizes="(max-width: 720px) 80vw, 384px"
        />
      </PageSection>

      <PageSection id="nudge" paddingY="section">
        <SectionHeading eyebrow="The nudge" title="When It Counts.">
          An on-device model learns your patterns and steps in only when you’re heading for a miss, giving a timely nudge when it matters.
        </SectionHeading>

        <FeatureCards cards={nudgeCards} />

        <ul className="mt-12 grid overflow-hidden rounded-lg border border-(--border-strong) sm:grid-cols-4 -p-1">
          {notThis.map((line) => (
            <li
              key={line}
              className="bg-[var(--surface-1)] sm:border-x border-y border-[color:var(--border)] px-6 py-6 text-lg font-medium tracking-[-0.01em] text-[var(--text-strong)]">
              {line}
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="reminder-messages" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Your Voice" title="Reminders in Your Own Words.">
            Rewrite every reminder and keep a few in rotation. Each message shows how many steps tended to follow it, so you can keep the ones that actually get
            you moving.
          </SectionHeading>
          <ArrowLink href="/docs/goal-reminders/reminder-messages" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Writing your messages
          </ArrowLink>
        </div>
        <IPhoneCarousel screens={reminderScreens} className="mx-auto w-full max-w-96 lg:col-span-7 lg:mt-12" sizes="(max-width: 720px) 80vw, 288px" />
      </PageSection>

      <PageSection id="share" paddingY="section">
        <SectionHeading eyebrow="Sharing" title="Share Your Style. Compare Your Steps.">
          Send a widget look to a friend, or turn today&rsquo;s count into a ranking right inside a conversation.
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

        <div className="mt-10">
          <ArrowLink href="/docs/widgets/apple-watch" className="text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
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
      <PageSection id="faq" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <SectionHeading eyebrow="FAQ" title="Questions, Answered." />
          <ArrowLink href="/docs" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Full documentation
          </ArrowLink>
        </div>
        <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-6">
          {faqItems.map((item) => (
            <details key={item.question} className="disclosure group border-b border-[color:var(--border)] py-6">
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
