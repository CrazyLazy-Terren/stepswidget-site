import Image from 'next/image'
import Link from 'next/link'
import { HeroPreview } from './hero-preview'
import { SiteLogo, SiteNav, appStoreUrl } from './site-nav'

const featureCards = [
  {
    title: 'Every screen',
    eyebrow: 'Home, Lock Screen, Watch',
    description: 'Keep your steps close at hand on iPhone and Apple Watch without opening a fitness app.',
    image: '/assets/feature-every-screen.png',
    accent: 'var(--accent-pink)',
  },
  {
    title: 'Your style',
    eyebrow: 'Simple, detailed, charted',
    description: 'Choose widgets that match the way you like to check progress, from minimal numbers to richer charts.',
    image: '/assets/feature-styles.png',
    accent: 'var(--accent-green)',
  },
  {
    title: 'Smart nudges',
    eyebrow: 'On-device reminders',
    description: 'Helpful notifications can react to your day and encourage movement without turning progress into pressure.',
    image: '/assets/feature-nudges.png',
    accent: 'var(--accent-sky)',
  },
]

const privacyCards = [
  {
    title: 'On-device model',
    description: 'Smart nudges can be triggered from your daily pattern.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M10 18h4M10 6h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Apple Health',
    description: 'The step source stays the system you already trust.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 20s-7-4.35-9.1-8.6C1.35 8.25 3.25 5 6.55 5c1.9 0 3.2 1.05 3.95 2.05C11.25 6.05 12.55 5 14.45 5c3.3 0 5.2 3.25 3.65 6.4C16 15.65 12 20 12 20Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'No leaderboard, no logins',
    description: 'Just keep moving the way you want. Full stop.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4v16M5 9h14M7 15h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m4 20 16-16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Glanceable design',
    description: 'Widgets are built for quick checks, not long sessions.',
    icon: (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12s3.25-5 9-5 9 5 9 5-3.25 5-9 5-9-5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
]

const faqItems = [
  {
    question: 'What is Steps Widget?',
    answer:
      'Steps Widget is a simple iPhone step counter widget that shows your daily Apple Health steps on the screens you check most: Home Screen, Lock Screen, and Apple Watch.',
  },
  {
    question: 'Can I show my step count on the iPhone Lock Screen?',
    answer: 'Yes. You can add a Steps Widget Lock Screen widget to keep your current step count visible without opening a fitness app.',
  },
  {
    question: 'Does Steps Widget work with Apple Health?',
    answer: 'Yes. The app uses Apple Health step data, so your widget reflects the steps your iPhone or Apple Watch records during the day.',
  },
  {
    question: 'Can I use Steps Widget on my iPhone Home Screen?',
    answer: 'Yes. Add it from the iPhone widget gallery, choose a layout, and place it wherever it helps you notice your daily progress.',
  },
  {
    question: 'Does Steps Widget support Apple Watch?',
    answer: 'Yes. Steps Widget is built to make walking progress easier to see across iPhone and Apple Watch, so your step count stays close by.',
  },
  {
    question: 'Is Steps Widget private?',
    answer:
      'Your step data stays on your device. Steps Widget reads Apple Health data with permission and avoids social feeds, public leaderboards, or pressure-based features.',
  },
  {
    question: 'Why is my step widget not updating right away?',
    answer:
      'iOS manages widget refreshes to preserve battery life, so updates may not be instant. If it looks stuck, check Apple Health permission, open Steps Widget once, then give iOS a little time to refresh.',
  },
]

function AppStoreButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={appStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center rounded-[14px] transition hover:-translate-y-0.5 hover:shadow-(--hero-glow) ${className}`}
      aria-label="Download Steps Widget on the App Store">
      <Image
        src="/assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="app-store-badge-black h-14 w-auto"
        priority
      />
      <Image
        src="/assets/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="app-store-badge-white h-14 w-auto"
        priority
      />
    </a>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <SiteNav fixed />

      <section className="relative px-5 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[image:var(--hero-glow)]" />
        <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-[var(--hero-rule)] to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[color:var(--border-strong)] bg-[var(--surface-1)] px-3 py-1.5 text-sm text-[var(--text-muted)] shadow-[var(--soft-shadow)]">
            <span className="size-2 rounded-full bg-[var(--accent-color)] shadow-[0_0_18px_var(--accent-glow)]" />
            Private for iPhone and Apple Watch
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-7xl lg:text-8xl">
            See the progress you&apos;ve already made.
          </h1>
          <p className="my-12 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-muted)] sm:text-xl">
            A simple, privacy-focused pedometer widget built for your Home Screen, Lock Screen, and Apple Watch. No social pressure, no leaderboard noise just
            quiet encouragement to help you hit your daily movement goals.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <AppStoreButton />
          </div>

          <div className="mt-14 w-full">
            <HeroPreview />
          </div>
        </div>
      </section>

      <section id="features" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Why it works</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
              A gentle loop for staying aware.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
              The app is built around the glance. You see progress, make a tiny decision, and keep moving without opening another dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-3)] p-2 shadow-[var(--soft-shadow)] transition duration-300 hover:-translate-y-1 hover:border-[color:var(--border-strong)]">
                <div className="relative aspect-[40/27] overflow-hidden rounded-[18px] bg-[var(--surface-media)]">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: feature.accent }}>
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-[var(--text-muted)]">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Simple and private</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
              Your step data stays with you.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
              Steps Widget reads Apple Health with permission and focuses on useful local feedback. There is no social feed, no public ranking, and no pressure
              to perform for anyone else.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {privacyCards.map((card) => (
              <div key={card.title} className="rounded-[22px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)]">
                <div className="mb-6 flex size-10 items-center justify-center rounded-[12px] bg-[var(--accent-color-soft)] text-[var(--accent-color)]">
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-muted)]">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[color:var(--border-strong)] bg-[var(--surface-2)] p-8 text-center shadow-[var(--cta-shadow)] sm:p-12">
          <Image
            src="/assets/stepswidget-icon.png"
            alt=""
            width={92}
            height={92}
            className="mx-auto rounded-[22px] shadow-[0_20px_70px_var(--accent-soft-glow)]"
          />
          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
            Find Your Momentum
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">Download Steps Widget for free and build a daily walking habit.</p>
          <div className="mt-8">
            <AppStoreButton />
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.5fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">What to Expect.</h2>
          </div>
          <div className="divide-y divide-[color:var(--border)] rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] shadow-[var(--soft-shadow)]">
            {faqItems.map((item) => (
              <details key={item.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="text-lg font-semibold text-[var(--text-strong)]">{item.question}</span>
                  <span className="flex size-8 items-center justify-center rounded-full border border-[color:var(--border)] text-[var(--text-subtle)] transition group-open:rotate-45 group-open:text-[var(--text-strong)]">
                    <svg className="size-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 3.5v9M3.5 8h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-7 text-[var(--text-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--border)] px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo textOnly={true} />
          <p>Built for iPhone, Apple Watch, and keeping daily momentum.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex gap-4">
              <Link href="/terms" className="transition hover:text-[var(--text-strong)]">
                Terms
              </Link>
              <Link href="/privacy" className="transition hover:text-[var(--text-strong)]">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
