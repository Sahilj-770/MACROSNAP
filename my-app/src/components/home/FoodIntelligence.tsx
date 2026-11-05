'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles, Scale, Info } from 'lucide-react'

export function FoodIntelligence() {
  return (
    <section id="food-intelligence" className="relative py-28 z-10 bg-[#F3F6F4] text-[#101410]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Two-Column Magazine Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Manifesto & Formula */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DAE7C7] border border-[#08482D]/20 text-[#08482D] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
              <span>Standardized Nutrition Yield &bull; ICMR-NIN IFCT 2017</span>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#101410] leading-[1.02]">
                Nutrition without <br />
                <span className="text-[#08482D]">the marketing tax.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#5E5E61] leading-relaxed max-w-2xl">
                Commercial &ldquo;high-protein&rdquo; snacks carry up to a 26× price premium per gram of protein, routinely disguising cheap palm oil, maltitol, and artificial fillers behind front-of-pack claims. MacroSnap benchmarks every ingredient against clinical food composition standards.
              </p>
            </div>

            {/* The ₹/10g Standardized Formula Card */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-white border border-[#5B6E2C]/20 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#5B6E2C]/10">
                <span className="text-xs font-mono uppercase tracking-wider text-[#08482D] font-bold flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#7D8D39]" />
                  The Universal Equalizer: Cost per 10g Protein
                </span>
                <span className="text-[11px] font-mono text-[#5E5E61]">NIN Standard</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F8EF] border border-[#5B6E2C]/15 font-mono text-xs sm:text-sm text-[#08482D] leading-relaxed">
                Cost / 10g Protein = (Cost per 100g &divide; Protein per 100g) &times; 10
              </div>

              <p className="text-xs text-[#5E5E61] leading-relaxed">
                By standardizing across a constant 10 grams of bioavailable protein, brand serving size tricks, water dilution, and packaging fluff evaporate instantly.
              </p>

              {/* Handwritten Note Callout */}
              <div className="hidden sm:flex items-center gap-2 pt-2">
                <span className="font-caveat text-xl text-[#08482D] font-bold">
                  The unvarnished kirana math &rarr;
                </span>
                <span className="text-xs font-mono text-[#7D8D39]">
                  Soya chunks: ₹2.31 &bull; Boutique bar: ₹60.00
                </span>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F3F6F4] text-xs font-semibold uppercase tracking-wider transition-all shadow-xs group"
              >
                <span>Explore Whole Foods Archive</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/labels"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#F5F8EF] text-[#101410] border border-[#5B6E2C]/25 text-xs font-mono uppercase tracking-wider transition-all shadow-2xs"
              >
                <span>Decode Packaged Food Labels</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Large Authentic Visual Plate & Stat Placard */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#5B6E2C]/20 shadow-md aspect-4/5 bg-[#08482D]/10">
              <img
                src="/images/food/food_0.webp"
                alt="Authentic high-protein whole food ingredients"
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Soft Gradient Overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Hand-Drawn Annotation on Photo */}
              <div className="absolute top-6 right-6 z-20" style={{ transform: 'rotate(8deg)' }}>
                <span className="font-caveat font-bold text-white text-2xl drop-shadow-md">
                  52% protein by weight!
                </span>
              </div>

              {/* Overlaid Stat Placard */}
              <div className="absolute left-6 right-6 bottom-6 z-20 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-[#101410] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#08482D] font-bold">
                    Retail Price Contrast
                  </span>
                  <span className="text-[10px] font-mono text-[#FF5A22] font-semibold px-2 py-0.5 rounded-full bg-[#FF5A22]/10">
                    26&times; Multiplier
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#08482D]">
                    ₹2.31
                  </span>
                  <span className="text-xs text-[#5E5E61]">vs ₹60.00 / 10g protein</span>
                </div>

                <p className="text-xs text-[#5E5E61] leading-relaxed pt-1 border-t border-black/5">
                  100g of dry Indian soy chunks provides 52g pure protein for ₹12. Hitting the same protein from a gym bar costs upwards of ₹130.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
