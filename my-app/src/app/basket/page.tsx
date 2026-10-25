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
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Check
} from 'lucide-react'

export default function BasketPage() {
  const {
    basketItems,
    updateBasketQuantity,
    removeFromBasket,
    clearBasket,
    dailyTargetProteinGrams,
    addToBasket
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
  const proteinTargetPercent = Math.min(100, Math.round((totalProtein / dailyTargetProteinGrams) * 100))

  const addPowerPack = () => {
    addToBasket('sattu-chana', 100)
    addToBasket('soy-chunks', 100)
    addToBasket('roasted-chana', 100)
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-forest pb-24">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-forest/15 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>THE SOVEREIGN GROCERY LEDGER // REAL PURCHASING POWER</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-forest tracking-tight leading-[0.94]">
              Build Your <br />
              <span className="text-tangerine italic font-normal">Protein Basket.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-forest/75 max-w-2xl leading-relaxed">
              Real grocery yields, instant protein calculation, and live budget tracking against wholesale kirana benchmarks.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={addPowerPack}
              className="px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-chartreuse text-forest shadow-md hover:bg-butter transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>+ Indian Triple Power Pack (₹36 for 90g)</span>
            </button>
            {basketItems.length > 0 && (
              <button
                onClick={clearBasket}
                className="px-4 py-2 rounded-2xl text-xs font-mono font-bold bg-white text-destructive border border-destructive/30 hover:bg-destructive/5 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
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
        <div className="lg:col-span-8 bg-white rounded-3xl border-2 border-forest/15 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-forest/10 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider text-forest/60">
              Basket Contents ({basketItems.length} Products)
            </span>
            <Link href="/explore" className="text-forest hover:text-tangerine underline font-bold flex items-center gap-1">
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
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F0] border border-forest/10 hover:border-forest/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      {/* Thumbnail & Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-black/10">
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
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-forest/5 text-forest">
                              {food.category}
                            </span>
                            <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
                              {food.affordabilityTier.replace('-', ' ')}
                            </span>
                          </div>
                          <h3 className="font-bold font-serif text-lg text-forest leading-snug">
                            {food.name}
                          </h3>
                          <p className="text-xs font-mono text-forest/70">
                            +{itemProtein}g protein · ₹{itemCost} est.
                          </p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-forest/20 shadow-sm font-mono text-xs">
                          <button
                            onClick={() => updateBasketQuantity(item.foodId, Math.max(50, item.quantityGrams - 50))}
                            className="w-7 h-7 rounded-lg bg-forest/5 hover:bg-forest hover:text-white transition-colors flex items-center justify-center font-bold"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-16 text-center font-black text-forest">
                            {item.quantityGrams}g
                          </span>
                          <button
                            onClick={() => updateBasketQuantity(item.foodId, item.quantityGrams + 50)}
                            className="w-7 h-7 rounded-lg bg-forest/5 hover:bg-forest hover:text-white transition-colors flex items-center justify-center font-bold"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromBasket(item.foodId)}
                          className="p-2 text-forest/40 hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5"
                          title="Remove item"
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
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-14 h-14 text-forest/20 mx-auto" />
              <div className="space-y-1">
                <p className="text-xl font-bold font-serif text-forest">Your grocery basket is empty</p>
                <p className="text-xs font-mono text-forest/60 max-w-sm mx-auto">
                  Click the button below to add our recommended Indian Triple Power Pack or explore individual staples.
                </p>
              </div>
              <button
                onClick={addPowerPack}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep transition-all shadow-md active:scale-95"
              >
                <span>Load Triple Power Pack (90g Protein)</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: FINANCIAL & BIOLOGICAL LEDGER */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-[#0B1E13] text-cream rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-chartreuse/20">
            <div className="space-y-1 pb-4 border-b border-white/10">
              <span className="text-[10px] font-mono text-chartreuse uppercase font-bold tracking-widest block">
                ECONOMIC AUDIT
              </span>
              <h2 className="text-2xl font-black font-serif text-cream">
                Nutrition Ledger
              </h2>
            </div>

            {/* Target Budget Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-cream/70 uppercase">Daily Budget Ceiling:</span>
                <span className="font-bold text-chartreuse text-base">₹{budgetLimit}</span>
              </div>
              <input
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
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, budgetPercent)}%` }}
                    className={`h-full rounded-full transition-all duration-300 ${
                      remainingBudget >= 0 ? 'bg-chartreuse' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Protein Target Meter */}
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-cream/70">Daily Protein Target:</span>
                  <span className="text-chartreuse font-bold">
                    {proteinTargetPercent}% ({totalProtein.toFixed(0)}g / {dailyTargetProteinGrams}g)
                  </span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, proteinTargetPercent)}%` }}
                    className="h-full bg-chartreuse rounded-full transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="pt-4 border-t border-white/10 space-y-3 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-cream/60">Estimated Basket Cost:</span>
                <span className="text-3xl font-black text-cream">₹{totalCost.toFixed(1)}</span>
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
                  Swap out paneer or packaged products with raw bulk soy chunks or chana sattu to bring total spend under ₹{budgetLimit}.
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
    </div>
  )
}
