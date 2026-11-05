'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Activity, Calculator as CalcIcon, Sparkles } from 'lucide-react'

export function CalculatorTeaser() {
  const [weight, setWeight] = useState(68)
  const [multiplier, setMultiplier] = useState(1.6)

  const targetProtein = Math.round(weight * multiplier)
  const estimatedCost = Math.round((targetProtein / 10) * 4.5)
  const mealProtein = Math.round(targetProtein / 4)

  return (
    <section className="relative py-28 z-10 bg-[#F5F8EF] text-[#101410] border-t border-[#5B6E2C]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Contextual Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <CalcIcon className="w-3.5 h-3.5 text-[#08482D]" />
              <span>Physiological Simulation &bull; ISSN / ACSM</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-[#101410] leading-[1.02]">
              Precision target. <br />
              <span className="text-[#08482D]">Measured in grams &amp; rupees.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5E5E61] leading-relaxed max-w-xl">
              Commercial apps overwhelm you with complex macro formulas and sponsored powders. Dial in your body mass and training load to compute your exact daily threshold, and see how simple whole foods fulfill it.
            </p>

            {/* Handwritten Human Note */}
            <div className="hidden sm:flex items-center gap-2 pt-2">
              <span className="font-caveat text-2xl text-[#08482D] font-bold">
                No guessing games, strictly evidence &rarr;
              </span>
            </div>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs group"
            >
              <span>Launch Full Target Simulator</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right Column: Instrument Gauge & Interactive Dial */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[#5B6E2C]/20 shadow-sm space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#5B6E2C]/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#08482D] font-bold flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#7D8D39]" />
                Live Requirement Calibration
              </span>
              <span className="text-[10px] font-mono text-[#5E5E61]">
                ACSM / ISSN Standards
              </span>
            </div>

            {/* Interactive Slider: Weight */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#5E5E61]">Body Weight</span>
                <span className="font-bold text-lg text-[#101410]">{weight} kg</span>
              </div>
              <input
                type="range"
                min="45"
                max="115"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#08482D] cursor-pointer"
              />
            </div>

            {/* Interactive Slider: Multiplier */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-[#5E5E61]">Training Load</span>
                <span className="font-bold text-[#08482D]">
                  {multiplier === 1.2 ? 'Sedentary (1.2g/kg)' : multiplier === 1.6 ? 'Moderate / Gym (1.6g/kg)' : 'Athlete / Hypertrophy (2.0g/kg)'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Sedentary', val: 1.2 },
                  { label: 'Gym Regular', val: 1.6 },
                  { label: 'Hypertrophy', val: 2.0 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setMultiplier(item.val)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all text-center ${
                      multiplier === item.val
                        ? 'bg-[#08482D] text-white font-bold shadow-xs'
                        : 'bg-[#F5F8EF] text-[#5E5E61] hover:text-[#101410]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Readout Results */}
            <div className="p-6 rounded-2xl bg-[#F5F8EF] border border-[#5B6E2C]/15 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#5E5E61] block mb-1">
                  Daily Target
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#08482D]">
                  {targetProtein}g
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-[#5E5E61] block mb-1">
                  Est. Daily Cost
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#101410]">
                  ₹{estimatedCost}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-[#5E5E61] block mb-1">
                  Per Meal (4x)
                </span>
                <span className="font-display text-3xl sm:text-4xl font-bold text-[#7D8D39]">
                  {mealProtein}g
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
