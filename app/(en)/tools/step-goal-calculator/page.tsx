import type { Metadata } from 'next'
import { AppStoreButton } from '../../../app-store-button'
import { ArrowLink } from '../../../arrow'
import { ContentShell } from '../../../content-shell'
import { defaultOgImages, siteName } from '../../../shared-metadata'
import { JsonLd, absoluteUrl, applicationId, breadcrumbSchema, faqSchema, websiteId } from '../../../structured-data'
import { StepGoalCalculator } from './calculator'
import { calculatorFaq } from './goals'

const path = '/tools/step-goal-calculator'
const title = 'Step Goal Calculator: How Many Steps a Day for Your Goal | Steps Widget'
const description =
  'Work out how many steps a day you need to lose weight, keep it off, live longer, protect your heart, lift your mood, or recover after surgery, with a week-by-week plan to build up to it.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'step goal calculator',
    'how many steps a day to lose weight',
    'daily step goal calculator',
    'how many steps a day should i walk',
    'steps per day calculator',
    'how many steps after surgery',
  ],
  alternates: { canonical: path },
  openGraph: { title, description, url: path, siteName, type: 'website', images: defaultOgImages },
  twitter: { card: 'summary_large_image', title, description, images: defaultOgImages },
}

export default function StepGoalCalculatorPage() {
  const url = absoluteUrl(path)

  return (
    <ContentShell
      eyebrow="Step goal calculator"
      title="How many steps a day do you need for your goal?"
      description="Pick what you are walking for. The calculator sets a daily step goal from the research behind that goal and your own numbers, then shows how to build up to it without jumping straight there.">
      <JsonLd
        id="schema-step-goal-calculator"
        data={[
          {
            '@type': 'WebApplication',
            '@id': `${url}#calculator`,
            name: 'Step Goal Calculator',
            url,
            description,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            isPartOf: { '@id': websiteId },
            publisher: { '@id': applicationId },
          },
          faqSchema(calculatorFaq, `${url}#faq`),
          breadcrumbSchema(
            [
              { name: 'Home', path: '/' },
              { name: 'Step goal calculator', path },
            ],
            `${url}#breadcrumb`
          ),
        ]}
      />

      <StepGoalCalculator />

      <p className="mt-6 max-w-3xl text-sm leading-6 text-[var(--text-subtle)]">
        This is general guidance from population research, not medical advice. If you are recovering from surgery, pregnant, or managing a heart, lung, or joint
        condition, check the goal with your doctor or physiotherapist before you start.
      </p>

      <section className="mt-16 rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)]">How to adjust your goal</h2>
        <ul className="mt-6 max-w-3xl space-y-4 leading-8 text-[var(--text-muted)]">
          <li>
            <strong className="text-[var(--text-strong)]">Start from your real average.</strong> A goal set against your own last two weeks is one you can hit
            often enough to keep caring about. A round number you miss most days trains you to ignore it.
          </li>
          <li>
            <strong className="text-[var(--text-strong)]">Raise it in small steps.</strong> Add about 500–1,000 steps a day each week, roughly 10% of your
            current average, and hold each level for a full week. After surgery or an injury, keep it to 250–500.
          </li>
          <li>
            <strong className="text-[var(--text-strong)]">Change it when your goal changes.</strong> Once you have lost the weight, switch to the keep-it-off
            goal. Once you are back to your old normal after a setback, choose the health goal you want next.
          </li>
          <li>
            <strong className="text-[var(--text-strong)]">Count the whole day, not one walk.</strong> Steps from errands, stairs, and a lap of the office all
            count. A 10-minute walk after a meal adds about 1,000 steps and helps blood sugar too.
          </li>
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)]">Frequently asked questions</h2>
        <div className="mt-6 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {calculatorFaq.map((entry) => (
            <details key={entry.question} className="group py-5">
              <summary className="cursor-pointer list-none text-lg font-semibold text-[var(--text-strong)] marker:hidden">{entry.question}</summary>
              <p className="mt-3 max-w-3xl leading-8 text-[var(--text-muted)]">{entry.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-lg border border-[color:var(--border)] bg-[var(--surface-2)] p-6 sm:p-8">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)]">Keep the goal where you will see it</h2>
        <p className="mt-4 max-w-3xl leading-8 text-[var(--text-muted)]">
          Apple Health already counts your steps. The app puts that count against your new goal on your Home Screen, Lock Screen, and Apple Watch, and learns
          your daily pattern to tell you, while there is still time to walk, when today is heading short.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <AppStoreButton />
          <ArrowLink
            href="/blog/how-to-set-a-realistic-daily-step-goal"
            className="font-semibold text-[var(--text-strong)] transition hover:text-[var(--accent-color)]">
            How to set a realistic daily step goal
          </ArrowLink>
        </div>
      </section>
    </ContentShell>
  )
}
