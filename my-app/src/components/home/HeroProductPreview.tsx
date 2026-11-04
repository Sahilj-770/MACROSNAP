'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles, Scale, ArrowRight, ShieldCheck, AlertCircle, TrendingDown } from 'lucide-react'

export function HeroProductPreview() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'budget' | 'plant' | 'dairy'>('all')

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-16 rounded-3xl border border-white/15 bg-[#0B1710]/90 backdrop-blur-xl shadow-2xl shadow-black/80 overflow-hidden text-cream">
      {/* Product Window Header */}
      <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03] flex flex-wrap items-center justify-between gap-3">
        {/* macOS-style Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <span className="ml-2 text-xs font-mono text-cream/50 uppercase tracking-widest hidden sm:inline-block">
            MacroSnap Food Engine v2.4
          </span>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-chartreuse animate-pulse" />
          <span className="text-[11px] font-mono text-chartreuse font-bold uppercase tracking-wider">
            ICMR-NIN IFCT Verified
          </span>
        </div>
      </div>

      {/* Product Search & Filter Bar */}
      <div className="p-5 sm:p-6 border-b border-white/10 bg-[#08120D] space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-cream/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            readOnly
            value="Dry Soy Chunks (Badi) vs Commercial Protein Bar"
            aria-label="Active product comparison search"
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm font-mono text-cream placeholder-cream/40 focus:outline-none cursor-default"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-cream/40 mr-1 text-[11px] uppercase tracking-wider">Filter:</span>
            {[
              { id: 'all', label: 'All Staples' },
              { id: 'budget', label: '₹/10g < ₹10' },
              { id: 'plant', label: 'Plant Power' },
              { id: 'dairy', label: 'Dairy & Eggs' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as typeof activeFilter)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-chartreuse text-forest'
                    : 'bg-white/5 text-cream/70 hover:text-white border border-white/10'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-cream/50 font-mono hidden md:inline-block">
            Showing benchmark comparison
          </span>
        </div>
      </div>

      {/* Main Preview Grid: Side-by-Side Contenders */}
      <div className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-b from-[#0B1710] to-[#070F0A]">
        {/* Contender 1: Kitchen Staple (Soy Chunks) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-chartreuse/40 relative space-y-4 hover:border-chartreuse transition-colors">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-chartreuse/15 text-chartreuse border border-chartreuse/30">
              Kitchen Staple · 52% Protein
            </span>
            <span className="text-xs font-mono text-cream/50">50g Dry Serving</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              Boiled Soy Chunks (Badi)
            </h3>
            <p className="text-xs text-cream/60 font-mono mt-0.5">Unbranded pantry staple</p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 font-mono">
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Cost / 10g</span>
              <strong className="text-base sm:text-lg font-black text-chartreuse">₹2.30</strong>
            </div>
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Protein</span>
              <strong className="text-base sm:text-lg font-black text-white">26.0g</strong>
            </div>
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Serving MRP</span>
              <strong className="text-base sm:text-lg font-black text-white">₹6.00</strong>
            </div>
          </div>

          {/* Biomarker Points */}
          <div className="space-y-2 text-xs font-mono text-cream/80 pt-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-chartreuse flex-shrink-0" />
              <span>DIAAS Digestibility Score: <strong>0.98</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-chartreuse flex-shrink-0" />
              <span>Prebiotic Fiber: <strong>6.5g</strong> (zero laxative alcohols)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-chartreuse flex-shrink-0" />
              <span>Leucine Content: <strong>1.9g</strong> / serving</span>
            </div>
          </div>
        </div>

        {/* Contender 2: Commercial Packaged Bar */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative space-y-4 opacity-90">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-tangerine/15 text-tangerine border border-tangerine/30">
              Commercial Snack · 30% Protein
            </span>
            <span className="text-xs font-mono text-cream/50">67g Bar Serving</span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              Commercial Protein Bar
            </h3>
            <p className="text-xs text-cream/60 font-mono mt-0.5">Standard gym retail brand</p>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/40 border border-white/5 font-mono">
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Cost / 10g</span>
              <strong className="text-base sm:text-lg font-black text-tangerine">₹60.00</strong>
            </div>
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Protein</span>
              <strong className="text-base sm:text-lg font-black text-white">20.0g</strong>
            </div>
            <div>
              <span className="text-[10px] text-cream/50 uppercase block">Retail MRP</span>
              <strong className="text-base sm:text-lg font-black text-white">₹120.00</strong>
            </div>
          </div>

          {/* Additive Points */}
          <div className="space-y-2 text-xs font-mono text-cream/70 pt-1">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-tangerine flex-shrink-0" />
              <span><strong>14g Maltitol</strong> (osmotic laxative sweetener)</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-tangerine flex-shrink-0" />
              <span>Palm oil fraction humectants & fillers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-tangerine flex-shrink-0" />
              <span><strong>26.1x Higher Cost</strong> per gram of protein</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disparity Analysis Footer */}
      <div className="px-5 sm:px-8 py-4 border-t border-white/10 bg-black/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-cream/75">
          <Sparkles className="w-4 h-4 text-chartreuse flex-shrink-0" />
          <span>
            Soy Chunks deliver <strong>30% more protein</strong> at <strong>4% of the cost</strong> with zero sugar alcohols.
          </span>
        </div>

        <Link
          href="/compare?foodA=commercial-protein-bar&foodB=soy-chunks"
          className="text-xs font-mono font-bold text-chartreuse hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          <span>Open Full Interactive Showdown</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
