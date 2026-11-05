'use client'

import React, { useState, useEffect } from 'react'
import { useUserStore } from '@/store/useUserStore'
import {
  Activity,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  Check,
  Info,
  Clock,
  Utensils,
} from 'lucide-react'

export function CalculatorPage() {
  const setProteinGoal = useUserStore((state) => state.setProteinGoal)
  const initialWeight = useUserStore((state) => state.bodyWeightKg) || 68

  const [weightKg, setWeightKg] = useState(initialWeight)
  const [activityMultiplier, setActivityMultiplier] = useState(1.6)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [goal, setGoal] = useState<'maintain' | 'surplus' | 'deficit'>('maintain')
  const [saved, setSaved] = useState(false)
  const [pulseActive, setPulseActive] = useState(0)

  // Physiological calculations
  const targetProteinGrams = Math.round(weightKg * activityMultiplier)

  // Estimated BMR using Mifflin-St Jeor equation (average height 172cm, age 26)
  const bmrBase =
    gender === 'male'
      ? 10 * weightKg + 6.25 * 172 - 5 * 26 + 5
      : 10 * weightKg + 6.25 * 160 - 5 * 26 - 161

  const tdeeMultiplier =
    activityMultiplier <= 1.2 ? 1.2 : activityMultiplier <= 1.6 ? 1.45 : 1.75
  const baseTdee = Math.round(bmrBase * tdeeMultiplier)

  const targetCalories =
    goal === 'maintain'
      ? baseTdee
      : goal === 'surplus'
      ? Math.round(baseTdee * 1.1)
      : Math.round(baseTdee * 0.85)

  // Macro distribution
  const proteinKcal = targetProteinGrams * 4
  const fatGrams = Math.round((targetCalories * 0.25) / 9)
  const fatKcal = fatGrams * 9
  const carbKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal))
  const carbGrams = Math.round(carbKcal / 4)

  // 4-Meal Daily Schedule with Indian Food Focus
  const mealProtein = Math.round(targetProteinGrams / 4)
  const CHRONO_MEALS = [
    {
      time: '08:30 AM',
      name: 'Breakfast: High Protein Start',
      plate: 'Sprouted Moong & Besan Chilla with Mint Curd',
      protein: mealProtein,
      tip: 'Kickstarts muscle protein synthesis with complete plant aminos',
    },
    {
      time: '01:30 PM',
      name: 'Lunch: Balanced Indian Plate',
      plate: 'Soya Granule Bhurji (50g) + 2 Jowar Rotis + Dal Tadka',
      protein: mealProtein + 2,
      tip: 'Slow-release complex carbohydrates with steady energy',
    },
    {
      time: '06:00 PM',
      name: 'Evening Snack: Quick Refuel',
      plate: 'Roasted Sattu Buttermilk (35g) or 3 Boiled Egg Whites',
      protein: mealProtein - 4,
      tip: 'Fast digestive absorption with natural electrolytes',
    },
    {
      time: '09:00 PM',
      name: 'Dinner: Sustained Recovery',
      plate: 'Fresh Paneer Bhurji or Firm Tofu Salad with Flaxseed',
      protein: mealProtein + 2,
      tip: 'Slow-release casein and plant proteins for overnight repair',
    },
  ]

  // Sequential pulse animation across the 4 meals
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((prev) => (prev + 1) % 4)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const handleSaveGoal = () => {
    setProteinGoal(weightKg, targetProteinGrams)
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  const handleReset = () => {
    setWeightKg(68)
    setActivityMultiplier(1.6)
    setGender('male')
    setGoal('maintain')
  }

  // Dial radial calculation
  const minW = 45
  const maxW = 120
  const dialPct = ((weightKg - minW) / (maxW - minW)) * 100
  const dialAngle = -120 + (dialPct / 100) * 240

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
          <Activity className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Scientific Nutrition Target &bull; ACSM / ISSN Guidelines</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          Nutrition &amp; Macro Calculator
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-3xl leading-relaxed">
          Calculate your daily protein and calorie requirements based on your actual body weight and activity level. Benchmark whole food costs and see an authentic Indian meal distribution plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Analog Dial & Laboratory Controls */}
        <div className="lg:col-span-6 space-y-8">
          {/* Main Dial Housing Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(91,110,44,0.12)] mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7D8D39]" />
                Body Weight &amp; Training Calibration
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-[#737B70] hover:text-[#FF5A22] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Circular Dial Gauge with Needle Spring Sweep */}
            <div className="flex flex-col items-center my-4">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#F3F6F4] border-4 border-[#5B6E2C]/20 shadow-inner flex items-center justify-center">
                {/* Degree Ticks */}
                {[...Array(24)].map((_, i) => {
                  const rot = -120 + i * (240 / 23)
                  const isActiveTick = Math.abs(rot - dialAngle) < 14
                  return (
                    <div
                      key={i}
                      className="absolute top-2 w-[1.5px] rounded-full origin-bottom transition-all duration-300"
                      style={{
                        transform: `rotate(${rot}deg) translateY(0px)`,
                        height: i % 4 === 0 ? '14px' : '7px',
                        backgroundColor: isActiveTick
                          ? '#5B6E2C'
                          : i % 4 === 0
                          ? '#7D8D39'
                          : 'rgba(91,110,44,0.25)',
                      }}
                    />
                  )
                })}

                {/* Needle Pointer */}
                <div
                  className="absolute w-1.5 h-28 bg-[#5B6E2C] rounded-full origin-bottom shadow-md transition-transform"
                  style={{
                    transform: `translateY(-50%) rotate(${dialAngle}deg)`,
                    bottom: '50%',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#FF5A22] -ml-[3px] -mt-[2px]" />
                </div>

                {/* Central Readout Capsule */}
                <div className="relative z-10 w-36 h-36 rounded-full bg-white border-2 border-[rgba(91,110,44,0.25)] shadow-md flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737B70]">
                    BODY WEIGHT
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#20271D] leading-none my-1 tabular-nums">
                    {weightKg}
                  </span>
                  <span className="text-xs font-mono text-[#5B6E2C] font-semibold">
                    KILOGRAMS
                  </span>
                </div>
              </div>

              {/* Slider Controller */}
              <div className="w-full mt-6 space-y-2">
                <input
                  type="range"
                  min={minW}
                  max={maxW}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#5B6E2C] cursor-pointer h-2 bg-[#F3F6F4] rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#737B70]">
                  <span>45 KG</span>
                  <span className="text-[#5B6E2C] font-semibold">Slide to adjust</span>
                  <span>120 KG</span>
                </div>
              </div>
            </div>

            {/* Activity Demand Selection */}
            <div className="space-y-4 pt-6 border-t border-[rgba(91,110,44,0.12)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                Activity Level (ISSN Guidelines)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Sedentary', val: 0.8, desc: 'RDA Base' },
                  { label: 'Moderate', val: 1.2, desc: 'Fitness' },
                  { label: 'Hypertrophy', val: 1.6, desc: 'Strength' },
                  { label: 'Athlete', val: 2.0, desc: 'Peak Power' },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setActivityMultiplier(tier.val)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      activityMultiplier === tier.val
                        ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-xs'
                        : 'bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    <span className="text-xs font-bold font-display block leading-tight">
                      {tier.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-1 block ${
                        activityMultiplier === tier.val ? 'text-[#F3F6F4]/80' : 'text-[#737B70]'
                      }`}
                    >
                      {tier.val}g/kg &bull; {tier.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Goal Mode */}
            <div className="space-y-2 pt-6 border-t border-[rgba(91,110,44,0.12)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                Nutritional Goal
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'deficit', label: 'Fat Loss (-15%)' },
                  { id: 'maintain', label: 'Maintain (Eucaloric)' },
                  { id: 'surplus', label: 'Muscle Gain (+10%)' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setGoal(mode.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      goal === mode.id
                        ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-2xs font-semibold'
                        : 'bg-[#F3F6F4] text-[#737B70] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Computed Output & 4-Meal Indian Schedule */}
        <div className="lg:col-span-6 space-y-8">
          {/* Target Matrix Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#5B6E2C] text-[#F3F6F4] border border-[rgba(91,110,44,0.3)] shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#F3F6F4]/90">
                Daily Nutritional Targets
              </span>
              <span className="text-xs font-mono text-white/70">
                ACSM Model
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 block">
                  Target Daily Protein
                </span>
                <span className="font-display text-5xl sm:text-6xl font-bold text-[#F3F6F4] mt-1 block tabular-nums">
                  {targetProteinGrams}
                  <span className="text-2xl font-sans font-normal text-white/80 ml-1">g</span>
                </span>
                <span className="text-xs font-mono text-white/75 mt-1 block">
                  {targetProteinGrams * 4} kcal &bull; {Math.round((proteinKcal / targetCalories) * 100)}% of calories
                </span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/80 block">
                  Estimated Daily Calories
                </span>
                <span className="font-display text-5xl sm:text-6xl font-bold text-[#FF5A22] mt-1 block tabular-nums">
                  {targetCalories}
                  <span className="text-2xl font-sans font-normal text-white/80 ml-1">kcal</span>
                </span>
                <span className="text-xs font-mono text-white/75 mt-1 block">
                  Carbs {carbGrams}g &bull; Fats {fatGrams}g
                </span>
              </div>
            </div>

            {/* Macro Distribution Bar */}
            <div className="mb-6 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-white/90">
                <span>Macronutrient Balance</span>
                <span>P {Math.round((proteinKcal / targetCalories) * 100)}% &bull; C {Math.round((carbKcal / targetCalories) * 100)}% &bull; F {Math.round((fatKcal / targetCalories) * 100)}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/20 overflow-hidden flex">
                <div
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${Math.round((proteinKcal / targetCalories) * 100)}%` }}
                  title="Protein"
                />
                <div
                  className="h-full bg-[#7D8D39] transition-all duration-500"
                  style={{ width: `${Math.round((carbKcal / targetCalories) * 100)}%` }}
                  title="Carbohydrates"
                />
                <div
                  className="h-full bg-[#FF5A22] transition-all duration-500"
                  style={{ width: `${Math.round((fatKcal / targetCalories) * 100)}%` }}
                  title="Fats"
                />
              </div>
            </div>

            {/* Action: Save Target */}
            <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleSaveGoal}
                className={`w-full sm:w-auto px-7 py-3 rounded-full text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  saved
                    ? 'bg-white text-[#5B6E2C] scale-105'
                    : 'bg-[#F3F6F4] hover:bg-white text-[#5B6E2C]'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4 text-[#5B6E2C]" />
                    <span>Target Saved to Grocery Basket</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-[#5B6E2C]" />
                    <span>Save Target to Grocery Basket</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-white/75">
                Saved to your browser storage
              </span>
            </div>
          </div>

          {/* 4-Meal Indian Whole Food Distribution */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)]">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#5B6E2C]" />
                <h3 className="font-display text-xl font-bold text-[#20271D]">
                  Daily Meal Distribution
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7D8D39] uppercase tracking-wider">
                4 Balanced Meals
              </span>
            </div>

            <p className="text-xs text-[#737B70] leading-relaxed">
              Distributing your protein across four evenly spaced meals ensures steady amino acid availability throughout the day without digestive strain.
            </p>

            <div className="space-y-3.5">
              {CHRONO_MEALS.map((meal, idx) => {
                const isCurrentPulse = pulseActive === idx
                return (
                  <div
                    key={meal.time}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrentPulse
                        ? 'bg-[rgba(125,141,57,0.12)] border-[#5B6E2C] shadow-2xs'
                        : 'bg-[#F3F6F4] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                          isCurrentPulse
                            ? 'bg-[#5B6E2C] text-[#F3F6F4]'
                            : 'bg-white text-[#5B6E2C] border border-[rgba(91,110,44,0.2)]'
                        }`}
                      >
                        MEAL 0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-[#5B6E2C]">
                            {meal.time}
                          </span>
                          <span className="text-xs font-bold text-[#20271D]">&bull; {meal.name}</span>
                        </div>
                        <p className="text-xs text-[#20271D] font-medium mt-1">{meal.plate}</p>
                        <p className="text-[10px] text-[#737B70] mt-0.5">{meal.tip}</p>
                      </div>
                    </div>
                    <div className="text-right sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[rgba(91,110,44,0.1)]">
                      <span className="font-display text-xl font-bold text-[#5B6E2C]">
                        ~{meal.protein}g
                      </span>
                      <span className="text-[10px] font-mono text-[#737B70] block">Protein</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CalculatorPage
