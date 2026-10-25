'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FOOD_MYTHS, NUTRITION_LESSONS } from '@/data/recipes-and-lessons'
import {
  BookOpen,
  HelpCircle,
  Check,
  X,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Flame,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react'

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<'myths' | 'lessons'>('myths')
  const [openMythId, setOpenMythId] = useState<string>(FOOD_MYTHS[0]!.id)

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-forest pb-24">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER (SCIENTIFIC INVESTIGATIVE JOURNAL)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-forest/15 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SECTION 07 // PEER-REVIEWED EVIDENCE & CLINICAL DOSSIERS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-forest tracking-tight leading-[0.94]">
              Deconstruct <br />
              <span className="text-tangerine italic font-normal">The Bro-Science.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-forest/75 max-w-2xl leading-relaxed">
              We parsed the randomized controlled trials and ICMR-NIN dietary databases so fitness influencers and supplement brands can&apos;t drain your stipend.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('myths')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'myths'
                  ? 'bg-forest text-chartreuse shadow-lg scale-105'
                  : 'bg-white text-forest/80 border border-forest/20 hover:border-forest/50'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-tangerine" />
              <span>Myth Busters ({FOOD_MYTHS.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === 'lessons'
                  ? 'bg-forest text-chartreuse shadow-lg scale-105'
                  : 'bg-white text-forest/80 border border-forest/20 hover:border-forest/50'
              }`}
            >
              <Zap className="w-4 h-4 text-chartreuse" />
              <span>60-Sec Lessons ({NUTRITION_LESSONS.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MYTHS TAB: INVESTIGATIVE DOSSIERS
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'myths' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-forest/60 font-bold uppercase tracking-wider">
              <span>Classified Industry Claims Under Investigation</span>
              <span>Click Any Dossier To Unmask</span>
            </div>

            <div className="space-y-4">
              {FOOD_MYTHS.map((myth) => {
                const isOpen = openMythId === myth.id

                return (
                  <motion.div
                    key={myth.id}
                    layout
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                      isOpen
                        ? 'bg-white border-forest shadow-xl'
                        : 'bg-white/80 border-forest/15 hover:border-forest/40 hover:bg-white'
                    }`}
                    onClick={() => setOpenMythId(isOpen ? '' : myth.id)}
                  >
                    {/* Header Row */}
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="w-10 h-10 rounded-2xl bg-tangerine/15 text-tangerine flex items-center justify-center font-bold font-mono text-base shrink-0 border border-tangerine/30">
                          ?
                        </span>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-forest/50 uppercase tracking-widest block">
                            Category: {myth.category} // POPULAR FITNESS FALLACY
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold font-serif text-forest leading-snug">
                            &ldquo;{myth.myth}&rdquo;
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <span className="px-4 py-1.5 rounded-full text-xs font-mono font-black uppercase tracking-widest bg-red-600 text-white shadow-md animate-pulse">
                          {myth.verdict}
                        </span>
                        <span className={`w-8 h-8 rounded-full border border-forest/20 flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-forest text-chartreuse' : 'bg-transparent text-forest'
                        }`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Expandable Evidence Body */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="px-6 sm:px-8 pb-8 space-y-6 border-t border-forest/10 pt-6"
                        >
                          {/* The Truth Banner */}
                          <div className="p-5 rounded-2xl bg-forest text-cream space-y-2 border border-chartreuse/20">
                            <div className="flex items-center gap-2 font-mono text-xs text-chartreuse font-bold uppercase tracking-wider">
                              <Check className="w-4 h-4" />
                              <span>The Biological Reality</span>
                            </div>
                            <p className="text-sm sm:text-base font-sans font-medium text-cream/95 leading-relaxed">
                              {myth.theTruth}
                            </p>
                          </div>

                          {/* Scientific Context & Citation */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-[#FAF7F0] border border-forest/15 space-y-2">
                              <span className="text-[10px] font-mono font-bold text-forest/60 uppercase block tracking-wider">
                                Clinical Trial Evidence & Data
                              </span>
                              <p className="text-xs sm:text-sm text-forest/90 leading-relaxed">
                                {myth.scientificContext}
                              </p>
                            </div>

                            <div className="p-5 rounded-2xl bg-butter/40 border border-forest/15 space-y-2">
                              <span className="text-[10px] font-mono font-bold text-forest/60 uppercase block tracking-wider">
                                Actionable Kitchen Takeaway
                              </span>
                              <p className="text-xs sm:text-sm font-semibold text-forest leading-relaxed">
                                {myth.practicalTakeaway}
                              </p>
                            </div>
                          </div>

                          {/* Source Tag */}
                          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-forest/60 border-t border-forest/10">
                            <span className="truncate">
                              Published Study: {myth.source}
                            </span>
                            <span className="font-bold text-forest shrink-0">
                              Verified Against ICMR-NIN & PubMed
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            LESSONS TAB: 60-SECOND INTEL BRIEFS
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'lessons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono text-forest/60 font-bold uppercase tracking-wider">
              <span>Rapid 60-Second Nutrition Masterclasses</span>
              <span>Read Time ~1 Min</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {NUTRITION_LESSONS.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-forest/15 hover:border-forest transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-forest/5 text-forest font-bold uppercase">
                        {lesson.category}
                      </span>
                      <span className="text-forest/60 flex items-center gap-1">
                        ⏱️ {lesson.readTimeSec}s read
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold font-serif text-forest leading-tight">
                      {lesson.title}
                    </h3>

                    <p className="text-xs font-mono font-semibold text-tangerine">
                      &ldquo;{lesson.headline}&rdquo;
                    </p>

                    <p className="text-xs text-forest/80 leading-relaxed">
                      {lesson.coreLesson}
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-2 pt-2 border-t border-forest/10">
                      {lesson.bulletPoints.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-forest/80">
                          <span className="text-chartreuse font-bold mt-0.5">▸</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Practical Golden Rule */}
                  <div className="p-4 rounded-2xl bg-[#0E2518] text-cream space-y-1 font-mono text-xs">
                    <span className="text-[10px] text-chartreuse uppercase font-bold block">
                      The Golden Rule:
                    </span>
                    <p className="text-cream/90 text-[11px] leading-snug">
                      {lesson.practicalRule}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
