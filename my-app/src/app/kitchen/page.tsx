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
    <div className="min-h-screen bg-[#FAF7F0] text-forest pb-24">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-forest/15 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <ChefHat className="w-3.5 h-3.5" />
              <span>THE PANTRY RECOGNIZER // ZERO FOOD WASTE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-forest tracking-tight leading-[0.94]">
              What&apos;s On <br />
              <span className="text-tangerine italic font-normal">Your Counter?</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-forest/75 max-w-2xl leading-relaxed">
              Select the staples sitting in your hostel room or kitchen. Instant ICMR-aligned recipes appear automatically without requiring an internet search or API trip.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => applyPreset(['Chana Sattu', 'Lemon', 'Chilled Water / Matka Water', 'Roasted Cumin & Spices'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white border border-forest/20 hover:border-forest text-forest transition-all"
            >
              🥤 Instant Sattu Shaker
            </button>
            <button
              onClick={() => applyPreset(['Soy Granules / Chunks', 'Onion & Tomato', 'Roasted Cumin & Spices'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white border border-forest/20 hover:border-forest text-forest transition-all"
            >
              🔌 Hostel Kettle Setup
            </button>
            <button
              onClick={() => applyPreset(['Roasted Chana', 'Fresh Paneer', 'Lemon', 'Onion & Tomato'])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white border border-forest/20 hover:border-forest text-forest transition-all"
            >
              🥗 High-Fiber Chaat
            </button>
            <button
              onClick={() => setSelectedIngredients([])}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-forest/5 text-forest/60 hover:text-destructive transition-all"
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
        <section className="p-6 sm:p-8 bg-white rounded-3xl border-2 border-forest/15 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-forest/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-chartreuse animate-pulse" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-forest">
                Interactive Pantry Inventory ({selectedIngredients.length} Selected)
              </h2>
            </div>
            <span className="text-xs font-mono text-forest/60 hidden sm:inline">
              Tap items to toggle on/off
            </span>
          </div>

          <div className="space-y-6">
            {PANTRY_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-2.5">
                <span className="text-[11px] font-mono font-bold uppercase text-forest/50 tracking-wider block">
                  {cat.category}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map((item) => {
                    const isSelected = selectedIngredients.includes(item.name)
                    return (
                      <button
                        key={item.name}
                        onClick={() => toggleIngredient(item.name)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all duration-200 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-[#0E2518] text-chartreuse border-2 border-forest shadow-md scale-105'
                            : 'bg-[#FAF7F0] text-forest/80 border-2 border-forest/10 hover:border-forest/40 hover:bg-white'
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
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-forest flex items-center gap-3">
              <span>Recipes You Can Cook Right Now</span>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-forest text-chartreuse">
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
                  className={`rounded-3xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                    is100
                      ? 'bg-white border-chartreuse shadow-lg hover:shadow-2xl'
                      : 'bg-white/70 border-forest/15 hover:border-forest/40'
                  }`}
                >
                  {/* Photo & Badge */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                      alt={recipe.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Match Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                        is100
                          ? 'bg-chartreuse text-forest shadow-md'
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
                      <h3 className="text-xl font-bold font-serif leading-tight truncate">
                        {recipe.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-forest/70 line-clamp-2 leading-relaxed">
                      {recipe.tagline}
                    </p>

                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-2xl bg-[#FAF7F0] border border-forest/10">
                      <div>
                        <span className="text-[10px] text-forest/50 uppercase block">Protein</span>
                        <strong className="text-base font-bold text-forest">{recipe.totalProteinPerServingG}g</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-forest/50 uppercase block">Cost</span>
                        <strong className="text-base font-bold text-tangerine">~₹{recipe.estimatedCostPerServingInr}</strong>
                      </div>
                    </div>

                    {/* Ingredients Mini Checklist */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-mono uppercase text-forest/50 font-bold block">
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
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                              ) : (
                                <span className="w-3 h-3 rounded-full border border-forest/30 shrink-0" />
                              )}
                              <span className={hasIt ? 'text-forest font-bold' : 'text-forest/50'}>
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
                      className="mt-4 w-full py-3 rounded-2xl bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-md group-hover:bg-forest-deep"
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
