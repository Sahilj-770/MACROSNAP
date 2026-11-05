import React from 'react'
import Link from 'next/link'
import { ShieldCheck, Heart, Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#20271D] text-[#F3F6F4] pt-16 pb-12 border-t border-[rgba(91,110,44,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[rgba(243,246,244,0.12)]">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7D8D39] flex items-center justify-center text-[#F3F6F4] font-semibold text-sm">
                M
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-[#F3F6F4]">
                MacroSnap
              </span>
            </div>
            <p className="text-xs text-[#737B70] leading-relaxed">
              Biological food values, Indian dietary benchmarks, and uncompromised rupee-to-protein economics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#7D8D39]">
              <ShieldCheck className="w-4 h-4" />
              <span>ICMR-NIN IFCT 2017 Verified</span>
            </div>
          </div>

          {/* Intelligence Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold">
              Intelligence
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#F3F6F4]/80">
              <Link href="/explore" className="hover:text-[#FF5A22] transition-colors">
                Food Discovery Archive
              </Link>
              <Link href="/budget" className="hover:text-[#FF5A22] transition-colors">
                Protein on a Budget
              </Link>
              <Link href="/compare" className="hover:text-[#FF5A22] transition-colors">
                Nutritional Duel
              </Link>
              <Link href="/labels" className="hover:text-[#FF5A22] transition-colors">
                Foil Pack Label Decoder
              </Link>
            </div>
          </div>

          {/* Tools Navigation */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold">
              Interactive Tools
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#F3F6F4]/80">
              <Link href="/calculator" className="hover:text-[#FF5A22] transition-colors">
                Scientific Target Calculator
              </Link>
              <Link href="/recipes" className="hover:text-[#FF5A22] transition-colors">
                Whole Food Recipe Lab
              </Link>
              <Link href="/kitchen" className="hover:text-[#FF5A22] transition-colors">
                Pantry Ingredient Matcher
              </Link>
              <Link href="/basket" className="hover:text-[#FF5A22] transition-colors">
                Grocery Ledger
              </Link>
            </div>
          </div>

          {/* Science & Education */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold">
              Science & Dossiers
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#F3F6F4]/80">
              <Link href="/learn" className="hover:text-[#FF5A22] transition-colors">
                Myth Busters Dossier
              </Link>
              <span className="text-[11px] text-[#737B70]">
                Standard Formula: (Cost per 100g / Protein per 100g) × 10 = ₹ / 10g Protein
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#737B70]">
          <p>
            © {new Date().getFullYear()} MacroSnap. Democratizing nutrition science with transparent data.
          </p>
          <p className="max-w-md text-center sm:text-right">
            Disclaimer: Educational data tool based on published IFCT benchmarks. Not a substitute for clinical medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
