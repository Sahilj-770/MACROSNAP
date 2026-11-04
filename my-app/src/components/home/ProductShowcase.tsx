'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Scale, ShieldAlert, Sparkles, TrendingDown } from 'lucide-react'

const SHOWCASE_MATCHUPS = [
  {
    id: 'bar-vs-soy',
    tab: 'Soy Chunks vs Protein Bar',
    disparity: '26.1x Price Gap',
    commercial: {
      tag: 'COMMERCIAL SNACK (67G)',
      name: 'Commercial Protein Bar',
      brand: 'Standard Gym Snack Brand',
      price: '₹120.00',
      protein: '20.0g',
      costPer10g: '₹60.00',
      diaas: '0.84',
      drawbacks: ['14g Maltitol / Sugar Alcohols', 'Palm Oil Humectant Filler', 'Synthetic Polydextrose'],
    },
    staple: {
      tag: 'KITCHEN STAPLE (50G DRY)',
      name: 'Boiled Soy Chunks (Badi)',
      brand: 'Unbranded Pantry Staple',
      price: '₹6.00',
      protein: '26.0g',
      costPer10g: '₹2.30',
      diaas: '0.98',
      benefits: ['Zero Synthetic Additives', '6.5g Prebiotic Dietary Fiber', 'Complete Amino Acid Profile'],
    },
    compareLink: '/compare?foodA=commercial-protein-bar&foodB=soy-chunks',
  },
  {
    id: 'shake-vs-chana',
    tab: 'Roasted Chana vs RTD Shake',
    disparity: '12.0x Price Gap',
    commercial: {
      tag: 'BOTTLED BEVERAGE (200ML)',
      name: 'Ready-to-Drink Protein Shake',
      brand: 'Tetra-Pak Beverage',
      price: '₹95.00',
      protein: '12.0g',
      costPer10g: '₹79.10',
      diaas: '0.88',
      drawbacks: ['Carrageenan Stabilizer', 'Artificial Sweeteners (Sucralose)', 'High Packaging Waste'],
    },
    staple: {
      tag: 'STREET BENCHMARK (50G)',
      name: 'Roasted Bengal Gram (Chana)',
      brand: 'Local Kirana Staple',
      price: '₹7.50',
      protein: '11.3g',
      costPer10g: '₹6.60',
      diaas: '0.82',
      benefits: ['8.4g Insoluble Prebiotic Fiber', 'Low Glycemic Index (GI 28)', 'Zero Cooking / Instant Snack'],
    },
    compareLink: '/compare?foodA=commercial-protein-bar&foodB=roasted-chana',
  },
  {
    id: 'tofu-vs-paneer',
    tab: 'Fresh Paneer vs Vacuum Tofu',
    disparity: 'Plant vs Dairy Casein',
    commercial: {
      tag: 'ORGANIC BLOCK (100G)',
      name: 'Firm Organic Tofu',
      brand: 'Supermarket Vacuum Pack',
      price: '₹35.00',
      protein: '15.5g',
      costPer10g: '₹22.50',
      diaas: '0.92',
      drawbacks: ['Lower Calcium (130mg)', 'Culinary Marinade Required', 'Slightly Lower Leucine Ratio'],
    },
    staple: {
      tag: 'DAIRY BENCHMARK (100G)',
      name: 'Fresh Kitchen Paneer',
      brand: 'Local Dairy Counter',
      price: '₹45.00',
      protein: '18.3g',
      costPer10g: '₹24.60',
      diaas: '1.15',
      benefits: ['480mg Bioavailable Calcium', 'Slow-Digesting Micellar Casein', 'Culinary Versatility'],
    },
    compareLink: '/compare?foodA=paneer-fresh&foodB=tofu-firm',
  },
]

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0)
  const current = SHOWCASE_MATCHUPS[activeTab] ?? SHOWCASE_MATCHUPS[0]!

  return (
    <section id="showcase" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050B07] text-cream">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            Product Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            Put Every Food to the Test
          </h2>
          <p className="text-sm sm:text-base font-mono text-cream/70 leading-relaxed">
            Toggle real matchups to see how packaged convenience compares to whole kitchen staples in cost, digestibility, and purity.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 gap-1.5" role="tablist">
            {SHOWCASE_MATCHUPS.map((matchup, idx) => (
              <button
                key={matchup.id}
                role="tab"
                aria-selected={activeTab === idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  activeTab === idx
                    ? 'bg-chartreuse text-forest shadow-md'
                    : 'text-cream/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {matchup.tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Comparison Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-5xl mx-auto rounded-3xl bg-[#0B1710] border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Disparity Ribbon */}
            <div className="px-6 py-3 bg-[#08120D] border-b border-white/10 flex items-center justify-between font-mono text-xs">
              <span className="text-cream/50 uppercase tracking-widest">
                Interactive Food Analysis
              </span>
              <span className="px-3 py-0.5 rounded-full bg-chartreuse/15 text-chartreuse font-bold border border-chartreuse/30">
                {current.disparity}
              </span>
            </div>

            {/* Side-by-Side Contenders */}
            <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              {/* Contender 1: Commercial */}
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-tangerine uppercase tracking-wider block mb-1">
                    {current.commercial.tag}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {current.commercial.name}
                  </h3>
                  <p className="text-xs font-mono text-cream/50 mt-0.5">
                    {current.commercial.brand}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-black/40 border border-white/5 font-mono">
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Cost / 10g</span>
                    <strong className="text-base sm:text-lg font-black text-tangerine">
                      {current.commercial.costPer10g}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Protein</span>
                    <strong className="text-base sm:text-lg font-black text-white">
                      {current.commercial.protein}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Serving Price</span>
                    <strong className="text-base sm:text-lg font-black text-white">
                      {current.commercial.price}
                    </strong>
                  </div>
                </div>

                {/* Drawbacks */}
                <div className="space-y-2 text-xs font-mono">
                  <span className="text-[10px] text-cream/50 uppercase tracking-wider block font-bold">
                    Additive / Profile Flags:
                  </span>
                  {current.commercial.drawbacks.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-cream/70">
                      <X className="w-4 h-4 text-tangerine flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contender 2: Whole Food Staple */}
              <div className="space-y-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-chartreuse uppercase tracking-wider block mb-1">
                    {current.staple.tag}
                  </span>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    {current.staple.name}
                  </h3>
                  <p className="text-xs font-mono text-cream/50 mt-0.5">
                    {current.staple.brand}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 p-4 rounded-2xl bg-black/40 border border-chartreuse/20 font-mono">
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Cost / 10g</span>
                    <strong className="text-base sm:text-lg font-black text-chartreuse">
                      {current.staple.costPer10g}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Protein</span>
                    <strong className="text-base sm:text-lg font-black text-white">
                      {current.staple.protein}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-cream/50 uppercase block">Serving Price</span>
                    <strong className="text-base sm:text-lg font-black text-white">
                      {current.staple.price}
                    </strong>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-2 text-xs font-mono">
                  <span className="text-[10px] text-cream/50 uppercase tracking-wider block font-bold">
                    Whole Food Advantages:
                  </span>
                  {current.staple.benefits.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-cream/90">
                      <Check className="w-4 h-4 text-chartreuse flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Showcase Action Bar */}
            <div className="px-6 sm:px-10 py-5 bg-black/50 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-cream/60">
                Benchmarked with ICMR-NIN IFCT tables and national retail MRP averages.
              </span>

              <Link
                href={current.compareLink}
                className="px-6 py-2.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-md flex items-center gap-2"
              >
                <span>Open Full Showdown in App</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
