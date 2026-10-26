'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodCard } from '@/components/features/FoodCard'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import {
  Search,
  Sparkles,
  ShieldCheck,
  Wallet,
  Scale,
  Calculator,
  CookingPot,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

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
    { label: '🌾 Whole Grains', value: 'grains', count: FOOD_DATABASE.filter((f) => f.category === 'grains').length },
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
      const q = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !q ||
        food.name.toLowerCase().includes(q) ||
        (food.hindiName && food.hindiName.toLowerCase().includes(q)) ||
        (food.brand && food.brand.toLowerCase().includes(q)) ||
        (food.shortDescription && food.shortDescription.toLowerCase().includes(q))

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 selection:bg-chartreuse selection:text-forest">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-chartreuse border border-chartreuse/30 text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
          <BotanicalLeaf className="w-3.5 h-3.5" />
          <span>Food Intelligence Pantry · ICMR-NIN Benchmarked</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-white">
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
            <Search className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search food by name, Hindi, category, or nutrient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[48px] pl-12 pr-4 py-3.5 rounded-2xl bg-black/50 border border-white/15 text-white placeholder:text-muted-foreground focus:outline-none focus:border-chartreuse focus-visible:ring-2 focus-visible:ring-chartreuse text-sm font-mono shadow-inner"
              aria-label="Search food database"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-foods" className="text-xs font-mono text-muted-foreground font-bold uppercase whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-foods"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[48px] py-3.5 px-4 rounded-2xl bg-black/50 border border-white/15 text-white text-xs font-mono font-bold focus:outline-none focus:border-chartreuse focus-visible:ring-2 focus-visible:ring-chartreuse cursor-pointer shadow-inner"
            >
              <option value="protein-desc" className="bg-[#050B07] text-white">
                Highest Protein Density (g/100g)
              </option>
              <option value="cost-protein-asc" className="bg-[#050B07] text-white">
                Lowest Cost / 10g Protein (₹)
              </option>
              <option value="calories-asc" className="bg-[#050B07] text-white">
                Lowest Caloric Density
              </option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono">
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
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  selectedCategory === cat.value
                    ? 'bg-chartreuse text-forest shadow-[0_0_15px_rgba(216,243,67,0.3)] font-black scale-102'
                    : 'bg-white/5 text-cream/80 hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.value ? 'bg-forest text-chartreuse font-black' : 'bg-white/10 text-cream/70'
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
              className={`min-h-[44px] px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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
              className="min-h-[44px] px-6 py-3 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Complete Lower-Page Experience: Next Steps in Food Intelligence */}
      <section className="pt-10 border-t border-white/10 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            Put Your Food Knowledge To Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">
            Where to Take Your Pantry Discoveries Next
          </h2>
          <p className="text-sm font-mono text-cream/70 max-w-2xl">
            Now that you know the laboratory values of these staples, explore how to pair, calculate, and cook them without buying into marketing markups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Showdown */}
          <Link
            href="/compare"
            className="group p-6 sm:p-8 rounded-3xl bg-[#0B1710]/80 hover:bg-[#0B1710] border border-white/10 hover:border-chartreuse/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-chartreuse/10 border border-chartreuse/30 flex items-center justify-center text-chartreuse group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black font-serif text-white group-hover:text-chartreuse transition-colors">
                Head-to-Head Showdown
              </h3>
              <p className="text-xs text-cream/75 leading-relaxed font-sans">
                Pit whole foods against packaged snacks side-by-side to expose the true cost difference per 10 grams of protein.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse group-hover:underline">
              <span>Launch Contender Duel</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 2: Calculator */}
          <Link
            href="/calculator"
            className="group p-6 sm:p-8 rounded-3xl bg-[#0B1710]/80 hover:bg-[#0B1710] border border-white/10 hover:border-chartreuse/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-chartreuse/10 border border-chartreuse/30 flex items-center justify-center text-chartreuse group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black font-serif text-white group-hover:text-chartreuse transition-colors">
                Personal Plate Simulator
              </h3>
              <p className="text-xs text-cream/75 leading-relaxed font-sans">
                Calculate your precise daily protein requirement and build a real daily eating plate using pantry staples.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse group-hover:underline">
              <span>Calculate Daily Target</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Card 3: Recipes */}
          <Link
            href="/recipes"
            className="group p-6 sm:p-8 rounded-3xl bg-[#0B1710]/80 hover:bg-[#0B1710] border border-white/10 hover:border-chartreuse/50 transition-all flex flex-col justify-between space-y-6 shadow-xl"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-chartreuse/10 border border-chartreuse/30 flex items-center justify-center text-chartreuse group-hover:scale-105 transition-transform">
                <CookingPot className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black font-serif text-white group-hover:text-chartreuse transition-colors">
                Whole Food Kitchen Lab
              </h3>
              <p className="text-xs text-cream/75 leading-relaxed font-sans">
                Discover 15-minute high-yield Indian recipes engineered with these exact whole ingredients.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-chartreuse group-hover:underline">
              <span>Explore Kitchen Recipes</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {/* Scientific Transparency Callout */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-cream/70">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-chartreuse flex-shrink-0" />
            <span>All values benchmarked against ICMR-NIN Indian Food Composition Tables (IFCT 2017).</span>
          </div>
          <span className="text-cream/50 text-[11px]">Updated Q1 2026 Modal Pricing Index</span>
        </div>
      </section>
    </div>
  )
}
