'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react'

export function FernhollowBotanicalHero() {
  const [uiLoaded, setUiLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUiLoaded(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  const scrollToContent = () => {
    const nextSection = document.getElementById('food-intelligence')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-between items-center select-none text-[#20271D] pt-32 pb-12 px-6 sm:px-12 overflow-hidden bg-[#F3F6F4]">
      {/* 
        Natural Light Botanical Wash 
        Soft morning sunlight diffused through olive and sage botanical foliage
      */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(243, 246, 244, 0.4) 65%, rgba(220, 228, 216, 0.25) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative Natural Light Botanical Leaf Silhouette (Restrained SVG accents) */}
      <div
        className="absolute top-16 -left-20 w-80 h-80 rounded-full bg-[rgba(125,141,57,0.1)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-36 -right-20 w-96 h-96 rounded-full bg-[rgba(91,110,44,0.08)] blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Center Hero Editorial Content */}
      <div
        className={`relative z-10 my-auto text-center flex flex-col items-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${
          uiLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        {/* Curated Botanical Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 text-[#5B6E2C] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-xs border border-[rgba(91,110,44,0.2)] shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Indian Nutrition Intelligence &bull; ICMR-NIN IFCT 2017</span>
        </div>

        {/* Master Headline: Instrument Serif */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#20271D] leading-[0.96] mb-6">
          Know what you eat.
        </h1>

        {/* Clear, Human Editorial Subcopy */}
        <p className="text-base sm:text-xl text-[#737B70] font-sans leading-relaxed max-w-2xl mb-10">
          Discover the true nutritional value and rupee-to-protein economics of authentic Indian staples.
          We benchmark real whole foods against expensive commercial marketing with transparent science.
        </p>

        {/* Carefully Positioned CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/explore"
            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-sm font-semibold tracking-wide shadow-md transition-all duration-300 group"
          >
            <span>Explore Foods</span>
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>

          <Link
            href="/calculator"
            className="px-7 py-3.5 rounded-full bg-white text-[#20271D] hover:bg-[#F3F6F4] text-sm font-medium transition-all duration-200 border border-[rgba(91,110,44,0.25)] shadow-2xs hover:border-[#5B6E2C]"
          >
            Calculate Your Needs
          </Link>

          <Link
            href="/budget"
            className="px-6 py-3.5 rounded-full bg-transparent text-[#5B6E2C] hover:text-[#20271D] text-sm font-medium transition-colors"
          >
            Protein on Budget &rarr;
          </Link>
        </div>

        {/* Real Food Highlights in Natural Light */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full max-w-3xl pt-8 border-t border-[rgba(91,110,44,0.15)]">
          <div className="p-3.5 rounded-2xl bg-white/80 border border-[rgba(91,110,44,0.15)] text-left shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
              Soya Chunks
            </span>
            <strong className="font-display text-xl sm:text-2xl font-bold text-[#5B6E2C]">
              ₹2.31
              <span className="text-xs font-sans font-normal text-[#737B70]"> / 10g</span>
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[rgba(91,110,44,0.15)] text-left shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
              Yellow Moong Dal
            </span>
            <strong className="font-display text-xl sm:text-2xl font-bold text-[#5B6E2C]">
              ₹6.25
              <span className="text-xs font-sans font-normal text-[#737B70]"> / 10g</span>
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[rgba(91,110,44,0.15)] text-left shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
              Roasted Chana
            </span>
            <strong className="font-display text-xl sm:text-2xl font-bold text-[#5B6E2C]">
              ₹6.67
              <span className="text-xs font-sans font-normal text-[#737B70]"> / 10g</span>
            </strong>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/80 border border-[rgba(91,110,44,0.15)] text-left shadow-2xs">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
              Whole Eggs
            </span>
            <strong className="font-display text-xl sm:text-2xl font-bold text-[#5B6E2C]">
              ₹9.68
              <span className="text-xs font-sans font-normal text-[#737B70]"> / 10g</span>
            </strong>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Trust Bar */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mx-auto text-xs font-mono tracking-wider uppercase text-[#737B70] pt-6 transition-opacity duration-1000 gap-3 border-t border-[rgba(91,110,44,0.12)] ${
          uiLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#5B6E2C] font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#7D8D39]" />
            National Institute of Nutrition (ICMR)
          </span>
          <span className="hidden sm:inline text-[#7D8D39]">&bull;</span>
          <span className="hidden sm:inline">100% Independent Public Data</span>
        </div>

        <button
          type="button"
          onClick={scrollToContent}
          className="group flex items-center gap-2 text-[#5B6E2C] hover:text-[#20271D] transition-colors cursor-pointer"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-[#7D8D39] animate-bounce" />
        </button>
      </div>
    </section>
  )
}
