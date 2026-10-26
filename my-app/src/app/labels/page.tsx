'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Sparkles,
  ShieldAlert,
  Search,
  Scan,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LabelDecoderPage() {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('serving-size')

  const hotspots: Record<
    string,
    {
      title: string
      badge: string
      hazardLevel: 'critical' | 'high' | 'moderate'
      frontClaim: string
      realityCheck: string
      whatIndustryDoes: string
      smartConsumerRule: string
    }
  > = {
    'serving-size': {
      title: 'The Micro-Portion Serving Loophole',
      badge: 'High Deception Risk',
      hazardLevel: 'high',
      frontClaim: '"ONLY 90 KCAL & 2G SUGAR!"',
      realityCheck:
        'Manufacturers shrink the official serving size to an absurdly unrealistic portion (e.g. 15g or 2 biscuits) to make calories, added sugars, and saturated fat appear deceptively low on the front table.',
      whatIndustryDoes:
        'A single pocket bar or cookie pouch contains 60g, but the nutrition table states "Serving Size: 15g (1/4 bar)". The consumer eats the whole bar, consuming 4x the declared sugar without noticing.',
      smartConsumerRule:
        'Always multiply the serving numbers by the total pack weight. When comparing, evaluate only the "Per 100g" standardized column.',
    },
    'protein-claims': {
      title: 'Front-of-Pack "HIGH PROTEIN" Mirage',
      badge: 'Regulatory Loophole',
      hazardLevel: 'critical',
      frontClaim: '"POWER PROTEIN BAR — 20G PRO"',
      realityCheck:
        'Under advertising rules, brands can legally print bold "SOURCE OF PROTEIN" banners if just 12% of caloric energy comes from protein, even when 75% of the bar is refined palm oil, wheat flour, and invert sugar.',
      whatIndustryDoes:
        'Cookies and cereals market themselves as fitness fuel by adding a dusting of cheap soy isolate while retaining 25g of refined sucrose.',
      smartConsumerRule:
        'Inspect the ingredient list order. Ingredients are legally listed in descending order by weight. If "Sugar" appears before "Protein Isolate", it is candy disguised as nutrition.',
    },
    'hidden-sugars': {
      title: 'The 50 Aliases of Disguised Added Sugar',
      badge: 'Ingredient Sleight-of-Hand',
      hazardLevel: 'critical',
      frontClaim: '"NO REFINED CANE SUGAR ADDED"',
      realityCheck:
        'Brands split sugar into 3 or 4 distinct synthetic fractions so that no individual sugar ranks as the #1 ingredient on the back label.',
      whatIndustryDoes:
        'Instead of listing 20g of Sugar, the label lists 5g Maltodextrin, 5g High Fructose Syrup, 5g Rice Syrup Solids, and 5g Dextrose. In your bloodstream, they cause an identical rapid glycemic spike.',
      smartConsumerRule:
        'Look for words ending in "-ose" (sucrose, dextrose, fructose), syrups, malt extracts, and fruit concentrate solids. If 3 or more appear, put it back.',
    },
    'maltitol-polyols': {
      title: '"Zero Sugar" Sugar Alcohols (Maltitol Spike)',
      badge: 'Gut Distress Warning',
      hazardLevel: 'high',
      frontClaim: '"0G ADDED SUGAR · GUILT FREE"',
      realityCheck:
        'Maltitol carries a glycemic index of ~35-52 (almost half of table sugar) and causes significant gastrointestinal bloating, cramps, and laxative effects in doses above 15 grams.',
      whatIndustryDoes:
        'Replaces regular sugar with 22g of synthetic maltitol syrup to legally print "Zero Sugar" on the front, while spiking blood glucose and upsetting gut bifidobacteria.',
      smartConsumerRule:
        'Choose whole food snacks sweetened with modest amounts of real whole dates, or bars sweetened with natural stevia leaf / monk fruit.',
    },
    'emulsifiers-gums': {
      title: 'Industrial Gums, Binders & Palm Oil Humectants',
      badge: 'Texture Chemistry',
      hazardLevel: 'moderate',
      frontClaim: '"ULTRA SMOOTH & RICH TEXTURE"',
      realityCheck:
        'Chemical gums (carrageenan, carboxymethylcellulose) and fractionated palm oil humectants create artificial creaminess in ultra-processed drinks that are low in real milk solids.',
      whatIndustryDoes:
        'Enables watery liquids with cheap isolate powders to feel like thick, luxurious milkshakes on the tongue while increasing shelf stability by 12 months.',
      smartConsumerRule:
        'Opt for minimal ingredient lists. Whole curd, real milk, and stone-ground roasted chana create authentic viscosity with natural probiotics.',
    },
  }

  const active = hotspots[selectedHotspot] || hotspots['serving-size']!

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <Scan className="w-3.5 h-3.5" />
          <span>Section 05 // Supermarket Label Scanner</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black font-serif text-white tracking-tight">
          Ingredient Label Decoder
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          The front of the box is advertising; the back of the box is the legally bound contract.
          Tap any glowing scanner marker on the simulated packaging below to unmask the chemical and marketing tricks used on supermarket shelves.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Simulated Snack Bar Foil Packaging */}
        <div className="lg:col-span-5 bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6 text-cream">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-chartreuse block">Interactive Foil Simulator</span>
              <h3 className="text-xl font-black font-serif text-white">Commercial Protein Bar (67g)</h3>
            </div>
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-chartreuse text-forest shadow-sm">
              TAP SCAN ZONE
            </span>
          </div>

          {/* Realistic Back-of-Pack Table with Interactive Radar Hotspots */}
          <div className="space-y-2 font-mono text-xs">
            {/* Zone 1: Serving Size */}
            <button
              onClick={() => setSelectedHotspot('serving-size')}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                selectedHotspot === 'serving-size'
                  ? 'border-chartreuse bg-chartreuse/15 shadow-[0_0_15px_rgba(216,243,67,0.2)] scale-102'
                  : 'border-white/10 hover:border-white/25 bg-[#050B07]/80'
              }`}
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Declared Serving Size</span>
                <strong className="text-sm text-white font-black">1 individual bar (67g) · 250 kcal</strong>
              </div>
              <span className="w-3 h-3 rounded-full bg-chartreuse animate-ping flex-shrink-0" />
            </button>

            {/* Zone 2: Protein Claim */}
            <button
              onClick={() => setSelectedHotspot('protein-claims')}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                selectedHotspot === 'protein-claims'
                  ? 'border-chartreuse bg-chartreuse/15 shadow-[0_0_15px_rgba(216,243,67,0.2)] scale-102'
                  : 'border-white/10 hover:border-white/25 bg-[#050B07]/80'
              }`}
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Protein Content Declaration</span>
                <strong className="text-sm text-white font-black">20g Protein (Soy Protein Isolate)</strong>
              </div>
              <span className="w-3 h-3 rounded-full bg-chartreuse animate-ping flex-shrink-0" />
            </button>

            {/* Zone 3: Hidden Sugars */}
            <button
              onClick={() => setSelectedHotspot('hidden-sugars')}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                selectedHotspot === 'hidden-sugars'
                  ? 'border-tangerine bg-tangerine/15 shadow-[0_0_15px_rgba(255,94,54,0.2)] scale-102'
                  : 'border-white/10 hover:border-white/25 bg-[#050B07]/80'
              }`}
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Total Carbohydrates</span>
                <strong className="text-sm text-white font-black">26g Carbs · 12g Added Sugars (4 Aliases)</strong>
              </div>
              <span className="w-3 h-3 rounded-full bg-tangerine animate-ping flex-shrink-0" />
            </button>

            {/* Zone 4: Sugar Alcohols */}
            <button
              onClick={() => setSelectedHotspot('maltitol-polyols')}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                selectedHotspot === 'maltitol-polyols'
                  ? 'border-tangerine bg-tangerine/15 shadow-[0_0_15px_rgba(255,94,54,0.2)] scale-102'
                  : 'border-white/10 hover:border-white/25 bg-[#050B07]/80'
              }`}
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Sugar Alcohols (Polyols)</span>
                <strong className="text-sm text-white font-black">14g Maltitol Syrup (Insulin Active)</strong>
              </div>
              <span className="w-3 h-3 rounded-full bg-tangerine animate-ping flex-shrink-0" />
            </button>

            {/* Zone 5: Gums & Emulsifiers */}
            <button
              onClick={() => setSelectedHotspot('emulsifiers-gums')}
              className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                selectedHotspot === 'emulsifiers-gums'
                  ? 'border-chartreuse bg-chartreuse/15 shadow-[0_0_15px_rgba(216,243,67,0.2)] scale-102'
                  : 'border-white/10 hover:border-white/25 bg-[#050B07]/80'
              }`}
            >
              <div>
                <span className="text-[10px] text-muted-foreground uppercase block">Humectants & Binders</span>
                <strong className="text-sm text-white font-black">Fractionated Palm Oil, Carrageenan, Gums</strong>
              </div>
              <span className="w-3 h-3 rounded-full bg-chartreuse animate-ping flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* Right: Active Radar Analysis Stage */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedHotspot}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-10 rounded-3xl bg-[#0B1710]/95 backdrop-blur-md border border-white/10 shadow-2xl space-y-6 text-cream"
            >
              {/* Badge & Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase bg-red-500/15 text-red-400 border border-red-500/30">
                    {active.badge}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">FSSAI / Scientific Benchmark</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
                  {active.title}
                </h2>
              </div>

              {/* Front of Pack vs Back of Pack Reality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase block font-bold">
                    What Front of Pack Claims:
                  </span>
                  <p className="text-sm font-black font-serif text-tangerine">{active.frontClaim}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#050B07] border border-chartreuse/30 text-cream space-y-1">
                  <span className="text-[10px] font-mono text-chartreuse uppercase block font-bold">
                    What Lab Tests Reveal:
                  </span>
                  <p className="text-xs font-sans text-cream/90 leading-relaxed">{active.realityCheck}</p>
                </div>
              </div>

              {/* How Industry Exploits It */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[11px] font-mono text-chartreuse uppercase font-bold block">
                  How Supermarket Marketing Exploits It:
                </span>
                <p className="text-sm text-cream/80 font-sans leading-relaxed">
                  {active.whatIndustryDoes}
                </p>
              </div>

              {/* Smart Consumer Golden Rule */}
              <div className="p-6 rounded-2xl bg-[#050B07] text-cream border-2 border-chartreuse/40 space-y-2 shadow-xl">
                <div className="flex items-center gap-2 text-chartreuse font-mono text-xs font-bold uppercase">
                  <CheckCircle2 className="w-4 h-4 text-chartreuse" />
                  <span>The Smart Consumer Golden Rule</span>
                </div>
                <p className="text-sm text-cream/90 font-sans leading-relaxed">
                  {active.smartConsumerRule}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
