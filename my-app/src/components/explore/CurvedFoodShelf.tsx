'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FoodItem } from '@/types/food'
import { ChevronLeft, ChevronRight, Eye, Sparkles } from 'lucide-react'

interface CurvedFoodShelfProps {
  foods: FoodItem[]
  onSelectFood: (food: FoodItem) => void
}

export function CurvedFoodShelf({ foods, onSelectFood }: CurvedFoodShelfProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)

  // Clamp activeIndex within foods array bounds
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(foods.length - 1, prev + 1))
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [foods.length])

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStartX.current = e.clientX
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return
    setIsDragging(false)
    const diff = e.clientX - dragStartX.current
    if (diff > 50) handlePrev()
    if (diff < -50) handleNext()
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      dragStartX.current = e.touches[0].clientX
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0]) {
      const diff = e.changedTouches[0].clientX - dragStartX.current
      if (diff > 40) handlePrev()
      if (diff < -40) handleNext()
    }
  }

  // Wheel interaction
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaX) > 30) {
      if (e.deltaX > 0) handleNext()
      else handlePrev()
    }
  }

  if (foods.length === 0) {
    return (
      <div className="py-24 text-center text-[#737B70]">
        No food items matched your current filter.
      </div>
    )
  }

  const activeFood = foods[activeIndex] || foods[0]

  return (
    <div className="relative w-full py-10 select-none overflow-hidden flex flex-col items-center">
      {/* 3D Arc Shelf Container */}
      <div
        className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
      >
        {foods.map((food, idx) => {
          const offset = idx - activeIndex
          // Only render items within a visible window for performance
          if (Math.abs(offset) > 3) return null

          const translateX = offset * 210 // horizontal spacing
          const translateZ = -Math.abs(offset) * 90 // depth recession
          const rotateY = -Math.max(-35, Math.min(35, offset * 18)) // 3D rotation arc
          const scale = Math.max(0.75, 1 - Math.abs(offset) * 0.12)
          const opacity = Math.max(0.35, 1 - Math.abs(offset) * 0.28)
          const zIndex = 20 - Math.abs(offset)
          const isCenter = offset === 0

          return (
            <div
              key={food.id}
              onClick={() => {
                if (isCenter) {
                  onSelectFood(food)
                } else {
                  setActiveIndex(idx)
                }
              }}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease',
              }}
              className={`absolute w-[240px] sm:w-[280px] h-[320px] sm:h-[360px] p-6 rounded-3xl cursor-pointer flex flex-col justify-between transition-shadow ${
                isCenter
                  ? 'bg-white border-2 border-[#5B6E2C] shadow-xl'
                  : 'bg-[#F3F6F4] border border-[rgba(91,110,44,0.2)] shadow-md hover:border-[#7D8D39]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
                    {food.category}
                  </span>
                  <span className="text-[10px] font-mono font-medium text-[#737B70]">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#20271D] leading-snug mb-1">
                  {food.name}
                </h3>
                {food.hindiName && (
                  <p className="text-xs text-[#737B70] font-sans mb-4">
                    {food.hindiName}
                  </p>
                )}

                <div className="space-y-2 text-xs text-[#737B70] my-4 pt-3 border-t border-[rgba(91,110,44,0.1)]">
                  <div className="flex justify-between">
                    <span>Protein / 100g:</span>
                    <strong className="text-[#5B6E2C] font-semibold">
                      {food.proteinPer100g}g
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy:</span>
                    <span className="text-[#20271D]">{food.caloriesPer100g} kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Serving:</span>
                    <span className="text-[#20271D]">{food.servingSizeGrams}g</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="pt-3 border-t border-[rgba(91,110,44,0.15)] flex items-baseline justify-between mb-3">
                  <span className="text-[10px] text-[#737B70] uppercase">Cost / 10g:</span>
                  <strong className="font-display text-xl font-bold text-[#5B6E2C]">
                    ₹{((food.estimatedCostPer100g / food.proteinPer100g) * 10).toFixed(2)}
                  </strong>
                </div>

                {isCenter && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectFood(food)
                    }}
                    className="w-full py-2 rounded-xl bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Nutrition Dossier</span>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation Controls & Indicators */}
      <div className="mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="p-3 rounded-full bg-white border border-[rgba(91,110,44,0.2)] text-[#20271D] hover:bg-[#F3F6F4] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
          aria-label="Previous Food Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1.5 max-w-[200px] overflow-x-auto py-1">
          {foods.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`Jump to food ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === activeIndex
                  ? 'w-6 bg-[#5B6E2C]'
                  : 'w-2 bg-[rgba(91,110,44,0.2)] hover:bg-[#7D8D39]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={activeIndex === foods.length - 1}
          className="p-3 rounded-full bg-white border border-[rgba(91,110,44,0.2)] text-[#20271D] hover:bg-[#F3F6F4] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
          aria-label="Next Food Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <p className="mt-4 text-[11px] text-[#737B70] tracking-wide">
        Use Arrow keys, drag, or click any card along the curved arc to explore.
      </p>
    </div>
  )
}
