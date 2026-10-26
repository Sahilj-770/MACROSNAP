'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import { Bookmark, ShoppingBag, Scale, Sparkles, Check } from 'lucide-react'
import { motion } from 'framer-motion'

interface FoodCardProps {
  food: FoodItem
}

export function FoodCard({ food }: FoodCardProps) {
  const { favoriteFoodIds, toggleFavoriteFood, addToBasket, basketItems } = useUserStore()
  const isFavorite = favoriteFoodIds.includes(food.id)
  const inBasket = basketItems.some((item) => item.foodId === food.id)

  // Protein cost per 10g formula: (Cost per 100g / Protein per 100g) * 10
  const costPer10gProtein = ((food.estimatedCostPer100g / food.proteinPer100g) * 10).toFixed(1)
  const proteinPercent = Math.min(100, (food.proteinPer100g / 60) * 100)

  return (
    <motion.article
      data-testid="food-card"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35 }}
      className="group relative bg-[#0B1710]/90 backdrop-blur-md rounded-3xl border border-white/10 hover:border-chartreuse/50 transition-all duration-300 hover:shadow-[0_0_35px_rgba(216,243,67,0.12)] flex flex-col justify-between overflow-hidden p-6"
    >
      <div>
        {/* Food Image with High-Res Frame */}
        {food.imageUrl ? (
          <div className="relative w-full h-48 -mt-1 mb-5 rounded-2xl overflow-hidden bg-black/40 border border-white/10">
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="text-[11px] font-mono font-bold text-cream bg-black/75 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                {food.servingDescription}
              </span>
              <span className="text-[11px] font-mono font-black text-forest bg-chartreuse px-2.5 py-1 rounded-md shadow-[0_0_12px_rgba(216,243,67,0.4)]">
                ₹{costPer10gProtein} / 10g
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-32 -mt-1 mb-5 rounded-2xl bg-[#08120C] border border-white/10 flex items-center justify-center font-serif text-lg text-cream font-bold">
            {food.name}
          </div>
        )}

        {/* Category & Status Tags */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/5 text-chartreuse border border-chartreuse/30">
              {food.category.replace('-', ' ')}
            </span>
            {food.affordabilityTier === 'budget-champion' && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-chartreuse text-forest flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" /> Budget King
              </span>
            )}
            {food.isPackaged && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-tangerine/15 text-tangerine border border-tangerine/30 font-bold">
                Packaged
              </span>
            )}
          </div>

          <button
            onClick={() => toggleFavoriteFood(food.id)}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-all cursor-pointer active:scale-95 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
              isFavorite
                ? 'bg-tangerine text-white border-tangerine shadow-sm'
                : 'border-white/15 text-white/50 hover:text-white hover:border-chartreuse/50 bg-black/40'
            }`}
            aria-label={isFavorite ? `Remove ${food.name} from saved` : `Save ${food.name} to library`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title and Hindi description */}
        <div className="mt-3.5 space-y-0.5">
          <h3 className="text-xl font-black font-serif text-cream tracking-tight group-hover:text-chartreuse transition-colors">
            {food.name}
          </h3>
          {food.hindiName && (
            <p className="text-xs font-serif italic text-muted-foreground">{food.hindiName}</p>
          )}
        </div>

        {/* Visual Protein Concentration Bar */}
        <div className="my-4 space-y-1">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-muted-foreground uppercase font-bold">Protein Concentration</span>
            <span className="text-chartreuse font-bold">{food.proteinPer100g}g / 100g</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/60 border border-white/10 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                food.proteinPer100g >= 40 ? 'bg-chartreuse shadow-[0_0_8px_#D8F343]' : food.proteinPer100g >= 20 ? 'bg-leaf' : 'bg-white/40'
              }`}
              style={{ width: `${proteinPercent}%` }}
            />
          </div>
        </div>

        {/* Macro Summary Strip */}
        <div className="grid grid-cols-4 gap-1.5 bg-[#050B07]/80 p-3 rounded-2xl border border-white/10 text-center font-mono">
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Protein</span>
            <span className="text-base font-black text-chartreuse">{food.proteinPer100g}g</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Calories</span>
            <span className="text-base font-bold text-cream">{food.caloriesPer100g}</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Carbs</span>
            <span className="text-xs font-medium text-muted-foreground mt-0.5 block">{food.carbsPer100g}g</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Cost/100g</span>
            <span className="text-xs font-bold text-cream mt-0.5 block">₹{food.estimatedCostPer100g}</span>
          </div>
        </div>

        {/* Short Highlight Insight */}
        <p className="mt-3 text-xs text-cream/70 font-sans leading-relaxed line-clamp-2">
          {food.shortDescription}
        </p>
      </div>

      {/* Action Footer: VS Compare + Basket */}
      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-2">
        <Link
          href={`/compare?foodA=commercial-protein-bar&foodB=${food.id}`}
          className="min-h-[44px] py-2.5 px-3 rounded-xl border border-white/15 text-cream hover:bg-white/10 hover:border-chartreuse hover:text-chartreuse text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 text-center focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>VS Compare</span>
        </Link>

        <button
          onClick={() => addToBasket(food.id, food.servingSizeGrams)}
          className={`min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
            inBasket
              ? 'bg-leaf text-cream border border-leaf'
              : 'bg-chartreuse text-forest hover:bg-white shadow-[0_0_20px_rgba(216,243,67,0.3)] font-black'
          }`}
          aria-label={inBasket ? `${food.name} is in your basket` : `Add ${food.name} to basket`}
        >
          {inBasket ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5 text-forest" />}
          <span>{inBasket ? 'In Basket' : 'Add Basket'}</span>
        </button>
      </div>
    </motion.article>
  )
}
