'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Flower2, ChevronDown, CheckCircle, XCircle, Sparkles, BookOpen, ArrowRight } from 'lucide-react'
import { FOOD_MYTHS } from '@/data/recipes-and-lessons'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4'

const EASE_ENTRANCE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const EASE_OVERLAY = 'cubic-bezier(0.76, 0, 0.24, 1)'

const OVERLAY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore Foods', href: '/explore' },
  { label: 'Compare', href: '/compare' },
  { label: 'Protein on Budget', href: '/budget' },
  { label: 'Recipes', href: '/recipes' },
  { label: 'Calculator', href: '/calculator' },
  { label: 'Evidence Dossiers', href: '#dossiers' },
]

export default function LearnPage() {
  const [navMounted, setNavMounted] = useState(false)
  const [heroMounted, setHeroMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)

  // Dossier section state
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(FOOD_MYTHS[0]?.id ?? null)

  // Navbar & Hero Entrance Timers
  useEffect(() => {
    const tNav = setTimeout(() => setNavMounted(true), 100)
    const tHero = setTimeout(() => setHeroMounted(true), 300)
    return () => {
      clearTimeout(tNav)
      clearTimeout(tHero)
    }
  }, [])

  // Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent background scroll when overlay is open
  useEffect(() => {
    if (overlayOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [overlayOpen])

  const toggleOverlay = () => setOverlayOpen((prev) => !prev)

  const scrollToDossiers = () => {
    setOverlayOpen(false)
    const el = document.getElementById('dossiers')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filteredMyths = FOOD_MYTHS.filter((m) => {
    if (activeCategory === 'All') return true
    return m.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 4))
  })

  return (
    <div className="relative w-full bg-[#F3F6F4] text-[#20271D] selection:bg-[#7D8D39] selection:text-white">
      {/* 
        ========================================================================
        AUREVON-INSPIRED NAVBAR (Adapted to MacroSnap Identity & Palette)
        ========================================================================
      */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#20271D]/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Left — MacroSnap Logo Link */}
          <Link
            href="/"
            className={`flex items-center gap-2.5 z-50 transition-all duration-700 ${
              navMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: '0ms' }}
          >
            <div className="w-8 h-8 rounded-full bg-[#5B6E2C] text-[#F3F6F4] flex items-center justify-center font-semibold text-sm border border-white/25">
              <span className="font-display italic">M</span>
            </div>
            <span className="text-white text-xl md:text-2xl font-display font-semibold tracking-tight">
              MacroSnap
            </span>
          </Link>

          {/* Center — Desktop Only Pill Button */}
          <div
            className={`hidden md:flex transition-all duration-700 ${
              navMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: '200ms' }}
          >
            <button
              type="button"
              onClick={toggleOverlay}
              className="px-5 py-2 rounded-full border border-white/20 text-white/90 text-sm hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer z-50 backdrop-blur-xs"
            >
              <span>{overlayOpen ? 'Close' : 'Navigate'}</span>
            </button>
          </div>

          {/* Right — Desktop Only Flower2 Icon */}
          <div
            className={`hidden md:flex transition-all duration-700 ${
              navMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: '400ms' }}
          >
            <Flower2 className="w-7 h-7 text-[#7D8D39]" />
          </div>

          {/* Right — Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleOverlay}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-500 ${
                overlayOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
              style={{ transitionTimingFunction: EASE_OVERLAY }}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-500 ${
                overlayOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
              style={{ transitionTimingFunction: EASE_OVERLAY }}
            />
          </button>
        </div>
      </header>

      {/* 
        ========================================================================
        FULL-SCREEN OVERLAY MENU (Aurevon Spec adapted with MacroSnap links)
        ========================================================================
      */}
      <div
        className={`fixed inset-0 z-40 bg-[#20271D] flex flex-col items-center justify-center transition-all duration-700 ${
          overlayOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
        style={{ transitionTimingFunction: EASE_OVERLAY }}
      >
        <nav className="flex flex-col items-center justify-center gap-6">
          {OVERLAY_LINKS.map((link, idx) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                if (link.href === '#dossiers') {
                  scrollToDossiers()
                } else {
                  setOverlayOpen(false)
                }
              }}
              className={`font-display text-white text-3xl md:text-5xl hover:text-[#7D8D39] transition-all duration-500 ${
                overlayOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                transitionTimingFunction: EASE_OVERLAY,
                transitionDelay: overlayOpen ? `${120 + idx * 60}ms` : '0ms',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 
        ========================================================================
        HERO (Full Viewport, Aurevon Spec with MacroSnap Botanical Tone)
        ========================================================================
      */}
      <section className="relative w-full h-screen overflow-hidden flex items-end justify-center">
        {/* Background Video Wrapper with Botanical Dark Wash */}
        <div
          className={`absolute inset-0 transition-all duration-[1400ms] ${
            heroMounted ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
          }`}
          style={{ transitionTimingFunction: EASE_ENTRANCE }}
        >
          <video
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Subtle Botanical Forest Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(32, 39, 29, 0.65) 0%, rgba(20, 26, 18, 0.92) 85%)',
            }}
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center px-6 pb-16 md:pb-24 max-w-4xl mx-auto">
          {/* H1 in Instrument Serif */}
          <h1
            className={`font-display text-white text-4xl leading-[1.0] sm:text-6xl md:text-7xl lg:text-8xl mb-5 md:mb-6 transition-all duration-900 ${
              heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: heroMounted ? '400ms' : '0ms' }}
          >
            Deconstructing Nutrition Myths.
          </h1>

          {/* Subcopy */}
          <p
            className={`text-white/80 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed transition-all duration-900 ${
              heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: heroMounted ? '600ms' : '0ms' }}
          >
            Separating Indian gym folklore from empirical metabolic literature. Peer-reviewed clinical evidence, zero bro-science.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-900 ${
              heroMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionTimingFunction: EASE_ENTRANCE, transitionDelay: heroMounted ? '800ms' : '0ms' }}
          >
            <button
              type="button"
              onClick={scrollToDossiers}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-sm md:text-base font-semibold rounded-full transition-all cursor-pointer shadow-lg border border-[#7D8D39]/50"
            >
              <span>Explore Evidence Dossiers</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        EVIDENCE DOSSIERS SECTION (Light-First Botanical Editorial Layout)
        ========================================================================
      */}
      <section id="dossiers" className="py-24 px-6 md:px-12 max-w-6xl mx-auto bg-[#F3F6F4] text-[#20271D]">
        <div className="pb-8 border-b border-[rgba(91,110,44,0.18)] mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-[#5B6E2C] text-xs font-mono uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
            <span>ICMR-NIN &bull; Peer-Reviewed Scientific Archive</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#20271D] tracking-tight">
            Scientific Myth Demolition Dossiers
          </h2>
          <p className="text-sm sm:text-base text-[#737B70] mt-3 max-w-2xl leading-relaxed">
            Every dossier is cross-referenced with randomized controlled trials (RCTs), NIN publications, and clinical dietary standards.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {['All', 'Supplements', 'Safety', 'Hormones', 'Economics'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#5B6E2C] text-[#F3F6F4] font-semibold shadow-xs'
                    : 'bg-white text-[#20271D] hover:bg-[rgba(91,110,44,0.08)] border border-[rgba(91,110,44,0.18)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion Dossier Cards (Light-first botanical card aesthetic) */}
        <div className="space-y-6">
          {filteredMyths.map((myth) => {
            const isExpanded = expandedId === myth.id
            return (
              <div
                key={myth.id}
                className="rounded-3xl bg-white border border-[rgba(91,110,44,0.18)] overflow-hidden transition-all duration-300 hover:border-[#5B6E2C] shadow-2xs"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : myth.id)}
                  className="w-full p-6 sm:p-8 flex items-start sm:items-center justify-between text-left gap-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D8D39] px-2.5 py-1 rounded-full bg-[rgba(125,141,57,0.1)]">
                        {myth.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                          myth.verdict === 'BUSTED'
                            ? 'bg-[#FF5A22]/15 text-[#FF5A22]'
                            : 'bg-[#5B6E2C]/15 text-[#5B6E2C]'
                        }`}
                      >
                        {myth.verdict === 'BUSTED' ? (
                          <XCircle className="w-3.5 h-3.5" />
                        ) : (
                          <CheckCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{myth.verdict}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-[#20271D] leading-tight">
                      &ldquo;{myth.myth}&rdquo;
                    </h3>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[rgba(91,110,44,0.08)] flex items-center justify-center shrink-0 text-[#5B6E2C] transition-transform duration-300">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#7D8D39]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-6 sm:p-8 pt-0 border-t border-[rgba(91,110,44,0.12)] space-y-6 text-sm text-[#20271D] animate-in fade-in duration-200">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C] mb-2 font-bold">
                        Scientific Reality:
                      </h4>
                      <p className="leading-relaxed text-[#20271D] font-sans">{myth.theTruth}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#F3F6F4] border border-[rgba(91,110,44,0.15)]">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-[#7D8D39] mb-1 font-bold">
                        Clinical Context:
                      </h4>
                      <p className="text-xs leading-relaxed text-[#737B70]">
                        {myth.scientificContext}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-xs text-[#20271D]">
                      <strong className="text-[#5B6E2C] block mb-1">
                        Practical Kitchen Takeaway:
                      </strong>
                      <p>{myth.practicalTakeaway}</p>
                    </div>

                    <div className="text-[11px] font-mono text-[#737B70] pt-2 border-t border-[rgba(91,110,44,0.12)]">
                      Ref: {myth.source}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
