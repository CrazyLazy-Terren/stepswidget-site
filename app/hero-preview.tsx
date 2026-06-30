'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function HeroPreview() {
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) {
      return
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const updateParallax = () => {
      frame = 0

      const setLayerOffsets = (progress: number) => {
        stage.style.setProperty('--hero-front-x', `${(progress * 52).toFixed(2)}px`)
        stage.style.setProperty('--hero-front-y', `${(progress * 52).toFixed(2)}px`)
        stage.style.setProperty('--hero-back-x', `${(progress * -64).toFixed(2)}px`)
        stage.style.setProperty('--hero-back-y', `${(progress * 28).toFixed(2)}px`)
        stage.style.setProperty('--hero-grids-y', `${(progress * -1024).toFixed(2)}px`)
      }

      if (reducedMotion.matches) {
        setLayerOffsets(0)
        return
      }

      const rect = stage.getBoundingClientRect()
      const visualViewport = window.visualViewport
      const viewportHeight = visualViewport?.height ?? window.innerHeight ?? 1
      const viewportTop = window.scrollY + (visualViewport?.offsetTop ?? 0)
      const stageTop = rect.top + viewportTop
      const travel = viewportHeight + rect.height
      const progress = clamp(((viewportTop - (stageTop - viewportHeight)) / travel) * 2 - 1, -1, 1)

      setLayerOffsets(progress)
    }

    const requestUpdate = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(updateParallax)
    }

    updateParallax()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    window.visualViewport?.addEventListener('scroll', requestUpdate, { passive: true })
    window.visualViewport?.addEventListener('resize', requestUpdate)
    document.addEventListener('scroll', requestUpdate, { passive: true })
    reducedMotion.addEventListener('change', requestUpdate)

    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      window.visualViewport?.removeEventListener('scroll', requestUpdate)
      window.visualViewport?.removeEventListener('resize', requestUpdate)
      document.removeEventListener('scroll', requestUpdate)
      reducedMotion.removeEventListener('change', requestUpdate)

      if (frame) {
        window.cancelAnimationFrame(frame)
      }
    }
  }, [])

  return (
    <div ref={stageRef} className="phone-stage relative mx-auto w-full max-w-6xl">
      <div className="relative -mx-5 min-h-110 sm:min-h-120 lg:min-h-180 overflow-hidden">
        <div className="phone-back absolute bottom-[-10%] left-[-22%] z-10 w-[120%] max-w-[760px]  sm:left-[7%] sm:w-[72%] lg:left-[12%] lg:top-[0%]">
          <Image
            src="/assets/iphone-back.png"
            alt="Steps Widget Lock Screen preview behind the Home Screen phone"
            width={1035}
            height={1035}
            sizes="(max-width: 768px) 88vw, 720px"
            className="h-auto w-full "
            priority
          />
        </div>

        <div className="phone-front absolute bottom-[-34%] right-[-25%] z-10 w-[120%] max-w-[760px] sm:bottom-[-32%] sm:right-[5%] sm:w-[72%]  lg:bottom-[-25%] lg:left-[32%] lg:w-[64%]">
          <Image
            src="/assets/iphone-front.png"
            alt="Steps Widget Home Screen preview in front"
            width={2226}
            height={2226}
            sizes="(max-width: 768px) 88vw, 720px"
            className="h-auto w-full "
            priority
          />
        </div>
      </div>
      <div className="mx-auto my-12 flex max-w-5xl flex-col items-center gap-6 text-center lg:flex-row lg:items-center lg:justify-between lg:text-center">
        <div className="max-w-3xl mx-auto">
          <p className="imx-auto text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-color)]">Widget gallery</p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.02em] text-[var(--text-strong)] sm:text-6xl">
            Choose the step widget style that fits your day.
          </h2>
          <p className="mx-auto my-5 max-w-2xl text-pretty text-lg leading-8 text-[var(--text-muted)]">
            Minimal step counts, progress rings, daily charts, and Lock Screen views help you keep walking progress visible across iPhone and Apple Watch.
          </p>
        </div>
      </div>

      <div className="relative h-90 overflow-hidden -mx-5">
        <div className="phone-grids w-[200%] left-[-50%] sm:left-0 sm:w-full absolute top-[-10%] sm:top-[-240px] z-5 ">
          <Image
            src="/assets/steps-widget-grid.png"
            alt="Steps Widget styles for iPhone Home Screen, Lock Screen, and Apple Watch"
            width={2226}
            height={2226}
            sizes="(max-width: 880px) 98vw, 720px"
            className="h-auto w-full"
            priority
          />
        </div>
        <div className="hero-grid-fade hero-grid-fade-top pointer-events-none absolute inset-x-0 top-0 z-20 h-20" />
        <div className="hero-grid-fade hero-grid-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24" />
      </div>
    </div>
  )
}
