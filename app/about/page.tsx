import type { Metadata } from 'next'
import { ContentShell } from '../content-shell'

export const metadata: Metadata = {
  title: 'About - Steps Widget',
  description: 'Learn about Steps Widget, a private step counter widget for iPhone, Apple Watch, Home Screen, and Lock Screen.',
}

const values = [
  {
    title: 'Glance first',
    description: 'Steps Widget is built around visual feedback, not long sessions. Your progress should be visible where you already look.',
  },
  {
    title: 'No pressure',
    description: 'Your progress, your pace. The app avoids public leaderboards and social comparison so daily movement can stay personal and calm.',
  },
  {
    title: 'Private by design',
    description: 'Apple Health step data powers the widgets and is handled with a privacy-first, on-device mindset.',
  },
]

export default function AboutPage() {
  return (
    <ContentShell
      eyebrow="About"
      title="No pressure step tracking."
      description="Steps Widget turns Apple Health steps into glanceable iPhone Home Screen, Lock Screen, and Apple Watch widgets, so daily progress stays visible without pressure.">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[24px] border border-[color:var(--border)] bg-[var(--surface-1)] p-6 shadow-[var(--soft-shadow)] sm:p-8">
          <h2 className="text-2xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">Why Steps Widget exists</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[var(--text-muted)]">
            <p>
              It&apos;s easy to forget to move when you&apos;re sitting at a desk, scrolling on your phone, or watching TV. Maintaining a minimum level of daily
              activity is one of the foundations of good health.
            </p>
            <p>The goal is gentle awareness: a number you can notice, a small nudge when it helps, and a calmer way to stay connected to your day.</p>
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
