'use client'

import React, { useState } from 'react'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import { X, ShoppingBag, ShieldCheck, Clock, Flame, Scale, Check } from 'lucide-react'

interface FoodDetailModalProps {
  food: FoodItem | null
  onClose: () => void
}

export function FoodDetailModal({ food, onClose }: FoodDetailModalProps) {
  const [viewMode, setViewMode] = useState<'100g' | 'serving'>('100g')
  const [added, setAdded] = useState(false)
  const addToBasket = useUserStore((state) => state.addToBasket)

  if (!food) return null

  const multiplier = viewMode === 'serving' ? food.servingSizeGrams / 100 : 1

  const protein = (food.proteinPer100g * multiplier).toFixed(1)
  const calories = Math.round(food.caloriesPer100g * multiplier)
  const carbs = (food.carbsPer100g * multiplier).toFixed(1)
  const fat = (food.fatPer100g * multiplier).toFixed(1)
  const fiber = food.fiberPer100g ? (food.fiberPer100g * multiplier).toFixed(1) : 'N/A'
  const cost = ((food.estimatedCostPer100g * multiplier)).toFixed(1)

  const handleAddToBasket = () => {
    addToBasket(food.id, viewMode === 'serving' ? food.servingSizeGrams : 100)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#20271D]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#F3F6F4] rounded-3xl border border-[rgba(91,110,44,0.3)] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="food-modal-title"
      >
        {/* Header Bar */}
        <div className="p-6 bg-white border-b border-[rgba(91,110,44,0.15)] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
                {food.category}
              </span>
              {food.hindiName && (
                <span className="text-xs text-[#737B70] font-sans">
                  {food.hindiName}
                </span>
              )}
            </div>
            <h2 id="food-modal-title" className="font-display text-3xl font-bold text-[#20271D]">
              {food.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-[#737B70] hover:text-[#20271D] hover:bg-[#F3F6F4] transition-colors"
            aria-label="Close food details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* View Mode Toggle: Per 100g vs Per Serving */}
          <div className="flex items-center justify-between p-1.5 rounded-2xl bg-white border border-[rgba(91,110,44,0.15)]">
            <span className="text-xs font-medium text-[#737B70] pl-3">
              Standardized Basis:
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setViewMode('100g')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === '100g'
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
                    : 'text-[#20271D] hover:bg-[#F3F6F4]'
                }`}
              >
                Per 100g
              </button>
              <button
                type="button"
                onClick={() => setViewMode('serving')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  viewMode === 'serving'
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] shadow-xs'
                    : 'text-[#20271D] hover:bg-[#F3F6F4]'
                }`}
              >
                Serving ({food.servingSizeGrams}g)
              </button>
            </div>
          </div>

          {/* Macro Metrics Bento */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.15)] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#737B70] block">Protein</span>
              <strong className="text-2xl font-display text-[#5B6E2C] font-bold">{protein}g</strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.15)] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#737B70] block">Energy</span>
              <strong className="text-2xl font-display text-[#20271D] font-bold">{calories} kcal</strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.15)] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#737B70] block">Carbs</span>
              <strong className="text-2xl font-display text-[#737B70] font-bold">{carbs}g</strong>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.15)] text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#737B70] block">Fats</span>
              <strong className="text-2xl font-display text-[#737B70] font-bold">{fat}g</strong>
            </div>
          </div>

          {/* Economic Benchmark Card */}
          <div className="p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-[#5B6E2C] uppercase tracking-wider block">
                Cost per 10g Pure Protein:
              </span>
              <span className="text-xs text-[#20271D]">{food.costNote}</span>
            </div>
            <span className="font-display text-3xl font-bold text-[#5B6E2C]">
              ₹{((food.estimatedCostPer100g / food.proteinPer100g) * 10).toFixed(2)}
            </span>
          </div>

          {/* Preparation & Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-[#20271D] uppercase tracking-wider">
              Nutritional Dossier & Culinary Advice
            </h3>
            <p className="text-xs text-[#737B70] leading-relaxed">
              {food.shortDescription}
            </p>
            <div className="p-3.5 rounded-xl bg-white border border-[rgba(91,110,44,0.15)] text-xs text-[#20271D]">
              <strong className="text-[#5B6E2C]">Chef Tip: </strong>
              {food.highlightTip}
            </div>
          </div>

          {/* Provenance Disclosure */}
          <div className="p-3.5 rounded-xl bg-white border border-[rgba(91,110,44,0.15)] flex items-center justify-between text-[11px] text-[#737B70]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#7D8D39]" />
              <span>{food.sourceProvenance}</span>
            </div>
            <span>Verified: {food.lastVerifiedDate}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[rgba(91,110,44,0.15)] flex items-center justify-between">
          <div className="text-xs text-[#737B70]">
            Estimated Cost: <strong className="text-[#20271D]">₹{cost}</strong>
          </div>
          <button
            type="button"
            onClick={handleAddToBasket}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold transition-all ${
              added
                ? 'bg-[#7D8D39] text-white'
                : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Basket</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Grocery Basket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
