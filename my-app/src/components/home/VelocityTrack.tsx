'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Wallet, ArrowRight, TrendingDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const BUDGET_STAPLES = [
  {
    rank: '01',
    name: 'Soy Chunks (Badi)',
    costPer10g: '₹2.30',
    proteinDensity: '52%',
    prepTime: '4 Mins Boil',
    batchCost: '₹6.00 / 50g',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
  {
    rank: '02',
    name: 'Yellow Moong Dal',
    costPer10g: '₹5.70',
    proteinDensity: '24.5%',
    prepTime: '15 Mins Boil',
    batchCost: '₹8.40 / 60g',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
  {
    rank: '03',
    name: 'Roasted Bengal Gram',
    costPer10g: '₹6.60',
    proteinDensity: '22.5%',
    prepTime: 'Zero Cook Snack',
    batchCost: '₹7.50 / 50g',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
  {
    rank: '04',
    name: 'Stone-Ground Sattu',
    costPer10g: '₹7.60',
    proteinDensity: '21%',
    prepTime: '60s Drink Mix',
    batchCost: '₹6.40 / 40g',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
  {
    rank: '05',
    name: 'Desi Whole Eggs',
    costPer10g: '₹10.70',
    proteinDensity: 'DIAAS 1.18',
    prepTime: '8 Mins Boil',
    batchCost: '₹14.00 / 2 Eggs',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
  {
    rank: '06',
    name: 'Roasted Peanuts with Skin',
    costPer10g: '₹14.20',
    proteinDensity: '25.8%',
    prepTime: 'Zero Cook Snack',
    batchCost: '₹5.40 / 30g',
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
    href: '/budget',
  },
]

export function VelocityTrack() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced || !trackRef.current || !sectionRef.current) return

      const skewTo = gsap.quickTo(trackRef.current, 'skewX', { duration: 0.45, ease: 'power3.out' })
      const settle = gsap.delayedCall(0.14, () => skewTo(0)).pause()

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const velocity = self.getVelocity()
          skewTo(gsap.utils.clamp(-6, 6, velocity / -300))
          settle.restart(true)
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="budget-rail"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-14 bg-[#0A1E13] text-cream overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chartreuse text-forest text-xs font-mono font-bold tracking-widest uppercase">
              <Wallet className="w-3.5 h-3.5" />
              <span>CHAPTER 05 // VELOCITY ECONOMIC RAIL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-cream tracking-tight leading-[0.95]">
              Protein on <br />
              <span className="text-chartreuse italic font-normal">a Budget.</span>
            </h2>
          </div>

          <div className="space-y-2 max-w-md font-mono text-xs text-cream/70">
            <p>
              Ranked by verifiable national market cost per 10 grams of complete, bioavailable protein.
            </p>
            <div className="flex items-center gap-2 text-chartreuse font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>National wholesale & kirana benchmarks</span>
            </div>
          </div>
        </div>

        {/* Velocity-Reactive Horizontal Card Rail */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transform-gpu"
        >
          {BUDGET_STAPLES.map((item) => (
            <div
              key={item.rank}
              className="p-6 sm:p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-chartreuse/50 transition-all duration-300 flex flex-col justify-between space-y-6 group shadow-xl"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-cream/80 font-bold">
                  RANK {item.rank}
                </span>
                <span className="text-chartreuse font-bold">{item.proteinDensity}</span>
              </div>

              {/* Giant Price Typography */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-cream/50 uppercase tracking-widest block">
                  Cost per 10g Protein
                </span>
                <strong className="text-5xl sm:text-6xl font-black font-serif text-chartreuse block tracking-tight">
                  {item.costPer10g}
                </strong>
                <span className="text-xs font-mono text-cream/60 block">{item.batchCost}</span>
              </div>

              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 font-mono text-xs text-cream/90">
                  {item.prepTime}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <h4 className="text-lg font-bold font-serif text-cream group-hover:text-chartreuse transition-colors">
                  {item.name}
                </h4>
                <Link
                  href={item.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-cream group-hover:bg-chartreuse group-hover:text-forest transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Action */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-cream/60 gap-4">
          <span>SIMULATION BENCHMARK: ₹50 DAILY BUDGET = 119G WHOLE FOOD PROTEIN</span>
          <Link
            href="/budget"
            className="text-chartreuse hover:text-white font-bold inline-flex items-center gap-2 underline"
          >
            <span>Launch Complete Rupee-to-Protein Simulation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
