'use client'

import Image from 'next/image'
import { useEffect, useRef, type ReactNode } from 'react'
import { IPhoneMockup } from './iphone-mockup'
import { SectionHeading } from './section-heading'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** `intro` is the hero copy: beside the phones on desktop, above them on smaller screens. */
export function HeroPreview({ intro }: { intro: ReactNode }) {
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
        // The phones spread apart as the stage scrolls up through the viewport.
        stage.style.setProperty('--hero-front-x', `${(progress * 40).toFixed(2)}px`)
        stage.style.setProperty('--hero-front-y', `${(progress * 24).toFixed(2)}px`)
        stage.style.setProperty('--hero-back-x', `${(progress * -40).toFixed(2)}px`)
        stage.style.setProperty('--hero-back-y', `${(progress * -24).toFixed(2)}px`)
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
    window.visualViewport?.addEventListener('scroll', requestUpdate, {
      passive: true,
    })
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
    <div ref={stageRef} className="phone-stage relative w-full">
      <div className="grid items-center gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">{intro}</div>

        {/* The phones bleed to the screen edge on phones; on desktop they fill their seven columns. */}
        <div className="relative -mx-6 mt-10 h-[32rem] overflow-hidden sm:h-[37rem] lg:col-span-7 lg:mx-0 lg:mt-0 lg:h-[48rem]">
          <div className="phone-back absolute left-1/2 top-8 w-52 sm:w-64 lg:w-80">
            <IPhoneMockup
              src="/assets/home-screen-widgets.webp"
              alt="iPhone Home Screen with five Steps widgets in different styles, each showing 8,072 steps"
              sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
              eager
            />
          </div>
          <div className="phone-front absolute left-1/2 top-24 w-52 sm:w-64 lg:w-80">
            <IPhoneMockup
              src="/assets/lock-screen-goal-hit.webp"
              alt="iPhone Lock Screen with a Goal hit notification and three step widgets showing 8,072 steps"
              sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
              eager
            />
          </div>
        </div>
      </div>
      {/* Padding, not margin, so it adds to the eyebrow's own margin the way a PageSection does. */}
      <div className="pt-16">
        <SectionHeading eyebrow="Widget gallery" title="Find Your Style.">
          Minimal step counts, progress rings, hourly charts, and Lock Screen gauges keep your progress visible across iPhone, Apple Watch, and Mac.
        </SectionHeading>
      </div>

      <div className="relative -mx-6 mt-12 h-100 overflow-hidden lg:-mx-8">
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
