'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { ShieldAlert, ArrowDown, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react'

// Authentic food photography cards for the left & right curtains
const LEFT_CURTAIN_PANELS = [
  {
    id: 'left-1',
    title: 'Soy Chunks & Tofu',
    subtitle: 'Phytoestrogen RCTs',
    image: '/images/food/food_1.webp',
    aspect: 'h-64 sm:h-80',
    stat: '417 Clinical Trials',
  },
  {
    id: 'left-2',
    title: 'Whole Country Eggs',
    subtitle: 'Dietary Cholesterol Study',
    image: '/images/food/food_8.webp',
    aspect: 'h-52 sm:h-64',
    stat: '100% BV Standard',
  },
  {
    id: 'left-3',
    title: 'Sprouted Kala Chana',
    subtitle: 'Bioavailability Indices',
    image: '/images/food/food_0.webp',
    aspect: 'h-56 sm:h-72',
    stat: 'Phytate Breakdown',
  },
]

const RIGHT_CURTAIN_PANELS = [
  {
    id: 'right-1',
    title: 'Pure Hung Curd',
    subtitle: 'Renal Safety Data',
    image: '/images/food/food_2.webp',
    aspect: 'h-60 sm:h-76',
    stat: '3.3g/kg Safe Intake',
  },
  {
    id: 'right-2',
    title: 'Stone-Ground Sattu',
    subtitle: 'Economics vs Marketing',
    image: '/images/food/food_7.webp',
    aspect: 'h-52 sm:h-64',
    stat: '₹14 vs ₹95 Shake',
  },
  {
    id: 'right-3',
    title: 'Fresh Dairy Paneer',
    subtitle: 'Leucine Threshold (2.5g)',
    image: '/images/food/food_9.webp',
    aspect: 'h-64 sm:h-80',
    stat: 'MPS Trigger Match',
  },
]

interface CurtainSplitHeroProps {
  onExploreClick?: () => void
}

export function CurtainSplitHero({ onExploreClick }: CurtainSplitHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isManualOpen, setIsManualOpen] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Listen to prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Scroll tracking within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth springs for curtain translation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  // Horizontal curtain displacement percentages
  const leftXScroll = useTransform(smoothProgress, [0, 0.65], ['0%', '-115%'])
  const rightXScroll = useTransform(smoothProgress, [0, 0.65], ['0%', '115%'])
  const centerScale = useTransform(smoothProgress, [0, 0.5], [0.94, 1.04])
  const centerOpacity = useTransform(smoothProgress, [0, 0.15, 0.7], [0.85, 1, 0.9])

  const handleExplore = () => {
    setIsManualOpen(true)
    if (onExploreClick) {
      onExploreClick()
    } else {
      const el = document.getElementById('dossiers')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  // Active transforms taking manual toggle or scroll into account
  const leftX = isManualOpen || prefersReducedMotion ? '-115%' : leftXScroll
  const rightX = isManualOpen || prefersReducedMotion ? '115%' : rightXScroll

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[90vh] lg:min-h-screen bg-[#F3F6F4] text-[#101410] overflow-hidden flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 select-none"
    >
      {/* Background Subtle Grid & Lighting Accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#5B6E2C_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#7D8D39]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Central Revealed Editorial Statement (Always positioned in core center) */}
      <motion.div
        style={{
          scale: prefersReducedMotion ? 1 : centerScale,
          opacity: prefersReducedMotion ? 1 : centerOpacity,
        }}
        className="relative z-10 max-w-2xl text-center flex flex-col items-center justify-center px-4"
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
      </motion.div>

      {/* 
        ========================================================================
        LEFT CURTAIN GROUP (Staggered Food Dossier Panels)
        ========================================================================
      */}
      <motion.div
        style={{ x: leftX }}
        transition={{ type: 'spring', damping: 24, stiffness: 120 }}
        className="absolute left-0 top-0 bottom-0 w-[18%] sm:w-[36%] lg:w-[32%] z-20 pointer-events-none flex items-center justify-end pr-0.5 sm:pr-4"
      >
        <div className="flex flex-col gap-2.5 sm:gap-4 w-full max-w-[65px] sm:max-w-[340px]">
          {LEFT_CURTAIN_PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className={`relative w-full ${panel.aspect} rounded-lg sm:rounded-2xl overflow-hidden shadow-lg border border-white/80 sm:border-2 bg-white group transition-transform duration-500`}
              style={{
                transform: `rotate(${i === 0 ? -2 : i === 1 ? 1 : -3}deg) translateX(${i * 2}px)`,
              }}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 70px, 340px"
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
      </motion.div>

      {/* 
        ========================================================================
        RIGHT CURTAIN GROUP (Staggered Food Dossier Panels)
        ========================================================================
      */}
      <motion.div
        style={{ x: rightX }}
        transition={{ type: 'spring', damping: 24, stiffness: 120 }}
        className="absolute right-0 top-0 bottom-0 w-[18%] sm:w-[36%] lg:w-[32%] z-20 pointer-events-none flex items-center justify-start pl-0.5 sm:pl-4"
      >
        <div className="flex flex-col gap-2.5 sm:gap-4 w-full max-w-[65px] sm:max-w-[340px]">
          {RIGHT_CURTAIN_PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className={`relative w-full ${panel.aspect} rounded-lg sm:rounded-2xl overflow-hidden shadow-lg border border-white/80 sm:border-2 bg-white group transition-transform duration-500`}
              style={{
                transform: `rotate(${i === 0 ? 2 : i === 1 ? -2 : 3}deg) translateX(-${i * 2}px)`,
              }}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                priority={i === 0}
                sizes="(max-width: 640px) 70px, 340px"
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
      </motion.div>

      {/* Floating Pull-Apart Affordance Hint (Disappears on split) */}
      {!isManualOpen && (
        <button
          type="button"
          onClick={() => setIsManualOpen(true)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs border border-[#5B6E2C]/20 text-[11px] font-mono text-[#5B6E2C] hover:bg-white transition-all shadow-xs cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-[#FF5A22]" />
          <span>Scroll down or tap to pull curtains apart</span>
        </button>
      )}
    </section>
  )
}
