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
} from 'lucide-react'

export default function LibraryPage() {
  const {
    favoriteFoodIds,
    favoriteRecipeIds,
    savedComparisons,
    toggleFavoriteRecipe,
    removeComparison,
    loadSampleFavorites,
    loadSampleComparisons,
    resetAllToCleanState,
  } = useUserStore()

  const [activeTab, setActiveTab] = useState<'foods' | 'showdowns' | 'recipes'>('foods')

  const favoriteFoods = FOOD_DATABASE.filter((f) => favoriteFoodIds.includes(f.id))
  const favoriteRecipes = RECIPE_DATABASE.filter((r) => favoriteRecipeIds.includes(r.id))

  const totalSavedCount = favoriteFoods.length + savedComparisons.length + favoriteRecipes.length

  return (
    <div className="min-h-screen bg-[#050B07] text-cream pb-24 selection:bg-chartreuse selection:text-forest">
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-12 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-wider uppercase shadow-sm">
              <Bookmark className="w-3.5 h-3.5" />
              <span>THE PERSONAL TASTING ROOM // OFFLINE LOCAL ARCHIVE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-white tracking-tight leading-[0.94]">
              Saved Food <br />
              <span className="text-chartreuse italic font-normal">Intelligence.</span>
            </h1>
            <p className="text-sm sm:text-base font-mono text-cream/70 max-w-2xl leading-relaxed">
              Your bookmarked biological staples, custom head-to-head showdowns, and tested kitchen recipes preserved locally on this device.
            </p>
          </div>

          {/* Quick Category Tabs & Clean Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('foods')}
              className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                activeTab === 'foods'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black scale-105'
                  : 'bg-white/5 text-cream/70 border border-white/10 hover:border-chartreuse/30 hover:text-white'
              }`}
            >
              <span>Bookmarked Foods ({favoriteFoods.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('showdowns')}
              className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                activeTab === 'showdowns'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black scale-105'
                  : 'bg-white/5 text-cream/70 border border-white/10 hover:border-chartreuse/30 hover:text-white'
              }`}
            >
              <span>Saved Duels ({savedComparisons.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`min-h-[44px] px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                activeTab === 'recipes'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black scale-105'
                  : 'bg-white/5 text-cream/70 border border-white/10 hover:border-chartreuse/30 hover:text-white'
              }`}
            >
              <span>Favorite Recipes ({favoriteRecipes.length})</span>
            </button>

            {totalSavedCount > 0 && (
              <button
                onClick={resetAllToCleanState}
                className="min-h-[44px] px-3 py-2 rounded-2xl text-xs font-mono text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer"
                title="Clear all saved bookmarks"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
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
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              <span>Personal Bookmarked Foods ({favoriteFoods.length})</span>
              <Link href="/explore" className="text-chartreuse hover:underline flex items-center gap-1 min-h-[36px] py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none">
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
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1710]/50 border-2 border-dashed border-white/15 text-center space-y-4">
                <Compass className="w-12 h-12 text-white/20 mx-auto" />
                <div className="space-y-1.5">
                  <p className="text-xl font-bold font-serif text-white">No foods bookmarked yet</p>
                  <p className="text-xs font-mono text-cream/60 max-w-sm mx-auto">
                    Explore the Food Intelligence Index to bookmark foods, or load our starter pack to test how the library functions.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={loadSampleFavorites}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(216,243,67,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Starter Favorites</span>
                  </button>
                  <Link
                    href="/explore"
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <span>Explore 30+ Foods</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 02: SAVED SHOWDOWNS */}
        {activeTab === 'showdowns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              <span>Saved Head-to-Head Comparisons ({savedComparisons.length})</span>
              <Link href="/compare" className="text-chartreuse hover:underline flex items-center gap-1 min-h-[36px] py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none">
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
                      className="p-6 bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 hover:border-chartreuse/40 transition-all duration-300 shadow-xl space-y-5 text-cream"
                    >
                      <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground border-b border-white/10 pb-3">
                        <span className="font-bold uppercase tracking-wider text-chartreuse">
                          SAVED DUEL // 0{idx + 1}
                        </span>
                        <button
                          onClick={() => removeComparison(idA, idB)}
                          className="min-h-[36px] px-2 py-1 text-white/40 hover:text-red-400 transition-colors flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                      {/* Visual Dual Avatars */}
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="flex items-center gap-3">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
                            <Image
                              src={foodA.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                              alt={foodA.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase block">Contender 01</span>
                            <strong className="text-sm font-serif font-bold text-white block truncate">{foodA.name}</strong>
                            <span className="text-xs font-mono font-bold text-forest bg-chartreuse px-1.5 py-0.2 rounded">
                              {foodA.proteinPer100g}g protein
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
                            <Image
                              src={foodB.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                              alt={foodB.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground uppercase block">Contender 02</span>
                            <strong className="text-sm font-serif font-bold text-white block truncate">{foodB.name}</strong>
                            <span className="text-xs font-mono font-bold text-forest bg-chartreuse px-1.5 py-0.2 rounded">
                              {foodB.proteinPer100g}g protein
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs font-mono text-cream/70">
                          Yield: {foodA.proteinPer100g}g vs {foodB.proteinPer100g}g protein
                        </span>
                        <Link
                          href={`/compare?foodA=${foodA.id}&foodB=${foodB.id}`}
                          className="min-h-[44px] px-5 py-2 rounded-xl bg-chartreuse text-forest text-xs font-mono font-black uppercase hover:bg-white flex items-center gap-1.5 shadow-[0_0_12px_rgba(216,243,67,0.3)] active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
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
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1710]/50 border-2 border-dashed border-white/15 text-center space-y-4">
                <Scale className="w-12 h-12 text-white/20 mx-auto" />
                <div className="space-y-1.5">
                  <p className="text-xl font-bold font-serif text-white">No matchups saved yet</p>
                  <p className="text-xs font-mono text-cream/60 max-w-sm mx-auto">
                    Visit the Compare Showdown Studio, pick any two foods, and tap &apos;Save Matchup&apos;.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={loadSampleComparisons}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(216,243,67,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Sample Matchups</span>
                  </button>
                  <Link
                    href="/compare"
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <span>Open Showdown Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 03: SAVED RECIPES */}
        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              <span>Favorite Homemade Lab Formulas ({favoriteRecipes.length})</span>
              <Link href="/recipes" className="text-chartreuse hover:underline flex items-center gap-1 min-h-[36px] py-1 px-2 rounded focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none">
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
                    className="p-5 sm:p-6 bg-[#0B1710]/95 backdrop-blur-md rounded-3xl border border-white/10 hover:border-chartreuse/40 transition-all duration-300 shadow-xl flex items-center gap-5 text-cream"
                  >
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 bg-black/40">
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
                        <span className="px-2 py-0.5 rounded-full bg-chartreuse text-forest font-black">
                          +{r.totalProteinPerServingG}g Protein
                        </span>
                        <button
                          onClick={() => toggleFavoriteRecipe(r.id)}
                          className="min-h-[36px] px-2 py-1 text-white/40 hover:text-red-400 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                          aria-label={`Remove ${r.title} from favorites`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-white truncate">
                        {r.title}
                      </h3>

                      <p className="text-xs font-mono text-cream/70">
                        ~₹{r.estimatedCostPerServingInr} / serving · {r.prepTimeMinutes + r.cookTimeMinutes}m prep
                      </p>

                      <div className="pt-2">
                        <Link
                          href="/recipes"
                          className="min-h-[36px] inline-flex items-center gap-1.5 text-xs font-mono font-bold text-chartreuse hover:underline focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
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
              <div className="p-8 sm:p-12 rounded-3xl bg-[#0B1710]/50 border-2 border-dashed border-white/15 text-center space-y-4">
                <Utensils className="w-12 h-12 text-white/20 mx-auto" />
                <div className="space-y-1.5">
                  <p className="text-xl font-bold font-serif text-white">No recipes bookmarked yet</p>
                  <p className="text-xs font-mono text-cream/60 max-w-sm mx-auto">
                    Explore the Homemade Lab to bookmark high-protein Indian recipes, or load our starter favorites.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={loadSampleFavorites}
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_0_15px_rgba(216,243,67,0.3)] cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Load Starter Recipes</span>
                  </button>
                  <Link
                    href="/recipes"
                    className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
                  >
                    <span>Explore Kitchen Recipes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
