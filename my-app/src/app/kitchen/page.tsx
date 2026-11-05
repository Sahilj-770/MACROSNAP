'use client'

import React, { useState } from 'react'
import { RECIPES } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import Link from 'next/link'
import { Utensils, Check, ArrowRight, Sparkles, ShoppingBag, Clock, ChefHat } from 'lucide-react'

const AVAILABLE_STAPLES = [
  { id: 'soy-chunks', label: 'Soya Chunks', category: 'High-Yield Plant', protein: '52g' },
  { id: 'roasted-chana', label: 'Roasted Chana / Sattu', category: 'Zero-Cooking Gram', protein: '22.5g' },
  { id: 'eggs-whole', label: 'Whole Poultry Eggs', category: 'Complete Protein', protein: '13.3g' },
  { id: 'paneer-fresh', label: 'Fresh Cow Milk Paneer', category: 'Dairy Matrix', protein: '18g' },
  { id: 'moong-dal-yellow', label: 'Yellow Moong Dal', category: 'Easily Digestible Pulse', protein: '24g' },
  { id: 'curd-dahi', label: 'Probiotic Dahi / Curd', category: 'Fermented Dairy', protein: '3.5g' },
  { id: 'peanuts-roasted', label: 'Roasted Peanuts', category: 'Energy & Arginine', protein: '26g' },
  { id: 'tofu-firm', label: 'Non-GMO Firm Tofu', category: 'Low-Calorie Plant', protein: '15g' },
]

export function KitchenPage() {
  const [selectedStaples, setSelectedStaples] = useState<string[]>([
    'soy-chunks',
    'roasted-chana',
  ])

  const toggleStaple = (id: string) => {
    if (selectedStaples.includes(id)) {
      setSelectedStaples(selectedStaples.filter((s) => s !== id))
    } else {
      setSelectedStaples([...selectedStaples, id])
    }
  }

  // Filter recipes that have at least one ingredient in selectedStaples
  const matchingRecipes = RECIPES.filter((recipe) => {
    return recipe.ingredients.some((ing) => ing.foodId && selectedStaples.includes(ing.foodId))
  })

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-3">
          <Utensils className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Artisanal Kitchen Pantry Cellar</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          The Pantry Matcher
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-2xl leading-relaxed">
          Tap whatever staples are sitting in your hostel shelf or kitchen pantry right now. Our engine instantly surfaces chef-tested 15-minute formulas engineered for maximum protein with zero supermarket trips.
        </p>
      </div>

      {/* Traditional Indian Spice Box / Pantry Grid */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-lg mb-12 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)]">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] font-semibold">
            PANTRY STAPLE COMPARTMENTS &bull; SELECT TO ACTIVATE
          </span>
          <span className="text-xs font-mono text-[#7D8D39]">
            {selectedStaples.length} Active Staples
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {AVAILABLE_STAPLES.map((staple) => {
            const isSelected = selectedStaples.includes(staple.id)
            return (
              <button
                key={staple.id}
                type="button"
                onClick={() => toggleStaple(staple.id)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 relative overflow-hidden flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-md scale-[1.02]'
                    : 'bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider ${
                      isSelected ? 'text-[#A3B18A]' : 'text-[#737B70]'
                    }`}
                  >
                    {staple.category}
                  </span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-display font-bold text-sm block leading-snug">
                    {staple.label}
                  </span>
                  <span
                    className={`text-[10px] font-mono mt-0.5 block ${
                      isSelected ? 'text-[#F3F6F4]/90' : 'text-[#5B6E2C] font-bold'
                    }`}
                  >
                    {staple.protein} protein / 100g
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recipe Matching Output Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#20271D]">
            {matchingRecipes.length} Matching Whole-Food Recipes
          </h2>
          <span className="text-xs font-mono text-[#7D8D39]">
            {selectedStaples.length > 0 ? 'Filtered by active pantry' : 'Showing all formulas'}
          </span>
        </div>

        {matchingRecipes.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] text-center text-[#737B70]">
            <p className="text-sm font-mono">No recipes match this exact pantry combination. Try tapping another staple above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all duration-300 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[rgba(91,110,44,0.12)] mb-4">
                    <span className="text-xs font-mono font-semibold text-[#7D8D39]">
                      {recipe.hindiTitle || 'Whole Food Formula'}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-mono text-[#737B70]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{recipe.prepTimeMinutes}m</span>
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#20271D] mb-2">
                    {recipe.title}
                  </h3>

                  <p className="text-xs text-[#737B70] leading-relaxed mb-6">
                    {recipe.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#F3F6F4] text-center mb-6">
                    <div>
                      <span className="text-[9px] font-mono text-[#737B70] block">Protein</span>
                      <span className="font-mono font-bold text-sm text-[#5B6E2C]">
                        {recipe.totalProteinPerServingG}g
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#737B70] block">Calories</span>
                      <span className="font-mono font-bold text-sm text-[#20271D]">
                        {recipe.caloriesPerServing} kcal
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#737B70] block">Cost</span>
                      <span className="font-mono font-bold text-sm text-[#FF5A22]">
                        ₹{recipe.estimatedCostPerServingInr}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/recipes"
                  className="px-4 py-2.5 rounded-full bg-[#F3F6F4] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] text-[#20271D] text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-between"
                >
                  <span>Scale Ingredients (1x-4x)</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
export default KitchenPage
