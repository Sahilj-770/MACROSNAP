'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodCard } from '@/components/features/FoodCard'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import {
  Wallet,
  TrendingDown,
  Sparkles,
  Trophy,
  Medal,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function BudgetPage() {
  const [maxBudgetPer10g, setMaxBudgetPer10g] = useState<number>(35)
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [dailyBudgetInr, setDailyBudgetInr] = useState<number>(50)

  const budgetSortedFoods = useMemo(() => {
    return FOOD_DATABASE.map((food) => {
      const costPer10g = (food.estimatedCostPer100g / food.proteinPer100g) * 10
      return {
        ...food,
        costPer10gProteinNum: costPer10g,
      }
    })
      .filter((food) => {
        const matchesMaxBudget = food.costPer10gProteinNum <= maxBudgetPer10g
        const matchesTier = selectedTier === 'all' || food.affordabilityTier === selectedTier
        return matchesMaxBudget && matchesTier
      })
      .sort((a, b) => a.costPer10gProteinNum - b.costPer10gProteinNum)
  }, [maxBudgetPer10g, selectedTier])

  // Rupee to Protein Simulation Math
  // Kitchen Plan (Soy Chunks @ ₹2.30/10g + Eggs @ ₹10.70/10g + Chana @ ₹6.60/10g -> avg ~₹4.50/10g)
  const wholeFoodProteinG = Math.round((dailyBudgetInr / 4.2) * 10)
  // Packaged Bar Plan (~₹60/10g)
  const packagedBarProteinG = Math.round((dailyBudgetInr / 60) * 10)
  const multiplierAdvantage = (wholeFoodProteinG / Math.max(1, packagedBarProteinG)).toFixed(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <Wallet className="w-3.5 h-3.5" />
          <span>Section 03 // Protein Economics & National Benchmarks</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black font-serif text-white tracking-tight">
          Protein on a Budget
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          The fitness advertising complex wants you to believe 100 grams of bioavailable protein requires expensive synthetic isolates.
          Here is the verifiable empirical math: ranked by cost per 10 grams of real, usable protein.
        </p>
      </div>

      {/* The Sovereign Budget Podium (Top 3 Value Kings) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="font-bold text-cream uppercase tracking-wider flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-chartreuse" />
            <span>The National Protein Value Podium (Lowest Cost / 10g)</span>
          </span>
          <span className="text-muted-foreground">ICMR-NIN Indian Food Benchmarks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Rank 1: Soy Chunks */}
          <div className="p-8 rounded-3xl bg-[#0B1E13] text-cream border-2 border-chartreuse shadow-[0_0_35px_rgba(216,243,67,0.15)] flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-black uppercase shadow-md">
              <Trophy className="w-3.5 h-3.5" />
              <span>Rank 01 · Gold</span>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-chartreuse/30">
                <Image
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Soy Chunks"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono">
                  <span className="text-[10px] text-cream/70 uppercase block">Cost / 10g Protein</span>
                  <span className="text-3xl font-black text-chartreuse">₹2.30</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif text-cream">Boiled Soy Chunks</h3>
                <p className="text-xs font-serif italic text-chartreuse/90 mt-0.5">सोया बड़ी (मीकरमेकर)</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-cream/60 block uppercase">Protein Density</span>
                  <span className="text-lg font-bold text-cream">52g / 100g</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-cream/60 block uppercase">100g Retail</span>
                  <span className="text-lg font-bold text-chartreuse">₹12.00</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                26x cheaper than packaged fitness bars. Boiled in kitchen water for 4 mins, zero cooking oil needed.
              </p>
            </div>
          </div>

          {/* Rank 2: Roasted Bengal Gram (Chana) */}
          <div className="p-8 rounded-3xl bg-[#0B1710]/90 text-cream border border-white/20 shadow-xl hover:border-chartreuse/40 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-mono font-bold uppercase border border-white/20">
              <Medal className="w-3.5 h-3.5 text-white/70" />
              <span>Rank 02 · Silver</span>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80"
                  alt="Roasted Bengal Gram"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono">
                  <span className="text-[10px] text-cream/70 uppercase block">Cost / 10g Protein</span>
                  <span className="text-3xl font-black text-white">₹6.60</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif text-white">Roasted Bengal Gram</h3>
                <p className="text-xs font-serif italic text-muted-foreground mt-0.5">भुना चना (छिलका सहित)</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#050B07]/80 border border-white/10">
                  <span className="text-[10px] text-muted-foreground block uppercase">Prebiotic Fiber</span>
                  <span className="text-lg font-bold text-white">16.8g / 100g</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050B07]/80 border border-white/10">
                  <span className="text-[10px] text-muted-foreground block uppercase">Protein Content</span>
                  <span className="text-lg font-bold text-white">22.5g</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                Zero cooking, zero kettle required. Portable whole-food snack that keeps gut bifidobacteria fueled for hours.
              </p>
            </div>
          </div>

          {/* Rank 3: Farm Boiled Whole Eggs */}
          <div className="p-8 rounded-3xl bg-[#0B1710]/90 text-cream border border-amber-500/30 shadow-xl hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-mono font-bold uppercase border border-amber-500/30">
              <Medal className="w-3.5 h-3.5 text-amber-400" />
              <span>Rank 03 · Bronze</span>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-amber-500/20">
                <Image
                  src="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=800&q=80"
                  alt="Whole Boiled Eggs"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono">
                  <span className="text-[10px] text-cream/70 uppercase block">Cost / 10g Protein</span>
                  <span className="text-3xl font-black text-amber-300">₹10.70</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif text-white">Farm Whole Boiled Eggs</h3>
                <p className="text-xs font-serif italic text-muted-foreground mt-0.5">उबले अंडे (NECC Benchmark)</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#050B07]/80 border border-white/10">
                  <span className="text-[10px] text-muted-foreground block uppercase">DIAAS Score</span>
                  <span className="text-lg font-bold text-white">1.18 Apex</span>
                </div>
                <div className="p-3 rounded-xl bg-[#050B07]/80 border border-white/10">
                  <span className="text-[10px] text-muted-foreground block uppercase">Complete Aminos</span>
                  <span className="text-lg font-bold text-white">100% Score</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                The clinical biological standard of human protein absorption. Delivers choline, vitamin D, and lutein.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rupee-to-Protein Daily Budget Simulator */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1710]/95 text-cream border border-chartreuse/40 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-chartreuse uppercase tracking-widest block">
              Interactive Purchasing Power Simulator
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-cream">
              What Does ₹{dailyBudgetInr} / Day Buy You?
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {[20, 50, 100].map((amt) => (
              <button
                key={amt}
                onClick={() => setDailyBudgetInr(amt)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  dailyBudgetInr === amt
                    ? 'bg-chartreuse text-forest shadow-[0_0_15px_rgba(216,243,67,0.4)] scale-105 font-black'
                    : 'bg-white/10 text-cream/70 hover:bg-white/20'
                }`}
              >
                ₹{amt} / day
              </button>
            ))}
          </div>
        </div>

        {/* Visual Comparison Outcome */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Whole Food Plan */}
          <div className="p-6 rounded-2xl bg-[#050B07]/90 border-2 border-chartreuse/60 shadow-[0_0_25px_rgba(216,243,67,0.15)] space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-chartreuse font-bold uppercase">Whole Kitchen Strategy</span>
              <span className="text-cream/70">Soy + Eggs + Chana</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black font-serif text-chartreuse">
                {wholeFoodProteinG}g
              </span>
              <span className="text-base font-mono text-cream/70">Complete Protein</span>
            </div>
            <p className="text-xs font-mono text-cream/80">
              Hits 100% of an 80kg athlete’s daily protein requirement with real unbranded whole food.
            </p>
          </div>

          {/* Commercial Snack Plan */}
          <div className="p-6 rounded-2xl bg-black/60 border border-red-500/30 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-red-400 font-bold uppercase">Commercial Snack Bar Strategy</span>
              <span className="text-cream/70">Packaged Shelves</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black font-serif text-red-400">
                {packagedBarProteinG}g
              </span>
              <span className="text-base font-mono text-cream/70">Protein Yield</span>
            </div>
            <p className="text-xs font-mono text-cream/60">
              Barely yields 1/3 of a single bar. Leaves a massive 100g deficit while ingesting palm oil humectants.
            </p>
          </div>
        </div>

        <div className="text-center font-mono text-xs text-chartreuse font-bold pt-2">
          ⚡ Whole kitchen foods provide <span className="underline">{multiplierAdvantage}x more biological protein</span> per rupee spent!
        </div>
      </div>

      {/* Filter & Food Intelligence Directory Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#0B1710]/90 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl">
          <div className="w-full sm:w-1/2 space-y-1.5">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-muted-foreground uppercase">Filter Max Cost / 10g Protein:</span>
              <span className="text-forest bg-chartreuse px-2.5 py-0.5 rounded-full font-black">
                Under ₹{maxBudgetPer10g}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={65}
              step={1}
              value={maxBudgetPer10g}
              onChange={(e) => setMaxBudgetPer10g(Number(e.target.value))}
              className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer accent-chartreuse border border-white/15"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase mr-1">
              Tier:
            </span>
            {['all', 'budget-champion', 'balanced', 'premium'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  selectedTier === tier
                    ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.4)] font-black'
                    : 'bg-white/5 text-cream/70 hover:bg-white/15 border border-white/10'
                }`}
              >
                {tier.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetSortedFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </div>
  )
}
