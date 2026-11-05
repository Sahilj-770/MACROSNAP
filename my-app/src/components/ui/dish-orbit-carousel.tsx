'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { RECIPES } from '@/data/recipes-and-lessons'
import { useUserStore } from '@/store/useUserStore'
import {
  Clock,
  Flame,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Info,
  Scale,
  ListOrdered,
  Layers,
} from 'lucide-react'

// Local verified image mapping for instant zero-latency loading
const RECIPE_FALLBACK_IMAGES: Record<string, string> = {
  'sattu-super-coolant': '/images/food/food_7.webp',
  'kettle-soy-bhurji': '/images/food/food_1.webp',
  'whipped-hung-curd-bowl': '/images/food/food_2.webp',
  'chana-paneer-toss': '/images/food/food_0.webp',
}

const PALETTE_ACCENTS = [
  { stroke: '#5B6E2C', glow: 'rgba(91, 110, 44, 0.25)', bg: 'bg-[#5B6E2C]' },
  { stroke: '#7D8D39', glow: 'rgba(125, 141, 57, 0.25)', bg: 'bg-[#7D8D39]' },
  { stroke: '#FF5A22', glow: 'rgba(255, 90, 34, 0.25)', bg: 'bg-[#FF5A22]' },
  { stroke: '#08482D', glow: 'rgba(8, 72, 45, 0.25)', bg: 'bg-[#08482D]' },
]

export function DishOrbitCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'method'>('overview')
  const [scale, setScale] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [titleAnimationKey, setTitleAnimationKey] = useState(0)

  const addToBasket = useUserStore((state) => state.addToBasket)
  const totalRecipes = RECIPES.length
  const currentRecipe = RECIPES[activeIndex] ?? RECIPES[0]!
  const currentAccent = PALETTE_ACCENTS[activeIndex % PALETTE_ACCENTS.length] ?? PALETTE_ACCENTS[0]!

  // Scaled nutritional computations
  const scaledProtein = useMemo(() => {
    return (currentRecipe.totalProteinPerServingG * scale).toFixed(1)
  }, [currentRecipe, scale])

  const scaledCalories = useMemo(() => {
    return Math.round(currentRecipe.caloriesPerServing * scale)
  }, [currentRecipe, scale])

  const scaledCost = useMemo(() => {
    return Math.round(currentRecipe.estimatedCostPerServingInr * scale)
  }, [currentRecipe, scale])

  // Handle dish change
  const handleSelectRecipe = (index: number) => {
    if (index === activeIndex) return
    const normalized = (index + totalRecipes) % totalRecipes
    setActiveIndex(normalized)
    setTitleAnimationKey((k) => k + 1)
    setIsAdded(false)
  }

  // Handle basket addition
  const handleAddAllToBasket = () => {
    currentRecipe.ingredients.forEach((ing) => {
      if (ing.foodId) {
        addToBasket(ing.foodId, ing.quantityAmount * scale)
      }
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2400)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleSelectRecipe(activeIndex - 1)
      } else if (e.key === 'ArrowRight') {
        handleSelectRecipe(activeIndex + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, totalRecipes])

  // Split title into two lines for two-part wipe
  const titleParts = useMemo(() => {
    const words = currentRecipe.title.split(' ')
    if (words.length <= 3) {
      return { line1: words[0], line2: words.slice(1).join(' ') }
    }
    const mid = Math.ceil(words.length / 2)
    return {
      line1: words.slice(0, mid).join(' '),
      line2: words.slice(mid).join(' '),
    }
  }, [currentRecipe.title])

  // Calculate circular orbit coordinates
  // Orbit radius: R = 210px
  const orbitRadius = 200
  const orbitCenter = { x: 230, y: 230 }

  return (
    <div className="w-full bg-[#F3F6F4] text-[#101410] rounded-3xl border border-[#5B6E2C]/15 shadow-sm overflow-hidden p-4 sm:p-8 lg:p-10 transition-colors duration-700">
      {/* Top Editorial Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#5B6E2C]/15">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span>Orbit Culinary Lab</span>
          </span>
          <span className="text-xs font-mono text-[#7D8D39] font-medium">
            Plate {String(activeIndex + 1).padStart(2, '0')} / {String(totalRecipes).padStart(2, '0')}
          </span>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={() => handleSelectRecipe(activeIndex - 1)}
            aria-label="Previous recipe plate"
            className="w-9 h-9 rounded-full bg-white border border-[#5B6E2C]/20 text-[#20271D] hover:bg-[#5B6E2C] hover:text-white flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleSelectRecipe(activeIndex + 1)}
            aria-label="Next recipe plate"
            className="w-9 h-9 rounded-full bg-white border border-[#5B6E2C]/20 text-[#20271D] hover:bg-[#5B6E2C] hover:text-white flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: Orbital Stage & Information Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-8">
        
        {/* Left Column: The Orbital Dish Arena (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative select-none">
          {/* Orbital Container (460x460 on desktop, 320x320 on mobile) */}
          <div className="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] flex items-center justify-center">
            
            {/* SVG Orbit Track */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 460 460"
              fill="none"
            >
              {/* Soft background orbit track */}
              <circle
                cx="230"
                cy="230"
                r={orbitRadius}
                stroke="#5B6E2C"
                strokeOpacity="0.12"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {/* Animated active accent arc */}
              <circle
                cx="230"
                cy="230"
                r={orbitRadius}
                stroke={currentAccent.stroke}
                strokeOpacity="0.8"
                strokeWidth="3.5"
                strokeDasharray="180 800"
                strokeLinecap="round"
                style={{
                  transformOrigin: '230px 230px',
                  transform: `rotate(${activeIndex * 90}deg)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.6s ease',
                }}
              />
              {/* Glowing accent satellite dot */}
              <circle
                cx={230 + orbitRadius * Math.cos((activeIndex * 90 * Math.PI) / 180)}
                cy={230 + orbitRadius * Math.sin((activeIndex * 90 * Math.PI) / 180)}
                r="6"
                fill={currentAccent.stroke}
                className="transition-all duration-700"
              />
            </svg>

            {/* Orbiting Satellite Dishes */}
            {RECIPES.map((recipe, idx) => {
              const delta = (idx - activeIndex + totalRecipes) % totalRecipes
              // Positions: 0 is center (hero), 1 is top-right, 2 is bottom-right, 3 is bottom-left
              const angleDeg = (delta * (360 / totalRecipes)) - 45
              const angleRad = (angleDeg * Math.PI) / 180
              const isCurrent = idx === activeIndex

              // Orbital satellite dish coordinates
              const xPos = 230 + (orbitRadius * 0.95) * Math.cos(angleRad)
              const yPos = 230 + (orbitRadius * 0.95) * Math.sin(angleRad)
              const fallbackImg = RECIPE_FALLBACK_IMAGES[recipe.id] || recipe.imageUrl || '/images/food/food_0.webp'

              if (isCurrent) return null // Handled by center hero plate

              return (
                <button
                  key={recipe.id}
                  type="button"
                  onClick={() => handleSelectRecipe(idx)}
                  title={`View ${recipe.title}`}
                  className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white shadow-md hover:scale-110 hover:shadow-lg transition-all duration-500 overflow-hidden cursor-pointer bg-[#F3F6F4]"
                  style={{
                    left: `calc(${(xPos / 460) * 100}% - 36px)`,
                    top: `calc(${(yPos / 460) * 100}% - 36px)`,
                    opacity: 0.75,
                  }}
                >
                  <Image
                    src={fallbackImg}
                    alt={recipe.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[#08482D]/20 hover:bg-transparent transition-colors" />
                </button>
              )
            })}

            {/* Central Plated Hero Dish */}
            <div
              key={`hero-plate-${activeIndex}`}
              className="relative z-20 w-[200px] h-[200px] sm:w-[270px] sm:h-[270px] rounded-full p-2 bg-gradient-to-tr from-white to-[#F3F6F4] shadow-2xl border-4 border-white transition-all duration-700 ease-out group"
              style={{
                boxShadow: `0 20px 45px -10px ${currentAccent.glow}, 0 0 0 1px rgba(91, 110, 44, 0.12)`,
              }}
            >
              {/* Inner Plate Ceramic Rim */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#5B6E2C]/15 shadow-inner">
                <Image
                  src={RECIPE_FALLBACK_IMAGES[currentRecipe.id] || currentRecipe.imageUrl || '/images/food/food_0.webp'}
                  alt={currentRecipe.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 200px, 270px"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Delicate subtle vignette */}
                <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10 bg-radial from-transparent via-transparent to-black/20" />
              </div>

              {/* Plated Macro Floating Tag */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#101410] text-[#F3F6F4] text-[11px] font-mono font-bold tracking-tight shadow-md flex items-center gap-1.5 whitespace-nowrap">
                <Zap className="w-3 h-3 text-[#FF5A22]" />
                <span>{scaledProtein}g Protein</span>
              </div>
            </div>
          </div>

          {/* Quick Hindi Title Subtitle under plate */}
          {currentRecipe.hindiTitle && (
            <p className="mt-3 text-xs font-medium text-[#7D8D39] font-sans tracking-wide">
              {currentRecipe.hindiTitle}
            </p>
          )}
        </div>

        {/* Right Column: Recipe Intelligence Dossier (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Eyebrow & Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
              {currentRecipe.dietary.join(' • ')}
            </span>
            <div className="flex items-center gap-1 text-xs text-[#737B70]">
              <Clock className="w-3.5 h-3.5 text-[#5B6E2C]" />
              <span>
                {currentRecipe.prepTimeMinutes + currentRecipe.cookTimeMinutes} min total (
                {currentRecipe.cookTimeMinutes > 0
                  ? `${currentRecipe.cookTimeMinutes}m cook`
                  : 'zero cook'}
                )
              </span>
            </div>
          </div>

          {/* Two-Part Title Wipe */}
          <div key={titleAnimationKey} className="overflow-hidden mb-3">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#101410] tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-3 duration-500">
              <span className="block text-[#101410]">{titleParts.line1}</span>
              <span className="block text-[#5B6E2C] mt-0.5">{titleParts.line2}</span>
            </h2>
          </div>

          {/* Tagline / Description */}
          <p className="text-sm text-[#5E5E61] leading-relaxed mb-6 max-w-xl">
            {currentRecipe.tagline}
          </p>

          {/* Dynamic Serving Scaler Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-white border border-[#5B6E2C]/15 mb-6 shadow-2xs">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#5B6E2C]" />
              <span className="text-xs font-bold text-[#101410] uppercase tracking-wider">
                Serving Scaler:
              </span>
            </div>
            
            <div className="flex items-center gap-1 bg-[#F3F6F4] p-1 rounded-xl border border-[#5B6E2C]/10">
              {[1, 2, 3, 4].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setScale(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    scale === s
                      ? 'bg-[#5B6E2C] text-white shadow-xs'
                      : 'text-[#5E5E61] hover:text-[#101410] hover:bg-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Scaled Macro Highlights Bento Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 text-center shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D8D39] block mb-1">
                Total Protein
              </span>
              <strong className="text-2xl sm:text-3xl font-display font-bold text-[#5B6E2C] block">
                {scaledProtein}g
              </strong>
              <span className="text-[10px] text-[#737B70]">
                ({scale} serving{scale > 1 ? 's' : ''})
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 text-center shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D8D39] block mb-1">
                Net Energy
              </span>
              <strong className="text-2xl sm:text-3xl font-display font-bold text-[#101410] block">
                {scaledCalories}
              </strong>
              <span className="text-[10px] text-[#737B70]">kcal</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#5B6E2C]/15 text-center shadow-2xs">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D8D39] block mb-1">
                Estimated Cost
              </span>
              <strong className="text-2xl sm:text-3xl font-display font-bold text-[#FF5A22] block">
                ₹{scaledCost}
              </strong>
              <span className="text-[10px] text-[#737B70]">kitchen price</span>
            </div>
          </div>

          {/* Dossier Tabs: Overview / Ingredients / Method */}
          <div className="bg-white rounded-2xl border border-[#5B6E2C]/15 p-5 shadow-2xs">
            <div className="flex items-center gap-2 pb-4 border-b border-[#5B6E2C]/10 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-[#5B6E2C] text-white shadow-xs'
                    : 'text-[#5E5E61] hover:text-[#101410] hover:bg-[#F3F6F4]'
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ingredients')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'ingredients'
                    ? 'bg-[#5B6E2C] text-white shadow-xs'
                    : 'text-[#5E5E61] hover:text-[#101410] hover:bg-[#F3F6F4]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Ingredients ({currentRecipe.ingredients.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('method')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'method'
                    ? 'bg-[#5B6E2C] text-white shadow-xs'
                    : 'text-[#5E5E61] hover:text-[#101410] hover:bg-[#F3F6F4]'
                }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Method ({currentRecipe.steps.length} steps)</span>
              </button>
            </div>

            {/* Tab 1: Overview & Packaged Alternative */}
            {activeTab === 'overview' && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-[#5E5E61]">
                  <div>
                    <strong className="text-[#101410]">Required Equipment:</strong>{' '}
                    <span className="capitalize">{currentRecipe.equipment.join(', ')}</span>
                  </div>
                  <div>
                    <strong className="text-[#101410]">Bioavailability standard:</strong>{' '}
                    <span>ICMR-NIN IFCT 2017</span>
                  </div>
                </div>

                {/* Vs Packaged Alternative comparison card */}
                {currentRecipe.comparisonPackagedAlternative && (
                  <div className="p-3.5 rounded-xl bg-[#F3F6F4] border border-[#FF5A22]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5A22]">
                        <Flame className="w-3.5 h-3.5" />
                        <span>Vs. {currentRecipe.comparisonPackagedAlternative.name}</span>
                      </div>
                      <p className="text-[11px] text-[#5E5E61] mt-0.5">
                        Yields {currentRecipe.comparisonPackagedAlternative.proteinG}g protein for ₹
                        {currentRecipe.comparisonPackagedAlternative.costInr * scale}. You save{' '}
                        <strong className="text-[#08482D]">
                          ₹{currentRecipe.comparisonPackagedAlternative.costInr * scale - scaledCost}
                        </strong>{' '}
                        with real food!
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#FF5A22]/10 text-[#FF5A22] text-[10px] font-mono font-bold shrink-0">
                      Save ₹{currentRecipe.comparisonPackagedAlternative.costInr * scale - scaledCost}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Scaled Ingredients List */}
            {activeTab === 'ingredients' && (
              <div className="animate-in fade-in duration-300">
                <ul className="space-y-2.5 text-xs text-[#101410] max-h-56 overflow-y-auto pr-1">
                  {currentRecipe.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center py-1.5 border-b border-[#5B6E2C]/10 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#5B6E2C]" />
                        <span className="font-medium">{ing.name}</span>
                      </div>
                      <div className="font-mono text-[#5E5E61] text-[11px]">
                        <span>
                          {ing.quantityAmount * scale} {ing.quantityUnit}
                        </span>
                        {ing.proteinContributionG > 0 && (
                          <span className="ml-2 font-bold text-[#5B6E2C]">
                            (+{(ing.proteinContributionG * scale).toFixed(1)}g pro)
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 3: Step-by-Step Method */}
            {activeTab === 'method' && (
              <div className="animate-in fade-in duration-300">
                <ol className="space-y-3 text-xs text-[#5E5E61] max-h-56 overflow-y-auto pr-1">
                  {currentRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed text-[#101410]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Bottom Basket Action */}
            <div className="mt-5 pt-4 border-t border-[#5B6E2C]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-[#737B70]">
                Scale: {scale}x • Total items to load: {currentRecipe.ingredients.filter(i => i.foodId).length}
              </span>

              <button
                type="button"
                onClick={handleAddAllToBasket}
                className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-98 w-full sm:w-auto ${
                  isAdded
                    ? 'bg-[#7D8D39] text-white'
                    : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>All Ingredients Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All Ingredients to Basket</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnails Navigation Strip */}
      <div className="mt-8 pt-6 border-t border-[#5B6E2C]/15 flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7D8D39] shrink-0 mr-2">
          Select Plate:
        </span>
        {RECIPES.map((recipe, idx) => {
          const isCurrent = idx === activeIndex
          const fallbackImg = RECIPE_FALLBACK_IMAGES[recipe.id] || recipe.imageUrl || '/images/food/food_0.webp'
          return (
            <button
              key={recipe.id}
              type="button"
              onClick={() => handleSelectRecipe(idx)}
              className={`flex items-center gap-3 px-3 py-2 rounded-2xl transition-all cursor-pointer shrink-0 border ${
                isCurrent
                  ? 'bg-white border-[#5B6E2C] shadow-xs'
                  : 'bg-white/60 border-transparent hover:bg-white text-[#5E5E61]'
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#5B6E2C]/20 shrink-0">
                <Image
                  src={fallbackImg}
                  alt={recipe.title}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p
                  className={`text-xs font-bold line-clamp-1 ${
                    isCurrent ? 'text-[#101410]' : 'text-[#5E5E61]'
                  }`}
                >
                  {recipe.title}
                </p>
                <p className="text-[10px] font-mono text-[#7D8D39]">
                  {recipe.totalProteinPerServingG}g pro • ₹{recipe.estimatedCostPerServingInr}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
