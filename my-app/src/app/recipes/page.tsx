'use client'

import React, { useState } from 'react'
import { RECIPES } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import { Clock, ChefHat, Sparkles, ShoppingBag, Check, Flame } from 'lucide-react'

export default function RecipesPage() {
  const [servingScales, setServingScales] = useState<Record<string, number>>({})
  const [addedRecipeId, setAddedRecipeId] = useState<string | null>(null)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const handleSetScale = (recipeId: string, scale: number) => {
    setServingScales((prev) => ({ ...prev, [recipeId]: scale }))
  }

  const handleAddAllIngredients = (recipe: (typeof RECIPES)[0]) => {
    const scale = servingScales[recipe.id] || 1
    recipe.ingredients.forEach((ing) => {
      if (ing.foodId) {
        addToBasket(ing.foodId, ing.quantityAmount * scale)
      }
    })
    setAddedRecipeId(recipe.id)
    setTimeout(() => setAddedRecipeId(null), 2000)
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-medium mb-3">
          <ChefHat className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>High-Yield Whole Food Recipes</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D]">
          Whole Food Recipe Lab.
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-2 max-w-2xl leading-relaxed">
          Chef-tested Indian pantry recipes engineered for maximum protein bioavailability, minimal
          cooking gear (kettle or induction), and ultra-low cost per serving. Scale servings
          dynamically with instant ingredient recalibration.
        </p>
      </div>

      {/* Recipe Cards List */}
      <div className="space-y-12">
        {RECIPES.map((recipe) => {
          const scale = servingScales[recipe.id] || 1
          const scaledProtein = (recipe.totalProteinPerServingG * scale).toFixed(0)
          const scaledCalories = recipe.caloriesPerServing * scale
          const scaledCost = recipe.estimatedCostPerServingInr * scale
          const isAdded = addedRecipeId === recipe.id

          return (
            <div
              key={recipe.id}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[rgba(91,110,44,0.12)]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
                      {recipe.hindiTitle || 'Whole Food Lab'}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#737B70]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                    </div>
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#20271D]">
                    {recipe.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#737B70] mt-1 max-w-xl">
                    {recipe.tagline}
                  </p>
                </div>

                {/* Serving Scaler Controls */}
                <div className="flex items-center gap-2 self-start lg:self-auto">
                  <span className="text-xs font-semibold text-[#737B70]">Servings:</span>
                  <div className="flex gap-1 p-1 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)]">
                    {[1, 2, 3, 4].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSetScale(recipe.id, s)}
                        className={`w-8 h-8 rounded-xl text-xs font-semibold transition-all ${
                          scale === s
                            ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
                            : 'text-[#20271D] hover:bg-white'
                        }`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scaled Macro Highlights Bento */}
              <div className="grid grid-cols-3 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-[#F3F6F4] text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#7D8D39] block">
                    Total Protein
                  </span>
                  <strong className="text-2xl sm:text-3xl font-display text-[#5B6E2C] font-bold">
                    {scaledProtein}g
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-[#F3F6F4] text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#7D8D39] block">
                    Energy
                  </span>
                  <strong className="text-2xl sm:text-3xl font-display text-[#20271D] font-bold">
                    {scaledCalories} kcal
                  </strong>
                </div>

                <div className="p-4 rounded-2xl bg-[#F3F6F4] text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#7D8D39] block">
                    Estimated Cost
                  </span>
                  <strong className="text-2xl sm:text-3xl font-display text-[#FF5A22] font-bold">
                    ₹{scaledCost}
                  </strong>
                </div>
              </div>

              {/* Ingredients & Steps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {/* Ingredients */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#20271D] mb-3">
                    Ingredients ({scale} serving{scale > 1 ? 's' : ''}):
                  </h3>
                  <ul className="space-y-2 text-xs text-[#20271D]">
                    {recipe.ingredients.map((ing, i) => (
                      <li
                        key={i}
                        className="flex justify-between items-center py-1.5 border-b border-[rgba(91,110,44,0.08)]"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5B6E2C]" />
                          <span>{ing.name}</span>
                        </span>
                        <span className="font-mono text-[#737B70]">
                          {ing.quantityAmount * scale} {ing.quantityUnit} (+
                          {ing.proteinContributionG * scale}g protein)
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#20271D] mb-3">
                    Preparation Steps:
                  </h3>
                  <ol className="space-y-2 text-xs text-[#737B70]">
                    {recipe.steps.map((step, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] font-bold text-[10px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Bottom Footer Actions */}
              <div className="mt-8 pt-6 border-t border-[rgba(91,110,44,0.12)] flex flex-col sm:flex-row items-center justify-between gap-4">
                {recipe.comparisonPackagedAlternative ? (
                  <div className="text-xs text-[#737B70]">
                    <span className="text-[#FF5A22] font-semibold">Vs. Packaged Alternative: </span>
                    <span>
                      {recipe.comparisonPackagedAlternative.name} yields{' '}
                      {recipe.comparisonPackagedAlternative.proteinG}g protein for ₹
                      {recipe.comparisonPackagedAlternative.costInr * scale}. Save ₹
                      {recipe.comparisonPackagedAlternative.costInr * scale - scaledCost}!
                    </span>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => handleAddAllIngredients(recipe)}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    isAdded
                      ? 'bg-[#7D8D39] text-white'
                      : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ingredients Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Ingredients to Basket</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
