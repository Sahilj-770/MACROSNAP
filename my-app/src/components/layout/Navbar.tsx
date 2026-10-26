'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import {
  ShoppingBag,
  Bookmark,
  Menu,
  X,
  Compass,
  Scale,
  Wallet,
  CookingPot,
  Calculator,
  BookOpen,
  Sparkles,
  ChefHat,
  FileText,
  ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const basketCount = useUserStore((s) => s.basketItems.length)
  const favoriteCount = useUserStore((s) => s.favoriteFoodIds.length + s.favoriteRecipeIds.length)

  // Primary desktop & mobile navigation links
  const navLinks = [
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/compare', label: 'Compare', icon: Scale },
    { href: '/budget', label: 'Budget', icon: Wallet },
    { href: '/recipes', label: 'Recipes', icon: CookingPot },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/learn', label: 'Learn', icon: BookOpen },
  ]

  // Secondary tools accessible via mobile drawer
  const utilityTools = [
    { href: '/kitchen', label: 'Pantry Matcher', desc: 'Find recipes with ingredients you have', icon: ChefHat },
    { href: '/labels', label: 'Label Decoder', desc: 'Unmask marketing claims on packaging', icon: FileText },
  ]

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Accessibility: Handle Escape key to close mobile menu & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050B07]/92 backdrop-blur-xl text-cream transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Wordmark & Botanical Accent */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 rounded-2xl focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none transition-transform"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-chartreuse shadow-sm group-hover:bg-chartreuse/10 group-hover:border-chartreuse/40 group-hover:scale-105 transition-all flex-shrink-0">
            <BotanicalLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-chartreuse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif uppercase">
                MACRO<span className="text-chartreuse">SNAP</span>
              </span>
              <span className="text-[10px] font-mono bg-chartreuse/15 text-chartreuse border border-chartreuse/30 px-1.5 py-0.2 rounded-md font-bold uppercase tracking-wider hidden sm:inline-block">
                RAW
              </span>
            </div>
            <p className="text-[10px] font-mono text-cream/50 uppercase tracking-widest -mt-0.5 hidden sm:block">
              Food Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Primary Navigation with Animated Active Pill */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-colors focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                  isActive ? 'text-forest font-black' : 'text-cream/75 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-chartreuse rounded-full shadow-[0_0_15px_rgba(216,243,67,0.35)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Utility Actions (Saved, Basket & Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Saved Items Link */}
          <Link
            href="/library"
            className={`min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-mono font-bold transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
              pathname === '/library'
                ? 'border-chartreuse bg-chartreuse/15 text-chartreuse shadow-[0_0_12px_rgba(216,243,67,0.25)]'
                : 'border-white/15 bg-white/5 text-cream/80 hover:border-chartreuse/40 hover:text-white'
            }`}
            title="Saved Library"
            aria-label={`Saved collection, ${favoriteCount} items`}
          >
            <Bookmark className="w-4 h-4 text-chartreuse" />
            <span className="hidden sm:inline">Saved</span>
            {favoriteCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-chartreuse text-forest text-[11px] font-black flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </Link>

          {/* Basket Link */}
          <Link
            href="/basket"
            className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-full bg-chartreuse text-forest text-xs font-mono font-black uppercase tracking-wider hover:bg-white hover:scale-102 transition-all shadow-md focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label={`Shopping basket, ${basketCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-forest" />
            <span className="hidden sm:inline">Basket</span>
            {basketCount > 0 && (
              <span className="ml-1 min-w-[20px] h-5 px-1.5 rounded-full bg-forest text-chartreuse text-[11px] font-black flex items-center justify-center">
                {basketCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button (min 44px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-2xl bg-white/5 border border-white/15 text-cream hover:text-chartreuse hover:border-chartreuse/40 transition-colors focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-chartreuse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Modern, Intentional Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden border-t border-white/10 bg-[#050B07]/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-5 py-6 space-y-6">
              {/* Primary Routes Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`min-h-[52px] p-3.5 rounded-2xl border transition-all flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                        isActive
                          ? 'border-chartreuse bg-chartreuse text-forest font-black shadow-[0_0_15px_rgba(216,243,67,0.3)]'
                          : 'border-white/10 bg-white/5 text-cream/90 hover:border-chartreuse/40 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-forest' : 'text-chartreuse'}`} />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Utility Tools Strip */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cream/50 block">
                  Interactive Intelligence Tools
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {utilityTools.map((tool) => {
                    const Icon = tool.icon
                    const isActive = pathname === tool.href
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`min-h-[50px] p-3 rounded-2xl border transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                          isActive
                            ? 'border-chartreuse bg-chartreuse/15 text-chartreuse'
                            : 'border-white/10 bg-white/5 text-cream/80 hover:border-chartreuse/30 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-chartreuse flex-shrink-0" />
                          <div>
                            <strong className="text-xs font-mono font-bold block">{tool.label}</strong>
                            <span className="text-[10px] text-cream/50 block">{tool.desc}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Quick Action Footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-cream/60">
                  <span className="w-2 h-2 rounded-full bg-chartreuse" />
                  <span>100% Unbranded · ICMR-NIN Benchmarked</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-cream/60 hover:text-white text-xs font-mono border border-white/10"
                >
                  Close Menu
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
