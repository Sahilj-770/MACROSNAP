'use client'

import React, { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { useUserStore } from '@/store/useUserStore'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeftRight,
  Scale,
  ShoppingBag,
  Bookmark,
  Trophy,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

const PRESET_MATCHUPS = [
  { label: '⚡ Bar vs Soy Chunks', a: 'commercial-protein-bar', b: 'soy-chunks' },
  { label: '🥣 Bar vs Bhuna Chana', a: 'commercial-protein-bar', b: 'roasted-chana' },
  { label: '🧀 Fresh Paneer vs Tofu', a: 'paneer-fresh', b: 'tofu-firm' },
  { label: '🍳 Desi Eggs vs Whey Isolate', a: 'eggs-whole', b: 'whey-protein-isolate' },
  { label: '🥜 Peanuts vs Chana', a: 'roasted-peanuts', b: 'roasted-chana' },
]

function CompareContent() {
  const searchParams = useSearchParams()
  const rawFoodA = searchParams?.get('foodA')
  const rawFoodB = searchParams?.get('foodB')

  // Validate initial IDs against FOOD_DATABASE
  const initialFoodA = useMemo(() => {
    return FOOD_DATABASE.some((f) => f.id === rawFoodA) ? (rawFoodA as string) : 'commercial-protein-bar'
  }, [rawFoodA])

  const initialFoodB = useMemo(() => {
    return FOOD_DATABASE.some((f) => f.id === rawFoodB) ? (rawFoodB as string) : 'soy-chunks'
  }, [rawFoodB])

  const [foodAId, setFoodAId] = useState<string>(initialFoodA)
  const [foodBId, setFoodBId] = useState<string>(initialFoodB)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (initialFoodA) setFoodAId(initialFoodA)
    if (initialFoodB) setFoodBId(initialFoodB)
  }, [initialFoodA, initialFoodB])

  const { saveComparison, addToBasket } = useUserStore()

  const foodA = useMemo(() => FOOD_DATABASE.find((f) => f.id === foodAId) || FOOD_DATABASE[0]!, [foodAId])
  const foodB = useMemo(() => FOOD_DATABASE.find((f) => f.id === foodBId) || FOOD_DATABASE[1]!, [foodBId])

  const costPer10gA = Number(((foodA.estimatedCostPer100g / foodA.proteinPer100g) * 10).toFixed(1))
  const costPer10gB = Number(((foodB.estimatedCostPer100g / foodB.proteinPer100g) * 10).toFixed(1))

  const isBCheaper = costPer10gB < costPer10gA
  const costSavings = Math.abs(costPer10gA - costPer10gB).toFixed(1)
  const costRatio = (Math.max(costPer10gA, costPer10gB) / Math.max(0.1, Math.min(costPer10gA, costPer10gB))).toFixed(1)

  const swapSelections = () => {
    const temp = foodAId
    setFoodAId(foodBId)
    setFoodBId(temp)
  }

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const handleSaveComparison = () => {
    saveComparison(foodA.id, foodB.id)
    showToast(`✨ Saved duel: ${foodA.name} vs ${foodB.name}`)
  }

  const handleAddToBasket = (foodId: string, grams: number, name: string) => {
    addToBasket(foodId, grams)
    showToast(`🛒 Added ${grams}g ${name} to your Virtual Basket`)
  }

  return (
    <div className="min-h-screen bg-[#050B07] text-cream pb-24 relative selection:bg-chartreuse selection:text-forest">
      {/* Non-blocking Live Notification Toast */}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 pointer-events-none"
      >
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="pointer-events-auto bg-[#0D2316] text-cream border-2 border-chartreuse px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(216,243,67,0.3)] font-mono text-xs font-bold flex items-center gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-chartreuse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold tracking-widest uppercase shadow-md">
            <Scale className="w-3.5 h-3.5" />
            <span>STUDIO 02 // PRECISION SHOWDOWN</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[0.94]">
            Head-to-Head <br />
            <span className="text-chartreuse italic font-normal">Reckoning.</span>
          </h1>
          <p className="text-sm sm:text-base font-mono text-cream/70 max-w-2xl mx-auto leading-relaxed">
            Normalize biological yields, strip away marketing claims, and calculate the exact rupee cost per 10 grams of usable muscle protein.
          </p>

          {/* Preset Quick-Pick Chips */}
          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {PRESET_MATCHUPS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  setFoodAId(preset.a)
                  setFoodBId(preset.b)
                }}
                className="min-h-[44px] px-4 py-2 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/15 text-cream/90 hover:bg-chartreuse hover:text-forest hover:border-chartreuse transition-all shadow-sm active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selectors and Swap Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Contender A Selector */}
            <div className="md:col-span-5 space-y-2">
              <label htmlFor="select-contender-a" className="text-[11px] font-mono text-white/50 uppercase font-bold block">
                Contender A (Benchmark)
              </label>
              <select
                id="select-contender-a"
                value={foodAId}
                onChange={(e) => setFoodAId(e.target.value)}
                className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-black/60 border border-white/15 text-white text-sm font-mono font-bold focus:outline-none focus:border-chartreuse focus-visible:ring-2 focus-visible:ring-chartreuse cursor-pointer shadow-inner"
              >
                {FOOD_DATABASE.map((f) => (
                  <option key={f.id} value={f.id} className="bg-[#050B07] text-white">
                    {f.name} — {f.proteinPer100g}g Pro / 100g
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Trigger */}
            <div className="md:col-span-1 flex justify-center py-2">
              <button
                onClick={swapSelections}
                className="w-12 h-12 rounded-full bg-chartreuse border border-forest text-forest flex items-center justify-center hover:rotate-180 transition-transform shadow-lg cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                title="Swap contenders"
                aria-label="Swap food contenders"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>

            {/* Contender B Selector */}
            <div className="md:col-span-5 space-y-2">
              <label htmlFor="select-contender-b" className="text-[11px] font-mono text-white/50 uppercase font-bold block">
                Contender B (Kitchen / Alternative)
              </label>
              <select
                id="select-contender-b"
                value={foodBId}
                onChange={(e) => setFoodBId(e.target.value)}
                className="w-full min-h-[44px] py-3 px-4 rounded-2xl bg-black/60 border border-white/15 text-white text-sm font-mono font-bold focus:outline-none focus:border-chartreuse focus-visible:ring-2 focus-visible:ring-chartreuse cursor-pointer shadow-inner"
              >
                {FOOD_DATABASE.map((f) => (
                  <option key={f.id} value={f.id} className="bg-[#050B07] text-white">
                    {f.name} — {f.proteinPer100g}g Pro / 100g
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* The Dynamic Showdown Verdict Banner */}
        <motion.div
          key={`${foodAId}-${foodBId}-verdict`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="p-6 sm:p-8 rounded-3xl bg-forest-deep/90 backdrop-blur-xl border-2 border-chartreuse/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-black uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>Economic & Biological Verdict</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              {isBCheaper ? foodB.name : foodA.name} is {costRatio}x More Cost Efficient.
            </h2>
            <p className="text-xs sm:text-sm font-mono text-cream/75 max-w-2xl">
              Switching delivers the identical 10g of complete protein while saving{' '}
              <span className="text-chartreuse font-bold">₹{costSavings} every single serving</span>.
              {isBCheaper && foodB.isPackaged === false && ' Zero artificial humectants, zero polyols.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <button
              onClick={handleSaveComparison}
              className="min-h-[44px] px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream text-xs font-mono font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <Bookmark className="w-3.5 h-3.5 text-chartreuse" />
              <span>Save Matchup</span>
            </button>
            <button
              onClick={() => handleAddToBasket(isBCheaper ? foodB.id : foodA.id, 100, isBCheaper ? foodB.name : foodA.name)}
              className="min-h-[44px] px-6 py-3 rounded-full bg-chartreuse text-forest hover:bg-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              <span>Add Winner to Basket</span>
            </button>
          </div>
        </motion.div>

        {/* Visual Side-by-Side Contender Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Contender A Visual Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/10 text-white border border-white/15">
                  {foodA.category}
                </span>
                <span className="text-xs font-mono text-white/50 uppercase">
                  {foodA.isPackaged ? 'Packaged Shelf Item' : 'Whole Kitchen Food'}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-black font-serif text-white">{foodA.name}</h3>
                {foodA.hindiName && <p className="text-sm font-serif italic text-white/60">{foodA.hindiName}</p>}
              </div>

              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/60">
                <Image
                  src={foodA.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'}
                  alt={foodA.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-xs font-mono text-white/80 bg-black/75 px-3 py-1 rounded-md border border-white/10">
                    {foodA.servingDescription}
                  </span>
                  <span className="text-2xl font-black font-mono text-chartreuse">
                    {foodA.proteinPer100g}g Pro / 100g
                  </span>
                </div>
              </div>

              {/* Protein Concentration Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60 uppercase">Protein Concentration</span>
                  <span className="font-bold text-white">{((foodA.proteinPer100g / 60) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (foodA.proteinPer100g / 60) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-white/60"
                  />
                </div>
              </div>

              {/* Metric Comparison Tiles */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/60 uppercase block">Cost / 10g Protein</span>
                  <span className="text-2xl font-black text-white block">₹{costPer10gA}</span>
                  <span className="text-[10px] text-white/50">Market reference</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/60 uppercase block">Dietary Fiber</span>
                  <span className="text-2xl font-black text-white block">
                    {foodA.fiberPer100g ? `${foodA.fiberPer100g}g` : '0.0g'}
                  </span>
                  <span className="text-[10px] text-white/50">Prebiotic Gut Support</span>
                </div>
              </div>

              {/* Macro Composition Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Calories</span>
                  <span className="font-bold text-white">{foodA.caloriesPer100g} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Carbs</span>
                  <span className="font-bold text-white">{foodA.carbsPer100g}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Fat</span>
                  <span className="font-bold text-white">{foodA.fatPer100g}g</span>
                </div>
              </div>

              {/* Practical Insight */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-cream/70 leading-relaxed font-sans">
                <strong className="font-mono text-white/80 uppercase block text-[10px] mb-1">Laboratory Note:</strong>
                {foodA.highlightTip}
              </div>
            </div>

            <button
              onClick={() => handleAddToBasket(foodA.id, foodA.servingSizeGrams, foodA.name)}
              className="min-h-[44px] w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 border border-white/15 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <ShoppingBag className="w-4 h-4 text-cream/70" />
              <span>Add {foodA.name} to Basket</span>
            </button>
          </div>

          {/* Contender B Visual Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-forest-deep/90 backdrop-blur-xl border-2 border-chartreuse/60 hover:border-chartreuse transition-all flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-chartreuse text-forest">
                  {foodB.category}
                </span>
                <span className="text-xs font-mono text-chartreuse font-bold uppercase">
                  {foodB.isPackaged ? 'Packaged Alternative' : 'Real Kitchen Staple'}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-black font-serif text-chartreuse">{foodB.name}</h3>
                {foodB.hindiName && <p className="text-sm font-serif italic text-cream/70">{foodB.hindiName}</p>}
              </div>

              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-chartreuse/30 bg-black/60">
                <Image
                  src={foodB.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'}
                  alt={foodB.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <span className="text-xs font-mono text-cream/90 bg-black/75 px-3 py-1 rounded-md border border-chartreuse/30">
                    {foodB.servingDescription}
                  </span>
                  <span className="text-2xl font-black font-mono text-chartreuse">
                    {foodB.proteinPer100g}g Pro / 100g
                  </span>
                </div>
              </div>

              {/* Protein Concentration Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60 uppercase">Protein Concentration</span>
                  <span className="font-bold text-chartreuse">{((foodB.proteinPer100g / 60) * 100).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (foodB.proteinPer100g / 60) * 100)}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full rounded-full bg-chartreuse"
                  />
                </div>
              </div>

              {/* Metric Comparison Tiles */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-chartreuse/30 space-y-1">
                  <span className="text-[10px] text-white/60 uppercase block">Cost / 10g Protein</span>
                  <span className="text-2xl font-black text-chartreuse block">₹{costPer10gB}</span>
                  <span className="text-[10px] text-white/50">Kirana benchmark</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/60 uppercase block">Dietary Fiber</span>
                  <span className="text-2xl font-black text-white block">
                    {foodB.fiberPer100g ? `${foodB.fiberPer100g}g` : '0.0g'}
                  </span>
                  <span className="text-[10px] text-white/50">Prebiotic Gut Support</span>
                </div>
              </div>

              {/* Macro Composition Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono text-xs">
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Calories</span>
                  <span className="font-bold text-white">{foodB.caloriesPer100g} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Carbs</span>
                  <span className="font-bold text-white">{foodB.carbsPer100g}g</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/50 block uppercase">Fat</span>
                  <span className="font-bold text-white">{foodB.fatPer100g}g</span>
                </div>
              </div>

              {/* Practical Laboratory Insight */}
              <div className="p-4 rounded-2xl bg-white/5 border border-chartreuse/20 text-xs text-cream/80 leading-relaxed font-sans">
                <strong className="font-mono text-chartreuse uppercase block text-[10px] mb-1">Laboratory Note:</strong>
                {foodB.highlightTip}
              </div>
            </div>

            <button
              onClick={() => handleAddToBasket(foodB.id, foodB.servingSizeGrams, foodB.name)}
              className="min-h-[44px] w-full py-3.5 rounded-2xl bg-chartreuse text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-white flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              <span>Add {foodB.name} to Basket</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050B07] flex items-center justify-center font-mono text-xs text-chartreuse">
          Loading Showdown Studio...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  )
}
