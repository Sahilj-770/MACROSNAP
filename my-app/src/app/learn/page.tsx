'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { FOOD_MYTHS } from '@/data/recipes-and-lessons'
import { CurtainSplitHero } from '@/components/ui/curtain-split-hero'

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
    <div className="relative w-full bg-[#F3F6F4] text-[#101410] pt-24 pb-24">
      {/* 
        ========================================================================
        CURTAIN SPLIT HERO COMPONENT
        Two groups of authentic food photography panels pull apart horizontally
        ========================================================================
      */}
      <CurtainSplitHero onExploreClick={scrollToDossiers} />

      {/* 
        ========================================================================
        SCIENTIFIC EVIDENCE DOSSIERS (Editorial Botanical Archive)
        ========================================================================
      */}
      <section id="dossiers" className="pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-[#5B6E2C] text-xs font-mono uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
                <span>ICMR-NIN &bull; Peer-Reviewed Clinical Archive</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#101410] tracking-tight">
                Scientific Myth Demolition Dossiers
              </h2>
              <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
                Every dossier is rigorously cross-referenced with meta-analyses, randomized controlled
                trials (RCTs), NIN publications, and clinical biochemical literature.
              </p>
            </div>

            {/* Caveat Handwritten Callout */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span
                className="text-lg font-bold text-[#08482D] -rotate-2"
                style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
              >
                No fitness influencer myths survive here ↗
              </span>
              <span className="text-xs text-[#7D8D39] font-mono">
                Peer-reviewed clinical evidence only
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['All', 'Supplements', 'Safety', 'Hormones', 'Economics'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] font-bold shadow-xs'
                    : 'bg-white text-[#5E5E61] hover:text-[#101410] hover:bg-[#F3F6F4] border border-[#5B6E2C]/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dossier Cards List */}
        <div className="space-y-6">
          {filteredMyths.map((myth) => {
            const isExpanded = expandedId === myth.id
            return (
              <div
                key={myth.id}
                className={`rounded-3xl bg-white border transition-all duration-300 overflow-hidden shadow-2xs ${
                  isExpanded ? 'border-[#5B6E2C] ring-1 ring-[#5B6E2C]/20' : 'border-[#5B6E2C]/15 hover:border-[#5B6E2C]/40'
                }`}
              >
                {/* Header Row Click Target */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : myth.id)}
                  className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] px-2.5 py-0.5 rounded-full bg-[#5B6E2C]/10 font-bold">
                        {myth.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                          myth.verdict === 'BUSTED'
                            ? 'bg-[#FF5A22]/15 text-[#FF5A22]'
                            : 'bg-[#5B6E2C]/15 text-[#5B6E2C]'
                        }`}
                      >
                        {myth.verdict === 'BUSTED' ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        )}
                        <span>VERDICT: {myth.verdict}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-[#101410] font-bold leading-snug">
                      &ldquo;{myth.myth}&rdquo;
                    </h3>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isExpanded
                        ? 'bg-[#5B6E2C] text-white border-[#5B6E2C]'
                        : 'bg-[#F3F6F4] text-[#5B6E2C] border-[#5B6E2C]/15 hover:bg-white'
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Clinical Dossier Body */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 pt-0 border-t border-[#5B6E2C]/10 space-y-6 animate-in fade-in duration-300">
                    
                    {/* Myth vs Fact Two-Column Bento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="p-5 rounded-2xl bg-[#FF5A22]/5 border border-[#FF5A22]/20">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF5A22] uppercase tracking-wider mb-2">
                          <XCircle className="w-4 h-4" />
                          <span>The Deceptive Claim</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#5E5E61] leading-relaxed">
                          {myth.myth}
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#5B6E2C]/5 border border-[#5B6E2C]/25">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#08482D] uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>The Biochemical Reality</span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#101410] font-medium leading-relaxed">
                          {myth.theTruth}
                        </p>
                      </div>
                    </div>

                    {/* Scientific Context Box */}
                    <div className="p-5 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7D8D39] uppercase tracking-wider mb-2">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Clinical Trial & Physiological Analysis</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#5E5E61] leading-relaxed">
                        {myth.scientificContext}
                      </p>
                    </div>

                    {/* Practical Takeaway Card */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#08482D]/10 border border-[#08482D]/20 text-[#101410]">
                      <strong className="text-xs font-mono uppercase tracking-wider text-[#08482D] block mb-1">
                        Practical Kitchen Rule:
                      </strong>
                      <p className="text-xs sm:text-sm leading-relaxed">{myth.practicalTakeaway}</p>
                    </div>

                    {/* Source Citation */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#737B70] pt-3 border-t border-[#5B6E2C]/10">
                      <span>Primary Scientific Citation:</span>
                      <span className="font-semibold text-[#101410] text-right">{myth.source}</span>
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
