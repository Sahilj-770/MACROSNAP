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
  Bookmark,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBag,
  Check,
  CheckCircle2,
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
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Utensils className="w-3.5 h-3.5" />
              <span>Whole Food Kitchen Lab · High-Yield Recipes</span>
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
                className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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
                  className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-center gap-4 group relative overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-chartreuse font-bold">
                        +{recipe.totalProteinPerServingG}g Protein
                      </span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {totalTime}m
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-white truncate">
                      {recipe.title}
                    </h3>

                    <p className="text-xs font-mono text-cream/60">
                      ₹{recipe.estimatedCostPerServingInr} est. cost · {recipe.equipment.join(', ')}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        {/* RIGHT COLUMN: EXPANDED RECIPE LABORATORY */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecipe.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
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
                    className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full backdrop-blur-md transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                      isFavorite
                        ? 'bg-tangerine text-white'
                        : 'bg-black/50 text-white/80 hover:text-white border border-white/20'
                    }`}
                    title="Bookmark recipe"
                    aria-label={isFavorite ? `Remove ${activeRecipe.title} from favorites` : `Bookmark ${activeRecipe.title}`}
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
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-xl border border-white/15 font-mono">
                    <button
                      onClick={() => setServingsMultiplier(Math.max(1, servingsMultiplier - 1))}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                      aria-label="Decrease servings"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-black text-chartreuse text-base">
                      {servingsMultiplier}
                    </span>
                    <button
                      onClick={() => setServingsMultiplier(servingsMultiplier + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center font-bold text-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                      aria-label="Increase servings"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Add All to Basket Button */}
                <button
                  onClick={handleAddAllToBasket}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_20px_rgba(216,243,67,0.3)] active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
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
                  <span className="text-[10px] text-muted-foreground block mt-0.5">kcal energy</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#050B07] text-cream border border-white/10">
                  <span className="text-[10px] text-muted-foreground uppercase block">Estimated Cost</span>
                  <span className="text-2xl sm:text-3xl font-black text-tangerine">₹{scaledCost}</span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Kitchen spend</span>
                </div>
              </div>

              {/* INGREDIENTS LIST */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider block">
                  Ingredients ({servingsMultiplier} Serving{servingsMultiplier > 1 ? 's' : ''})
                </span>
                <div className="space-y-2">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-chartreuse" />
                        <span className="text-white font-bold">{ing.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-cream/70">
                        <span>
                          {ing.quantityAmount * servingsMultiplier} {ing.quantityUnit}
                        </span>
                        {ing.proteinContributionG > 0 && (
                          <span className="text-chartreuse font-bold">
                            +{((ing.proteinContributionG * servingsMultiplier)).toFixed(1)}g Pro
                          </span>
                        )}
                        <span className="text-muted-foreground">
                          ₹{Math.round(ing.estimatedCostInr * servingsMultiplier)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP-BY-STEP PREPARATION METHOD */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-muted-foreground tracking-wider block">
                  Preparation Steps ({activeRecipe.steps.length} Steps)
                </span>
                <div className="space-y-2.5">
                  {activeRecipe.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3.5 text-xs font-sans leading-relaxed text-cream/80"
                    >
                      <span className="w-6 h-6 rounded-full bg-chartreuse text-forest font-mono font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* PACKAGED ALTERNATIVE COMPARISON BANNER */}
              {activeRecipe.comparisonPackagedAlternative && (
                <div className="p-5 rounded-2xl bg-black/60 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-red-400 uppercase font-bold tracking-widest block">
                      VS PACKAGED ALTERNATIVE
                    </span>
                    <strong className="text-sm font-serif text-white block">
                      {activeRecipe.comparisonPackagedAlternative.name}
                    </strong>
                    <p className="text-xs font-mono text-cream/60">
                      {activeRecipe.comparisonPackagedAlternative.downside}
                    </p>
                  </div>
                  <div className="text-right font-mono flex-shrink-0">
                    <span className="text-xs text-muted-foreground block">Cost Difference:</span>
                    <span className="text-lg font-black text-chartreuse">
                      Saves ₹{packagedDiffCost}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Complete Lower-Page Experience: Tested Whole Food Staples */}
        <section className="pt-10 border-t border-white/10 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
              Pantry Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
              Staples Powering These Recipes
            </h2>
            <p className="text-sm font-mono text-cream/70 max-w-2xl">
              Each recipe relies on unbranded, nutrient-dense Indian staples. Inspect their laboratory nutritional analysis or calculate your daily requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/explore"
              className="group p-6 rounded-3xl bg-[#0B1710]/90 border border-white/10 hover:border-chartreuse/50 transition-all space-y-3 shadow-xl"
            >
              <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Explore Pantry</span>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-chartreuse transition-colors">
                Food Intelligence Index
              </h3>
              <p className="text-xs text-cream/70 font-sans leading-relaxed">
                Check DIAAS scores, amino acid profiles, and exact protein density per 100 grams for all 12 staples.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse pt-2 group-hover:underline">
                <span>View All Foods →</span>
              </div>
            </Link>

            <Link
              href="/calculator"
              className="group p-6 rounded-3xl bg-[#0B1710]/90 border border-white/10 hover:border-chartreuse/50 transition-all space-y-3 shadow-xl"
            >
              <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Personal Target</span>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-chartreuse transition-colors">
                Plate Protein Simulator
              </h3>
              <p className="text-xs text-cream/70 font-sans leading-relaxed">
                Calculate your body weight targets and simulate a day&apos;s eating using these 15-minute recipes.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse pt-2 group-hover:underline">
                <span>Calculate Target →</span>
              </div>
            </Link>

            <Link
              href="/basket"
              className="group p-6 rounded-3xl bg-[#0B1710]/90 border border-white/10 hover:border-chartreuse/50 transition-all space-y-3 shadow-xl"
            >
              <span className="text-xs font-mono font-bold text-chartreuse uppercase block">Weekly Planning</span>
              <h3 className="text-xl font-bold font-serif text-white group-hover:text-chartreuse transition-colors">
                Virtual Kitchen Basket
              </h3>
              <p className="text-xs text-cream/70 font-sans leading-relaxed">
                Add recipe ingredients directly to your basket to tally weekly grocery costs and protein totals.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse pt-2 group-hover:underline">
                <span>Open Basket →</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
