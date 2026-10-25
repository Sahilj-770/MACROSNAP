'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { act: 1, id: 'opening', label: '01 OPENING' },
  { act: 2, id: 'telemetry', label: '02 TELEMETRY' },
  { act: 3, id: 'staples', label: '03 SOVEREIGN DECK' },
  { act: 4, id: 'showdown', label: '04 DUAL ARENA' },
  { act: 5, id: 'budget-rail', label: '05 VELOCITY RAIL' },
  { act: 6, id: 'instruments', label: '06 PRECISION SUITE' },
  { act: 7, id: 'manifesto', label: '07 MANIFESTO' },
]

export function ScrubberRail() {
  const [activeAct, setActiveAct] = useState<number>(1)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const p = self.progress
        setProgress(Math.round(p * 100))

        if (p < 0.15) setActiveAct(1)
        else if (p < 0.32) setActiveAct(2)
        else if (p < 0.50) setActiveAct(3)
        else if (p < 0.68) setActiveAct(4)
        else if (p < 0.82) setActiveAct(5)
        else if (p < 0.94) setActiveAct(6)
        else setActiveAct(7)
      },
    })

    return () => trigger.kill()
  }, [])

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    if ((window as any).__lenis) {
      ;(window as any).__lenis.scrollTo(el, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-3 pointer-events-auto">
      <div className="flex flex-col items-end gap-2 bg-[#0B1E13]/85 backdrop-blur-md px-3.5 py-4 rounded-2xl border border-white/15 shadow-2xl text-cream">
        <div className="text-[9px] font-mono font-bold uppercase text-chartreuse tracking-widest pb-1 border-b border-white/10 flex items-center gap-1.5 w-full justify-between">
          <span className="w-1.5 h-1.5 rounded-full bg-chartreuse animate-pulse" />
          <span>ACT 0{activeAct}/07</span>
        </div>

        {CHAPTERS.map((ch) => {
          const isActive = activeAct === ch.act
          return (
            <button
              key={ch.act}
              onClick={() => scrollToChapter(ch.id)}
              className={`group flex items-center gap-2.5 text-right transition-all py-0.5 relative cursor-pointer ${
                isActive ? 'text-chartreuse font-bold' : 'text-cream/40 hover:text-cream/90'
              }`}
            >
              <span className="text-[10px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {ch.label}
              </span>
              <div className="relative w-6 h-2 flex items-center justify-end">
                {isActive ? (
                  <motion.div
                    layoutId="activeScrubberIndicator"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="w-6 h-2 rounded-full bg-chartreuse shadow-[0_0_10px_#D8F343]"
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-colors" />
                )}
              </div>
            </button>
          )
        })}

        <div className="pt-1.5 border-t border-white/10 text-[9px] font-mono text-chartreuse font-bold w-full text-center">
          {progress}% PROGRESS
        </div>
      </div>
    </aside>
  )
}
