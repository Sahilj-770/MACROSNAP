'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle, ShieldAlert, Sparkles, BookOpen } from 'lucide-react'
import { FOOD_MYTHS } from '@/data/recipes-and-lessons'

export function MythBustersTeaser() {
  const [activeMythIndex, setActiveMythIndex] = useState(0)
  const myth = FOOD_MYTHS[activeMythIndex] || FOOD_MYTHS[0]!

  return (
    <section className="relative py-28 z-10 bg-[#F3F6F4] text-[#101410] border-t border-[#5B6E2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <ShieldAlert className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Clinical Evidence &bull; Peer-Reviewed Dossiers</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.02]">
              Food myths. <br />
              <span className="text-[#08482D]">Pulled apart by data.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5E61] leading-relaxed">
              Separating Indian gym folklore from empirical metabolic literature. We examine soy phytoestrogens, renal safety, and powder marketing with clinical trials.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs shrink-0 group"
          >
            <span>Explore All Evidence Dossiers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Interactive Myth vs Reality Stage */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#5B6E2C]/20 shadow-sm space-y-8">
          
          {/* Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#5B6E2C]/10">
            {FOOD_MYTHS.slice(0, 4).map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMythIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
                  activeMythIndex === idx
                    ? 'bg-[#08482D] text-[#F3F6F4] font-bold shadow-xs'
                    : 'bg-[#F5F8EF] text-[#5E5E61] hover:text-[#101410]'
                }`}
              >
                {m.category}
              </button>
            ))}
          </div>

          {/* Myth vs Fact Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* The Myth */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FF5A22]/5 border border-[#FF5A22]/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF5A22] font-bold">
                  The Locker-Room Myth
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#FF5A22]/15 text-[#FF5A22] text-[10px] font-mono font-bold flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{myth.verdict}</span>
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#101410] leading-snug">
                &ldquo;{myth.myth}&rdquo;
              </h3>

              <p className="text-xs text-[#5E5E61] leading-relaxed pt-2">
                Passed down in gyms for decades without checking peer-reviewed nutritional endocrinology literature.
              </p>
            </div>

            {/* The Verified Science */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#F5F8EF] border border-[#5B6E2C]/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#08482D] font-bold">
                  Clinical Reality
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#08482D]/10 text-[#08482D] text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>PEER-REVIEWED</span>
                </span>
              </div>

              <p className="text-sm sm:text-base font-semibold text-[#101410] leading-relaxed">
                {myth.theTruth}
              </p>

              <p className="text-xs text-[#5E5E61] leading-relaxed border-t border-[#5B6E2C]/10 pt-3">
                <strong className="text-[#08482D] block font-mono text-[10px] uppercase tracking-wider mb-1">
                  Clinical Context:
                </strong>
                {myth.scientificContext}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#5E5E61]">
                <span>Ref: {myth.source}</span>
                <span className="font-caveat text-lg text-[#08482D] font-bold">
                  Empirical literature &gt; gym lore
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
