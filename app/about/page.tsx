import type { Metadata } from 'next'
import { ContentShell } from '../content-shell'
import { defaultOgImages, siteName } from '../shared-metadata'
import { JsonLd, absoluteUrl, applicationSchema, breadcrumbSchema, organizationId, organizationSchema } from '../structured-data'

const title = 'About - Steps Widget'
const description = 'Steps Widget is a move reminder app built by a developer who kept losing whole afternoons to a screen. Nudges you control, all on device.'

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

const values = [
  {
    title: 'A nudge has to earn the interruption',
    description: 'Most stand reminders get muted because they fire on a timer and sound like an alarm. This one is timed around what you actually did.',
  },
  {
    title: 'Glance first',
    description: 'The app is built around visual feedback, not long sessions. Your progress should be visible where you already look.',
  },
  {
    title: 'No pressure',
    description: 'Your progress, your pace. No public leaderboards and no social comparison, so daily movement can stay personal and calm.',
  },
  {
    title: 'On device, not on a server',
    description: 'The model that learns your activity pattern runs on your iPhone. Apple Health data is read with permission and stays local.',
  },
]

export default function AboutPage() {
  return (
    <ContentShell
      eyebrow="About"
      title="Built by someone who sits too long."
      description="Steps Widget started as a fix for my own workday: a move reminder I would not immediately turn off.">
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
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">Why Steps Widget exists</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[var(--text-muted)]">
            <p>I write software for a living. A good day means a few uninterrupted hours, and the cost is a body that has not moved since breakfast.</p>
            <p>
              I tried the usual stand reminders. Every one fired on a timer, buzzed while I was holding something complicated in my head, and used a sound I
              never picked. I turned them all off within a fortnight.
            </p>
            <p>
              So Steps Widget works differently. Your iPhone learns your real activity pattern, so the nudge comes after you have actually been sitting. It asks
              you to walk rather than just stand up. And your step count is there to show you it happened, which is the part that makes it stick.
            </p>
          </div>
        </section>

        <section className="grid gap-4">
          {values.map((value) => (
            <article key={value.title} className="rounded-[22px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)]">
              <h3 className="text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{value.title}</h3>
              <p className="mt-3 leading-7 text-[var(--text-muted)]">{value.description}</p>
            </article>
          ))}
        </section>
      </div>

      <section className="mt-5 rounded-[24px] border border-[color:var(--border)] bg-[image:var(--cta-bg)] p-6 shadow-[var(--cta-shadow)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Part of my product portfolio</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)]">Built by CrazyLazy.</h2>
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
