import { headers } from 'next/headers'

/**
 * The languages the pages a shared link lands on are written in.
 *
 * These pages are opened from a link someone sent, usually on the
 * recipient's phone, so they speak the phone's language rather than having a
 * URL per language: the iOS app ships the same set, and its links carry no
 * language of their own. Nothing here is indexed, so there is no
 * per-language URL to keep.
 */
export const locales = ['en', 'de', 'es', 'fr', 'ja', 'ko', 'pl', 'pt-BR', 'zh-Hans', 'zh-Hant'] as const
export type Locale = (typeof locales)[number]

/** Chinese tags name a region more often than a script. */
const traditionalChineseRegions = new Set(['tw', 'hk', 'mo'])

/** The supported locale a single language tag maps to, if any. */
function matchTag(tag: string): Locale | undefined {
  const parts = tag.toLowerCase().split('-')
  const [language] = parts
  switch (language) {
    case 'zh':
      if (parts.includes('hant') || parts.some((part) => traditionalChineseRegions.has(part))) return 'zh-Hant'
      return 'zh-Hans'
    case 'pt':
      // The app only has Brazilian Portuguese; it reads fine in Portugal too.
      return 'pt-BR'
    default:
      return locales.find((locale) => locale === language)
  }
}

/** Picks the visitor's most preferred supported language from an `Accept-Language` header. */
export function negotiateLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return 'en'

  const ranked = acceptLanguage
    .split(',')
    .map((entry, index) => {
      const [tag, ...params] = entry.trim().split(';')
      const q = params.map((param) => param.trim()).find((param) => param.startsWith('q='))
      return { tag: tag.trim(), quality: q ? Number(q.slice(2)) : 1, index }
    })
    .filter(({ tag, quality }) => tag && tag !== '*' && quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)

  for (const { tag } of ranked) {
    const locale = matchTag(tag)
    if (locale) return locale
  }
  return 'en'
}

/** The language of the current request, from the device's preferred languages. */
export async function getLocale(): Promise<Locale> {
  return negotiateLocale((await headers()).get('accept-language'))
}

/**
 * The language the shared site chrome (nav, footer) is written in. Only the
 * page itself is translated into every language.
 */
export function chromeLang(locale: Locale): 'en' | 'es' {
  return locale === 'es' ? 'es' : 'en'
}

/** Apple's localized "Download on the App Store" wording, for the badge's alt text. */
export const appStoreBadgeAlt: Record<Locale, string> = {
  en: 'Download on the App Store',
  de: 'Laden im App Store',
  es: 'Consíguelo en el App Store',
  fr: 'Télécharger dans l’App Store',
  ja: 'App Storeからダウンロード',
  ko: 'App Store에서 다운로드하기',
  pl: 'Pobierz z App Store',
  'pt-BR': 'Baixar na App Store',
  'zh-Hans': '在 App Store 下载',
  'zh-Hant': '在 App Store 下載',
}

/** The app's name on the Home Screen in each language, from its `CFBundleDisplayName`. */
export const appDisplayName: Record<Locale, string> = {
  en: 'Steps',
  de: 'Schritte',
  es: 'Pasos',
  fr: 'Pas',
  ja: '歩数',
  ko: '걸음 수',
  pl: 'Kroki',
  'pt-BR': 'Passos',
  'zh-Hans': '步数',
  'zh-Hant': '步數',
}

/** `og:locale` wants underscores and a region. */
export const ogLocale: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  fr: 'fr_FR',
  ja: 'ja_JP',
  ko: 'ko_KR',
  pl: 'pl_PL',
  'pt-BR': 'pt_BR',
  'zh-Hans': 'zh_CN',
  'zh-Hant': 'zh_TW',
}
