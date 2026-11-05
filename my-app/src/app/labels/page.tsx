'use client'

import React, { useState } from 'react'
import { AlertTriangle, Eye, Sparkles, CheckCircle2, Info, BookOpen } from 'lucide-react'

const HOTSPOTS = [
  {
    id: 'front-claim',
    title: 'Front-of-Pack "25g Protein" Headline',
    short: 'Total Pack vs Serving Fractioning',
    riskLevel: 'HIGH',
    uvTag: 'PROTEIN DENSITY CHECK',
    uvDetail: 'REAL DENSITY: 18.2% // PACK WEIGHT: 85G // PADDED WITH INDUSTRIAL GLYCEROL',
    explanation:
      'Brands frequently advertise the total protein for the whole oversized package in giant typography on the front, while placing smaller single-serving panels on the back. The actual protein density is often under 20% by weight, heavily padded with palm oil and polyols.',
    legalLoophole:
      'FSSAI permits front-of-pack claims to reference either per-pack or per-100g values as long as the back table specifies the exact metric.',
    kiranaCountermeasure:
      'Always calculate: (Protein per serving ÷ Total serving weight) × 100. If the result is under 25%, the item is primarily an energy confectionery snack, not a protein food.',
  },
  {
    id: 'serving-tricks',
    title: 'Micro-Serving Size Fractioning',
    short: 'Serving size: "1/3 bar (25g)"',
    riskLevel: 'HIGH',
    uvTag: 'PORTION TRICK',
    uvDetail: 'CLAIMS 120 KCAL // ACTUAL PACK CONSUMED = 360 KCAL // 18G SATURATED FAT',
    explanation:
      'To make calories, saturated fats, and sodium appear harmless, brands calculate values on tiny, unfeasible portion sizes (e.g., 25g of an 85g bar). Real consumers eat the entire item in one sitting, unknowingly consuming 3x the calories and saturated fats.',
    legalLoophole:
      'Serving sizes are determined by brand marketing teams rather than standardized dietary standards.',
    kiranaCountermeasure:
      'Ignore front-of-pack numbers entirely. Look exclusively at the mandatory "Per 100g" column on the back nutrition facts table.',
  },
  {
    id: 'sugar-aliases',
    title: 'Maltitol & Hidden Sugar Alcohols',
    short: '"Zero Added Sugar" but packed with Maltitol Syrup',
    riskLevel: 'HIGH',
    uvTag: 'POLYOL CONTENT',
    uvDetail: 'MALTITOL SYRUP GLYCEMIC INDEX = 52 // 2.1 KCAL/G // DIGESTIVE BLOATING',
    explanation:
      'Maltitol is legally excluded from "added sugar" declarations on Indian labels, yet it carries a Glycemic Index of ~52 (near regular table sugar at 65). It triggers sharp blood glucose spikes and causes gastrointestinal bloating in doses over 15g.',
    legalLoophole:
      'Sugar alcohols (polyols) do not legally qualify as mono- or disaccharides, allowing "Zero Added Sugar" stamps.',
    kiranaCountermeasure:
      'Check the ingredients list for words ending in "-itol" (Maltitol, Sorbitol, Xylitol). If listed in the first 3 ingredients, expect high GI impact.',
  },
  {
    id: 'fractionated-oils',
    title: 'Hydrogenated Vegetable Oils',
    short: 'Industrial palm oil instead of cocoa butter',
    riskLevel: 'MEDIUM',
    uvTag: 'OIL BINDER',
    uvDetail: 'HYDROGENATED PALM KERNEL OIL // MELT POINT ARTIFICIALLY ELEVATED',
    explanation:
      'To provide the glossy chocolate coating and 12-month ambient warehouse shelf stability, cheap hydrogenated palm oils are used instead of real cocoa butter, dramatically spiking atherogenic saturated fatty acids.',
    legalLoophole:
      'Permitted on labels as "Hydrogenated Vegetable Fat" or "Vegetable Fat Compound".',
    kiranaCountermeasure:
      'Choose foods where natural fats originate from peanuts, eggs, milk, or seeds, not hydrogenated kernel palm oils.',
  },
  {
    id: 'protein-quality',
    title: 'Filler Proteins (Collagen & Wheat Gluten)',
    short: 'Low-DIAAS filler proteins inflating nitrogen tests',
    riskLevel: 'HIGH',
    uvTag: 'PROTEIN QUALITY',
    uvDetail: 'HYDROLYZED GELATIN & WHEAT GLUTEN // DIAAS < 0.40 // LACKS TRYPTOPHAN',
    explanation:
      'The protein is often not premium whey isolate, but low-bioavailability wheat gluten (vital wheat gluten, DIAAS < 0.4) and hydrolyzed collagen (deficient in the essential amino acid tryptophan), inflating the lab protein test without building muscle.',
    legalLoophole:
      'Standard Kjeldahl laboratory tests measure total elemental nitrogen, not amino acid completeness or bioavailability.',
    kiranaCountermeasure:
      'Confirm the first protein source listed is "Whey Protein Isolate/Concentrate" or "Milk Protein Concentrate", not "Collagen Peptides" or "Wheat Gluten".',
  },
]

export default function LabelsPage() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]!)
  const [uvMode, setUvMode] = useState(true)

  const currentHotspot = activeHotspot ?? HOTSPOTS[0]!

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F3F6F4]">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-[#5B6E2C] text-xs font-mono uppercase tracking-widest mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Interactive Consumer Guide &bull; Label Inspection</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          Food Label Decoder
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-3xl leading-relaxed">
          Supermarket protein bars and health snacks rely on front-of-pack psychological marketing. Toggle the inspection view below to investigate what common claims really mean according to Indian food labeling regulations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Foil Pack Wrapper */}
        <div className="lg:col-span-6 space-y-6">
          {/* Inspection Mode Controls Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2.5 h-2.5 rounded-full ${uvMode ? 'bg-[#5B6E2C]' : 'bg-gray-400'}`} />
              <span className="font-semibold text-[#20271D]">
                {uvMode ? 'NUTRITION TRUTH INSPECTION ACTIVE' : 'RETAIL PACKAGING VIEW'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setUvMode(!uvMode)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer ${
                uvMode
                  ? 'bg-[#5B6E2C] text-white shadow-2xs'
                  : 'bg-[#F3F6F4] text-[#20271D] border border-[rgba(91,110,44,0.2)]'
              }`}
            >
              {uvMode ? 'View Front Only' : 'Inspect Hidden Labels'}
            </button>
          </div>

          {/* Simulated Foil Wrapper Card */}
          <div
            className={`relative p-8 rounded-3xl transition-all duration-500 overflow-hidden border shadow-md select-none ${
              uvMode
                ? 'bg-[#20271D] border-[#5B6E2C] text-[#F3F6F4]'
                : 'bg-[#2D3825] border-[#5B6E2C]/40 text-[#F3F6F4]'
            }`}
          >
            {/* Top / Bottom Crimped Foil Edge */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-black/30" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30" />

            {/* Simulated Commercial Bar Branding */}
            <div className="relative z-10 space-y-6 my-2">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-mono tracking-widest text-[#7D8D39] uppercase font-bold">
                  COMMERCIAL HIGH-PROTEIN BAR
                </span>
                <span className="text-xs font-mono text-[#FF5A22] font-bold">
                  ₹150.00 MRP
                </span>
              </div>

              {/* Hotspot 1: Front Claim */}
              <div
                onClick={() => setActiveHotspot(HOTSPOTS[0]!)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeHotspot.id === 'front-claim'
                    ? 'border-[#7D8D39] bg-white/10 shadow-xs'
                    : 'border-white/10 hover:border-white/25 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-extrabold tracking-tight text-white">
                    25G PROTEIN*
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#5B6E2C] text-white font-bold">
                    TAP TO INSPECT
                  </span>
                </div>
                {uvMode && (
                  <p className="text-[11px] font-mono text-[#A3B18A] mt-2 font-medium">
                    &bull; Inspection: Real protein density is ~18% by weight (85g pack)
                  </p>
                )}
              </div>

              {/* Hotspot 2 & 3: Claims Ribbon */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[1]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'serving-tricks'
                      ? 'border-[#7D8D39] bg-white/10'
                      : 'border-white/10 hover:border-white/25 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block">120 KCAL*</span>
                  <span className="text-[10px] text-white/70 block">Per Micro-Serving (25g)</span>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-semibold mt-1 block">
                      Full Pack = 360 kcal
                    </span>
                  )}
                </div>

                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[2]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'sugar-aliases'
                      ? 'border-[#7D8D39] bg-white/10'
                      : 'border-white/10 hover:border-white/25 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block">ZERO ADDED SUGAR</span>
                  <span className="text-[10px] text-white/70 block">Sweetened with Maltitol</span>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-semibold mt-1 block">
                      GI ~52, causes bloating
                    </span>
                  )}
                </div>
              </div>

              {/* Hotspots 4 & 5: Ingredients */}
              <div className="space-y-2 pt-2">
                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[3]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'fractionated-oils'
                      ? 'border-[#7D8D39] bg-white/10'
                      : 'border-white/10 hover:border-white/25 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block">Chocolate Flavor Coating</span>
                  <span className="text-[10px] text-white/70 block">
                    Hydrogenated Vegetable Palm Kernel Fat
                  </span>
                </div>

                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[4]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'protein-quality'
                      ? 'border-[#7D8D39] bg-white/10'
                      : 'border-white/10 hover:border-white/25 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block">Protein Blend</span>
                  <span className="text-[10px] text-white/70 block">
                    Soy Crisps, Vital Wheat Gluten, Collagen Hydrolysate
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Educational Dossier Card */}
        <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] font-semibold">
              Label Investigation Dossier
            </span>
            <span className="text-xs font-mono font-bold text-[#FF5A22] px-2.5 py-0.5 rounded-full bg-[#FF5A22]/10">
              {currentHotspot.riskLevel} IMPACT
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#20271D]">
            {currentHotspot.title}
          </h2>

          <p className="text-sm text-[#20271D] leading-relaxed font-sans">
            {currentHotspot.explanation}
          </p>

          <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)]">
            <span className="text-xs font-mono uppercase tracking-wider text-[#7D8D39] font-bold block mb-1">
              FSSAI Regulatory Context:
            </span>
            <p className="text-xs text-[#737B70] leading-relaxed">
              {currentHotspot.legalLoophole}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5B6E2C] font-bold block mb-1">
              Smart Grocery Countermeasure:
            </span>
            <p className="text-xs text-[#20271D] leading-relaxed font-medium">
              {currentHotspot.kiranaCountermeasure}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
