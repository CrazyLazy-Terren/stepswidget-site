'use client'

type Theme = 'dark' | 'light'
type Accent = 'pink' | 'sky'
type ToggleProps = {
  compact?: boolean
}

const preferenceCookieMaxAge = 60 * 60 * 24 * 365

function savePreference(name: 'theme' | 'accent', value: Theme | Accent) {
  document.cookie = `${name}=${value}; Max-Age=${preferenceCookieMaxAge}; Path=/; SameSite=Lax`

  try {
    window.localStorage.setItem(name, value)
  } catch {
    // Cookies drive server rendering; localStorage is only kept for older visits.
  }
}

function chooseTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme)
  savePreference('theme', theme)
}

function chooseAccent(accent: Accent) {
  document.documentElement.setAttribute('data-accent', accent)
  savePreference('accent', accent)
}

function toggleTheme() {
  chooseTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark')
}

function toggleAccent() {
  chooseAccent(document.documentElement.dataset.accent === 'sky' ? 'pink' : 'sky')
}

function ThemeIcon({ option }: { option: Theme }) {
  if (option === 'light') {
    return (
      <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M10 2.25v2M10 15.75v2M15.48 4.52l-1.42 1.42M5.94 14.06l-1.42 1.42M17.75 10h-2M4.25 10h-2M15.48 15.48l-1.42-1.42M5.94 5.94 4.52 4.52"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg className="size-4" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M14.8 12.9A6.4 6.4 0 0 1 7.1 5.2 6.45 6.45 0 1 0 14.8 12.9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}

export function ThemeToggle({ compact = false }: ToggleProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="flex size-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] text-[var(--text-muted)] shadow-[var(--soft-shadow)] transition hover:text-[var(--text-strong)]"
        aria-label="Toggle theme">
        <span className="theme-icon-light">
          <ThemeIcon option="light" />
        </span>
        <span className="theme-icon-dark">
          <ThemeIcon option="dark" />
        </span>
      </button>
    )
  }

  return (
    <div
      className="grid grid-cols-2 rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] p-1 text-xs font-semibold shadow-[var(--soft-shadow)]"
      aria-label="Theme">
      {(['light', 'dark'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => chooseTheme(option)}
          data-theme-option={option}
          className={
            compact
              ? 'inline-flex size-7 items-center justify-center rounded-full leading-none text-[var(--text-muted)] transition hover:text-[var(--text-strong)]'
              : 'inline-flex items-center rounded-full px-3 py-2 leading-none text-[var(--text-muted)] transition hover:text-[var(--text-strong)]'
          }
          aria-label={`Use ${option} theme`}>
          {compact ? <ThemeIcon option={option} /> : option === 'light' ? 'Light' : 'Dark'}
        </button>
      ))}
    </div>
  )
}

export function AccentToggle({ compact = false }: ToggleProps) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleAccent}
        className="flex size-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] shadow-[var(--soft-shadow)] transition hover:opacity-85"
        aria-label="Toggle accent color">
        <span className="accent-icon-pink size-4 rounded-full bg-[var(--accent-pink-option)] shadow-[inset_0_0_0_1px_rgba(125,125,125,0.128)]" />
        <span className="accent-icon-sky size-4 rounded-full bg-[var(--accent-sky-option)] shadow-[inset_0_0_0_1px_rgba(125,125,125,0.128)]" />
      </button>
    )
  }

  return (
    <div
      className={`grid grid-cols-2 gap-1 rounded-full border border-[color:var(--border)] bg-[var(--control-bg)] shadow-[var(--soft-shadow)] ${compact ? 'p-1' : ''}`}
      aria-label="Accent color">
      {(['pink', 'sky'] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => chooseAccent(option)}
          data-accent-option={option}
          className={`accent-swatch-color flex items-center justify-center rounded-full transition hover:opacity-80 ${compact ? 'size-7' : 'size-8'}`}
          aria-label={`Use ${option} accent`}>
          <span
            className={`accent-swatch rounded-full shadow-[inset_0_0_0_1px_rgba(125,125,125,0.128)] ${compact ? 'size-4' : 'size-5'} ${
              option === 'pink' ? 'bg-[var(--accent-pink-option)]' : 'bg-[var(--accent-sky-option)]'
            }`}
          />
        </button>
      ))}
    </div>
  )
}
