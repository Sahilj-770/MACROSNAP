'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ShieldAlert, ArrowDown, Sparkles } from 'lucide-react'

// Authentic food photography cards for the left & right curtains
const LEFT_CURTAIN_PANELS = [
  {
    id: 'left-1',
    title: 'Soy Chunks & Tofu',
    subtitle: 'Phytoestrogen RCTs',
    image: '/images/food/food_1.webp',
    aspect: 'h-48 sm:h-64 lg:h-76',
    stat: '417 Clinical Trials',
    tilt: -2.5,
  },
  {
    id: 'left-2',
    title: 'Whole Country Eggs',
    subtitle: 'Dietary Cholesterol Study',
    image: '/images/food/food_8.webp',
    aspect: 'h-40 sm:h-52 lg:h-60',
    stat: '100% BV Standard',
    tilt: 1.5,
  },
  {
    id: 'left-3',
    title: 'Sprouted Kala Chana',
    subtitle: 'Bioavailability Indices',
    image: '/images/food/food_0.webp',
    aspect: 'h-44 sm:h-56 lg:h-68',
    stat: 'Phytate Breakdown',
    tilt: -3.5,
  },
]

const RIGHT_CURTAIN_PANELS = [
  {
    id: 'right-1',
    title: 'Pure Hung Curd',
    subtitle: 'Renal Safety Data',
    image: '/images/food/food_2.webp',
    aspect: 'h-48 sm:h-64 lg:h-76',
    stat: '3.3g/kg Safe Intake',
    tilt: 2.5,
  },
  {
    id: 'right-2',
    title: 'Stone-Ground Sattu',
    subtitle: 'Economics vs Marketing',
    image: '/images/food/food_7.webp',
    aspect: 'h-40 sm:h-52 lg:h-60',
    stat: '₹14 vs ₹95 Shake',
    tilt: -1.5,
  },
  {
    id: 'right-3',
    title: 'Fresh Dairy Paneer',
    subtitle: 'Leucine Threshold (2.5g)',
    image: '/images/food/food_9.webp',
    aspect: 'h-44 sm:h-56 lg:h-68',
    stat: 'MPS Trigger Match',
    tilt: 3.5,
  },
]

interface CurtainSplitHeroProps {
  onExploreClick?: () => void
}

export function CurtainSplitHero({ onExploreClick }: CurtainSplitHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const leftCurtainRef = useRef<HTMLDivElement>(null)
  const rightCurtainRef = useRef<HTMLDivElement>(null)
  const centerContentRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLButtonElement>(null)

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Smooth 60/120fps hardware-accelerated scroll-driven curtain kinematics
  useEffect(() => {
    if (prefersReducedMotion) return

    const track = trackRef.current
    const leftCurtain = leftCurtainRef.current
    const rightCurtain = rightCurtainRef.current
    const centerContent = centerContentRef.current
    const promptEl = promptRef.current
    if (!track || !leftCurtain || !rightCurtain || !centerContent) return

    let p = 0
    let target = 0
    let animId: number
    let isDisposed = false

    const clamp = (val: number, min = 0, max = 1) => Math.min(max, Math.max(min, val))
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const onScroll = () => {
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return
      const y = -rect.top
      target = clamp(y / total)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const loop = () => {
      if (isDisposed) return

      // Responsive interpolation with zero input lag (0.18 response speed)
      p += (target - p) * 0.18
      if (Math.abs(target - p) < 0.0001) p = target

      // Smooth curtain split over first 75% of pinned scroll distance
      const splitProgress = easeOutCubic(clamp(p / 0.72))
      const leftDisplace = splitProgress * 130
      const rightDisplace = splitProgress * 130

      // Center statement subtle focus zoom
      const scale = 0.95 + splitProgress * 0.07
      const opacity = 0.85 + splitProgress * 0.15

      // Main-thread bypass: GPU transform updates
      leftCurtain.style.transform = `translate3d(-${leftDisplace}%, 0, 0)`
      rightCurtain.style.transform = `translate3d(${rightDisplace}%, 0, 0)`
      centerContent.style.transform = `scale(${scale})`
      centerContent.style.opacity = `${opacity}`

      if (promptEl) {
        const promptOpacity = clamp(1 - splitProgress * 3.5)
        promptEl.style.opacity = `${promptOpacity}`
        promptEl.style.pointerEvents = promptOpacity < 0.05 ? 'none' : 'auto'
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      isDisposed = true
      cancelAnimationFrame(animId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [prefersReducedMotion])

  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick()
    } else {
      const el = document.getElementById('dossiers')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Reduced motion fallback: static open layout
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full min-h-[80vh] bg-[#F3F6F4] text-[#101410] flex flex-col justify-center items-center px-4 py-16">
        <div className="relative z-10 max-w-2xl text-center flex flex-col items-center justify-center px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest mb-6 shadow-2xs">
            <ShieldAlert className="w-3.5 h-3.5 text-[#08482D]" />
            <span>MacroSnap Clinical Truth Archive</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.04] mb-5">
            Food myths. <br />
            <span className="text-[#08482D]">Pulled apart.</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#5E5E61] max-w-lg leading-relaxed mb-8">
            Question the marketing claims. Follow the clinical evidence. Make informed food decisions
            grounded in metabolic physiology and ICMR-NIN science.
          </p>
          <button
            type="button"
            onClick={handleExplore}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-md active:scale-95 group"
          >
            <span>Explore the Myths</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    )
  }

  return (
    <div ref={trackRef} className="relative w-full h-[180vh]">
      {/* Sticky 100vh Pinned Stage for Pure Silk Curtain Parting */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F3F6F4] text-[#101410] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 select-none">
        {/* Background Subtle Grid & Lighting Accent */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#5B6E2C_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#7D8D39]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        {/* Central Revealed Editorial Statement */}
        <div
          ref={centerContentRef}
          className="relative z-10 max-w-2xl text-center flex flex-col items-center justify-center px-4 will-change-transform"
        >
          {/* Mint Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest mb-6 shadow-2xs">
            <ShieldAlert className="w-3.5 h-3.5 text-[#08482D]" />
            <span>MacroSnap Clinical Truth Archive</span>
          </div>

          {/* Central Bold Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.04] mb-5">
            Food myths. <br />
            <span className="text-[#08482D]">Pulled apart.</span>
          </h1>

          {/* Subline */}
          <p className="text-sm sm:text-base lg:text-lg text-[#5E5E61] max-w-lg leading-relaxed mb-8">
            Question the marketing claims. Follow the clinical evidence. Make informed food decisions
            grounded in metabolic physiology and ICMR-NIN science.
          </p>

          {/* Action Button & Caveat Doodle */}
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={handleExplore}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs sm:text-sm font-bold rounded-full transition-all cursor-pointer shadow-md active:scale-95 group"
            >
              <span>Explore the Myths</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Caveat Handwritten Note */}
            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#5B6E2C] font-semibold">
              <span
                className="text-base text-[#08482D] -rotate-3"
                style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
              >
                Zero bro-science • Verified by randomized trials ↙
              </span>
            </div>
          </div>
        </div>

        {/* 
          ========================================================================
          LEFT CURTAIN GROUP (Staggered Food Dossier Panels)
          ========================================================================
        */}
        <div
          ref={leftCurtainRef}
          className="absolute left-0 top-0 bottom-0 w-[24%] sm:w-[34%] lg:w-[30%] z-20 pointer-events-none flex items-center justify-end pr-1 sm:pr-4 will-change-transform"
        >
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[85px] sm:max-w-[320px]">
            {LEFT_CURTAIN_PANELS.map((panel, i) => (
              <div
                key={panel.id}
                className={`relative w-full ${panel.aspect} rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/80 sm:border-2 bg-white`}
                style={{
                  transform: `rotate(${panel.tilt}deg) translateX(${i * 2}px)`,
                  willChange: 'transform',
                }}
              >
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 85px, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:block hidden" />

                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white hidden sm:block">
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-[#DAE7C7] block">
                    {panel.stat}
                  </span>
                  <p className="font-display text-[10px] sm:text-sm font-bold text-white line-clamp-1">
                    {panel.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/80 line-clamp-1">
                    {panel.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 
          ========================================================================
          RIGHT CURTAIN GROUP (Staggered Food Dossier Panels)
          ========================================================================
        */}
        <div
          ref={rightCurtainRef}
          className="absolute right-0 top-0 bottom-0 w-[24%] sm:w-[34%] lg:w-[30%] z-20 pointer-events-none flex items-center justify-start pl-1 sm:pl-4 will-change-transform"
        >
          <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-[85px] sm:max-w-[320px]">
            {RIGHT_CURTAIN_PANELS.map((panel, i) => (
              <div
                key={panel.id}
                className={`relative w-full ${panel.aspect} rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-white/80 sm:border-2 bg-white`}
                style={{
                  transform: `rotate(${panel.tilt}deg) translateX(-${i * 2}px)`,
                  willChange: 'transform',
                }}
              >
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 85px, 320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:block hidden" />

                <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 text-white hidden sm:block">
                  <span className="text-[8px] sm:text-[10px] font-mono uppercase tracking-wider text-[#DAE7C7] block">
                    {panel.stat}
                  </span>
                  <p className="font-display text-[10px] sm:text-sm font-bold text-white line-clamp-1">
                    {panel.title}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-white/80 line-clamp-1">
                    {panel.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Pull-Apart Affordance Hint */}
        <button
          ref={promptRef}
          type="button"
          onClick={handleExplore}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#5B6E2C]/25 text-xs font-mono text-[#08482D] hover:bg-white transition-colors shadow-xs cursor-pointer will-change-transform"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Scroll down to pull curtains apart</span>
        </button>
      </div>
    </div>
  )
}
