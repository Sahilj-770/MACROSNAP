'use client'

import React, { useState, useMemo, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { useUserStore } from '@/store/useUserStore'
import CountUp from '@/components/CountUp'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeftRight,
  Sparkles,
  Scale,
  ShoppingBag,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Zap,
  Bookmark,
  Share2,
  Trophy,
} from 'lucide-react'

const PRESET_MATCHUPS = [
  { label: '⚡ Bar vs Soy Chunks', a: 'commercial-protein-bar', b: 'soy-chunks' },
  { label: '🥛 RTD Shake vs Bhuna Chana', a: 'protein-shake-commercial', b: 'roasted-chana' },
  { label: '🧀 Fresh Paneer vs Tofu', a: 'paneer-raw', b: 'firm-tofu' },
  { label: '🍳 Desi Eggs vs Whey Isolate', a: 'boiled-egg-whole', b: 'whey-protein-isolate' },
  { label: '🥜 Peanut Butter vs Sattu', a: 'peanut-butter', b: 'roasted-chana' },
]

function CompareContent() {
  const searchParams = useSearchParams()
  const initialFoodA = searchParams?.get('foodA') || 'commercial-protein-bar'
  const initialFoodB = searchParams?.get('foodB') || 'soy-chunks'

  const [foodAId, setFoodAId] = useState<string>(initialFoodA)
  const [foodBId, setFoodBId] = useState<string>(initialFoodB)

  const { saveComparison, addToBasket } = useUserStore()

  const foodA = useMemo(() => FOOD_DATABASE.find((f) => f.id === foodAId) || FOOD_DATABASE[0]!, [foodAId])
  const foodB = useMemo(() => FOOD_DATABASE.find((f) => f.id === foodBId) || FOOD_DATABASE[1]!, [foodBId])

  const costPer10gA = Number(((foodA.estimatedCostPer100g / foodA.proteinPer100g) * 10).toFixed(1))
  const costPer10gB = Number(((foodB.estimatedCostPer100g / foodB.proteinPer100g) * 10).toFixed(1))

  const isBCheaper = costPer10gB < costPer10gA
  const costSavings = Math.abs(costPer10gA - costPer10gB).toFixed(1)
  const costRatio = (Math.max(costPer10gA, costPer10gB) / Math.min(costPer10gA, costPer10gB)).toFixed(1)

  const swapSelections = () => {
    const temp = foodAId
    setFoodAId(foodBId)
    setFoodBId(temp)
  }

  const handleSaveComparison = () => {
    saveComparison(foodA.id, foodB.id)
    alert('✨ Matchup saved to your Saved Laboratory!')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <Scale className="w-3.5 h-3.5" />
          <span>Section 02 // Precision Showdown Studio</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black font-serif text-forest tracking-tight">
          Head-to-Head Reckoning
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white border border-forest/20 text-forest hover:bg-forest hover:text-chartreuse hover:border-forest transition-all shadow-2xs active:scale-95"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors and Swap Bar */}
      <div className="p-6 rounded-3xl bg-white border-2 border-forest/15 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Contender A Selector */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
              Contender A (Packaged Benchmark)
            </span>
            <select
              value={foodAId}
              onChange={(e) => setFoodAId(e.target.value)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FAF7F0] border-2 border-forest/20 text-forest text-sm font-bold focus:outline-none focus:border-forest cursor-pointer shadow-2xs"
            >
              {FOOD_DATABASE.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} — {f.proteinPer100g}g Pro / 100g
                </option>
              ))}
            </select>
          </div>

          {/* Swap Trigger */}
          <div className="md:col-span-1 flex justify-center py-2">
            <button
              onClick={swapSelections}
              className="w-12 h-12 rounded-full bg-chartreuse border-2 border-forest text-forest flex items-center justify-center hover:rotate-180 transition-transform shadow-md cursor-pointer active:scale-95"
              title="Swap contenders"
              aria-label="Swap food contenders"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* Contender B Selector */}
          <div className="md:col-span-5 space-y-2">
            <span className="text-[11px] font-mono text-muted-foreground uppercase font-bold block">
              Contender B (Kitchen / Whole Alternative)
            </span>
            <select
              value={foodBId}
              onChange={(e) => setFoodBId(e.target.value)}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#FAF7F0] border-2 border-forest/20 text-forest text-sm font-bold focus:outline-none focus:border-forest cursor-pointer shadow-2xs"
            >
              {FOOD_DATABASE.map((f) => (
                <option key={f.id} value={f.id}>
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
        transition={{ duration: 0.4 }}
        className="p-8 rounded-3xl bg-[#0B1E13] text-cream border-2 border-chartreuse/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>Economic & Biological Verdict</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-cream">
            {isBCheaper ? foodB.name : foodA.name} is {costRatio}x More Cost Efficient.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-cream/75 max-w-2xl">
            Switching delivers the identical 10g of complete protein while saving{' '}
            <span className="text-chartreuse font-bold">₹{costSavings} every single serving</span>.
            {isBCheaper && foodB.isPackaged === false && ' Zero artificial humectants, zero polyols.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveComparison}
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream text-xs font-mono font-bold flex items-center gap-2 transition-all active:scale-95"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Matchup</span>
          </button>
          <button
            onClick={() => addToBasket(isBCheaper ? foodB.id : foodA.id, 100)}
            className="px-6 py-3 rounded-full bg-chartreuse text-forest hover:bg-butter text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Winner to Basket</span>
          </button>
        </div>
      </motion.div>

      {/* Visual Side-by-Side Contender Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Contender A Visual Card */}
        <div className="p-8 rounded-3xl bg-white border-2 border-forest/15 shadow-sm hover:border-forest/40 transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-forest/5 text-forest border border-forest/15">
                {foodA.category}
              </span>
              <span className="text-xs font-mono text-muted-foreground uppercase">
                {foodA.isPackaged ? 'Packaged Shelf Item' : 'Whole Kitchen Food'}
              </span>
            </div>

            {/* Food Photo Banner */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-forest/5 border border-forest/10">
              {foodA.imageUrl ? (
                <Image
                  src={foodA.imageUrl}
                  alt={foodA.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-forest/10 flex items-center justify-center font-mono text-xs">
                  {foodA.name}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-cream/70 uppercase block">Est. Cost / 100g</span>
                  <span className="text-3xl font-black font-mono text-cream">₹{foodA.estimatedCostPer100g}</span>
                </div>
                <span className="text-xs font-mono text-cream/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {foodA.servingDescription}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black font-serif text-forest">{foodA.name}</h3>
              {foodA.hindiName && (
                <p className="text-xs font-serif italic text-muted-foreground mt-0.5">{foodA.hindiName}</p>
              )}
            </div>

            {/* Protein Density Progress Meter */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-forest uppercase">Protein Concentration:</span>
                <span className="text-forest">{foodA.proteinPer100g}% ({foodA.proteinPer100g}g / 100g)</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#FAF7F0] border border-forest/15 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (foodA.proteinPer100g / 60) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-tangerine"
                />
              </div>
            </div>

            {/* Metric Comparison Tiles */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-forest/10 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase block">Cost / 10g Protein</span>
                <span className="text-2xl font-black text-forest block">₹{costPer10gA}</span>
                <span className="text-[10px] text-muted-foreground">National retail price</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-forest/10 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase block">Dietary Fiber</span>
                <span className="text-2xl font-black text-forest block">
                  {foodA.fiberPer100g ? `${foodA.fiberPer100g}g` : '0.0g'}
                </span>
                <span className="text-[10px] text-muted-foreground">Prebiotic Gut Support</span>
              </div>
            </div>

            {/* Macro Composition Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF7F0] text-center font-mono text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Calories</span>
                <span className="font-bold text-forest">{foodA.caloriesPer100g} kcal</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Carbs</span>
                <span className="font-bold text-forest">{foodA.carbsPer100g}g</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Fat</span>
                <span className="font-bold text-forest">{foodA.fatPer100g}g</span>
              </div>
            </div>

            {/* Practical Laboratory Insight */}
            <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 text-xs text-forest/80 leading-relaxed font-sans">
              <strong className="font-mono text-forest uppercase block text-[10px] mb-1">Laboratory Note:</strong>
              {foodA.highlightTip}
            </div>
          </div>

          <button
            onClick={() => addToBasket(foodA.id, foodA.servingSizeGrams)}
            className="w-full py-3.5 rounded-2xl bg-forest text-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-chartreuse" />
            <span>Add {foodA.name} to Basket</span>
          </button>
        </div>

        {/* Contender B Visual Card */}
        <div className="p-8 rounded-3xl bg-white border-2 border-forest shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="space-y-5">
            {/* Header Badge */}
            <div className="flex justify-between items-center">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-chartreuse text-forest shadow-2xs">
                {foodB.category}
              </span>
              <span className="text-xs font-mono text-leaf font-bold uppercase">
                {foodB.isPackaged ? 'Packaged Alternative' : 'Real Kitchen Alternative'}
              </span>
            </div>

            {/* Food Photo Banner */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-forest/5 border border-forest/10">
              {foodB.imageUrl ? (
                <Image
                  src={foodB.imageUrl}
                  alt={foodB.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-forest/10 flex items-center justify-center font-mono text-xs">
                  {foodB.name}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono text-cream/70 uppercase block">Est. Cost / 100g</span>
                  <span className="text-3xl font-black font-mono text-chartreuse">₹{foodB.estimatedCostPer100g}</span>
                </div>
                <span className="text-xs font-mono text-cream/90 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-xs">
                  {foodB.servingDescription}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-black font-serif text-forest">{foodB.name}</h3>
              {foodB.hindiName && (
                <p className="text-xs font-serif italic text-muted-foreground mt-0.5">{foodB.hindiName}</p>
              )}
            </div>

            {/* Protein Density Progress Meter */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-forest uppercase">Protein Concentration:</span>
                <span className="text-forest">{foodB.proteinPer100g}% ({foodB.proteinPer100g}g / 100g)</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#FAF7F0] border border-forest/15 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (foodB.proteinPer100g / 60) * 100)}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full rounded-full bg-chartreuse"
                />
              </div>
            </div>

            {/* Metric Comparison Tiles */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-4 rounded-2xl bg-chartreuse/15 border border-chartreuse/30 space-y-1">
                <span className="text-[10px] text-forest/70 uppercase block">Cost / 10g Protein</span>
                <span className="text-2xl font-black text-forest block">₹{costPer10gB}</span>
                <span className="text-[10px] text-forest/60">Kirana benchmark</span>
              </div>

              <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase block">Dietary Fiber</span>
                <span className="text-2xl font-black text-forest block">
                  {foodB.fiberPer100g ? `${foodB.fiberPer100g}g` : '0.0g'}
                </span>
                <span className="text-[10px] text-muted-foreground">Prebiotic Gut Support</span>
              </div>
            </div>

            {/* Macro Composition Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF7F0] text-center font-mono text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Calories</span>
                <span className="font-bold text-forest">{foodB.caloriesPer100g} kcal</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Carbs</span>
                <span className="font-bold text-forest">{foodB.carbsPer100g}g</span>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase">Fat</span>
                <span className="font-bold text-forest">{foodB.fatPer100g}g</span>
              </div>
            </div>

            {/* Practical Laboratory Insight */}
            <div className="p-4 rounded-2xl bg-forest/5 border border-forest/10 text-xs text-forest/80 leading-relaxed font-sans">
              <strong className="font-mono text-forest uppercase block text-[10px] mb-1">Laboratory Note:</strong>
              {foodB.highlightTip}
            </div>
          </div>

          <button
            onClick={() => addToBasket(foodB.id, foodB.servingSizeGrams)}
            className="w-full py-3.5 rounded-2xl bg-forest text-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-chartreuse" />
            <span>Add {foodB.name} to Basket</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-mono text-xs text-forest">
          Loading Showdown Studio...
        </div>
      }
    >
      <CompareContent />
    </Suspense>
  )
}
