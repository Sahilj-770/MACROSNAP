'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, ChefHat, Sparkles, Utensils } from 'lucide-react'
import { RECIPES } from '@/data/recipes-and-lessons'

export function RecipeAndPantryTeaser() {
  const featuredRecipes = RECIPES.slice(0, 2)

  return (
    <section className="relative py-24 z-10 bg-[#F3F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <Utensils className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Whole Food Kitchen &bull; 15-Minute Meals</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-4">
              High-Yield Indian Recipes. <br />
              <span className="italic font-normal text-[#5B6E2C]">Zero Commercial Powders.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
              Chef-tested Indian pantry recipes engineered for maximum protein bioavailability, minimal cooking equipment (kettle or induction), and ultra-low cost per serving.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/kitchen"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#F3F6F4] text-[#20271D] border border-[rgba(91,110,44,0.25)] text-xs font-mono tracking-wider uppercase transition-all shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Pantry Matcher</span>
            </Link>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs group"
            >
              <span>Explore Recipes</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 2 Featured Recipe Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-8 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all duration-300 flex flex-col justify-between shadow-2xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-center shadow-xs">
                      <ChefHat className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#7D8D39]">
                      {recipe.dietary[0]?.toUpperCase() || 'WHOLE FOOD'} &bull; {recipe.prepTimeMinutes} MIN
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#737B70]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{recipe.prepTimeMinutes}m</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#20271D] mb-2">
                  {recipe.title}
                </h3>
                <p className="text-xs text-[#737B70] leading-relaxed mb-6 font-sans">
                  {recipe.tagline}
                </p>

                {/* Key Nutrition Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)] text-center text-xs font-mono mb-6">
                  <div>
                    <span className="text-[10px] text-[#737B70] block">Protein</span>
                    <strong className="text-sm font-bold text-[#5B6E2C]">
                      {recipe.totalProteinPerServingG}g
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#737B70] block">Energy</span>
                    <strong className="text-sm font-bold text-[#20271D]">
                      {recipe.caloriesPerServing} kcal
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#737B70] block">Cost</span>
                    <strong className="text-sm font-bold text-[#7D8D39]">
                      ₹{recipe.estimatedCostPerServingInr}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between">
                <span className="text-xs text-[#737B70] font-sans">
                  {recipe.ingredients.length} whole food ingredients
                </span>
                <Link
                  href="/recipes"
                  className="text-xs font-semibold text-[#5B6E2C] hover:text-[#7D8D39] flex items-center gap-1"
                >
                  <span>View Recipe &rarr;</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
