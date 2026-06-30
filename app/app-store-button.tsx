'use client'

import Image from 'next/image'
import { appStoreUrl } from './app-store'

type AppStoreButtonProps = {
  className?: string
}

export function AppStoreButton({ className = '' }: AppStoreButtonProps) {
  return (
    <a
      href={appStoreUrl}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center rounded-[14px] transition hover:-translate-y-0.5 hover:shadow-(--hero-glow) ${className}`}
      aria-label="Download Steps Widget on the App Store">
      <Image
        src="/assets/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="app-store-badge-black h-14 w-auto"
        priority
      />
      <Image
        src="/assets/Download_on_the_App_Store_Badge_US-UK_RGB_wht_092917.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        className="app-store-badge-white h-14 w-auto"
        priority
      />
    </a>
  )
}
