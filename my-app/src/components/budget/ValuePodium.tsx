'use client'

import React, { useState } from 'react'
import { Trophy, TrendingDown, ArrowUpRight, Check, ShoppingBag } from 'lucide-react'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'

interface ValuePodiumProps {
  foods: FoodItem[]
}

export function ValuePodium({ foods }: ValuePodiumProps) {
  const [dailyProteinGrams, setDailyProteinGrams] = useState(80)
  const addToBasket = useUserStore((state) => state.addToBasket)
  const [addedIds, setAddedIds] = useState<string[]>([])

  // Calculate monthly costs
  // Whole food average cost per 10g protein: ~₹4.5
  // Commercial snack average cost per 10g protein: ~₹55.0
  const dailyTens = dailyProteinGrams / 10
  const monthlyWholeFoodCost = Math.round(dailyTens * 4.5 * 30)
  const monthlyCommercialCost = Math.round(dailyTens * 55.0 * 30)
  const monthlySavings = monthlyCommercialCost - monthlyWholeFoodCost

  const sortedByValue = [...foods]
    .filter((f) => !f.isPackaged)
    .sort(
      (a, b) =>
        a.estimatedCostPer100g / a.proteinPer100g -
        b.estimatedCostPer100g / b.proteinPer100g
    )

  const handleAdd = (id: string) => {
    addToBasket(id, 100)
    setAddedIds((prev) => [...prev, id])
    setTimeout(() => {
      setAddedIds((prev) => prev.filter((item) => item !== id))
    }, 2000)
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Monthly Savings Simulator Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[rgba(91,110,44,0.22)] shadow-sm mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold block mb-2">
              Empirical Economics
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#20271D] leading-tight">
              30-Day Grocery Savings <br />
              <span className="text-[#5B6E2C] italic font-normal">Simulator.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#737B70] mt-3 leading-relaxed">
              Adjust your daily protein target to calculate your monthly expenditure on whole Indian
              staples vs relying on commercial gym bars and packaged protein cookies.
            </p>

            <div className="mt-8 space-y-3 max-w-md">
              <div className="flex justify-between items-baseline">
                <label htmlFor="daily-target-slider" className="text-xs font-semibold text-[#20271D]">Daily Protein Goal:</label>
                <span className="font-display text-2xl font-bold text-[#5B6E2C]">
                  {dailyProteinGrams} <span className="text-xs font-sans text-[#737B70]">g / day</span>
                </span>
              </div>
              <input
                id="daily-target-slider"
                type="range"
                min="40"
                max="160"
                step="5"
                value={dailyProteinGrams}
                onChange={(e) => setDailyProteinGrams(Number(e.target.value))}
                aria-label="Daily protein goal in grams"
                className="w-full h-2 bg-[rgba(91,110,44,0.18)] rounded-lg appearance-none cursor-pointer accent-[#5B6E2C]"
              />
            </div>
          </div>

          {/* Savings Outcome Bento */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)] flex flex-col justify-between">
              <span className="text-[11px] text-[#737B70] uppercase tracking-wider block">
                Whole Indian Staples
              </span>
              <div className="my-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#5B6E2C]">
                  ₹{monthlyWholeFoodCost}
                </span>
                <span className="text-xs text-[#737B70] block">/ month</span>
              </div>
              <span className="text-[11px] text-[#7D8D39]">Soy, Eggs, Dal & Chana</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#F3F6F4] border border-[#FF5A22]/20 flex flex-col justify-between">
              <span className="text-[11px] text-[#737B70] uppercase tracking-wider block">
                Commercial Snacks
              </span>
              <div className="my-2">
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#FF5A22]">
                  ₹{monthlyCommercialCost}
                </span>
                <span className="text-xs text-[#737B70] block">/ month</span>
              </div>
              <span className="text-[11px] text-[#FF5A22]">Bars & Ready-to-Drink Shakes</span>
            </div>

            <div className="col-span-1 sm:col-span-2 p-6 rounded-2xl bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#F3F6F4]/80 block">
                  Projected 30-Day Money Saved
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold">
                  ₹{monthlySavings.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="p-3 rounded-full bg-white/10">
                <Trophy className="w-8 h-8 text-[#FF5A22]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* National Value Leaderboard */}
      <div>
        <div className="mb-10 max-w-2xl">
          <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold block mb-1">
            Standardized Leaderboard
          </span>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#20271D]">
            The National Value Ranking.
          </h3>
          <p className="text-xs sm:text-sm text-[#737B70] mt-1">
            Ranked from absolute lowest cost per 10 grams of bioavailable protein.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedByValue.map((food, idx) => {
            const costPer10g = (
              (food.estimatedCostPer100g / food.proteinPer100g) *
              10
            ).toFixed(2)
            const isAdded = addedIds.includes(food.id)

            return (
              <div
                key={food.id}
                className="p-6 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#5B6E2C] font-mono">
                      #{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
                      {food.category}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl font-bold text-[#20271D]">
                    {food.name}
                  </h4>
                  {food.hindiName && (
                    <p className="text-xs text-[#737B70] mt-0.5">{food.hindiName}</p>
                  )}

                  <div className="my-4 space-y-1.5 text-xs text-[#737B70] pt-3 border-t border-[rgba(91,110,44,0.1)]">
                    <div className="flex justify-between">
                      <span>Protein Concentration:</span>
                      <strong className="text-[#20271D]">{food.proteinPer100g}% by weight</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Kirana Retail Cost:</span>
                      <span className="text-[#20271D]">~₹{food.estimatedCostPer100g * 10} / kg</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(91,110,44,0.15)] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#737B70] uppercase block">Cost / 10g:</span>
                    <strong className="font-display text-2xl font-bold text-[#5B6E2C]">
                      ₹{costPer10g}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(food.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                      isAdded
                        ? 'bg-[#7D8D39] text-white'
                        : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
