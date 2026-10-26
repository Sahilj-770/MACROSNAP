'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Compass,
  Scale,
  TrendingDown,
  CookingPot,
  Search,
  Calculator,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const INSTRUMENTS = [
  {
    num: '01',
    tag: 'EXPLORE // DIRECTORY',
    title: 'Food Intelligence Index',
    desc: 'Deep nutritional profiles, DIAAS bioavailability scores, and protein density across 30+ staples.',
    href: '/explore',
    cta: 'Explore Directory',
    bg: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    icon: Compass,
  },
  {
    num: '02',
    tag: 'SHOWDOWN // ENGINE',
    title: 'Head-to-Head Compare',
    desc: 'Compare any packaged supermarket snack with homemade alternatives side-by-side.',
    href: '/compare',
    cta: 'Launch Compare',
    bg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    icon: Scale,
  },
  {
    num: '03',
    tag: 'ECONOMICS // BUDGET',
    title: 'Protein on a Budget',
    desc: 'Discover maximum protein per rupee spent with national wholesale and kirana benchmarks.',
    href: '/budget',
    cta: 'View Economics',
    bg: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    icon: TrendingDown,
  },
  {
    num: '04',
    tag: 'RECIPES // KITCHEN LAB',
    title: 'Whole Food Recipes',
    desc: 'High-protein, 15-minute homemade alternatives that beat expensive packaged snacks.',
    href: '/recipes',
    cta: 'Open Recipes',
    bg: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    icon: CookingPot,
  },
  {
    num: '05',
    tag: 'DECODER // INGREDIENTS',
    title: 'Ingredient Label Decoder',
    desc: 'Unmask marketing tricks, maltitol spikes, disguised palm oils, and front-of-pack claims.',
    href: '/labels',
    cta: 'Decode Labels',
    bg: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    icon: Search,
  },
  {
    num: '06',
    tag: 'TARGETS // CALCULATOR',
    title: 'Macro & DIAAS Calculator',
    desc: 'Calculate personalized daily protein and leucine thresholds for your exact bodyweight.',
    href: '/calculator',
    cta: 'Calculate Targets',
    bg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    icon: Calculator,
  },
]

export function InstrumentsDeck() {
  return (
    <section
      id="instruments"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-14 bg-transparent text-cream overflow-hidden"
    >
      {/* Ambient Atmospheric Connecting Beam */}
      <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-chartreuse/40 to-transparent mx-auto mb-16 opacity-70" />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHAPTER 06 // THE PRECISION SUITE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight leading-[0.95]">
              Six Precision <br />
              <span className="text-chartreuse italic font-normal">Instruments.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-mono text-cream/70 max-w-md leading-relaxed">
            Independent tools engineered to decode nutritional labels, calculate individual leucine thresholds, and audit protein economics.
          </p>
        </div>

        {/* 6 Instrument Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INSTRUMENTS.map((inst) => {
            const Icon = inst.icon
            return (
              <Link
                key={inst.num}
                href={inst.href}
                className="group relative min-h-[360px] p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-chartreuse hover:bg-white/[0.08] transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden"
              >
                {/* Background Photography with Gradient Overlay */}
                <div className="absolute inset-0 w-full h-full opacity-15 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none">
                  <Image
                    src={inst.bg}
                    alt={inst.title}
                    fill
                    sizes="400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051109] via-[#051109]/75 to-transparent" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-center font-mono">
                    <span className="text-[10px] font-bold text-chartreuse uppercase tracking-widest">
                      {inst.tag}
                    </span>
                    <span className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-chartreuse group-hover:text-forest transition-colors">
                      <Icon className="w-4 h-4 text-cream group-hover:text-forest transition-colors" />
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-cream group-hover:text-chartreuse transition-colors">
                    {inst.title}
                  </h3>

                  <p className="text-xs font-sans text-cream/75 leading-relaxed">
                    {inst.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold text-cream group-hover:text-chartreuse">
                  <span>{inst.cta}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
