'use client'

import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { CoreFeaturesBento } from '@/components/home/CoreFeaturesBento'
import { ProductShowcase } from '@/components/home/ProductShowcase'
import { FinalCTA } from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#050B07] text-cream selection:bg-chartreuse selection:text-forest">
      {/* Section 2 — Hero with Product Preview Centerpiece */}
      <HeroSection />

      {/* Section 3 — How It Works (Three-Step Core Workflow) */}
      <HowItWorks />

      {/* Section 4 — Core Features (Asymmetrical Editorial Bento Grid) */}
      <CoreFeaturesBento />

      {/* Section 5 — Product Showcase (Interactive Real-World Matchups) */}
      <ProductShowcase />

      {/* Section 6 — Final CTA (Strong Closing Statement) */}
      <FinalCTA />
    </main>
  )
}
