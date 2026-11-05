'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import {
  Swords,
  Trophy,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  BookmarkCheck,
  Check,
  Scale,
  Zap,
  ShieldCheck,
} from 'lucide-react'

const PRESET_MATCHUPS = [
  { label: 'Soy Chunks vs Commercial Bar', a: 'soy-chunks', b: 'commercial-protein-bar' },
  { label: 'Paneer vs Firm Tofu', a: 'paneer-fresh', b: 'tofu-firm' },
  { label: 'Whole Eggs vs Commercial Bar', a: 'eggs-whole', b: 'commercial-protein-bar' },
  { label: 'Roasted Chana vs Soy Chunks', a: 'roasted-chana', b: 'soy-chunks' },
]

export default function ComparePage() {
  const [foodAId, setFoodAId] = useState('soy-chunks')
  const [foodBId, setFoodBId] = useState('commercial-protein-bar')
  const [savedDuel, setSavedDuel] = useState(false)
  const [addedWinner, setAddedWinner] = useState(false)

  const saveComparison = useUserStore((state) => state.saveComparison)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const defaultFoodA = FOOD_DATABASE[0]!
  const defaultFoodB = FOOD_DATABASE[1]!
  const foodA = FOOD_DATABASE.find((f) => f.id === foodAId) ?? defaultFoodA
  const foodB = FOOD_DATABASE.find((f) => f.id === foodBId) ?? defaultFoodB

  const costA = (foodA.estimatedCostPer100g / foodA.proteinPer100g) * 10
  const costB = (foodB.estimatedCostPer100g / foodB.proteinPer100g) * 10

  const winner = costA <= costB ? foodA : foodB
  const loser = costA <= costB ? foodB : foodA
  const costRatio = (Math.max(costA, costB) / Math.min(costA, costB)).toFixed(1)

  // Scale tilt angle based on economics advantage (max +/- 12 deg)
  const tiltDeg = costA <= costB ? -12 : 12

  const handleSaveDuel = () => {
    saveComparison(foodA.id, foodB.id)
    setSavedDuel(true)
    setTimeout(() => setSavedDuel(false), 2000)
  }

  const handleAddWinner = () => {
    addToBasket(winner.id, 100)
    setAddedWinner(true)
    setTimeout(() => setAddedWinner(false), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F3F6F4]">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
              <Scale className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Head-to-Head Comparison &bull; Standardized Metrics</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
              Nutritional Comparison.
            </h1>
            <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
              Compare any two foods side-by-side on real nutritional density, protein yield, and
              standardized cost per 10 grams of protein based on ICMR-NIN IFCT 2017 scientific benchmarks.
            </p>
          </div>

          {/* Caveat Handwritten Callout */}
          <div className="hidden md:flex flex-col items-end text-right">
            <span
              className="text-lg font-bold text-[#08482D] -rotate-2"
              style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
            >
              Zero marketing hype • Pure protein economics ↗
            </span>
            <span className="text-xs text-[#7D8D39] font-mono">
              Calculated per 10g bioavailable protein
            </span>
          </div>
        </div>

        {/* Preset Matchup Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#7D8D39] font-bold mr-2">
            Popular Comparisons:
          </span>
          {PRESET_MATCHUPS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setFoodAId(preset.a)
                setFoodBId(preset.b)
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                foodAId === preset.a && foodBId === preset.b
                  ? 'bg-[#5B6E2C] text-white border-[#5B6E2C] shadow-2xs font-semibold'
                  : 'bg-white text-[#101410] border-[#5B6E2C]/20 hover:border-[#5B6E2C]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Physical Balance Beam Arena */}
      <div className="mb-12 p-6 sm:p-10 rounded-3xl bg-white border border-[#5B6E2C]/15 shadow-2xs flex flex-col items-center relative overflow-hidden">
        <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-bold mb-2">
          Nutritional &amp; Economic Balance Scale
        </span>

        {/* Balancing Scale Beam Graphic */}
        <div className="relative w-full max-w-2xl h-32 flex items-center justify-center my-4">
          {/* Fulcrum Triangle */}
          <div className="absolute bottom-1 w-0 h-0 border-l-[18px] border-l-transparent border-r-[18px] border-r-transparent border-b-[36px] border-b-[#5B6E2C] z-10 shadow-xs" />

          {/* Rotating Beam with Spring Transition */}
          <div
            className="w-full h-2.5 bg-[#101410] rounded-full shadow-xs transition-transform duration-700 ease-out flex items-center justify-between px-6"
            style={{ transform: `rotate(${tiltDeg}deg)` }}
          >
            {/* Left Pan Attachment */}
            <div className="w-10 h-10 rounded-full bg-[#5B6E2C] text-white flex items-center justify-center text-xs font-bold font-mono shadow-xs -ml-3">
              A
            </div>

            {/* Center Dial Needle */}
            <div className="w-1.5 h-6 bg-[#FF5A22] rounded-full" />

            {/* Right Pan Attachment */}
            <div className="w-10 h-10 rounded-full bg-[#7D8D39] text-white flex items-center justify-center text-xs font-bold font-mono shadow-xs -mr-3">
              B
            </div>
          </div>
        </div>

        {/* Dynamic Winner Verdict Banner */}
        <div className="mt-2 p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-center max-w-xl">
          <span className="text-xs font-mono uppercase text-[#08482D] font-bold block">
            VERDICT: {winner.name} PROVIDES SUPERIOR PROTEIN YIELD
          </span>
          <p className="text-xs text-[#101410] mt-1 font-medium">
            {winner.name} delivers <strong className="text-[#FF5A22]">{costRatio}×</strong> more protein
            per rupee compared to {loser.name}.
          </p>
        </div>
      </div>

      {/* Side-by-Side Contender Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start mb-10">
        {/* Contender A Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            winner.id === foodA.id
              ? 'bg-white border-[#5B6E2C] ring-1 ring-[#5B6E2C]/20 shadow-md'
              : 'bg-white border-[#5B6E2C]/15 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
              FOOD A
            </span>
            {winner.id === foodA.id && (
              <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>SUPERIOR VALUE</span>
              </span>
            )}
          </div>

          <label className="text-xs font-mono text-[#7D8D39] font-bold block mb-2">
            Select Contender A:
          </label>
          <select
            value={foodAId}
            onChange={(e) => setFoodAId(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/20 text-sm font-semibold text-[#101410] mb-5 focus:outline-none cursor-pointer"
          >
            {FOOD_DATABASE.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.proteinPer100g}g pro &bull; ₹{((f.estimatedCostPer100g / f.proteinPer100g) * 10).toFixed(1)}/10g)
              </option>
            ))}
          </select>

          {/* Food Image & Details */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#5B6E2C]/15">
            <Image
              src={foodA.imageUrl || '/images/food/food_0.webp'}
              alt={foodA.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono">
              {foodA.hindiName || foodA.name}
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-[#F3F6F4] flex justify-between items-baseline border border-[#5B6E2C]/10">
              <span className="text-xs font-mono text-[#5E5E61] font-bold">Cost / 10g Protein:</span>
              <span className="font-display text-3xl font-bold text-[#5B6E2C]">
                ₹{costA.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Protein Density</span>
                <span className="font-mono font-bold text-base text-[#101410]">
                  {foodA.proteinPer100g}g / 100g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Energy</span>
                <span className="font-mono font-bold text-base text-[#101410]">
                  {foodA.caloriesPer100g} kcal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5E5E61] leading-relaxed pt-1">
              {foodA.shortDescription}
            </p>
          </div>
        </div>

        {/* Contender B Card */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            winner.id === foodB.id
              ? 'bg-white border-[#5B6E2C] ring-1 ring-[#5B6E2C]/20 shadow-md'
              : 'bg-white border-[#5B6E2C]/15 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10 mb-5">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-bold">
              FOOD B
            </span>
            {winner.id === foodB.id && (
              <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>SUPERIOR VALUE</span>
              </span>
            )}
          </div>

          <label className="text-xs font-mono text-[#7D8D39] font-bold block mb-2">
            Select Contender B:
          </label>
          <select
            value={foodBId}
            onChange={(e) => setFoodBId(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/20 text-sm font-semibold text-[#101410] mb-5 focus:outline-none cursor-pointer"
          >
            {FOOD_DATABASE.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.proteinPer100g}g pro &bull; ₹{((f.estimatedCostPer100g / f.proteinPer100g) * 10).toFixed(1)}/10g)
              </option>
            ))}
          </select>

          {/* Food Image & Details */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-[#5B6E2C]/15">
            <Image
              src={foodB.imageUrl || '/images/food/food_1.webp'}
              alt={foodB.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono">
              {foodB.hindiName || foodB.name}
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-[#F3F6F4] flex justify-between items-baseline border border-[#5B6E2C]/10">
              <span className="text-xs font-mono text-[#5E5E61] font-bold">Cost / 10g Protein:</span>
              <span className="font-display text-3xl font-bold text-[#FF5A22]">
                ₹{costB.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Protein Density</span>
                <span className="font-mono font-bold text-base text-[#101410]">
                  {foodB.proteinPer100g}g / 100g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F3F6F4] border border-[#5B6E2C]/10">
                <span className="text-[10px] font-mono text-[#7D8D39] block uppercase font-bold">Energy</span>
                <span className="font-mono font-bold text-base text-[#101410]">
                  {foodB.caloriesPer100g} kcal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#5E5E61] leading-relaxed pt-1">
              {foodB.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="p-6 rounded-3xl bg-white border border-[#5B6E2C]/20 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5B6E2C]/10 flex items-center justify-center text-[#5B6E2C] shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] font-bold block">
              RECOMMENDED WHOLE FOOD
            </span>
            <span className="font-display text-base sm:text-lg font-bold text-[#101410]">
              {winner.name} delivers {costRatio}× more protein per rupee
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
            <span>{savedDuel ? 'Saved' : 'Save Matchup'}</span>
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
    </div>
  )
}
