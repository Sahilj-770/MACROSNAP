'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck, Dna } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AMINO_NODES = [
  { code: 'LEU', name: 'Leucine', role: 'mTOR Trigger (2.7g)', pos: 'top-[26%] left-[6%]' },
  { code: 'ISO', name: 'Isoleucine', role: 'Glucose Uptake', pos: 'top-[22%] right-[8%]' },
  { code: 'VAL', name: 'Valine', role: 'Tissue Synthesis', pos: 'bottom-[32%] left-[8%]' },
  { code: 'LYS', name: 'Lysine', role: 'Collagen Base', pos: 'bottom-[28%] right-[6%]' },
]

export function OpeningHero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // 1. Line-by-line cinematic text reveal
      const lines = headlineRef.current?.querySelectorAll('.hero-line')
      if (lines && lines.length > 0) {
        gsap.from(lines, {
          y: 90,
          opacity: 0,
          stagger: 0.15,
          duration: 1.3,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })
      }

      // 2. Telemetry badges entrance
      if (badgesRef.current) {
        gsap.from(badgesRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          delay: 0.5,
          clearProps: 'transform,opacity',
        })
      }

      // 3. Scroll-driven camera push & zoom into the food
      if (bgImageRef.current && containerRef.current) {
        gsap.to(bgImageRef.current, {
          scale: 1.25,
          y: 120,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 4. Headline depth displacement on scroll
      if (headlineRef.current && containerRef.current) {
        gsap.to(headlineRef.current, {
          y: -80,
          opacity: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    },
    { scope: containerRef }
  )

  const scrollToNext = () => {
    const nextSection = document.getElementById('telemetry')
    if (nextSection) {
      if ((window as any).__lenis) {
        ;(window as any).__lenis.scrollTo(nextSection, {
          duration: 1.4,
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
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-4 sm:px-8 lg:px-14 py-10 bg-[#050B07] text-cream overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          FULL-BLEED CINEMATIC PHOTOGRAPHIC BACKDROP WITH PARALLAX PUSH
      ───────────────────────────────────────────────────────────── */}
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
        {/* Cinematic Multi-Layer Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B07] via-[#050B07]/50 to-[#050B07]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(5,11,7,0.85)_80%)]" />
      </div>

      {/* Top Issue Identifier */}
      <div className="relative z-20 w-full max-w-7xl flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-cream/60 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
          <span className="font-bold text-white tracking-widest">MACROSNAP VOL. 2026</span>
          <span className="hidden sm:inline text-white/30">/</span>
          <span className="hidden sm:inline text-chartreuse font-bold">CINEMATIC ATELIER</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline text-white/50">NIN-ICMR SPECTROMETRY</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 font-bold text-[9px]">
            100% UNBRANDED
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MONUMENTAL FULL-WIDTH EDITORIAL TITLE CARD
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={headlineRef}
        className="relative z-20 my-auto text-center space-y-6 max-w-6xl px-2 py-10"
      >
        <div className="overflow-hidden">
          <div className="hero-line inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-chartreuse/40 text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-xl">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Independent Food Biology Film</span>
          </div>
        </div>

        {/* Stepped Monumental Heading */}
        <div className="space-y-1 sm:space-y-2 select-none">
          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-white tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
              Know What
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-white tracking-tighter leading-[0.88] uppercase drop-shadow-2xl">
              Fuels Your
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-line text-5xl sm:text-7xl md:text-8xl lg:text-[116px] xl:text-[132px] font-black font-serif text-chartreuse italic font-normal tracking-tight leading-[0.88] drop-shadow-[0_0_40px_rgba(216,243,67,0.35)]">
              Biology.
            </h1>
          </div>
        </div>

        {/* Concise Narrative Subtitle */}
        <div className="overflow-hidden max-w-2xl mx-auto pt-3">
          <p className="hero-line text-sm sm:text-base md:text-lg font-mono text-cream/80 uppercase tracking-widest leading-relaxed">
            Reclaiming human nutrition from ₹120 ultra-processed fitness marketing.
            Real foods. Verified ileal bioavailability. Zero industrial fillers.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="overflow-hidden pt-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={scrollToNext}
            className="px-8 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_30px_rgba(216,243,67,0.4)] flex items-center gap-3 cursor-pointer active:scale-95"
          >
            <span>Engage The Film</span>
            <ArrowDown className="w-4 h-4 text-forest animate-bounce" />
          </button>

          <Link
            href="/explore"
            className="px-8 py-4 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:border-chartreuse hover:text-chartreuse hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
          >
            <span>Explore 30+ Pantry Staples</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Floating Ambient Amino Nodes (Desktop Film Accents) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none z-15">
        {AMINO_NODES.map((node) => (
          <div
            key={node.code}
            className={`absolute ${node.pos} px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 shadow-xl backdrop-blur-md text-[10px] font-mono text-cream flex items-center gap-2 animate-pulse`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-chartreuse shadow-[0_0_8px_#D8F343]" />
            <strong className="font-bold text-chartreuse">{node.code}</strong>
            <span className="text-white/60">· {node.role}</span>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM TELEMETRY HUD TILES (GLASS ARCHITECTURE)
      ───────────────────────────────────────────────────────────── */}
      <div
        ref={badgesRef}
        className="relative z-20 w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/10"
      >
        <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Bioavailability</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">DIAAS &gt; 1.18</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-chartreuse text-forest">
            Egg Standard
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Protein Density</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">52g / 100g</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#FF5E36] text-white">
            Soy Chunks
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-white/50 block">Scientific Audit</span>
            <strong className="text-xl sm:text-2xl font-black font-serif text-white">Zero Marketing Markup</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-chartreuse border border-chartreuse/30">
            100% Raw Data
          </span>
        </div>
      </div>
    </section>
  )
}
