'use client'

import React from 'react'
import Link from 'next/link'
import { Search, Calculator, ChefHat, ArrowRight, CheckCircle2 } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Search Whole Staples',
      description: 'Access lab-verified nutritional data for 30+ staples benchmarked against the ICMR-NIN Indian Food Composition Tables.',
      icon: Search,
      preview: (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-cream/50">
            <span>IFCT ID: IFCT_B012</span>
            <span className="text-chartreuse font-bold">Unprocessed</span>
          </div>
          <div className="font-bold font-serif text-white text-sm">
            Roasted Bengal Gram (Chana)
          </div>
          <div className="flex items-center justify-between text-cream/70 pt-1 border-t border-white/5">
            <span>Protein: <strong>22.5g</strong></span>
            <span>Fiber: <strong>16.8g</strong></span>
            <span className="text-chartreuse">₹7.50 / 50g</span>
          </div>
        </div>
      ),
    },
    {
      step: '02',
      title: 'Audit Rupee Economics',
      description: 'Calculate the true cost per 10g of bioavailable protein. Uncover how kitchen staples outperform fitness snacks.',
      icon: Calculator,
      preview: (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-cream/50">
            <span>Cost Efficiency Metric</span>
            <span className="text-chartreuse font-bold">96% Savings</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-cream/80">Soy Chunks</span>
              <strong className="text-chartreuse font-black">₹2.30 / 10g</strong>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-chartreuse rounded-full w-[12%]" />
            </div>
            <div className="flex items-center justify-between text-cream/50 pt-1">
              <span>Protein Bar</span>
              <span className="text-tangerine font-bold">₹60.00 / 10g</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      step: '03',
      title: 'Build Your Optimal Plate',
      description: 'Hit your daily leucine threshold (2.7g) and target protein with honest, 15-minute home meals and zero guilt.',
      icon: ChefHat,
      preview: (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between text-[11px] text-cream/50">
            <span>Daily Target Meter</span>
            <span className="text-chartreuse font-bold">Leucine 2.8g (Triggered)</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">Protein Intake</span>
              <span className="text-chartreuse font-bold">115g / 120g</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-chartreuse rounded-full w-[95%]" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-cream/60 pt-1 border-t border-white/5">
            <span>Total Day Cost: <strong className="text-white">₹58.00</strong></span>
            <span className="flex items-center gap-1 text-chartreuse">
              <CheckCircle2 className="w-3 h-3" /> Met
            </span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section id="how-it-works" className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#050B07] text-cream">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-chartreuse block">
            The Three-Step Method
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            How MacroSnap Works
          </h2>
          <p className="text-sm sm:text-base font-mono text-cream/70 leading-relaxed">
            Three straightforward steps from fitness marketing confusion to evidence-based nutrition economics.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="p-6 sm:p-7 rounded-2xl bg-[#0B1710] border border-white/10 flex flex-col justify-between space-y-6 hover:border-chartreuse/40 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-4">
                  {/* Step Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-mono text-chartreuse">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-chartreuse">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold font-serif text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cream/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Micro UI Preview Centerpiece */}
                <div className="pt-2">
                  {item.preview}
                </div>
              </div>
            )
          })}
        </div>

        {/* Section Bottom Sub-link */}
        <div className="text-center pt-2">
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors"
          >
            <span>Try the Personal Daily Protein Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
