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
  /** Overrides the default listing link, e.g. to attribute installs to a campaign. */
  href?: string
  /** Overrides the badge's alt text, for a language without its own badge artwork. */
  alt?: string
}

export function AppStoreButton({ className = '', label = 'Download Steps Widget on the App Store', lang = 'en', href = appStoreUrl, alt }: AppStoreButtonProps) {
  const badge = badges[lang]
  const badgeAlt = alt ?? badge.alt

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center rounded-[14px] transition ${className}`}
      aria-label={label}
      onClick={() => sendGTMEvent({ event: 'app_store_download' })}>
      <Image
        src={badge.black}
        alt={badgeAlt}
        width={120}
        height={40}
        className="app-store-badge-black h-14 w-auto"
        priority
      />
      <Image
        src={badge.white}
        alt={badgeAlt}
        width={120}
        height={40}
        className="app-store-badge-white h-14 w-auto"
        priority
      />
    </a>
  )
}
