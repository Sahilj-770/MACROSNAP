'use client'

import React, { useState, useEffect, useMemo } from 'react'
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
  Scale,
  Flame,
  Zap,
  HelpCircle,
  ChevronRight,
} from 'lucide-react'

export function CalculatorPage() {
  const setProteinGoal = useUserStore((state) => state.setProteinGoal)
  const initialWeight = useUserStore((state) => state.bodyWeightKg) || 68

  // Physiological User Inputs
  const [weightKg, setWeightKg] = useState(initialWeight)
  const [heightCm, setHeightCm] = useState(172)
  const [ageYears, setAgeYears] = useState(26)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityMultiplier, setActivityMultiplier] = useState(1.6)
  const [goal, setGoal] = useState<'maintain' | 'surplus' | 'deficit'>('maintain')
  const [saved, setSaved] = useState(false)
  const [pulseActive, setPulseActive] = useState(0)
  const [selectedMealIdx, setSelectedMealIdx] = useState<number | null>(null)

  // Physiological Target Protein
  const targetProteinGrams = Math.round(weightKg * activityMultiplier)

  // Mifflin-St Jeor BMR Equation with explicit user inputs
  const bmrBase = useMemo(() => {
    if (gender === 'male') {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5)
    } else {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161)
    }
  }, [weightKg, heightCm, ageYears, gender])

  // TDEE Multiplier derived from training activity
  const tdeeMultiplier = useMemo(() => {
    if (activityMultiplier <= 0.8) return 1.2 // Sedentary
    if (activityMultiplier <= 1.2) return 1.375 // Light active
    if (activityMultiplier <= 1.6) return 1.55 // Moderately active
    return 1.725 // Very active
  }, [activityMultiplier])

  const baseTdee = Math.round(bmrBase * tdeeMultiplier)

  // Goal-adjusted Target Calories
  const targetCalories = useMemo(() => {
    if (goal === 'maintain') return baseTdee
    if (goal === 'surplus') return Math.round(baseTdee * 1.1)
    return Math.round(baseTdee * 0.85)
  }, [baseTdee, goal])

  // Macronutrient distribution
  const proteinKcal = targetProteinGrams * 4
  const fatGrams = Math.round((targetCalories * 0.25) / 9)
  const fatKcal = fatGrams * 9
  const carbKcal = Math.max(0, targetCalories - (proteinKcal + fatKcal))
  const carbGrams = Math.round(carbKcal / 4)

  const proteinPct = Math.round((proteinKcal / targetCalories) * 100)
  const carbPct = Math.round((carbKcal / targetCalories) * 100)
  const fatPct = Math.max(0, 100 - (proteinPct + carbPct))

  // 4-Meal Daily Schedule with Indian Food Focus
  const mealProtein = Math.round(targetProteinGrams / 4)
  const CHRONO_MEALS = [
    {
      time: '08:30 AM',
      name: 'Breakfast: Protein Foundation',
      plate: 'Sprouted Moong & Besan Chilla with Mint Curd (150g)',
      protein: mealProtein,
      calories: Math.round(targetCalories * 0.25),
      tip: 'Triggers Muscle Protein Synthesis (MPS) via complete essential aminos.',
    },
    {
      time: '01:30 PM',
      name: 'Lunch: Balanced Whole Food Plate',
      plate: 'Soya Granule Bhurji (50g) + 2 Jowar Rotis + Thick Dal Tadka',
      protein: mealProtein + 2,
      calories: Math.round(targetCalories * 0.35),
      tip: 'High satiety index with slow-digesting complex carbs and minerals.',
    },
    {
      time: '05:30 PM',
      name: 'Pre/Post Workout: Fast Fuel',
      plate: 'Roasted Chana Sattu Drink (40g) or 3 Boiled Whole Eggs',
      protein: mealProtein - 4,
      calories: Math.round(targetCalories * 0.15),
      tip: 'Rapid gastric clearance, natural bio-available electrolytes and leucine.',
    },
    {
      time: '08:45 PM',
      name: 'Dinner: Slow-Release Casein Repair',
      plate: 'Fresh Malai Paneer (80g) or Grilled Tofu with Mixed Vegetables',
      protein: mealProtein + 2,
      calories: Math.round(targetCalories * 0.25),
      tip: 'Sustained nocturnal amino acid delivery for lean muscle preservation.',
    },
  ]

  // Sequential pulse animation across the 4 meals
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseActive((prev) => (prev + 1) % 4)
    }, 3200)
    return () => clearInterval(timer)
  }, [])

  const handleSaveGoal = () => {
    setProteinGoal(weightKg, targetProteinGrams)
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  const handleReset = () => {
    setWeightKg(68)
    setHeightCm(172)
    setAgeYears(26)
    setGender('male')
    setActivityMultiplier(1.6)
    setGoal('maintain')
  }

  // Dial radial calculation
  const minW = 45
  const maxW = 125
  const dialPct = ((weightKg - minW) / (maxW - minW)) * 100
  const dialAngle = -120 + (dialPct / 100) * 240

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-semibold mb-3">
              <Activity className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Scientific Nutritional Instrument &bull; ACSM / ISSN Guidelines</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
              Physiological Macro Instrument.
            </h1>
            <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
              Precision target calculator calibrated to your authentic body composition, height, age,
              and athletic training demand. Verified against ICMR-NIN recommendations.
            </p>
          </div>

          {/* Caveat Handwritten Callout */}
          <div className="hidden md:flex flex-col items-end text-right">
            <span
              className="text-lg font-bold text-[#08482D] -rotate-2"
              style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
            >
              Calibrated to actual human metabolism ↗
            </span>
            <span className="text-xs text-[#7D8D39] font-mono">
              Mifflin-St Jeor + ISSN Hypertrophy Model
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Calibration Dial & Bio-Parameters (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Dial Housing Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7D8D39]" />
                Body Mass Calibration
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-[#5E5E61] hover:text-[#FF5A22] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            </div>

            {/* Circular Dial Gauge */}
            <div className="flex flex-col items-center my-2">
              <div className="relative w-60 h-60 sm:w-68 sm:h-68 rounded-full bg-[#F3F6F4] border-4 border-[#5B6E2C]/15 shadow-inner flex items-center justify-center">
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
                  className="absolute w-1.5 h-26 bg-[#5B6E2C] rounded-full origin-bottom shadow-md"
                  style={{
                    transform: `translateY(-50%) rotate(${dialAngle}deg)`,
                    bottom: '50%',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5A22] -ml-[4px] -mt-[3px] shadow-sm" />
                </div>

                {/* Central Readout Capsule */}
                <div className="relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white border-2 border-[#5B6E2C]/20 shadow-md flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] font-bold">
                    BODY WEIGHT
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#101410] leading-none my-1 tabular-nums">
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
                <div className="flex justify-between text-[11px] font-mono text-[#7D8D39]">
                  <span>45 KG</span>
                  <span className="text-[#5B6E2C] font-bold">Slide to adjust weight</span>
                  <span>125 KG</span>
                </div>
              </div>
            </div>

            {/* Height, Age & Biological Sex Inputs */}
            <div className="pt-6 border-t border-[#5B6E2C]/10 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#101410] font-bold block">
                Biometric Calibration Parameters
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Sex Selector */}
                <div className="p-3 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
                  <span className="text-[10px] font-mono uppercase text-[#7D8D39] block mb-1.5 font-bold">
                    Biological Sex
                  </span>
                  <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-[#5B6E2C]/10">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        gender === 'male'
                          ? 'bg-[#5B6E2C] text-white shadow-2xs'
                          : 'text-[#5E5E61] hover:text-[#101410]'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        gender === 'female'
                          ? 'bg-[#5B6E2C] text-white shadow-2xs'
                          : 'text-[#5E5E61] hover:text-[#101410]'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                {/* Height Input */}
                <div className="p-3 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold">
                      Height
                    </span>
                    <span className="text-xs font-mono font-bold text-[#101410]">{heightCm} cm</span>
                  </div>
                  <input
                    type="range"
                    min={140}
                    max={210}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#5B6E2C] cursor-pointer h-1.5 bg-white rounded-lg mt-2"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#737B70] mt-1">
                    <span>140cm</span>
                    <span>210cm</span>
                  </div>
                </div>

                {/* Age Input */}
                <div className="p-3 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold">
                      Age
                    </span>
                    <span className="text-xs font-mono font-bold text-[#101410]">{ageYears} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={18}
                    max={80}
                    value={ageYears}
                    onChange={(e) => setAgeYears(Number(e.target.value))}
                    className="w-full accent-[#5B6E2C] cursor-pointer h-1.5 bg-white rounded-lg mt-2"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#737B70] mt-1">
                    <span>18 yrs</span>
                    <span>80 yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Demand Multiplier Selection */}
            <div className="space-y-3 pt-6 border-t border-[#5B6E2C]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#101410] font-bold block">
                Training Activity (ISSN Guidelines)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Sedentary', val: 0.8, desc: 'RDA Baseline' },
                  { label: 'Moderate', val: 1.2, desc: '3x Active' },
                  { label: 'Hypertrophy', val: 1.6, desc: 'Weightlifting' },
                  { label: 'Athlete', val: 2.0, desc: 'Peak Power' },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setActivityMultiplier(tier.val)}
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                      activityMultiplier === tier.val
                        ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-xs'
                        : 'bg-[#F3F6F4] text-[#101410] border-[#5B6E2C]/15 hover:border-[#5B6E2C]'
                    }`}
                  >
                    <span className="text-xs font-bold font-display block leading-tight">
                      {tier.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-1 block ${
                        activityMultiplier === tier.val ? 'text-white/80' : 'text-[#737B70]'
                      }`}
                    >
                      {tier.val}g/kg &bull; {tier.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Goal Mode */}
            <div className="space-y-2 pt-6 border-t border-[#5B6E2C]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#101410] font-bold block">
                Caloric Phase Target
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'deficit', label: 'Fat Loss (-15%)' },
                  { id: 'maintain', label: 'Eucaloric (Maintain)' },
                  { id: 'surplus', label: 'Lean Mass (+10%)' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setGoal(mode.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      goal === mode.id
                        ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-2xs font-semibold'
                        : 'bg-[#F3F6F4] text-[#5E5E61] border-[#5B6E2C]/15 hover:border-[#5B6E2C]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formula Transparency Disclosure Callout */}
          <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 text-xs text-[#5E5E61] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-[#5B6E2C]">
              <Info className="w-3.5 h-3.5" />
              <span>Mathematical Transparency (Mifflin-St Jeor Formula)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Calculated BMR: <strong className="text-[#101410]">{bmrBase} kcal</strong> based on {weightKg}kg, {heightCm}cm, {ageYears}y ({gender}). Physical activity multiplier: <strong className="text-[#101410]">{tdeeMultiplier}x</strong>. These values provide nutritional reference targets, not clinical medical prescriptions.
            </p>
          </div>
        </div>

        {/* Right Column: Computed Targets & 4-Meal Indian Schedule (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Matrix Bento Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/20 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
                Computed Daily Blueprint
              </span>
              <span className="text-xs font-mono text-[#7D8D39]">
                ISSN / ICMR Framework
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D8D39] font-bold block">
                  Target Daily Protein
                </span>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#5B6E2C] mt-1 block tabular-nums">
                  {targetProteinGrams}
                  <span className="text-xl font-sans font-normal text-[#101410] ml-1">g</span>
                </span>
                <span className="text-[11px] font-mono text-[#5E5E61] mt-1 block">
                  {targetProteinGrams * 4} kcal &bull; {proteinPct}% of energy
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[#FF5A22]/20">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5A22] font-bold block">
                  Target Daily Calories
                </span>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#FF5A22] mt-1 block tabular-nums">
                  {targetCalories}
                  <span className="text-xl font-sans font-normal text-[#101410] ml-1">kcal</span>
                </span>
                <span className="text-[11px] font-mono text-[#5E5E61] mt-1 block">
                  Carbs {carbGrams}g &bull; Fats {fatGrams}g
                </span>
              </div>
            </div>

            {/* Macro Distribution Visualizer */}
            <div className="mb-6 space-y-2 p-4 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
              <div className="flex justify-between text-xs font-mono text-[#101410] font-bold">
                <span>Macronutrient Distribution</span>
                <span>P {proteinPct}% &bull; C {carbPct}% &bull; F {fatPct}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white overflow-hidden flex shadow-inner">
                <div
                  className="h-full bg-[#5B6E2C] transition-all duration-500"
                  style={{ width: `${proteinPct}%` }}
                  title={`Protein: ${targetProteinGrams}g (${proteinPct}%)`}
                />
                <div
                  className="h-full bg-[#7D8D39] transition-all duration-500"
                  style={{ width: `${carbPct}%` }}
                  title={`Carbohydrates: ${carbGrams}g (${carbPct}%)`}
                />
                <div
                  className="h-full bg-[#FF5A22] transition-all duration-500"
                  style={{ width: `${fatPct}%` }}
                  title={`Fats: ${fatGrams}g (${fatPct}%)`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#5E5E61] pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#5B6E2C]" />
                  <span>Protein: {targetProteinGrams}g</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#7D8D39]" />
                  <span>Carbs: {carbGrams}g</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A22]" />
                  <span>Fats: {fatGrams}g</span>
                </span>
              </div>
            </div>

            {/* Save Target Action */}
            <div className="pt-4 border-t border-[#5B6E2C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleSaveGoal}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-98 ${
                  saved
                    ? 'bg-[#7D8D39] text-white'
                    : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-white'
                }`}
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Target Saved to Grocery Basket</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save Target to Virtual Basket</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-[#737B70]">
                Syncs with Explore &amp; Basket
              </span>
            </div>
          </div>

          {/* 4-Meal Chrononutrition Indian Distribution */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#5B6E2C]/10">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#5B6E2C]" />
                <h3 className="font-display text-xl font-bold text-[#101410]">
                  Daily Chrononutrition Timeline
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7D8D39] font-bold uppercase tracking-wider">
                4 Balanced Meals
              </span>
            </div>

            <p className="text-xs text-[#5E5E61] leading-relaxed">
              Distributing your protein across four evenly spaced meals ensures constant muscle protein synthesis (MPS) without digestive overburden.
            </p>

            <div className="space-y-3">
              {CHRONO_MEALS.map((meal, idx) => {
                const isCurrentPulse = pulseActive === idx
                return (
                  <div
                    key={meal.time}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrentPulse
                        ? 'bg-[#5B6E2C]/10 border-[#5B6E2C] shadow-2xs'
                        : 'bg-[#F3F6F4] border-[#5B6E2C]/15 hover:border-[#5B6E2C]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 mt-0.5 ${
                          isCurrentPulse
                            ? 'bg-[#5B6E2C] text-white'
                            : 'bg-white text-[#5B6E2C] border border-[#5B6E2C]/20'
                        }`}
                      >
                        MEAL 0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#5B6E2C]">
                            {meal.time}
                          </span>
                          <span className="text-xs font-bold text-[#101410]">&bull; {meal.name}</span>
                        </div>
                        <p className="text-xs text-[#101410] font-medium mt-1">{meal.plate}</p>
                        <p className="text-[11px] text-[#5E5E61] mt-0.5">{meal.tip}</p>
                      </div>
                    </div>
                    <div className="text-right sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#5B6E2C]/10">
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
