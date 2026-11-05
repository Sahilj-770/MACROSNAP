'use client'

import React from 'react'
import { DishOrbitCarousel } from '@/components/ui/dish-orbit-carousel'
import { RECIPES } from '@/data/recipes-and-lessons'
import { ChefHat, Sparkles, BookOpen, Utensils, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function RecipesPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[#5B6E2C]/15 mb-10">
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
      <section className="mb-16">
        <DishOrbitCarousel />
      </section>

      {/* Secondary Editorial Section: Recipe Catalog Index */}
      <section className="mt-16 pt-12 border-t border-[#5B6E2C]/15">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#101410]">
              All Kitchen Formulations ({RECIPES.length})
            </h2>
            <p className="text-xs sm:text-sm text-[#5E5E61] mt-1">
              Select any dish above to examine detailed macronutrient breakdowns and scale ingredients.
            </p>
          </div>

          <Link
            href="/kitchen"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#FF5A22] transition-colors"
          >
            <span>Match with Your Pantry</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Recipe Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECIPES.map((recipe, index) => (
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
