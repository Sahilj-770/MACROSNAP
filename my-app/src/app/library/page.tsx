'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FOOD_DATABASE } from '@/data/foods'
import { RECIPE_DATABASE } from '@/data/recipes-and-lessons'
import { FoodCard } from '@/components/features/FoodCard'
import { useUserStore } from '@/store/useUserStore'
import {
  Bookmark,
  Scale,
  ArrowRight,
  Trash2,
  Utensils,
  Compass,
  Sparkles,
  Layers,
  Heart
} from 'lucide-react'

export default function LibraryPage() {
  const {
    favoriteFoodIds,
    favoriteRecipeIds,
    savedComparisons,
    toggleFavoriteFood,
    toggleFavoriteRecipe,
    removeComparison,
  } = useUserStore()

  const [activeTab, setActiveTab] = useState<'foods' | 'showdowns' | 'recipes'>('foods')

  const favoriteFoods = FOOD_DATABASE.filter((f) => favoriteFoodIds.includes(f.id))
  const favoriteRecipes = RECIPE_DATABASE.filter((r) => favoriteRecipeIds.includes(r.id))

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-forest pb-24">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-forest/15 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Bookmark className="w-3.5 h-3.5" />
              <span>THE PERSONAL TASTING ROOM // OFFLINE LOCAL ARCHIVE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-forest tracking-tight leading-[0.94]">
              Saved Food <br />
              <span className="text-tangerine italic font-normal">Intelligence.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-forest/75 max-w-2xl leading-relaxed">
              Your bookmarked biological staples, custom head-to-head showdowns, and tested kitchen recipes preserved locally on this device.
            </p>
          </div>

          {/* Quick Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('foods')}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'foods'
                  ? 'bg-forest text-chartreuse shadow-md scale-105'
                  : 'bg-white text-forest/80 border border-forest/20 hover:border-forest/50'
              }`}
            >
              <span>Bookmarked Foods ({favoriteFoods.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('showdowns')}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'showdowns'
                  ? 'bg-forest text-chartreuse shadow-md scale-105'
                  : 'bg-white text-forest/80 border border-forest/20 hover:border-forest/50'
              }`}
            >
              <span>Saved Duels ({savedComparisons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'recipes'
                  ? 'bg-forest text-chartreuse shadow-md scale-105'
                  : 'bg-white text-forest/80 border border-forest/20 hover:border-forest/50'
              }`}
            >
              <span>Favorite Recipes ({favoriteRecipes.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT ACCORDING TO ACTIVE TAB
      ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* TAB 01: FOODS */}
        {activeTab === 'foods' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-forest/60">
              <span>Personal Bookmarked Foods ({favoriteFoods.length})</span>
              <Link href="/explore" className="text-forest hover:text-tangerine underline flex items-center gap-1">
                <span>Browse Full 30+ Food Database</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {favoriteFoods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteFoods.map((food) => (
                  <FoodCard key={food.id} food={food} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white border-2 border-dashed border-forest/20 text-center space-y-4">
                <Compass className="w-12 h-12 text-forest/20 mx-auto" />
                <div className="space-y-1">
                  <p className="text-xl font-bold font-serif text-forest">No foods bookmarked yet</p>
                  <p className="text-xs font-mono text-forest/60 max-w-sm mx-auto">
                    Explore the Food Intelligence Index and tap the bookmark ribbon to save foods for quick access.
                  </p>
                </div>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep transition-all shadow-md"
                >
                  <span>Explore 30+ Foods</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 02: SAVED SHOWDOWNS */}
        {activeTab === 'showdowns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-forest/60">
              <span>Saved Head-to-Head Comparisons ({savedComparisons.length})</span>
              <Link href="/compare" className="text-forest hover:text-tangerine underline flex items-center gap-1">
                <span>Open Showdown Studio</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {savedComparisons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedComparisons.map(([idA, idB], idx) => {
                  const foodA = FOOD_DATABASE.find((f) => f.id === idA)
                  const foodB = FOOD_DATABASE.find((f) => f.id === idB)
                  if (!foodA || !foodB) return null

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-white rounded-3xl border-2 border-forest/15 hover:border-forest transition-all duration-300 shadow-md space-y-5"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-forest/50 border-b border-forest/10 pb-3">
                        <span className="font-bold uppercase tracking-wider">
                          SAVED DUEL // 0{idx + 1}
                        </span>
                        <button
                          onClick={() => removeComparison(idA, idB)}
                          className="text-forest/40 hover:text-destructive transition-colors flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      {/* Visual Dual Avatars */}
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-black/10">
                            <Image
                              src={foodA.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                              alt={foodA.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-forest/50 uppercase block">Contender 01</span>
                            <strong className="text-sm font-serif font-bold text-forest block truncate">{foodA.name}</strong>
                            <span className="text-xs font-mono font-bold text-chartreuse bg-forest px-1.5 py-0.2 rounded">
                              {foodA.proteinPer100g}g protein
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-forest/10 pl-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-black/10">
                            <Image
                              src={foodB.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                              alt={foodB.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-forest/50 uppercase block">Contender 02</span>
                            <strong className="text-sm font-serif font-bold text-forest block truncate">{foodB.name}</strong>
                            <span className="text-xs font-mono font-bold text-chartreuse bg-forest px-1.5 py-0.2 rounded">
                              {foodB.proteinPer100g}g protein
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-forest/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-forest/60">
                          Yield: {foodA.proteinPer100g}g vs {foodB.proteinPer100g}g protein
                        </span>
                        <Link
                          href={`/compare?foodA=${foodA.id}&foodB=${foodB.id}`}
                          className="px-5 py-2 rounded-xl bg-forest text-chartreuse text-xs font-mono font-bold hover:bg-forest-deep flex items-center gap-1.5 shadow-sm active:scale-95"
                        >
                          <span>Launch Showdown</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white border-2 border-dashed border-forest/20 text-center space-y-4">
                <Scale className="w-12 h-12 text-forest/20 mx-auto" />
                <div className="space-y-1">
                  <p className="text-xl font-bold font-serif text-forest">No matchups saved yet</p>
                  <p className="text-xs font-mono text-forest/60 max-w-sm mx-auto">
                    Visit the Compare Showdown Studio, pick any two foods, and tap &apos;Save This Showdown&apos;.
                  </p>
                </div>
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep transition-all shadow-md"
                >
                  <span>Open Showdown Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 03: SAVED RECIPES */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-forest/60">
              <span>Favorite Homemade Lab Formulas ({favoriteRecipes.length})</span>
              <Link href="/recipes" className="text-forest hover:text-tangerine underline flex items-center gap-1">
                <span>Explore All Recipes</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {favoriteRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoriteRecipes.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 sm:p-6 bg-white rounded-3xl border-2 border-forest/15 hover:border-forest transition-all duration-300 shadow-md flex items-center gap-5"
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-black/10">
                      <Image
                        src={r.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80'}
                        alt={r.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5 min-w-0">
                      <div className="flex items-center justify-between font-mono text-[11px]">
                        <span className="px-2 py-0.5 rounded-full bg-forest text-chartreuse font-bold">
                          +{r.totalProteinPerServingG}g Protein
                        </span>
                        <button
                          onClick={() => toggleFavoriteRecipe(r.id)}
                          className="text-forest/40 hover:text-destructive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-forest truncate">
                        {r.title}
                      </h3>

                      <p className="text-xs font-mono text-forest/70">
                        ~₹{r.estimatedCostPerServingInr} / serving · {r.prepTimeMinutes + r.cookTimeMinutes}m prep
                      </p>

                      <div className="pt-2">
                        <Link
                          href="/recipes"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-forest hover:text-tangerine"
                        >
                          <span>Open Recipe Walkthrough</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl bg-white border-2 border-dashed border-forest/20 text-center space-y-4">
                <Utensils className="w-12 h-12 text-forest/20 mx-auto" />
                <div className="space-y-1">
                  <p className="text-xl font-bold font-serif text-forest">No recipes bookmarked yet</p>
                  <p className="text-xs font-mono text-forest/60 max-w-sm mx-auto">
                    Explore the Homemade Lab to bookmark high-protein Indian recipes.
                  </p>
                </div>
                <Link
                  href="/recipes"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-forest text-chartreuse font-mono text-xs font-bold uppercase tracking-wider hover:bg-forest-deep transition-all shadow-md"
                >
                  <span>Explore Kitchen Recipes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
