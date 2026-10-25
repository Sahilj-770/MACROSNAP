'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight, Flame, Scale, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SOVEREIGN_FOODS = [
  {
    id: 'soy-chunks',
    num: '01',
    name: 'Soy Chunks',
    hindi: 'सोया बड़ी',
    tag: '52% PROTEIN DENSITY',
    protein: '52g',
    cost: '₹2.30',
    costSub: 'Per 10g Protein',
    desc: 'The undisputed budget protein champion. 52% pure plant protein by weight. Zero artificial sweeteners or gums.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=soy-chunks&foodB=commercial-protein-bar',
  },
  {
    id: 'eggs-whole',
    num: '02',
    name: 'Desi Whole Eggs',
    hindi: 'उबले अंडे',
    tag: 'DIAAS > 1.18 APEX',
    protein: '13g',
    cost: '₹10.70',
    costSub: 'Per 10g Protein',
    desc: 'The gold standard of human protein bioavailability. Complete amino profile, choline, and fat-soluble vitamins.',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=boiled-egg-whole&foodB=commercial-protein-bar',
  },
  {
    id: 'roasted-chana',
    num: '03',
    name: 'Roasted Bengal Gram',
    hindi: 'भुना चना',
    tag: 'PREBIOTIC FIBER (16.8G)',
    protein: '22.5g',
    cost: '₹6.60',
    costSub: 'Per 10g Protein',
    desc: 'Zero-cooking instant pantry staple. High in resistant starch that feeds colon microbiome and maintains satiety.',
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=roasted-chana&foodB=commercial-protein-bar',
  },
  {
    id: 'paneer-fresh',
    num: '04',
    name: 'Fresh Cow Paneer',
    hindi: 'ताज़ा पनीर',
    tag: 'SUSTAINED CASEIN',
    protein: '18.3g',
    cost: '₹24.50',
    costSub: 'Per 10g Protein',
    desc: 'High biological value dairy staple. Rich in bioavailable calcium and slow-digesting casein for overnight synthesis.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=paneer-raw&foodB=firm-tofu',
  },
  {
    id: 'sattu-chana',
    num: '05',
    name: 'Stone-Ground Sattu',
    hindi: 'चना सत्तू',
    tag: 'LOW GLYCEMIC COOLANT',
    protein: '21g',
    cost: '₹7.60',
    costSub: 'Per 10g Protein',
    desc: 'India’s original whole food protein shake. Drink with cold water, roasted jeera, and black salt in 60 seconds.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=roasted-chana&foodB=whey-protein-isolate',
  },
  {
    id: 'yellow-moong-dal',
    num: '06',
    name: 'Yellow Moong Dal',
    hindi: 'धुली मूँग',
    tag: 'GENTLE DIGESTION',
    protein: '24.5g',
    cost: '₹5.70',
    costSub: 'Per 10g Protein',
    desc: 'The easiest lentil on sensitive digestion. Rapid cooking time, gentle oligosaccharides with zero gastric heaviness.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80',
    compareHref: '/compare?foodA=soy-chunks&foodB=yellow-moong-dal',
  },
]

export function SpreadingStaples() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const isDesktop = window.matchMedia('(min-width: 1024px)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (!isDesktop || prefersReduced || !gridRef.current || !sectionRef.current) return

      const grid = gridRef.current
      const tiles = Array.from(grid.querySelectorAll('.staple-tile')) as HTMLElement[]
      const tiltAngles = [-6, 5, -4, 6, -3, 4]

      const toCentre = (tile: HTMLElement, axis: 'x' | 'y') => {
        if (axis === 'x') {
          return grid.clientWidth / 2 - (tile.offsetLeft + tile.offsetWidth / 2)
        }
        return Math.min(grid.clientHeight, window.innerHeight * 0.8) / 2 - (tile.offsetTop + tile.offsetHeight / 2)
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: 'top 85%',
          end: 'top 20%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })

      tiles.forEach((tile, index) => {
        tl.fromTo(
          tile,
          {
            x: () => toCentre(tile, 'x'),
            y: () => toCentre(tile, 'y'),
            rotation: tiltAngles[index % tiltAngles.length],
            scale: 0.82,
            opacity: 0.4,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          },
          index * 0.08
        )
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      id="staples"
      className="relative w-full py-28 sm:py-36 px-4 sm:px-8 lg:px-14 bg-[#F4EFE6] text-forest overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-forest/15 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest text-chartreuse text-xs font-mono font-bold tracking-widest uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHAPTER 03 // THE SOVEREIGN DECK</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif text-forest tracking-tight leading-[0.95]">
              Six Pantry <br />
              <span className="text-tangerine italic font-normal">Sovereigns.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base font-mono text-forest/75 max-w-md leading-relaxed">
            The fitness advertising complex wants you to believe protein is rare and expensive.
            These six Indian kitchen staples deliver world-class amino density for a fraction of the cost.
          </p>
        </div>

        {/* 6-Card Spreading Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative"
        >
          {SOVEREIGN_FOODS.map((food) => (
            <div
              key={food.id}
              className="staple-tile group relative rounded-3xl bg-white border border-forest/15 hover:border-forest/50 transition-all duration-300 p-6 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl overflow-hidden"
            >
              {/* Top Meta */}
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] font-bold text-forest/50 uppercase tracking-widest">
                  STAPLE // {food.num}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-forest/5 text-forest font-bold text-[10px] uppercase">
                  {food.tag}
                </span>
              </div>

              {/* Center Image Frame */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-forest-deep/10 border border-forest/10">
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between text-white font-mono">
                  <span className="text-xs text-cream/80">{food.hindi}</span>
                  <span className="text-2xl font-black text-chartreuse">{food.protein}</span>
                </div>
              </div>

              {/* Typography & Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-2xl font-bold font-serif text-forest group-hover:text-tangerine transition-colors">
                    {food.name}
                  </h3>
                  <div className="text-right font-mono">
                    <span className="text-lg font-black text-forest block">{food.cost}</span>
                    <span className="text-[10px] text-forest/50 block">{food.costSub}</span>
                  </div>
                </div>

                <p className="text-xs text-forest/75 leading-relaxed font-sans line-clamp-3">
                  {food.desc}
                </p>
              </div>

              {/* Bottom Quick-Compare Link */}
              <div className="pt-4 border-t border-forest/10 flex items-center justify-between font-mono text-xs font-bold text-forest">
                <Link
                  href={food.compareHref}
                  className="inline-flex items-center gap-1.5 text-forest hover:text-tangerine transition-colors group-hover:translate-x-1 transition-transform"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Launch Head-to-Head Compare</span>
                </Link>
                <Link
                  href={food.compareHref}
                  className="w-8 h-8 rounded-full bg-forest text-chartreuse flex items-center justify-center hover:bg-tangerine hover:text-white transition-colors"
                  aria-label={`Compare ${food.name}`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer Banner */}
        <div className="pt-8 border-t border-forest/15 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-forest/70 gap-4">
          <span>DATA PROVENANCE: ICMR-NIN INDIAN FOOD COMPOSITION TABLES (IFCT 2017)</span>
          <Link
            href="/explore"
            className="text-forest hover:text-tangerine font-bold inline-flex items-center gap-2 underline"
          >
            <span>Explore all 30+ categorized staples in directory</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
