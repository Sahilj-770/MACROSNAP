'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { EditorialTicker } from '@/components/layout/EditorialTicker'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Compass,
  Scale,
  TrendingDown,
  CookingPot,
  Search,
  Calculator,
  Activity,
  Zap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ESSENTIAL_AMINO_ACIDS = [
  { code: 'LEU', name: 'Leucine', role: 'MPS Trigger', x: '10%', y: '24%', delay: 0 },
  { code: 'ISO', name: 'Isoleucine', role: 'Glucose Uptake', x: '86%', y: '20%', delay: 1.5 },
  { code: 'VAL', name: 'Valine', role: 'Tissue Repair', x: '12%', y: '65%', delay: 2.2 },
  { code: 'LYS', name: 'Lysine', role: 'Collagen Base', x: '84%', y: '68%', delay: 0.8 },
  { code: 'MET', name: 'Methionine', role: 'Cysteine Precursor', x: '6%', y: '44%', delay: 1.8 },
  { code: 'THR', name: 'Threonine', role: 'Intestinal Barrier', x: '90%', y: '44%', delay: 2.8 },
]

const CHAPTERS = [
  { act: 1, id: 'act-01', label: '01 THE AWAKENING' },
  { act: 2, id: 'act-02', label: '02 THE ₹120 PARADOX' },
  { act: 3, id: 'act-03', label: '03 SOVEREIGN TRIO' },
  { act: 4, id: 'act-04', label: '04 DUAL RECKONING' },
  { act: 5, id: 'act-05', label: '05 PRECISION SUITE' },
  { act: 6, id: 'act-06', label: '06 THE MANIFESTO' },
]

const HORIZONTAL_SLIDES = [
  {
    id: 'soy-chunks',
    act: 'ACT 03 // SLIDE 01',
    name: 'SOY CHUNKS (BADI)',
    hindi: 'सोया बड़ी',
    category: 'THE VALUE MONARCH',
    headline: '52% PURE PLANT PROTEIN.',
    subtitle: '₹2.30 PER 10G PROTEIN · 26X CHEAPER THAN PACKAGED SNACKS',
    fact: 'Boiled in kitchen water for 4 mins. 50g dry yields 26g of complete plant protein for less than ₹6. Zero additives, zero polyols, zero marketing markup.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1800&q=85',
    stats: [
      { label: 'PROTEIN DENSITY', val: '52g', sub: 'Per 100g dry' },
      { label: 'KITCHEN BATCH', val: '₹6.00', sub: '50g serving' },
      { label: 'COST / 10G PRO', val: '₹2.30', sub: 'National lowest' },
    ],
    compareLink: '/compare?foodA=soy-chunks&foodB=commercial-protein-bar',
  },
  {
    id: 'eggs-whole',
    act: 'ACT 03 // SLIDE 02',
    name: 'DESI WHOLE EGGS',
    hindi: 'उबले अंडे',
    category: 'THE BIOAVAILABILITY APEX',
    headline: 'THE GOLD STANDARD DIAAS.',
    subtitle: 'DIAAS SCORE > 1.18 · COMPLETE AMINO PROFILE',
    fact: 'The biological standard of human protein bioavailability. Sliced whole boiled eggs deliver choline, vitamin D, and sustained casein-quality muscle synthesis.',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=1800&q=85',
    stats: [
      { label: 'DIAAS SCORE', val: '1.18', sub: 'Superior absorption' },
      { label: 'WHOLE EGG YIELD', val: '13g', sub: '2 large eggs' },
      { label: 'COST / 10G PRO', val: '₹10.70', sub: 'NECC Farm benchmark' },
    ],
    compareLink: '/compare?foodA=boiled-egg-whole&foodB=commercial-protein-bar',
  },
  {
    id: 'roasted-chana',
    act: 'ACT 03 // SLIDE 03',
    name: 'ROASTED BENGAL GRAM',
    hindi: 'भुना चना (छिलका सहित)',
    category: 'ZERO-COOK STAPLE',
    headline: 'PORTABLE PREBIOTIC FIBER.',
    subtitle: '16.8G INSOLUBLE FIBER · ZERO COOKING TIME',
    fact: 'Zero cooking, zero kettle, zero refrigeration required. Eaten with brown skin intact, it feeds colon microbiome bifidobacteria and keeps you full for 4 hours.',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=1800&q=85',
    stats: [
      { label: 'PREBIOTIC FIBER', val: '16.8g', sub: 'Per 100g yield' },
      { label: 'PLANT PROTEIN', val: '22.5g', sub: 'Slow digesting' },
      { label: 'COST / 10G PRO', val: '₹6.60', sub: 'Kirana benchmark' },
    ],
    compareLink: '/compare?foodA=roasted-chana&foodB=commercial-protein-bar',
  },
]

const SHOWDOWN_MATCHUPS = [
  {
    id: 'bar-vs-soy',
    tabLabel: '01 // BAR VS SOY CHUNKS',
    subtitle: 'THE 26X COST & FILLER PARADOX',
    commercial: {
      tag: 'PACKAGED BAR (67G)',
      name: 'Commercial Protein Bar',
      price: '₹120',
      protein: '20g',
      costPer10g: '₹60.00',
      percent: 30,
      drawbacks: ['14g Maltitol / Sugar Alcohols', 'Palm Oil Humectant', 'Synthetic Emulsifiers'],
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80',
    },
    staple: {
      tag: 'KITCHEN STAPLE (50G DRY)',
      name: 'Boiled Soy Chunks',
      price: '₹6.00',
      protein: '26g',
      costPer10g: '₹2.30',
      percent: 52,
      benefits: ['Zero Synthetic Additives', '6.5g Prebiotic Dietary Fiber', 'Complete Amino Profile'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    },
    compareLink: '/compare?foodA=commercial-protein-bar&foodB=soy-chunks',
  },
  {
    id: 'shake-vs-chana',
    tabLabel: '02 // BOTTLED SHAKE VS CHANA',
    subtitle: 'ULTRA-PROCESSED CONVENIENCE VS ZERO-COOK REAL FOOD',
    commercial: {
      tag: 'COMMERCIAL SHAKE (200ML)',
      name: 'Ready-to-Drink Protein Shake',
      price: '₹95',
      protein: '12g',
      costPer10g: '₹79.10',
      percent: 24,
      drawbacks: ['Carrageenan Stabilizer', 'Added Artificial Sweeteners', 'High Packaging Waste'],
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    },
    staple: {
      tag: 'STREET BENCHMARK (50G)',
      name: 'Roasted Bengal Gram (Chana)',
      price: '₹7.50',
      protein: '11.3g',
      costPer10g: '₹6.60',
      percent: 68,
      benefits: ['8.4g Insoluble Prebiotic Fiber', 'Low Glycemic Index (GI 28)', 'Zero Cooking / Instant Snack'],
      image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    },
    compareLink: '/compare?foodA=roasted-chana&foodB=commercial-protein-bar',
  },
  {
    id: 'tofu-vs-paneer',
    tabLabel: '03 // TOFU VS DESI PANEER',
    subtitle: 'PLANT CALORIE EFFICIENCY VS SUSTAINED CASEIN SYNTHESIS',
    commercial: {
      tag: 'ORGANIC BLOCK (100G)',
      name: 'Firm Organic Tofu',
      price: '₹35',
      protein: '15.5g',
      costPer10g: '₹22.50',
      percent: 54,
      drawbacks: ['Lower Calcium (130mg)', 'Needs Culinary Marinade', 'Slightly Lower Leucine'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    },
    staple: {
      tag: 'DAIRY MONARCH (100G)',
      name: 'Fresh Cow Milk Paneer',
      price: '₹45',
      protein: '18.3g',
      costPer10g: '₹24.50',
      percent: 62,
      benefits: ['480mg Bioavailable Calcium', 'Sustained 6-Hour Casein Release', 'Conjugated Linoleic Acid (CLA)'],
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    },
    compareLink: '/compare?foodA=paneer-raw&foodB=firm-tofu',
  },
]

const INSTRUMENTS = [
  {
    num: '01',
    tag: 'EXPLORE // DIRECTORY',
    title: 'Food Intelligence Index',
    desc: 'Deep nutritional profiles, DIAAS bioavailability scores, and protein density across 30+ staples.',
    href: '/explore',
    cta: 'Explore Directory',
    bg: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    icon: Compass,
  },
  {
    num: '02',
    tag: 'SHOWDOWN // ENGINE',
    title: 'Head-to-Head Compare',
    desc: 'Compare any packaged supermarket snack with homemade alternatives side-by-side.',
    href: '/compare',
    cta: 'Launch Compare',
    bg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    icon: Scale,
  },
  {
    num: '03',
    tag: 'ECONOMICS // BUDGET',
    title: 'Protein on a Budget',
    desc: 'Discover maximum protein per rupee spent with national wholesale and kirana benchmarks.',
    href: '/budget',
    cta: 'View Economics',
    bg: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    icon: TrendingDown,
  },
  {
    num: '04',
    tag: 'RECIPES // KITCHEN LAB',
    title: 'Whole Food Recipes',
    desc: 'High-protein, 15-minute homemade alternatives that beat expensive packaged snacks.',
    href: '/recipes',
    cta: 'Open Recipes',
    bg: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    icon: CookingPot,
  },
  {
    num: '05',
    tag: 'DECODER // INGREDIENTS',
    title: 'Ingredient Label Decoder',
    desc: 'Unmask marketing tricks, maltitol spikes, disguised palm oils, and front-of-pack claims.',
    href: '/labels',
    cta: 'Decode Labels',
    bg: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    icon: Search,
  },
  {
    num: '06',
    tag: 'TARGETS // CALCULATOR',
    title: 'Macro & DIAAS Calculator',
    desc: 'Calculate personalized daily protein and leucine thresholds for your exact bodyweight.',
    href: '/calculator',
    cta: 'Calculate Targets',
    bg: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    icon: Calculator,
  },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scene Refs
  const heroPinRef = useRef<HTMLDivElement>(null)
  const heroTitleRef = useRef<HTMLDivElement>(null)
  const heroImageWrapRef = useRef<HTMLDivElement>(null)

  const deconstructPinRef = useRef<HTMLDivElement>(null)
  const deconstructCardARef = useRef<HTMLDivElement>(null)
  const deconstructCardBRef = useRef<HTMLDivElement>(null)
  const deconstructVsRef = useRef<HTMLDivElement>(null)

  const horizontalPinRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  const [currentAct, setCurrentAct] = useState<number>(1)
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const [activeFilmSlide, setActiveFilmSlide] = useState<number>(0)
  const [activeShowdownTab, setActiveShowdownTab] = useState<'bar-vs-soy' | 'shake-vs-chana' | 'tofu-vs-paneer'>('bar-vs-soy')

  const scrollToAct = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if ((window as any).__lenis) {
      ;(window as any).__lenis.scrollTo(el, {
        duration: 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false,
      })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useGSAP(
    () => {
      // ─────────────────────────────────────────────────────────────
      // MASTER PROGRESS TRACKER (KEEPS WHOLE PAGE AS ONE CONTINUOUS FILM)
      // ─────────────────────────────────────────────────────────────
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = self.progress
            setScrollProgress(Math.round(p * 100))
            if (p < 0.18) setCurrentAct(1)
            else if (p < 0.38) setCurrentAct(2)
            else if (p < 0.65) setCurrentAct(3)
            else if (p < 0.78) setCurrentAct(4)
            else if (p < 0.90) setCurrentAct(5)
            else setCurrentAct(6)
          },
        })
      }

      // ─────────────────────────────────────────────────────────────
      // ACT 01: PINNED HERO (CAMERA ZOOM & HUD REVEAL)
      // ─────────────────────────────────────────────────────────────
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroPinRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      })

      heroTl
        .to(heroTitleRef.current, {
          y: -120,
          opacity: 0,
          scale: 0.9,
          ease: 'power2.inOut',
          duration: 0.5,
        })
        .to(
          heroImageWrapRef.current,
          {
            scale: 1.12,
            ease: 'power2.out',
            duration: 1,
          },
          0
        )
        .from(
          '.hero-hud-badge',
          {
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: 'back.out(1.2)',
          },
          0.3
        )

      // ─────────────────────────────────────────────────────────────
      // ACT 02: PINNED DECONSTRUCTION (₹120 vs ₹6 THE PARADOX)
      // ─────────────────────────────────────────────────────────────
      const deconstructTl = gsap.timeline({
        scrollTrigger: {
          trigger: deconstructPinRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.6,
        },
      })

      deconstructTl
        .from(deconstructCardARef.current, {
          x: -140,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(
          deconstructCardBRef.current,
          {
            x: 140,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          0
        )
        .from(
          deconstructVsRef.current,
          {
            scale: 0,
            opacity: 0,
            rotation: -45,
            duration: 0.5,
            ease: 'back.out(1.5)',
          },
          0.2
        )
        .from(
          '.deconstruct-punchline',
          {
            y: 40,
            opacity: 0,
            scale: 0.92,
            duration: 0.6,
            ease: 'power2.out',
          },
          0.4
        )

      // ─────────────────────────────────────────────────────────────
      // ACT 03: FULLSCREEN PINNED HORIZONTAL FILM
      // ─────────────────────────────────────────────────────────────
      if (horizontalTrackRef.current && horizontalPinRef.current) {
        const getScrollDistance = () => {
          const track = horizontalTrackRef.current
          return track ? -(track.scrollWidth - window.innerWidth) : 0
        }

        gsap.to(horizontalTrackRef.current, {
          x: getScrollDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalPinRef.current,
            start: 'top top',
            end: () => `+=${horizontalTrackRef.current ? horizontalTrackRef.current.scrollWidth - window.innerWidth : 2000}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const slideIndex = Math.min(2, Math.max(0, Math.round(self.progress * 2)))
              setActiveFilmSlide(slideIndex)
            },
          },
        })
      }

      ScrollTrigger.refresh()
    },
    { scope: containerRef }
  )

  const activeMatchup = SHOWDOWN_MATCHUPS.find((m) => m.id === activeShowdownTab) ?? SHOWDOWN_MATCHUPS[0]!

  return (
    <div ref={containerRef} className="relative w-full bg-[#FAF7F0] text-forest overflow-x-hidden selection:bg-chartreuse selection:text-forest">
      {/* ─────────────────────────────────────────────────────────────
          FIXED GLOBAL CINEMA SCRUBBER RAIL (Acts 01 - 06 Continuous Navigation)
      ───────────────────────────────────────────────────────────── */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-3 pointer-events-auto">
        <div className="flex flex-col items-end gap-2.5 bg-[#0B1E13]/85 backdrop-blur-md px-3.5 py-4 rounded-2xl border border-white/15 shadow-2xl text-cream">
          <div className="text-[9px] font-mono font-bold uppercase text-chartreuse tracking-widest pb-1 border-b border-white/10 flex items-center gap-1.5 w-full justify-between">
            <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse" />
            <span>SCENE {currentAct}/06</span>
          </div>

          {CHAPTERS.map((ch) => (
            <button
              key={ch.act}
              onClick={() => scrollToAct(ch.id)}
              className={`group flex items-center gap-2.5 text-right transition-all py-0.5 relative ${
                currentAct === ch.act ? 'text-chartreuse font-bold' : 'text-cream/40 hover:text-cream/90'
              }`}
            >
              <span className="text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {ch.label}
              </span>
              <div className="relative w-6 h-2 flex items-center justify-end">
                {currentAct === ch.act ? (
                  <motion.div
                    layoutId="activeActIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="w-6 h-2 rounded-full bg-chartreuse shadow-[0_0_10px_#D8F054]"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors" />
                )}
              </div>
            </button>
          ))}

          <div className="pt-1.5 border-t border-white/10 text-[9px] font-mono text-chartreuse font-bold w-full text-center">
            {scrollProgress}% PROGRESS
          </div>
        </div>
      </aside>

      {/* ─────────────────────────────────────────────────────────────
          ACT 01: CINEMATIC PINNED HERO (MINIMAL COPY, MASSIVE VISUAL)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-01"
        ref={heroPinRef}
        className="relative w-full h-screen flex flex-col justify-between items-center px-4 sm:px-8 py-8 overflow-hidden"
      >
        {/* Top Minimal Status Strip */}
        <div className="w-full max-w-7xl flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-forest/70 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-chartreuse animate-ping" />
            <span className="font-bold text-forest">MACROSNAP // VOL. 26</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-forest/60">
            <span>ICMR-NIN DATA ENGINE</span>
            <span>·</span>
            <span className="text-tangerine font-bold">100% UNBRANDED</span>
          </div>
        </div>

        {/* Hero Title Container */}
        <div
          ref={heroTitleRef}
          className="my-auto text-center space-y-4 max-w-5xl z-20 pointer-events-none"
        >
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-forest text-chartreuse shadow-sm">
            Food Intelligence Lab
          </span>
          <h1 className="text-6xl sm:text-8xl lg:text-[112px] font-black font-serif text-forest tracking-tight leading-[0.92]">
            KNOW WHAT <br />
            <span className="text-tangerine italic font-normal">FUELS YOU.</span>
          </h1>
          <p className="text-sm sm:text-base font-mono uppercase tracking-widest text-forest/75 max-w-xl mx-auto pt-2">
            Reclaiming nutrition from ₹120 fitness marketing.
          </p>
        </div>

        {/* Panoramic Whole Food Photographic Background */}
        <div
          ref={heroImageWrapRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40 mix-blend-multiply transition-transform duration-700"
        >
          <Image
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=2000&q=85"
            alt="Artisanal fresh nutrient-dense meal composition"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0] via-transparent to-[#FAF7F0]" />
        </div>

        {/* Ambient Biological Amino Acid Synthesis Nodes */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {ESSENTIAL_AMINO_ACIDS.map((node, i) => (
            <motion.div
              key={node.code}
              animate={{
                y: [0, -14, 0],
                x: [0, 8, 0],
                opacity: [0.35, 0.7, 0.35],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: node.delay,
              }}
              style={{ left: node.x, top: node.y }}
              className="absolute hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-forest/5 border border-forest/15 backdrop-blur-sm text-[10px] font-mono text-forest/70"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-chartreuse shadow-[0_0_8px_#D8F054]" />
              <span className="font-bold text-forest">{node.code}</span>
              <span className="text-[9px] text-forest/50">· {node.role}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom Pinned Telemetry HUD Cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-3 z-20">
          <motion.div
            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            className="hero-hud-badge p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-forest/15 hover:border-forest/40 shadow-lg hover:shadow-xl transition-colors flex items-center justify-between cursor-default"
          >
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse" />
                Soy Chunks Density
              </span>
              <strong className="text-2xl font-black font-mono text-forest">52% Protein</strong>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-chartreuse/60 text-forest border border-forest/10">
              ₹2.30 / 10g
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            className="hero-hud-badge p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-forest/15 hover:border-forest/40 shadow-lg hover:shadow-xl transition-colors flex items-center justify-between cursor-default"
          >
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-leaf animate-pulse" />
                Egg Bioavailability
              </span>
              <strong className="text-2xl font-black font-mono text-forest">DIAAS &gt; 1.18</strong>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-leaf/20 text-forest border border-forest/10">
              Gold Standard
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            className="hero-hud-badge p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-forest/15 hover:border-forest/40 shadow-lg hover:shadow-xl transition-colors flex items-center justify-between cursor-default"
          >
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-tangerine animate-pulse" />
                Database Standard
              </span>
              <strong className="text-2xl font-black font-mono text-forest">100% Real Food</strong>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-tangerine/20 text-tangerine border border-tangerine/20">
              Zero Marketing
            </span>
          </motion.div>
        </div>

        {/* Scroll Prompt Indicator */}
        <div className="absolute bottom-1 text-center font-mono text-[10px] tracking-widest uppercase text-forest/50 z-20 flex items-center gap-1.5 animate-bounce">
          <span>Scroll down to enter the film</span>
        </div>
      </section>

      {/* Continuous Vignette Bridge from Act 01 to Act 02 */}
      <div className="w-full h-24 bg-gradient-to-b from-[#FAF7F0] to-[#0D2316] relative z-20 -my-1 pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          ACT 02: THE DECONSTRUCTION (₹120 vs ₹6 THE PARADOX)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-02"
        ref={deconstructPinRef}
        className="relative w-full h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-8 bg-[#0D2316] text-cream overflow-hidden z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/40 via-transparent to-transparent pointer-events-none" />

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10">
          {/* Card A: The Commercial Pretender */}
          <div
            ref={deconstructCardARef}
            className="lg:col-span-5 rounded-3xl bg-black/40 backdrop-blur-md border border-red-500/30 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Industrial Chemical Scanner Beam */}
            <motion.div
              animate={{
                top: ['0%', '98%', '0%'],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.8)] z-20 pointer-events-none"
            />

            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-red-500/20 text-red-300 font-bold">
                  The Packaged Pretender
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-cream mt-2">
                  Commercial Protein Bar
                </h3>
                <p className="text-xs font-mono text-cream/60 mt-0.5">67g Packaged Bar</p>
              </div>
              <X className="w-8 h-8 text-red-400 flex-shrink-0" />
            </div>

            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80"
                alt="Packaged commercial snack bar with industrial gloss"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 font-mono">
                <span className="text-[10px] text-cream/70 uppercase block">Shelf Retail Price</span>
                <span className="text-3xl font-black text-red-400">₹120.00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-cream/60 block uppercase">Protein</span>
                <span className="text-xl font-black text-cream">20g</span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 border border-white/10">
                <span className="text-[10px] text-cream/60 block uppercase">Cost / 10g Protein</span>
                <span className="text-xl font-black text-tangerine">₹60.00</span>
              </div>
            </div>

            <p className="text-xs font-mono text-cream/70 text-center">
              14g Maltitol / Sugar Alcohols · Palm Oil Humectant
            </p>
          </div>

          {/* Center VS Indicator */}
          <div
            ref={deconstructVsRef}
            className="lg:col-span-2 flex flex-col items-center justify-center text-center my-2 lg:my-0 relative"
          >
            {/* Continuous Atomic Pulse Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-24 h-24 rounded-full border border-dashed border-chartreuse/35 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-full bg-chartreuse text-forest font-black font-serif text-2xl flex items-center justify-center shadow-[0_0_30px_rgba(216,240,84,0.35)] border-4 border-forest z-10"
            >
              VS
            </motion.div>
          </div>

          {/* Card B: The Real Kitchen Staple */}
          <div
            ref={deconstructCardBRef}
            className="lg:col-span-5 rounded-3xl bg-forest-deep/90 backdrop-blur-md border-2 border-chartreuse/50 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Biological Nutrient Synthesis Scanner Beam */}
            <motion.div
              animate={{
                top: ['0%', '98%', '0%'],
                opacity: [0.3, 0.9, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6,
              }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-chartreuse to-transparent shadow-[0_0_12px_rgba(216,240,84,0.8)] z-20 pointer-events-none"
            />

            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-chartreuse text-forest font-bold">
                  The Biology Winner
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-chartreuse mt-2">
                  Boiled Soy Chunks
                </h3>
                <p className="text-xs font-mono text-cream/60 mt-0.5">50g Dry (1 katori cooked)</p>
              </div>
              <Check className="w-8 h-8 text-chartreuse flex-shrink-0" />
            </div>

            <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
                alt="Boiled fresh wholesome soy chunks bowl"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 font-mono">
                <span className="text-[10px] text-cream/70 uppercase block">Kitchen Batch Cost</span>
                <span className="text-3xl font-black text-chartreuse">₹6.00</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-cream/60 block uppercase">Protein</span>
                <span className="text-xl font-black text-chartreuse">26g</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10">
                <span className="text-[10px] text-cream/60 block uppercase">Cost / 10g Protein</span>
                <span className="text-xl font-black text-chartreuse">₹2.30</span>
              </div>
            </div>

            <p className="text-xs font-mono text-chartreuse/90 text-center">
              6.5g Prebiotic Dietary Fiber · 0g Additives
            </p>
          </div>
        </div>

        <div className="deconstruct-punchline mt-8 text-center space-y-2 z-10">
          <p className="text-xl sm:text-3xl font-black font-serif text-cream">
            26x COST DIFFERENCE. <span className="text-chartreuse">ZERO MARKETING LIES.</span>
          </p>
          <Link
            href="/compare?foodA=commercial-protein-bar&foodB=soy-chunks"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-chartreuse hover:text-white transition-colors underline"
          >
            <span>Analyze complete scientific showdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT 03: FULLSCREEN PINNED HORIZONTAL FILM (THE 3 SOVEREIGN STAPLES)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-03"
        ref={horizontalPinRef}
        className="relative w-full h-screen overflow-hidden bg-[#0A1D11] text-cream z-20"
      >
        {/* Horizontal Film Track */}
        <div ref={horizontalTrackRef} className="flex h-full w-[300vw] will-change-transform">
          {HORIZONTAL_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative w-screen h-full flex flex-col justify-between p-6 sm:p-14 lg:p-20 overflow-hidden flex-shrink-0"
            >
              {/* Fullscreen Background Photography */}
              <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <Image
                  src={slide.image}
                  alt={slide.name}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1D11] via-[#0A1D11]/70 to-black/40" />
              </div>

              {/* Slide Top Meta Strip */}
              <div className="relative z-10 flex justify-between items-start font-mono">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-chartreuse text-forest shadow-md">
                    {slide.act}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-cream/80">
                    {slide.category}
                  </span>
                  <span className="text-xs text-cream/60 font-serif italic hidden sm:inline">
                    {slide.hindi}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-cream/70">
                  <span>0{idx + 1} / 03</span>
                  <Link
                    href={slide.compareLink}
                    className="w-10 h-10 rounded-full bg-cream text-forest flex items-center justify-center hover:bg-chartreuse transition-colors shadow-lg"
                    aria-label={`Compare ${slide.name}`}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Slide Center/Bottom Heroic Narrative & Big Numbers */}
              <div className="relative z-10 space-y-6 max-w-4xl my-auto pt-8">
                <div className="space-y-2">
                  <span className="text-xs sm:text-sm font-mono text-chartreuse font-bold uppercase tracking-wider block">
                    {slide.subtitle}
                  </span>
                  <h2 className="text-4xl sm:text-6xl lg:text-8xl font-black font-serif text-cream tracking-tight leading-[0.92]">
                    {slide.headline}
                  </h2>
                </div>

                <p className="text-sm sm:text-lg font-sans text-cream/85 max-w-2xl leading-relaxed">
                  {slide.fact}
                </p>

                {/* 3 Giant Metric Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono max-w-2xl">
                  {slide.stats.map((s, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -4, scale: 1.04, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                      className="p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 hover:border-chartreuse/40 transition-colors space-y-0.5 cursor-default group"
                    >
                      <span className="text-[10px] text-cream/60 uppercase block group-hover:text-cream/90 transition-colors">{s.label}</span>
                      <strong className="text-2xl sm:text-3xl font-black text-chartreuse block">
                        {s.val}
                      </strong>
                      <span className="text-[10px] text-cream/50 block">{s.sub}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-2">
                  <motion.div
                    whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 22 } }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-block"
                  >
                    <Link
                      href={slide.compareLink}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cream text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-chartreuse transition-all shadow-md"
                    >
                      <span>Inspect Matchup Breakdown</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="relative z-10 pb-8" />
            </div>
          ))}
        </div>

        {/* Pinned Film HUD (Fixed at bottom of horizontal section) */}
        <div className="absolute bottom-6 left-6 right-6 sm:left-14 sm:right-14 lg:left-20 lg:right-20 z-30 flex justify-between items-center text-[11px] font-mono text-cream/70 border-t border-white/15 pt-4 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-chartreuse animate-ping" />
            <span className="tracking-widest uppercase">SCROLL DOWN TO ADVANCE FILM</span>
          </div>

          <div className="flex items-center gap-3">
            {HORIZONTAL_SLIDES.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: activeFilmSlide === i ? 36 : 8,
                  backgroundColor: activeFilmSlide === i ? '#D8F054' : 'rgba(255,255,255,0.3)',
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                className="h-1.5 rounded-full"
              />
            ))}
            <span className="text-chartreuse font-bold ml-2">
              SLIDE 0{activeFilmSlide + 1} / 03
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT 04: THE DUAL RECKONING ARENA (INTERACTIVE CINEMATIC STAGE)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-04"
        className="relative w-full min-h-screen py-24 px-4 sm:px-8 bg-[#091A10] text-cream flex flex-col justify-between overflow-hidden z-20"
      >
        <div className="max-w-7xl mx-auto w-full space-y-12">
          {/* Header & Matchup Selector */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-chartreuse uppercase tracking-widest block">
                ACT 04 // THE DUAL ARENA
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight">
                The Nutritional Reckoning.
              </h2>
              <p className="text-sm font-mono text-cream/60 max-w-xl">
                Every packaged snack has an unbranded biological equivalent. Compare cost, density, and industrial humectants.
              </p>
            </div>

            {/* Interactive Tab Buttons with Liquid Motion Spring Slider */}
            <div className="flex flex-wrap gap-2">
              {SHOWDOWN_MATCHUPS.map((tab) => {
                const isActive = activeShowdownTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveShowdownTab(tab.id as any)}
                    className="relative px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-colors"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeShowdownTabPill"
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                        className="absolute inset-0 bg-chartreuse rounded-xl shadow-lg"
                      />
                    )}
                    <span className={`relative z-10 transition-colors ${
                      isActive ? 'text-forest font-black' : 'text-cream/70 hover:text-white'
                    }`}>
                      {tab.tabLabel}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Matchup Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMatchup.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Contender A: Commercial Pretender */}
              <div className="lg:col-span-6 rounded-3xl bg-black/40 backdrop-blur-md border border-tangerine/30 p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-tangerine/20 text-tangerine">
                      {activeMatchup.commercial.tag}
                    </span>
                    <span className="text-xs font-mono text-cream/50">COMMERCIAL OPTION</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black font-serif text-cream">
                    {activeMatchup.commercial.name}
                  </h3>

                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={activeMatchup.commercial.image}
                      alt={activeMatchup.commercial.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 font-mono">
                      <span className="text-[10px] text-cream/60 uppercase block">Shelf Retail Price</span>
                      <span className="text-3xl font-black text-tangerine">{activeMatchup.commercial.price}</span>
                    </div>
                  </div>

                  {/* Comparative Density Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-cream/60 uppercase">Protein Concentration</span>
                      <motion.span
                        key={activeMatchup.commercial.percent}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-tangerine font-bold"
                      >
                        {activeMatchup.commercial.percent}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMatchup.commercial.percent}%` }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        className="bg-tangerine h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-default"
                    >
                      <span className="text-[10px] text-cream/50 block uppercase">Protein Content</span>
                      <span className="text-xl font-black text-cream">{activeMatchup.commercial.protein}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-default"
                    >
                      <span className="text-[10px] text-cream/50 block uppercase">Cost / 10g Protein</span>
                      <span className="text-xl font-black text-tangerine">{activeMatchup.commercial.costPer10g}</span>
                    </motion.div>
                  </div>

                  {/* Drawbacks */}
                  <div className="space-y-1.5 pt-2">
                    {activeMatchup.commercial.drawbacks.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-cream/70">
                        <X className="w-3.5 h-3.5 text-tangerine flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contender B: The Whole Food Sovereign */}
              <div className="lg:col-span-6 rounded-3xl bg-forest-deep/80 backdrop-blur-md border-2 border-chartreuse/50 p-8 flex flex-col justify-between space-y-6 relative overflow-hidden group shadow-2xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-chartreuse text-forest">
                      {activeMatchup.staple.tag}
                    </span>
                    <span className="text-xs font-mono text-chartreuse font-bold">BIOLOGY WINNER</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black font-serif text-chartreuse">
                    {activeMatchup.staple.name}
                  </h3>

                  <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-chartreuse/20">
                    <Image
                      src={activeMatchup.staple.image}
                      alt={activeMatchup.staple.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-4 font-mono">
                      <span className="text-[10px] text-cream/70 uppercase block">Kitchen Batch Cost</span>
                      <span className="text-3xl font-black text-chartreuse">{activeMatchup.staple.price}</span>
                    </div>
                  </div>

                  {/* Comparative Density Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-cream/80 uppercase">Protein Concentration</span>
                      <motion.span
                        key={activeMatchup.staple.percent}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-chartreuse font-bold"
                      >
                        {activeMatchup.staple.percent}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeMatchup.staple.percent}%` }}
                        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                        className="bg-chartreuse h-full rounded-full"
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-default"
                    >
                      <span className="text-[10px] text-cream/50 block uppercase">Protein Content</span>
                      <span className="text-xl font-black text-chartreuse">{activeMatchup.staple.protein}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 cursor-default"
                    >
                      <span className="text-[10px] text-cream/50 block uppercase">Cost / 10g Protein</span>
                      <span className="text-xl font-black text-chartreuse">{activeMatchup.staple.costPer10g}</span>
                    </motion.div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-1.5 pt-2">
                    {activeMatchup.staple.benefits.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-mono text-cream/90">
                        <Check className="w-3.5 h-3.5 text-chartreuse flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Launch Full Studio Link */}
          <div className="text-center pt-4">
            <Link
              href={activeMatchup.compareLink}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-butter transition-all shadow-xl active:scale-95"
            >
              <span>Launch Full Scientific Showdown Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT 05: THE SIX SOVEREIGN INSTRUMENTS (ARCHITECTURAL DECK)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-05"
        className="relative w-full py-28 px-4 sm:px-8 bg-gradient-to-b from-[#091A10] via-[#08190F] to-[#07170E] text-cream overflow-hidden z-20 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-chartreuse uppercase tracking-widest block">
                ACT 05 // THE SUITE
              </span>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight">
                Six Precision Instruments.
              </h2>
            </div>
            <p className="text-sm font-mono text-cream/70 max-w-md">
              Scientific discovery tools engineered to uncover the biological value and true economics of everyday nutrition.
            </p>
          </div>

          {/* 6 Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INSTRUMENTS.map((inst, idx) => {
              const Icon = inst.icon
              return (
                <motion.div
                  key={inst.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.65, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 350, damping: 22 } }}
                >
                  <Link
                    href={inst.href}
                    className="group relative h-full min-h-[340px] p-8 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-chartreuse hover:bg-white/[0.08] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(216,240,84,0.15)] flex flex-col justify-between overflow-hidden"
                  >
                    <div className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none">
                      <Image
                        src={inst.bg}
                        alt={inst.title}
                        fill
                        sizes="400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08190F] via-[#08190F]/70 to-transparent" />
                    </div>

                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-center font-mono">
                        <span className="text-[10px] font-bold text-chartreuse uppercase tracking-widest">
                          {inst.tag}
                        </span>
                        <motion.span
                          whileHover={{ rotate: 15, scale: 1.15, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                          className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-chartreuse group-hover:text-forest transition-colors"
                        >
                          <Icon className="w-4 h-4 text-cream group-hover:text-forest transition-colors" />
                        </motion.span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-serif text-cream group-hover:text-chartreuse transition-colors">
                        {inst.title}
                      </h3>

                      <p className="text-xs font-sans text-cream/75 leading-relaxed">
                        {inst.desc}
                      </p>
                    </div>

                    <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between font-mono text-xs font-bold text-cream group-hover:text-chartreuse">
                      <span>{inst.cta}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ACT 06: THE MANIFESTO & HORIZON CLIMAX (FULLSCREEN FINALE)
      ───────────────────────────────────────────────────────────── */}
      <section
        id="act-06"
        className="relative w-full min-h-screen py-28 px-4 sm:px-8 bg-[#07170E] text-cream flex flex-col justify-between items-center text-center overflow-hidden z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-chartreuse/10 via-transparent to-transparent pointer-events-none" />

        {/* Ambient Bioluminescent Breathing Halo */}
        <motion.div
          animate={{
            scale: [0.92, 1.08, 0.92],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D8F054_0%,_transparent_65%)] pointer-events-none filter blur-3xl -z-10"
        />

        <div className="w-full max-w-7xl flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-cream/50 z-10">
          <span>ACT 06 // THE FINAL STATEMENT</span>
          <span>ICMR-NIN STANDARDS · 100% INDEPENDENT</span>
        </div>

        <div className="my-auto max-w-5xl space-y-8 z-10 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest uppercase bg-chartreuse text-forest inline-block shadow-md">
              The Sovereign Manifesto
            </span>

            <h2 className="text-5xl sm:text-7xl lg:text-[108px] font-black font-serif text-cream tracking-tight leading-[0.92]">
              FOOD IS BIOLOGY. <br />
              <span className="text-chartreuse italic font-normal">NOT MARKETING.</span>
            </h2>

            <p className="text-base sm:text-xl font-mono text-cream/75 max-w-2xl mx-auto pt-4 leading-relaxed">
              Stop paying 26x markups for synthetic convenience. The highest quality bioavailable protein on Earth is already waiting in your kitchen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6 flex flex-wrap justify-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/explore"
                className="px-8 py-4 rounded-full bg-chartreuse text-forest font-mono text-xs font-bold uppercase tracking-wider hover:bg-butter transition-all shadow-xl flex items-center gap-2"
              >
                <span>Explore 30+ Whole Foods</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                href="/calculator"
                className="px-8 py-4 rounded-full bg-transparent border-2 border-cream/30 text-cream font-mono text-xs font-bold uppercase tracking-wider hover:border-cream hover:bg-white/10 transition-all"
              >
                Calculate My Daily Target
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full max-w-7xl pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-cream/50 gap-4 z-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-chartreuse" />
            <span>BIOAVAILABILITY BENCHMARKED VIA DIAAS & ICMR-NIN STANDARDS</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/library" className="hover:text-cream transition-colors">
              SAVED LABORATORY
            </Link>
            <span>·</span>
            <Link href="/learn" className="hover:text-cream transition-colors">
              METHODOLOGY
            </Link>
            <span>·</span>
            <Link href="/basket" className="text-chartreuse font-bold hover:underline">
              BASKET READY
            </Link>
          </div>
        </div>
      </section>

      {/* Global Bottom Editorial Ticker */}
      <EditorialTicker />
    </div>
  )
}
