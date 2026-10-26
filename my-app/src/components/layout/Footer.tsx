import React from 'react'
import Link from 'next/link'
import { BotanicalLeaf, PlantSeedIcon } from '@/components/illustrations/BotanicalIllustrations'

export function Footer() {
  return (
    <footer className="w-full bg-[#040805] text-cream border-t border-white/10 mt-0">
      {/* Decorative top border ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-chartreuse via-tangerine to-chartreuse" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-chartreuse flex items-center justify-center text-forest">
                <BotanicalLeaf className="w-5 h-5 text-forest" />
              </div>
              <span className="text-2xl font-black font-serif tracking-tight text-cream uppercase">
                MACRO<span className="text-chartreuse">SNAP</span>
              </span>
            </div>
            <p className="text-sm text-cream/80 max-w-sm leading-relaxed">
              An independent, evidence-informed food intelligence publication and utility.
              Demystifying protein economics, comparing packaged food to kitchen staples,
              and championing honest nutritional science.
            </p>
            <div className="pt-2 text-xs font-mono text-chartreuse flex items-center gap-2">
              <PlantSeedIcon className="w-4 h-4 text-chartreuse" />
              <span>EST. 2026 · PEER-REVIEWED METHODOLOGY</span>
            </div>
          </div>

          {/* Core Tools */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-chartreuse uppercase font-bold">
              Discovery Engine
            </h4>
            <ul className="space-y-2 text-sm text-cream/75">
              <li>
                <Link href="/explore" className="hover:text-cream transition-colors">
                  Nutrition Explorer (Indian Foods)
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-cream transition-colors">
                  Food Showdown (Head-to-Head)
                </Link>
              </li>
              <li>
                <Link href="/budget" className="hover:text-cream transition-colors">
                  Protein on a Budget (₹/10g)
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-cream transition-colors">
                  Homemade Lab (Hostel & Kitchen)
                </Link>
              </li>
              <li>
                <Link href="/labels" className="hover:text-cream transition-colors">
                  Label Decoder (FSSAI Guide)
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-cream transition-colors">
                  Personal Protein Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Provenance */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono tracking-widest text-chartreuse uppercase font-bold">
              Provenance & Methodology
            </h4>
            <p className="text-xs text-cream/70 leading-relaxed">
              Composition values are benchmarked against the <strong>ICMR-NIN Indian Food Composition Tables (IFCT)</strong> and verified retail nutrition fact panels. Cost data reflects national modal market averages and verified retail MRPs.
            </p>
            <div className="p-3.5 rounded-xl bg-forest-deep/60 border border-cream/10 text-[11px] text-cream/70 space-y-1">
              <p className="font-bold text-chartreuse font-mono">EDUCATIONAL MEDICAL NOTICE</p>
              <p>
                MACROSNAP provides educational food intelligence and does not formulate individualized medical or dietetic prescriptions. Consult a clinical nutritionist for renal or metabolic concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & micro links */}
        <div className="pt-12 mt-12 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/60 font-mono gap-4">
          <p>© 2026 MACROSNAP. ALL EDITORIAL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <Link href="/learn" className="hover:text-cream">
              Nutrition Myths
            </Link>
            <Link href="/basket" className="hover:text-cream">
              Virtual Basket
            </Link>
            <Link href="/library" className="hover:text-cream">
              Local Library
            </Link>
          </div>
        </div>

        {/* 8B / Forge Automotive-Inspired Grand Editorial Wordmark */}
        <div className="pt-16 pb-4 select-none pointer-events-none overflow-hidden">
          <h2 className="text-[14vw] font-black font-serif text-cream/[0.07] tracking-tighter uppercase leading-none text-center whitespace-nowrap">
            macrosnap
          </h2>
        </div>
      </div>
    </footer>
  )
}
