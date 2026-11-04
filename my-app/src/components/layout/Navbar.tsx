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

  // Essential desktop navigation links
  const navLinks = [
    { href: '/explore', label: 'Explore', icon: Compass },
    { href: '/compare', label: 'Compare', icon: Scale },
    { href: '/budget', label: 'Budget', icon: Wallet },
    { href: '/calculator', label: 'Calculator', icon: Calculator },
    { href: '/recipes', label: 'Recipes', icon: CookingPot },
  ]

  // Secondary tools accessible in mobile drawer
  const utilityTools = [
    { href: '/learn', label: 'Nutrition Science', desc: 'ICMR-NIN evidence & research', icon: BookOpen },
    { href: '/kitchen', label: 'Pantry Matcher', desc: 'Find meals with what you have', icon: ChefHat },
    { href: '/labels', label: 'Label Decoder', desc: 'Unmask marketing claims', icon: FileText },
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
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050B07]/90 backdrop-blur-xl text-cream transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo on the Left */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3 rounded-2xl focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none transition-transform"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center text-chartreuse shadow-sm group-hover:bg-chartreuse/10 group-hover:border-chartreuse/40 group-hover:scale-105 transition-all flex-shrink-0">
            <BotanicalLeaf className="w-5 h-5 sm:w-6 sm:h-6 text-chartreuse" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-serif uppercase">
            MACRO<span className="text-chartreuse">SNAP</span>
          </span>
        </Link>

        {/* Minimal Essential Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/10"
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

        {/* Right Action: Prominent CTA & Compact Utilities */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Subtle Saved Indicator (only if user saved items) */}
          {favoriteCount > 0 && (
            <Link
              href="/library"
              className="min-h-[44px] hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-mono hover:border-chartreuse/40 text-cream/80 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
              title="Saved Items"
              aria-label={`Saved collection, ${favoriteCount} items`}
            >
              <Bookmark className="w-4 h-4 text-chartreuse" />
              <span className="min-w-[18px] h-4.5 px-1 rounded-full bg-chartreuse text-forest text-[10px] font-black flex items-center justify-center">
                {favoriteCount}
              </span>
            </Link>
          )}

          {/* One Prominent CTA on the Right */}
          <Link
            href="/explore"
            className="min-h-[44px] hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full bg-chartreuse text-forest text-xs font-mono font-black uppercase tracking-wider hover:bg-white hover:scale-105 transition-all shadow-[0_0_20px_rgba(216,243,67,0.25)] focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <span>Explore Foods</span>
            <ArrowRight className="w-3.5 h-3.5 text-forest" />
          </Link>

          {/* Mobile Menu Toggle Button (min 44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-white/5 border border-white/15 text-cream hover:text-chartreuse hover:border-chartreuse/40 transition-colors focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-chartreuse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="md:hidden border-t border-white/10 bg-[#050B07]/98 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-5 py-6 space-y-6">
              {/* Primary Routes */}
              <div className="grid grid-cols-2 gap-2.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`min-h-[50px] p-3 rounded-xl border transition-all flex items-center gap-3 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
                        isActive
                          ? 'border-chartreuse bg-chartreuse text-forest font-black shadow-md'
                          : 'border-white/10 bg-white/5 text-cream/90 hover:border-chartreuse/40 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-forest' : 'text-chartreuse'}`} />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider">{link.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Utility Tools */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-cream/50 block">
                  Interactive Intelligence
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {utilityTools.map((tool) => {
                    const Icon = tool.icon
                    const isActive = pathname === tool.href
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`min-h-[48px] p-3 rounded-xl border transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none ${
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

              {/* User Saved & Basket links */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href="/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-mono text-center text-cream/80 hover:text-white flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-4 h-4 text-chartreuse" />
                  <span>Saved ({favoriteCount})</span>
                </Link>

                <Link
                  href="/basket"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-chartreuse text-forest text-xs font-mono font-black uppercase text-center flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-forest" />
                  <span>Basket ({basketCount})</span>
                </Link>
              </div>

              {/* Drawer Footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cream/50">
                <span>100% Unbranded · ICMR-NIN Benchmarked</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
