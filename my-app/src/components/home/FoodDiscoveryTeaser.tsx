'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, Sparkles, ShieldCheck } from 'lucide-react'

const FEATURED_ARCHIVE_STAPLES = [
  { name: 'Yellow Moong Dal', protein: '24g / 100g', cost: '₹6.25 / 10g', tag: 'Pantry Staple', img: '/images/food/food_1.webp' },
  { name: 'Roasted Sattu', protein: '22.5g / 100g', cost: '₹6.67 / 10g', tag: 'Zero Cooking', img: '/images/food/food_2.webp' },
  { name: 'Cow Milk Paneer', protein: '18g / 100g', cost: '₹18.89 / 10g', tag: 'Dairy Matrix', img: '/images/food/food_4.webp' },
  { name: 'Whole Eggs', protein: '13.3g / 100g', cost: '₹9.68 / 10g', tag: 'DIAAS 1.18', img: '/images/food/food_3.webp' },
]

export function FoodDiscoveryTeaser() {
  return (
    <section className="relative py-24 z-10 bg-[#F5F8EF] text-[#101410] border-t border-[#5B6E2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-[#08482D]" />
              <span>Living Food Archive &bull; 528 Whole Foods</span>
            </div>
            
            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#101410] leading-[1.05]">
              Every Indian staple, <br />
              <span className="text-[#08482D]">clinically catalogued.</span>
            </h2>

            <p className="text-base text-[#5E5E61] leading-relaxed">
              Explore authentic laboratory assays for protein density, amino acid completeness (DIAAS), energy yields, and retail kirana benchmarks.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs self-start md:self-auto shrink-0 group"
          >
            <span>Open Curved Food Shelf</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Monograph Visual Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_ARCHIVE_STAPLES.map((item, idx) => (
            <Link
              key={item.name}
              href="/explore"
              className="group relative rounded-3xl overflow-hidden bg-white border border-[#5B6E2C]/20 shadow-xs hover:border-[#08482D] hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#08482D]/10">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
                  {item.tag}
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#101410] group-hover:text-[#08482D] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono text-[#5E5E61]">
                    {item.protein}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#5B6E2C]/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#08482D] font-bold">
                    {item.cost}
                  </span>
                  <span className="text-xs text-[#7D8D39] font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
