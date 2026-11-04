'use client'

import React from 'react'
import { OpeningHero } from '@/components/home/OpeningHero'
import { TelemetryLens } from '@/components/home/TelemetryLens'
import { SpreadingStaples } from '@/components/home/SpreadingStaples'
import { ShowdownArena } from '@/components/home/ShowdownArena'
import { VelocityTrack } from '@/components/home/VelocityTrack'
import { InstrumentsDeck } from '@/components/home/InstrumentsDeck'
import { ManifestoClimax } from '@/components/home/ManifestoClimax'
import { EditorialTicker } from '@/components/layout/EditorialTicker'

export default function HomePage() {
  return (
    <main className="relative w-full overflow-x-hidden bg-[#050B07] text-cream selection:bg-chartreuse selection:text-forest">
      {/* 01: Hero Scene */}
      <OpeningHero />

      {/* 02: Nutritional Science & Bioavailability */}
      <TelemetryLens />

      {/* 03: High-Yield Indian Kitchen Staples */}
      <SpreadingStaples />

      {/* 04: Head-to-Head Food Showdown */}
      <ShowdownArena />

      {/* 05: Protein on a Budget */}
      <VelocityTrack />

      {/* 06: Interactive Nutrition Tools */}
      <InstrumentsDeck />

      {/* 07: Core Philosophy */}
      <ManifestoClimax />

      {/* 08: Editorial Nutrition Ticker */}
      <EditorialTicker />
    </main>
  )
}
