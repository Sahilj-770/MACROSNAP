'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import { ShoppingBag, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react'

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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050B07]/90 backdrop-blur-xl text-cream transition-all">
      {/* Top micro-bar with issue metadata */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 bg-black/60 text-white/70 text-[10px] font-mono tracking-wider border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-widest uppercase text-chartreuse">MACROSNAP VOL. 2026</span>
          <span className="text-white/30">·</span>
          <span>AUTONOMOUS FOOD BIOLOGY ATELIER</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <span>REAL NUTRITIONAL SCIENCE</span>
          <span>·</span>
          <span>ICMR-NIN BENCHMARKED</span>
          <span>·</span>
          <span className="text-chartreuse font-bold">100% UNBRANDED</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 sm:gap-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-chartreuse shadow-sm group-hover:rotate-6 group-hover:border-chartreuse transition-all flex-shrink-0">
            <BotanicalLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-chartreuse" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-white font-serif uppercase">
                MACRO<span className="text-chartreuse">SNAP</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono bg-chartreuse text-forest px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                RAW
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-mono text-white/50 uppercase tracking-widest -mt-1 hidden sm:block">
              Food intelligence lab
            </p>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 rounded-full text-xs font-medium font-mono uppercase tracking-wider transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  isActive
                    ? 'bg-chartreuse text-forest font-black shadow-md'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Action icons (Basket & Saved library) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            href="/library"
            className="min-h-[44px] flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full border border-white/15 text-xs font-mono font-medium text-white/80 hover:text-white hover:border-chartreuse transition-colors bg-white/5 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            title="Saved foods and recipes"
            aria-label={`Saved library, ${favoriteCount} items`}
          >
            <Bookmark className="w-4 h-4 text-chartreuse" />
            <span className="hidden sm:inline">Saved</span>
            {favoriteCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF5E36] text-white text-[11px] font-bold flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          <Link
            href="/basket"
            className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label={`Shopping basket, ${basketCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-forest" />
            <span className="hidden sm:inline">Basket</span>
            {basketCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-forest text-chartreuse text-[11px] font-black">
                {basketCount}
              </span>
            )}
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-white/10 bg-[#050B07]/98 backdrop-blur-2xl px-6 py-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[50px] p-3.5 rounded-2xl border transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                    isActive
                      ? 'border-chartreuse bg-chartreuse text-forest font-bold'
                      : 'border-white/10 bg-white/5 text-white/80 hover:border-chartreuse/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-60" />
                  </div>
                  <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-forest/80 font-medium' : 'text-cream/60'}`}>
                    {link.subtitle}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-cream/50">VOL. 26 · REVISED FOOD SCIENCE</span>
            <Link
              href="/labels"
              onClick={() => setMobileMenuOpen(false)}
              className="text-chartreuse font-bold underline hover:text-white focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            >
              Label Decoder →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
