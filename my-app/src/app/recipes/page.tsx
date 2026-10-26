'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { RECIPE_DATABASE } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import {
  Utensils,
  Clock,
  Flame,
  Bookmark,
  ArrowRight,
  Zap,
  CheckCircle2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Check,
  TrendingDown,
  Layers
} from 'lucide-react'

export default function RecipesPage() {
  const [activeRecipeId, setActiveRecipeId] = useState<string>(RECIPE_DATABASE[0]!.id)
  const [servingsMultiplier, setServingsMultiplier] = useState<number>(1)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all')
  const [addedToast, setAddedToast] = useState<boolean>(false)

  const { favoriteRecipeIds, toggleFavoriteRecipe, addToBasket } = useUserStore()

  const activeRecipe = RECIPE_DATABASE.find((r) => r.id === activeRecipeId) || RECIPE_DATABASE[0]!
  const isFavorite = favoriteRecipeIds.includes(activeRecipe.id)

  // Filter recipes based on categories
  const filteredRecipes = RECIPE_DATABASE.filter((r) => {
    if (activeCategoryFilter === 'quick') return r.prepTimeMinutes + r.cookTimeMinutes <= 5
    if (activeCategoryFilter === 'budget') return r.estimatedCostPerServingInr <= 25
    if (activeCategoryFilter === 'high-protein') return r.totalProteinPerServingG >= 20
    if (activeCategoryFilter === 'hostel') return r.equipment.includes('kettle') || r.equipment.includes('none')
    return true
  })

  // Add all recipe ingredients that have a foodId to the basket
  const handleAddAllToBasket = () => {
    let count = 0
    activeRecipe.ingredients.forEach((ing) => {
      if (ing.foodId) {
        addToBasket(ing.foodId, ing.quantityAmount * servingsMultiplier)
        count++
      }
    })
    setAddedToast(true)
    setTimeout(() => setAddedToast(false), 2400)
  }

  // Calculate scaled values
  const scaledProtein = (activeRecipe.totalProteinPerServingG * servingsMultiplier).toFixed(1)
  const scaledCalories = activeRecipe.caloriesPerServing * servingsMultiplier
  const scaledCost = activeRecipe.estimatedCostPerServingInr * servingsMultiplier

  // Packaged alternative comparison
  const packagedDiffCost = activeRecipe.comparisonPackagedAlternative
    ? (activeRecipe.comparisonPackagedAlternative.costInr * servingsMultiplier) - scaledCost
    : 0

  return (
    <div className="min-h-screen bg-[#050B07] text-cream pb-24 selection:bg-chartreuse selection:text-forest">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER (DARK LUXURY CULINARY ATELIER)
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Utensils className="w-3.5 h-3.5" />
              <span>THE HOMEMADE LAB // 15-MINUTE WHOLE FOOD RECIPES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[0.94]">
              Cook Real Food. <br />
              <span className="text-chartreuse italic font-normal">Beat The Factory.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-cream/70 max-w-2xl leading-relaxed">
              Chef-tested, student-friendly Indian recipes engineered for maximum bioavailability, zero artificial humectants, and pennies per gram.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Recipes' },
              { id: 'quick', label: '⚡ Sub-5 Min' },
              { id: 'high-protein', label: '💪 20g+ Protein' },
              { id: 'budget', label: '🏷️ Under ₹25' },
              { id: 'hostel', label: '🔌 Hostel Friendly' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveCategoryFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeCategoryFilter === f.id
                    ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black'
                    : 'bg-white/5 text-cream/70 border border-white/10 hover:border-chartreuse/40 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN DUAL STAGE: RECIPE SELECTOR & EXPANDED STAGE
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: VISUAL RECIPE SELECTOR */}
        <aside className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground font-bold uppercase tracking-wider px-1">
            <span>Select Formula ({filteredRecipes.length})</span>
            <span>Tap To Inspect</span>
          </div>

          <div className="space-y-3">
            {filteredRecipes.map((recipe) => {
              const isSelected = recipe.id === activeRecipeId
              const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes
              return (
                <button
                  key={recipe.id}
                  onClick={() => {
                    setActiveRecipeId(recipe.id)
                    setServingsMultiplier(1)
                  }}
                  className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'border-2 border-chartreuse bg-[#0E2518] text-cream shadow-[0_0_25px_rgba(216,243,67,0.15)]'
                      : 'border-white/10 bg-[#0B1710]/90 text-cream hover:border-chartreuse/40 hover:shadow-lg'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
                    <Image
                      src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'}
                      alt={recipe.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Text Meta */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className={`font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-chartreuse text-forest' : 'bg-white/10 text-chartreuse border border-chartreuse/30'
                      }`}>
                        {recipe.totalProteinPerServingG}g Protein
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" /> {totalTime}m
                      </span>
                    </div>

                    <h3 className="font-bold font-serif text-base truncate leading-snug text-white">
                      {recipe.title}
                    </h3>

                    {recipe.hindiTitle && (
                      <p className={`text-xs italic truncate ${isSelected ? 'text-chartreuse/80' : 'text-muted-foreground'}`}>
                        {recipe.hindiTitle}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-cream/70 border-t border-white/10">
                      <span>₹{recipe.estimatedCostPerServingInr} / serving</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                        {recipe.equipment[0] === 'none' ? 'No Stove' : recipe.equipment[0]}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: EXPANDED RECIPE MASTER SHOWCASE */}
        <section className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecipe.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl space-y-8 overflow-hidden text-cream"
            >
              {/* TOP HERO PHOTO & BANNER */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <Image
                  src={activeRecipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80'}
                  alt={activeRecipe.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-chartreuse font-mono text-xs font-bold uppercase border border-white/10">
                    Equipment: {activeRecipe.equipment.join(' / ')}
                  </span>

                  <button
                    onClick={() => toggleFavoriteRecipe(activeRecipe.id)}
                    className={`p-2.5 rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer ${
                      isFavorite
                        ? 'bg-tangerine text-white'
                        : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
                    }`}
                    title="Bookmark recipe"
                  >
                    <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Overlay Title & Tagline */}
                <div className="absolute bottom-4 left-4 right-4 text-cream space-y-1">
                  <span className="text-xs font-mono text-chartreuse uppercase font-bold tracking-wider">
                    {activeRecipe.hindiTitle || 'INDIAN BIOAVAILABLE STAPLE'}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight leading-tight text-white">
                    {activeRecipe.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-cream/80 line-clamp-2">
                    {activeRecipe.tagline}
                  </p>
                </div>
              </div>

              {/* SERVING ADJUSTER & ACTION BAR */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#050B07]/80 border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold uppercase text-muted-foreground">
                    Servings Scale:
                  </span>
                  <div className="flex items-center gap-2 bg-white/5 px-2 py-1 rounded-xl border border-white/15 font-mono">
                    <button
                      onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-black text-chartreuse text-base">
                      {servingsMultiplier}
                    </span>
                    <button
                      onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add All to Basket Button */}
                <button
                  onClick={handleAddAllToBasket}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(216,243,67,0.3)] active:scale-95 cursor-pointer"
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4 text-forest" />
                      <span>Added to Basket!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-forest" />
                      <span>Add Recipe Items to Basket</span>
                    </>
                  )}
                </button>
              </div>

              {/* DYNAMIC SCALED NUTRITION METRICS */}
              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-4 rounded-2xl bg-[#050B07] text-cream border border-chartreuse/40 shadow-inner">
                  <span className="text-[10px] text-cream/60 uppercase block">Yield Protein</span>
                  <span className="text-2xl sm:text-3xl font-black text-chartreuse">{scaledProtein}g</span>
                  <span className="text-[10px] text-cream/50 block mt-0.5">High Bioavailability</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#050B07] text-cream border border-white/10">
                  <span className="text-[10px] text-muted-foreground uppercase block">Total Energy</span>
                  <span className="text-2xl sm:text-3xl font-black text-white">{scaledCalories}</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Kilocalories</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#050B07] text-cream border border-white/10">
                  <span className="text-[10px] text-muted-foreground uppercase block">Estimated Cost</span>
                  <span className="text-2xl sm:text-3xl font-black text-tangerine">₹{scaledCost}</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">₹{(scaledCost / Number(scaledProtein)).toFixed(1)} / 1g protein</span>
                </div>
              </div>

              {/* INGREDIENTS BREAKDOWN WITH 1-CLICK ADD */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-cream uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-tangerine" />
                    <span>Required Pantry Ingredients ({activeRecipe.ingredients.length})</span>
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Scaled for {servingsMultiplier} portion{servingsMultiplier > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeRecipe.ingredients.map((ing, idx) => {
                    const scaledQty = ing.quantityAmount * servingsMultiplier
                    const scaledProt = (ing.proteinContributionG * servingsMultiplier).toFixed(1)
                    const scaledPrice = ing.estimatedCostInr * servingsMultiplier

                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#050B07]/80 border border-white/10 text-xs font-mono group hover:border-chartreuse/30 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-white block">
                            {ing.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            {scaledQty} {ing.quantityUnit} · +{scaledProt}g protein
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-bold text-cream/90">
                            ~₹{scaledPrice}
                          </span>
                          {ing.foodId && (
                            <button
                              onClick={() => addToBasket(ing.foodId!, scaledQty)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-chartreuse hover:bg-chartreuse hover:text-forest transition-colors text-[10px] uppercase font-bold cursor-pointer"
                              title="Add item to basket"
                            >
                              + Basket
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* COOKING PREPARATION STEPS */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold text-cream uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-chartreuse" />
                  <span>Preparation Walkthrough</span>
                </h3>

                <div className="space-y-3">
                  {activeRecipe.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-[#050B07]/80 border border-white/10 hover:border-white/25 transition-all text-xs sm:text-sm text-cream leading-relaxed shadow-sm"
                    >
                      <span className="w-7 h-7 rounded-xl bg-chartreuse text-forest font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        0{idx + 1}
                      </span>
                      <p className="pt-0.5 text-cream/90">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* BRUTAL REALITY COMPARISON: HOMEMADE VS PACKAGED */}
              {activeRecipe.comparisonPackagedAlternative && (
                <div className="p-6 rounded-3xl bg-black/60 text-cream border border-chartreuse/30 space-y-4">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="px-2.5 py-0.5 rounded bg-chartreuse text-forest font-black uppercase">
                      The Economic & Biological Verdict
                    </span>
                    <span className="text-chartreuse font-bold">
                      Saves ~₹{packagedDiffCost > 0 ? packagedDiffCost : 0} Per Batch
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <span className="text-[10px] text-cream/50 uppercase block">Factory Snack Equivalent</span>
                      <strong className="text-cream block font-sans text-sm">
                        {activeRecipe.comparisonPackagedAlternative.name}
                      </strong>
                      <span className="text-tangerine block font-bold">
                        ₹{activeRecipe.comparisonPackagedAlternative.costInr * servingsMultiplier} · {activeRecipe.comparisonPackagedAlternative.proteinG * servingsMultiplier}g protein
                      </span>
                      <p className="text-[10px] text-cream/60 pt-1 leading-snug">
                        ⚠️ {activeRecipe.comparisonPackagedAlternative.downside}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-chartreuse/10 border border-chartreuse/30 space-y-1">
                      <span className="text-[10px] text-chartreuse uppercase block">This Homemade Formula</span>
                      <strong className="text-cream block font-sans text-sm">
                        {activeRecipe.title}
                      </strong>
                      <span className="text-chartreuse block font-bold">
                        ₹{scaledCost} · {scaledProtein}g protein
                      </span>
                      <p className="text-[10px] text-cream/80 pt-1 leading-snug">
                        ✓ 100% whole bioavailable nutrients, zero fillers or maltitol laxatives.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </main>
    </div>
  )
}
