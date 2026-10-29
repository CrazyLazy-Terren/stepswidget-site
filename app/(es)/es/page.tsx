import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from '../../arrow'
import { AppStoreButton } from '../../app-store-button'
import { DuoDemo } from '../../duo-demo'
import { HeroPreview } from '../../hero-preview'
import { IPhoneCarousel } from '../../iphone-carousel'
import { IPhoneMockup } from '../../iphone-mockup'
import { PageSection, pageGutter } from '../../page-shell'
import { SectionHeading } from '../../section-heading'
import { SiteLogo, SiteNav } from '../../site-nav'
import { defaultOgImages, siteName, siteUrl } from '../../shared-metadata'
import { JsonLd, applicationSchema, faqSchema, organizationSchema, websiteSchema, websiteId, type FaqEntry } from '../../structured-data'

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
    'widget de pasos pantalla de bloqueo',
    'widget pasos Mac',
    'contador de pasos privado',
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

type FeatureCard = {
  title: string
  eyebrow: string
  description: string
  image: string
  imageClassName?: string
  href?: string
  linkLabel?: string
}

const glanceCards: readonly FeatureCard[] = [
  {
    title: 'Con un estilo que encaja en tu pantalla',
    eyebrow: 'Estilos de widget',
    description: 'Tus pasos se ven como en casa en tu pantalla de inicio. Elige un diseño que encaje: claro, oscuro, tintado o con un color propio.',
    image: '/assets/f01.webp',
    imageClassName: 'object-top',
    href: '/docs/widgets/widget-gallery',
    linkLabel: 'Todos los estilos de widget',
  },
  {
    title: 'En cada pantalla que ya miras',
    eyebrow: 'Inicio, bloqueo, Watch y Mac',
    description: 'Pantalla de inicio, pantalla de bloqueo, En reposo (StandBy), Apple Watch y tu Mac. Tus pasos, siempre a un vistazo.',
    image: '/assets/f02.webp',
    href: '/docs/widgets/widget-gallery',
    linkLabel: 'Dónde puede colocarse',
  },
]

const nudgeCards: readonly FeatureCard[] = [
  {
    title: 'Sabe cómo va a terminar tu día',
    eyebrow: 'Modelo en el dispositivo',
    description:
      'Un modelo en tu iPhone calcula los pasos a los que te diriges. El aviso llega solo cuando esa previsión no alcanza tu meta, por lo que un día en el que ya estás caminando se queda tranquilo.',
    image: '/assets/f03.webp',
    href: '/docs/goal-reminders/how-goal-reminders-work',
    linkLabel: 'Cómo funciona la proyección',
  },
  {
    title: 'Tu día, a tu manera',
    eyebrow: 'Ajustes del recordatorio',
    description:
      'Configura el día según tu rutina. Mueve el cambio de día hasta seis horas después de medianoche, o usa una ventana móvil de 24 horas para turnos de trabajo. Puesta de sol local adelanta el aviso cuando cae la tarde. Perspectiva muestra un mes de días reales bajo una meta ajustable, para que el objetivo nazca de tu propia actividad.',
    image: '/assets/f04.webp',
    href: '/docs/goal-reminders/reminder-timing-and-devices',
    linkLabel: 'Horarios y ajustes',
  },
]

type PhoneFeature = {
  title: string
  eyebrow: string
  description: string
  image: string
  imageAlt: string
  href?: string
  linkLabel?: string
}

const shareCards: readonly PhoneFeature[] = [
  {
    title: 'Comparte un estilo, no solo una captura',
    eyebrow: 'Compartir estilos',
    description:
      'Envía una foto con la receta de su estilo adjunta. Cualquiera con Steps puede abrirla o escanear el código para recrear el widget con el mismo encuadre, tono y color.',
    image: '/assets/share-style.webp',
    imageAlt: 'Pantalla de compartir estilo: una foto con su receta de diseño y un código QR para recrear el widget',
    href: '/docs/widgets/share-a-style',
    linkLabel: 'Cómo funciona compartir',
  },
  {
    title: 'Clasificación de pasos de hoy, en Mensajes',
    eyebrow: 'Novedad · App para iMessage',
    description:
      'Comparte el conteo de hoy en una conversación. Los amigos que tienen Steps tocan la burbuja para sumar el suyo y se convierte en la clasificación del día. La tabla viaja en el propio mensaje, sin cuenta ni servidor.',
    image: '/assets/imessage-ranking.webp',
    imageAlt: "Conversación de Mensajes con la clasificación de pasos de hoy: cinco amigos con sus pasos ordenados",
  },
]

const notThis = ['Sin feeds.', 'Sin rachas.', 'Sin culpa.', 'Sin ruido.']

const reminderScreens = [
  {
    src: '/assets/reminder-messages.webp',
    alt: 'Pantalla de Mensajes de recordatorio con avisos para cuando vas retrasado y un mensaje de meta alcanzada',
    caption: 'Escribe varios y se irán turnando. {stepsLeft} y {hours} se completan cuando se envía uno.',
  },
  {
    src: '/assets/reminder-timing.webp',
    alt: 'Control deslizante de tiempo de recordatorio ajustado a 765 pasos, entre Antes y Después',
    caption: 'Desliza hacia Antes o Después para elegir cuánto retraso debe acumular el día antes de avisarte.',
  },
  {
    src: '/assets/reminder-lock-screen.webp',
    alt: "Pantalla de bloqueo con un recordatorio: Has cerrado brechas mayores a 2.128 pasos, y 10 h es tiempo de sobra",
    caption: 'Durante el día, el recordatorio llega con tus propias palabras y con tus números completados.',
  },
] as const

const storyParagraphs = [
  'Steps Widget nació con una idea sencilla: si quieres moverte más, haz que sea más fácil ver cuánto te has movido ya. De ahí surgió el widget de un vistazo.',
  'Los widgets de pasos existen para hacer visible tu progreso, pero a menudo parecen un compromiso visual en tu pantalla de inicio. Quise crear uno que de verdad quisieras conservar: algo que se sintiera natural en tu teléfono. Cuando tus pasos están siempre a la vista, no tienes que acordarte de consultarlos.',
  'Luego llegó el aviso. La mayoría de los recordatorios siguen un horario fijo: cada hora, cada día, la misma notificación la necesites o no. Con el tiempo, terminas ignorándolos.',
  'El aviso de Steps funciona de forma distinta. Se ejecuta discretamente en tu dispositivo, atento a cómo transcurre tu jornada. Si prevé que no vas a alcanzar tu meta, te envía un recordatorio amable en el momento en que realmente puede ayudarte.',
  'Steps Widget está creado por una sola persona, guiado por una única pregunta: ¿qué ayuda de verdad a moverse más? No lo que se espera que tenga una app de fitness, sino lo que marca una diferencia en el día a día.',
]

type Review = {
  title: string
  body: string
  author: string
  location: string
  date: string
  rating: number
  reply?: string
}

const reviews: readonly Review[] = [
  {
    title: 'flawless',
    body: 'does what it says on the tin. helps me get off my arse !',
    author: 'scarlet27itsme',
    location: 'Australia',
    date: '12 ago 2026',
    rating: 5,
  },
  {
    title: 'Simple Widgets syncs with Apple Health/Watch',
    body: 'Was looking for a way to read the step count in Apple Health without opening the Health app - this seems to fit exactly for it.',
    author: 'Jiandal',
    location: 'Australia',
    date: '22 jun 2026',
    rating: 5,
    reply: '¡Me alegra mucho leerlo! Creé la app para mí mismo porque no encontraba ninguna que me gustase.',
  },
  {
    title: 'Free and simple',
    body: 'Just wanted a simple widget that shows my count without all the faff that comes with other health apps. Does the job and has plenty of colour and format options in the free version. Thank you',
    author: 'Alioooo',
    location: 'Reino Unido',
    date: '17 abr 2026',
    rating: 5,
    reply: '¡Gracias! La creé porque tampoco encontraba una opción adecuada. Me alegra mucho que te sirva.',
  },
]

const privacyCards = [
  {
    title: 'El modelo se queda en tu dispositivo',
    description:
      'Tu patrón de actividad se aprende en tu iPhone o Apple Watch y se reentrena allí. Nada sobre tu rutina se sube a internet, y ningún servidor interviene en decidir cuándo avisarte.',
  },
  {
    title: 'Tres tipos de datos de solo lectura en Salud',
    description: 'Conteo de pasos, horas de pie y resumen de actividad diaria, leídos con tu permiso. La app nunca escribe en Salud ni pide más datos.',
  },
  {
    title: 'Sin cuenta, sin clasificación pública',
    description:
      'No hay registro, ni contraseñas, ni feeds sociales. La única clasificación es la que inicias en Mensajes, solo entre las personas que ya están en esa conversación. Una base de datos que nunca existió no puede filtrarse.',
  },
  {
    title: 'iCloud solo sincroniza ajustes',
    description: 'Tu meta, tus preferencias de aviso y los estilos de tus widgets viajan contigo a través de tu propia cuenta privada de iCloud. Tu historial de pasos permanece en Apple Health.',
  },
]

const watchCards = [
  {
    title: 'Avisos en tu muñeca',
    description: 'Los avisos de meta funcionan en el propio Apple Watch, así que te llegan con un toque en la muñeca aunque el iPhone esté en otra habitación.',
    image: '/assets/w01.webp',
  },
  {
    title: 'Tus pasos de un vistazo',
    description: 'Tres estilos de complicación para cualquier esfera. La rectangular marca junto al gráfico las horas en las que estuviste de pie.',
    image: '/assets/w02.webp',
  },
  {
    title: 'Tu estilo, también en la muñeca',
    description: 'Combínalo con tu esfera. Tu estilo y tus ajustes se sincronizan automáticamente entre tus dispositivos.',
    image: '/assets/w03.webp',
  },
]

const faqItems: FaqEntry[] = [
  {
    question: '¿Qué es Steps Widget?',
    answer:
      'Steps Widget es un contador de pasos y recordatorio de metas para iPhone. Tus pasos aparecen en tu pantalla de inicio con el estilo que elijas, y un modelo en tu dispositivo proyecta a qué total de pasos te diriges para avisarte si vas camino de no alcanzar tu meta diaria. Funciona en la pantalla de inicio, de bloqueo, Apple Watch, Mac y en Mensajes.',
  },
  {
    question: '¿En qué se diferencia de un recordatorio para ponerse de pie cada hora?',
    answer:
      'Un recordatorio horario se activa por reloj hagas lo que hagas, y por eso casi todo el mundo termina silenciándolo. Steps Widget proyecta el total del final del día a partir de tu propio historial de pasos y solo te avisa si esa proyección queda por debajo de tu meta, por lo que las horas en las que ya estás caminando transcurren en silencio.',
  },
  {
    question: '¿Puedo cambiar el texto de los avisos?',
    answer:
      'Sí. En Ajustes › Editar mensajes puedes reescribir cada título y texto con tus propias palabras, usando etiquetas que insertan tus pasos restantes y horas. También puedes calibrar con cuánto adelanto o retraso debe enviarse el aviso, y cada mensaje muestra cuántos pasos solían darse tras recibirlo. En iOS con Apple Intelligence puedes describir un tono, como un entrenador deportivo, y el modelo del dispositivo los adapta todos para que los revises antes de guardarlos.',
  },
  {
    question: '¿El modelo en el dispositivo envía mi actividad a algún servidor?',
    answer:
      'No. El modelo se entrena y funciona en tu iPhone, y tus datos de pasos nunca se envían a nuestros servidores. No hay cuenta que crear ni inicio de sesión. La sincronización opcional con iCloud mantiene tus ajustes sincronizados entre tus propios dispositivos mediante tu cuenta privada de iCloud.',
  },
  {
    question: '¿Qué lee la app de Apple Health?',
    answer:
      'Tres tipos de datos de solo lectura: tu recuento de pasos, tus horas de pie y tu resumen de actividad diaria. Nunca escribe en Apple Health ni solicita tu ubicación para contar pasos. La ubicación solo se usa si activas Puesta de sol local, que adelanta los avisos vespertinos.',
  },
  {
    question: '¿Steps Widget es gratis?',
    answer:
      'La app se descarga gratis y no tiene anuncios en ningún plan. Todo el sistema de avisos es gratuito, incluido el modelo en el dispositivo y todos sus ajustes. Una suscripción opcional de Personalización permite aplicar estilos y colores adicionales al widget. Solo necesitas la suscripción para cambiar de estilo; un estilo que ya hayas aplicado seguirá funcionando aunque la suscripción termine.',
  },
  {
    question: '¿Puedo compartir mis pasos con amigos?',
    answer:
      'Sí, en Mensajes. Abre Steps desde el cajón de apps en una conversación para enviar el conteo de hoy. Los amigos que tengan Steps tocan la burbuja para añadir el suyo y se convierte en una clasificación del día. La clasificación vive dentro del propio mensaje, sin cuenta y sin subir nada a internet.',
  },
  {
    question: '¿Puedo ver mis pasos en la pantalla de bloqueo del iPhone?',
    answer: 'Sí. Añade un widget de Steps Widget a la pantalla de bloqueo para tener a la vista tu conteo actual sin necesidad de abrir una app de fitness.',
  },
  {
    question: '¿Puedo poner el widget en mi Mac?',
    answer:
      'Sí. En macOS Sonoma o posterior, el Mac puede mostrar los widgets de tu iPhone mediante Continuidad, de modo que tus pasos pueden estar en el escritorio en el que ya estás trabajando, sin instalar ninguna app adicional para Mac.',
  },
  {
    question: '¿Steps Widget es compatible con Apple Watch?',
    answer:
      'Sí. Steps Widget funciona en el Apple Watch con sus propios ajustes y avisos de meta, así que te avisa incluso si el iPhone no está cerca. Puedes cambiar estilos y suscribirte desde la muñeca, y la suscripción se sincroniza con el iPhone automáticamente.',
  },
  {
    question: '¿Por qué el widget no se actualiza al instante?',
    answer:
      'iOS gestiona las actualizaciones de los widgets para ahorrar batería, por lo que no son instantáneas. Apple Health también comparte actualizaciones de pasos aproximadamente una vez por hora. Si parece detenido, comprueba los permisos de Apple Health y abre Steps Widget una vez. Activar el sensor de movimiento lee el podómetro directamente para un recuento más fresco.',
  },
]

const appStoreLabel = 'Descargar Steps Widget en el App Store'

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
          <IPhoneMockup src={feature.image} alt={feature.imageAlt} className="w-full max-w-80 mt-8" sizes="(max-width: 640px) 80vw, 320px" />
        </article>
      ))}
    </div>
  )
}

function FeatureCards({ cards }: { cards: readonly FeatureCard[] }) {
  return (
    <div className={`mt-12 grid gap-6 sm:grid-cols-2 ${cards.length === 3 ? 'lg:grid-cols-3' : ''}`}>
      {cards.map((feature) => (
        <article
          key={feature.title}
          className="flex flex-col rounded-xl overflow-hidden border border-[color:var(--border)] bg-[var(--surface-1)] transition duration-300 hover:border-[color:var(--border-strong)]">
          <div className="relative aspect-[16/9]">
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

function StarRating({ rating }: { rating: number }) {
  return (
    <p className="flex items-center gap-0.5 text-[var(--accent-color)]">
      <span className="sr-only">{`${rating} de 5 estrellas`}</span>
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

export default function SpanishHome() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--page-bg)] text-[var(--text-strong)] transition-colors duration-300">
      <JsonLd
        id="schema-home-es"
        data={[
          organizationSchema(),
          websiteSchema(),
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
      <SiteNav fixed lang="es" />

      <PageSection paddingY="top">
        <HeroPreview
          intro={
            <div className="flex flex-col items-start">
              <p className="mt-12 text-md font-bold uppercase tracking-[0.14em] text-[var(--accent-color)]">Pasos con estilo. Avisos inteligentes.</p>
              <h1 className="mt-2 text-balance text-5xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-7xl">
                De un vistazo. En el momento justo.
              </h1>
              <p className="mt-12 max-w-3xl text-pretty text-lg leading-8 text-[var(--text-muted)]">
                <strong>Tus pasos siempre a la vista. Un aviso cuando toca moverse.</strong> Los pasos viven en tu pantalla con un estilo que encaja a la
                perfección, mientras un modelo en tu dispositivo interviene solo cuando necesitas un impulso extra.
              </p>

              <AppStoreButton className="mt-12" lang="es" label={appStoreLabel} />
            </div>
          }
          galleryHeading={
            <SectionHeading eyebrow="Galería de widgets" title="Encuentra tu estilo.">
              Conteo de pasos minimalista, anillos de progreso, gráficos por horas y medidores en la pantalla de bloqueo para tener tu actividad a la vista en
              iPhone, Apple Watch y Mac.
            </SectionHeading>
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
        <SectionHeading eyebrow="De un vistazo" title="Siempre a la vista.">
          Tus pasos ya están ahí, en tu pantalla, adaptados a tu estilo y fondo de pantalla. Solo un vistazo rápido a cuánto te has movido hoy.
        </SectionHeading>

        <FeatureCards cards={glanceCards} />
      </PageSection>

      <PageSection id="make-it-yours" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Estilos con foto" title="Haz que el widget sea tuyo.">
            Convierte cualquier foto en un estilo: la imagen detrás de tu recuento de pasos, o sus colores trasladados al widget. Ajusta el tono, el
            desenfoque y el contraste hasta que los números se lean con total claridad. Crear un estilo es gratis; aplicarlo forma parte de la suscripción de
            Personalización, y un estilo ya aplicado a un widget sigue funcionando aunque la suscripción termine.
          </SectionHeading>
          <ArrowLink href="/docs/widgets/photo-styles" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Estilos a partir de una foto
          </ArrowLink>
        </div>
        <IPhoneMockup
          src="/assets/style-editor-dark.webp"
          alt="Editor de estilos con foto: una fotografía de montañas detrás de un widget de 8.072 pasos, con controles de Tono, Desenfoque y Primer plano"
          className="mx-auto w-full max-w-96 lg:col-span-7 lg:mt-12"
          sizes="(max-width: 720px) 80vw, 384px"
        />
      </PageSection>

      <PageSection id="nudge" paddingY="section">
        <SectionHeading eyebrow="El aviso" title="En el momento justo.">
          Un modelo en tu dispositivo aprende tus patrones y actúa solo cuando tu día va camino de quedarse corto, avisándote a tiempo cuando más ayuda.
        </SectionHeading>

        <FeatureCards cards={nudgeCards} />

        <ul className="mt-12 grid overflow-hidden rounded-lg border border-[color:var(--border-strong)] sm:grid-cols-4 -p-1">
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
          <SectionHeading eyebrow="Tu propia voz" title="Recordatorios con tus propias palabras.">
            Reescribe cada recordatorio y mantén varios en rotación. Cada mensaje muestra cuántos pasos solían darse después de recibirlo, para que
            conserves los que de verdad te motivan a moverte.
          </SectionHeading>
          <ArrowLink href="/docs/goal-reminders/reminder-messages" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Cómo escribir tus mensajes
          </ArrowLink>
        </div>
        <IPhoneCarousel screens={reminderScreens} className="mx-auto w-full max-w-96 lg:col-span-7 lg:mt-12" sizes="(max-width: 720px) 80vw, 288px" />
      </PageSection>

      <PageSection id="share" paddingY="section">
        <SectionHeading eyebrow="Compartir" title="Comparte tu estilo. Compara tus pasos.">
          Envía el diseño de tu widget a un amigo o convierte el recuento de hoy en una clasificación dentro de Mensajes.
        </SectionHeading>

        <PhoneFeatures features={shareCards} />
      </PageSection>

      <PageSection id="iphone-duo" paddingY="section">
        <SectionHeading eyebrow="iPhone Duo" title="Adaptado al plegable.">
          Steps Widget se adapta de forma fluida a la pantalla plegable única del iPhone Duo, garantizando que tu contenido se vea siempre de forma óptima, ya
          esté plegado, semiabierto o abierto por completo.
        </SectionHeading>
        <ArrowLink href="/blog/iphone-duo-layout" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
          Cómo adapté Steps para iPhone Duo
        </ArrowLink>
        <DuoDemo lang="es" className="mx-auto mt-12 w-full max-w-3xl" />
      </PageSection>

      <PageSection id="story" paddingY="section" containerClassName="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <SectionHeading eyebrow="La historia" title="Creado al revés." />
          <ArrowLink href="/about" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Sobre el desarrollador
          </ArrowLink>
        </div>
        <div className="max-w-2xl space-y-6 text-lg leading-8 text-[var(--text-muted)] lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-12">
          {storyParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </PageSection>

      <PageSection id="watch" paddingY="section">
        <SectionHeading eyebrow="Apple Watch" title="Opcional, pero la mejor combinación.">
          Tu Apple Watch cuenta los paseos que el iPhone no registra, envía avisos amables directamente a tu muñeca y proporciona las horas de pie que muestra
          el gráfico.
        </SectionHeading>

        <div className="relative mx-auto my-12 aspect-[9/7] overflow-hidden">
          <Image
            src="/assets/watch_feature.webp"
            alt="Pasos de Steps Widget en dos esferas del Apple Watch junto a los widgets de la pantalla de bloqueo y de inicio del iPhone"
            fill
            sizes="(max-width: 1280px) 88vw, 1272px"
            className="object-contain"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {watchCards.map((card) => (
            <div key={card.title} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image src={card.image} alt="" fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover object-center" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{card.title}</h3>
                <p className="mt-4 leading-7 text-[var(--text-muted)]">{card.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <ArrowLink href="/docs/widgets/apple-watch" className="text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Documentación de Apple Watch
          </ArrowLink>
        </div>
      </PageSection>

      <PageSection id="privacy" paddingY="section">
        <SectionHeading eyebrow="Privado por diseño" title="Todo ocurre en tu dispositivo.">
          El modelo que decide cuándo avisarte se ejecuta por completo en tu dispositivo. Sin cuenta, sin inicio de sesión, sin red social y sin necesidad de
          servidores.
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
          Cómo verificar cada uno de estos puntos
        </ArrowLink>
      </PageSection>

      <PageSection id="reviews" paddingY="section">
        <SectionHeading eyebrow="En el App Store" title="Lo que dicen los usuarios.">
          Reseñas reales dejadas en el App Store, transcritas tal como fueron escritas.
        </SectionHeading>

        <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure key={review.author} className="rounded-lg border border-[color:var(--border)] bg-[var(--surface-1)] p-6">
              <StarRating rating={review.rating} />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.01em] text-[var(--text-strong)]">{review.title}</h3>
              <blockquote className="mt-4 text-lg leading-8 text-[var(--text-muted)]">{review.body}</blockquote>

              {review.reply ? (
                <div className="mt-6 border-l-2 border-[color:var(--accent-color)] pl-4">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--text-subtle)]">Respuesta del desarrollador</p>
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
          <SectionHeading eyebrow="Preguntas frecuentes" title="Respuestas a tus dudas." />
          <ArrowLink href="/docs" className="mt-6 text-sm font-medium text-[var(--accent-color)] transition hover:opacity-80">
            Documentación completa
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
          <SectionHeading eyebrow="Gratis en el App Store" title="Eso es todo.">
            Mira tus pasos cuando quieras. Recibe un aviso amable cuando toque moverse. Descarga gratuita, sin anuncios y con avisos siempre incluidos.
          </SectionHeading>
          <AppStoreButton lang="es" label={appStoreLabel} />
        </div>
      </PageSection>

      <footer className={`border-t border-[color:var(--border)] py-8 ${pageGutter}`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[var(--text-subtle)] sm:flex-row sm:items-center sm:justify-between">
          <SiteLogo textOnly={true} href="/es" />
          <div className="-my-2 flex flex-wrap gap-x-6">
            <Link href="/docs" className="py-2 transition hover:text-[var(--text-strong)]">
              Documentación
            </Link>
            <Link href="/blog" className="py-2 transition hover:text-[var(--text-strong)]">
              Blog
            </Link>
            <Link href="/about" className="py-2 transition hover:text-[var(--text-strong)]">
              Acerca de
            </Link>
            <Link href="/terms" className="py-2 transition hover:text-[var(--text-strong)]">
              Términos
            </Link>
            <Link href="/privacy" className="py-2 transition hover:text-[var(--text-strong)]">
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
