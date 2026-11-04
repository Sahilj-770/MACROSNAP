'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function OpeningHero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // ─────────────────────────────────────────────────────────────
      // 1. DESKTOP ANIMATION ENVIRONMENT (>= 1024px)
      // ─────────────────────────────────────────────────────────────
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const lines = headlineRef.current?.querySelectorAll('.hero-line')
        if (lines && lines.length > 0) {
          gsap.from(lines, {
            y: 80,
            opacity: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          })
        }

        if (badgesRef.current) {
          gsap.from(badgesRef.current.children, {
            y: 35,
            opacity: 0,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.4,
            clearProps: 'transform,opacity',
          })
        }

        if (bgImageRef.current && containerRef.current) {
          gsap.to(bgImageRef.current, {
            scale: 1.2,
            y: 100,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }

        if (headlineRef.current && containerRef.current) {
          gsap.to(headlineRef.current, {
            y: -60,
            opacity: 0.2,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        }
      })

      // ─────────────────────────────────────────────────────────────
      // 2. MOBILE ANIMATION ENVIRONMENT (< 1024px)
      // Touch-first, modest vertical translates (12-20px), no scroll zoom
      // ─────────────────────────────────────────────────────────────
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        const lines = headlineRef.current?.querySelectorAll('.hero-line')
        if (lines && lines.length > 0) {
          gsap.from(lines, {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
          })
        }

        if (badgesRef.current) {
          gsap.from(badgesRef.current.children, {
            y: 16,
            opacity: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power2.out',
            delay: 0.2,
            clearProps: 'transform,opacity',
          })
        }
      })

      // ─────────────────────────────────────────────────────────────
      // 3. REDUCED MOTION ENVIRONMENT
      // Content immediately resting and visible, zero scroll scrub
      // ─────────────────────────────────────────────────────────────
      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (headlineRef.current) {
          gsap.set(headlineRef.current.querySelectorAll('.hero-line'), { opacity: 1, y: 0 })
        }
        if (badgesRef.current) {
          gsap.set(badgesRef.current.children, { opacity: 1, y: 0 })
        }
        if (bgImageRef.current) {
          gsap.set(bgImageRef.current, { scale: 1, y: 0, opacity: 0.6 })
        }
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  const scrollToNext = () => {
    const nextSection = document.getElementById('telemetry')
    if (nextSection) {
      if (typeof window !== 'undefined' && (window as unknown as { __lenis?: { scrollTo: Function } }).__lenis) {
        ;(window as unknown as { __lenis: { scrollTo: Function } }).__lenis.scrollTo(nextSection, {
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
      } else {
        nextSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <section
      ref={containerRef}
      id="opening"
      className="relative w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 lg:px-14 py-8 sm:py-12 bg-[#050B07] text-cream overflow-hidden"
    >
      {/* FULL-BLEED CINEMATIC PHOTOGRAPHIC BACKDROP */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 transform-gpu"
      >
        <Image
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2400&q=90"
          alt="Cinematic macro composition of whole nutrient dense foods"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] contrast-[1.12]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B07] via-[#050B07]/50 to-[#050B07]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(5,11,7,0.85)_80%)]" />
      </div>

      {/* MONUMENTAL EDITORIAL TITLE CARD */}
      <div
        ref={headlineRef}
        className="relative z-20 my-auto text-center space-y-6 max-w-6xl px-2 py-10 sm:py-16"
      >
        <div className="overflow-hidden">
          <div className="hero-line inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-chartreuse/40 text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ICMR-NIN Benchmarked Nutrition</span>
          </div>
        </div>

        {/* Stepped Monumental Heading */}
        <div className="space-y-1 sm:space-y-2 select-none">
          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-white tracking-tighter leading-[0.92] uppercase drop-shadow-2xl">
              Know What
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-white tracking-tighter leading-[0.92] uppercase drop-shadow-2xl">
              Fuels Your
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line text-4xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-chartreuse italic font-normal tracking-tight leading-[0.92] drop-shadow-[0_0_40px_rgba(216,243,67,0.35)]">
              Biology.
            </h1>
          </div>
        </div>

        {/* Narrative Subtitle */}
        <div className="overflow-hidden max-w-2xl mx-auto pt-2 sm:pt-3">
          <p className="hero-line text-xs sm:text-base md:text-lg font-mono text-cream/80 uppercase tracking-widest leading-relaxed">
            Real foods, verified bioavailability, and honest rupee-to-protein economics — without the marketing markup.
          </p>
        </div>

        {/* Primary Action Buttons (min 44px touch targets on mobile) */}
        <div className="overflow-hidden pt-4 sm:pt-6 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <button
            onClick={scrollToNext}
            className="min-h-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(216,243,67,0.4)] flex items-center gap-2.5 sm:gap-3 cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label="Scroll to Chapter 2 Nutritional Science"
          >
            <span>Explore The Science</span>
            <ArrowDown className="w-4 h-4 text-forest animate-bounce" />
          </button>

          <Link
            href="/explore"
            className="min-h-[44px] px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:border-chartreuse hover:text-chartreuse hover:scale-105 transition-all flex items-center gap-2 shadow-xl focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <span>Browse 30+ Pantry Staples</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* BOTTOM EDITORIAL STAT TILES */}
      <div
        ref={badgesRef}
        className="relative z-20 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10"
      >
        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Bioavailability</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">DIAAS &gt; 1.18</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-chartreuse text-forest">
            Egg Standard
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Protein Density</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">52g / 100g</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FF5E36] text-white">
            Dry Soy Chunks
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Prebiotic Fiber</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">16.8g / 100g</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-chartreuse border border-chartreuse/30">
            Roasted Chana
          </span>
        </div>
      </div>
    </section>
  )
}
