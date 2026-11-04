'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Scale, Sparkles } from 'lucide-react'
import { HeroProductPreview } from '@/components/home/HeroProductPreview'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop animation
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!contentRef.current) return
        gsap.from(contentRef.current.children, {
          y: 35,
          opacity: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })
      })

      // Mobile animation
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
        if (!contentRef.current) return
        gsap.from(contentRef.current.children, {
          y: 18,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        })
      })

      // Reduced motion
      mm.add('(prefers-reduced-motion: reduce)', () => {
        if (!contentRef.current) return
        gsap.set(contentRef.current.children, { opacity: 1, y: 0 })
      })

      return () => mm.revert()
    },
    { scope: containerRef }
  )

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-16 sm:pb-28 bg-[#050B07] text-cream overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(ellipse_at_center,_rgba(216,243,67,0.08)_0%,_transparent_70%)] pointer-events-none filter blur-3xl -z-10" />

      <div ref={contentRef} className="w-full max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 z-10">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-chartreuse text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ICMR-NIN Benchmarked Nutrition</span>
        </div>

        {/* Monumental, Authoritative Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-white tracking-tight leading-[1.02]">
          Real Food Intelligence. <br />
          <span className="text-chartreuse italic font-normal">Zero Marketing Markup.</span>
        </h1>

        {/* Clean Supporting Description (Max 2 lines) */}
        <p className="text-base sm:text-lg md:text-xl font-mono text-cream/70 max-w-2xl mx-auto leading-relaxed">
          Analyze true protein density, bioavailable amino acids, and cost-per-gram economics across traditional Indian staples and commercial alternatives.
        </p>

        {/* Two Clear CTAs */}
        <div className="pt-2 flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <Link
            href="/explore"
            className="min-h-[46px] px-8 py-3.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_25px_rgba(216,243,67,0.3)] flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <span>Explore 30+ Staples</span>
            <ArrowRight className="w-4 h-4 text-forest" />
          </Link>

          <Link
            href="/compare"
            className="min-h-[46px] px-8 py-3.5 rounded-full bg-white/[0.04] border border-white/15 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:border-chartreuse/50 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <Scale className="w-4 h-4 text-chartreuse" />
            <span>Compare Foods</span>
          </Link>
        </div>

        {/* Centerpiece: Product Preview */}
        <HeroProductPreview />
      </div>
    </section>
  )
}
