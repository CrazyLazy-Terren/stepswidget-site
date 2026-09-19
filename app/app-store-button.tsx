'use client'
import { sendGTMEvent } from '@next/third-parties/google'

import Image from 'next/image'
import { appStoreUrl } from './app-store'

/** Apple's official badge artwork per language, in black (light theme) and white (dark theme). */
const badges = {
  en: {
    black: '/assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg',
    white: '/assets/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg',
    alt: 'Download on the App Store',
  },
  es: {
    black: '/assets/es/Download_on_the_App_Store_Badge_ES_RGB_blk_100217.svg',
    white: '/assets/es/Download_on_the_App_Store_Badge_ES_RGB_wht_100217.svg',
    alt: 'Consíguelo en el App Store',
  },
}

type AppStoreButtonProps = {
  className?: string
  /** Accessible name for the link. */
  label?: string
  /** Which language's badge artwork to show. */
  lang?: keyof typeof badges
}

export function AppStoreButton({ className = '', label = 'Download Steps Widget on the App Store', lang = 'en' }: AppStoreButtonProps) {
  const badge = badges[lang]

  return (
    <a
      href={appStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center rounded-[14px] transition hover:-translate-y-0.5 hover:shadow-(--hero-glow) ${className}`}
      aria-label={label}
      onClick={() => sendGTMEvent({ event: 'app_store_download' })}>
      <Image
        src={badge.black}
        alt={badge.alt}
        width={120}
        height={40}
        className="app-store-badge-black h-14 w-auto"
        priority
      />
      <Image
        src={badge.white}
        alt={badge.alt}
        width={120}
        height={40}
        className="app-store-badge-white h-14 w-auto"
        priority
      />
    </a>
  )
}
