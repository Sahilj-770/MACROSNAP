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
  Flame,
  Utensils,
  Clock,
  Compass,
  Zap,
} from 'lucide-react'

export default function CalculatorPage() {
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

  // 4-Meal Chrono-Nutritional Schedule
  const mealProtein = Math.round(targetProteinGrams / 4)
  const CHRONO_MEALS = [
    {
      time: '08:30 AM',
      name: 'Morning Metabolic Ignition',
      plate: 'Sprouted Moong & Besan Chilla + Mint Curd',
      protein: mealProtein,
      tip: 'High leucine spike to break overnight catabolism',
    },
    {
      time: '01:30 PM',
      name: 'Midday Cellular Sustenance',
      plate: 'Soya Granule Bhurji (50g) + 2 Jowar Rotis + Dal Tadka',
      protein: mealProtein + 2,
      tip: 'Slow-release complex carbs with complete amino profile',
    },
    {
      time: '06:00 PM',
      name: 'Post-Exertion Anabolic Window',
      plate: 'Roasted Sattu Buttermilk (35g) or 3 Boiled Egg Whites',
      protein: mealProtein - 4,
      tip: 'Rapid electrolyte hydration + immediate nitrogen influx',
    },
    {
      time: '09:00 PM',
      name: 'Nocturnal Repair Synthesis',
      plate: 'Paneer Bhurji / Firm Tofu Salad with Flaxseed Dusting',
      protein: mealProtein + 2,
      tip: 'Slow micellar casein/fat matrix for overnight tissue rebuilding',
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
  const dialAngle = -120 + (dialPct / 100) * 240 // -120 deg to +120 deg

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
          <Activity className="w-3.5 h-3.5 text-[#7D8D39] animate-pulse" />
          <span>Clinical Physiology Instrument &bull; ACSM / ISSN Guidelines</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          Precision Nitrogen Calorimeter
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-3xl leading-relaxed">
          Calibrate your physiological daily protein requirement based on empirical clinical guidelines, not fitness influencer arbitrary targets. Benchmark real whole-food economics and simulate your 24-hour amino acid distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Analog Dial & Physical Laboratory Controls */}
        <div className="lg:col-span-6 space-y-8">
          {/* Main Dial Housing Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(91,110,44,0.12)] mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7D8D39] animate-pulse" />
                CALIBRATION STAGE // UNIT 01
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-[#737B70] hover:text-[#FF5A22] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Dial</span>
              </button>
            </div>

            {/* Circular Laboratory Dial Gauge with Needle Spring Sweep */}
            <div className="flex flex-col items-center my-4">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#F3F6F4] border-4 border-[#5B6E2C]/20 shadow-inner flex items-center justify-center">
                {/* Degree Ticks around circumference with active highlight */}
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
                          ? '#FF5A22'
                          : i % 4 === 0
                          ? '#5B6E2C'
                          : 'rgba(91,110,44,0.3)',
                        boxShadow: isActiveTick ? '0 0 6px #FF5A22' : 'none',
                      }}
                    />
                  )
                })}

                {/* Needle Pointer with Smooth Inertial Spring */}
                <div
                  className="absolute w-1.5 h-28 bg-[#FF5A22] rounded-full origin-bottom shadow-lg transition-transform"
                  style={{
                    transform: `translateY(-50%) rotate(${dialAngle}deg)`,
                    bottom: '50%',
                    transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#FF5A22] -ml-[3px] -mt-[2px] shadow-sm animate-ping opacity-75" />
                </div>

                {/* Central Digital Readout Capsule with Animated Numbers */}
                <div className="relative z-10 w-36 h-36 rounded-full bg-white border-2 border-[rgba(91,110,44,0.25)] shadow-md flex flex-col items-center justify-center p-3 text-center transition-transform hover:scale-105">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#737B70]">
                    BODY WEIGHT
                  </span>
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#20271D] leading-none my-1 tabular-nums transition-all">
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
                  <span className="text-[#5B6E2C] font-bold">DRAG OR STEP DIAL</span>
                  <span>120 KG</span>
                </div>
              </div>
            </div>

            {/* Brass-and-Sage Laboratory Rocker Switches */}
            <div className="space-y-4 pt-6 border-t border-[rgba(91,110,44,0.12)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                Activity &amp; Training Demand (ISSN Guidelines)
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
                    className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                      activityMultiplier === tier.val
                        ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-sm scale-[1.02]'
                        : 'bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    <span className="text-xs font-bold font-display block leading-tight">
                      {tier.label}
                    </span>
                    <span
                      className={`text-[10px] font-mono mt-1 block ${
                        activityMultiplier === tier.val ? 'text-[#A3B18A]' : 'text-[#737B70]'
                      }`}
                    >
                      {tier.val}g / kg &bull; {tier.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Metabolic Target Mode */}
            <div className="space-y-2 pt-6 border-t border-[rgba(91,110,44,0.12)]">
              <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                Metabolic Phase
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'deficit', label: 'Fat Loss (-15%)' },
                  { id: 'maintain', label: 'Eucaloric (Maintain)' },
                  { id: 'surplus', label: 'Hypertrophy (+10%)' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setGoal(mode.id as any)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      goal === mode.id
                        ? 'bg-[#20271D] text-[#F3F6F4] border-[#20271D] shadow-xs'
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

        {/* Right Column: Computed Nitrogen Output & 24h Chrono-Nutritional Schedule */}
        <div className="lg:col-span-6 space-y-8">
          {/* Output Readout Bento with Animated Counter Displays */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#20271D] text-[#F3F6F4] border border-[rgba(91,110,44,0.3)] shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39]">
                PHYSIOLOGICAL TARGET MATRIX
              </span>
              <span className="text-xs font-mono text-white/70">
                DAILY SYNTHESIS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A3B18A] block">
                  Target Daily Protein
                </span>
                <span className="font-display text-5xl sm:text-6xl font-bold text-[#F3F6F4] mt-1 block tabular-nums transition-all">
                  {targetProteinGrams}
                  <span className="text-2xl font-sans font-normal text-[#7D8D39] ml-1">g</span>
                </span>
                <span className="text-xs font-mono text-white/70 mt-1 block">
                  {targetProteinGrams * 4} kcal &bull; {Math.round((proteinKcal / targetCalories) * 100)}% of TDEE
                </span>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A3B18A] block">
                  Estimated TDEE Energy
                </span>
                <span className="font-display text-5xl sm:text-6xl font-bold text-[#FF5A22] mt-1 block tabular-nums transition-all">
                  {targetCalories}
                  <span className="text-2xl font-sans font-normal text-white/70 ml-1">kcal</span>
                </span>
                <span className="text-xs font-mono text-white/70 mt-1 block">
                  Carbs {carbGrams}g &bull; Fats {fatGrams}g
                </span>
              </div>
            </div>

            {/* Animated Macro Distribution Ribbon */}
            <div className="mb-6 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-white/80">
                <span>Macronutrient Energy Balance</span>
                <span>P {Math.round((proteinKcal / targetCalories) * 100)}% / C {Math.round((carbKcal / targetCalories) * 100)}% / F {Math.round((fatKcal / targetCalories) * 100)}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="h-full bg-[#7D8D39] transition-all duration-500"
                  style={{ width: `${Math.round((proteinKcal / targetCalories) * 100)}%` }}
                  title="Protein"
                />
                <div
                  className="h-full bg-[#5B6E2C] transition-all duration-500"
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

            {/* Action: Save Target to Basket */}
            <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleSaveGoal}
                className={`w-full sm:w-auto px-7 py-3 rounded-full text-xs font-mono tracking-wider uppercase font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                  saved
                    ? 'bg-[#7D8D39] text-white scale-105'
                    : 'bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4]'
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
                    <span>Save Target to MacroSnap Basket</span>
                  </>
                )}
              </button>

              <span className="text-[11px] font-mono text-[#A3B18A]">
                Synchronizes with Virtual Ledger
              </span>
            </div>
          </div>

          {/* The 24-Hour Chrono-Nutritional Plate (MPS Pulses with Animated Sweep) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#5B6E2C] animate-spin" style={{ animationDuration: '12s' }} />
                <h3 className="font-display text-xl font-bold text-[#20271D]">
                  24-Hour Chrono-Nutritional Plate
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#7D8D39] uppercase tracking-wider">
                4 Anabolic Pulses
              </span>
            </div>

            <p className="text-xs text-[#737B70] leading-relaxed">
              Consuming protein in one massive sitting results in oxidation. Distributing your intake into ~30g–40g pulses every 3.5 to 5 hours maximizes muscle protein synthesis (MPS).
            </p>

            <div className="space-y-4">
              {CHRONO_MEALS.map((meal, idx) => {
                const isCurrentPulse = pulseActive === idx
                return (
                  <div
                    key={meal.time}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isCurrentPulse
                        ? 'bg-[rgba(125,141,57,0.14)] border-[#5B6E2C] shadow-sm translate-x-1'
                        : 'bg-[#F3F6F4] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-mono font-bold shrink-0 mt-0.5 transition-colors ${
                          isCurrentPulse
                            ? 'bg-[#FF5A22] text-white animate-pulse'
                            : 'bg-[#5B6E2C] text-[#F3F6F4]'
                        }`}
                      >
                        PULSE 0{idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-semibold text-[#5B6E2C]">
                            {meal.time}
                          </span>
                          <span className="text-xs font-bold text-[#20271D]">&mdash; {meal.name}</span>
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
