import type { Metadata } from 'next'
import { ArrowLink } from '../../arrow'
import { ContentShell } from '../../content-shell'
import { defaultOgImages, siteName } from '../../shared-metadata'
import { JsonLd, absoluteUrl, applicationSchema, breadcrumbSchema, organizationId, organizationSchema } from '../../structured-data'

const title = 'About - Steps Widget'
const description =
  'Steps Widget puts the steps Apple Health already counts on every screen you look at, in a style that belongs there, and nudges you only when your day is heading short of your goal. Built solo, all on device.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title,
    description,
    url: '/about',
    siteName,
    type: 'website',
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: defaultOgImages,
  },
}

const storyParagraphs = [
  'I write software for a living. A good day means a few uninterrupted hours, and the cost is a body that has not moved since breakfast. My iPhone was counting every step the whole time. It just kept the number a few taps deep in the Health app, where I never looked.',
  'The glance came first. Apple Health already does the counting well, so Steps Widget does not try to replace it. It reads the steps Health has collected and puts them on the Home Screen, Lock Screen, StandBy, Apple Watch, and Mac, in a style that looks like it belongs on your phone. When your steps are always in sight, you do not have to remember to check.',
  'Then came the nudge. Every stand reminder I tried fired on a timer, buzzed while I was holding something complicated in my head, and got muted within a fortnight. So the nudge works differently: a model on your iPhone learns your own daily pattern and projects where your step count is heading. It speaks up only when your day is falling short, while there is still time to walk.',
]

const values = [
  {
    title: 'Make Apple Health useful, not redundant',
    description:
      'Your iPhone and Apple Watch already count your steps. The app reads that count and makes it visible and actionable. No second tracker, no import, no starting over.',
  },
  {
    title: 'Glance first',
    description: 'Progress should be visible where you already look, in a style picked to match your wallpaper rather than one you put up with.',
  },
  {
    title: 'A nudge has to earn the interruption',
    description:
      'There is no hourly timer. A reminder arrives only when the projection says your day is heading short of your goal. On a day you are on track, nothing fires.',
  },
  {
    title: 'No pressure',
    description: 'No feeds, no streaks, no leaderboards. Your progress, your pace, so daily movement can stay personal and calm.',
  },
  {
    title: 'On device, not on a server',
    description:
      'The model trains and runs on your iPhone. The app reads three Apple Health types with permission and never writes to Health. There is no account, and iCloud carries only your settings.',
  },
  {
    title: 'Free where it counts',
    description:
      'Nudges and every nudge setting are free, with no ads. An optional Customization subscription applies extra widget styles, and a style you have applied keeps working if it lapses.',
  },
]

const resources = [
  { href: '/docs', label: 'Read the docs', description: 'How every widget, nudge, and setting works.' },
  { href: '/blog', label: 'Browse the blog', description: 'Guides on step widgets, Apple Health, and Apple Watch.' },
  { href: '/search', label: 'Search the site', description: 'Find an answer across docs and guides at once.' },
]

export default function AboutPage() {
  return (
    <ContentShell
      eyebrow="About"
      title="The glance and the nudge, built solo."
      description="Steps Widget started as a fix for my own workday: a step count I would actually keep on my Home Screen, and a reminder I would not immediately turn off.">
      <JsonLd
        id="schema-about"
        data={[
          organizationSchema(),
          applicationSchema(),
          {
            '@type': 'AboutPage',
            '@id': `${absoluteUrl('/about')}#about`,
            name: title,
            description,
            url: absoluteUrl('/about'),
            inLanguage: 'en-US',
            publisher: { '@id': organizationId },
          },
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <section className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">Why Steps Widget exists</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-base leading-8 text-[var(--text-muted)]">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
            <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{value.title}</h3>
            <p className="mt-4 leading-7 text-[var(--text-muted)]">{value.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {resources.map((resource) => (
          <div key={resource.href} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
            <ArrowLink href={resource.href} className="font-semibold text-[var(--text-strong)] transition hover:text-[var(--accent-color)]">
              {resource.label}
            </ArrowLink>
            <p className="mt-2 leading-7 text-[var(--text-muted)]">{resource.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Part of my product portfolio</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)]">Built by CrazyLazy.</h2>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--text-muted)]">
          Steps Widget is one product in my personal app portfolio: focused, lightweight, and solved my own problem.
        </p>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--text-muted)]">
          CrazyLazy is my personal site, where I share apps, experiments, and development notes. You can explore the broader portfolio at{' '}
          <a
            href="https://www.crazylazy.xyz/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--accent-color)] transition hover:opacity-80">
            www.crazylazy.xyz
          </a>
          .
        </p>
      </section>
    </ContentShell>
  )
}
