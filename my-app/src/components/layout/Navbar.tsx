'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import {
  ShoppingBag,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  TrendingDown,
  Calculator,
  Compass,
  Swords,
  ChefHat,
  ScanLine,
  ChevronDown,
} from 'lucide-react'

const PRIMARY_LINKS = [
  { href: '/explore', label: 'Book Archive', icon: BookOpen },
  { href: '/budget', label: 'Economics', icon: TrendingDown },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
  { href: '/learn', label: 'Myth Busters', icon: Compass },
]

const SECONDARY_LINKS = [
  { href: '/compare', label: 'Nutritional Duel', desc: 'Side-by-side food showdown', icon: Swords },
  { href: '/recipes', label: 'Whole Food Lab', desc: '15-min recipes with dynamic scaler', icon: ChefHat },
  { href: '/kitchen', label: 'Pantry Matcher', desc: 'Cook with what you already have', icon: Sparkles },
  { href: '/labels', label: 'Label Decoder', desc: 'UV forensic packaging scanner', icon: ScanLine },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [labDropdownOpen, setLabDropdownOpen] = useState(false)
  const basketItems = useUserStore((state) => state.basketItems)
  const totalBasketCount = basketItems.reduce(
    (acc, item) => acc + (item.quantityGrams > 0 ? 1 : 0),
    0
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setLabDropdownOpen(false)
  }, [pathname])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const isSecondaryActive = SECONDARY_LINKS.some((item) => pathname === item.href)
  const isDarkHero = (pathname === '/learn' || pathname === '/') && !scrolled

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#F3F6F4]/95 backdrop-blur-md border-b border-[rgba(91,110,44,0.18)] shadow-xs'
            : isDarkHero
            ? 'py-4 sm:py-5 bg-transparent border-b border-white/10'
            : 'py-4 sm:py-5 bg-[#F3F6F4]/80 backdrop-blur-xs border-b border-[rgba(91,110,44,0.08)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Monogram & Logotype */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-hidden select-none"
              aria-label="MacroSnap Home"
            >
              <div
                className={`relative w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-transform duration-300 group-hover:scale-105 shadow-xs border ${
                  isDarkHero
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] border-white/30'
                    : 'bg-[#5B6E2C] text-[#F3F6F4] border-[#7D8D39]/40'
                }`}
              >
                <span className="font-display italic text-base">M</span>
                {/* Botanical Pulse Spore */}
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#FF5A22] border-2 border-[#F3F6F4] animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-display text-2xl font-bold tracking-tight leading-none ${
                      isDarkHero ? 'text-white' : 'text-[#20271D]'
                    }`}
                  >
                    MacroSnap
                  </span>
                  <span
                    className={`hidden xl:inline-block px-1.5 py-0.5 rounded-xs text-[9px] font-mono font-medium tracking-wide border ${
                      isDarkHero
                        ? 'bg-white/15 text-[#A3B18A] border-white/20'
                        : 'bg-[#7D8D39]/15 text-[#5B6E2C] border-[#7D8D39]/30'
                    }`}
                  >
                    IFCT 2017
                  </span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest font-medium font-sans ${
                    isDarkHero ? 'text-[#A3B18A]' : 'text-[#7D8D39]'
                  }`}
                >
                  Know what you eat
                </span>
              </div>
            </Link>

            {/* Center: Curated Aerodynamic Navigation Dock */}
            <nav
              className={`hidden lg:flex items-center p-1 rounded-full backdrop-blur-sm border shadow-xs ${
                isDarkHero
                  ? 'bg-black/40 border-white/20 text-white'
                  : 'bg-[#F3F6F4]/90 border-[rgba(91,110,44,0.18)] text-[#20271D]'
              }`}
            >
              {PRIMARY_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#F3F6F4] bg-[#5B6E2C] shadow-xs font-semibold'
                        : isDarkHero
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-[#20271D] hover:text-[#5B6E2C] hover:bg-[rgba(91,110,44,0.08)]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                )
              })}

              {/* Culinary & Forensic Lab Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLabDropdownOpen(!labDropdownOpen)}
                  onMouseEnter={() => setLabDropdownOpen(true)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    isSecondaryActive || labDropdownOpen
                      ? 'text-[#F3F6F4] bg-[#5B6E2C] font-semibold'
                      : isDarkHero
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : 'text-[#20271D] hover:text-[#5B6E2C] hover:bg-[rgba(91,110,44,0.08)]'
                  }`}
                  aria-expanded={labDropdownOpen}
                >
                  <span>Lab &amp; Tools</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      labDropdownOpen ? 'rotate-180' : 'opacity-60'
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {labDropdownOpen && (
                  <div
                    onMouseLeave={() => setLabDropdownOpen(false)}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 rounded-2xl bg-[#F3F6F4] text-[#20271D] border border-[rgba(91,110,44,0.2)] shadow-2xl p-2 flex flex-col gap-1 z-[110] animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] border-b border-[rgba(91,110,44,0.12)] mb-1">
                      Interactive Instruments
                    </div>
                    {SECONDARY_LINKS.map((subItem) => {
                      const Icon = subItem.icon
                      const isSubActive = pathname === subItem.href
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`p-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                            isSubActive
                              ? 'bg-[rgba(91,110,44,0.12)] text-[#5B6E2C]'
                              : 'hover:bg-white text-[#20271D]'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg ${
                              isSubActive
                                ? 'bg-[#5B6E2C] text-white'
                                : 'bg-[rgba(91,110,44,0.08)] text-[#5B6E2C]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold leading-tight">
                              {subItem.label}
                            </span>
                            <span className="text-[10px] text-[#737B70] leading-snug mt-0.5">
                              {subItem.desc}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            </nav>

            {/* Right: Scientific Status & Grocery Ledger */}
            <div className="flex items-center gap-3">
              {/* Live Scientific Database Badge (Desktop) */}
              <div
                className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono border ${
                  isDarkHero
                    ? 'bg-white/10 border-white/20 text-[#A3B18A]'
                    : 'bg-[rgba(125,141,57,0.1)] border-[rgba(91,110,44,0.2)] text-[#5B6E2C]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7D8D39] animate-pulse" />
                <span className="font-medium">ICMR Verified</span>
              </div>

              {/* Grocery Basket Button */}
              <Link
                href="/basket"
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 shadow-xs ${
                  pathname === '/basket'
                    ? 'bg-[#FF5A22] text-white border-[#FF5A22]'
                    : isDarkHero
                    ? 'bg-white/10 text-white border-white/30 hover:bg-white/20'
                    : 'bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.25)] hover:border-[#5B6E2C] hover:bg-white'
                }`}
                aria-label="View Grocery Basket"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden md:inline font-mono">Basket</span>
                {totalBasketCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#FF5A22] text-white text-[10px] font-bold font-mono flex items-center justify-center -ml-0.5">
                    {totalBasketCount}
                  </span>
                )}
              </Link>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full focus:outline-hidden transition-colors ${
                  isDarkHero ? 'text-white hover:bg-white/10' : 'text-[#20271D] hover:bg-[rgba(91,110,44,0.1)]'
                }`}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[95] bg-[#F3F6F4] flex flex-col justify-between pt-28 pb-8 px-6 lg:hidden overflow-y-auto animate-in fade-in duration-200">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] mb-3">
              MacroSnap Navigation Index
            </span>

            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link, idx) => {
              const isActive = pathname === link.href
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xl font-display py-3 px-3.5 rounded-xl flex items-center justify-between border-b border-[rgba(91,110,44,0.1)] transition-all ${
                    isActive
                      ? 'text-[#5B6E2C] font-bold bg-[rgba(91,110,44,0.08)] pl-4'
                      : 'text-[#20271D] hover:text-[#5B6E2C]'
                  }`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-[#7D8D39]" />
                    <span>{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </Link>
              )
            })}
          </div>

          <div className="pt-6 mt-6 border-t border-[rgba(91,110,44,0.18)]">
            <div className="p-4 rounded-2xl bg-[rgba(125,141,57,0.08)] border border-[rgba(91,110,44,0.18)] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#20271D]">Evidence-Based Nutrition</p>
                <p className="text-[11px] text-[#737B70]">
                  ICMR-NIN IFCT 2017 &amp; Mandi wholesale economic data
                </p>
              </div>
              <Sparkles className="w-5 h-5 text-[#7D8D39]" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
