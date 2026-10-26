'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShieldCheck, ArrowRight, Dna } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BIOMARKERS = [
  {
    num: '01',
    title: 'Leucine Threshold',
    value: '2.7g',
    unit: 'Per Serving Trigger',
    desc: 'The essential branched-chain amino acid that initiates muscle protein synthesis (MPS) via intracellular mTOR signaling.',
  },
  {
    num: '02',
    title: 'DIAAS Score',
    value: '1.18',
    unit: 'Ileal Digestibility',
    desc: 'Digestible Indispensable Amino Acid Score — the true gold standard of protein quality measured in the human small intestine.',
  },
  {
    num: '03',
    title: 'Prebiotic Fiber Matrix',
    value: '16.8g',
    unit: 'Per 100g Chana',
    desc: 'Insoluble cellular matrix that slows gastric emptying, feeds colon bifidobacteria, and prevents post-meal insulin spikes.',
  },
  {
    num: '04',
    title: 'Zero Synthetic Additives',
    value: '0g',
    unit: 'Whole Food Standard',
    desc: 'No maltitol laxatives, polydextrose humectants, artificial sweeteners, or ultra-processed industrial stabilizers.',
  },
]

export function TelemetryLens() {
  const containerRef = useRef<HTMLElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<SVGSVGElement>(null)
  const innerRingRef = useRef<SVGSVGElement>(null)
  const leftNotesRef = useRef<HTMLDivElement>(null)
  const rightNotesRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // ─────────────────────────────────────────────────────────────
      // 1. DESKTOP ANIMATION ENVIRONMENT (>= 1024px)
      // Expanding circular lens reveal + orbital rotation
      // ─────────────────────────────────────────────────────────────
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!lensRef.current || !containerRef.current) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'center 45%',
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        })

        // Expanding circular lens reveal
        tl.fromTo(
          lensRef.current,
          { clipPath: 'circle(20% at 50% 50%)' },
          { clipPath: 'circle(50% at 50% 50%)', ease: 'power2.inOut', duration: 1 },
          0
        )

        // Inner image subtle zoom
        const img = lensRef.current.querySelector('img')
        if (img) {
          tl.fromTo(img, { scale: 1.25 }, { scale: 1.05, ease: 'power2.out', duration: 1 }, 0)
        }

        // Orbit ring rotations
        if (ringRef.current) {
          tl.fromTo(
            ringRef.current,
            { rotation: -90, transformOrigin: '50% 50%' },
            { rotation: 45, ease: 'none', duration: 1 },
            0
          )
        }

        if (innerRingRef.current) {
          tl.fromTo(
            innerRingRef.current,
            { rotation: 120, transformOrigin: '50% 50%' },
            { rotation: -30, ease: 'none', duration: 1 },
            0
          )
        }

        // Stagger cards
        const allCards = containerRef.current.querySelectorAll('.biomarker-card')
        if (allCards.length > 0) {
          tl.fromTo(
            allCards,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power2.out' },
            0.2
          )
        }
      })

      // ─────────────────────────────────────────────────────────────
      // 2. MOBILE ANIMATION ENVIRONMENT (< 1024px)
      // Clean circular frame, lightweight vertical reveals, no rotation
      // ─────────────────────────────────────────────────────────────
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        if (lensRef.current) {
          gsap.set(lensRef.current, { clipPath: 'circle(50% at 50% 50%)' })
        }

        const cards = containerRef.current?.querySelectorAll('.biomarker-card')
        if (cards && cards.length > 0) {
          gsap.from(cards, {
            opacity: 0,
            y: 16,
            stagger: 0.08,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          })
        }
      })

      // ─────────────────────────────────────────────────────────────
      // 3. REDUCED MOTION ENVIRONMENT
      // Fully resting, zero clip animation, zero rotation
      // ─────────────────────────────────────────────────────────────
      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (lensRef.current) {
          gsap.set(lensRef.current, { clipPath: 'circle(50% at 50% 50%)' })
        }
        const cards = containerRef.current?.querySelectorAll('.biomarker-card')
        if (cards) {
          gsap.set(cards, { opacity: 1, y: 0 })
        }
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="telemetry"
      className="relative w-full py-20 sm:py-32 lg:py-36 px-4 sm:px-8 lg:px-14 bg-transparent text-cream overflow-hidden"
    >
      <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-chartreuse/40 to-transparent mx-auto mb-12 sm:mb-16 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,243,67,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse text-xs font-mono font-bold tracking-widest uppercase">
              <Dna className="w-3.5 h-3.5" />
              <span>CHAPTER 02 // MOLECULAR TELEMETRY</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight leading-[0.95]">
              Food Made <br />
              <span className="text-chartreuse italic font-normal">Tangible.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-mono text-cream/75 max-w-md leading-relaxed">
            Nutritional science is not a checklist of marketing buzzwords. True bioavailability happens at the mucosal border of your small intestine.
          </p>
        </div>

        {/* Central Stage: Telemetry Lens with Surrounding Biomarkers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Left Biomarkers */}
          <div ref={leftNotesRef} className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {BIOMARKERS.slice(0, 2).map((b) => (
              <div
                key={b.num}
                className="biomarker-card p-5 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors space-y-2 group"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-cream/60">
                  <span className="text-chartreuse font-bold">NODE // {b.num}</span>
                  <span className="uppercase">{b.unit}</span>
                </div>
                <strong className="text-2xl sm:text-3xl font-black font-serif text-cream block group-hover:text-chartreuse transition-colors">
                  {b.value}
                </strong>
                <h3 className="text-xs sm:text-sm font-bold font-mono text-cream uppercase">{b.title}</h3>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Stage: Circular Telemetry Lens with Concentric Rings */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 my-4 sm:my-6 lg:my-0">
            <div className="relative w-64 sm:w-88 md:w-[400px] aspect-square flex items-center justify-center">
              {/* Outer Rotating SVG Orbit Ring */}
              <svg
                ref={ringRef}
                viewBox="0 0 440 440"
                className="absolute inset-0 w-full h-full pointer-events-none text-chartreuse/30"
              >
                <circle
                  cx="220"
                  cy="220"
                  r="210"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
                <circle
                  cx="220"
                  cy="10"
                  r="5"
                  fill="#D8F343"
                  className="shadow-[0_0_10px_#D8F343]"
                />
                <circle cx="220" cy="430" r="4" fill="#FF5E36" />
              </svg>

              {/* Inner Orbit Ring */}
              <svg
                ref={innerRingRef}
                viewBox="0 0 440 440"
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] pointer-events-none text-white/20"
              >
                <circle
                  cx="220"
                  cy="220"
                  r="190"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <circle cx="220" cy="30" r="3" fill="#ffffff" />
              </svg>

              {/* Central Circular Lens Frame (defaults to circle 50%) */}
              <div
                ref={lensRef}
                className="relative w-56 sm:w-72 md:w-88 aspect-square rounded-full overflow-hidden shadow-2xl border-2 border-chartreuse/50"
                style={{ clipPath: 'circle(50% at 50% 50%)' }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85"
                  alt="Microscopic whole food nutrient matrix"
                  fill
                  sizes="(max-width: 768px) 250px, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

                <div className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-cream/90 bg-black/60 py-1 backdrop-blur-xs">
                  WHOLE FOOD NUTRIENT MATRIX
                </div>
              </div>
            </div>
          </div>

          {/* Right Biomarkers */}
          <div ref={rightNotesRef} className="lg:col-span-3 space-y-4 sm:space-y-6 order-3">
            {BIOMARKERS.slice(2, 4).map((b) => (
              <div
                key={b.num}
                className="biomarker-card p-5 sm:p-6 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors space-y-2 group"
              >
                <div className="flex justify-between items-center text-[10px] font-mono text-cream/60">
                  <span className="text-chartreuse font-bold">NODE // {b.num}</span>
                  <span className="uppercase">{b.unit}</span>
                </div>
                <strong className="text-2xl sm:text-3xl font-black font-serif text-cream block group-hover:text-chartreuse transition-colors">
                  {b.value}
                </strong>
                <h3 className="text-xs sm:text-sm font-bold font-mono text-cream uppercase">{b.title}</h3>
                <p className="text-xs text-cream/70 leading-relaxed font-sans">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Educational Callout */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-cream/60 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-chartreuse" />
            <span>ILEAL AMINO ACID ASSAYS VERIFIED VIA NIN-ICMR 2017 STANDARDS</span>
          </div>

          <Link
            href="/learn"
            className="text-chartreuse hover:text-white font-bold inline-flex items-center gap-1.5 transition-colors group focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <span>Read The Biological Manifesto</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
