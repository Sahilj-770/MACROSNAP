'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowDown, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const AMINO_NODES = [
  { code: 'LEU', name: 'Leucine', role: 'mTOR Trigger (2.7g)', pos: 'top-[22%] left-[8%]' },
  { code: 'ISO', name: 'Isoleucine', role: 'Glucose Uptake', pos: 'top-[18%] right-[10%]' },
  { code: 'VAL', name: 'Valine', role: 'Tissue Regeneration', pos: 'bottom-[28%] left-[10%]' },
  { code: 'LYS', name: 'Lysine', role: 'Collagen Matrix', pos: 'bottom-[25%] right-[8%]' },
]

export function OpeningHero() {
  const containerRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const imageFrameRef = useRef<HTMLDivElement>(null)
  const metaStripRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Line reveal timeline
      const lines = headlineRef.current?.querySelectorAll('.hero-line')
      if (lines && lines.length > 0) {
        gsap.from(lines, {
          y: 70,
          opacity: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })
      }

      if (metaStripRef.current) {
        gsap.from(metaStripRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2,
        })
      }

      if (badgesRef.current) {
        const badges = badgesRef.current.children
        gsap.from(badges, {
          y: 40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.4,
          clearProps: 'transform,opacity',
        })
      }

      // Parallax image movement on scroll
      if (imageFrameRef.current && containerRef.current) {
        gsap.to(imageFrameRef.current, {
          y: 120,
          scale: 1.08,
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
      className="relative w-full min-h-[92vh] lg:min-h-screen flex flex-col justify-between px-4 sm:px-8 lg:px-14 py-8 bg-[#FAF7F0] text-forest overflow-hidden"
    >
      {/* Top Editorial Status Strip */}
      <div
        ref={metaStripRef}
        className="w-full flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-forest/75 z-20 pb-4 border-b border-forest/15"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-chartreuse border border-forest animate-ping" />
          <span className="font-bold text-forest">MACROSNAP // ISSUE 2026.1</span>
          <span className="hidden sm:inline text-forest/40">/</span>
          <span className="hidden sm:inline text-forest/60">AUTONOMOUS RESEARCH</span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="hidden md:inline text-forest/60">ICMR-NIN IFCT BENCHMARKED</span>
          <span className="px-2.5 py-0.5 rounded-full bg-forest text-chartreuse font-bold text-[10px]">
            100% UNBRANDED
          </span>
        </div>
      </div>

      {/* Hero Body Composition */}
      <div className="relative my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Stepped Editorial Typography */}
        <div ref={headlineRef} className="lg:col-span-7 space-y-6">
          <div className="overflow-hidden">
            <div className="hero-line inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Nutrition Atelier</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="overflow-hidden">
              <h1 className="hero-line text-6xl sm:text-7xl lg:text-8xl xl:text-[102px] font-black font-serif text-forest tracking-tight leading-[0.9] uppercase">
                Know What
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line text-6xl sm:text-7xl lg:text-8xl xl:text-[102px] font-black font-serif text-forest tracking-tight leading-[0.9] uppercase">
                Fuels Your
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="hero-line text-6xl sm:text-7xl lg:text-8xl xl:text-[102px] font-black font-serif text-tangerine italic font-normal tracking-tight leading-[0.9]">
                Biology.
              </h1>
            </div>
          </div>

          <div className="overflow-hidden pt-2">
            <p className="hero-line text-base sm:text-lg text-forest/80 max-w-xl font-sans leading-relaxed">
              Reclaiming nutritional economics from ₹120 ultra-processed fitness bars.
              Discover authentic whole food density, complete amino profiles, and verified Indian pantry staples.
            </p>
          </div>

          <div className="overflow-hidden pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToNext}
              className="px-7 py-3.5 rounded-full bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest/90 transition-all shadow-md flex items-center gap-2.5 cursor-pointer active:scale-95"
            >
              <span>Enter The Story</span>
              <ArrowDown className="w-4 h-4 text-chartreuse animate-bounce" />
            </button>

            <Link
              href="/explore"
              className="px-6 py-3.5 rounded-full bg-white border border-forest/20 text-forest font-mono text-xs font-bold uppercase tracking-wider hover:border-forest transition-colors flex items-center gap-2 shadow-2xs"
            >
              <span>Explore 30+ Staples</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: High-Impact Photography Frame */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-2 border-forest/15 bg-forest-deep">
            <div ref={imageFrameRef} className="absolute inset-0 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=85"
                alt="Nutrient dense whole food composition"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-black/20" />
            </div>

            {/* Overlaid Editorial Metadata */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-cream z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                PROVENANCE // 01
              </span>
              <span className="text-chartreuse font-bold">52% DENSITY</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10 font-mono text-cream">
              <span className="text-[10px] uppercase text-chartreuse font-bold tracking-widest block">
                THE PANTRY BENCHMARK
              </span>
              <p className="text-xl font-black font-serif text-white leading-tight">
                Soy Chunks: ₹2.30 per 10g Protein
              </p>
              <p className="text-xs text-cream/70">
                26x lower cost than commercial protein snacks. Zero synthetic polyols.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Amino Nodes (Desktop Visual Accents) */}
      <div className="hidden xl:block absolute inset-0 pointer-events-none z-10">
        {AMINO_NODES.map((node) => (
          <div
            key={node.code}
            className={`absolute ${node.pos} px-3 py-1.5 rounded-full bg-white/80 border border-forest/15 shadow-sm backdrop-blur-sm text-[10px] font-mono text-forest flex items-center gap-2`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-chartreuse border border-forest" />
            <strong className="font-bold">{node.code}</strong>
            <span className="text-forest/60">· {node.role}</span>
          </div>
        ))}
      </div>

      {/* Bottom Telemetry HUD Badges */}
      <div
        ref={badgesRef}
        className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 z-20 pt-6 border-t border-forest/15"
      >
        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-forest/15 hover:border-forest/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-forest/60 block">Bioavailability</span>
            <strong className="text-xl font-black font-serif text-forest">DIAAS &gt; 1.18</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-chartreuse text-forest">
            Egg Standard
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-forest/15 hover:border-forest/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-forest/60 block">Protein Density</span>
            <strong className="text-xl font-black font-serif text-forest">52g / 100g</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-tangerine/15 text-tangerine">
            Soy Chunks
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-forest/15 hover:border-forest/40 transition-colors flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-forest/60 block">Scientific Audit</span>
            <strong className="text-xl font-black font-serif text-forest">Zero Ad Markup</strong>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-forest text-cream">
            100% Raw Data
          </span>
        </div>
      </div>
    </section>
  )
}
