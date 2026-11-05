'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, ChefHat, Sparkles, Utensils } from 'lucide-react'
import { RECIPES } from '@/data/recipes-and-lessons'

export function RecipeAndPantryTeaser() {
  const featuredRecipes = RECIPES.slice(0, 2)

  return (
    <section className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <Utensils className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Chapter V &mdash; Whole Food Culinary Lab</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-4">
              15-Minute High-Yield Recipes. <br />
              <span className="italic font-normal text-[#5B6E2C]">Zero Commercial Powder.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
              Chef-tested Indian pantry formulas engineered for maximum protein retention, minimal cooking gear (single pan or kettle), and ultra-low cost per serving.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/kitchen"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/70 hover:bg-white text-[#20271D] border border-[rgba(91,110,44,0.25)] text-xs font-mono tracking-wider uppercase transition-all shadow-xs"
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
              className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-center shadow-xs">
                      <ChefHat className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-mono font-semibold text-[#7D8D39]">
                      {recipe.hindiTitle || 'Whole Food Lab'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#737B70]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{recipe.prepTimeMinutes} mins</span>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#20271D] mb-3">
                  {recipe.title}
                </h3>
                <p className="text-xs text-[#737B70] leading-relaxed mb-6">
                  {recipe.tagline}
                </p>

                {/* Macro Pill Ribbon */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.12)] mb-6 text-center">
                  <div>
                    <span className="text-[10px] font-mono text-[#737B70] block">Protein</span>
                    <span className="font-mono font-bold text-sm text-[#5B6E2C]">
                      {recipe.totalProteinPerServingG}g
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#737B70] block">Calories</span>
                    <span className="font-mono font-bold text-sm text-[#20271D]">
                      {recipe.caloriesPerServing} kcal
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#737B70] block">Est. Cost</span>
                    <span className="font-mono font-bold text-sm text-[#FF5A22]">
                      ₹{recipe.estimatedCostPerServingInr}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[rgba(91,110,44,0.12)] flex items-center justify-between text-xs text-[#5B6E2C] font-mono font-medium">
                <span>Scaling: 1x &mdash; 4x Dynamic Adjuster</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
