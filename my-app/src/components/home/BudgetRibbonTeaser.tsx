'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Coins, Check, X, ShieldAlert, Sparkles } from 'lucide-react'

export function BudgetRibbonTeaser() {
  return (
    <section className="relative py-28 z-10 bg-[#F3F6F4] text-[#101410] border-t border-[#5B6E2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <Coins className="w-3.5 h-3.5 text-[#08482D]" />
              <span>Grocery Economics &bull; Rupee-to-Protein</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.02]">
              Hit 100g protein for ₹45. <br />
              <span className="text-[#08482D]">Not ₹250.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5E61] leading-relaxed">
              Western supplements and boutique fitness bars convince you that daily protein requires a ₹300/day subscription. Authentic Indian whole foods provide complete amino acids at a fraction of the cost.
            </p>
          </div>

          <Link
            href="/budget"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs shrink-0 group"
          >
            <span>Explore Protein on Budget</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Side-by-Side Editorial Contrast: Kirana vs Commercial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: The Real Indian Kirana Plan */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#08482D]/20 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#08482D] font-bold">
                  Authentic Whole-Food Daily Foundation
                </span>
                <span className="text-xs font-mono font-bold text-[#08482D] px-2.5 py-1 rounded-full bg-[#DAE7C7]">
                  ₹45.00 Total
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#101410]">
                68g Complete Daily Protein
              </h3>

              {/* Items Breakdown */}
              <div className="space-y-3 font-mono text-xs text-[#5E5E61]">
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F8EF]">
                  <span className="text-[#101410] font-medium">50g Soya Chunks (dry boiled)</span>
                  <span className="text-[#08482D] font-semibold">26g protein &bull; ₹6.00</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F8EF]">
                  <span className="text-[#101410] font-medium">2 Whole Poultry Eggs</span>
                  <span className="text-[#08482D] font-semibold">13g protein &bull; ₹14.00</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F8EF]">
                  <span className="text-[#101410] font-medium">50g Roasted Chana Sattu</span>
                  <span className="text-[#08482D] font-semibold">11g protein &bull; ₹7.50</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F5F8EF]">
                  <span className="text-[#101410] font-medium">1 Bowl Yellow Moong Dal &amp; Curd</span>
                  <span className="text-[#08482D] font-semibold">18g protein &bull; ₹17.50</span>
                </div>
              </div>
            </div>

            {/* Handwritten callout */}
            <div className="pt-4 border-t border-[#5B6E2C]/10 flex items-center justify-between">
              <span className="font-caveat text-xl sm:text-2xl text-[#08482D] font-bold">
                Gym trainers rarely talk about this math &rarr;
              </span>
              <span className="text-xs font-mono text-[#5E5E61]">
                30-day grocery: ~₹1,350
              </span>
            </div>
          </div>

          {/* Right Column: The Packaged Marketing Alternative */}
          <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#101410] text-[#F3F6F4] shadow-md flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A22] font-bold">
                  Commercial Packaged Habit
                </span>
                <span className="text-xs font-mono font-bold text-white px-2.5 py-1 rounded-full bg-[#FF5A22]/20 text-[#FF5A22]">
                  ₹260.00 Total
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                45g Processed Protein
              </h3>

              <div className="space-y-3 font-mono text-xs text-white/70">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span>1 Branded Protein Bar (65g)</span>
                  <span className="text-[#FF5A22]">20g protein &bull; ₹120.00</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span>1 RTD Tetra-pack Shake (200ml)</span>
                  <span className="text-[#FF5A22]">25g protein &bull; ₹140.00</span>
                </div>
              </div>

              <p className="text-xs text-white/60 leading-relaxed pt-2">
                Padded with glycerol, artificial maltitol syrup, hydrogenated palm oils, and packaging overhead.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FF5A22]/15 border border-[#FF5A22]/30 text-xs">
              <strong className="text-[#FF5A22] block font-mono text-[10px] uppercase tracking-wider mb-1">
                Net Annual Difference
              </strong>
              <span className="font-display text-2xl font-bold text-white">
                ₹76,000+ saved / year
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
