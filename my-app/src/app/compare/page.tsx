'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import {
  Scale,
  Trophy,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  BookmarkCheck,
  Check,
  Zap,
  TrendingDown,
  ArrowUpDown,
  Search,
  X,
  ShieldCheck,
  IndianRupee,
  Layers,
  ChevronDown,
  Award,
  Flame,
  Wheat,
  CircleDollarSign,
} from 'lucide-react'

const PRESET_MATCHUPS = [
  {
    title: 'The Great Deception',
    label: 'Soy Chunks vs Commercial Protein Bar',
    a: 'soy-chunks',
    b: 'commercial-protein-bar',
    tag: '14.4× Cheaper',
  },
  {
    title: 'Vegetarian Heavyweight',
    label: 'Fresh Paneer vs High-Protein Tofu',
    a: 'paneer-fresh',
    b: 'tofu-firm',
    tag: 'Casein vs Isoflavones',
  },
  {
    title: 'Campus Economics',
    label: 'Whole Eggs vs Commercial Bar',
    a: 'eggs-whole',
    b: 'commercial-protein-bar',
    tag: 'Complete Whole Food Matrix',
  },
  {
    title: 'Pocket Friendly',
    label: 'Roasted Chana vs Soy Chunks',
    a: 'roasted-chana',
    b: 'soy-chunks',
    tag: 'Zero-Prep vs High Purity',
  },
]

export default function ComparePage() {
  const [foodAId, setFoodAId] = useState('soy-chunks')
  const [foodBId, setFoodBId] = useState('commercial-protein-bar')
  const [savedDuel, setSavedDuel] = useState(false)
  const [addedWinner, setAddedWinner] = useState(false)
  const [modalSlot, setModalSlot] = useState<'A' | 'B' | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const saveComparison = useUserStore((state) => state.saveComparison)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const defaultFoodA = FOOD_DATABASE[0]!
  const defaultFoodB = FOOD_DATABASE[1]!
  const foodA = FOOD_DATABASE.find((f) => f.id === foodAId) ?? defaultFoodA
  const foodB = FOOD_DATABASE.find((f) => f.id === foodBId) ?? defaultFoodB

  // Standardized Cost per 10g Protein
  const costA = (foodA.estimatedCostPer100g / foodA.proteinPer100g) * 10
  const costB = (foodB.estimatedCostPer100g / foodB.proteinPer100g) * 10
  const fiberA = foodA.fiberPer100g ?? 0
  const fiberB = foodB.fiberPer100g ?? 0

  const isAWinner = costA <= costB
  const winner = isAWinner ? foodA : foodB
  const loser = isAWinner ? foodB : foodA
  const winnerCost = isAWinner ? costA : costB
  const loserCost = isAWinner ? costB : costA
  const costRatio = (Math.max(costA, costB) / Math.min(costA, costB)).toFixed(1)

  // Scale tilt calculation with logarithmic damping (-9.5 deg to +9.5 deg)
  const rawRatio = Math.max(costA, costB) / Math.min(costA, costB)
  const clampedTilt = Math.min(9.5, Math.max(4.0, Math.log2(rawRatio) * 3.5))
  const tiltDeg = isAWinner ? -clampedTilt : clampedTilt

  // Monthly savings calculation (assuming 30g daily protein consumption)
  const monthlyCostA = Math.round(costA * 3 * 30)
  const monthlyCostB = Math.round(costB * 3 * 30)
  const monthlySavings = Math.abs(monthlyCostA - monthlyCostB)
  const annualSavings = monthlySavings * 12

  const handleSwap = () => {
    setFoodAId(foodBId)
    setFoodBId(foodAId)
  }

  const handleSaveDuel = () => {
    saveComparison(foodA.id, foodB.id)
    setSavedDuel(true)
    setTimeout(() => setSavedDuel(false), 2400)
  }

  const handleAddWinner = () => {
    addToBasket(winner.id, 100)
    setAddedWinner(true)
    setTimeout(() => setAddedWinner(false), 2400)
  }

  // Filtered food list for the Contender Selection Modal
  const categories = useMemo(() => {
    const cats = new Set(FOOD_DATABASE.map((f) => f.category))
    return ['all', ...Array.from(cats)]
  }, [])

  const filteredFoods = useMemo(() => {
    return FOOD_DATABASE.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (food.hindiName && food.hindiName.includes(searchQuery))
      const matchesCategory = activeCategory === 'all' || food.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const selectFood = (foodId: string) => {
    if (modalSlot === 'A') {
      if (foodId === foodBId) setFoodBId(foodAId)
      setFoodAId(foodId)
    } else if (modalSlot === 'B') {
      if (foodId === foodAId) setFoodAId(foodBId)
      setFoodBId(foodId)
    }
    setModalSlot(null)
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6E2C]/10 text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold mb-3">
              <Scale className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Head-to-Head Nutritional Duel &bull; Standardized Empirical Economics</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
              Nutritional Duel Arena.
            </h1>
            <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
              Place any two Indian pantry staples or commercial supplements on the physical weighing scale.
              Unmask protein purity, calorie overhead, and exact cost per 10 grams of bioavailable protein.
            </p>
          </div>

          {/* Caveat Handwritten Callout */}
          <div className="hidden md:flex flex-col items-end text-right">
            <span
              className="text-lg font-bold text-[#08482D] -rotate-2"
              style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
            >
              ₹ के आधार पर असली पोषण परख ↗
            </span>
            <span className="text-xs text-[#7D8D39] font-mono">
              Zero marketing markup • ICMR IFCT 2017 Verified
            </span>
          </div>
        </div>

        {/* Preset Duel Badges */}
        <div className="mt-6 pt-5 border-t border-[#5B6E2C]/10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#7D8D39] font-bold">
              High-Impact Nutritional Duels:
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRESET_MATCHUPS.map((preset) => {
              const isCurrent =
                (foodAId === preset.a && foodBId === preset.b) ||
                (foodAId === preset.b && foodBId === preset.a)
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setFoodAId(preset.a)
                    setFoodBId(preset.b)
                  }}
                  className={`p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-xs'
                      : 'bg-white text-[#101410] border-[#5B6E2C]/15 hover:border-[#5B6E2C]/60 hover:shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                          isCurrent ? 'text-white/80' : 'text-[#7D8D39]'
                        }`}
                      >
                        {preset.title}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-sm font-semibold ${
                          isCurrent
                            ? 'bg-white/20 text-white'
                            : 'bg-[#FF5A22]/10 text-[#FF5A22]'
                        }`}
                      >
                        {preset.tag}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-display block line-clamp-1">
                      {preset.label}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* The Physical Kirana Precision Scale Arena */}
      <section className="mb-12 p-6 sm:p-10 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs relative overflow-hidden">
        {/* Subtle Background Calibration Grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#101410 1px, transparent 1px), radial-gradient(#101410 1px, #F3F6F4 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-between w-full max-w-3xl mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#5B6E2C]" />
              PHYSICAL KIRANA BALANCE SCALE
            </span>
            <span className="text-xs font-mono text-[#5E5E61]">
              Gravitational Bias: Standardized Protein Cost
            </span>
          </div>

          {/* Physical Balance Scale SVG Rig */}
          <div className="w-full max-w-2xl my-2 select-none flex justify-center">
            <svg
              viewBox="0 0 680 280"
              className="w-full h-auto max-h-[320px] overflow-visible"
              aria-label={`Kirana balance scale comparing ${foodA.name} and ${foodB.name}`}
            >
              <defs>
                <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#5B6E2C" />
                  <stop offset="50%" stopColor="#101410" />
                  <stop offset="100%" stopColor="#7D8D39" />
                </linearGradient>
                <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2A3816" />
                  <stop offset="100%" stopColor="#101410" />
                </linearGradient>
                <linearGradient id="panWinnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E4F0D5" />
                  <stop offset="100%" stopColor="#BACF9C" />
                </linearGradient>
                <linearGradient id="panStandardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#E2E8E4" />
                </linearGradient>
                <filter id="scaleDropShadow" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#101410" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Fulcrum Pedestal Base */}
              <rect x="250" y="252" width="180" height="12" rx="6" fill="#5B6E2C" filter="url(#scaleDropShadow)" />
              <rect x="270" y="246" width="140" height="6" rx="3" fill="#3D4B1C" />

              {/* Fulcrum Stand Pillar */}
              <rect x="335" y="115" width="10" height="132" rx="2" fill="url(#pillarGrad)" />

              {/* Fulcrum Triangular Apex Wedge */}
              <polygon points="340,115 316,180 364,180" fill="#101410" opacity="0.95" />

              {/* Top Suspension Ring & Anchor */}
              <circle cx="340" cy="38" r="14" stroke="#5B6E2C" strokeWidth="4" fill="#FFFFFF" />
              <line x1="340" y1="52" x2="340" y2="115" stroke="#5B6E2C" strokeWidth="4" strokeLinecap="round" />

              {/* Rotating Brass Balance Beam */}
              <g
                transform={`rotate(${tiltDeg}, 340, 115)`}
                style={{ transition: 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1)' }}
              >
                {/* Main Beam */}
                <rect x="75" y="111" width="530" height="8" rx="4" fill="url(#beamGrad)" filter="url(#scaleDropShadow)" />

                {/* Beam Calibration Tick Marks */}
                {Array.from({ length: 23 }).map((_, i) => {
                  const tx = 95 + i * 22.2
                  return (
                    <line
                      key={i}
                      x1={tx}
                      y1={111}
                      x2={tx}
                      y2={i % 5 === 0 ? 119 : 115}
                      stroke="#FFFFFF"
                      strokeOpacity={0.45}
                      strokeWidth={i % 5 === 0 ? 1.5 : 1}
                    />
                  )
                })}

                {/* Beam Pivot Eyelets */}
                <circle cx="95" cy="115" r="5" fill="#FFFFFF" stroke="#5B6E2C" strokeWidth="2.5" />
                <circle cx="585" cy="115" r="5" fill="#FFFFFF" stroke="#5B6E2C" strokeWidth="2.5" />

                {/* Left Pan Suspension Rig (Food A) */}
                <g
                  transform={`translate(95, 115) rotate(${-tiltDeg})`}
                  style={{ transition: 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1)' }}
                >
                  {/* High-tensile Kirana Suspension Cables */}
                  <line x1="0" y1="0" x2="-38" y2="58" stroke="#5B6E2C" strokeWidth="1.75" strokeOpacity="0.85" />
                  <line x1="0" y1="0" x2="38" y2="58" stroke="#5B6E2C" strokeWidth="1.75" strokeOpacity="0.85" />
                  <circle cx="0" cy="0" r="3" fill="#5B6E2C" />

                  {/* Stainless Steel Pan Dish */}
                  <ellipse cx="0" cy="62" rx="48" ry="9" fill="#101410" fillOpacity="0.08" />
                  <ellipse
                    cx="0"
                    cy="60"
                    rx="48"
                    ry="9"
                    fill={isAWinner ? 'url(#panWinnerGrad)' : 'url(#panStandardGrad)'}
                    stroke={isAWinner ? '#5B6E2C' : '#8A9977'}
                    strokeWidth="2"
                  />

                  {/* Floating Food Cutout Avatar on the Pan */}
                  <foreignObject x="-23" y="14" width="46" height="46" className="overflow-visible pointer-events-none">
                    <div className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                      <img
                        src={foodA.imageUrl || '/images/food/food_0.webp'}
                        alt={foodA.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </foreignObject>

                  {/* Dedicated Price Badge Pill */}
                  <g transform="translate(0, 72)">
                    <rect
                      x="-50"
                      y="0"
                      width="100"
                      height="22"
                      rx="11"
                      fill={isAWinner ? '#08482D' : '#101410'}
                      stroke={isAWinner ? '#7D8D39' : '#3D4B1C'}
                      strokeWidth="1.5"
                      filter="url(#scaleDropShadow)"
                    />
                    <text
                      x="0"
                      y="15"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      A • ₹{costA.toFixed(1)}/10g
                    </text>
                  </g>
                </g>

                {/* Right Pan Suspension Rig (Food B) */}
                <g
                  transform={`translate(585, 115) rotate(${-tiltDeg})`}
                  style={{ transition: 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1)' }}
                >
                  {/* High-tensile Kirana Suspension Cables */}
                  <line x1="0" y1="0" x2="-38" y2="58" stroke="#7D8D39" strokeWidth="1.75" strokeOpacity="0.85" />
                  <line x1="0" y1="0" x2="38" y2="58" stroke="#7D8D39" strokeWidth="1.75" strokeOpacity="0.85" />
                  <circle cx="0" cy="0" r="3" fill="#7D8D39" />

                  {/* Stainless Steel Pan Dish */}
                  <ellipse cx="0" cy="62" rx="48" ry="9" fill="#101410" fillOpacity="0.08" />
                  <ellipse
                    cx="0"
                    cy="60"
                    rx="48"
                    ry="9"
                    fill={!isAWinner ? 'url(#panWinnerGrad)' : 'url(#panStandardGrad)'}
                    stroke={!isAWinner ? '#5B6E2C' : '#8A9977'}
                    strokeWidth="2"
                  />

                  {/* Floating Food Cutout Avatar on the Pan */}
                  <foreignObject x="-23" y="14" width="46" height="46" className="overflow-visible pointer-events-none">
                    <div className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-white shadow-md bg-white">
                      <img
                        src={foodB.imageUrl || '/images/food/food_1.webp'}
                        alt={foodB.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </foreignObject>

                  {/* Dedicated Price Badge Pill */}
                  <g transform="translate(0, 72)">
                    <rect
                      x="-50"
                      y="0"
                      width="100"
                      height="22"
                      rx="11"
                      fill={!isAWinner ? '#08482D' : '#101410'}
                      stroke={!isAWinner ? '#7D8D39' : '#3D4B1C'}
                      strokeWidth="1.5"
                      filter="url(#scaleDropShadow)"
                    />
                    <text
                      x="0"
                      y="15"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10.5"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      B • ₹{costB.toFixed(1)}/10g
                    </text>
                  </g>
                </g>
              </g>

              {/* Central Precision Dial Gauge */}
              <g transform="translate(340, 115)">
                <circle cx="0" cy="0" r="44" fill="#FFFFFF" stroke="#5B6E2C" strokeWidth="3" filter="url(#scaleDropShadow)" />
                <circle cx="0" cy="0" r="38" fill="none" stroke="#5B6E2C" strokeWidth="0.75" strokeDasharray="2,2" opacity="0.5" />
                {[-36, -24, -12, 0, 12, 24, 36].map((deg) => (
                  <line
                    key={deg}
                    x1="0"
                    y1="-38"
                    x2="0"
                    y2="-32"
                    stroke="#7D8D39"
                    strokeWidth="1"
                    transform={`rotate(${deg})`}
                  />
                ))}
                {/* Dial Arc Needle */}
                <g
                  transform={`rotate(${tiltDeg * 2.2})`}
                  style={{ transition: 'transform 0.75s cubic-bezier(0.34, 1.35, 0.64, 1)' }}
                >
                  <line x1="0" y1="6" x2="0" y2="-34" stroke="#FF5A22" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="0" cy="0" r="4" fill="#FF5A22" />
                </g>
                {/* Dial Readings */}
                <text x="0" y="-10" textAnchor="middle" fill="#7D8D39" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                  DELTA
                </text>
                <text x="0" y="10" textAnchor="middle" fill="#FF5A22" fontSize="15" fontFamily="var(--font-display, sans-serif)" fontWeight="900">
                  {costRatio}×
                </text>
                <text x="0" y="23" textAnchor="middle" fill="#101410" fontSize="7" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
                  VALUE ADVANTAGE
                </text>
                <circle cx="0" cy="0" r="2.5" fill="#5B6E2C" />
              </g>
            </svg>
          </div>

          {/* Dynamic Winner Verdict Banner */}
          <div className="mt-4 p-5 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/25 text-center max-w-2xl w-full shadow-2xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#5B6E2C] text-white text-[11px] font-mono font-bold uppercase mb-2 shadow-2xs">
              <Trophy className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>EMPIRICAL VERDICT &bull; {winner.name} WINS</span>
            </div>
            <p className="font-display text-lg sm:text-xl font-bold text-[#101410]">
              {winner.name} delivers{' '}
              <span className="text-[#FF5A22] underline decoration-2 underline-offset-4 font-black">
                {costRatio}× more bioavailable protein
              </span>{' '}
              per rupee than {loser.name}.
            </p>
            <p className="text-xs text-[#5E5E61] mt-1 font-medium">
              Standardized cost: <strong className="text-[#5B6E2C]">₹{winnerCost.toFixed(2)}</strong> for 10g protein vs{' '}
              <strong className="text-[#FF5A22]">₹{loserCost.toFixed(2)}</strong> for {loser.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Contender Selection Deck & Quick Swap */}
      <div className="relative mb-12">
        {/* Floating Swap Button in the Center */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap Contenders"
            className="w-12 h-12 rounded-full bg-white border-2 border-[#5B6E2C] text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-white transition-all shadow-md flex items-center justify-center cursor-pointer group"
          >
            <ArrowUpDown className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Contender A Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between ${
              isAWinner
                ? 'bg-white border-[#5B6E2C] ring-2 ring-[#5B6E2C]/20 shadow-md'
                : 'bg-white border-[#5B6E2C]/15 shadow-2xs'
            }`}
          >
            <div>
              {/* Header with Slot & Winner Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#5B6E2C] text-white flex items-center justify-center text-xs font-bold font-mono">
                    A
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
                    CONTENDER A
                  </span>
                </div>
                {isAWinner && (
                  <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-[#DAE7C7]" />
                    <span>SUPERIOR VALUE</span>
                  </span>
                )}
              </div>

              {/* Visual Contender Selector Trigger */}
              <button
                type="button"
                onClick={() => setModalSlot('A')}
                className="w-full p-4 rounded-2xl bg-[#F3F6F4] hover:bg-[#E4ECE7] border border-[#5B6E2C]/20 transition-all flex items-center justify-between mb-5 cursor-pointer text-left group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold block">
                    Click to Change Contender A:
                  </span>
                  <span className="font-display text-lg font-bold text-[#101410] group-hover:text-[#5B6E2C] transition-colors line-clamp-1">
                    {foodA.name}
                  </span>
                  {foodA.hindiName && (
                    <span className="text-xs text-[#7D8D39] font-medium block">
                      {foodA.hindiName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-[#5B6E2C] font-bold shrink-0 ml-3">
                  <span>Browse</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Food Image with High-Res Frame */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-[#5B6E2C]/15 shadow-2xs group">
                <Image
                  src={foodA.imageUrl || '/images/food/food_0.webp'}
                  alt={foodA.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-xs font-mono font-medium">
                  {foodA.category.toUpperCase().replace('-', ' ')}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold shadow-xs">
                  {foodA.proteinPer100g}g Protein / 100g
                </div>
              </div>

              {/* Standardized Cost Highlight Box */}
              <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15 mb-4 flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] font-mono text-[#5E5E61] uppercase font-bold block">
                    Cost per 10g Protein:
                  </span>
                  <span className="text-xs text-[#7D8D39] font-mono">
                    ₹{(foodA.estimatedCostPer100g).toFixed(0)} / 100g whole food
                  </span>
                </div>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#5B6E2C]">
                  ₹{costA.toFixed(2)}
                </span>
              </div>

              {/* Macro & Satiety Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Protein</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{foodA.proteinPer100g}g</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Energy</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{foodA.caloriesPer100g} kcal</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Fiber</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{fiberA}g</span>
                </div>
              </div>

              <p className="text-xs text-[#5E5E61] leading-relaxed">
                {foodA.shortDescription}
              </p>
            </div>

            {/* Practical Preparation Tip */}
            {foodA.highlightTip && (
              <div className="mt-4 pt-3 border-t border-[#5B6E2C]/10 text-[11px] text-[#5B6E2C] font-medium flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5A22] shrink-0 mt-0.5" />
                <span>{foodA.highlightTip}</span>
              </div>
            )}
          </div>

          {/* Contender B Card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border transition-all flex flex-col justify-between ${
              !isAWinner
                ? 'bg-white border-[#5B6E2C] ring-2 ring-[#5B6E2C]/20 shadow-md'
                : 'bg-white border-[#5B6E2C]/15 shadow-2xs'
            }`}
          >
            <div>
              {/* Header with Slot & Winner Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#7D8D39] text-white flex items-center justify-center text-xs font-bold font-mono">
                    B
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-bold">
                    CONTENDER B
                  </span>
                </div>
                {!isAWinner && (
                  <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                    <Trophy className="w-3.5 h-3.5 text-[#DAE7C7]" />
                    <span>SUPERIOR VALUE</span>
                  </span>
                )}
              </div>

              {/* Visual Contender Selector Trigger */}
              <button
                type="button"
                onClick={() => setModalSlot('B')}
                className="w-full p-4 rounded-2xl bg-[#F3F6F4] hover:bg-[#E4ECE7] border border-[#5B6E2C]/20 transition-all flex items-center justify-between mb-5 cursor-pointer text-left group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold block">
                    Click to Change Contender B:
                  </span>
                  <span className="font-display text-lg font-bold text-[#101410] group-hover:text-[#5B6E2C] transition-colors line-clamp-1">
                    {foodB.name}
                  </span>
                  {foodB.hindiName && (
                    <span className="text-xs text-[#7D8D39] font-medium block">
                      {foodB.hindiName}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs font-mono text-[#5B6E2C] font-bold shrink-0 ml-3">
                  <span>Browse</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </div>
              </button>

              {/* Food Image with High-Res Frame */}
              <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-[#5B6E2C]/15 shadow-2xs group">
                <Image
                  src={foodB.imageUrl || '/images/food/food_1.webp'}
                  alt={foodB.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/65 backdrop-blur-xs text-white text-xs font-mono font-medium">
                  {foodB.category.toUpperCase().replace('-', ' ')}
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold shadow-xs">
                  {foodB.proteinPer100g}g Protein / 100g
                </div>
              </div>

              {/* Standardized Cost Highlight Box */}
              <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[#5B6E2C]/15 mb-4 flex justify-between items-baseline">
                <div>
                  <span className="text-[11px] font-mono text-[#5E5E61] uppercase font-bold block">
                    Cost per 10g Protein:
                  </span>
                  <span className="text-xs text-[#7D8D39] font-mono">
                    ₹{(foodB.estimatedCostPer100g).toFixed(0)} / 100g whole food
                  </span>
                </div>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#FF5A22]">
                  ₹{costB.toFixed(2)}
                </span>
              </div>

              {/* Macro & Satiety Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Protein</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{foodB.proteinPer100g}g</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Energy</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{foodB.caloriesPer100g} kcal</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                  <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Fiber</span>
                  <span className="font-mono font-bold text-base text-[#101410]">{fiberB}g</span>
                </div>
              </div>

              <p className="text-xs text-[#5E5E61] leading-relaxed">
                {foodB.shortDescription}
              </p>
            </div>

            {/* Practical Preparation Tip */}
            {foodB.highlightTip && (
              <div className="mt-4 pt-3 border-t border-[#5B6E2C]/10 text-[11px] text-[#5B6E2C] font-medium flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF5A22] shrink-0 mt-0.5" />
                <span>{foodB.highlightTip}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Head-to-Head Comparative Metric Spectrogram */}
      <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs">
        <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#5B6E2C]" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#101410]">
              Empirical Comparative Spectrogram
            </h2>
          </div>
          <span className="text-xs font-mono text-[#7D8D39]">
            Food A (Left) vs Food B (Right)
          </span>
        </div>

        <div className="space-y-6">
          {/* Dimension 1: Cost per 10g Protein (Lower is Better) */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className={`font-bold ${isAWinner ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                Food A: ₹{costA.toFixed(1)} / 10g {isAWinner && '✓ WINNER'}
              </span>
              <span className="text-[#5E5E61] uppercase tracking-wider font-semibold">
                Cost Efficiency (Lower is Better)
              </span>
              <span className={`font-bold ${!isAWinner ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                {!isAWinner && '✓ WINNER '}Food B: ₹{costB.toFixed(1)} / 10g
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F3F6F4] flex overflow-hidden border border-[#5B6E2C]/15">
              <div
                className={`h-full transition-all duration-500 ${isAWinner ? 'bg-[#5B6E2C]' : 'bg-[#FF5A22]'}`}
                style={{ width: `${Math.min(90, Math.max(10, (costB / (costA + costB)) * 100))}%` }}
              />
              <div
                className={`h-full transition-all duration-500 ${!isAWinner ? 'bg-[#5B6E2C]' : 'bg-[#7D8D39]'}`}
                style={{ width: `${Math.min(90, Math.max(10, (costA / (costA + costB)) * 100))}%` }}
              />
            </div>
          </div>

          {/* Dimension 2: Protein Purity (% by Weight) */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className={`font-bold ${foodA.proteinPer100g >= foodB.proteinPer100g ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                {foodA.proteinPer100g}% Protein {foodA.proteinPer100g >= foodB.proteinPer100g && '✓ HIGHER'}
              </span>
              <span className="text-[#5E5E61] uppercase tracking-wider font-semibold">
                Protein Purity (% by Weight)
              </span>
              <span className={`font-bold ${foodB.proteinPer100g >= foodA.proteinPer100g ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                {foodB.proteinPer100g >= foodA.proteinPer100g && '✓ HIGHER '}{foodB.proteinPer100g}% Protein
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F3F6F4] flex overflow-hidden border border-[#5B6E2C]/15">
              <div
                className="h-full bg-[#5B6E2C] transition-all duration-500"
                style={{ width: `${(foodA.proteinPer100g / (foodA.proteinPer100g + foodB.proteinPer100g)) * 100}%` }}
              />
              <div
                className="h-full bg-[#7D8D39] transition-all duration-500"
                style={{ width: `${(foodB.proteinPer100g / (foodA.proteinPer100g + foodB.proteinPer100g)) * 100}%` }}
              />
            </div>
          </div>

          {/* Dimension 3: Calorie Overhead per 10g Protein */}
          {(() => {
            const calA = (foodA.caloriesPer100g / foodA.proteinPer100g) * 10
            const calB = (foodB.caloriesPer100g / foodB.proteinPer100g) * 10
            const aLeaner = calA <= calB
            return (
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className={`font-bold ${aLeaner ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                    {Math.round(calA)} kcal / 10g pro {aLeaner && '✓ LEANER'}
                  </span>
                  <span className="text-[#5E5E61] uppercase tracking-wider font-semibold">
                    Calorie Overhead (Lower is Leaner)
                  </span>
                  <span className={`font-bold ${!aLeaner ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                    {!aLeaner && '✓ LEANER '}{Math.round(calB)} kcal / 10g pro
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-[#F3F6F4] flex overflow-hidden border border-[#5B6E2C]/15">
                  <div
                    className={`h-full transition-all duration-500 ${aLeaner ? 'bg-[#5B6E2C]' : 'bg-[#FF5A22]'}`}
                    style={{ width: `${(calB / (calA + calB)) * 100}%` }}
                  />
                  <div
                    className={`h-full transition-all duration-500 ${!aLeaner ? 'bg-[#5B6E2C]' : 'bg-[#7D8D39]'}`}
                    style={{ width: `${(calA / (calA + calB)) * 100}%` }}
                  />
                </div>
              </div>
            )
          })()}

          {/* Dimension 4: Prebiotic Dietary Fiber */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className={`font-bold ${fiberA >= fiberB ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                {fiberA}g Fiber {fiberA >= fiberB && '✓ HIGHER'}
              </span>
              <span className="text-[#5E5E61] uppercase tracking-wider font-semibold">
                Prebiotic Dietary Fiber (Gut Satiety)
              </span>
              <span className={`font-bold ${fiberB >= fiberA ? 'text-[#5B6E2C]' : 'text-[#101410]'}`}>
                {fiberB >= fiberA && '✓ HIGHER '}{fiberB}g Fiber
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F3F6F4] flex overflow-hidden border border-[#5B6E2C]/15">
              <div
                className="h-full bg-[#5B6E2C] transition-all duration-500"
                style={{
                  width: `${
                    fiberA + fiberB === 0
                      ? 50
                      : (fiberA / (fiberA + fiberB)) * 100
                  }%`,
                }}
              />
              <div
                className="h-full bg-[#7D8D39] transition-all duration-500"
                style={{
                  width: `${
                    fiberA + fiberB === 0
                      ? 50
                      : (fiberB / (fiberA + fiberB)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Rupee Savings Ledger */}
      <section className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#5B6E2C]/5 border border-[#5B6E2C]/20 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#5B6E2C]/15 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#5B6E2C] text-white flex items-center justify-center shadow-xs">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-[#101410]">
                Monthly Household Wallet Impact
              </h3>
              <p className="text-xs text-[#5E5E61]">
                Simulating a standard daily 30-gram protein serving from each contender over 30 days
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#7D8D39] font-bold block">
              ANNUAL COMPOUNDED SAVINGS
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#08482D]">
              ₹{annualSavings.toLocaleString('en-IN')} / yr
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15">
            <span className="text-xs font-mono uppercase text-[#5E5E61] block mb-1">
              Monthly Cost ({foodA.name.slice(0, 18)})
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#101410]">
              ₹{monthlyCostA}
            </span>
            <span className="text-[11px] font-mono text-[#7D8D39] block mt-1">
              ₹{(monthlyCostA / 30).toFixed(0)} / day
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15">
            <span className="text-xs font-mono uppercase text-[#5E5E61] block mb-1">
              Monthly Cost ({foodB.name.slice(0, 18)})
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#101410]">
              ₹{monthlyCostB}
            </span>
            <span className="text-[11px] font-mono text-[#7D8D39] block mt-1">
              ₹{(monthlyCostB / 30).toFixed(0)} / day
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#5B6E2C] text-white shadow-xs">
            <span className="text-xs font-mono uppercase text-white/80 block mb-1 font-bold">
              Net Monthly Savings with {winner.name.slice(0, 14)}
            </span>
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#DAE7C7]">
              ₹{monthlySavings.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] font-mono text-white/90 block mt-1 font-semibold">
              Enough for 6+ months of kirana groceries!
            </span>
          </div>
        </div>
      </section>

      {/* Action Footer Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#5B6E2C]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5B6E2C]/10 flex items-center justify-center text-[#5B6E2C] shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] font-bold block">
              RECOMMENDED WHOLE FOOD ACTION
            </span>
            <span className="font-display text-base sm:text-lg font-bold text-[#101410]">
              Add {winner.name} to virtual basket &bull; Save ₹{monthlySavings}/mo
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handleSaveDuel}
            className="px-4 py-2.5 rounded-full bg-[#F3F6F4] hover:bg-white border border-[#5B6E2C]/20 text-[#101410] text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4 text-[#5B6E2C]" />
            <span>{savedDuel ? 'Saved to Profile' : 'Save Duel'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddWinner}
            className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              addedWinner
                ? 'bg-[#7D8D39] text-white'
                : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-white'
            }`}
          >
            {addedWinner ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{addedWinner ? 'Added to Basket' : `Add 100g ${winner.name}`}</span>
          </button>
        </div>
      </div>

      {/* Contender Selection Slide-Over Modal / Drawer */}
      {modalSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#5B6E2C]/25 shadow-2xl p-6 sm:p-8 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/15 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#7D8D39] font-bold block">
                  Select for Slot {modalSlot}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#101410]">
                  Choose Food Contender
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalSlot(null)}
                className="w-9 h-9 rounded-full bg-[#F3F6F4] hover:bg-[#E4ECE7] text-[#101410] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-[#7D8D39] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search food by English or Hindi name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/20 text-sm text-[#101410] placeholder:text-[#5E5E61] focus:outline-hidden focus:ring-2 focus:ring-[#5B6E2C]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#5B6E2C] text-white font-bold shadow-2xs'
                      : 'bg-[#F3F6F4] text-[#5E5E61] hover:text-[#101410] border border-[#5B6E2C]/10'
                  }`}
                >
                  {cat.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Scrollable Food List */}
            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {filteredFoods.map((f) => {
                const cost10g = ((f.estimatedCostPer100g / f.proteinPer100g) * 10).toFixed(1)
                const isSelected =
                  (modalSlot === 'A' && f.id === foodAId) || (modalSlot === 'B' && f.id === foodBId)
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => selectFood(f.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#5B6E2C]/10 border-[#5B6E2C] ring-1 ring-[#5B6E2C]'
                        : 'bg-[#F3F6F4] border-[#5B6E2C]/15 hover:border-[#5B6E2C]/50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-[#5B6E2C]/15">
                        <Image
                          src={f.imageUrl || '/images/food/food_0.webp'}
                          alt={f.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <span className="font-display text-sm font-bold text-[#101410] block line-clamp-1">
                          {f.name}
                        </span>
                        {f.hindiName && (
                          <span className="text-xs text-[#7D8D39] font-medium block">
                            {f.hindiName}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-[#5E5E61]">
                          {f.proteinPer100g}g protein / 100g &bull; {f.caloriesPer100g} kcal
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-display text-base font-bold text-[#5B6E2C] block">
                        ₹{cost10g}
                      </span>
                      <span className="text-[9px] font-mono text-[#7D8D39] uppercase block font-semibold">
                        per 10g protein
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
