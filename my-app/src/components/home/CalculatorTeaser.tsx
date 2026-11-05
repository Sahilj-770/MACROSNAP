'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Activity, Calculator as CalcIcon, CheckCircle2 } from 'lucide-react'

export function CalculatorTeaser() {
  const [weight, setWeight] = useState(68)
  const [multiplier, setMultiplier] = useState(1.6)

  const targetProtein = Math.round(weight * multiplier)
  const estimatedCost = Math.round((targetProtein / 10) * 4.5)

  return (
    <section className="relative py-24 z-10 bg-[#F3F6F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Explanation */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <CalcIcon className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Daily Target Calculator</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-6">
              Personalized Nutrition. <br />
              <span className="italic font-normal text-[#5B6E2C]">Zero Bro-Science.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed mb-8">
              Calculate your daily protein and calorie requirements based on your body weight and activity level, then see how easily you can meet your target using real Indian whole foods.
            </p>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xs group"
            >
              <span>Open Full Calculator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Interactive Mini Dial Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-sm">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(91,110,44,0.12)] mb-6">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#20271D]">
                <Activity className="w-4 h-4 text-[#5B6E2C]" />
                <span>Quick Protein Target Estimator</span>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#7D8D39] font-medium">
                ACSM / ISSN Standards
              </span>
            </div>

            {/* Slider 1: Body Weight */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#737B70]">Body Weight:</span>
                <span className="font-bold text-[#20271D] text-sm">{weight} kg</span>
              </div>
              <input
                type="range"
                min="45"
                max="120"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#5B6E2C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737B70] font-mono">
                <span>45 kg</span>
                <span>120 kg</span>
              </div>
            </div>

            {/* Slider 2: Activity Goal */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#737B70]">Daily Protein Factor:</span>
                <span className="font-bold text-[#5B6E2C] text-sm">{multiplier.toFixed(1)} g / kg</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.2"
                step="0.1"
                value={multiplier}
                onChange={(e) => setMultiplier(Number(e.target.value))}
                className="w-full accent-[#5B6E2C] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737B70] font-mono">
                <span>1.0g (Sedentary)</span>
                <span>1.6g (Active)</span>
                <span>2.2g (Intense)</span>
              </div>
            </div>

            {/* Result Box */}
            <div className="p-6 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.18)] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                  Recommended Daily Protein
                </span>
                <span className="font-display text-4xl sm:text-5xl font-bold text-[#5B6E2C]">
                  {targetProtein}g
                </span>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-[#737B70] block">
                  Est. Daily Whole Food Cost
                </span>
                <span className="font-display text-2xl font-bold text-[#20271D]">
                  ~₹{estimatedCost}
                </span>
                <span className="text-[10px] text-[#737B70] block">using Indian kitchen staples</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
