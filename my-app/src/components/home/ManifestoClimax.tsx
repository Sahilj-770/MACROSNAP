'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react'

export function ManifestoClimax() {
  return (
    <section
      id="manifesto"
      className="relative w-full py-32 sm:py-44 px-4 sm:px-8 lg:px-14 bg-transparent text-cream flex flex-col justify-between items-center text-center overflow-hidden"
    >
      {/* Ambient Atmospheric Connecting Beam */}
      <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-chartreuse/40 to-transparent mx-auto mb-16 opacity-70" />
      {/* Ambient Bioluminescent Radial Halo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,243,67,0.12)_0%,_transparent_65%)] pointer-events-none filter blur-3xl -z-10" />

      {/* Top Tagline */}
      <div className="w-full max-w-7xl flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-cream/50 z-10 pb-8 border-b border-white/10">
        <span>EVIDENCE-BASED NUTRITION</span>
        <span>PEER-REVIEWED BIOAVAILABILITY · ZERO BRANDED BIAS</span>
      </div>

      {/* Main Manifesto Typography */}
      <div className="my-auto max-w-5xl space-y-8 z-10 py-16">
        <div className="space-y-6">
          <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-chartreuse text-forest inline-block shadow-md">
            The Sovereign Manifesto
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-[104px] font-black font-serif text-cream tracking-tight leading-[0.92]">
            FOOD IS BIOLOGY. <br />
            <span className="text-chartreuse italic font-normal">NOT MARKETING.</span>
          </h2>

          <p className="text-base sm:text-xl font-mono text-cream/75 max-w-2xl mx-auto pt-4 leading-relaxed">
            Stop paying 26x markups for synthetic convenience. The highest quality bioavailable protein on Earth is already waiting in your kitchen.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/explore"
            className="px-8 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Explore 30+ Whole Foods</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/calculator"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-chartreuse" />
            <span>Calculate My Daily Target</span>
          </Link>

          <Link
            href="/recipes"
            className="px-8 py-4 rounded-full bg-white/5 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-white/10 hover:border-white transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-cream/70" />
            <span>View 15-Min Recipes</span>
          </Link>
        </div>
      </div>

      {/* Bottom Credibility Strip */}
      <div className="w-full max-w-7xl pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cream/50 gap-4 z-10">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-chartreuse" />
          <span>ILEAL BIOAVAILABILITY BENCHMARKED VIA ICMR-NIN & USDA STANDARDS</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/library" className="hover:text-cream transition-colors">
            SAVED LAB
          </Link>
          <span>·</span>
          <Link href="/learn" className="hover:text-cream transition-colors">
            METHODOLOGY
          </Link>
          <span>·</span>
          <Link href="/basket" className="text-chartreuse font-bold hover:underline">
            VIRTUAL BASKET
          </Link>
        </div>
      </div>
    </section>
  )
}
