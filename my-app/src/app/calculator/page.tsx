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
  CheckCircle2,
  ShoppingBag,
  Dumbbell,
  Heart,
  Flame,
  Target,
} from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function CalculatorPage() {
  const [weightKg, setWeightKg] = useState<number>(68)
  const [weightInputStr, setWeightInputStr] = useState<string>('68')
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'intense'>('moderate')
  const [goal, setGoal] = useState<'maintenance' | 'muscle-gain' | 'fat-loss'>('muscle-gain')
  const [mealPlanFoods, setMealPlanFoods] = useState<{ foodId: string; servings: number }[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const { addToBasket, setProteinGoal } = useUserStore()

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  // Handle weight change with graceful boundary clamping
  const handleWeightChange = (newVal: number) => {
    const clamped = Math.min(200, Math.max(30, isNaN(newVal) ? 65 : newVal))
    setWeightKg(clamped)
    setWeightInputStr(String(clamped))
  }

  const multiplierRange = {
    sedentary: { min: 0.8, max: 1.0, label: '0.8 - 1.0 g / kg' },
    moderate: {
      min: goal === 'muscle-gain' ? 1.6 : goal === 'fat-loss' ? 1.4 : 1.2,
      max: goal === 'muscle-gain' ? 2.0 : goal === 'fat-loss' ? 1.8 : 1.5,
      label: goal === 'muscle-gain' ? '1.6 - 2.0 g / kg' : goal === 'fat-loss' ? '1.4 - 1.8 g / kg' : '1.2 - 1.5 g / kg',
    },
    intense: {
      min: goal === 'muscle-gain' ? 1.8 : goal === 'fat-loss' ? 1.8 : 1.6,
      max: goal === 'muscle-gain' ? 2.2 : goal === 'fat-loss' ? 2.4 : 2.0,
      label: goal === 'muscle-gain' ? '1.8 - 2.2 g / kg' : goal === 'fat-loss' ? '1.8 - 2.4 g / kg' : '1.6 - 2.0 g / kg',
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

  const progressPct = Math.min(100, Math.round((mealPlanTotalG / Math.max(1, midpointTargetG)) * 100))

  const addFoodToMealPlan = (foodId: string) => {
    const existing = mealPlanFoods.find((f) => f.foodId === foodId)
    if (existing) {
      setMealPlanFoods(mealPlanFoods.map((f) => (f.foodId === foodId ? { ...f, servings: f.servings + 1 } : f)))
    } else {
      setMealPlanFoods([...mealPlanFoods, { foodId, servings: 1 }])
    }
  }

  const loadSampleDailyPlate = () => {
    setMealPlanFoods([
      { foodId: 'eggs-whole', servings: 2 },
      { foodId: 'soy-chunks', servings: 1 },
      { foodId: 'roasted-chana', servings: 1 },
    ])
    showToast('🍱 Loaded sample Indian whole food daily plate')
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
    if (mealPlanFoods.length === 0) return
    mealPlanFoods.forEach((item) => {
      const food = FOOD_DATABASE.find((f) => f.id === item.foodId)
      if (food) {
        addToBasket(food.id, food.servingSizeGrams * item.servings)
      }
    })
    showToast(`🛒 Added ${mealPlanFoods.length} plate staples to your Virtual Basket`)
  }

  const handleSaveGoal = () => {
    setProteinGoal(weightKg, midpointTargetG)
    showToast(`🎯 Saved ${midpointTargetG}g daily protein target for ${weightKg}kg bodyweight`)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 selection:bg-chartreuse selection:text-forest relative">
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

      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <Calculator className="w-3.5 h-3.5" />
          <span>Section 06 // Individual Physiology Engine</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-serif text-white tracking-tight">
          Protein Target Calculator
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          Evidence-informed daily target calculation based on clinical guidelines (ACSM / ISSN).
          Build a real sample daily plate using kitchen staples to see how easily targets are conquered without ₹120 marketing powders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Parameters Studio */}
        <div className="lg:col-span-5 bg-[#0B1710]/90 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-black font-serif text-white">Your Parameters</h2>
            <span className="text-xs font-mono text-muted-foreground uppercase">Clinical Model</span>
          </div>

          {/* Body Weight Interactive Dial & Numeric Input */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="body-weight-number" className="font-bold text-muted-foreground uppercase">
                Body Weight (kg)
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="body-weight-number"
                  type="number"
                  min="30"
                  max="200"
                  step="0.5"
                  value={weightInputStr}
                  onChange={(e) => {
                    setWeightInputStr(e.target.value)
                    const parsed = parseFloat(e.target.value)
                    if (!isNaN(parsed) && parsed >= 30 && parsed <= 200) {
                      setWeightKg(parsed)
                    }
                  }}
                  onBlur={() => {
                    const parsed = parseFloat(weightInputStr)
                    handleWeightChange(parsed)
                  }}
                  className="w-20 text-center font-black font-mono text-forest bg-chartreuse px-2 py-1 rounded-xl shadow-[0_0_15px_rgba(216,243,67,0.4)] text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  aria-label="Enter body weight in kilograms"
                />
                <span className="text-xs font-mono text-cream/60">
                  ({Math.round(weightKg * 2.2)} lbs)
                </span>
              </div>
            </div>

            <input
              id="body-weight-slider"
              type="range"
              min={30}
              max={150}
              step={1}
              value={weightKg}
              onChange={(e) => handleWeightChange(Number(e.target.value))}
              className="w-full h-2.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-chartreuse border border-white/15"
              aria-label="Adjust body weight slider"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>30 kg</span>
              <span>85 kg (Standard)</span>
              <span>150 kg</span>
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
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  activityLevel === 'sedentary'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse shadow-[0_0_15px_rgba(216,243,67,0.2)]'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <span className="text-xs font-mono font-bold block">Desk / Low</span>
                <span className="text-[10px] opacity-70 block mt-0.5">0.8-1.0 g/kg</span>
              </button>

              <button
                onClick={() => setActivityLevel('moderate')}
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  activityLevel === 'moderate'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse shadow-[0_0_15px_rgba(216,243,67,0.2)]'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <span className="text-xs font-mono font-bold block">Gym 3-4x</span>
                <span className="text-[10px] opacity-70 block mt-0.5">1.2-1.6 g/kg</span>
              </button>

              <button
                onClick={() => setActivityLevel('intense')}
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  activityLevel === 'intense'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse shadow-[0_0_15px_rgba(216,243,67,0.2)]'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <span className="text-xs font-mono font-bold block">Athlete 5+x</span>
                <span className="text-[10px] opacity-70 block mt-0.5">1.8-2.2 g/kg</span>
              </button>
            </div>
          </div>

          {/* Goal Selectors */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-muted-foreground uppercase block">
              Primary Objective
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setGoal('maintenance')}
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  goal === 'maintenance'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <Heart className="w-4 h-4 mx-auto mb-1 text-chartreuse" />
                <span className="text-xs font-mono font-bold block">Vitality</span>
              </button>

              <button
                onClick={() => setGoal('muscle-gain')}
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  goal === 'muscle-gain'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <Dumbbell className="w-4 h-4 mx-auto mb-1 text-chartreuse" />
                <span className="text-xs font-mono font-bold block">Hypertrophy</span>
              </button>

              <button
                onClick={() => setGoal('fat-loss')}
                className={`min-h-[44px] p-3 rounded-2xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  goal === 'fat-loss'
                    ? 'border-chartreuse bg-chartreuse/15 text-chartreuse'
                    : 'border-white/10 bg-white/5 text-cream/70 hover:border-white/30'
                }`}
              >
                <Flame className="w-4 h-4 mx-auto mb-1 text-tangerine" />
                <span className="text-xs font-mono font-bold block">Lean Cut</span>
              </button>
            </div>
          </div>

          {/* Evidence Dossier Output Box */}
          <div className="p-6 rounded-2xl bg-black/50 border border-chartreuse/30 space-y-4">
            <div className="flex justify-between items-baseline font-mono">
              <span className="text-xs uppercase text-muted-foreground">Optimal Daily Target:</span>
              <span className="text-4xl font-black text-chartreuse tracking-tight">
                {midpointTargetG}g <span className="text-xs font-normal text-muted-foreground">/ day</span>
              </span>
            </div>

            <div className="flex justify-between text-xs font-mono text-muted-foreground pt-1 border-t border-white/10">
              <span>Target Range:</span>
              <span className="text-white font-bold">{targetMinG}g — {targetMaxG}g</span>
            </div>

            <div className="flex justify-between text-xs font-mono text-muted-foreground">
              <span>Clinical Ratio:</span>
              <span className="text-chartreuse font-bold">{multiplierRange.label}</span>
            </div>

            <button
              onClick={handleSaveGoal}
              className="w-full min-h-[44px] py-2.5 rounded-xl bg-white/10 hover:bg-chartreuse hover:text-forest text-cream font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <Target className="w-4 h-4" />
              <span>Set as My Target Goal</span>
            </button>
          </div>
        </div>

        {/* Right: Real-World Kitchen Plate Simulator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#0B1710]/90 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div>
                <h3 className="text-2xl font-black font-serif text-white">Simulate Your Daily Plate</h3>
                <p className="text-xs font-mono text-muted-foreground">
                  Build a day&apos;s eating using unbranded staples to see total protein and rupee spend.
                </p>
              </div>

              {mealPlanFoods.length === 0 ? (
                <button
                  onClick={loadSampleDailyPlate}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold bg-chartreuse text-forest shadow-sm hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-center focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+ Load Sample Plate</span>
                </button>
              ) : (
                <button
                  onClick={() => setMealPlanFoods([])}
                  className="min-h-[44px] px-3 py-1 rounded-xl text-xs font-mono text-white/50 hover:text-red-400 transition-colors self-start sm:self-center"
                >
                  Clear Plate
                </button>
              )}
            </div>

            {/* Target Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-muted-foreground">Progress towards {midpointTargetG}g Goal:</span>
                <span className="text-chartreuse font-bold">
                  {mealPlanTotalG}g ({progressPct}%)
                </span>
              </div>
              <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full rounded-full transition-all duration-300 ${
                    progressPct >= 100 ? 'bg-chartreuse shadow-[0_0_12px_#D8F343]' : 'bg-leaf'
                  }`}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground pt-1">
                <span>Estimated Daily Plate Cost:</span>
                <span className="text-white font-bold">₹{mealPlanEstimatedCostInr} / day</span>
              </div>
            </div>

            {/* Selected Plate Items List */}
            {mealPlanFoods.length > 0 ? (
              <div className="space-y-3">
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
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-black/60 border border-white/10 flex-shrink-0">
                          <Image
                            src={food.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                            alt={food.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <strong className="text-sm font-serif font-bold text-white block">
                            {food.name}
                          </strong>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {item.servings} × {food.servingDescription} · ₹{itemCost}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right font-mono">
                          <span className="text-base font-black text-chartreuse block">+{proteinYield}g</span>
                          <span className="text-[10px] text-muted-foreground uppercase block">Protein</span>
                        </div>

                        {/* Serving Multiplier Controls */}
                        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                          <button
                            onClick={() => updateServings(item.foodId, -1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                            aria-label={`Decrease ${food.name} servings`}
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-bold text-white">
                            {item.servings}
                          </span>
                          <button
                            onClick={() => updateServings(item.foodId, 1)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                            aria-label={`Increase ${food.name} servings`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFood(item.foodId)}
                          className="min-w-[40px] min-h-[40px] flex items-center justify-center text-white/40 hover:text-red-400 transition-colors cursor-pointer rounded-lg hover:bg-red-500/10 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                          title="Remove item"
                          aria-label={`Remove ${food.name} from plate`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-[#0B1710]/50 border-2 border-dashed border-white/15 text-center space-y-3">
                <p className="font-bold text-white text-lg font-serif">Your plate is currently empty</p>
                <p className="text-xs font-mono text-muted-foreground max-w-sm mx-auto">
                  Click the quick-add buttons below or load our balanced Indian sample plate to simulate daily protein.
                </p>
                <button
                  onClick={loadSampleDailyPlate}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Sample High-Protein Plate</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Add Whole Food Chips */}
          <div className="p-6 rounded-3xl bg-[#0B1710]/90 backdrop-blur-md border border-white/10 space-y-3 shadow-xl">
            <span className="text-xs font-mono font-bold text-chartreuse uppercase block">
              + Quick Add High-Yield Staples:
            </span>
            <div className="flex flex-wrap gap-2">
              {FOOD_DATABASE.map((f) => {
                const proteinG = ((f.proteinPer100g * f.servingSizeGrams) / 100).toFixed(0)
                return (
                  <button
                    key={f.id}
                    onClick={() => addFoodToMealPlan(f.id)}
                    className="min-h-[44px] px-3.5 py-2 rounded-full text-xs font-mono font-bold bg-white/5 hover:bg-chartreuse hover:text-forest border border-white/10 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer text-cream focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{f.name}</span>
                    <span className="text-white/60 font-normal">
                      (+{proteinG}g)
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Add All to Basket Action */}
          {mealPlanFoods.length > 0 && (
            <button
              onClick={addAllToBasket}
              className="w-full min-h-[48px] py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(216,243,67,0.3)] transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              <span>Add Entire Daily Plate to Shopping Basket →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
