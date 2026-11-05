'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, BookOpen } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="relative py-28 z-10 overflow-hidden bg-[#F3F6F4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="p-10 sm:p-16 rounded-[40px] bg-[#5B6E2C] text-[#F3F6F4] border border-[rgba(91,110,44,0.4)] shadow-xl relative overflow-hidden">
          {/* Subtle natural lighting wash inside card */}
          <div
            className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#7D8D39]/40 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#FF5A22]/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-[#F3F6F4] text-xs font-mono uppercase tracking-widest mb-6 backdrop-blur-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span>Independent Nutrition Intelligence</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            Eat scientifically. <br />
            <span className="italic font-normal text-[#F3F6F4]/90">Spend reasonably.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#F3F6F4]/85 leading-relaxed mb-10">
            Join thousands of informed eaters across India benchmarking everyday staples, decoding supermarket marketing tricks, and hitting protein goals with genuine grocery economics.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#F3F6F4] hover:bg-white text-[#5B6E2C] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md group"
            >
              <BookOpen className="w-4 h-4 text-[#5B6E2C]" />
              <span>Explore Food Archive</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 hover:bg-white/25 text-[#F3F6F4] text-xs font-mono tracking-wider uppercase transition-all duration-300 border border-white/20"
            >
              <span>Calculate Daily Target</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-xs font-mono text-[#F3F6F4]/75">
            <ShieldCheck className="w-4 h-4 text-[#F3F6F4]" />
            <span>Zero sponsored placement &bull; 100% independent public health science</span>
          </div>
        </div>
      </div>
    </section>
  )
}
