'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Activity, Sparkles, Calculator as CalcIcon } from 'lucide-react'

export function CalculatorTeaser() {
  const [weight, setWeight] = useState(68)
  const [multiplier, setMultiplier] = useState(1.6) // ACSM / ISSN active recommendation

  const targetProtein = Math.round(weight * multiplier)
  const estimatedCost = Math.round((targetProtein / 10) * 4.5) // standard ₹4.5 average per 10g whole food protein

  return (
    <section className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Explanation */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <CalcIcon className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Chapter III &mdash; Scientific Instrument</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-6">
              Precision Nutrition. <br />
              <span className="italic font-normal text-[#5B6E2C]">Zero Bro-Science.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed mb-8">
              Our target engine implements the American College of Sports Medicine (ACSM) and International Society of Sports Nutrition (ISSN) guidelines. Calculate your exact physiological requirement and simulate authentic Indian food plates within your budget.
            </p>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xs group"
            >
              <span>Open Precision Calorimeter</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Interactive Mini Dial Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white/75 backdrop-blur-md border border-[rgba(91,110,44,0.18)] shadow-lg">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(91,110,44,0.12)] mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#20271D]">
                <Activity className="w-4 h-4 text-[#FF5A22]" />
                <span>Physiological Target Simulator</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7D8D39] font-medium">
                ACSM / ISSN Model
              </span>
            </div>

            {/* Weight Slider */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-baseline">
                <label htmlFor="bodyweight-input" className="text-xs font-mono text-[#737B70]">
                  Body Weight:
                </label>
                <span className="font-display text-2xl font-bold text-[#20271D]">
                  {weight} <span className="text-sm font-sans font-normal text-[#737B70]">kg</span>
                </span>
              </div>
              <input
                id="bodyweight-input"
                type="range"
                min="45"
                max="120"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#5B6E2C] cursor-pointer"
              />
            </div>

            {/* Activity Multiplier Tabs */}
            <div className="space-y-2 mb-8">
              <span className="text-xs font-mono text-[#737B70]">Daily Physical Demand:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Sedentary', val: 0.8 },
                  { label: 'Active', val: 1.6 },
                  { label: 'Athlete', val: 2.0 },
                ].map((tier) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setMultiplier(tier.val)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                      multiplier === tier.val
                        ? 'bg-[#5B6E2C] text-[#F3F6F4] border-[#5B6E2C] shadow-xs'
                        : 'bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.15)] hover:border-[#5B6E2C]'
                    }`}
                  >
                    {tier.label} ({tier.val}g)
                  </button>
                ))}
              </div>
            </div>

            {/* Computed Output Bento */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.15)]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
                  Daily Protein Target
                </span>
                <span className="font-display text-3xl font-bold text-[#5B6E2C] mt-1 block">
                  {targetProtein}g
                </span>
                <span className="text-[10px] text-[#737B70] mt-0.5 block">
                  ~{Math.round(targetProtein / 4)}g per meal (4 meals)
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#737B70] block">
                  Est. Daily Whole-Food Cost
                </span>
                <span className="font-display text-3xl font-bold text-[#FF5A22] mt-1 block">
                  ₹{estimatedCost}
                </span>
                <span className="text-[10px] text-[#737B70] mt-0.5 block">
                  vs ₹{Math.round((targetProtein / 20) * 150)} commercial bars
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
