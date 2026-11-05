'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Trophy, Zap, TrendingDown, Coins } from 'lucide-react'

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
    tag: 'DIAAS 1.18 Complete',
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
    <section className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <Coins className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Chapter II &mdash; Macro Economics</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-4">
              Protein on a Budget. <br />
              <span className="italic font-normal text-[#5B6E2C]">Stop paying the gym-bro tax.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
              Why pay ₹150 for a synthetic bar with 20g of protein when 50g of soya chunks delivers 26g of pure biological protein for ₹6.00?
            </p>
          </div>

          <Link
            href="/budget"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase hover:bg-[#7D8D39] transition-all shadow-xs shrink-0 self-start md:self-end"
          >
            <span>Launch 3D Video Ribbon</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Contenders Horizontal Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOP_CONTENDERS.map((item, idx) => {
            const isBar = item.costPer10g === '₹60.00'
            return (
              <div
                key={item.name}
                className={`p-6 rounded-3xl border transition-all duration-300 backdrop-blur-md ${
                  isBar
                    ? 'bg-[#FF5A22]/10 border-[#FF5A22]/40 shadow-xs'
                    : 'bg-white/75 border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] shadow-xs hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full ${item.color}`}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-[#737B70]">
                    #{idx + 1}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-[#20271D] mb-4 leading-snug">
                  {item.name}
                </h3>

                <div className="space-y-2.5 pt-4 border-t border-[rgba(91,110,44,0.12)]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-[#737B70] font-mono">Cost / 10g:</span>
                    <span
                      className={`font-mono font-bold text-lg ${
                        isBar ? 'text-[#FF5A22]' : 'text-[#5B6E2C]'
                      }`}
                    >
                      {item.costPer10g}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#737B70] font-mono">Protein / 100g:</span>
                    <span className="font-semibold text-[#20271D]">{item.protein}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#737B70] font-mono">Energy:</span>
                    <span className="text-[#737B70]">{item.calories}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Economics Insight Callout Banner */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.18)] flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5B6E2C] text-white flex items-center justify-center shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#20271D]">
                The Average Indian Household Saves ₹3,420 Every Month
              </h4>
              <p className="text-xs text-[#737B70] mt-0.5">
                By substituting commercial isolate bars with boiled eggs, roasted sattu, and soya chunks.
              </p>
            </div>
          </div>
          <Link
            href="/budget"
            className="px-5 py-2.5 rounded-full border border-[rgba(91,110,44,0.3)] text-xs font-mono font-medium uppercase text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] transition-all shrink-0"
          >
            Calculate Household Savings
          </Link>
        </div>
      </div>
    </section>
  )
}
