'use client'

import React, { useState } from 'react'
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

  // Scale tilt angle based on economics advantage (max +/- 14 deg)
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
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F3F6F4]">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
          <Scale className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Head-to-Head Comparison &bull; Standardized Metrics</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          Nutritional Comparison
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-3xl leading-relaxed">
          Compare any two foods side-by-side on real nutritional density, protein yield, and standardized cost per 10 grams of protein based on ICMR-NIN IFCT 2017 scientific benchmarks.
        </p>

        {/* Preset Duel Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] mr-2">
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
                  ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-2xs font-semibold'
                  : 'bg-white text-[#20271D] border-[rgba(91,110,44,0.2)] hover:border-[#5B6E2C]'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* The Physical Balance Beam Arena */}
      <div className="mb-14 p-8 sm:p-12 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm flex flex-col items-center relative overflow-hidden">
        <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] mb-4">
          Nutritional &amp; Economic Balance
        </span>

        {/* Balancing Scale Beam Graphic */}
        <div className="relative w-full max-w-2xl h-36 flex items-center justify-center my-6">
          {/* Fulcrum Triangle */}
          <div className="absolute bottom-2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-b-[#5B6E2C] z-10 shadow-xs" />

          {/* Rotating Beam with Spring Transition */}
          <div
            className="w-full h-2.5 bg-[#20271D] rounded-full shadow-xs transition-transform duration-700 ease-out flex items-center justify-between px-8"
            style={{ transform: `rotate(${tiltDeg}deg)` }}
          >
            {/* Left Pan Attachment */}
            <div className="w-10 h-10 rounded-full bg-[#5B6E2C] text-white flex items-center justify-center text-xs font-bold font-mono shadow-xs -ml-4">
              A
            </div>

            {/* Center Dial Needle */}
            <div className="w-1.5 h-6 bg-[#FF5A22] rounded-full" />

            {/* Right Pan Attachment */}
            <div className="w-10 h-10 rounded-full bg-[#7D8D39] text-white flex items-center justify-center text-xs font-bold font-mono shadow-xs -mr-4">
              B
            </div>
          </div>
        </div>

        {/* Dynamic Winner Verdict Banner */}
        <div className="mt-4 p-4 rounded-2xl bg-[rgba(125,141,57,0.1)] border border-[rgba(91,110,44,0.25)] text-center max-w-xl">
          <span className="text-xs font-mono uppercase text-[#5B6E2C] font-bold block">
            VERDICT: {winner.name} PROVIDES GREATER VALUE
          </span>
          <p className="text-xs text-[#20271D] mt-1">
            {winner.name} delivers {costRatio}× more protein per rupee compared to {loser.name}.
          </p>
        </div>
      </div>

      {/* Side-by-Side Contender Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-12">
        {/* Contender A Card */}
        <div
          className={`p-8 rounded-3xl border transition-all ${
            winner.id === foodA.id
              ? 'bg-white border-[#5B6E2C] shadow-md'
              : 'bg-white border-[rgba(91,110,44,0.18)] shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)] mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-bold">
              FOOD A
            </span>
            {winner.id === foodA.id && (
              <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>BETTER VALUE</span>
              </span>
            )}
          </div>

          <label className="text-xs font-mono text-[#737B70] block mb-2">
            Select Food:
          </label>
          <select
            value={foodAId}
            onChange={(e) => setFoodAId(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.2)] text-sm font-semibold text-[#20271D] mb-6 focus:outline-none"
          >
            {FOOD_DATABASE.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.proteinPer100g}g protein &bull; ₹{((f.estimatedCostPer100g / f.proteinPer100g) * 10).toFixed(1)}/10g)
              </option>
            ))}
          </select>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F3F6F4] flex justify-between items-baseline">
              <span className="text-xs font-mono text-[#737B70]">Cost / 10g Protein:</span>
              <span className="font-display text-3xl font-bold text-[#5B6E2C]">
                ₹{costA.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#F3F6F4]">
                <span className="text-[10px] font-mono text-[#737B70] block">Protein Density</span>
                <span className="font-mono font-bold text-base text-[#20271D]">
                  {foodA.proteinPer100g}g / 100g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F3F6F4]">
                <span className="text-[10px] font-mono text-[#737B70] block">Calories</span>
                <span className="font-mono font-bold text-base text-[#20271D]">
                  {foodA.caloriesPer100g} kcal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#737B70] leading-relaxed pt-2">
              {foodA.shortDescription}
            </p>
          </div>
        </div>

        {/* Contender B Card */}
        <div
          className={`p-8 rounded-3xl border transition-all ${
            winner.id === foodB.id
              ? 'bg-white border-[#5B6E2C] shadow-md'
              : 'bg-white border-[rgba(91,110,44,0.18)] shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)] mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-bold">
              FOOD B
            </span>
            {winner.id === foodB.id && (
              <span className="px-3 py-1 rounded-full bg-[#5B6E2C] text-white text-xs font-mono font-bold flex items-center gap-1 shadow-2xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>BETTER VALUE</span>
              </span>
            )}
          </div>

          <label className="text-xs font-mono text-[#737B70] block mb-2">
            Select Food:
          </label>
          <select
            value={foodBId}
            onChange={(e) => setFoodBId(e.target.value)}
            className="w-full p-3 rounded-xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.2)] text-sm font-semibold text-[#20271D] mb-6 focus:outline-none"
          >
            {FOOD_DATABASE.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.proteinPer100g}g protein &bull; ₹{((f.estimatedCostPer100g / f.proteinPer100g) * 10).toFixed(1)}/10g)
              </option>
            ))}
          </select>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F3F6F4] flex justify-between items-baseline">
              <span className="text-xs font-mono text-[#737B70]">Cost / 10g Protein:</span>
              <span className="font-display text-3xl font-bold text-[#FF5A22]">
                ₹{costB.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-[#F3F6F4]">
                <span className="text-[10px] font-mono text-[#737B70] block">Protein Density</span>
                <span className="font-mono font-bold text-base text-[#20271D]">
                  {foodB.proteinPer100g}g / 100g
                </span>
              </div>
              <div className="p-3 rounded-xl bg-[#F3F6F4]">
                <span className="text-[10px] font-mono text-[#737B70] block">Calories</span>
                <span className="font-mono font-bold text-base text-[#20271D]">
                  {foodB.caloriesPer100g} kcal
                </span>
              </div>
            </div>

            <p className="text-xs text-[#737B70] leading-relaxed pt-2">
              {foodB.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="p-6 rounded-3xl bg-[#5B6E2C] text-[#F3F6F4] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Trophy className="w-5 h-5 text-white" />
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#F3F6F4]/80 block">
              RECOMMENDED OPTION
            </span>
            <span className="font-display text-lg font-bold">
              {winner.name} delivers {costRatio}× more protein per rupee
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveDuel}
            className="px-5 py-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{savedDuel ? 'Saved' : 'Save Comparison'}</span>
          </button>

          <button
            type="button"
            onClick={handleAddWinner}
            className={`px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              addedWinner
                ? 'bg-white text-[#5B6E2C]'
                : 'bg-white text-[#5B6E2C] hover:bg-[#F3F6F4]'
            }`}
          >
            {addedWinner ? <Check className="w-4 h-4 text-[#5B6E2C]" /> : <ShoppingBag className="w-4 h-4 text-[#5B6E2C]" />}
            <span>{addedWinner ? 'Added to Basket' : `Add 100g ${winner.name}`}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
