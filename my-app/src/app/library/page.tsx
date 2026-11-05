'use client'

import React, { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { FOOD_DATABASE } from '@/data/foods'
import { RECIPES } from '@/data/recipes-and-lessons'
import Link from 'next/link'
import {
  BookmarkCheck,
  Heart,
  Swords,
  ChefHat,
  Trash2,
  ArrowRight,
  Sparkles,
  ShoppingBag,
} from 'lucide-react'

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'foods' | 'duels' | 'recipes'>('foods')

  const favoriteFoodIds = useUserStore((state) => state.favoriteFoodIds)
  const favoriteRecipeIds = useUserStore((state) => state.favoriteRecipeIds)
  const savedComparisons = useUserStore((state) => state.savedComparisons)

  const toggleFavoriteFood = useUserStore((state) => state.toggleFavoriteFood)
  const toggleFavoriteRecipe = useUserStore((state) => state.toggleFavoriteRecipe)
  const removeComparison = useUserStore((state) => state.removeComparison)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const loadSampleFavorites = useUserStore((state) => state.loadSampleFavorites)
  const loadSampleComparisons = useUserStore((state) => state.loadSampleComparisons)
  const resetAll = useUserStore((state) => state.resetAllToCleanState)

  const bookmarkedFoods = FOOD_DATABASE.filter((f) => favoriteFoodIds.includes(f.id))
  const bookmarkedRecipes = RECIPES.filter((r) => favoriteRecipeIds.includes(r.id))

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[rgba(91,110,44,0.18)] mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-medium mb-3">
            <BookmarkCheck className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span>Local-First Personal Archive</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D]">
            Saved Intelligence.
          </h1>
          <p className="text-sm sm:text-base text-[#737B70] mt-2 max-w-2xl leading-relaxed">
            Your offline collection of pinned food benchmarks, saved head-to-head duels, and
            favorite high-protein pantry recipes. Saved securely in your browser session.
          </p>
        </div>

        {/* Sample Loaders */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSampleFavorites}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-[rgba(91,110,44,0.2)] text-[#20271D] hover:border-[#5B6E2C] transition-all"
          >
            Load Sample Pack
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="p-2 rounded-full text-[#737B70] hover:text-[#FF5A22] hover:bg-white transition-colors"
            title="Clear all saved data"
            aria-label="Clear all saved data"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab('foods')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'foods'
              ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
              : 'bg-white text-[#20271D] border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C]'
          }`}
        >
          Saved Foods ({bookmarkedFoods.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('duels')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'duels'
              ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
              : 'bg-white text-[#20271D] border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C]'
          }`}
        >
          Saved Duels ({savedComparisons.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('recipes')}
          className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
            activeTab === 'recipes'
              ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
              : 'bg-white text-[#20271D] border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C]'
          }`}
        >
          Favorite Recipes ({bookmarkedRecipes.length})
        </button>
      </div>

      {/* Tab 1: Saved Foods */}
      {activeTab === 'foods' && (
        <div>
          {bookmarkedFoods.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[rgba(91,110,44,0.15)] text-[#737B70]">
              <p className="text-sm">You haven&apos;t bookmarked any food items yet.</p>
              <Link
                href="/explore"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#FF5A22]"
              >
                <span>Browse Food Discovery Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedFoods.map((food) => (
                <div
                  key={food.id}
                  className="p-6 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-bold text-[#5B6E2C]">
                        {food.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleFavoriteFood(food.id)}
                        className="text-[#FF5A22] hover:opacity-70"
                        title="Remove bookmark"
                        aria-label={`Remove bookmark for ${food.name}`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-[#20271D]">
                      {food.name}
                    </h3>
                    <p className="text-xs text-[#737B70] mt-1">{food.shortDescription}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-[#5B6E2C]">
                      ₹{((food.estimatedCostPer100g / food.proteinPer100g) * 10).toFixed(2)}{' '}
                      <span className="text-xs font-sans font-normal text-[#737B70]">/ 10g</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => addToBasket(food.id, 100)}
                      className="px-4 py-2 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold transition-all"
                    >
                      + Basket
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Saved Duels */}
      {activeTab === 'duels' && (
        <div>
          {savedComparisons.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[rgba(91,110,44,0.15)] text-[#737B70]">
              <p className="text-sm">No comparisons saved yet.</p>
              <Link
                href="/compare"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#FF5A22]"
              >
                <span>Launch a Nutritional Duel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {savedComparisons.map(([idA, idB]) => {
                const itemA = FOOD_DATABASE.find((f) => f.id === idA)
                const itemB = FOOD_DATABASE.find((f) => f.id === idB)
                if (!itemA || !itemB) return null

                return (
                  <div
                    key={`${idA}-${idB}`}
                    className="p-6 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Swords className="w-5 h-5 text-[#FF5A22]" />
                      <div>
                        <h4 className="font-display text-2xl font-bold text-[#20271D]">
                          {itemA.name} <span className="text-sm font-sans text-[#737B70]">vs</span>{' '}
                          {itemB.name}
                        </h4>
                        <span className="text-xs text-[#737B70]">
                          {itemA.proteinPer100g}g protein vs {itemB.proteinPer100g}g protein
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/compare"
                        className="px-4 py-2 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold transition-all"
                      >
                        Inspect Duel
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeComparison(idA, idB)}
                        className="p-2 text-[#737B70] hover:text-[#FF5A22]"
                        aria-label={`Remove saved duel between ${itemA.name} and ${itemB.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Favorite Recipes */}
      {activeTab === 'recipes' && (
        <div>
          {bookmarkedRecipes.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[rgba(91,110,44,0.15)] text-[#737B70]">
              <p className="text-sm">You haven&apos;t pinned any recipes yet.</p>
              <Link
                href="/recipes"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#FF5A22]"
              >
                <span>Explore Whole Food Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookmarkedRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-6 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7D8D39]">
                      {recipe.hindiTitle}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#20271D] mt-1">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-[#737B70] mt-1">{recipe.tagline}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#5B6E2C]">
                      {recipe.totalProteinPerServingG}g Protein / Serving
                    </span>
                    <Link
                      href="/recipes"
                      className="px-4 py-2 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold transition-all"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
