'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ArrowRight, Scale, ShieldAlert, Award } from 'lucide-react'

const MATCHUPS = [
  {
    id: 'bar-vs-soy',
    tab: '01 // BAR VS SOY CHUNKS',
    subtitle: 'THE 26X COST & SYNTHETIC FILLER PARADOX',
    commercial: {
      tag: 'PACKAGED BAR (67G)',
      name: 'Commercial Protein Bar',
      brand: 'Standard Gym Snack Brand',
      price: '₹120.00',
      protein: '20g',
      costPer10g: '₹60.00',
      densityPercent: 30,
      drawbacks: ['14g Maltitol / Sugar Alcohols', 'Palm Oil Humectant', 'Synthetic Polydextrose Filler'],
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    },
    staple: {
      tag: 'KITCHEN STAPLE (50G DRY)',
      name: 'Boiled Soy Chunks (Badi)',
      brand: 'Unbranded Pantry Staple',
      price: '₹6.00',
      protein: '26g',
      costPer10g: '₹2.30',
      densityPercent: 52,
      benefits: ['Zero Synthetic Additives', '6.5g Prebiotic Dietary Fiber', 'Complete Amino Acid Profile'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    },
    compareLink: '/compare?foodA=commercial-protein-bar&foodB=soy-chunks',
  },
  {
    id: 'shake-vs-chana',
    tab: '02 // RTD SHAKE VS CHANA',
    subtitle: 'ULTRA-PROCESSED CONVENIENCE VS ZERO-COOK REAL FOOD',
    commercial: {
      tag: 'BOTTLED SHAKE (200ML)',
      name: 'Commercial Ready-to-Drink Shake',
      brand: 'Tetra-Pak Protein Beverage',
      price: '₹95.00',
      protein: '12g',
      costPer10g: '₹79.10',
      densityPercent: 24,
      drawbacks: ['Carrageenan Stabilizer', 'Artificial Sweeteners (Sucralose)', 'High Packaging Waste'],
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80',
    },
    staple: {
      tag: 'STREET BENCHMARK (50G)',
      name: 'Roasted Bengal Gram (Chana)',
      brand: 'Local Kirana Staple',
      price: '₹7.50',
      protein: '11.3g',
      costPer10g: '₹6.60',
      densityPercent: 68,
      benefits: ['8.4g Insoluble Prebiotic Fiber', 'Low Glycemic Index (GI 28)', 'Zero Cooking / Instant Snack'],
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1200&q=80',
    },
    compareLink: '/compare?foodA=roasted-chana&foodB=commercial-protein-bar',
  },
  {
    id: 'tofu-vs-paneer',
    tab: '03 // TOFU VS DESI PANEER',
    subtitle: 'PLANT CALORIE EFFICIENCY VS SUSTAINED CASEIN SYNTHESIS',
    commercial: {
      tag: 'ORGANIC BLOCK (100G)',
      name: 'Firm Organic Tofu',
      brand: 'Supermarket Vacuum Pack',
      price: '₹35.00',
      protein: '15.5g',
      costPer10g: '₹22.50',
      densityPercent: 54,
      drawbacks: ['Lower Calcium (130mg)', 'Culinary Marinade Required', 'Slightly Lower Leucine Ratio'],
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=1200&q=80',
    },
    staple: {
      tag: 'DAIRY MONARCH (100G)',
      name: 'Fresh Cow Milk Paneer',
      brand: 'Local Dairy / Dairy Booth',
      price: '₹45.00',
      protein: '18.3g',
      costPer10g: '₹24.50',
      densityPercent: 62,
      benefits: ['480mg Bioavailable Calcium', 'Sustained 6-Hour Casein Release', 'Conjugated Linoleic Acid (CLA)'],
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
    },
    compareLink: '/compare?foodA=paneer-raw&foodB=firm-tofu',
  },
]

export function ShowdownArena() {
  const [activeTab, setActiveTab] = useState<string>('bar-vs-soy')
  const current = MATCHUPS.find((m) => m.id === activeTab) || MATCHUPS[0]!

  return (
    <section
      id="showdown"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-14 bg-transparent text-cream overflow-hidden"
    >
      {/* Ambient Atmospheric Connecting Beam */}
      <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-chartreuse/40 to-transparent mx-auto mb-16 opacity-70" />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold tracking-widest uppercase">
              <Scale className="w-3.5 h-3.5" />
              <span>CHAPTER 04 // THE DUAL RECKONING ARENA</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight leading-[0.95]">
              The Nutritional <br />
              <span className="text-chartreuse italic font-normal">Reckoning.</span>
            </h2>
          </div>

          {/* Interactive Matchup Tab Switcher */}
          <div className="flex flex-wrap gap-2">
            {MATCHUPS.map((m) => {
              const isActive = m.id === activeTab
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveTab(m.id)}
                  className={`relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive ? 'text-forest' : 'text-cream/70 hover:text-white bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="showdownActivePill"
                      className="absolute inset-0 rounded-xl bg-chartreuse shadow-lg"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{m.tab}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Matchup Card Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          >
            {/* Contender A: The Commercial Pretender */}
            <div className="lg:col-span-5 rounded-3xl bg-black/40 backdrop-blur-md border border-red-500/30 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/20 text-red-300 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{current.commercial.tag}</span>
                  </span>
                  <span className="text-[10px] font-mono text-cream/40 uppercase">Commercial Pretender</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-cream">
                    {current.commercial.name}
                  </h3>
                  <p className="text-xs font-mono text-cream/60 mt-1">{current.commercial.brand}</p>
                </div>

                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={current.commercial.image}
                    alt={current.commercial.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 font-mono">
                    <span className="text-[10px] text-cream/60 uppercase block">Shelf Retail Price</span>
                    <span className="text-3xl font-black text-red-400">{current.commercial.price}</span>
                  </div>
                </div>

                {/* Protein Density Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cream/60 uppercase">Protein Concentration</span>
                    <span className="text-red-400 font-bold">{current.commercial.densityPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${current.commercial.densityPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="bg-red-400 h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-cream/50 block uppercase">Protein Content</span>
                    <span className="text-xl font-black text-cream">{current.commercial.protein}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-cream/50 block uppercase">Cost / 10g Protein</span>
                    <span className="text-xl font-black text-red-400">{current.commercial.costPer10g}</span>
                  </div>
                </div>

                {/* Drawbacks */}
                <div className="space-y-1.5 pt-2">
                  {current.commercial.drawbacks.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-cream/70">
                      <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center VS Indicator */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center my-4 lg:my-0 relative">
              <div className="w-16 h-16 rounded-full bg-chartreuse text-forest font-black font-serif text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(216,243,67,0.35)] border-4 border-forest z-10">
                VS
              </div>
              <span className="font-mono text-[10px] text-chartreuse font-bold uppercase tracking-widest mt-3">
                EMPIRICAL MATH
              </span>
            </div>

            {/* Contender B: The Sovereign Whole Food */}
            <div className="lg:col-span-5 rounded-3xl bg-forest-deep/90 backdrop-blur-md border-2 border-chartreuse/60 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-chartreuse text-forest flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>{current.staple.tag}</span>
                  </span>
                  <span className="text-[10px] font-mono text-chartreuse font-bold uppercase">Biology Winner</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-chartreuse">
                    {current.staple.name}
                  </h3>
                  <p className="text-xs font-mono text-cream/70 mt-1">{current.staple.brand}</p>
                </div>

                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-chartreuse/20">
                  <Image
                    src={current.staple.image}
                    alt={current.staple.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 font-mono">
                    <span className="text-[10px] text-cream/70 uppercase block">Kitchen Batch Cost</span>
                    <span className="text-3xl font-black text-chartreuse">{current.staple.price}</span>
                  </div>
                </div>

                {/* Protein Density Bar */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-cream/80 uppercase">Protein Concentration</span>
                    <span className="text-chartreuse font-bold">{current.staple.densityPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${current.staple.densityPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="bg-chartreuse h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-cream/50 block uppercase">Protein Content</span>
                    <span className="text-xl font-black text-chartreuse">{current.staple.protein}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-cream/50 block uppercase">Cost / 10g Protein</span>
                    <span className="text-xl font-black text-chartreuse">{current.staple.costPer10g}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-1.5 pt-2">
                  {current.staple.benefits.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-cream/90">
                      <Check className="w-3.5 h-3.5 text-chartreuse flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Action Link to Full Compare Studio */}
        <div className="text-center pt-6">
          <Link
            href={current.compareLink}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-xl active:scale-95"
          >
            <span>Launch Complete Scientific Showdown Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
