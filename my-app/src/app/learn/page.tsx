'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, CheckCircle, XCircle, Sparkles, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react'
import { FOOD_MYTHS } from '@/data/recipes-and-lessons'

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(FOOD_MYTHS[0]?.id ?? null)

  const scrollToDossiers = () => {
    const el = document.getElementById('dossiers')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filteredMyths = FOOD_MYTHS.filter((m) => {
    if (activeCategory === 'All') return true
    return m.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 4))
  })

  return (
    <div className="relative w-full bg-[#F3F6F4] text-[#101410] selection:bg-[#7D8D39] selection:text-white pt-24 pb-20">
      {/* 
        ========================================================================
        HERO (Fresh, Botanical, Editorial in Inter Tight)
        ========================================================================
      */}
      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          {/* Mint Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4 text-[#08482D]" />
            <span>Clinical Evidence &bull; Zero Bro-Science</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#101410] leading-[1.02] mb-6">
            Deconstructing Nutrition Myths <br />
            <span className="text-[#08482D]">with Peer-Reviewed Science.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#5E5E61] max-w-2xl leading-relaxed mb-8">
            Separating Indian gym folklore from empirical metabolic literature. Every dossier is rigorously cross-referenced with ICMR-NIN IFCT standards and randomized controlled clinical trials.
          </p>

          <button
            type="button"
            onClick={scrollToDossiers}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-sm font-semibold rounded-full transition-all cursor-pointer shadow-xs"
          >
            <span>Explore Evidence Dossiers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 
        ========================================================================
        EVIDENCE DOSSIERS SECTION (Light-First Botanical Editorial Layout)
        ========================================================================
      */}
      <section id="dossiers" className="py-24 px-6 md:px-12 max-w-6xl mx-auto bg-[#F3F6F4] text-[#20271D]">
        <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-[#5B6E2C] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span>ICMR-NIN &bull; Peer-Reviewed Scientific Archive</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#20271D] tracking-tight">
            Scientific Myth Demolition Dossiers
          </h2>
          <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-2xl leading-relaxed">
            Every dossier is cross-referenced with randomized controlled trials (RCTs), NIN publications, and clinical dietary standards.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['All', 'Supplements', 'Safety', 'Hormones', 'Economics'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] font-semibold shadow-xs'
                    : 'bg-white text-[#20271D] hover:bg-[rgba(91,110,44,0.08)] border border-[rgba(91,110,44,0.18)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Dossier Cards (Light-first botanical card aesthetic) */}
        <div className="space-y-6">
          {filteredMyths.map((myth) => {
            const isExpanded = expandedId === myth.id
            return (
              <div
                key={myth.id}
                className="rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] overflow-hidden transition-all duration-300 hover:border-[#5B6E2C] shadow-2xs"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : myth.id)}
                  className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] px-2.5 py-1 rounded-full bg-[rgba(125,141,57,0.1)]">
                        {myth.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                          myth.verdict === 'BUSTED'
                            ? 'bg-[#FF5A22]/15 text-[#FF5A22]'
                            : 'bg-[#5B6E2C]/15 text-[#5B6E2C]'
                        }`}
                      >
                        {myth.verdict === 'BUSTED' ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{myth.verdict}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-[#20271D] leading-tight">
                      &ldquo;{myth.myth}&rdquo;
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[rgba(91,110,44,0.08)] flex items-center justify-center shrink-0 text-[#5B6E2C] transition-transform duration-300">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#7D8D39]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 pt-0 border-t border-[rgba(91,110,44,0.12)] space-y-6 text-sm text-[#20271D] animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-2 font-bold">
                        Scientific Reality:
                      </h4>
                      <p className="leading-relaxed text-[#20271D] font-sans">{myth.theTruth}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)]">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] mb-1 font-bold">
                        Clinical Context:
                      </h4>
                      <p className="text-xs leading-relaxed text-[#737B70]">
                        {myth.scientificContext}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-xs text-[#20271D]">
                      <strong className="text-[#5B6E2C] block mb-1">
                        Practical Kitchen Takeaway:
                      </strong>
                      <p>{myth.practicalTakeaway}</p>
                    </div>

                    <div className="text-[11px] font-mono text-[#737B70] pt-2 border-t border-[rgba(91,110,44,0.12)]">
                      Ref: {myth.source}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
