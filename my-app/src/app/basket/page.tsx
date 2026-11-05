'use client'

import React, { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { FOOD_DATABASE } from '@/data/foods'
import Link from 'next/link'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  Share2,
  Check,
  Receipt,
  Printer,
} from 'lucide-react'

export default function BasketPage() {
  const basketItems = useUserStore((state) => state.basketItems)
  const updateQuantity = useUserStore((state) => state.updateBasketQuantity)
  const removeFromBasket = useUserStore((state) => state.removeFromBasket)
  const clearBasket = useUserStore((state) => state.clearBasket)
  const loadSampleBasket = useUserStore((state) => state.loadSampleBasket)
  const dailyTarget = useUserStore((state) => state.dailyTargetProteinGrams) || 80

  const [copied, setCopied] = useState(false)

  // Calculate totals
  let totalCost = 0
  let totalProteinGrams = 0

  const enrichedItems = basketItems
    .map((item) => {
      const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
      if (!food) return null

      const multiplier = item.quantityGrams / 100
      const itemCost = food.estimatedCostPer100g * multiplier
      const itemProtein = food.proteinPer100g * multiplier

      totalCost += itemCost
      totalProteinGrams += itemProtein

      return {
        food,
        quantityGrams: item.quantityGrams,
        itemCost,
        itemProtein,
      }
    })
    .filter(Boolean) as {
    food: (typeof FOOD_DATABASE)[0]
    quantityGrams: number
    itemCost: number
    itemProtein: number
  }[]

  const avgCostPer10g =
    totalProteinGrams > 0 ? ((totalCost / totalProteinGrams) * 10).toFixed(2) : '0.00'
  const commercialEquivalentCost = Math.round((totalProteinGrams / 10) * 55)
  const moneySaved = Math.max(0, commercialEquivalentCost - Math.round(totalCost))
  const targetMet = totalProteinGrams >= dailyTarget

  const handleCopyList = () => {
    const lines = [
      '🧾 MACROSNAP SCIENTIFIC GROCERY LEDGER',
      '====================================',
      ...enrichedItems.map(
        (i) =>
          `• ${i.food.name}: ${i.quantityGrams}g (${i.itemProtein.toFixed(1)}g protein, ₹${Math.round(i.itemCost)})`
      ),
      '------------------------------------',
      `TOTAL PROTEIN: ${totalProteinGrams.toFixed(1)}g / ${dailyTarget}g target`,
      `TOTAL ESTIMATED COST: ₹${Math.round(totalCost)}`,
      `EST. SAVINGS VS COMMERCIAL BARS: ₹${moneySaved}`,
      '====================================',
      'Generated with MacroSnap — Know what you eat.',
    ]

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    })
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
            <Receipt className="w-3.5 h-3.5 text-[#7D8D39]" />
            <span>Thermal Whole-Food Provisioning Ledger</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
            The Kirana Receipt
          </h1>
          <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-2xl leading-relaxed">
            Your live virtual grocery ledger. Standardizes raw wholesale ingredients into daily protein yield, total rupees, and comparative commercial savings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {enrichedItems.length === 0 && (
            <button
              type="button"
              onClick={loadSampleBasket}
              className="px-5 py-2.5 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-mono tracking-wider uppercase font-semibold hover:bg-[#7D8D39] transition-all shadow-xs"
            >
              Load Sample Starter Basket
            </button>
          )}

          {enrichedItems.length > 0 && (
            <>
              <button
                type="button"
                onClick={handleCopyList}
                className="px-4 py-2.5 rounded-full bg-white text-[#20271D] border border-[rgba(91,110,44,0.25)] text-xs font-mono tracking-wider uppercase hover:border-[#5B6E2C] transition-all flex items-center gap-2 shadow-xs"
              >
                {copied ? <Check className="w-4 h-4 text-[#5B6E2C]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copied Receipt' : 'Export Receipt'}</span>
              </button>

              <button
                type="button"
                onClick={clearBasket}
                className="p-2.5 rounded-full text-[#737B70] hover:text-[#FF5A22] hover:bg-[#FF5A22]/10 transition-colors"
                aria-label="Clear All Items"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {enrichedItems.length === 0 ? (
        <div className="p-16 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm text-center max-w-2xl mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-[#F3F6F4] text-[#5B6E2C] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[#20271D] mb-3">
            Your Grocery Ledger is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#737B70] mb-8 leading-relaxed max-w-md mx-auto">
            Browse the 3D Book Archive or Nutritional Duel and add whole foods to calculate your real daily nutrition economics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={loadSampleBasket}
              className="px-6 py-3 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#7D8D39] transition-all shadow-xs"
            >
              Load Sample Starter Basket
            </button>
            <Link
              href="/explore"
              className="px-6 py-3 rounded-full bg-[#F3F6F4] text-[#20271D] text-xs font-mono uppercase tracking-wider font-semibold border border-[rgba(91,110,44,0.2)] hover:border-[#5B6E2C] transition-all"
            >
              Browse 3D Archive
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Physical Thermal Receipt Tape */}
          <div className="lg:col-span-7">
            <div className="relative p-8 sm:p-10 rounded-2xl bg-[#FCFAF5] border-x border-t border-[rgba(91,110,44,0.25)] shadow-xl font-mono text-[#20271D]">
              {/* Jagged Perforated Top Edge */}
              <div
                className="absolute -top-3 left-0 right-0 h-3 pointer-events-none opacity-80"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, transparent, transparent 50%, #FCFAF5 50%, #FCFAF5 100%)',
                  backgroundSize: '12px 12px',
                }}
                aria-hidden="true"
              />

              {/* Kirana Receipt Header */}
              <div className="text-center pb-6 border-b-2 border-dashed border-[#20271D]/20 mb-6 space-y-1">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5B6E2C]">
                  <Printer className="w-3.5 h-3.5" />
                  <span>MACROSNAP NUTRITION DISPENSARY</span>
                </div>
                <p className="text-[10px] text-[#737B70]">
                  TERMINAL: #MS-MUMBAI-01 &bull; ICMR-NIN IFCT 2017 STANDARDS
                </p>
                <p className="text-[10px] text-[#737B70]">
                  TIMESTAMP: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>

              {/* Line Items List */}
              <div className="space-y-4 pb-6 border-b-2 border-dashed border-[#20271D]/20">
                <div className="flex justify-between text-[11px] font-bold text-[#737B70] uppercase pb-2 border-b border-[#20271D]/10">
                  <span>ITEM / QUANTITY</span>
                  <div className="flex gap-8">
                    <span>PROTEIN</span>
                    <span>INR</span>
                  </div>
                </div>

                {enrichedItems.map((item) => (
                  <div
                    key={item.food.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-2 border-b border-[#20271D]/5"
                  >
                    <div>
                      <span className="font-bold text-xs uppercase block">
                        {item.food.name}
                      </span>
                      <span className="text-[10px] text-[#737B70] block">
                        ₹{item.food.estimatedCostPer100g} / 100g &bull; {item.food.proteinPer100g}g protein
                      </span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 pt-1 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-[rgba(91,110,44,0.2)]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.food.id, Math.max(0, item.quantityGrams - 50))}
                          className="p-1 hover:text-[#FF5A22]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-12 text-center">
                          {item.quantityGrams}g
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.food.id, item.quantityGrams + 50)}
                          className="p-1 hover:text-[#5B6E2C]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-[#5B6E2C] w-14 text-right">
                        {item.itemProtein.toFixed(1)}g
                      </span>

                      <span className="text-xs font-bold text-[#20271D] w-14 text-right">
                        ₹{Math.round(item.itemCost)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Receipt Totals Summary */}
              <div className="space-y-2 pt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[#737B70]">TOTAL PROTEIN YIELD:</span>
                  <span className="font-bold text-sm text-[#5B6E2C]">
                    {totalProteinGrams.toFixed(1)}g
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#737B70]">AVG COST / 10G PROTEIN:</span>
                  <span className="font-bold text-xs text-[#20271D]">
                    ₹{avgCostPer10g}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-3 border-t border-[#20271D]/15">
                  <span>TOTAL ESTIMATED CASH:</span>
                  <span className="text-base text-[#20271D]">
                    ₹{Math.round(totalCost)}
                  </span>
                </div>
              </div>

              {/* Simulated Thermal Barcode at Bottom */}
              <div className="pt-8 text-center">
                <div className="h-10 w-48 mx-auto bg-black flex items-center justify-between px-2 text-[8px] text-white tracking-widest">
                  |||||| |||| ||||||| ||||| |||||||
                </div>
                <span className="text-[9px] text-[#737B70] tracking-widest mt-1 block">
                  MACROSNAP-VERIFIED-AUTH-00912
                </span>
              </div>

              {/* Rubber Stamp of Physiological Target Met */}
              {targetMet && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] pointer-events-none p-4 rounded-xl border-4 border-[#5B6E2C] text-[#5B6E2C] font-mono text-center uppercase tracking-widest bg-white/90 shadow-2xl animate-in zoom-in-90 duration-300">
                  <span className="text-sm sm:text-base font-extrabold block">
                    ★ 100% TARGET MET ★
                  </span>
                  <span className="text-[10px] font-bold block mt-0.5">
                    PHYSIOLOGICAL DEMAND SATISFIED
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Economics & Goal Analysis */}
          <div className="lg:col-span-5 space-y-6">
            {/* Target Progress Card */}
            <div className="p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold">
                DAILY PROTEIN COMPLETION
              </span>
              <div className="flex justify-between items-baseline">
                <span className="font-display text-4xl font-bold text-[#20271D]">
                  {Math.round(totalProteinGrams)}
                  <span className="text-lg font-sans font-normal text-[#737B70]"> / {dailyTarget}g</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#5B6E2C]">
                  {Math.round((totalProteinGrams / dailyTarget) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-[#F3F6F4] overflow-hidden border border-[rgba(91,110,44,0.15)]">
                <div
                  className="h-full bg-[#5B6E2C] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (totalProteinGrams / dailyTarget) * 100)}%`,
                  }}
                />
              </div>

              <p className="text-xs text-[#737B70] leading-relaxed">
                {targetMet
                  ? 'Congratulations! This grocery basket completely fulfills your daily cellular nitrogen requirement using whole foods.'
                  : `Add ${(dailyTarget - totalProteinGrams).toFixed(0)}g more protein to hit your customized daily physiological target.`}
              </p>
            </div>

            {/* Monthly Household Savings Card */}
            <div className="p-8 rounded-3xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.2)] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FF5A22]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#20271D] font-bold">
                  COMMERCIAL EQUIVALENT SAVINGS
                </span>
              </div>

              <div>
                <span className="font-display text-4xl font-bold text-[#FF5A22]">
                  ₹{moneySaved}
                </span>
                <span className="text-xs text-[#737B70] ml-2 font-mono">Saved on this basket</span>
              </div>

              <p className="text-xs text-[#737B70] leading-relaxed">
                Purchasing the same {totalProteinGrams.toFixed(0)}g of protein via commercial bars or RTD shakes would cost approximately <strong className="text-[#20271D]">₹{commercialEquivalentCost}</strong>. That translates to <strong className="text-[#5B6E2C]">~₹{moneySaved * 30} saved per month</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
