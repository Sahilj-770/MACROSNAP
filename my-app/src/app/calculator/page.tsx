'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import {
  Calculator,
  Sparkles,
  Plus,
  Trash2,
  Check,
  ShoppingBag,
  TrendingUp,
  Dumbbell,
  Heart,
  Flame,
  User,
} from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { motion } from 'framer-motion'

export default function CalculatorPage() {
  const [weightKg, setWeightKg] = useState<number>(68)
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'intense'>('moderate')
  const [goal, setGoal] = useState<'maintenance' | 'muscle-gain' | 'fat-loss'>('muscle-gain')
  const [mealPlanFoods, setMealPlanFoods] = useState<{ foodId: string; servings: number }[]>([
    { foodId: 'eggs-whole', servings: 2 },
    { foodId: 'soy-chunks', servings: 1 },
    { foodId: 'roasted-chana', servings: 1 },
  ])

  const { addToBasket } = useUserStore()

  const multiplierRange = {
    sedentary: { min: 0.8, max: 1.0, label: '0.8 - 1.0 g / kg' },
    moderate: {
      min: goal === 'muscle-gain' ? 1.6 : 1.2,
      max: goal === 'muscle-gain' ? 2.0 : 1.5,
      label: goal === 'muscle-gain' ? '1.6 - 2.0 g / kg' : '1.2 - 1.5 g / kg',
    },
    intense: {
      min: goal === 'muscle-gain' ? 1.8 : 1.6,
      max: goal === 'muscle-gain' ? 2.2 : 2.0,
      label: goal === 'muscle-gain' ? '1.8 - 2.2 g / kg' : '1.6 - 2.0 g / kg',
    },
  }[activityLevel]

  const targetMinG = Math.round(weightKg * multiplierRange.min)
  const targetMaxG = Math.round(weightKg * multiplierRange.max)
  const midpointTargetG = Math.round((targetMinG + targetMaxG) / 2)

  const mealPlanTotalG = Math.round(
    mealPlanFoods.reduce((acc, curr) => {
      const food = FOOD_DATABASE.find((f) => f.id === curr.foodId)
      if (!food) return acc
      const servingProtein = (food.proteinPer100g * food.servingSizeGrams) / 100
      return acc + servingProtein * curr.servings
    }, 0)
  )

  const mealPlanEstimatedCostInr = Math.round(
    mealPlanFoods.reduce((acc, curr) => {
      const food = FOOD_DATABASE.find((f) => f.id === curr.foodId)
      if (!food) return acc
      const servingCost = (food.estimatedCostPer100g * food.servingSizeGrams) / 100
      return acc + servingCost * curr.servings
    }, 0)
  )

  const progressPct = Math.min(100, Math.round((mealPlanTotalG / midpointTargetG) * 100))

  const addFoodToMealPlan = (foodId: string) => {
    const existing = mealPlanFoods.find((f) => f.foodId === foodId)
    if (existing) {
      setMealPlanFoods(mealPlanFoods.map((f) => (f.foodId === foodId ? { ...f, servings: f.servings + 1 } : f)))
    } else {
      setMealPlanFoods([...mealPlanFoods, { foodId, servings: 1 }])
    }
  }

  const updateServings = (foodId: string, delta: number) => {
    const updated = mealPlanFoods
      .map((f) => {
        if (f.foodId === foodId) {
          const next = f.servings + delta
          return next > 0 ? { ...f, servings: next } : null
        }
        return f
      })
      .filter(Boolean) as { foodId: string; servings: number }[]
    setMealPlanFoods(updated)
  }

  const removeFood = (foodId: string) => {
    setMealPlanFoods(mealPlanFoods.filter((f) => f.foodId !== foodId))
  }

  const addAllToBasket = () => {
    mealPlanFoods.forEach((item) => {
      const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
      if (food) {
        addToBasket(food.id, food.servingSizeGrams * item.servings)
      }
    })
    alert('🛒 All plate ingredients added to your kitchen basket!')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <Calculator className="w-3.5 h-3.5" />
          <span>Section 06 // Individual Physiology Engine</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black font-serif text-forest tracking-tight">
          Protein & Bioavailability Calculator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Evidence-informed daily target calculation based on clinical guidelines (ACSM / ISSN).
          Build a real sample daily plate using kitchen staples to see how easily targets are conquered without ₹120 marketing powders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Parameters Studio */}
        <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-forest/15 p-6 sm:p-8 shadow-sm space-y-8">
          <div className="flex items-center justify-between border-b border-forest/10 pb-4">
            <h2 className="text-2xl font-black font-serif text-forest">Your Parameters</h2>
            <span className="text-xs font-mono text-muted-foreground uppercase">Clinical Model</span>
          </div>

          {/* Body Weight Interactive Dial */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="font-bold text-muted-foreground uppercase">Body Weight</span>
              <span className="text-xl font-black font-mono text-forest bg-chartreuse px-3.5 py-1 rounded-full shadow-2xs">
                {weightKg} kg <span className="text-xs font-medium text-forest/70">({Math.round(weightKg * 2.2)} lbs)</span>
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={130}
              step={1}
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              className="w-full h-2.5 bg-[#FAF7F0] rounded-lg appearance-none cursor-pointer accent-forest border border-forest/20"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>40 kg (88 lbs)</span>
              <span>85 kg (187 lbs)</span>
              <span>130 kg (286 lbs)</span>
            </div>
          </div>

          {/* Activity Level Cards */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase block">
              Activity & Lifestyle
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActivityLevel('sedentary')}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  activityLevel === 'sedentary'
                    ? 'border-forest bg-forest text-chartreuse shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/80 hover:border-forest/40'
                }`}
              >
                <span className="text-xs font-mono font-bold block">Desk / Low</span>
                <span className="text-[10px] opacity-70 block mt-0.5">0.8-1.0 g/kg</span>
              </button>

              <button
                onClick={() => setActivityLevel('moderate')}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  activityLevel === 'moderate'
                    ? 'border-forest bg-forest text-chartreuse shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/80 hover:border-forest/40'
                }`}
              >
                <span className="text-xs font-mono font-bold block">3-4x Training</span>
                <span className="text-[10px] opacity-70 block mt-0.5">1.4-1.8 g/kg</span>
              </button>

              <button
                onClick={() => setActivityLevel('intense')}
                className={`p-3 rounded-2xl border-2 text-center transition-all ${
                  activityLevel === 'intense'
                    ? 'border-forest bg-forest text-chartreuse shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/80 hover:border-forest/40'
                }`}
              >
                <span className="text-xs font-mono font-bold block">Athletic Hard</span>
                <span className="text-[10px] opacity-70 block mt-0.5">1.8-2.2 g/kg</span>
              </button>
            </div>
          </div>

          {/* Primary Objective Selector */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase block">
              Primary Objective
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setGoal('maintenance')}
                className={`p-3 rounded-2xl border-2 text-center text-xs font-mono font-bold transition-all ${
                  goal === 'maintenance'
                    ? 'border-forest bg-forest text-cream shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/70 hover:border-forest/40'
                }`}
              >
                Vitality
              </button>
              <button
                onClick={() => setGoal('muscle-gain')}
                className={`p-3 rounded-2xl border-2 text-center text-xs font-mono font-bold transition-all ${
                  goal === 'muscle-gain'
                    ? 'border-forest bg-forest text-chartreuse shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/70 hover:border-forest/40'
                }`}
              >
                Hypertrophy
              </button>
              <button
                onClick={() => setGoal('fat-loss')}
                className={`p-3 rounded-2xl border-2 text-center text-xs font-mono font-bold transition-all ${
                  goal === 'fat-loss'
                    ? 'border-forest bg-forest text-cream shadow-sm'
                    : 'border-forest/15 bg-[#FAF7F0] text-forest/70 hover:border-forest/40'
                }`}
              >
                Fat Loss
              </button>
            </div>
          </div>

          {/* Computed Target Banner */}
          <div className="p-6 rounded-3xl bg-[#0B1E13] text-cream space-y-2 border-2 border-chartreuse/40 shadow-xl">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-chartreuse font-bold uppercase">Evidence-Informed Daily Target</span>
              <span className="text-cream/60">{multiplierRange.label}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-serif text-cream">
                {targetMinG} – {targetMaxG}g
              </span>
              <span className="text-sm font-mono text-cream/70">/ day</span>
            </div>
            <p className="text-xs font-mono text-cream/60 pt-1">
              Midpoint benchmark: <strong className="text-chartreuse font-bold">{midpointTargetG}g</strong> daily protein.
            </p>
          </div>
        </div>

        {/* Right: Interactive Visual Plate Builder */}
        <div className="lg:col-span-7 space-y-6">
          {/* Progress Header Card */}
          <div className="p-8 rounded-3xl bg-white border-2 border-forest/15 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-muted-foreground uppercase font-bold block">
                  Your Daily Sample Plate
                </span>
                <h3 className="text-3xl font-black font-serif text-forest mt-1">
                  {mealPlanTotalG}g <span className="text-lg font-mono text-muted-foreground">/ {midpointTargetG}g Target</span>
                </h3>
              </div>

              <div className="text-left sm:text-right font-mono">
                <span className="text-xs text-muted-foreground uppercase block">Estimated Daily Cost</span>
                <span className="text-3xl font-black text-forest">₹{mealPlanEstimatedCostInr}</span>
                <span className="text-[10px] text-muted-foreground block">Real kitchen staples</span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="text-forest">Plate Completion:</span>
                <span className={progressPct >= 100 ? 'text-leaf' : 'text-forest'}>
                  {progressPct}% {progressPct >= 100 && '🎉 Target Achieved!'}
                </span>
              </div>
              <div className="w-full h-4 rounded-full bg-[#FAF7F0] border border-forest/15 overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.6 }}
                  className={`h-full rounded-full transition-colors ${
                    progressPct >= 100 ? 'bg-chartreuse' : 'bg-forest'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Active Plate Items List (Food Cards) */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono font-bold text-muted-foreground uppercase">
              <span>Foods on Your Plate ({mealPlanFoods.length} items)</span>
              <button
                onClick={() => setMealPlanFoods([])}
                className="text-red-500 hover:underline"
              >
                Clear Plate
              </button>
            </div>

            {mealPlanFoods.length > 0 ? (
              <div className="space-y-2.5">
                {mealPlanFoods.map((item) => {
                  const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
                  if (!food) return null
                  const proteinYield = (
                    ((food.proteinPer100g * food.servingSizeGrams) / 100) *
                    item.servings
                  ).toFixed(1)
                  const itemCost = Math.round(
                    ((food.estimatedCostPer100g * food.servingSizeGrams) / 100) * item.servings
                  )

                  return (
                    <motion.div
                      key={item.foodId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-4 rounded-2xl bg-white border border-forest/15 flex items-center justify-between gap-4 shadow-2xs hover:border-forest/40 transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        {food.imageUrl && (
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-forest/5">
                            <Image
                              src={food.imageUrl}
                              alt={food.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="text-base font-bold font-serif text-forest">{food.name}</h4>
                          <p className="text-xs font-mono text-muted-foreground">
                            {item.servings} × {food.servingDescription} · ₹{itemCost}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right font-mono">
                          <span className="text-base font-black text-forest block">+{proteinYield}g</span>
                          <span className="text-[10px] text-muted-foreground uppercase block">Protein</span>
                        </div>

                        {/* Serving Multiplier Controls */}
                        <div className="flex items-center gap-1.5 bg-[#FAF7F0] p-1 rounded-xl border border-forest/15">
                          <button
                            onClick={() => updateServings(item.foodId, -1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-forest/10 text-forest font-bold text-xs flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-mono text-xs font-bold text-forest">
                            {item.servings}
                          </span>
                          <button
                            onClick={() => updateServings(item.foodId, 1)}
                            className="w-7 h-7 rounded-lg bg-white hover:bg-forest/10 text-forest font-bold text-xs flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFood(item.foodId)}
                          className="p-2 text-forest/40 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-white border-2 border-dashed border-forest/20 text-center space-y-2">
                <p className="font-bold text-forest">Your plate is currently empty.</p>
                <p className="text-xs font-mono text-muted-foreground">
                  Tap any staple item below to add whole foods to your daily model.
                </p>
              </div>
            )}
          </div>

          {/* Quick Add Whole Food Chips */}
          <div className="p-6 rounded-3xl bg-white border border-forest/15 space-y-3">
            <span className="text-xs font-mono font-bold text-forest uppercase block">
              + Quick Add High-Yield Staples:
            </span>
            <div className="flex flex-wrap gap-2">
              {FOOD_DATABASE.map((f) => {
                const proteinG = ((f.proteinPer100g * f.servingSizeGrams) / 100).toFixed(0)
                return (
                  <button
                    key={f.id}
                    onClick={() => addFoodToMealPlan(f.id)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-[#FAF7F0] hover:bg-forest hover:text-chartreuse border border-forest/15 transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{f.name}</span>
                    <span className="text-forest/60 group-hover:text-chartreuse font-normal">
                      (+{proteinG}g)
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Add All to Basket Action */}
          <button
            onClick={addAllToBasket}
            className="w-full py-4 rounded-full bg-forest text-cream font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-chartreuse" />
            <span>Add Entire Daily Plate to Shopping Basket →</span>
          </button>
        </div>
      </div>
    </div>
  )
}
