'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import { Bookmark, ShoppingBag, Scale, Sparkles, Plus, Check } from 'lucide-react'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl border-2 border-forest/15 p-6 hover:border-forest transition-all hover:shadow-xl flex flex-col justify-between overflow-hidden"
    >
      <div>
        {/* Food Image with High-Res Frame */}
        {food.imageUrl ? (
          <div className="relative w-full h-48 -mt-1 mb-5 rounded-2xl overflow-hidden bg-forest/5 border border-forest/10">
            <Image
              src={food.imageUrl}
              alt={food.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="text-[11px] font-mono font-bold text-cream bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                {food.servingDescription}
              </span>
              <span className="text-[11px] font-mono font-black text-chartreuse bg-forest/90 px-2.5 py-1 rounded-md">
                ₹{costPer10gProtein} / 10g
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-32 -mt-1 mb-5 rounded-2xl bg-[#FAF7F0] border border-forest/15 flex items-center justify-center font-serif text-lg text-forest font-bold">
            {food.name}
          </div>
        )}

        {/* Category & Status Tags */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-forest/5 text-forest border border-forest/15">
              {food.category.replace('-', ' ')}
            </span>
            {food.affordabilityTier === 'budget-champion' && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-chartreuse text-forest flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3" /> Budget King
              </span>
            )}
            {food.isPackaged && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-tangerine/10 text-tangerine border border-tangerine/20 font-bold">
                Packaged
              </span>
            )}
          </div>

          <button
            onClick={() => toggleFavoriteFood(food.id)}
            className={`p-2 rounded-full border transition-all cursor-pointer active:scale-95 ${
              isFavorite
                ? 'bg-tangerine text-white border-tangerine shadow-sm'
                : 'border-forest/15 text-forest/40 hover:text-forest hover:border-forest bg-white'
            }`}
            aria-label={isFavorite ? 'Remove from saved' : 'Save food'}
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
        </div>

        {/* Title and Hindi description */}
        <div className="mt-3.5 space-y-0.5">
          <h3 className="text-xl font-black font-serif text-forest tracking-tight group-hover:text-tangerine transition-colors">
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
            <span className="text-forest font-bold">{food.proteinPer100g}g / 100g</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#FAF7F0] border border-forest/15 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                food.proteinPer100g >= 40 ? 'bg-chartreuse' : food.proteinPer100g >= 20 ? 'bg-leaf' : 'bg-forest'
              }`}
              style={{ width: `${proteinPercent}%` }}
            />
          </div>
        </div>

        {/* Macro Summary Strip */}
        <div className="grid grid-cols-4 gap-1.5 bg-[#FAF7F0] p-3 rounded-2xl border border-forest/10 text-center font-mono">
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Protein</span>
            <span className="text-base font-black text-forest">{food.proteinPer100g}g</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Calories</span>
            <span className="text-base font-bold text-forest">{food.caloriesPer100g}</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Carbs</span>
            <span className="text-xs font-medium text-muted-foreground mt-0.5 block">{food.carbsPer100g}g</span>
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground block uppercase">Cost/100g</span>
            <span className="text-xs font-bold text-forest mt-0.5 block">₹{food.estimatedCostPer100g}</span>
          </div>
        </div>

        {/* Short Highlight Insight */}
        <p className="mt-3 text-xs text-forest/70 font-sans leading-relaxed line-clamp-2">
          {food.shortDescription}
        </p>
      </div>

      {/* Action Footer: VS Compare + Basket */}
      <div className="mt-5 pt-4 border-t border-forest/10 grid grid-cols-2 gap-2">
        <Link
          href={`/compare?foodA=commercial-protein-bar&foodB=${food.id}`}
          className="py-2.5 px-3 rounded-xl border border-forest/20 text-forest hover:bg-forest hover:text-chartreuse hover:border-forest text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 text-center"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>VS Compare</span>
        </Link>

        <button
          onClick={() => addToBasket(food.id, food.servingSizeGrams)}
          className={`py-2.5 px-3 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            inBasket
              ? 'bg-leaf text-cream border border-leaf'
              : 'bg-forest text-cream hover:bg-forest-deep shadow-2xs'
          }`}
        >
          {inBasket ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5 text-chartreuse" />}
          <span>{inBasket ? 'In Basket' : 'Add Basket'}</span>
        </button>
      </div>
    </motion.div>
  )
}
