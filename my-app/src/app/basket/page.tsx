'use client'

import React, { useState } from 'react'
import Image from 'next/image'
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
  Leaf,
  Egg,
  Zap,
  TrendingDown,
  Info,
  Calendar,
  X,
} from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'

// Curated authentic Indian whole-food grocery archetypes
const BASKET_PRESETS = [
  {
    id: 'vegan-spartan',
    name: 'Vegan Spartan',
    icon: Leaf,
    tag: 'Highest Yield',
    cost: '₹33/day',
    protein: '98g',
    desc: 'Pure plant nitrogen retention with zero cooking or simple boil.',
    items: [
      { foodId: 'soy-chunks', quantityGrams: 100 },
      { foodId: 'yellow-moong-dal', quantityGrams: 100 },
      { foodId: 'roasted-chana', quantityGrams: 100 },
    ],
  },
  {
    id: 'lacto-ovo',
    name: 'Vegetarian Gold',
    icon: Egg,
    tag: 'DIAAS Complete',
    cost: '₹73/day',
    protein: '92g',
    desc: 'Complete amino acid coverage with whole eggs, fresh paneer and hung curd.',
    items: [
      { foodId: 'eggs-whole', quantityGrams: 150 }, // ~3 eggs
      { foodId: 'paneer-fresh', quantityGrams: 150 },
      { foodId: 'greek-yogurt-unsweetened', quantityGrams: 150 },
    ],
  },
  {
    id: 'zero-cooking',
    name: 'Zero-Cooking Quick',
    icon: Zap,
    tag: 'Instant Prep',
    cost: '₹48/day',
    protein: '86g',
    desc: 'No stove, induction, or cookware needed. Sattu shake + roasted chana + peanuts.',
    items: [
      { foodId: 'sattu-chana', quantityGrams: 80 },
      { foodId: 'roasted-chana', quantityGrams: 100 },
      { foodId: 'roasted-peanuts', quantityGrams: 60 },
      { foodId: 'eggs-whole', quantityGrams: 100 },
    ],
  },
]

// Smart filler food candidates to close the protein gap
const FILLER_CANDIDATES = [
  { foodId: 'eggs-whole', label: '2 Whole Eggs', grams: 100, protein: 13.0, cost: 14 },
  { foodId: 'soy-chunks', label: '50g Soya Chunks', grams: 50, protein: 26.0, cost: 6 },
  { foodId: 'sattu-chana', label: '40g Chana Sattu', grams: 40, protein: 8.4, cost: 6 },
  { foodId: 'paneer-fresh', label: '100g Fresh Paneer', grams: 100, protein: 18.3, cost: 45 },
  { foodId: 'roasted-chana', label: '50g Roasted Chana', grams: 50, protein: 11.3, cost: 8 },
  { foodId: 'roasted-peanuts', label: '30g Roasted Peanuts', grams: 30, protein: 7.7, cost: 5 },
]

export default function BasketPage() {
  const basketItems = useUserStore((state) => state.basketItems)
  const addToBasket = useUserStore((state) => state.addToBasket)
  const updateQuantity = useUserStore((state) => state.updateBasketQuantity)
  const removeFromBasket = useUserStore((state) => state.removeFromBasket)
  const clearBasket = useUserStore((state) => state.clearBasket)
  const dailyTarget = useUserStore((state) => state.dailyTargetProteinGrams) || 80

  const [copied, setCopied] = useState(false)
  const [activePreset, setActivePreset] = useState<string | null>(null)

  // Enrich line items with full nutritional data
  let totalCost = 0
  let totalProteinGrams = 0
  let totalCalories = 0
  let totalCarbs = 0
  let totalFat = 0
  let totalFiber = 0

  const enrichedItems = basketItems
    .map((item) => {
      const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
      if (!food) return null

      const multiplier = item.quantityGrams / 100
      const itemCost = food.estimatedCostPer100g * multiplier
      const itemProtein = food.proteinPer100g * multiplier
      const itemCalories = food.caloriesPer100g * multiplier
      const itemCarbs = food.carbsPer100g * multiplier
      const itemFat = food.fatPer100g * multiplier
      const itemFiber = (food.fiberPer100g ?? 0) * multiplier

      totalCost += itemCost
      totalProteinGrams += itemProtein
      totalCalories += itemCalories
      totalCarbs += itemCarbs
      totalFat += itemFat
      totalFiber += itemFiber

      return {
        food,
        quantityGrams: item.quantityGrams,
        itemCost,
        itemProtein,
        itemCalories,
        costPer10g: itemProtein > 0 ? (itemCost / itemProtein) * 10 : 0,
      }
    })
    .filter(Boolean) as {
    food: FoodItem
    quantityGrams: number
    itemCost: number
    itemProtein: number
    itemCalories: number
    costPer10g: number
  }[]

  // Sort items by value efficiency for ranking badges
  const sortedByEfficiency = [...enrichedItems].sort((a, b) => a.costPer10g - b.costPer10g)

  const avgCostPer10g =
    totalProteinGrams > 0 ? ((totalCost / totalProteinGrams) * 10).toFixed(2) : '0.00'
  const commercialEquivalentCost = Math.round((totalProteinGrams / 10) * 55)
  const moneySaved = Math.max(0, commercialEquivalentCost - Math.round(totalCost))
  const targetMet = totalProteinGrams >= dailyTarget
  const remainingDeficit = Math.max(0, dailyTarget - totalProteinGrams)

  // Macro calorie ratios
  const proteinCals = totalProteinGrams * 4
  const carbsCals = totalCarbs * 4
  const fatCals = totalFat * 9
  const sumMacroCals = proteinCals + carbsCals + fatCals || 1
  const proteinPct = Math.round((proteinCals / sumMacroCals) * 100)
  const carbsPct = Math.round((carbsCals / sumMacroCals) * 100)
  const fatPct = Math.round((fatCals / sumMacroCals) * 100)

  // Load preset archetypes
  const handleLoadPreset = (preset: typeof BASKET_PRESETS[0]) => {
    setActivePreset(preset.id)
    clearBasket()
    preset.items.forEach((item) => {
      addToBasket(item.foodId, item.quantityGrams)
    })
  }

  // Quick gap filler addition
  const handleQuickAdd = (candidate: typeof FILLER_CANDIDATES[0]) => {
    addToBasket(candidate.foodId, candidate.grams)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleCopyList = () => {
    const lines = [
      '🧾 MACROSNAP KITCHEN LEDGER — SCIENTIFIC WHOLE-FOOD PROVISIONING',
      '================================================================',
      `Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      'Standards: ICMR-NIN IFCT 2017 & FSSAI Benchmarks',
      '----------------------------------------------------------------',
      ...enrichedItems.map((i, idx) => {
        const rank = sortedByEfficiency.findIndex((s) => s.food.id === i.food.id) + 1
        return `${idx + 1}. ${i.food.name} (${i.food.hindiName || ''}) — ${i.quantityGrams}g [#${rank} Value]\n   Protein: ${i.itemProtein.toFixed(1)}g | Cost: ₹${Math.round(i.itemCost)} (₹${i.costPer10g.toFixed(2)} / 10g)`
      }),
      '----------------------------------------------------------------',
      `TOTAL PROTEIN YIELD: ${totalProteinGrams.toFixed(1)}g / ${dailyTarget}g target (${Math.round((totalProteinGrams / dailyTarget) * 100)}%)`,
      `TOTAL ENERGY: ${Math.round(totalCalories)} kcal`,
      `MACRO RATIOS: ${proteinPct}% Protein | ${carbsPct}% Carbs | ${fatPct}% Fat | ${totalFiber.toFixed(1)}g Fiber`,
      `TOTAL WHOLE-FOOD CASH: ₹${Math.round(totalCost)}`,
      `COMMERCIAL EQUIVALENT: ₹${commercialEquivalentCost}`,
      `NET ESTIMATED SAVINGS: ₹${moneySaved}/day (₹${moneySaved * 30}/month)`,
      '================================================================',
      'Generated via MacroSnap — Know what you eat.',
    ]

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
            <Receipt className="w-3.5 h-3.5 text-[#7D8D39]" />
            <span>Tactile Kirana Ledger &bull; Thermal Dispensary</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
            The Kirana Receipt.
          </h1>
          <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
            Standardizes authentic Indian whole-food staples into daily protein yield, metabolic macro spectrum,
            and real-world rupee economics against overpriced commercial snacks.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {enrichedItems.length > 0 && (
            <>
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2 rounded-full bg-white text-[#101410] border border-[rgba(91,110,44,0.25)] text-xs font-mono uppercase tracking-wider hover:border-[#5B6E2C] transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
                title="Print physical thermal receipt"
              >
                <Printer className="w-3.5 h-3.5 text-[#5B6E2C]" />
                <span className="hidden sm:inline">Print Receipt</span>
              </button>

              <button
                type="button"
                onClick={handleCopyList}
                className="px-4 py-2 rounded-full bg-white text-[#101410] border border-[rgba(91,110,44,0.25)] text-xs font-mono uppercase tracking-wider hover:border-[#5B6E2C] transition-all flex items-center gap-2 shadow-2xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#5B6E2C]" /> : <Share2 className="w-3.5 h-3.5 text-[#5B6E2C]" />}
                <span>{copied ? 'Copied Ledger' : 'Export Ledger'}</span>
              </button>

              <button
                type="button"
                onClick={clearBasket}
                className="p-2.5 rounded-full text-[#737B70] hover:text-[#FF5A22] hover:bg-[#FF5A22]/10 transition-colors cursor-pointer"
                aria-label="Clear All Items"
                title="Empty basket"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preset Strategy Switcher Chips */}
      <div className="mb-10 print:hidden">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7D8D39] font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Curated Dietary Strategies (1-Click Load):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BASKET_PRESETS.map((preset) => {
            const Icon = preset.icon
            const isSelected = activePreset === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-[#5B6E2C]/10 border-[#5B6E2C] shadow-sm'
                    : 'bg-white border-[#5B6E2C]/15 hover:border-[#5B6E2C]/40 hover:bg-[#F3F6F4]'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${isSelected ? 'bg-[#5B6E2C] text-white' : 'bg-[#F3F6F4] text-[#5B6E2C]'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-display font-bold text-sm text-[#101410] truncate">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#5B6E2C]/15 text-[#5B6E2C] shrink-0">
                      {preset.cost}
                    </span>
                  </div>
                  <p className="text-xs text-[#5E5E61] line-clamp-1 leading-relaxed">
                    {preset.desc}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {enrichedItems.length === 0 ? (
        /* Empty State */
        <div className="p-12 sm:p-16 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-xs text-center max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#F3F6F4] text-[#5B6E2C] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-display text-3xl font-bold text-[#101410] mb-3">
            Your Grocery Ledger is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#5E5E61] mb-8 leading-relaxed max-w-md mx-auto">
            Load an authentic Indian dietary strategy above, explore the 3D shelf archive, or inspect budget protein champions to calculate your live nutrition economics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleLoadPreset(BASKET_PRESETS[0]!)}
              className="px-6 py-3 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#7D8D39] transition-all shadow-xs cursor-pointer"
            >
              Load Vegan Spartan ({BASKET_PRESETS[0]!.cost})
            </button>
            <Link
              href="/budget"
              className="px-6 py-3 rounded-full bg-[#F3F6F4] text-[#101410] text-xs font-mono uppercase tracking-wider font-semibold border border-[rgba(91,110,44,0.2)] hover:border-[#5B6E2C] transition-all"
            >
              Explore 3D Budget Ribbon
            </Link>
          </div>
        </div>
      ) : (
        /* Populated Basket Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Physical Thermal Receipt Tape */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-10 rounded-2xl bg-[#FCFAF6] border border-[rgba(91,110,44,0.22)] shadow-xl font-mono text-[#101410] overflow-hidden">
              {/* Jagged Perforated Top Edge */}
              <div
                className="absolute top-0 left-0 right-0 h-2 pointer-events-none opacity-60"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, transparent, transparent 50%, #FCFAF6 50%, #FCFAF6 100%)',
                  backgroundSize: '10px 10px',
                }}
                aria-hidden="true"
              />

              {/* Kirana Receipt Header */}
              <div className="text-center pb-6 border-b-2 border-dashed border-[#101410]/20 mb-6 space-y-1">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-[#08482D]">
                  <Printer className="w-3.5 h-3.5 text-[#5B6E2C]" />
                  <span>MACROSNAP NUTRITIONAL DISPENSARY</span>
                </div>
                <p className="text-[10px] text-[#5E5E61]">
                  TERMINAL: #MS-MUMBAI-01 &bull; ICMR-NIN IFCT 2017 STANDARDS
                </p>
                <p className="text-[10px] text-[#5E5E61]">
                  TIMESTAMP: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} &bull; CASH BENCHMARK
                </p>
              </div>

              {/* Line Items List with Food Photography & Efficiency Rank */}
              <div className="space-y-4 pb-6 border-b-2 border-dashed border-[#101410]/20">
                <div className="flex justify-between text-[10px] font-bold text-[#737B70] uppercase pb-2 border-b border-[#101410]/10 tracking-wider">
                  <span>ITEM / WHOLE FOOD</span>
                  <div className="flex gap-8 sm:gap-12 text-right">
                    <span>PROTEIN</span>
                    <span>PRICE</span>
                  </div>
                </div>

                {enrichedItems.map((item) => {
                  const efficiencyRank =
                    sortedByEfficiency.findIndex((s) => s.food.id === item.food.id) + 1
                  const isTopRank = efficiencyRank === 1

                  return (
                    <div
                      key={item.food.id}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b border-[#101410]/5 transition-colors hover:bg-black/[0.015] -mx-2 px-2 rounded-xl"
                    >
                      {/* Left: Food Image Thumbnail + Name + Rank Badge */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#5B6E2C]/20 shrink-0 bg-white shadow-2xs">
                          {item.food.imageUrl ? (
                            <Image
                              src={item.food.imageUrl}
                              alt={item.food.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#5B6E2C]/10 text-xs font-bold text-[#5B6E2C]">
                              {item.food.name.slice(0, 2)}
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs uppercase text-[#101410] line-clamp-1">
                              {item.food.name}
                            </span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase tracking-wider shrink-0 ${
                                isTopRank
                                  ? 'bg-[#FF5A22] text-white'
                                  : 'bg-[#5B6E2C]/15 text-[#5B6E2C]'
                              }`}
                              title={`Ranked #${efficiencyRank} in rupee-per-protein cost efficiency in your basket`}
                            >
                              #{efficiencyRank} Value
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[10px] text-[#5E5E61] mt-0.5">
                            {item.food.hindiName && (
                              <span className="font-sans text-xs text-[#5B6E2C]">
                                {item.food.hindiName}
                              </span>
                            )}
                            <span>&bull;</span>
                            <span>
                              ₹{item.food.estimatedCostPer100g}/100g (₹{item.costPer10g.toFixed(2)}/10g)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Yield */}
                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-1 sm:pt-0">
                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-[rgba(91,110,44,0.2)] shadow-2xs">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.food.id, Math.max(0, item.quantityGrams - 50))}
                            className="p-1 hover:text-[#FF5A22] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-12 text-center text-[#101410]">
                            {item.quantityGrams}g
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.food.id, item.quantityGrams + 50)}
                            className="p-1 hover:text-[#5B6E2C] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Protein Yield */}
                        <span className="text-xs font-bold text-[#08482D] w-14 text-right">
                          {item.itemProtein.toFixed(1)}g
                        </span>

                        {/* Cost Yield */}
                        <span className="text-xs font-bold text-[#101410] w-14 text-right">
                          ₹{Math.round(item.itemCost)}
                        </span>

                        {/* Remove item */}
                        <button
                          type="button"
                          onClick={() => removeFromBasket(item.food.id)}
                          className="opacity-40 group-hover:opacity-100 p-1 hover:text-[#FF5A22] transition-opacity cursor-pointer"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Receipt Totals Summary */}
              <div className="space-y-2.5 pt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-[#5E5E61]">TOTAL PROTEIN YIELD:</span>
                  <span className="font-bold text-sm text-[#08482D]">
                    {totalProteinGrams.toFixed(1)}g
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#5E5E61]">TOTAL ESTIMATED CALORIES:</span>
                  <span className="font-bold text-xs text-[#101410]">
                    {Math.round(totalCalories)} kcal
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#5E5E61]">STANDARDIZED YIELD / 10G:</span>
                  <span className="font-bold text-xs text-[#5B6E2C]">
                    ₹{avgCostPer10g}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-3 border-t-2 border-[#101410]/20">
                  <span>TOTAL ESTIMATED CASH:</span>
                  <span className="text-lg text-[#101410]">
                    ₹{Math.round(totalCost)}
                  </span>
                </div>
              </div>

              {/* Simulated Thermal Barcode at Bottom */}
              <div className="pt-8 text-center">
                <div className="h-10 w-52 mx-auto bg-black flex items-center justify-between px-3 text-[9px] text-white tracking-widest font-mono">
                  ||||| |||| ||||||| |||| ||||||
                </div>
                <span className="text-[9px] text-[#5E5E61] tracking-widest mt-1.5 block">
                  MACROSNAP-VERIFIED-AUTH-00912 &bull; ZERO GYM TAX
                </span>
              </div>

              {/* Rubber Stamp of Physiological Target Met */}
              {targetMet && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] pointer-events-none p-5 rounded-2xl border-4 border-[#08482D] text-[#08482D] font-mono text-center uppercase tracking-widest bg-white/95 shadow-2xl backdrop-blur-xs animate-in zoom-in-75 duration-300">
                  <div className="border border-dashed border-[#08482D] p-3 rounded-lg">
                    <span className="text-sm sm:text-base font-extrabold block">
                      ★ 100% TARGET SATISFIED ★
                    </span>
                    <span className="text-[10px] font-bold block mt-1 tracking-wider text-[#5B6E2C]">
                      CELLULAR NITROGEN BALANCE ACHIEVED
                    </span>
                    <span className="text-[8px] font-mono block mt-1 text-[#737B70]">
                      ICMR-NIN STANDARDS &bull; ZERO BRO-SCIENCE
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Macro Spectrum & Gap Closers */}
          <div className="lg:col-span-5 space-y-6">
            {/* Target Progress Card with 1-Click Gap Fillers */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
                  DAILY PROTEIN COMPLETION
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-[#5B6E2C]/10 text-[#5B6E2C]">
                  Target: {dailyTarget}g
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#101410]">
                  {Math.round(totalProteinGrams)}
                  <span className="text-lg font-sans font-normal text-[#5E5E61]"> / {dailyTarget}g</span>
                </span>
                <span className={`text-sm font-mono font-bold ${targetMet ? 'text-[#08482D]' : 'text-[#FF5A22]'}`}>
                  {Math.round((totalProteinGrams / dailyTarget) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-[#F3F6F4] overflow-hidden border border-[rgba(91,110,44,0.15)]">
                <div
                  className="h-full bg-gradient-to-r from-[#5B6E2C] to-[#7D8D39] rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (totalProteinGrams / dailyTarget) * 100)}%`,
                  }}
                />
              </div>

              <p className="text-xs text-[#5E5E61] leading-relaxed">
                {targetMet
                  ? 'Congratulations! This grocery basket completely satisfies your customized daily cellular nitrogen requirement using whole Indian foods.'
                  : `Add ${remainingDeficit.toFixed(0)}g more protein to hit your daily physiological target.`}
              </p>

              {/* Dynamic 1-Click Gap Filler Suggestions */}
              {!targetMet && (
                <div className="pt-4 border-t border-[#5B6E2C]/15 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#08482D] font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
                    <span>Quick Gap Closers (1-Click Add):</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {FILLER_CANDIDATES.slice(0, 3).map((candidate) => (
                      <button
                        key={candidate.foodId}
                        type="button"
                        onClick={() => handleQuickAdd(candidate)}
                        className="px-3 py-1.5 rounded-xl bg-[#F3F6F4] hover:bg-[#5B6E2C] hover:text-white text-[#101410] text-xs font-mono font-medium border border-[#5B6E2C]/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs group"
                      >
                        <Plus className="w-3 h-3 text-[#5B6E2C] group-hover:text-white" />
                        <span>{candidate.label}</span>
                        <span className="text-[10px] text-[#5B6E2C] group-hover:text-white/80">
                          (+{candidate.protein}g &bull; ₹{candidate.cost})
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Macro & Metabolic Distribution Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-xs space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[#08482D] font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#7D8D39]" />
                <span>Metabolic Macro Spectrum</span>
              </span>

              {/* Segmented Macro Bar */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#F3F6F4] border border-black/5">
                <div
                  style={{ width: `${proteinPct}%` }}
                  className="bg-[#08482D] h-full"
                  title={`Protein: ${proteinPct}%`}
                />
                <div
                  style={{ width: `${carbsPct}%` }}
                  className="bg-[#7D8D39] h-full"
                  title={`Carbs: ${carbsPct}%`}
                />
                <div
                  style={{ width: `${fatPct}%` }}
                  className="bg-[#FF5A22] h-full"
                  title={`Fat: ${fatPct}%`}
                />
              </div>

              {/* Macro Legend */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="p-2 rounded-xl bg-[#08482D]/5 border border-[#08482D]/10">
                  <div className="text-[10px] text-[#08482D] font-bold uppercase">Protein</div>
                  <div className="font-bold text-sm text-[#08482D]">{totalProteinGrams.toFixed(0)}g</div>
                  <div className="text-[9px] text-[#5E5E61]">{proteinPct}% cals</div>
                </div>
                <div className="p-2 rounded-xl bg-[#7D8D39]/10 border border-[#7D8D39]/20">
                  <div className="text-[10px] text-[#5B6E2C] font-bold uppercase">Carbs</div>
                  <div className="font-bold text-sm text-[#5B6E2C]">{totalCarbs.toFixed(0)}g</div>
                  <div className="text-[9px] text-[#5E5E61]">{carbsPct}% cals</div>
                </div>
                <div className="p-2 rounded-xl bg-[#FF5A22]/5 border border-[#FF5A22]/15">
                  <div className="text-[10px] text-[#FF5A22] font-bold uppercase">Fats</div>
                  <div className="font-bold text-sm text-[#FF5A22]">{totalFat.toFixed(0)}g</div>
                  <div className="text-[9px] text-[#5E5E61]">{fatPct}% cals</div>
                </div>
              </div>

              {/* Fiber Highlight */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#DAE7C7]/40 border border-[#08482D]/15 text-xs">
                <div className="flex items-center gap-2">
                  <Leaf className="w-3.5 h-3.5 text-[#08482D]" />
                  <span className="font-medium text-[#101410]">Prebiotic Dietary Fiber:</span>
                </div>
                <span className="font-mono font-bold text-[#08482D]">
                  {totalFiber.toFixed(1)}g / 30g Daily Goal
                </span>
              </div>
            </div>

            {/* Monthly Household Savings Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.2)] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#FF5A22]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#101410] font-bold">
                  KIRANA BILL VS COMMERCIAL TAX
                </span>
              </div>

              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#FF5A22]">
                  ₹{moneySaved}
                </span>
                <span className="text-xs text-[#5E5E61] ml-2 font-mono">Saved on today&apos;s groceries</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-1">
                <div className="p-3 rounded-xl bg-white/70 border border-[#5B6E2C]/15">
                  <div className="text-[10px] text-[#5E5E61] uppercase">30-Day Savings</div>
                  <div className="font-bold text-base text-[#08482D]">₹{moneySaved * 30}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/70 border border-[#5B6E2C]/15">
                  <div className="text-[10px] text-[#5E5E61] uppercase">1-Year Savings</div>
                  <div className="font-bold text-base text-[#FF5A22]">₹{moneySaved * 365}</div>
                </div>
              </div>

              <p className="text-xs text-[#5E5E61] leading-relaxed">
                Purchasing the same {totalProteinGrams.toFixed(0)}g of protein via packaged gym bars or RTD shakes would cost approximately <strong className="text-[#101410]">₹{commercialEquivalentCost}</strong>. That translates to <strong className="text-[#08482D]">~₹{moneySaved * 30} saved every month</strong> without giving up real food.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
