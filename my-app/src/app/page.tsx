'use client'

import React from 'react'
import { UnifiedBotanicalCanvas } from '@/components/home/UnifiedBotanicalCanvas'
import { ReelmarkBotanicalHero } from '@/components/home/ReelmarkBotanicalHero'
import { FoodIntelligence } from '@/components/home/FoodIntelligence'
import { FoodDiscoveryTeaser } from '@/components/home/FoodDiscoveryTeaser'
import { BudgetRibbonTeaser } from '@/components/home/BudgetRibbonTeaser'
import { CalculatorTeaser } from '@/components/home/CalculatorTeaser'
import { MythBustersTeaser } from '@/components/home/MythBustersTeaser'
import { RecipeAndPantryTeaser } from '@/components/home/RecipeAndPantryTeaser'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden bg-[#F3F6F4]">
      {/* 
        Unified Living Botanical Universe Canvas:
        Runs continuously across the entire landing page, driven by cursor and scroll depth.
      */}
      <UnifiedBotanicalCanvas interactive={true} />

      {/* Central Biological Nutrient Rhizome Stem (Draws down the page) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] pointer-events-none z-0 hidden lg:block"
        style={{
          background:
            'linear-gradient(180deg, rgba(125,141,57,0) 0%, rgba(125,141,57,0.3) 15%, rgba(91,110,44,0.35) 60%, rgba(255,90,34,0.25) 90%, rgba(125,141,57,0) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Hero Chapter: Reelmark-Inspired Cylindrical Curved Carousel Hero */}
      <ReelmarkBotanicalHero />

      {/* Chapter I: Biological Truth & Standardized Yield */}
      <FoodIntelligence />

      {/* Chapter I.5: Living Food Archive Discovery Preview */}
      <FoodDiscoveryTeaser />

      {/* Chapter II: Rupee-to-Protein Economics & Value Podium */}
      <BudgetRibbonTeaser />

      {/* Chapter III: Precision ACSM / ISSN Target Simulator */}
      <CalculatorTeaser />

      {/* Chapter IV: Scientific Myth Demolition Dossiers */}
      <MythBustersTeaser />

      {/* Chapter V: Whole Food Culinary Lab & 15-Minute Formulas */}
      <RecipeAndPantryTeaser />

      {/* Epilogue: Systematic Synthesis & Archive Access */}
      <FinalCTA />
    </div>
  )
}
