'use client'

import React from 'react'
import Link from 'next/link'
import { Scale, CheckCircle2, BookOpen, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react'

export function FoodIntelligence() {
  return (
    <section id="food-intelligence" className="relative py-24 z-10 bg-[#F3F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7D8D39]" />
            <span>Nutrition Principles &bull; Transparent Science</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-6">
            Nutrition without the marketing noise.
          </h2>
          <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
            Most commercial &ldquo;high-protein&rdquo; snacks carry a 10× to 26× price premium per gram of protein, often masking high sugars and filler oils behind flashy front-of-pack claims. MacroSnap benchmarks authentic Indian staples against empirical scientific food composition tables.
          </p>
        </div>

        {/* 3 Pillars Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs flex flex-col justify-between hover:border-[#5B6E2C] transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#20271D] mb-3">
                The ₹/10g Standard
              </h3>
              <p className="text-xs text-[#737B70] leading-relaxed mb-4">
                We standardize nutritional economics across all foods regardless of manufacturer serving sizes:
              </p>
              <div className="p-3.5 rounded-xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)] text-[11px] font-mono text-[#5B6E2C]">
                Cost / 10g Protein = (Cost / 100g ÷ Protein / 100g) × 10
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between text-xs text-[#7D8D39] font-medium">
              <span>Standardized Economic Yield</span>
              <CheckCircle2 className="w-4 h-4 text-[#7D8D39]" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs flex flex-col justify-between hover:border-[#5B6E2C] transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#7D8D39] text-[#F3F6F4] flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#20271D] mb-3">
                ICMR-NIN IFCT 2017
              </h3>
              <p className="text-xs text-[#737B70] leading-relaxed mb-4">
                Data is sourced from the National Institute of Nutrition Indian Food Composition Tables. No invented numbers or generic Western averages.
              </p>
              <div className="p-3.5 rounded-xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)] text-[11px] font-mono text-[#5B6E2C]">
                528 Indian Foods &bull; 100% Peer-Reviewed
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between text-xs text-[#7D8D39] font-medium">
              <span>NIN Certified Data</span>
              <CheckCircle2 className="w-4 h-4 text-[#7D8D39]" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs flex flex-col justify-between hover:border-[#5B6E2C] transition-colors group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FF5A22] text-[#F3F6F4] flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#20271D] mb-3">
                Packaged Food Traps
              </h3>
              <p className="text-xs text-[#737B70] leading-relaxed mb-4">
                Front-of-pack claims often mask sugar alcohols (maltitol) and cheap collagen filler as premium whey. We break down the real ingredient panels.
              </p>
              <div className="p-3.5 rounded-xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)] text-[11px] font-mono text-[#FF5A22]">
                Maltitol GI = 35 &bull; 2.1 kcal/g impact
              </div>
            </div>
            <Link
              href="/labels"
              className="mt-8 pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between text-xs text-[#FF5A22] font-semibold hover:underline"
            >
              <span>Explore Label Decoder</span>
              <ArrowRight className="w-4 h-4 text-[#FF5A22]" />
            </Link>
          </div>
        </div>

        {/* Quick Food Snapshot Ribbon */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[rgba(91,110,44,0.06)] border border-[rgba(91,110,44,0.18)] flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xs">
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C]">
              Living Nutritional Archive
            </span>
            <span className="font-display text-xl sm:text-2xl font-bold text-[#20271D] mt-1">
              Browse 18 verified Indian staples with real-time macro analysis
            </span>
          </div>

          <Link
            href="/explore"
            className="px-6 py-3 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-xs shrink-0"
          >
            <span>Open Explore Foods</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
