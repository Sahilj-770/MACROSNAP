'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/store/useUserStore'
import {
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  BookOpen,
  TrendingDown,
  Calculator,
  Compass,
  Swords,
  ChefHat,
  ScanLine,
  BookmarkCheck,
  ChevronDown,
} from 'lucide-react'

// Primary links matching user's exact specification
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore Foods' },
  { href: '/compare', label: 'Compare' },
  { href: '/budget', label: 'Protein on Budget' },
  { href: '/recipes', label: 'Recipes' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/learn', label: 'Learn / Myth Busters' },
]

// Secondary utility tools
const MORE_TOOLS = [
  { href: '/labels', label: 'Label Decoder', desc: 'Investigate packaged food traps', icon: ScanLine },
  { href: '/kitchen', label: 'Pantry Matcher', desc: 'Cook with what you have in the kitchen', icon: Sparkles },
  { href: '/library', label: 'Saved Library', desc: 'Your offline pinned benchmarks & recipes', icon: BookmarkCheck },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)

  const basketItems = useUserStore((state) => state.basketItems)
  const totalBasketCount = basketItems.reduce(
    (acc, item) => acc + (item.quantityGrams > 0 ? 1 : 0),
    0
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMoreDropdownOpen(false)
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

  const isMoreActive = MORE_TOOLS.some((item) => pathname === item.href)

  return (
    <>
      {/* 
        Single Consistent MacroSnap Navbar
        Light-first, botanical aesthetic: Soft White background, Deep Olive & Sage typography
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#F3F6F4]/95 backdrop-blur-md border-b border-[rgba(91,110,44,0.18)] shadow-xs'
            : 'py-3.5 bg-[#F3F6F4]/90 backdrop-blur-xs border-b border-[rgba(91,110,44,0.12)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Monogram & Logotype */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-hidden select-none shrink-0"
              aria-label="MacroSnap Home"
            >
              <div className="relative w-8 h-8 rounded-full bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-center font-semibold text-sm transition-transform duration-300 group-hover:scale-105 shadow-xs border border-[#7D8D39]/40">
                <span className="font-display italic text-base">M</span>
                {/* Botanical Pulse Spore */}
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FF5A22] border-2 border-[#F3F6F4]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#20271D] leading-none">
                  MacroSnap
                </span>
                <span className="text-[9px] uppercase tracking-widest font-medium font-sans text-[#7D8D39] mt-0.5">
                  Know what you eat
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Bar */}
            <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full bg-white/70 backdrop-blur-xs border border-[rgba(91,110,44,0.15)] shadow-2xs">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[#F3F6F4] bg-[#5B6E2C] font-semibold shadow-xs'
                        : 'text-[#20271D] hover:text-[#5B6E2C] hover:bg-[rgba(91,110,44,0.08)]'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}

              {/* More Tools Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  onMouseEnter={() => setMoreDropdownOpen(true)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                    isMoreActive || moreDropdownOpen
                      ? 'text-[#F3F6F4] bg-[#5B6E2C] font-semibold'
                      : 'text-[#20271D] hover:text-[#5B6E2C] hover:bg-[rgba(91,110,44,0.08)]'
                  }`}
                  aria-expanded={moreDropdownOpen}
                >
                  <span>More</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      moreDropdownOpen ? 'rotate-180' : 'opacity-60'
                    }`}
                  />
                </button>

                {moreDropdownOpen && (
                  <div
                    onMouseLeave={() => setMoreDropdownOpen(false)}
                    className="absolute top-full mt-2 right-0 w-64 rounded-2xl bg-[#F3F6F4] text-[#20271D] border border-[rgba(91,110,44,0.2)] shadow-xl p-2 flex flex-col gap-1 z-[110] animate-in fade-in duration-150"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] border-b border-[rgba(91,110,44,0.12)] mb-1">
                      Additional Tools
                    </div>
                    {MORE_TOOLS.map((subItem) => {
                      const Icon = subItem.icon
                      const isSubActive = pathname === subItem.href
                      return (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`p-2.5 rounded-xl flex items-start gap-2.5 transition-colors ${
                            isSubActive
                              ? 'bg-[rgba(91,110,44,0.12)] text-[#5B6E2C]'
                              : 'hover:bg-white text-[#20271D]'
                          }`}
                        >
                          <div
                            className={`p-1.5 rounded-lg shrink-0 ${
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
                            <span className="text-[10px] text-[#737B70] leading-tight mt-0.5">
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

            {/* Right: Basket Button & Mobile Hamburger */}
            <div className="flex items-center gap-2.5">
              <Link
                href="/basket"
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-200 border shadow-2xs ${
                  pathname === '/basket'
                    ? 'bg-[#FF5A22] text-white border-[#FF5A22]'
                    : 'bg-white hover:bg-[#F3F6F4] text-[#20271D] border-[rgba(91,110,44,0.2)] hover:border-[#5B6E2C]'
                }`}
                aria-label={`Basket with ${totalBasketCount} items`}
              >
                <ShoppingBag className="w-4 h-4 text-[#5B6E2C]" />
                <span className="hidden sm:inline">Basket</span>
                {totalBasketCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#FF5A22] text-white">
                    {totalBasketCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-full text-[#20271D] hover:bg-white border border-[rgba(91,110,44,0.2)] transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 
        Mobile Navigation Overlay Drawer
        Clean, elegant, light-first botanical design with clear links
      */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] xl:hidden bg-black/30 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-[#F3F6F4] rounded-t-3xl border-t border-[rgba(91,110,44,0.25)] p-6 max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(91,110,44,0.15)] mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#7D8D39]">
                  Navigation Directory
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#20271D] hover:bg-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <div className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#5B6E2C] text-[#F3F6F4] font-semibold'
                          : 'text-[#20271D] hover:bg-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              {/* Secondary Tools */}
              <div className="pt-4 mt-4 border-t border-[rgba(91,110,44,0.15)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737B70] block px-4 mb-2">
                  Interactive Tools
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {MORE_TOOLS.map((tool) => {
                    const Icon = tool.icon
                    const isSubActive = pathname === tool.href
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-xl text-sm transition-colors ${
                          isSubActive
                            ? 'bg-[#5B6E2C] text-white font-semibold'
                            : 'text-[#20271D] hover:bg-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#5B6E2C]" />
                        <span>{tool.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Basket Link in Mobile Drawer */}
            <div className="pt-6 mt-6 border-t border-[rgba(91,110,44,0.15)]">
              <Link
                href="/basket"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-sm font-semibold flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Open Grocery Basket ({totalBasketCount} items)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
