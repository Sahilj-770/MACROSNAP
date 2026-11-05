'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Trophy, Coins, CheckCircle2 } from 'lucide-react'

const TOP_CONTENDERS = [
  {
    name: 'Soya Chunks (Mealmaker)',
    protein: '52g',
    costPer10g: '₹2.31',
    calories: '345 kcal',
    tag: 'National Champion',
    color: 'bg-[#5B6E2C] text-[#F3F6F4]',
  },
  {
    name: 'Moong Dal (Yellow Split)',
    protein: '24g',
    costPer10g: '₹6.25',
    calories: '348 kcal',
    tag: 'Pantry Staple',
    color: 'bg-[#7D8D39] text-[#F3F6F4]',
  },
  {
    name: 'Roasted Bengal Gram',
    protein: '22.5g',
    costPer10g: '₹6.67',
    calories: '369 kcal',
    tag: 'Zero Cooking',
    color: 'bg-[#7D8D39] text-[#F3F6F4]',
  },
  {
    name: 'Poultry Whole Eggs',
    protein: '13.3g',
    costPer10g: '₹9.68',
    calories: '143 kcal',
    tag: 'Complete DIAAS',
    color: 'bg-[#5B6E2C] text-[#F3F6F4]',
  },
  {
    name: 'Commercial Protein Bar',
    protein: '20g',
    costPer10g: '₹60.00',
    calories: '280 kcal',
    tag: '26× Cost Multiplier',
    color: 'bg-[#FF5A22] text-white',
  },
]

export function BudgetRibbonTeaser() {
  return (
    <section className="relative py-24 z-10 bg-[#F3F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <Coins className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Grocery Economics &bull; Rupee-to-Protein</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-4">
              Hit 100g protein for ₹45. <br />
              <span className="italic font-normal text-[#5B6E2C]">Not ₹250.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
              Western supplements and boutique snacks tell you that getting enough protein requires expensive lifestyle subscriptions. Real Indian kitchen staples provide complete amino acids at a fraction of the cost.
            </p>
          </div>

          <Link
            href="/budget"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xs self-start md:self-auto shrink-0 group"
          >
            <span>Open Protein on Budget</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 5 Contenders Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOP_CONTENDERS.map((item, index) => (
            <div
              key={item.name}
              className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                index === 0
                  ? 'bg-white border-[#5B6E2C] shadow-sm'
                  : index === 4
                  ? 'bg-white border-[rgba(255,90,34,0.3)] shadow-2xs'
                  : 'bg-white border-[rgba(91,110,44,0.18)] shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full ${item.color}`}
                  >
                    {item.tag}
                  </span>
                  {index === 0 && <Trophy className="w-4 h-4 text-[#7D8D39]" />}
                </div>

                <h3 className="font-display text-lg font-bold text-[#20271D] leading-tight mb-2">
                  {item.name}
                </h3>

                <div className="space-y-1 text-xs text-[#737B70] font-mono mt-3">
                  <div>Protein: <span className="font-bold text-[#20271D]">{item.protein}</span> / 100g</div>
                  <div>Energy: {item.calories}</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(91,110,44,0.12)]">
                <span className="text-[10px] uppercase font-mono text-[#737B70] block">
                  Cost per 10g Protein
                </span>
                <span
                  className={`font-display text-2xl font-bold ${
                    index === 4 ? 'text-[#FF5A22]' : 'text-[#5B6E2C]'
                  }`}
                >
                  {item.costPer10g}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
