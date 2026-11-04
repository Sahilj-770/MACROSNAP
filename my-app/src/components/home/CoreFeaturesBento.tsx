'use client'

import React from 'react'
import Link from 'next/link'
import {
  TrendingUp,
  Dna,
  FileSearch,
  CookingPot,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Sparkles,
} from 'lucide-react'

export function CoreFeaturesBento() {
  return (
    <section id="features" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#070F0A] text-cream">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            Core Intelligence
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            Precision Food Engineering
          </h2>
          <p className="text-sm sm:text-base font-mono text-cream/70 leading-relaxed">
            Four purpose-built instruments to audit food economics, amino acid bioavailability, and deceptive packaging.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1 (Span 8): Cost-per-10g Formula */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0B1710] border border-white/10 flex flex-col justify-between space-y-6 hover:border-chartreuse/40 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-chartreuse/15 text-chartreuse border border-chartreuse/30">
                  Economic Benchmark
                </span>
                <TrendingUp className="w-5 h-5 text-chartreuse" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                The Rupee-per-Protein Formula (₹/10g)
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cream/70 leading-relaxed max-w-xl">
                Measure food by true economic efficiency instead of branding claims. Rank your pantry by real protein yield.
              </p>
            </div>

            {/* Visual: Horizontal Comparison Ladder */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 font-mono text-xs">
              <div className="text-[11px] text-cream/50 uppercase tracking-wider flex justify-between">
                <span>Staple Ranking (Lowest to Highest Cost)</span>
                <span>Cost / 10g Protein</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Dry Soy Chunks (Badi)', cost: '₹2.30', pct: '12%', color: 'bg-chartreuse', highlight: true },
                  { name: 'Roasted Bengal Gram (Chana)', cost: '₹6.60', pct: '28%', color: 'bg-chartreuse/80' },
                  { name: 'Whole Farm Eggs', cost: '₹8.60', pct: '38%', color: 'bg-chartreuse/70' },
                  { name: 'Fresh Kitchen Paneer', cost: '₹22.50', pct: '65%', color: 'bg-white/40' },
                  { name: 'Commercial Protein Bar', cost: '₹60.00', pct: '100%', color: 'bg-tangerine', warning: true },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className={item.highlight ? 'text-chartreuse font-bold' : item.warning ? 'text-tangerine font-bold' : 'text-cream/80'}>
                        {item.name}
                      </span>
                      <strong className={item.highlight ? 'text-chartreuse font-black' : item.warning ? 'text-tangerine font-black' : 'text-white'}>
                        {item.cost}
                      </strong>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full rounded-full ${item.color}`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/budget"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors"
              >
                <span>View Complete ₹/10g Budget Rankings</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2 (Span 4): DIAAS Digestibility */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#0B1710] border border-white/10 flex flex-col justify-between space-y-6 hover:border-chartreuse/40 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-cream border border-white/15">
                  Bioavailability
                </span>
                <Dna className="w-5 h-5 text-chartreuse" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                DIAAS Score Gauge
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cream/70 leading-relaxed">
                Ileal amino acid absorption measured against official ICMR-NIN and FAO benchmarks.
              </p>
            </div>

            {/* Visual: Digestibility Score Cards */}
            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Farm Egg</span>
                  <span className="text-[10px] text-cream/50">Gold Standard Reference</span>
                </div>
                <span className="text-chartreuse font-black text-sm">1.18 DIAAS</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Dal + Rice Combo</span>
                  <span className="text-[10px] text-cream/50">Lysine-Methionine Synergy</span>
                </div>
                <span className="text-chartreuse font-black text-sm">1.05 DIAAS</span>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-white font-bold block">Boiled Soy Chunks</span>
                  <span className="text-[10px] text-cream/50">Cooked Dehulled Meal</span>
                </div>
                <span className="text-chartreuse font-black text-sm">0.98 DIAAS</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/learn"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors"
              >
                <span>Read the Science Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3 (Span 4): FSSAI Label Decoder */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-[#0B1710] border border-white/10 flex flex-col justify-between space-y-6 hover:border-chartreuse/40 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-tangerine/15 text-tangerine border border-tangerine/30">
                  Consumer Defense
                </span>
                <FileSearch className="w-5 h-5 text-tangerine" />
              </div>
              <h3 className="text-xl font-bold font-serif text-white">
                FSSAI Label Decoder
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cream/70 leading-relaxed">
                Detect hidden maltitol laxatives, palm oil humectants, and misleading serving sizes.
              </p>
            </div>

            {/* Visual: Redacted Label Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-2 text-tangerine text-[11px] font-bold">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Front-of-Pack Claim: &quot;20g Protein&quot;</span>
              </div>
              <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/20 text-[11px] text-cream/70 space-y-1">
                <p className="text-tangerine font-bold">Lab Reality Check:</p>
                <p>• 14g Maltitol (Causes osmotic bloating)</p>
                <p>• 8g Palm oil humectant</p>
                <p>• ₹60 per 10g protein markup</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/labels"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors"
              >
                <span>Decode Packaged Labels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4 (Span 8): 15-Minute Kitchen Lab */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#0B1710] border border-white/10 flex flex-col justify-between space-y-6 hover:border-chartreuse/40 transition-all shadow-xl">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-chartreuse/15 text-chartreuse border border-chartreuse/30">
                  Kitchen Execution
                </span>
                <CookingPot className="w-5 h-5 text-chartreuse" />
              </div>
              <h3 className="text-2xl font-bold font-serif text-white">
                15-Minute Kitchen Lab &amp; Pantry Matcher
              </h3>
              <p className="text-xs sm:text-sm font-mono text-cream/70 leading-relaxed max-w-xl">
                High-yield vegetarian and egg-based recipes designed for student dorms, busy professionals, and budget kitchens.
              </p>
            </div>

            {/* Visual: Recipe Preview Snippets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] text-chartreuse uppercase font-bold block">12 Mins Prep</span>
                <strong className="text-white block font-serif text-sm">Soya Bhurji</strong>
                <div className="flex justify-between text-cream/60 text-[11px] pt-1 border-t border-white/5">
                  <span>Protein: <strong>32g</strong></span>
                  <span className="text-chartreuse font-bold">₹18</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] text-chartreuse uppercase font-bold block">8 Mins Prep</span>
                <strong className="text-white block font-serif text-sm">Kala Chana Chaat</strong>
                <div className="flex justify-between text-cream/60 text-[11px] pt-1 border-t border-white/5">
                  <span>Protein: <strong>18g</strong></span>
                  <span className="text-chartreuse font-bold">₹14</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-[10px] text-chartreuse uppercase font-bold block">3 Mins Prep</span>
                <strong className="text-white block font-serif text-sm">Sattu Power Drink</strong>
                <div className="flex justify-between text-cream/60 text-[11px] pt-1 border-t border-white/5">
                  <span>Protein: <strong>20g</strong></span>
                  <span className="text-chartreuse font-bold">₹12</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors"
              >
                <span>Browse All 15-Minute Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
