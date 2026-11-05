'use client'

import React, { useState } from 'react'
import { AlertTriangle, Eye, ShieldAlert, Sparkles, CheckCircle2, Info, Zap, Flame } from 'lucide-react'

const HOTSPOTS = [
  {
    id: 'front-claim',
    title: 'ZONE 01: FRONT-OF-PACK "25G PROTEIN" CLAIM',
    short: 'Total Pack vs Serving Fractioning',
    riskLevel: 'CRITICAL',
    uvTag: 'PROTEIN DENSITY FRAUD',
    uvDetail: 'REAL DENSITY: 18.2% // PACK WEIGHT: 85G // PADDED WITH INDUSTRIAL GLYCEROL',
    explanation:
      'Manufacturers advertise the total protein for the entire oversized bar (75g–90g) in giant typography on the front, while placing smaller single-serving macro panels on the back. The actual protein density is often under 20% by weight, heavily padded with palm oil and industrial polyols.',
    legalLoophole:
      'FSSAI permits front-of-pack claims to reference either per-pack or per-100g values as long as the back table specifies the exact metric.',
    kiranaCountermeasure:
      'Always calculate: (Protein per serving ÷ Total serving weight) × 100. If the result is under 25%, the item is primarily an energy confectionery bar, not a protein food.',
  },
  {
    id: 'serving-tricks',
    title: 'ZONE 02: MICRO-SERVING SIZE FRACTIONING',
    short: 'Serving size: "1/3 bar (25g)"',
    riskLevel: 'HIGH',
    uvTag: 'SERVING DECEPTION',
    uvDetail: 'CLAIMS 120 KCAL // ACTUAL PACK CONSUMED = 360 KCAL // 18G SATURATED FAT',
    explanation:
      'To make calories, saturated fats, and sodium appear harmless, brands calculate values on tiny, unfeasible portion sizes (e.g., 25g of a 75g bar). Real consumers eat the entire item in one sitting, unknowingly tripling their calorie, sugar alcohol, and saturated fat intake.',
    legalLoophole:
      'Serving sizes are determined arbitrarily by the brand marketing team rather than clinical dietary standards.',
    kiranaCountermeasure:
      'Ignore front-of-pack numbers entirely. Look exclusively at the "Per 100g" column on the mandatory back-of-pack table.',
  },
  {
    id: 'sugar-aliases',
    title: 'ZONE 03: INGREDIENTS LIST & MALTITOL DECEPTION',
    short: '"Zero Added Sugar" but packed with Maltitol Syrup',
    riskLevel: 'CRITICAL',
    uvTag: 'CHEMICAL POLYOL SPIKE',
    uvDetail: 'MALTITOL SYRUP GLYCEMIC INDEX = 52 // 2.1 KCAL/G // OSMOTIC LAXATIVE EFFECT',
    explanation:
      'Maltitol is legally excluded from "added sugar" declarations on Indian labels, yet it carries a Glycemic Index of ~52 (near table sugar at 65). It triggers sharp blood glucose spikes and causes gastrointestinal bloating in doses over 15g.',
    legalLoophole:
      'Sugar alcohols (polyols) do not legally qualify as mono- or disaccharides, allowing "Zero Added Sugar" marketing stamps.',
    kiranaCountermeasure:
      'Check the ingredients list for words ending in "-itol" (Maltitol, Sorbitol, Xylitol). If listed in the top 3 ingredients, expect high GI impact.',
  },
  {
    id: 'fractionated-oils',
    title: 'ZONE 04: FRACTIONATED PALM KERNEL OIL BINDER',
    short: 'Hydrogenated vegetable fat coating',
    riskLevel: 'MEDIUM',
    uvTag: 'INDUSTRIAL LIPID BINDER',
    uvDetail: 'HYDROGENATED PALM KERNEL OIL // MELT POINT ARTIFICIALLY ELEVATED // 0% COCOA BUTTER',
    explanation:
      'To provide the glossy chocolate coating and 12-month ambient warehouse shelf stability, cheap industrial palm oils are used instead of real cocoa butter, dramatically spiking atherogenic saturated fatty acids.',
    legalLoophole:
      'Permitted as "Hydrogenated Vegetable Fat" or "Vegetable Fat Compound".',
    kiranaCountermeasure:
      'Look for authentic foods where natural fats originate from peanuts, eggs, or milk, not fractionated kernel palm oils.',
  },
  {
    id: 'protein-quality',
    title: 'ZONE 05: PROTEIN DILUTION (COLLAGEN & WHEAT GLUTEN)',
    short: 'Low-DIAAS filler proteins inflating nitrogen tests',
    riskLevel: 'HIGH',
    uvTag: 'AMINO SPIKING FILLER',
    uvDetail: 'HYDROLYZED GELATIN & WHEAT GLUTEN // DIAAS < 0.40 // ZERO TRYPTOPHAN',
    explanation:
      'The protein is often not premium whey isolate, but low-bioavailability wheat gluten (vital wheat gluten, DIAAS < 0.4) and hydrolyzed bovine/porcine collagen (deficient in the essential amino acid tryptophan), inflating the lab protein test without building muscle.',
    legalLoophole:
      'Standard Kjeldahl laboratory tests measure total elemental nitrogen, not amino acid completeness or bioavailability.',
    kiranaCountermeasure:
      'Confirm the first protein source listed is "Whey Protein Isolate/Concentrate" or "Milk Protein Concentrate", not "Collagen Peptides" or "Wheat Protein".',
  },
]

export default function LabelsPage() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]!)
  const [uvMode, setUvMode] = useState(true)

  const currentHotspot = activeHotspot ?? HOTSPOTS[0]!

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5A22]/10 text-[#FF5A22] text-xs font-mono uppercase tracking-widest mb-3 border border-[#FF5A22]/20">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Forensic Supermarket Packaging Scanner</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight">
          The Foil Pack Decoder
        </h1>
        <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-3xl leading-relaxed">
          Supermarket protein bars and cookies rely on front-of-pack psychological triggers. Toggle the forensic ultraviolet blacklight scanner below to illuminate the hidden chemical realities, polyol laxative thresholds, and micro-serving manipulation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Foil Pack Wrapper with UV Scanner */}
        <div className="lg:col-span-6 space-y-6">
          {/* Scanner Controls Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.18)] shadow-xs">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2.5 h-2.5 rounded-full ${uvMode ? 'bg-[#FF5A22] animate-pulse' : 'bg-gray-400'}`} />
              <span className="font-semibold text-[#20271D]">
                {uvMode ? 'UV FORENSIC BLACKLIGHT ACTIVE' : 'STANDARD RETAIL VIEW'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setUvMode(!uvMode)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                uvMode
                  ? 'bg-[#FF5A22] text-white shadow-xs'
                  : 'bg-[#F3F6F4] text-[#20271D] border border-[rgba(91,110,44,0.2)]'
              }`}
            >
              {uvMode ? 'Switch to Retail View' : 'Activate UV Blacklight'}
            </button>
          </div>

          {/* Simulated Glossy Foil Wrapper Card */}
          <div
            className={`relative p-8 rounded-3xl transition-all duration-500 overflow-hidden border-2 shadow-2xl select-none ${
              uvMode
                ? 'bg-[#181326] border-[#FF5A22]/50 text-[#F3F6F4]'
                : 'bg-gradient-to-r from-[#20271D] via-[#2A3426] to-[#20271D] border-[#5B6E2C]/40 text-[#F3F6F4]'
            }`}
          >
            {/* Crinkled Metallic Foil Sheen */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 12px)',
              }}
              aria-hidden="true"
            />

            {/* Jagged Foil Wrapper Crimped Edges (Top & Bottom) */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-black/40 border-b border-white/20" />
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/40 border-t border-white/20" />

            {/* Simulated Commercial Bar Branding */}
            <div className="relative z-10 space-y-6 my-2">
              <div className="flex items-center justify-between border-b border-white/20 pb-3">
                <span className="text-xs font-mono tracking-widest text-[#7D8D39] uppercase font-bold">
                  KINETIC BIO-BAR // RETAIL EDITION
                </span>
                <span className="text-xs font-mono text-[#FF5A22] font-bold">
                  ₹160.00 MRP
                </span>
              </div>

              {/* Hotspot 1: Front Claim */}
              <div
                onClick={() => setActiveHotspot(HOTSPOTS[0]!)}
                className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                  activeHotspot.id === 'front-claim'
                    ? 'border-[#FF5A22] bg-[#FF5A22]/15 shadow-md'
                    : 'border-white/10 hover:border-white/30 bg-black/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-extrabold tracking-tight text-white">
                    25G PROTEIN*
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5A22] text-white font-bold">
                    HOTSPOT 01
                  </span>
                </div>
                {uvMode && (
                  <p className="text-[11px] font-mono text-[#FF5A22] mt-2 font-bold animate-pulse">
                    ⚠ UV SCAN: REAL DENSITY ONLY 18.2% &bull; PACK WEIGHT 85G
                  </p>
                )}
              </div>

              {/* Hotspot 2 & 3: Claims Ribbon */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[1]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'serving-tricks'
                      ? 'border-[#FF5A22] bg-[#FF5A22]/15'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block">120 KCAL*</span>
                  <span className="text-[10px] text-white/70 block">Per Serving</span>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-bold mt-1 block">
                      ⚠ REAL PACK: 360 KCAL
                    </span>
                  )}
                </div>

                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[2]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'sugar-aliases'
                      ? 'border-[#FF5A22] bg-[#FF5A22]/15'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  <span className="text-xs font-bold block text-[#A3B18A]">ZERO ADDED SUGAR</span>
                  <span className="text-[10px] text-white/70 block">Sweetened with Polyols</span>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-bold mt-1 block">
                      ⚠ MALTITOL SYRUP GI=52
                    </span>
                  )}
                </div>
              </div>

              {/* Hotspot 4 & 5: Back Table Ingredients */}
              <div className="space-y-3 pt-2">
                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[3]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'fractionated-oils'
                      ? 'border-[#FF5A22] bg-[#FF5A22]/15'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Binder: Hydrogenated Vegetable Fat</span>
                    <span className="text-[10px] font-mono text-[#7D8D39]">ZONE 04</span>
                  </div>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-bold mt-1 block">
                      ⚠ PALM KERNEL OIL FRACTION &bull; 0% REAL COCOA BUTTER
                    </span>
                  )}
                </div>

                <div
                  onClick={() => setActiveHotspot(HOTSPOTS[4]!)}
                  className={`p-3 rounded-xl cursor-pointer transition-all border ${
                    activeHotspot.id === 'protein-quality'
                      ? 'border-[#FF5A22] bg-[#FF5A22]/15'
                      : 'border-white/10 hover:border-white/30 bg-black/20'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/80">Protein Blend: Whey, Wheat Gluten &amp; Collagen</span>
                    <span className="text-[10px] font-mono text-[#7D8D39]">ZONE 05</span>
                  </div>
                  {uvMode && (
                    <span className="text-[9px] font-mono text-[#FF5A22] font-bold mt-1 block">
                      ⚠ WHEAT GLUTEN &amp; GELATIN FILLER &bull; DIAAS &lt; 0.40
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Zone Navigator Buttons */}
          <div className="flex flex-wrap gap-2">
            {HOTSPOTS.map((spot, i) => (
              <button
                key={spot.id}
                type="button"
                onClick={() => setActiveHotspot(spot)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  activeHotspot.id === spot.id
                    ? 'bg-[#FF5A22] text-white shadow-xs'
                    : 'bg-white text-[#20271D] border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C]'
                }`}
              >
                ZONE 0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Forensic Chemical Dossier */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] shadow-lg space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.12)]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A22] font-semibold">
                {currentHotspot.uvTag}
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#FF5A22]/10 text-[#FF5A22] font-bold">
                {currentHotspot.riskLevel} RISK
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#20271D] leading-tight">
              {currentHotspot.title}
            </h2>

            <div className="p-4 rounded-2xl bg-[rgba(255,90,34,0.08)] border border-[rgba(255,90,34,0.2)] text-xs font-mono text-[#FF5A22] font-medium leading-relaxed">
              FORENSIC LAB FINDING: <br />
              {currentHotspot.uvDetail}
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#20271D] leading-relaxed">
              <p>{currentHotspot.explanation}</p>
            </div>

            {/* Legal Loophole Breakdown */}
            <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.18)] space-y-1.5 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#5B6E2C] font-bold block">
                The Regulatory Loophole
              </span>
              <p className="text-[#737B70] leading-relaxed">
                {currentHotspot.legalLoophole}
              </p>
            </div>

            {/* Kirana Countermeasure */}
            <div className="p-4 rounded-2xl bg-[rgba(125,141,57,0.1)] border border-[rgba(91,110,44,0.2)] space-y-1.5 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#5B6E2C] font-bold block">
                Shopper Countermeasure
              </span>
              <p className="text-[#20271D] font-medium leading-relaxed">
                {currentHotspot.kiranaCountermeasure}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
