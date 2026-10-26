'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { RECIPE_DATABASE } from '@/data/recipes-and-lessons'
import { Utensils, Check, Clock, ArrowRight, Sparkles, ChefHat, AlertCircle, CheckCircle2 } from 'lucide-react'

const PANTRY_CATEGORIES = [
  {
    category: 'High-Protein Staples',
    items: [
      { name: 'Chana Sattu', icon: '🌾' },
      { name: 'Soy Granules / Chunks', icon: '🌱' },
      { name: 'Fresh Paneer', icon: '🧀' },
      { name: 'Curd / Dahi', icon: '🥣' },
      { name: 'Roasted Chana', icon: '🌰' },
      { name: 'Roasted Peanuts', icon: '🥜' },
      { name: 'Whole Eggs', icon: '🥚' },
    ],
  },
  {
    category: 'Produce & Kitchen Fresh',
    items: [
      { name: 'Lemon', icon: '🍋' },
      { name: 'Onion & Tomato', icon: '🧅' },
      { name: 'Banana', icon: '🍌' },
      { name: 'Cucumber', icon: '🥒' },
    ],
  },
  {
    category: 'Grains & Pantry Bases',
    items: [
      { name: 'Rolled Oats', icon: '🥣' },
      { name: 'Honey', icon: '🍯' },
      { name: 'Roasted Cumin & Spices', icon: '🧂' },
      { name: 'Chilled Water / Matka Water', icon: '💧' },
    ],
  },
]

export default function KitchenPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Chana Sattu',
    'Lemon',
    'Chilled Water / Matka Water',
    'Roasted Cumin & Spices',
  ])

  const toggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== name))
    } else {
      setSelectedIngredients([...selectedIngredients, name])
    }
  }

  const applyPreset = (items: string[]) => {
    setSelectedIngredients(items)
  }

  // Filter recipes where at least one ingredient matches
  const matchedRecipes = RECIPE_DATABASE.map((recipe) => {
    const matchedItems = recipe.ingredients.filter((ing) =>
      selectedIngredients.some((sel) =>
        ing.name.toLowerCase().includes(sel.toLowerCase()) ||
        sel.toLowerCase().includes(ing.name.toLowerCase())
      )
    )
    const matchCount = matchedItems.length
    const totalCount = recipe.ingredients.length
    const matchPercent = Math.round((matchCount / totalCount) * 100)

    return {
      recipe,
      matchCount,
      totalCount,
      matchPercent,
      matchedItems,
    }
  }).sort((a, b) => b.matchPercent - a.matchPercent)

  const readyToCook = matchedRecipes.filter((r) => r.matchPercent === 100)
  const partialMatches = matchedRecipes.filter((r) => r.matchPercent < 100 && r.matchCount > 0)

  return (
    <div className="min-h-screen bg-[#050B07] text-cream pb-24 selection:bg-chartreuse selection:text-forest">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <ChefHat className="w-3.5 h-3.5" />
              <span>THE PANTRY RECOGNIZER // ZERO FOOD WASTE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[0.94]">
              What&apos;s On <br />
              <span className="text-chartreuse italic font-normal">Your Counter?</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-cream/70 max-w-2xl leading-relaxed">
              Select the staples sitting in your hostel room or kitchen. Instant ICMR-aligned recipes appear automatically without requiring an internet search or API trip.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset(['Chana Sattu', 'Lemon', 'Chilled Water / Matka Water', 'Roasted Cumin & Spices'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 hover:border-chartreuse/40 text-cream transition-all cursor-pointer"
            >
              🥤 Instant Sattu Shaker
            </button>
            <button
              onClick={() => applyPreset(['Soy Granules / Chunks', 'Onion & Tomato', 'Roasted Cumin & Spices'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 hover:border-chartreuse/40 text-cream transition-all cursor-pointer"
            >
              🔌 Hostel Kettle Setup
            </button>
            <button
              onClick={() => applyPreset(['Roasted Chana', 'Fresh Paneer', 'Lemon', 'Onion & Tomato'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white/5 border border-white/10 hover:border-chartreuse/40 text-cream transition-all cursor-pointer"
            >
              🥗 High-Fiber Chaat
            </button>
            <button
              onClick={() => setSelectedIngredients([])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE INGREDIENT SELECTOR BOARD
      ───────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <section className="p-6 sm:p-8 bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl space-y-6 text-cream">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-chartreuse animate-pulse" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Interactive Pantry Inventory ({selectedIngredients.length} Selected)
              </h2>
            </div>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              Tap items to toggle on/off
            </span>
          </div>

          <div className="space-y-6">
            {PANTRY_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase text-chartreuse tracking-wider block">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => {
                    const isSelected = selectedIngredients.includes(item.name)
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleIngredient(item.name)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#0E2518] text-chartreuse border-2 border-chartreuse shadow-[0_0_15px_rgba(216,243,67,0.2)] scale-105'
                            : 'bg-white/5 text-cream/80 border border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-base">{item.icon}</span>
                        <span>{item.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 ml-1 text-chartreuse" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            RECIPE MATCHES RESULTS (READY TO COOK & PARTIAL)
        ───────────────────────────────────────────────────────────── */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white flex items-center gap-3">
              <span>Recipes You Can Cook Right Now</span>
              <span className="text-xs font-mono font-black px-3 py-1 rounded-full bg-chartreuse text-forest shadow-sm">
                {readyToCook.length} Fully Ready
              </span>
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRecipes.map(({ recipe, matchCount, totalCount, matchPercent }) => {
              const is100 = matchPercent === 100
              const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes

              return (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-3xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group bg-[#0B1710]/95 backdrop-blur-md text-cream shadow-xl ${
                    is100
                      ? 'border-2 border-chartreuse shadow-[0_0_25px_rgba(216,243,67,0.15)]'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  {/* Photo & Badge */}
                  <div className="relative w-full h-48 overflow-hidden bg-black/40 border-b border-white/10">
                    <Image
                      src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Match Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        is100
                          ? 'bg-chartreuse text-forest shadow-md font-black'
                          : 'bg-black/60 backdrop-blur-md text-cream border border-white/20'
                      }`}>
                        {is100 ? '✓ 100% Ready To Cook' : `${matchCount}/${totalCount} Ingredients`}
                      </span>
                    </div>

                    {/* Time Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-cream text-[11px] font-mono flex items-center gap-1 border border-white/10">
                        <Clock className="w-3 h-3" /> {totalTime}m
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4 text-cream">
                      <span className="text-[10px] font-mono text-chartreuse font-bold block uppercase">
                        {recipe.hindiTitle || 'HOMEMADE FORMULA'}
                      </span>
                      <h3 className="text-xl font-bold font-serif leading-tight truncate text-white">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed">
                      {recipe.tagline}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-2xl bg-[#050B07]/80 border border-white/10">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase block">Protein</span>
                        <strong className="text-base font-bold text-chartreuse">{recipe.totalProteinPerServingG}g</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase block">Cost</span>
                        <strong className="text-base font-bold text-tangerine">~₹{recipe.estimatedCostPerServingInr}</strong>
                      </div>
                    </div>

                    {/* Ingredients Mini Checklist */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold block">
                        Ingredients In Formula:
                      </span>
                      <div className="space-y-1">
                        {recipe.ingredients.map((ing, idx) => {
                          const hasIt = selectedIngredients.some((sel) =>
                            ing.name.toLowerCase().includes(sel.toLowerCase()) ||
                            sel.toLowerCase().includes(ing.name.toLowerCase())
                          )
                          return (
                            <div key={idx} className="flex items-center gap-2 text-[11px] font-mono">
                              {hasIt ? (
                                <CheckCircle2 className="w-3 h-3 text-chartreuse shrink-0" />
                              ) : (
                                <span className="w-3 h-3 rounded-full border border-white/20 shrink-0" />
                              )}
                              <span className={hasIt ? 'text-white font-bold' : 'text-white/40'}>
                                {ing.name}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href="/recipes"
                      className="mt-4 w-full py-3 rounded-2xl bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_15px_rgba(216,243,67,0.3)] group-hover:bg-white"
                    >
                      <span>Open in Recipe Lab</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
