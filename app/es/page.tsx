import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AppStoreButton } from '../app-store-button'
import { PageSection, pageGutter } from '../page-shell'
import { SiteLogo } from '../site-nav'
import { ThemeToggle } from '../theme-toggle'
import { defaultOgImages, siteName, siteUrl } from '../shared-metadata'
import { JsonLd, applicationSchema, faqSchema, organizationSchema, websiteId, type FaqEntry } from '../structured-data'

/**
 * Spanish landing page.
 *
 * A short, self-contained page rather than a translation of the full homepage:
 * enough Spanish copy for search engines to index it as a Spanish page, with
 * `hreflang` pairing it to `/`. The docs and blog stay English and are linked
 * as such. `<html lang="es">` comes from proxy.ts.
 */

const title = 'Steps Widget: ve tus pasos y recibe un aviso amable en iPhone y Apple Watch'
const description =
  'Ve tus pasos, recibe un aviso amable y muévete un poco más cada día. Widgets de pasos para iPhone, Apple Watch y Mac, con recordatorios en el momento justo, no cada hora. Sin planes de entrenamiento, sin cuenta.'
const shareDescription =
  'Sin planes de entrenamiento ni contar calorías. Solo tus pasos a la vista y un aviso amable en el momento justo. Muévete un poco más cada día.'
const pageUrl = `${siteUrl}/es`

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Steps Widget',
    'widget de pasos iPhone',
    'contador de pasos widget',
    'widget de pasos Apple Watch',
    'recordatorio para caminar',
    'podómetro widget iPhone',
    'meta diaria de pasos',
  ],
  alternates: {
    canonical: '/es',
    languages: { en: '/', es: '/es', 'x-default': '/' },
  },
  openGraph: {
    title,
    description: shareDescription,
    url: '/es',
    siteName,
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['en_US'],
    images: defaultOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: shareDescription,
    images: defaultOgImages,
  },
}

const trustFacts = [
  { label: 'Datos de pasos', value: 'Se leen de Apple Health en tu dispositivo' },
  { label: 'El modelo', value: 'Se entrena y funciona en tu dispositivo' },
  { label: 'Cuenta', value: 'Ninguna: no hay nada con qué iniciar sesión' },
  { label: 'Avisos', value: 'Gratis, con todos sus ajustes' },
]

const features = [
  {
    eyebrow: 'Estilos de widget',
    title: 'Con un estilo que encaja en tu pantalla',
    description: 'Claro, oscuro, tintado o con un color propio. Tus pasos se ven como si siempre hubieran estado ahí.',
    image: '/assets/f01.png',
    // A tall Home Screen capture: keep the widgets in frame, as on the English page.
    imageClassName: 'object-top',
  },
  {
    eyebrow: 'Inicio, bloqueo, Watch y Mac',
    title: 'En cada pantalla que ya miras',
    description: 'Pantalla de inicio, pantalla de bloqueo, StandBy, Apple Watch y tu Mac. Tus pasos, siempre a un vistazo.',
    image: '/assets/f02.png',
  },
  {
    eyebrow: 'Modelo en el dispositivo',
    title: 'Sabe cómo va a terminar tu día',
    description:
      'Un modelo en tu iPhone calcula cuántos pasos llevarás al final del día. Solo te avisa si esa previsión no llega a tu meta, así que un día en el que ya caminas se queda en silencio.',
    image: '/assets/f03.png',
  },
  {
    eyebrow: 'Ajustes',
    title: 'Tu día, a tu manera',
    description:
      'Mueve el inicio del día hasta seis horas después de medianoche, recibe el aviso antes cuando se pone el sol y elige tu meta viendo un mes de tus propios días.',
    image: '/assets/f04.png',
  },
]

const watchCards = [
  {
    title: 'Avisos en tu muñeca',
    description: 'Los avisos de meta funcionan en el propio Apple Watch, así que te llegan aunque el iPhone esté en otra habitación.',
    image: '/assets/w01.png',
  },
  {
    title: 'Tus pasos de un vistazo',
    description: 'Tres estilos de complicación para cualquier esfera. La rectangular marca junto al gráfico las horas en que estuviste de pie.',
    image: '/assets/w02.png',
  },
  {
    title: 'Tu estilo, también en la muñeca',
    description: 'Combínalo con tu esfera. Tu estilo y tus ajustes se sincronizan entre tus dispositivos.',
    image: '/assets/w03.png',
  },
]

const faqItems: FaqEntry[] = [
  {
    question: '¿Steps Widget es gratis?',
    answer:
      'Sí. La descarga es gratuita y no tiene anuncios, y todo el sistema de avisos es gratis, incluido el modelo y todos sus ajustes. Una suscripción opcional de Personalización permite aplicar estilos y colores extra al widget; un estilo que ya aplicaste sigue funcionando aunque la suscripción termine.',
  },
  {
    question: '¿Necesito un Apple Watch?',
    answer:
      'No. El iPhone cuenta tus pasos por sí solo. Con un Apple Watch, los avisos llegan a tu muñeca aunque el iPhone esté en otra habitación, y se suman los pasos que el teléfono no ve.',
  },
  {
    question: '¿Mis datos salen de mi dispositivo?',
    answer:
      'No. El modelo se entrena y funciona en tu iPhone, y tus pasos no se envían a ningún servidor. No hay cuenta ni inicio de sesión. La sincronización opcional con iCloud usa tu propia cuenta privada de iCloud.',
  },
]

const appStoreLabel = 'Descargar Steps Widget en el App Store'

export default function SpanishHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <JsonLd
        id="schema-home-es"
        data={[
          organizationSchema(),
          applicationSchema(),
          {
            '@type': 'WebPage',
            '@id': pageUrl,
            url: pageUrl,
            name: title,
            description,
            inLanguage: 'es',
            isPartOf: { '@id': websiteId },
          },
          faqSchema(faqItems, `${pageUrl}#faq`),
        ]}
      />

      <header className={`border-b border-[color:var(--border)] bg-[var(--header-bg)] backdrop-blur-xl ${pageGutter}`}>
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-4">
          <SiteLogo />
          <div className="flex items-center gap-4">
            <Link href="/" hrefLang="en" lang="en" className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--text-strong)]">
              English
            </Link>
            <div className="hidden sm:block">
              <ThemeToggle lang="es" />
            </div>
            <div className="sm:hidden">
              <ThemeToggle compact lang="es" />
            </div>
          </div>
        </nav>
      </header>

      <PageSection paddingY="top" overlay={<div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-55 bg-[image:var(--hero-glow)]" />}>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">Widgets de pasos para iPhone y Apple Watch</p>
          <h1 className="mt-10 text-balance text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
            Tus pasos, a la vista. Un aviso, cuando hace falta.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-8 text-[var(--text-muted)]">
            Tus pasos de Apple Health viven en la pantalla de inicio, la pantalla de bloqueo y el Apple Watch, con un estilo que encaja. Y un modelo en tu
            iPhone te avisa solo cuando tu día va camino de quedarse corto.
          </p>
          <AppStoreButton className="mt-10" label={appStoreLabel} lang="es" />
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

      <PageSection paddingY="top" containerClassName="border-t border-[color:var(--border)] pt-14">
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[var(--surface-1)]">
              <div className="relative aspect-[16/9] bg-[var(--surface-media)]">
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className={`object-cover ${feature.imageClassName ?? ''}`.trim()}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">{feature.eyebrow}</p>
                <h2 className="mt-6 text-xl font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{feature.title}</h2>
                <p className="mt-2 leading-7 text-[var(--text-muted)]">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="watch" paddingY="top" containerClassName="border-t border-[color:var(--border)] pt-14">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--accent-color)]">Apple Watch</p>
          <h2 className="mt-10 text-balance text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">
            No es imprescindible, pero es la mejor combinación.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--text-muted)]">
            El Watch cuenta los paseos que el teléfono no vio, te avisa con un toque en la muñeca esté donde esté el iPhone y es lo único que registra las horas
            de pie que marca el gráfico.
          </p>
        </div>

        <div className="relative mx-auto my-14 aspect-[9/7] overflow-hidden">
          <Image
            src="/assets/watch_feature.png"
            alt="Pasos de Steps Widget en dos esferas del Apple Watch junto a los widgets de la pantalla de bloqueo y de inicio del iPhone"
            fill
            sizes="(max-width: 1280px) 100vw, 1272px"
            className="object-contain"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {watchCards.map((card) => (
            <div key={card.title} className="overflow-hidden rounded-4xl border border-[color:var(--border)] bg-[var(--surface-1)]">
              <div className="relative aspect-[3/4] bg-[var(--surface-media)]">
                <Image src={card.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-center" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
                <p className="mt-3 leading-7 text-[var(--text-muted)]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="faq" paddingY="top" containerClassName="grid gap-10 border-t border-[color:var(--border)] pt-14 lg:grid-cols-[20rem_minmax(0,1fr)]">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-4xl">Preguntas frecuentes</h2>
        <div>
          {faqItems.map((item) => (
            <div key={item.question} className="border-b border-[color:var(--border)] py-5">
              <h3 className="font-medium text-[var(--text-strong)]">{item.question}</h3>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--text-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection containerClassName="pt-14">
        <div className="rounded-[16px] border border-[color:var(--border)] bg-[var(--surface-1)] p-8 text-center sm:p-12">
          <Image src="/assets/stepswidget-icon.png" alt="" width={80} height={80} className="mx-auto rounded-[18px]" />
          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-3xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-5xl">
            Muévete un poco más cada día.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
            Descarga gratuita, sin anuncios y con avisos siempre gratis. La app está disponible en español.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreButton label={appStoreLabel} lang="es" />
          </div>
        </div>
      </PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <p>La documentación y el blog están en inglés.</p>
          <div className="-my-2 flex flex-wrap gap-x-5">
            <Link href="/docs" hrefLang="en" className="py-2 transition hover:text-[var(--text-strong)]">
              Documentación
            </Link>
            <Link href="/blog" hrefLang="en" className="py-2 transition hover:text-[var(--text-strong)]">
              Blog
            </Link>
            <Link href="/privacy" hrefLang="en" className="py-2 transition hover:text-[var(--text-strong)]">
              Privacidad
            </Link>
            <Link href="/" hrefLang="en" lang="en" className="py-2 transition hover:text-[var(--text-strong)]">
              English
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
