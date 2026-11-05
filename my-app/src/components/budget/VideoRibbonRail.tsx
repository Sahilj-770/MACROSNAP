'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FoodItem } from '@/types/food'
import { Trophy, TrendingDown, ArrowDown, Eye, Check } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

interface VideoRibbonRailProps {
  items: FoodItem[]
  onSelectFood: (food: FoodItem) => void
}

export function VideoRibbonRail({ items, onSelectFood }: VideoRibbonRailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const addToBasket = useUserStore((state) => state.addToBasket)
  const [addedId, setAddedId] = useState<string | null>(null)

  useEffect(() => {
    let gsapModule: any = null
    let ScrollTriggerModule: any = null

    // Dynamically load GSAP and ScrollTrigger to ensure client-side compatibility
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsapModule = gsap
        ScrollTriggerModule = ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

        if (!containerRef.current || !trackRef.current) return

        const ctx = gsap.context(() => {
          ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=160%',
            pin: true,
            scrub: 1,
            onUpdate: (self: any) => {
              setScrollProgress(self.progress)
            },
          })
        }, containerRef)

        return () => ctx.revert()
      }
    ).catch(() => {
      // Fallback
    })

    return () => {
      if (ScrollTriggerModule) {
        ScrollTriggerModule.getAll().forEach((t: any) => t.kill())
      }
    }
  }, [])

  const handleAdd = (food: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation()
    addToBasket(food.id, 100)
    setAddedId(food.id)
    setTimeout(() => setAddedId(null), 1800)
  }

  // Calculate 3D rail transform based on scroll progress (0.0 to 1.0)
  // At 0%: cards travel in a gentle curve deep in z-space.
  // At 100%: cards dock forward into comparison formation.
  const railZ = -400 * (1 - scrollProgress)
  const railRotateX = 15 * (1 - scrollProgress)
  const railTranslateX = (1 - scrollProgress) * -120

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 bg-[#F3F6F4] overflow-hidden select-none"
    >
      {/* Editorial Header */}
      <div className="max-w-4xl mx-auto text-center z-10 pt-8">
        <span className="text-[11px] uppercase tracking-widest text-[#7D8D39] font-semibold block mb-2">
          3D Protein Ribbon Journey
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D]">
          The National Value Ribbon.
        </h2>
        <p className="text-xs sm:text-sm text-[#737B70] mt-2 max-w-xl mx-auto">
          Scroll down to travel through India&apos;s most economical protein sources. Watch the cards
          approach in space, then settle into the live economic podium.
        </p>

        {/* Scroll Indicator Prompt */}
        <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#5B6E2C] font-medium animate-bounce">
          <ArrowDown className="w-3.5 h-3.5" />
          <span>Scroll to travel the ribbon</span>
        </div>
      </div>

      {/* 3D Ribbon Stage */}
      <div
        className="relative w-full h-[480px] flex items-center justify-center my-6"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={trackRef}
          style={{
            transform: `translate3d(${railTranslateX}px, 0px, ${railZ}px) rotateX(${railRotateX}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
          className="relative flex items-center gap-6"
        >
          {items.slice(0, 6).map((food, idx) => {
            // Distribute along an s-curve wave
            const angle = (idx / 6) * Math.PI * 2 + scrollProgress * Math.PI
            const waveY = Math.sin(angle) * 40 * (1 - scrollProgress)
            const waveZ = Math.cos(angle) * 120 * (1 - scrollProgress)

            const costPer10g = (
              (food.estimatedCostPer100g / food.proteinPer100g) *
              10
            ).toFixed(2)

            return (
              <div
                key={food.id}
                onClick={() => onSelectFood(food)}
                style={{
                  transform: `translate3d(0px, ${waveY}px, ${waveZ}px)`,
                  transition: 'transform 0.3s ease',
                }}
                className="w-[260px] sm:w-[290px] p-6 rounded-3xl bg-white border border-[rgba(91,110,44,0.22)] shadow-xl cursor-pointer hover:border-[#5B6E2C] hover:scale-105 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C]">
                      Rank #{idx + 1}
                    </span>
                    <span className="text-xs font-display font-semibold text-[#7D8D39]">
                      {food.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#20271D] leading-snug">
                    {food.name}
                  </h3>
                  {food.hindiName && (
                    <p className="text-xs text-[#737B70] mt-0.5">{food.hindiName}</p>
                  )}

                  <div className="my-4 space-y-1.5 text-xs text-[#737B70] pt-3 border-t border-[rgba(91,110,44,0.12)]">
                    <div className="flex justify-between">
                      <span>Protein Density:</span>
                      <strong className="text-[#5B6E2C]">{food.proteinPer100g}g / 100g</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Serving Size:</span>
                      <span className="text-[#20271D]">{food.servingSizeGrams}g</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-3 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-[#5B6E2C] uppercase tracking-wider">
                      ₹ / 10g Protein
                    </span>
                    <strong className="font-display text-2xl font-bold text-[#5B6E2C]">
                      ₹{costPer10g}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectFood(food)
                      }}
                      className="flex-1 py-2 rounded-xl bg-[#F3F6F4] hover:bg-[#5B6E2C] hover:text-white text-[#20271D] text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleAdd(food, e)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        addedId === food.id
                          ? 'bg-[#7D8D39] text-white'
                          : 'bg-[#5B6E2C] hover:bg-[#FF5A22] text-white'
                      }`}
                      aria-label="Add item to basket"
                    >
                      {addedId === food.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span>+ Basket</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Ribbon Progress Indicator */}
      <div className="max-w-md mx-auto w-full flex items-center gap-4 z-10 pb-4">
        <span className="text-[11px] text-[#737B70] font-mono">0%</span>
        <div className="flex-1 h-1.5 bg-[rgba(91,110,44,0.18)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5B6E2C] rounded-full transition-all duration-100"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <span className="text-[11px] text-[#737B70] font-mono">100%</span>
      </div>
    </div>
  )
}
