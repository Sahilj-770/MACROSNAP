'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FOOD_DATABASE } from '@/data/foods'
import { useUserStore } from '@/store/useUserStore'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Compass,
} from 'lucide-react'

export default function BasketPage() {
  const {
    basketItems,
    updateBasketQuantity,
    removeFromBasket,
    clearBasket,
    dailyTargetProteinGrams,
    addToBasket,
    loadSampleBasket,
  } = useUserStore()

  const [budgetLimit, setBudgetLimit] = useState<number>(100)

  // Compute Basket Totals
  const totalCost = basketItems.reduce((acc, item) => {
    const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
    if (!food) return acc
    return acc + (food.estimatedCostPer100g * item.quantityGrams) / 100
  }, 0)

  const totalProtein = basketItems.reduce((acc, item) => {
    const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
    if (!food) return acc
    return acc + (food.proteinPer100g * item.quantityGrams) / 100
  }, 0)

  const remainingBudget = budgetLimit - totalCost
  const budgetPercent = Math.min(100, Math.round((totalCost / budgetLimit) * 100))
  const targetProteinGoal = dailyTargetProteinGrams > 0 ? dailyTargetProteinGrams : 90
  const proteinTargetPercent = Math.min(100, Math.round((totalProtein / targetProteinGoal) * 100))

  return (
    <div className="min-h-screen bg-[#050B07] text-cream pb-24 selection:bg-chartreuse selection:text-forest">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Nutrition & Budget Planner · Personal Grocery Basket</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[0.94]">
              Build Your <br />
              <span className="text-chartreuse italic font-normal">Protein Basket.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-cream/70 max-w-2xl leading-relaxed">
              Real grocery yields, instant protein calculation, and live budget tracking against wholesale kirana benchmarks.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={loadSampleBasket}
              className="min-h-[44px] px-4 py-2 rounded-2xl text-xs font-mono font-black bg-chartreuse text-forest shadow-[0_0_15px_rgba(216,243,67,0.3)] hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <Sparkles className="w-3.5 h-3.5 text-forest" />
              <span>+ Load Starter Staples (90g Protein)</span>
            </button>
            {basketItems.length > 0 && (
              <button
                onClick={clearBasket}
                className="min-h-[44px] px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Basket</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN BASKET GRID & FINANCIAL LEDGER
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: BASKET ITEMS */}
        <div className="lg:col-span-8 bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6 text-cream">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-muted-foreground">
              Basket Contents ({basketItems.length} Products)
            </span>
            <Link
              href="/explore"
              className="text-chartreuse hover:underline font-bold flex items-center gap-1 min-h-[36px] py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <span>+ Add More Foods</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {basketItems.length > 0 ? (
            <div className="space-y-4">
              <AnimatePresence>
                {basketItems.map((item) => {
                  const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
                  if (!food) return null
                  const itemProtein = ((food.proteinPer100g * item.quantityGrams) / 100).toFixed(1)
                  const itemCost = ((food.estimatedCostPer100g * item.quantityGrams) / 100).toFixed(1)

                  return (
                    <motion.div
                      key={item.foodId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 sm:p-5 rounded-2xl bg-[#050B07]/80 border border-white/10 hover:border-chartreuse/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Thumbnail & Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
                          <Image
                            src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                            alt={food.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-white/5 text-chartreuse border border-chartreuse/20">
                              {food.category}
                            </span>
                            <span className="text-xs font-mono text-chartreuse font-bold uppercase">
                              {food.affordabilityTier.replace('-', ' ')}
                            </span>
                          </div>
                          <h3 className="font-bold font-serif text-lg text-white leading-snug">
                            {food.name}
                          </h3>
                          <p className="text-xs font-mono text-muted-foreground">
                            +{itemProtein}g protein · ₹{itemCost} est.
                          </p>
                        </div>
                      </div>

                      {/* Controls (min 44px touch targets) */}
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-center gap-1 sm:gap-2 bg-white/5 px-2 py-1 rounded-xl border border-white/15 font-mono text-xs">
                          <button
                            onClick={() => updateBasketQuantity(item.foodId, Math.max(50, item.quantityGrams - 50))}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                            aria-label={`Decrease ${food.name} quantity by 50g`}
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-16 text-center font-black text-chartreuse text-sm">
                            {item.quantityGrams}g
                          </span>
                          <button
                            onClick={() => updateBasketQuantity(item.foodId, item.quantityGrams + 50)}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                            aria-label={`Increase ${food.name} quantity by 50g`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromBasket(item.foodId)}
                          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-white/40 hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                          title="Remove item"
                          aria-label={`Remove ${food.name} from basket`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-16 space-y-5">
              <ShoppingBag className="w-16 h-16 text-white/20 mx-auto" />
              <div className="space-y-1.5">
                <p className="text-2xl font-bold font-serif text-white">Your grocery basket is empty</p>
                <p className="text-xs font-mono text-cream/70 max-w-sm mx-auto leading-relaxed">
                  Start fresh by browsing our database of whole Indian staples, or click below to load our curated starter staples pack.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={loadSampleBasket}
                  className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(216,243,67,0.3)] active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                >
                  <Sparkles className="w-4 h-4 text-forest" />
                  <span>Load Starter Staples (90g Protein)</span>
                </button>
                <Link
                  href="/explore"
                  className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                >
                  <Compass className="w-4 h-4 text-chartreuse" />
                  <span>Explore Whole Foods</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: FINANCIAL & BIOLOGICAL LEDGER */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#0B1710]/95 text-cream rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-chartreuse/30">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono text-chartreuse uppercase font-bold tracking-widest block">
                ECONOMIC AUDIT
              </span>
              <h2 className="text-2xl font-black font-serif text-white">
                Nutrition Ledger
              </h2>
            </div>

            {/* Target Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor="budget-slider" className="text-cream/70 uppercase">Daily Budget Ceiling:</label>
                <span className="font-bold text-chartreuse text-base">₹{budgetLimit}</span>
              </div>
              <input
                id="budget-slider"
                type="range"
                min="30"
                max="300"
                step="10"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(Number(e.target.value))}
                className="w-full accent-chartreuse cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-cream/40">
                <span>₹30 (Survival)</span>
                <span>₹100 (Optimal)</span>
                <span>₹300 (Premium)</span>
              </div>
            </div>

            {/* Live Progress Meters */}
            <div className="space-y-4 pt-2">
              {/* Budget Spent Meter */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-cream/70">Budget Utilization:</span>
                  <span className={remainingBudget >= 0 ? 'text-chartreuse font-bold' : 'text-red-400 font-bold'}>
                    {budgetPercent}% (₹{totalCost.toFixed(0)} / ₹{budgetLimit})
                  </span>
                </div>
                <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, budgetPercent)}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      remainingBudget >= 0 ? 'bg-chartreuse shadow-[0_0_8px_#D8F343]' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Protein Target Meter */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-cream/70">Daily Protein Target:</span>
                  <span className="text-chartreuse font-bold">
                    {proteinTargetPercent}% ({totalProtein.toFixed(0)}g / {targetProteinGoal}g)
                  </span>
                </div>
                <div className="w-full bg-black/60 h-2.5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, proteinTargetPercent)}%` }}
                    className="h-full bg-chartreuse rounded-full transition-all duration-300 shadow-[0_0_8px_#D8F343]"
                  />
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-cream/60">Estimated Basket Cost:</span>
                <span className="text-3xl font-black text-white">₹{totalCost.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-cream/60">Total Protein Yield:</span>
                <span className="text-3xl font-black text-chartreuse">{totalProtein.toFixed(1)}g</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-cream/60">Cost Per 10g Protein:</span>
                <span className="text-xl font-bold text-chartreuse">
                  ₹{totalProtein > 0 ? ((totalCost / totalProtein) * 10).toFixed(1) : '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-cream/70">Remaining Balance:</span>
                <span className={`text-base font-bold ${
                  remainingBudget >= 0 ? 'text-chartreuse' : 'text-red-400'
                }`}>
                  {remainingBudget >= 0 ? `+₹${remainingBudget.toFixed(1)} under` : `-₹${Math.abs(remainingBudget).toFixed(1)} over`}
                </span>
              </div>
            </div>

            {remainingBudget < 0 && (
              <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 text-xs font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Budget Limit Exceeded</span>
                </div>
                <p className="text-cream/75 text-[11px] leading-relaxed">
                  Swap out packaged products with raw bulk soy chunks or chana sattu to bring total spend under ₹{budgetLimit}.
                </p>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-[11px] space-y-1.5 text-cream/70">
              <span className="text-chartreuse font-bold uppercase block text-[10px]">
                Preserved In Local Cache
              </span>
              <p>
                Your selected basket state is saved in your browser localStorage. It will remain populated when you revisit this device.
              </p>
            </div>
          </div>

        </aside>
      </main>

      {/* Complete Lower-Page Experience: Next Steps with Your Planning Basket */}
      <section className="pt-10 mt-12 border-t border-white/10 space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            Practical Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
            Next Steps With Your Protein Basket
          </h2>
          <p className="text-sm font-mono text-cream/70 max-w-2xl">
            This is a nutritional planning basket designed to help you organize whole-food shopping without fitness brand marketing markups.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Tip 01 · Kirana Strategy</span>
            <h3 className="text-lg font-bold font-serif text-white">Buy Unbranded Wholesale</h3>
            <p className="text-xs text-cream/75 font-sans leading-relaxed">
              Ask your local neighborhood grocery or grain merchant for loose roasted chana, yellow moong dal, and bulk soy chunks for the lowest prices per gram.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Tip 02 · Cooking Speed</span>
            <h3 className="text-lg font-bold font-serif text-white">Cook 15-Minute Meals</h3>
            <p className="text-xs text-cream/75 font-sans leading-relaxed">
              Turn the items in your basket into savory sattu elixirs, quick high-protein soy bhurji, or gentle moong dal bowls.
            </p>
            <div className="pt-2">
              <Link href="/recipes" className="text-xs font-mono font-bold text-chartreuse hover:underline">
                View Matching Recipes →
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0B1710]/90 border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Tip 03 · Verification</span>
            <h3 className="text-lg font-bold font-serif text-white">Compare Contenders</h3>
            <p className="text-xs text-cream/75 font-sans leading-relaxed">
              Unsure if a packaged product is worth it? Put it side-by-side with raw paneer or eggs in our head-to-head showdown.
            </p>
            <div className="pt-2">
              <Link href="/compare" className="text-xs font-mono font-bold text-chartreuse hover:underline">
                Launch Showdown Arena →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
