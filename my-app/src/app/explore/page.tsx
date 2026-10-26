'use client'

import React, { useState, useMemo } from 'react'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodCard } from '@/components/features/FoodCard'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import { Search, Sparkles, ArrowUpDown, Filter, ShieldCheck, Flame, Wallet } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDietary, setSelectedDietary] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'protein-desc' | 'cost-protein-asc' | 'calories-asc'>('protein-desc')

  const categories = [
    { label: 'All Staples', value: 'all', count: FOOD_DATABASE.length },
    { label: '🌱 Soy Products', value: 'soy-products', count: FOOD_DATABASE.filter((f) => f.category === 'soy-products').length },
    { label: '🥣 Lentils & Legumes', value: 'lentils-legumes', count: FOOD_DATABASE.filter((f) => f.category === 'lentils-legumes').length },
    { label: '🧀 Dairy & Paneer', value: 'dairy', count: FOOD_DATABASE.filter((f) => f.category === 'dairy').length },
    { label: '🍳 Whole Eggs', value: 'eggs', count: FOOD_DATABASE.filter((f) => f.category === 'eggs').length },
    { label: '🥜 Nuts & Seeds', value: 'nuts-seeds', count: FOOD_DATABASE.filter((f) => f.category === 'nuts-seeds').length },
    { label: '🍫 Packaged Bars', value: 'packaged-snack', count: FOOD_DATABASE.filter((f) => f.category === 'packaged-snack').length },
    { label: '⚡ Supplements', value: 'supplements', count: FOOD_DATABASE.filter((f) => f.category === 'supplements').length },
  ]

  const dietaryOptions = [
    { label: 'All Diets', value: 'all' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Dairy-Free', value: 'dairy-free' },
    { label: 'Gluten-Free', value: 'gluten-free' },
  ]

  const filteredFoods = useMemo(() => {
    return FOOD_DATABASE.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (food.hindiName && food.hindiName.includes(searchQuery)) ||
        (food.brand && food.brand.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCat = selectedCategory === 'all' || food.category === selectedCategory
      const matchesDiet = selectedDietary === 'all' || food.dietary.includes(selectedDietary as any)

      return matchesSearch && matchesCat && matchesDiet
    }).sort((a, b) => {
      if (sortBy === 'protein-desc') {
        return b.proteinPer100g - a.proteinPer100g
      }
      if (sortBy === 'cost-protein-asc') {
        const costA = (a.estimatedCostPer100g / a.proteinPer100g) * 10
        const costB = (b.estimatedCostPer100g / b.proteinPer100g) * 10
        return costA - costB
      }
      if (sortBy === 'calories-asc') {
        return a.caloriesPer100g - b.caloriesPer100g
      }
      return 0
    })
  }, [searchQuery, selectedCategory, selectedDietary, sortBy])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <BotanicalLeaf className="w-3.5 h-3.5" />
          <span>Section 01 // The Food Intelligence Index</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-black font-serif tracking-tight text-white">
          Nutrition Explorer
        </h1>
        <p className="text-sm sm:text-base text-cream/70 leading-relaxed">
          Search real laboratory food values benchmarked against the ICMR-NIN Indian Food Composition Tables.
          Compare cost-efficiency, biological availability, and protein density per 100 grams.
        </p>

        {/* Live Credibility Banner */}
        <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs text-cream/70">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-chartreuse" />
            <span>ICMR-NIN Verified Data</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-tangerine" />
            <span>National Kirana & Wholesale Benchmarks</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-chartreuse" />
            <span>Zero Sponsored Rankings</span>
          </div>
        </div>
      </div>

      {/* Visual Filter and Search Console */}
      <div className="p-6 sm:p-8 bg-[#0B1710]/90 backdrop-blur-md rounded-3xl border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, Hindi term (सत्तू, सोया), or packaged brand..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-cream placeholder:text-muted-foreground focus:outline-none focus:border-chartreuse text-sm font-semibold shadow-inner"
            />
          </div>

          {/* Interactive Sort Pills */}
          <div className="flex items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-white/10 flex-wrap">
            <button
              onClick={() => setSortBy('protein-desc')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                sortBy === 'protein-desc'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              Highest Protein
            </button>
            <button
              onClick={() => setSortBy('cost-protein-asc')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                sortBy === 'cost-protein-asc'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              Best Value (₹/10g)
            </button>
            <button
              onClick={() => setSortBy('calories-asc')}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                sortBy === 'calories-asc'
                  ? 'bg-chartreuse text-forest shadow-[0_0_12px_rgba(216,243,67,0.3)] font-black'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              Lowest Calories
            </button>
          </div>
        </div>

        {/* Visual Category Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground font-bold uppercase tracking-wider">
              Filter by Category
            </span>
            <span className="text-chartreuse font-bold">
              Showing {filteredFoods.length} of {FOOD_DATABASE.length} staples
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === cat.value
                    ? 'bg-chartreuse text-forest shadow-[0_0_15px_rgba(216,243,67,0.3)] font-black scale-102'
                    : 'bg-white/5 text-cream/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.value ? 'bg-forest text-chartreuse' : 'bg-white/10 text-cream/70'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Filter Strip */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10 flex-wrap">
          <span className="text-[11px] font-mono text-muted-foreground font-bold uppercase tracking-wider mr-2">
            Dietary:
          </span>
          {dietaryOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelectedDietary(opt.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                selectedDietary === opt.value
                  ? 'bg-tangerine text-white shadow-xs font-bold'
                  : 'bg-white/5 text-cream/70 hover:text-cream border border-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Foods Grid */}
      <div>
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#0B1710]/50 rounded-3xl border-2 border-dashed border-white/15 p-8 space-y-4">
            <p className="text-2xl font-bold font-serif text-white">No food matches your filters</p>
            <p className="text-sm font-mono text-muted-foreground max-w-md mx-auto">
              Try clearing your search query or switching back to &apos;All Staples&apos; to view Indian kitchen and packaged staples.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setSelectedDietary('all')
              }}
              className="px-6 py-3 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
