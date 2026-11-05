'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useUserStore } from '@/store/useUserStore'
import { FOOD_DATABASE } from '@/data/foods'
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
  TrendingDown,
  TrendingUp,
  Dumbbell,
  Heart,
  Droplets,
  Calendar,
  ShoppingBag,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Leaf,
  Egg,
  Coffee,
  IndianRupee,
  Layers,
} from 'lucide-react'

// Chrononutrition Meals with Dietary Filters
type DietFilter = 'all' | 'veg' | 'vegan' | 'egg' | 'hostel'

interface MealProtocol {
  time: string
  window: string
  name: string
  dish: string
  foodId?: string
  quantityGrams?: number
  proteinGrams: number
  caloriesKcal: number
  leucineGrams: number
  prepTimeMinutes: number
  dietary: DietFilter[]
  clinicalNote: string
}

const CHRONO_PROTOCOLS: Record<number, MealProtocol[]> = {
  0: [
    {
      time: '08:00 AM',
      window: 'Morning Circadian Window',
      name: 'Breakfast: MPS Foundation',
      dish: 'Sprouted Moong & Besan Cheela with Fresh Curd (150g)',
      foodId: 'moong-dal-sprouted',
      quantityGrams: 80,
      proteinGrams: 28,
      caloriesKcal: 420,
      leucineGrams: 2.7,
      prepTimeMinutes: 10,
      dietary: ['all', 'veg'],
      clinicalNote: 'Triggers daytime Muscle Protein Synthesis (MPS) via complete essential aminos and high biological value.',
    },
    {
      time: '08:00 AM',
      window: 'Morning Circadian Window',
      name: 'Breakfast: Pure Plant Fuel',
      dish: 'Sprouted Moong Bowl with Roasted Peanuts & Lemon Chaat (120g)',
      foodId: 'moong-dal-sprouted',
      quantityGrams: 100,
      proteinGrams: 26,
      caloriesKcal: 390,
      leucineGrams: 2.4,
      prepTimeMinutes: 5,
      dietary: ['vegan'],
      clinicalNote: 'Plant-based peptide activation with zero saturated dairy fats and high gut-prebiotic fiber.',
    },
    {
      time: '08:00 AM',
      window: 'Morning Circadian Window',
      name: 'Breakfast: Whole Egg Matrix',
      dish: '3 Boiled Whole Eggs + 2 Multigrain Slices with Black Pepper',
      foodId: 'eggs-whole',
      quantityGrams: 150,
      proteinGrams: 24,
      caloriesKcal: 360,
      leucineGrams: 2.9,
      prepTimeMinutes: 8,
      dietary: ['egg'],
      clinicalNote: 'Reference protein standard (PDCAAS 1.0) with natural choline, lutein, and bioavailable micro-nutrients.',
    },
    {
      time: '08:00 AM',
      window: 'Morning Circadian Window',
      name: 'Breakfast: 2-Min Kettle Shake',
      dish: '120-Second Savory Sattu Shake with Roasted Jeera & Mint',
      foodId: 'sattu-flour',
      quantityGrams: 60,
      proteinGrams: 22,
      caloriesKcal: 310,
      leucineGrams: 2.1,
      prepTimeMinutes: 2,
      dietary: ['hostel'],
      clinicalNote: 'Zero cooking appliances required. Stir roasted sattu flour in chilled water with pink salt and roasted cumin.',
    },
  ],
  1: [
    {
      time: '01:30 PM',
      window: 'Midday Glycogen Window',
      name: 'Lunch: Balanced Whole Food Plate',
      dish: 'Soya Granule Bhurji (50g dry) + 2 Jowar Rotis + Cucumber Salad',
      foodId: 'soy-chunks',
      quantityGrams: 50,
      proteinGrams: 36,
      caloriesKcal: 520,
      leucineGrams: 3.4,
      prepTimeMinutes: 14,
      dietary: ['all', 'veg', 'vegan', 'hostel'],
      clinicalNote: '52% pure plant protein density ensures sustained leucine release without post-prandial insulin lethargy.',
    },
    {
      time: '01:30 PM',
      window: 'Midday Glycogen Window',
      name: 'Lunch: Whole Egg Curry',
      dish: '3 Egg Tadka Curry + 1 Cup Brown/Steamed Rice + Dal Katori',
      foodId: 'eggs-whole',
      quantityGrams: 150,
      proteinGrams: 30,
      caloriesKcal: 540,
      leucineGrams: 3.1,
      prepTimeMinutes: 15,
      dietary: ['egg'],
      clinicalNote: 'Balanced fat-to-protein ratio ensures high vitamin ADEK fat-soluble bioavailability and sustained satiety.',
    },
  ],
  2: [
    {
      time: '05:30 PM',
      window: 'Pre/Post Training Window',
      name: 'Evening: Rapid Leucine Surge',
      dish: '50g Roasted Chana (Bhuna Chana) + Handful Roasted Peanuts',
      foodId: 'roasted-chana',
      quantityGrams: 60,
      proteinGrams: 18,
      caloriesKcal: 290,
      leucineGrams: 2.1,
      prepTimeMinutes: 0,
      dietary: ['all', 'veg', 'vegan', 'hostel'],
      clinicalNote: 'Crispy portable whole food snack. Prebiotic fiber prevents late-evening blood glucose crashes.',
    },
    {
      time: '05:30 PM',
      window: 'Pre/Post Training Window',
      name: 'Evening: High Bioavailability Post-Workout',
      dish: '3 Egg Whites + 1 Whole Egg Omelette with Green Chillies & Onions',
      foodId: 'eggs-whole',
      quantityGrams: 120,
      proteinGrams: 20,
      caloriesKcal: 210,
      leucineGrams: 2.6,
      prepTimeMinutes: 6,
      dietary: ['egg'],
      clinicalNote: 'Optimal leucine trigger threshold reached within 45 minutes of training to halt muscle catabolism.',
    },
  ],
  3: [
    {
      time: '08:45 PM',
      window: 'Nocturnal Anabolic Window',
      name: 'Dinner: Slow-Release Casein Repair',
      dish: 'Fresh Cow Milk Paneer (80g) with Sauteed Green Vegetables',
      foodId: 'paneer-fresh',
      quantityGrams: 80,
      proteinGrams: 24,
      caloriesKcal: 380,
      leucineGrams: 2.8,
      prepTimeMinutes: 8,
      dietary: ['all', 'veg'],
      clinicalNote: 'Natural dairy casein delivers steady, slow-digesting amino acids over 6-7 hours of nocturnal sleep.',
    },
    {
      time: '08:45 PM',
      window: 'Nocturnal Anabolic Window',
      name: 'Dinner: Plant Isoflavone Repair',
      dish: 'Pan-Seared High-Protein Firm Tofu (120g) with Steamed Beans',
      foodId: 'tofu-firm',
      quantityGrams: 120,
      proteinGrams: 22,
      caloriesKcal: 290,
      leucineGrams: 2.4,
      prepTimeMinutes: 8,
      dietary: ['vegan'],
      clinicalNote: 'Complete plant protein profile with essential calcium, zero cholesterol, and low nocturnal gastric load.',
    },
    {
      time: '08:45 PM',
      window: 'Nocturnal Anabolic Window',
      name: 'Dinner: Egg Bhurji & Curd',
      dish: 'Spiced 3-Egg Bhurji with 1 Roti and 100g Low-Fat Curd',
      foodId: 'eggs-whole',
      quantityGrams: 150,
      proteinGrams: 26,
      caloriesKcal: 420,
      leucineGrams: 2.9,
      prepTimeMinutes: 10,
      dietary: ['egg'],
      clinicalNote: 'Dual-speed amino acid clearance: fast albumin from eggs + slow casein from curd for complete overnight recovery.',
    },
    {
      time: '08:45 PM',
      window: 'Nocturnal Anabolic Window',
      name: 'Dinner: Hostel Soya Pulao',
      dish: 'Single-Induction Soya Granule (40g) & Green Pea Khichdi',
      foodId: 'soy-chunks',
      quantityGrams: 40,
      proteinGrams: 26,
      caloriesKcal: 390,
      leucineGrams: 2.7,
      prepTimeMinutes: 12,
      dietary: ['hostel'],
      clinicalNote: 'Comforting, easy one-pot meal engineered for hostel students. Delivers 26g protein for under ₹20.',
    },
  ],
}

export default function CalculatorPage() {
  const setProteinGoal = useUserStore((state) => state.setProteinGoal)
  const addToBasket = useUserStore((state) => state.addToBasket)
  const initialWeight = useUserStore((state) => state.bodyWeightKg) || 68

  // Biometric Inputs
  const [weightKg, setWeightKg] = useState(initialWeight)
  const [heightCm, setHeightCm] = useState(172)
  const [ageYears, setAgeYears] = useState(26)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [unitMode, setUnitMode] = useState<'kg' | 'lbs'>('kg')
  const [activityMultiplier, setActivityMultiplier] = useState(1.6)
  const [goal, setGoal] = useState<'maintain' | 'surplus' | 'deficit'>('maintain')
  const [dietFilter, setDietFilter] = useState<DietFilter>('all')
  const [saved, setSaved] = useState(false)
  const [basketToast, setBasketToast] = useState<string | null>(null)

  // Physiological Targets
  const targetProteinGrams = Math.round(weightKg * activityMultiplier)

  // Mifflin-St Jeor BMR Equation
  const bmrBase = useMemo(() => {
    if (gender === 'male') {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5)
    } else {
      return Math.round(10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161)
    }
  }, [weightKg, heightCm, ageYears, gender])

  // TDEE Multiplier derived from training activity
  const tdeeMultiplier = useMemo(() => {
    if (activityMultiplier <= 0.8) return 1.2
    if (activityMultiplier <= 1.2) return 1.375
    if (activityMultiplier <= 1.6) return 1.55
    return 1.725
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

  // BMI Calculation
  const heightM = heightCm / 100
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1))

  const bmiStatus = useMemo(() => {
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-[#FF5A22]' }
    if (bmi < 24.9) return { label: 'Optimal Athletic Range', color: 'text-[#5B6E2C]' }
    if (bmi < 29.9) return { label: 'Hypertrophy / Muscular Mass', color: 'text-[#7D8D39]' }
    return { label: 'Elevated Adiposity', color: 'text-[#FF5A22]' }
  }, [bmi])

  // Estimated Daily Protein Cost using whole Indian pantry staples
  const dailyProteinCostInr = Math.round(targetProteinGrams * 0.28) // Avg ₹2.80 per 10g protein via Sattu & Soya

  // Dial rotation calculations (-120 to +120 degrees)
  const minW = 45
  const maxW = 125
  const dialPct = Math.min(100, Math.max(0, ((weightKg - minW) / (maxW - minW)) * 100))
  const dialAngle = -120 + (dialPct / 100) * 240

  const handleReset = () => {
    setWeightKg(68)
    setHeightCm(172)
    setAgeYears(26)
    setGender('male')
    setActivityMultiplier(1.6)
    setGoal('maintain')
    setDietFilter('all')
  }

  const handleSaveGoal = () => {
    setProteinGoal(weightKg, targetProteinGrams)
    setSaved(true)
    setTimeout(() => setSaved(false), 2400)
  }

  // 1-Click: Add full day's meal plan staples to basket
  const handleAddFullDayToBasket = () => {
    const staplesToAdd = [
      { id: 'soy-chunks', grams: 50 },
      { id: 'sattu-flour', grams: 60 },
      { id: 'moong-dal-sprouted', grams: 100 },
      { id: 'paneer-fresh', grams: 80 },
    ]
    staplesToAdd.forEach((item) => {
      addToBasket(item.id, item.grams)
    })
    setProteinGoal(weightKg, targetProteinGrams)
    setBasketToast(`Added full 1-day whole food staples (${targetProteinGrams}g pro) to Basket!`)
    setTimeout(() => setBasketToast(null), 3500)
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {basketToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#08482D] text-[#F5F8EF] shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-[#DAE7C7]" />
          <span>{basketToast}</span>
          <Link href="/basket" className="underline font-semibold ml-2 hover:text-white">
            View Basket
          </Link>
        </div>
      )}

      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6E2C]/10 text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold mb-3">
              <Activity className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Physiological Nutritional Console &bull; ISSN / ICMR Standards</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
              Precision Macro Instrument.
            </h1>
            <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
              Precision clinical target calculator calibrated to your authentic body composition, height, age,
              and athletic training demand. Verified against ICMR-NIN 2024 recommendations.
            </p>
          </div>

          {/* Caveat Handwritten Callout */}
          <div className="hidden md:flex flex-col items-end text-right">
            <span
              className="text-lg font-bold text-[#08482D] -rotate-2"
              style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
            >
              सटीक शारीरिक गणना • बिना किसी सप्लीमेंट के ↗
            </span>
            <span className="text-xs text-[#7D8D39] font-mono">
              Mifflin-St Jeor + ISSN Hypertrophy Model
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Console: The Analog Mechanical Laboratory Calibration Dial (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Dial Housing Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs relative overflow-hidden">
            {/* Header with Unit Toggle & Reset */}
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7D8D39]" />
                BODY MASS CALIBRATION
              </span>
              <div className="flex items-center gap-3">
                {/* Unit Switcher */}
                <div className="flex items-center bg-[#F3F6F4] p-1 rounded-full border border-[#5B6E2C]/10 text-[10px] font-mono font-bold">
                  <button
                    type="button"
                    onClick={() => setUnitMode('kg')}
                    className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      unitMode === 'kg' ? 'bg-[#5B6E2C] text-white shadow-2xs' : 'text-[#5E5E61]'
                    }`}
                  >
                    KG
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitMode('lbs')}
                    className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                      unitMode === 'lbs' ? 'bg-[#5B6E2C] text-white shadow-2xs' : 'text-[#5E5E61]'
                    }`}
                  >
                    LBS
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-xs font-mono text-[#5E5E61] hover:text-[#FF5A22] transition-colors cursor-pointer"
                  title="Reset to Baseline"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>
            </div>

            {/* Circular Laboratory Dial Gauge */}
            <div className="flex flex-col items-center my-2">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-radial from-white to-[#F3F6F4] border-4 border-[#5B6E2C]/20 shadow-inner flex items-center justify-center select-none">
                {/* Dial Circumferential Degree Ticks */}
                {[...Array(25)].map((_, i) => {
                  const rot = -120 + i * 10
                  const isActiveTick = Math.abs(rot - dialAngle) < 12
                  return (
                    <div
                      key={i}
                      className="absolute top-2 w-[1.5px] rounded-full origin-bottom transition-all duration-300"
                      style={{
                        transform: `rotate(${rot}deg) translateY(0px)`,
                        height: i % 4 === 0 ? '16px' : '8px',
                        backgroundColor: isActiveTick
                          ? '#FF5A22'
                          : i % 4 === 0
                          ? '#5B6E2C'
                          : 'rgba(91,110,44,0.3)',
                      }}
                    />
                  )
                })}

                {/* Precision Pointer Needle */}
                <div
                  className="absolute w-1.5 h-28 sm:h-32 bg-[#5B6E2C] rounded-full origin-bottom shadow-md z-10"
                  style={{
                    transform: `translateY(-50%) rotate(${dialAngle}deg)`,
                    bottom: '50%',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-4 h-4 rounded-full bg-[#FF5A22] border-2 border-white -ml-[5px] -mt-[4px] shadow-sm" />
                </div>

                {/* Central Readout Capsule */}
                <div className="relative z-20 w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-white border-2 border-[#5B6E2C]/25 shadow-lg flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] font-bold">
                    BODY MASS
                  </span>
                  <div className="font-display text-4xl sm:text-5xl font-bold text-[#101410] leading-none my-1 tabular-nums">
                    {unitMode === 'kg' ? weightKg : Math.round(weightKg * 2.20462)}
                  </div>
                  <span className="text-[11px] font-mono text-[#5B6E2C] font-semibold uppercase">
                    {unitMode === 'kg' ? 'KILOGRAMS' : 'POUNDS'}
                  </span>
                  <div className="mt-1 flex items-center gap-1 text-[10px] font-mono font-semibold text-[#5E5E61]">
                    <span>BMI {bmi}</span>
                  </div>
                </div>
              </div>

              {/* Slider & Quick Adjust Buttons */}
              <div className="w-full mt-6 space-y-3">
                <input
                  type="range"
                  min={minW}
                  max={maxW}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-[#5B6E2C] cursor-pointer h-2 bg-[#F3F6F4] rounded-lg"
                />
                <div className="flex justify-between items-center text-xs font-mono text-[#7D8D39]">
                  <button
                    type="button"
                    onClick={() => setWeightKg((w) => Math.max(minW, w - 1))}
                    className="px-2.5 py-1 rounded-lg bg-[#F3F6F4] hover:bg-[#E4ECE7] text-[#101410] font-bold cursor-pointer"
                  >
                    -1 KG
                  </button>
                  <span className={`text-[11px] font-semibold ${bmiStatus.color}`}>
                    ● {bmiStatus.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setWeightKg((w) => Math.min(maxW, w + 1))}
                    className="px-2.5 py-1 rounded-lg bg-[#F3F6F4] hover:bg-[#E4ECE7] text-[#101410] font-bold cursor-pointer"
                  >
                    +1 KG
                  </button>
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
                    <span className="text-xs font-mono font-bold text-[#101410]">
                      {heightCm} cm ({Math.floor(heightCm / 30.48)}&apos;{Math.round((heightCm % 30.48) / 2.54)}&quot;)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={140}
                    max={210}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#5B6E2C] cursor-pointer h-1.5 bg-white rounded-lg mt-2"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-[#7D8D39] mt-1">
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
                  <div className="flex justify-between text-[9px] font-mono text-[#7D8D39] mt-1">
                    <span>18 yrs</span>
                    <span>80 yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Training Demand Multiplier Selection (ISSN Guidelines) */}
            <div className="space-y-3 pt-6 border-t border-[#5B6E2C]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#101410] font-bold block">
                Training Activity &amp; Protein Demand (ISSN Guidelines)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { label: 'Sedentary', val: 0.8, icon: Activity, desc: 'RDA Minimum' },
                  { label: 'Moderate', val: 1.2, icon: Heart, desc: '3x Active Steps' },
                  { label: 'Hypertrophy', val: 1.6, icon: Dumbbell, desc: 'Weightlifting' },
                  { label: 'Elite Power', val: 2.0, icon: Zap, desc: 'Peak Athletics' },
                ].map((tier) => {
                  const IconComponent = tier.icon
                  const isSelected = activityMultiplier === tier.val
                  return (
                    <button
                      key={tier.label}
                      type="button"
                      onClick={() => setActivityMultiplier(tier.val)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-xs'
                          : 'bg-[#F3F6F4] text-[#101410] border-[#5B6E2C]/15 hover:border-[#5B6E2C]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent
                          className={`w-4 h-4 ${isSelected ? 'text-[#FF5A22]' : 'text-[#7D8D39]'}`}
                        />
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-[#5B6E2C]'
                          }`}
                        >
                          {tier.val}g/kg
                        </span>
                      </div>
                      <div>
                        <span className="text-xs font-bold font-display block leading-tight">
                          {tier.label}
                        </span>
                        <span
                          className={`text-[10px] font-mono mt-0.5 block ${
                            isSelected ? 'text-white/80' : 'text-[#5E5E61]'
                          }`}
                        >
                          {tier.desc}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Caloric Target Phase Mode */}
            <div className="space-y-2 pt-6 border-t border-[#5B6E2C]/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[#101410] font-bold block">
                Caloric Phase Strategy
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'deficit', label: 'Fat Loss (-15%)', sub: '-0.35kg / wk' },
                  { id: 'maintain', label: 'Recomp (Maintain)', sub: 'Metabolic Balance' },
                  { id: 'surplus', label: 'Muscle Mass (+10%)', sub: '+0.25kg / wk' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setGoal(mode.id as any)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-medium border text-center transition-all cursor-pointer ${
                      goal === mode.id
                        ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-2xs font-semibold'
                        : 'bg-[#F3F6F4] text-[#5E5E61] border-[#5B6E2C]/15 hover:border-[#5B6E2C]'
                    }`}
                  >
                    <span className="block font-bold">{mode.label}</span>
                    <span
                      className={`text-[9px] font-mono block mt-0.5 ${
                        goal === mode.id ? 'text-white/80' : 'text-[#7D8D39]'
                      }`}
                    >
                      {mode.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mathematical Transparency Callout */}
          <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 text-xs text-[#5E5E61] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 font-bold text-[#5B6E2C]">
              <Info className="w-3.5 h-3.5" />
              <span>Mathematical Transparency (Mifflin-St Jeor + ISSN Model)</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Calculated BMR: <strong className="text-[#101410]">{bmrBase} kcal</strong> based on {weightKg}kg, {heightCm}cm, {ageYears}y ({gender}). Training multiplier: <strong className="text-[#101410]">{tdeeMultiplier}x</strong>. These values provide nutritional reference targets, not clinical medical prescriptions.
            </p>
          </div>
        </div>

        {/* Right Console: Computed Targets & 4-Meal Indian Chrononutrition Timeline (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Matrix Bento Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/20 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
                COMPUTED DAILY BLUEPRINT
              </span>
              <span className="text-xs font-mono text-[#7D8D39] font-semibold">
                ISSN / ICMR Framework
              </span>
            </div>

            {/* Primary Target Metric Boxes */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="p-5 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7D8D39] font-bold block">
                    Target Daily Protein
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#5B6E2C] mt-1 block tabular-nums">
                    {targetProteinGrams}
                    <span className="text-xl font-sans font-normal text-[#101410] ml-1">g</span>
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#5B6E2C]/10 text-[11px] font-mono text-[#5E5E61]">
                  {targetProteinGrams * 4} kcal &bull; {proteinPct}% of total energy
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F3F6F4] border border-[#FF5A22]/20 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5A22] font-bold block">
                    Target Daily Calories
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#FF5A22] mt-1 block tabular-nums">
                    {targetCalories}
                    <span className="text-xl font-sans font-normal text-[#101410] ml-1">kcal</span>
                  </span>
                </div>
                <div className="mt-3 pt-2 border-t border-[#FF5A22]/10 text-[11px] font-mono text-[#5E5E61]">
                  Carbs {carbGrams}g &bull; Fats {fatGrams}g
                </div>
              </div>
            </div>

            {/* Protein Economics Highlight Pill */}
            <div className="mb-6 p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#5B6E2C] text-white flex items-center justify-center shrink-0">
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold block">
                    Estimated Daily Protein Grocery Cost
                  </span>
                  <span className="text-xs font-bold text-[#101410]">
                    Just ₹{dailyProteinCostInr} / day using Indian whole foods
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-[#5B6E2C] shrink-0">
                ₹{(dailyProteinCostInr * 30).toLocaleString('en-IN')}/mo
              </span>
            </div>

            {/* Macro Distribution Visualizer */}
            <div className="mb-6 space-y-2 p-4 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15">
              <div className="flex justify-between text-xs font-mono text-[#101410] font-bold">
                <span>Macronutrient Spectrum</span>
                <span>P {proteinPct}% &bull; C {carbPct}% &bull; F {fatPct}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white overflow-hidden flex shadow-inner border border-[#5B6E2C]/15">
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
                <span className="flex items-center gap-1 font-semibold text-[#5B6E2C]">
                  <span className="w-2 h-2 rounded-full bg-[#5B6E2C]" />
                  <span>Protein: {targetProteinGrams}g</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#7D8D39]">
                  <span className="w-2 h-2 rounded-full bg-[#7D8D39]" />
                  <span>Carbs: {carbGrams}g</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#FF5A22]">
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
                    <span>Target Saved to Profile</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Save Target to Profile</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-[#7D8D39]">
                Syncs with Explore &amp; Basket
              </span>
            </div>
          </div>

          {/* 4-Meal Chrononutrition Indian Distribution Lab */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#5B6E2C]/10">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#5B6E2C]" />
                <h3 className="font-display text-xl font-bold text-[#101410]">
                  Daily Chrononutrition Lab
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7D8D39] font-bold uppercase tracking-wider">
                4 Circadian Windows
              </span>
            </div>

            {/* Dietary Preference Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold mr-1">
                Diet Focus:
              </span>
              {[
                { id: 'all', label: 'All Staples' },
                { id: 'veg', label: 'Pure Veg' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'egg', label: 'Eggetarian' },
                { id: 'hostel', label: 'Hostel / 5-Min' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setDietFilter(filter.id as DietFilter)}
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    dietFilter === filter.id
                      ? 'bg-[#5B6E2C] text-white font-bold shadow-2xs'
                      : 'bg-[#F3F6F4] text-[#5E5E61] hover:text-[#101410] border border-[#5B6E2C]/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-[#5E5E61] leading-relaxed">
              Distributing your protein across four 3-4 hour metabolic windows sustains muscle protein synthesis (MPS) and avoids digestive stagnation.
            </p>

            {/* 4 Timeline Meal Cards */}
            <div className="space-y-3">
              {[0, 1, 2, 3].map((slotIdx) => {
                const availableProtocols = CHRONO_PROTOCOLS[slotIdx] || []
                const matchedProtocol =
                  availableProtocols.find((p) => p.dietary.includes(dietFilter)) ||
                  availableProtocols[0]!

                return (
                  <div
                    key={slotIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15 hover:border-[#5B6E2C]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#5B6E2C]/20 flex flex-col items-center justify-center shrink-0 shadow-2xs">
                        <span className="text-[8px] font-mono text-[#7D8D39] font-bold uppercase">
                          MEAL
                        </span>
                        <span className="font-display text-sm font-bold text-[#5B6E2C]">
                          0{slotIdx + 1}
                        </span>
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#5B6E2C]">
                            {matchedProtocol.time}
                          </span>
                          <span className="text-xs font-bold text-[#101410]">
                            &bull; {matchedProtocol.name}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#101410] mt-1">
                          {matchedProtocol.dish}
                        </p>
                        <p className="text-[11px] text-[#5E5E61] mt-0.5 leading-relaxed">
                          {matchedProtocol.clinicalNote}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#5B6E2C]/10">
                      <div className="text-left sm:text-right">
                        <span className="font-display text-xl font-bold text-[#5B6E2C] block">
                          ~{matchedProtocol.proteinGrams}g
                        </span>
                        <span className="text-[10px] font-mono text-[#7D8D39]">
                          {matchedProtocol.caloriesKcal} kcal
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-sm bg-[#5B6E2C]/10 text-[#5B6E2C] mt-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#FF5A22]" />
                        <span>{matchedProtocol.leucineGrams}g Leucine (MPS)</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* 1-Click: Add Full Day's Staples to Virtual Basket */}
            <div className="pt-4 border-t border-[#5B6E2C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#101410] block">
                  Add Full Day Plan to Grocery Basket
                </span>
                <span className="text-[11px] font-mono text-[#7D8D39]">
                  Pre-loads Soya, Sattu, Moong &amp; Paneer in calculated portions
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddFullDayToBasket}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#08482D] hover:bg-[#FF5A22] text-[#F5F8EF] text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#DAE7C7]" />
                <span>Add Full Day to Basket</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
