'use client'

import React, { useState } from 'react'
import DishOrbitCarousel, { type Dish } from '@/components/ui/dish-orbit-carousel'
import { RECIPE_DATABASE } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import { ChefHat, Sparkles, BookOpen, Utensils, ArrowUpRight, ShoppingBag, Check, MousePointerClick } from 'lucide-react'
import Link from 'next/link'

const DISH_PALETTE = [
  '#5B6E2C', // Olive
  '#7D8D39', // Sage
  '#FF5A22', // Tangerine
  '#08482D', // Forest Green
  '#C05621', // Terracotta
  '#3182CE', // Slate Cobalt
  '#2C7A7B', // Deep Teal
  '#805AD5', // Royal Plum
  '#D69E2E', // Warm Turmeric
  '#4A5568', // Slate Charcoal
]

const DISHES_DATA: Dish[] = RECIPE_DATABASE.map((r, i) => {
  const parts = r.title.split(' ')
  const title = parts.slice(0, 2).join(' ')
  const subtitle = parts.slice(2).join(' ') || r.title
  return {
    title,
    subtitle,
    image: r.imageUrl || `/images/food/food_${i % 10}.webp`,
    alt: r.title,
    eyebrow: `#${String(i + 1).padStart(2, '0')} Most Loved Bioavailable Recipe`,
    label: `${r.hindiTitle || r.title}`,
    rating: Number((4.7 + ((i * 3) % 4) * 0.1).toFixed(1)),
    chef: r.hindiTitle || 'MacroSnap Kitchen Lab',
    kitchen: `Prep: ${r.prepTimeMinutes}m • Cook: ${r.cookTimeMinutes}m • ₹${r.estimatedCostPerServingInr}/serv`,
    description: `${r.tagline} Provides ${r.totalProteinPerServingG}g protein for ₹${r.estimatedCostPerServingInr} (${r.caloriesPerServing} kcal).`,
    likes: 380 + i * 95,
    ingredients: r.ingredients.map((ing) => `${ing.name} (${ing.quantityAmount}${ing.quantityUnit})`),
    accent: DISH_PALETTE[i % DISH_PALETTE.length] ?? '#5B6E2C',
  }
})

export default function RecipesPage() {
  const { addToBasket } = useUserStore()
  const [basketToast, setBasketToast] = useState<string | null>(null)
  const [selectedDishIndex, setSelectedDishIndex] = useState(0)

  const handleOrder = (dish: Dish, index: number) => {
    const recipe = RECIPE_DATABASE[index]
    if (recipe) {
      recipe.ingredients.forEach((ing) => {
        if (ing.foodId) {
          addToBasket(ing.foodId, ing.quantityAmount)
        }
      })
      setBasketToast(`Added ${recipe.title} ingredients to Basket!`)
      setTimeout(() => setBasketToast(null), 3500)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {basketToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#08482D] text-[#F5F8EF] shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Check className="w-4 h-4 text-[#DAE7C7]" />
          <span>{basketToast}</span>
          <Link href="/basket" className="underline font-semibold ml-2 hover:text-white">
            View Basket
          </Link>
        </div>
      )}

      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-semibold mb-3">
              <ChefHat className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Bioavailable Indian Pantry Recipes</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#101410] tracking-tight">
              Whole Food Recipe Lab.
            </h1>
            <p className="text-sm sm:text-base text-[#5E5E61] mt-2 max-w-2xl leading-relaxed">
              Chef-tested Indian kitchen recipes engineered for maximum protein bioavailability, minimal
              cooking gear (kettle or single induction), and ultra-low cost per serving.
            </p>
          </div>

          {/* Interactive instruction callout */}
          <div className="hidden md:flex flex-col items-end self-end text-right">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-medium mb-1">
              <MousePointerClick className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Click any food item or thumbnail to advance</span>
            </div>
            <span className="text-xs text-[#7D8D39] font-mono">
              Natural page scrolling enabled • No scroll trapping
            </span>
          </div>
        </div>
      </div>

      {/* Primary Feature: Dish Orbit Carousel */}
      <section id="recipe-stage" className="mb-12">
        <DishOrbitCarousel
          dishes={DISHES_DATA}
          height="720px"
          selectedIndex={selectedDishIndex}
          onChange={(newIndex) => setSelectedDishIndex(newIndex)}
          onOrder={handleOrder}
        />
      </section>

      {/* Secondary Editorial Section: Recipe Catalog Index */}
      <section className="mt-16 pt-12 border-t border-[#5B6E2C]/15">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#101410]">
              All Kitchen Formulations ({RECIPE_DATABASE.length})
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5E61] mt-1">
              Click any recipe card below to inspect its 3D plated presentation and scaled ingredients.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#FF5A22] transition-colors"
          >
            <span>Explore Food Database</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECIPE_DATABASE.map((recipe, index) => {
            const isSelected = selectedDishIndex === index
            return (
              <div
                key={recipe.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  setSelectedDishIndex(index)
                  const el = document.getElementById('recipe-stage')
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedDishIndex(index)
                    const el = document.getElementById('recipe-stage')
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                    }
                  }
                }}
                className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all duration-300 shadow-2xs group flex flex-col justify-between text-left focus:outline-hidden focus:ring-2 focus:ring-[#5B6E2C] ${
                  isSelected
                    ? 'border-[#5B6E2C] ring-2 ring-[#5B6E2C]/30 shadow-md bg-[#5B6E2C]/5'
                    : 'border-[#5B6E2C]/15 hover:border-[#5B6E2C]/60 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7D8D39] font-mono mb-2">
                    <span className={isSelected ? 'text-[#FF5A22] font-bold' : ''}>
                      {isSelected ? '● ACTIVE DISH' : `RECIPE ${String(index + 1).padStart(2, '0')}`}
                    </span>
                    <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} mins</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#101410] group-hover:text-[#5B6E2C] transition-colors line-clamp-1">
                    {recipe.title}
                  </h3>
                  {recipe.hindiTitle && (
                    <p className="text-xs text-[#7D8D39] font-medium mt-0.5 line-clamp-1">
                      {recipe.hindiTitle}
                    </p>
                  )}
                  <p className="text-xs text-[#5E5E61] mt-2 line-clamp-2 leading-relaxed">
                    {recipe.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#5B6E2C]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#7D8D39] uppercase block">
                      Protein
                    </span>
                    <span className="text-sm font-bold text-[#5B6E2C]">
                      {recipe.totalProteinPerServingG}g
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#7D8D39] uppercase block">
                      Price
                    </span>
                    <span className="text-sm font-bold text-[#FF5A22]">
                      ₹{recipe.estimatedCostPerServingInr}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
