'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Clock, ChefHat, Sparkles, Utensils, Flame } from 'lucide-react'
import { RECIPES } from '@/data/recipes-and-lessons'

export function RecipeAndPantryTeaser() {
  const featured = RECIPES[0]!

  return (
    <section className="relative py-28 z-10 bg-[#F5F8EF] text-[#101410] border-t border-[#5B6E2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Two-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Authentic Plated Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#5B6E2C]/20 shadow-md aspect-4/5 bg-[#08482D]/10">
              <img
                src="/images/food/food_4.webp"
                alt="Plated Indian high-protein recipe"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Handwritten Note Callout */}
              <div className="absolute top-6 left-6 z-20" style={{ transform: 'rotate(-6deg)' }}>
                <span className="font-caveat font-bold text-white text-2xl drop-shadow-md">
                  15 minutes or less &bull; Real food
                </span>
              </div>

              {/* Overlaid Recipe Summary */}
              <div className="absolute left-6 right-6 bottom-6 z-20 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-[#101410] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#08482D] font-bold">
                    Featured Laboratory Recipe
                  </span>
                  <span className="text-xs font-mono text-[#08482D] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{featured.prepTimeMinutes + featured.cookTimeMinutes} mins</span>
                  </span>
                </div>

                <h4 className="font-display text-xl font-bold text-[#101410] leading-tight">
                  {featured.title}
                </h4>

                <div className="flex items-center justify-between pt-2 border-t border-black/5 text-xs font-mono">
                  <span className="text-[#08482D] font-bold">{featured.totalProteinPerServingG}g Protein</span>
                  <span className="text-[#5E5E61]">{featured.caloriesPerServing} kcal</span>
                  <span className="text-[#101410] font-semibold">₹{featured.estimatedCostPerServingInr} / plate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <Utensils className="w-3.5 h-3.5 text-[#08482D]" />
              <span>Whole Food Culinary Lab &bull; Minimal Gear</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.02]">
              High-yield recipes. <br />
              <span className="text-[#08482D]">Zero synthetic powders.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5E61] leading-relaxed max-w-xl">
              Chef-tested Indian pantry recipes engineered for maximum protein bioavailability, minimal cooking equipment (kettle, induction, or zero cook), and dynamic serving recalculation.
            </p>

            {/* Recipe Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#08482D] font-bold block">
                  Hostel Kettle Soy Bhurji
                </span>
                <span className="text-xs text-[#5E5E61]">27g protein &bull; ₹20 cost &bull; 8 mins</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#08482D] font-bold block">
                  Whipped Hung Curd Power Bowl
                </span>
                <span className="text-xs text-[#5E5E61]">20.3g protein &bull; ₹42 cost &bull; 3 mins</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs group"
              >
                <span>Launch Dish Orbit Carousel</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/kitchen"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F3F6F4] text-[#101410] border border-[#5B6E2C]/25 text-xs font-mono uppercase tracking-wider transition-all shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#08482D]" />
                <span>Pantry Matcher</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
