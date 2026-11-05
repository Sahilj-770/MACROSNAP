'use client'

import React, { useState } from 'react'
import DishOrbitCarousel, { type Dish } from '@/components/ui/dish-orbit-carousel'
import { RECIPE_DATABASE } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import { ChefHat, Sparkles, BookOpen, Utensils, ArrowUpRight, ShoppingBag, Check } from 'lucide-react'
import Link from 'next/link'

const DISH_PALETTE = ['#5B6E2C', '#7D8D39', '#FF5A22', '#08482D']

const DISHES_DATA: Dish[] = RECIPE_DATABASE.map((r, i) => {
  const parts = r.title.split(' ')
  const title = parts.slice(0, 2).join(' ')
  const subtitle = parts.slice(2).join(' ') || r.title
  return {
    title,
    subtitle,
    image: r.imageUrl || `/images/food/food_${i % 10}.webp`,
    alt: r.title,
    eyebrow: `#0${i + 1} Most Loved Bioavailable Recipe`,
    label: `${r.hindiTitle || r.title}`,
    rating: Number((4.8 + (i % 3) * 0.1).toFixed(1)),
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

          {/* Caveat Handwritten Callout */}
          <div className="hidden md:flex flex-col items-end self-end text-right">
            <span
              className="text-lg font-bold text-[#08482D] -rotate-2"
              style={{ fontFamily: 'var(--font-caveat, Caveat, cursive)' }}
            >
              100% verified kitchen economics ↗
            </span>
            <span className="text-xs text-[#7D8D39] font-mono">
              Zero ultra-processed protein powders
            </span>
          </div>
        </div>
      </div>

      {/* Primary Feature: Dish Orbit Carousel */}
      <section className="mb-12">
        <DishOrbitCarousel
          dishes={DISHES_DATA}
          height="720px"
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
              Select any dish above to examine detailed macronutrient breakdowns and scale ingredients.
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
          {RECIPE_DATABASE.map((recipe, index) => (
            <div
              key={recipe.id}
              className="p-5 rounded-2xl bg-white border border-[#5B6E2C]/15 hover:border-[#5B6E2C] transition-all shadow-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#7D8D39] font-mono mb-2">
                  <span>RECIPE 0{index + 1}</span>
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
          ))}
        </div>
      </section>
    </div>
  )
}
