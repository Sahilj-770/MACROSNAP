'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative w-full py-28 sm:py-36 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050B07] text-cream overflow-hidden">
      {/* Bioluminescent Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(216,243,67,0.08)_0%,_transparent_65%)] pointer-events-none filter blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        {/* Subtle Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-chartreuse text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evidence Over Marketing</span>
        </div>

        {/* Powerful Closing Statement */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif text-white tracking-tight leading-[0.98]">
          Food is biology. <br />
          <span className="text-chartreuse italic font-normal">Not marketing.</span>
        </h2>

        {/* Minimal Supporting Text */}
        <p className="text-sm sm:text-base md:text-lg font-mono text-cream/70 max-w-xl mx-auto leading-relaxed">
          Make evidence-informed nutrition decisions. Uncover the true protein density and rupee economics of everyday kitchen staples today.
        </p>

        {/* One Prominent CTA */}
        <div className="pt-4 flex justify-center">
          <Link
            href="/explore"
            className="min-h-[50px] px-10 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_35px_rgba(216,243,67,0.35)] flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <span>Explore 30+ Pantry Staples</span>
            <ArrowRight className="w-4 h-4 text-forest" />
          </Link>
        </div>

        {/* Bottom Credibility Note */}
        <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono text-cream/50">
          <ShieldCheck className="w-4 h-4 text-chartreuse" />
          <span>100% Unbranded · ICMR-NIN IFCT Benchmarked Methodology</span>
        </div>
      </div>
    </section>
  )
}
