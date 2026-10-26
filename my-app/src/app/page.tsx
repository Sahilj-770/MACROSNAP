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
      {/* Chapter 01: Panoramic Opening Scene */}
      <OpeningHero />

      {/* Chapter 02: Molecular Nutrient Matrix Lens */}
      <TelemetryLens />

      {/* Chapter 03: The Sovereign Staples — Spreading Architecture */}
      <SpreadingStaples />

      {/* Chapter 04: The Nutritional Reckoning — Dual Arena Showdown */}
      <ShowdownArena />

      {/* Chapter 05: Protein on a Budget — Velocity Economic Rail */}
      <VelocityTrack />

      {/* Chapter 06: The Six Precision Instruments Deck */}
      <InstrumentsDeck />

      {/* Chapter 07: The Sovereign Manifesto Climax */}
      <ManifestoClimax />

      {/* Global Bottom Live Biological Feed Ticker */}
      <EditorialTicker />
    </main>
  )
}
