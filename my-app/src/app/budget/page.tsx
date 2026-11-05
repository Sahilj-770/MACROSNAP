'use client'

import React, { useState } from 'react'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'
import { VanteVideoRibbon } from '@/components/budget/VanteVideoRibbon'
import { ValuePodium } from '@/components/budget/ValuePodium'
import { FoodDetailModal } from '@/components/explore/FoodDetailModal'

export default function BudgetPage() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)

  return (
    <div className="min-h-screen bg-[#F3F6F4]">
      {/* Exact Vante 3D Video Ribbon Rail Experience */}
      <VanteVideoRibbon />

      {/* National Value Comparison Podium & Monthly Savings Simulator */}
      <ValuePodium foods={FOOD_DATABASE} />

      {/* Inspect Detail Modal */}
      <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />
    </div>
  )
}
