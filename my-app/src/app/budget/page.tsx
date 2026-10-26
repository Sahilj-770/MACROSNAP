'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodCard } from '@/components/features/FoodCard'
import {
  Wallet,
  Trophy,
  ShieldCheck,
  ArrowRight,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'

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
  // Kitchen Plan (Soy Chunks @ ₹2.30/10g + Eggs @ ₹10.70/10g + Chana @ ₹6.60/10g -> weighted average ~₹4.20/10g)
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
          <span>Protein Economics & National Kirana Benchmarks</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight">
          Protein on a Budget
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          The fitness advertising complex wants you to believe 100 grams of bioavailable protein requires expensive synthetic isolates.
          Here is the verifiable empirical math: ranked by cost per 10 grams of real, usable protein.
        </p>

        {/* Pricing Transparency & Methodology Banner */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs text-cream/75">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-chartreuse flex-shrink-0" />
            <span>Methodology: (Cost per 100g / Protein per 100g) × 10 = Cost per 10g protein</span>
          </div>
          <span className="text-[11px] text-chartreuse font-bold">
            Kirana & Agmark Wholesale Modal Averages (2026)
          </span>
        </div>
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
                <span className="text-xs font-mono text-chartreuse font-bold">52% Pure Plant Protein</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs p-3 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Per 100g</span>
                  <span className="text-lg font-black text-chartreuse">52g Pro</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Retail Cost</span>
                  <span className="text-lg font-bold text-white">~₹12 / 100g</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                The undisputed economic monarch. Delivers 52 grams of pure amino acids per 100g dry weight for roughly ₹12.
              </p>
            </div>
          </div>

          {/* Rank 2: Yellow Moong Dal */}
          <div className="p-8 rounded-3xl bg-[#0B1710] text-cream border border-white/15 hover:border-chartreuse/40 transition-all shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase">
              <span>Rank 02 · Silver</span>
            </div>

            <div className="space-y-4">
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
                  alt="Yellow Moong Dal"
                  fill
                  sizes="400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono">
                  <span className="text-[10px] text-cream/70 uppercase block">Cost / 10g Protein</span>
                  <span className="text-3xl font-black text-chartreuse">₹5.70</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif text-cream">Yellow Moong Dal</h3>
                <span className="text-xs font-mono text-chartreuse font-bold">24.5g Protein / 100g</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs p-3 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Per 100g</span>
                  <span className="text-lg font-black text-chartreuse">24.5g Pro</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Retail Cost</span>
                  <span className="text-lg font-bold text-white">~₹14 / 100g</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                The most gentle pulse on sensitive digestion. Extremely low anti-nutrients and rapid cooking time.
              </p>
            </div>
          </div>

          {/* Rank 3: Roasted Chana */}
          <div className="p-8 rounded-3xl bg-[#0B1710] text-cream border border-white/15 hover:border-chartreuse/40 transition-all shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold uppercase">
              <span>Rank 03 · Bronze</span>
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
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono">
                  <span className="text-[10px] text-cream/70 uppercase block">Cost / 10g Protein</span>
                  <span className="text-3xl font-black text-chartreuse">₹6.60</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif text-cream">Roasted Bengal Gram</h3>
                <span className="text-xs font-mono text-chartreuse font-bold">22.5g Protein + 16.8g Fiber</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center font-mono text-xs p-3 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Per 100g</span>
                  <span className="text-lg font-black text-chartreuse">22.5g Pro</span>
                </div>
                <div>
                  <span className="text-[10px] text-muted-foreground block uppercase">Retail Cost</span>
                  <span className="text-lg font-bold text-white">~₹15 / 100g</span>
                </div>
              </div>

              <p className="text-xs text-cream/80 font-sans leading-relaxed">
                Zero cooking required. High in resistant starch that nourishes colon bifidobacteria and stabilizes blood sugar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Rupee-to-Protein Daily Budget Simulator */}
      <div className="p-6 sm:p-10 rounded-3xl bg-[#0B1710]/95 text-cream border border-chartreuse/40 shadow-2xl space-y-8">
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
                className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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
              <label htmlFor="budget-filter-slider" className="text-muted-foreground uppercase">
                Filter Max Cost / 10g Protein:
              </label>
              <span className="text-forest bg-chartreuse px-2.5 py-0.5 rounded-full font-black">
                Under ₹{maxBudgetPer10g}
              </span>
            </div>
            <input
              id="budget-filter-slider"
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
                className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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

      {/* Complete Lower-Page Experience: Monthly Household Economic Impact */}
      <section className="pt-10 border-t border-white/10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            Macro-Economic Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
            What 30 Days of Whole Food Fueling Saves You
          </h2>
          <p className="text-sm font-mono text-cream/70 max-w-2xl">
            Replacing one daily commercial snack bar (₹120) with roasted chana or sattu (₹15) shifts capital straight into your bank account while providing superior whole food satiety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono text-cream/60 uppercase block">Monthly Financial Delta</span>
            <div className="text-4xl sm:text-5xl font-black font-serif text-chartreuse">₹3,150+</div>
            <p className="text-xs text-cream/70 font-sans leading-relaxed">
              Saved every month per person. Over a 12-month training block, that amounts to ₹37,800 saved from zero fitness advertising markup.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono text-cream/60 uppercase block">Prebiotic Dietary Fiber</span>
            <div className="text-4xl sm:text-5xl font-black font-serif text-white">+504g</div>
            <p className="text-xs text-cream/70 font-sans leading-relaxed">
              Additional gut-nourishing resistant starch and oligosaccharides ingested per month, supporting microbial diversity and metabolic stability.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono text-cream/60 uppercase block">Artificial Additives Avoided</span>
            <div className="text-4xl sm:text-5xl font-black font-serif text-tangerine">0g</div>
            <p className="text-xs text-cream/70 font-sans leading-relaxed">
              Zero maltitol laxative humectants, zero fractionated palm oil binders, and zero synthetic artificial sweeteners entered your bloodstream.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-cream/80">
            <Sparkles className="w-4 h-4 text-chartreuse flex-shrink-0" />
            <span>Ready to plan your weekly groceries based on these cost benchmarks?</span>
          </div>
          <a
            href="/basket"
            className="min-h-[44px] px-6 py-2.5 rounded-full bg-chartreuse text-forest font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Budget Basket Planner →</span>
          </a>
        </div>
      </section>
    </div>
  )
}
