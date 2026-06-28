import Image from "next/image";

const appStoreUrl =
  "https://apps.apple.com/app/apple-store/id6756297788?pt=120739140&ct=website&mt=8";

const featureCards = [
  {
    title: "Every screen",
    eyebrow: "Home, Lock Screen, Watch",
    description:
      "Keep your steps close at hand on iPhone and Apple Watch without opening a fitness app.",
    image: "/assets/feature-every-screen.png",
    color: "text-red-300",
  },
  {
    title: "Your style",
    eyebrow: "Simple, detailed, charted",
    description:
      "Choose widgets that match the way you like to check progress, from minimal numbers to richer daily context.",
    image: "/assets/feature-styles.png",
    color: "text-emerald-300",
  },
  {
    title: "Smart nudges",
    eyebrow: "On-device reminders",
    description:
      "Helpful notifications can react to your day and encourage movement without turning progress into pressure.",
    image: "/assets/feature-nudges.png",
    color: "text-sky-300",
  },
];

const stats = [
  { value: "0", label: "social feeds" },
  { value: "3", label: "places to glance" },
  { value: "100%", label: "built around privacy" },
];

const faqItems = [
  {
    question: "What is StepsWidget?",
    answer:
      "StepsWidget is an iPhone step counter widget that makes daily walking progress visible on the Home Screen, Lock Screen, and Apple Watch.",
  },
  {
    question: "Does it use Apple Health?",
    answer:
      "Yes. The app reads step data from Apple Health and presents it in focused widgets designed for quick daily check-ins.",
  },
  {
    question: "Can I use it on the Lock Screen?",
    answer:
      "Yes. Add a Lock Screen widget so your step count is visible in the places you naturally look throughout the day.",
  },
  {
    question: "How private is it?",
    answer:
      "StepsWidget is designed around on-device processing, Apple Health permissions, and a calm experience without public leaderboards.",
  },
  {
    question: "Why do steps sometimes update later?",
    answer:
      "iOS controls widget refresh timing to preserve battery. If the count looks delayed, confirm Apple Health access and open StepsWidget once.",
  },
];

function AppStoreButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={appStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex h-14 items-center justify-center rounded-[14px] border border-white/12 bg-white px-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_24px_60px_rgba(255,99,99,0.24)] ${className}`}
      aria-label="Download StepsWidget on the App Store"
    >
      <Image
        src="/assets/app-store.png"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="h-10 w-auto"
        priority
      />
    </a>
  );
}

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative size-10 overflow-hidden rounded-[12px] shadow-[0_0_32px_rgba(255,99,99,0.35)]">
        <Image
          src="/assets/stepswidget-icon.png"
          alt=""
          width={80}
          height={80}
          className="size-full object-cover"
          priority
        />
      </div>
      <span className="text-sm font-semibold tracking-[0.08em] text-white/90">
        StepsWidget
      </span>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="absolute inset-x-10 top-4 h-px bg-gradient-to-r from-transparent via-red-300/60 to-transparent" />
      <div className="rounded-[26px] border border-white/12 bg-[#121214]/95 p-2 shadow-[0_50px_140px_rgba(0,0,0,0.55)]">
        <div className="rounded-[20px] border border-white/8 bg-[#0a0a0b]">
          <div className="flex h-11 items-center justify-between border-b border-white/8 px-4">
            <div className="flex gap-2">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/45 sm:flex">
              <span className="size-1.5 rounded-full bg-emerald-300" />
              Live daily progress
            </div>
          </div>

          <div className="grid gap-2 p-2 lg:grid-cols-[0.72fr_1fr]">
            <div className="flex min-h-[420px] flex-col justify-between rounded-[18px] border border-white/8 bg-[linear-gradient(145deg,#18181b,#0e0e10)] p-5">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/60">
                    Today
                  </div>
                  <div className="rounded-full bg-red-400/15 px-3 py-1 text-xs font-medium text-red-200">
                    +18% pace
                  </div>
                </div>
                <p className="text-sm font-medium text-white/45">
                  Step count
                </p>
                <div className="mt-2 flex items-end gap-3">
                  <span className="text-6xl font-semibold tracking-[-0.02em] text-white sm:text-7xl">
                    8,421
                  </span>
                  <span className="pb-3 text-sm text-white/40">steps</span>
                </div>
                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[84%] rounded-full bg-gradient-to-r from-red-400 via-orange-300 to-emerald-300" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <p className="text-xs text-white/40">Goal</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    10,000
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                  <p className="text-xs text-white/40">Needed</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    1,579
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="relative min-h-[250px] overflow-hidden rounded-[18px] border border-white/8 bg-[#161618] sm:col-span-2">
                <Image
                  src="/assets/feature-every-screen.png"
                  alt="StepsWidget displayed across iPhone screens and Apple Watch"
                  fill
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="rounded-[18px] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-200/80">
                  Private
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-white">
                  Apple Health stays on device.
                </p>
              </div>
              <div className="rounded-[18px] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200/80">
                  Calm
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-white">
                  Progress without pressure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050506] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#050506]/75 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <LogoMark />
          <div className="hidden items-center gap-7 text-sm font-medium text-white/55 md:flex">
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#privacy">
              Privacy
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
          </div>
          <a
            href={appStoreUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-red-100"
          >
            Get app
          </a>
        </nav>
      </header>

      <section className="relative px-5 pt-28 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[620px] bg-[linear-gradient(180deg,rgba(255,99,99,0.22),rgba(255,99,99,0.05)_35%,rgba(5,5,6,0))]" />
        <div className="absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3 py-1.5 text-sm text-white/70">
            <span className="size-2 rounded-full bg-red-300 shadow-[0_0_18px_rgba(255,99,99,0.8)]" />
            Private step widgets for iPhone and Apple Watch
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.02em] text-white sm:text-7xl lg:text-8xl">
            No pressure. Just visible progress.
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/62 sm:text-xl">
            StepsWidget keeps your daily step count where you already look:
            Home Screen, Lock Screen, and Apple Watch. Simple feedback, quiet
            encouragement, and no leaderboard noise.
          </p>

          <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
            <AppStoreButton />
            <a
              href="#features"
              className="inline-flex h-14 items-center justify-center rounded-[14px] border border-white/12 bg-white/[0.05] px-5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.08]"
            >
              Explore features <span className="ml-2">-&gt;</span>
            </a>
          </div>

          <div className="mt-14 w-full">
            <HeroPreview />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[20px] border border-white/8 bg-white/[0.04] px-5 py-6 text-center"
            >
              <p className="text-4xl font-semibold tracking-[-0.02em] text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-white/45">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200/80">
              Why it works
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-white sm:text-6xl">
              A gentle loop for staying aware.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/56">
              The app is built around the glance. You see progress, make a tiny
              decision, and keep moving without opening another dashboard.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featureCards.map((feature) => (
              <article
                key={feature.title}
                className="group rounded-[24px] border border-white/10 bg-[#101012] p-2 transition duration-300 hover:-translate-y-1 hover:border-white/20"
              >
                <div className="relative aspect-[40/27] overflow-hidden rounded-[18px] bg-[#17171a]">
                  <Image
                    src={feature.image}
                    alt={`${feature.title} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${feature.color}`}
                  >
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.01em] text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-7 text-white/55">
                    {feature.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="privacy" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
              Simple and private
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-6xl">
              Your step data should feel personal.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/56">
              StepsWidget reads Apple Health with permission and focuses on
              useful local feedback. There is no social feed, no public ranking,
              and no pressure to perform for anyone else.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["On-device model", "Smart nudges can be triggered from your daily pattern."],
              ["Apple Health", "The step source stays the system you already trust."],
              ["No leaderboard", "Progress is measured against your day, not someone else's."],
              ["Glanceable design", "Widgets are built for quick checks, not long sessions."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[22px] border border-white/10 bg-white/[0.045] p-6"
              >
                <div className="mb-6 flex size-10 items-center justify-center rounded-[12px] bg-red-400/15 text-red-200">
                  <span className="text-lg">+</span>
                </div>
                <h3 className="text-xl font-semibold tracking-[-0.01em] text-white">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-white/52">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-red-300/18 bg-[linear-gradient(135deg,rgba(255,99,99,0.16),rgba(255,255,255,0.055)_42%,rgba(40,200,120,0.12))] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,0.35)] sm:p-12">
          <Image
            src="/assets/stepswidget-icon.png"
            alt=""
            width={92}
            height={92}
            className="mx-auto rounded-[22px] shadow-[0_20px_70px_rgba(255,99,99,0.28)]"
          />
          <h2 className="mx-auto mt-7 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.02em] sm:text-6xl">
            Start with one glance today.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/60">
            Download StepsWidget for free and turn your daily steps into a
            quiet, visible habit.
          </p>
          <div className="mt-8">
            <AppStoreButton />
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-200/80">
              FAQ
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
              Quick answers before you install.
            </h2>
          </div>
          <div className="divide-y divide-white/10 rounded-[24px] border border-white/10 bg-white/[0.04]">
            {faqItems.map((item) => (
              <details key={item.question} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <span className="text-lg font-semibold text-white">
                    {item.question}
                  </span>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/45 transition group-open:rotate-45 group-open:text-white">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-7 text-white/55">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/8 px-5 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <LogoMark />
          <p>Built for iPhone, Apple Watch, and quieter daily momentum.</p>
        </div>
      </footer>
    </main>
  );
}
