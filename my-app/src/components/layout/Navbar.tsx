'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { BotanicalLeaf, PlantSeedIcon } from '@/components/illustrations/BotanicalIllustrations'
import { ShoppingBag, Bookmark, Sparkles, Menu, X, ArrowUpRight } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const basketCount = useUserStore((s) => s.basketItems.length)
  const favoriteCount = useUserStore((s) => s.favoriteFoodIds.length + s.favoriteRecipeIds.length)

  const navLinks = [
    { href: '/explore', label: 'Explore Foods', subtitle: 'Pantry index' },
    { href: '/compare', label: 'Showdown', subtitle: 'Head-to-head' },
    { href: '/budget', label: 'Protein on Budget', subtitle: '₹/10g math' },
    { href: '/recipes', label: 'Homemade Lab', subtitle: 'Kitchen recipes' },
    { href: '/calculator', label: 'Calculator', subtitle: 'Personal target' },
    { href: '/learn', label: 'Editorial & Myths', subtitle: 'No bs science' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-[#FAF7F0]/90 backdrop-blur-md transition-all">
      {/* Top micro-bar with issue metadata */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 bg-forest text-[#FAF7F0] text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-widest uppercase">MACROSNAP VOL. 26</span>
          <span className="text-[#FAF7F0]/60">·</span>
          <span>AN INDEPENDENT FOOD & BIO-INTELLIGENCE EXPERIMENT</span>
        </div>
        <div className="flex items-center gap-4 text-[#FAF7F0]/80">
          <span>REAL FOOD VALUES</span>
          <span>·</span>
          <span>NO SYNTHETIC BIAS</span>
          <span>·</span>
          <span className="text-chartreuse font-bold">LIVE DISCOVERY ENGINE</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-forest flex items-center justify-center text-chartreuse shadow-sm group-hover:rotate-6 transition-transform flex-shrink-0">
            <BotanicalLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-chartreuse" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-forest font-serif uppercase">
                MACRO<span className="text-tangerine">SNAP</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono bg-chartreuse/80 text-forest px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                RAW
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-mono text-muted-foreground uppercase tracking-widest -mt-1 hidden sm:block">
              Food intelligence lab
            </p>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-forest text-cream font-bold shadow-sm'
                    : 'text-forest/80 hover:text-forest hover:bg-forest/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action icons (Basket & Saved library) */}
        <div className="flex items-center gap-1 sm:gap-2.5 flex-shrink-0">
          <Link
            href="/library"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-forest/20 text-xs font-medium text-forest hover:bg-forest/5 transition-colors"
            title="Saved foods and recipes"
          >
            <Bookmark className="w-3.5 h-3.5 text-forest" />
            <span className="hidden sm:inline">Saved</span>
            {favoriteCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-tangerine text-cream text-[10px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link
            href="/basket"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-forest text-cream text-xs font-semibold hover:bg-forest-deep transition-all shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-chartreuse" />
            <span className="hidden sm:inline">Basket</span>
            {basketCount > 0 && (
              <span className="ml-0.5 sm:ml-1 px-1.5 py-0.2 rounded-full bg-chartreuse text-forest text-[11px] font-black">
                {basketCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 sm:p-2 rounded-xl text-forest hover:bg-forest/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-[#FAF7F0] px-6 py-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isActive
                      ? 'border-forest bg-forest text-cream'
                      : 'border-forest/15 bg-white/70 text-forest hover:border-forest/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60" />
                  </div>
                  <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-chartreuse' : 'text-muted-foreground'}`}>
                    {link.subtitle}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>VOL. 26 · REVISED FOOD SCIENCE</span>
            <Link
              href="/labels"
              onClick={() => setMobileMenuOpen(false)}
              className="text-forest font-bold underline"
            >
              Label Decoder →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
