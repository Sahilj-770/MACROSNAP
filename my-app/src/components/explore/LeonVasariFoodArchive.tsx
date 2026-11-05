'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'
import { ShoppingBag, Check, X, ShieldCheck, ArrowRight, ArrowLeft, BookOpen, Sparkles } from 'lucide-react'

// Map 12 authentic food items into archival monographs
const FOOD_ARCHIVE_DATA = FOOD_DATABASE.slice(0, 12).map((item, idx) => ({
  ...item,
  index: idx,
  romaji: item.hindiName || item.name.toUpperCase(),
  proteinVal: item.proteinPer100g,
  costPer10g: ((item.estimatedCostPer100g / item.proteinPer100g) * 10).toFixed(2),
  coverColor:
    idx % 4 === 0
      ? '#3F4D20' // Deep Archival Forest
      : idx % 4 === 1
      ? '#5B6E2C' // Deep Olive
      : idx % 4 === 2
      ? '#6B7A30' // Classic Sage Olive
      : '#2D3818', // Heavy Botanical Khaki
}))

export function LeonVasariFoodArchive() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const probeRef = useRef<HTMLDivElement | null>(null)
  const detailRef = useRef<HTMLDivElement | null>(null)
  const svgGroupRef = useRef<SVGGElement | null>(null)

  const [activeIndex, setActiveIndex] = useState(5)
  const [detailOpen, setDetailOpen] = useState(false)
  const [addedToBasket, setAddedToBasket] = useState(false)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const activeFood = FOOD_ARCHIVE_DATA[activeIndex] || FOOD_ARCHIVE_DATA[0]!

  // Shelf physics refs
  const stateRef = useRef({
    s: 17, // start at virtual index (12 + 5)
    T: 17,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    lastDragX: 0,
    lastDragTime: 0,
    T0: 17,
    tiltX: 0,
    tiltY: 0,
    mouseX: 0,
    mouseY: 0,
    hoveredIndex: -1,
    detailOpen: false,
    H: 360,
    ws: 62,
    d: 230,
    gap: 24,
    U: 480,
    P: 1400,
    XS: [] as number[],
  })

  // Precompute integral XS for depth curve
  useEffect(() => {
    const U = 480
    const XS: number[] = []
    let acc = 0
    const maxU = 3 * U
    for (let u = 0; u <= maxU; u += 2) {
      acc += 2 / Math.pow(1 + Math.pow(u / U, 1.6), 1)
      XS.push(acc)
    }
    stateRef.current.XS = XS
  }, [])

  // Animation Loop with Butter-Smooth Spring Physics & Inertia
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animId: number
    let lastTime = performance.now()

    const tapeEls: HTMLElement[] = Array.from(
      container.querySelectorAll<HTMLElement>('.vasari-tape')
    )

    const updateGeometry = () => {
      const probe = probeRef.current
      if (probe) {
        const h = probe.getBoundingClientRect().height || 360
        const isMobile = window.innerWidth <= 768
        stateRef.current.H = h
        stateRef.current.ws = isMobile ? 48 : 58
        stateRef.current.d = isMobile ? 180 : 230
        stateRef.current.gap = isMobile ? 16 : 26
        stateRef.current.U = isMobile ? h * 1.05 : h * 1.35
      }
    }
    updateGeometry()
    window.addEventListener('resize', updateGeometry)

    // Wheel event for desktop trackpad / mousewheel scrolling through the shelf
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) {
        stateRef.current.T += e.deltaY > 0 ? 0.45 : -0.45
      }
    }
    container.addEventListener('wheel', handleWheel, { passive: true })

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        stateRef.current.T -= 1
      } else if (e.key === 'ArrowRight') {
        stateRef.current.T += 1
      } else if (e.key === 'Escape' && stateRef.current.detailOpen) {
        closeDetailSheet()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    const B = (r: number) => {
      if (Math.abs(r) < 1) {
        return (r + Math.sin(Math.PI * r) / Math.PI) / 2
      }
      return r > 0 ? 0.5 : -0.5
    }

    const F = (r: number, ws: number, d: number, gap: number) => {
      return r * (ws + gap) + (d - ws + 1.2 * gap) * B(r)
    }

    const scl = (u: number, U: number) => {
      return 1 / (1 + Math.pow(Math.abs(u) / U, 1.55))
    }

    const xsc = (u: number, U: number, XS: number[]) => {
      const sign = u < 0 ? -1 : 1
      const absU = Math.abs(u)
      const idx = Math.min(XS.length - 1, Math.floor(absU / 2))
      return sign * (XS[idx] || absU * 0.72)
    }

    const smoothstep = (x: number) => {
      const c = Math.max(0, Math.min(1, x))
      return c * c * (3 - 2 * c)
    }

    const loop = (currentTime: number) => {
      const dt = Math.min(0.04, (currentTime - lastTime) / 1000)
      lastTime = currentTime

      const st = stateRef.current

      // Inertial spring damping
      if (!st.isDragging) {
        const diff = st.T - st.s
        st.velocity = st.velocity * 0.85 + diff * 12 * dt
        st.s += st.velocity
      }

      // Keep within virtual loops (36 items: 3 sets of 12)
      if (st.s > 30) {
        st.s -= 12
        st.T -= 12
      } else if (st.s < 6) {
        st.s += 12
        st.T += 12
      }

      // Current active index
      const currIdx = (Math.round(st.s) % 12 + 12) % 12
      setActiveIndex((prev) => (prev !== currIdx ? currIdx : prev))

      const { H, ws, d, gap, U, P, XS } = st

      // Render each monograph in 3D arc space
      tapeEls.forEach((el) => {
        const v = Number(el.dataset.v)
        let r = ((v - st.s) % 36 + 36) % 36
        if (r >= 18) r -= 36

        const o = smoothstep(Math.max(0, 1 - Math.abs(r)))
        const u = F(r, ws, d, gap)

        if (Math.abs(u) > U * 2.1) {
          el.style.display = 'none'
          return
        }
        el.style.display = 'block'

        const sc = scl(u, U)
        const k = 1 / Math.max(0.001, sc)
        const z = P * (1 - k) + o * H * 0.16
        const x = xsc(u, U, XS) * k
        const y = (H * 0.5 * (1 - sc) * 0.38 + o * H * 0.015) * k

        const signU = u < 0 ? -1 : 1
        const rotY =
          signU * Math.min(1, Math.abs(u) / U) * 24 * (1 - o) -
          90 * o +
          st.tiltY * o
        const rotX = st.tiltX * o

        // Active book scale boost (1.1x)
        const scaleBoost = 1 + o * 0.12

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scaleBoost})`
        const relativeZ = Math.round(10 + Math.max(0, 1 - Math.abs(r) / 8) * 35)
        el.style.zIndex = String(relativeZ)

        // Set shading custom property
        const shade = Math.min(0.55, o * 0.45 + (1 - sc) * 0.3)
        el.style.setProperty('--shade', String(shade))
        el.style.setProperty('--cover-shade', String((1 - o) * 0.75))
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', updateGeometry)
      window.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Navigation handlers
  const stepLeft = () => {
    stateRef.current.T -= 1
  }

  const stepRight = () => {
    stateRef.current.T += 1
  }

  // Pointer drag events with velocity tracking
  const handlePointerDown = (e: React.PointerEvent) => {
    stateRef.current.isDragging = true
    stateRef.current.dragStartX = e.clientX
    stateRef.current.lastDragX = e.clientX
    stateRef.current.lastDragTime = performance.now()
    stateRef.current.T0 = stateRef.current.s
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const st = stateRef.current
    if (st.isDragging) {
      const now = performance.now()
      const dt = Math.max(1, now - st.lastDragTime)
      const dx = e.clientX - st.dragStartX
      const stepDist = st.H * 0.42

      st.T = st.T0 - dx / stepDist
      st.velocity = -((e.clientX - st.lastDragX) / stepDist) / (dt / 16)
      st.lastDragX = e.clientX
      st.lastDragTime = now
    } else {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const mx = (e.clientX - rect.left) / rect.width - 0.5
        const my = (e.clientY - rect.top) / rect.height - 0.5
        st.tiltY = mx * 18
        st.tiltX = -my * 14
      }
    }
  }

  const handlePointerUp = () => {
    const st = stateRef.current
    st.isDragging = false
    // Magnetically snap to the nearest integer index plus residual velocity fling
    const fling = Math.max(-2, Math.min(2, Math.round(st.velocity * 3)))
    st.T = Math.round(st.T + fling)
  }

  // Open / Close Detail Sheet
  const openDetailSheet = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    stateRef.current.detailOpen = true
    setDetailOpen(true)
    setAddedToBasket(false)

    // Trigger ink-bleed SVG circles expansion animation
    setTimeout(() => {
      const g = svgGroupRef.current
      if (g) {
        const circles = g.querySelectorAll('circle')
        circles.forEach((c) => {
          const delay = Number(c.dataset.delay || 0)
          setTimeout(() => {
            c.setAttribute('r', '780')
            c.style.transition = 'r 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }, delay)
        })
      }
    }, 50)
  }

  const closeDetailSheet = () => {
    stateRef.current.detailOpen = false
    setDetailOpen(false)
  }

  const handleAddToBasket = () => {
    addToBasket(activeFood.id, 100)
    setAddedToBasket(true)
    setTimeout(() => setAddedToBasket(false), 2400)
  }

  // Virtual items (36 items: 3 sets of 12)
  const tapes = useMemo(() => {
    const list = []
    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < FOOD_ARCHIVE_DATA.length; i++) {
        const item = FOOD_ARCHIVE_DATA[i]!
        list.push({
          ...item,
          virtualIndex: c * 12 + i,
        })
      }
    }
    return list
  }, [])

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#F3F6F4] overflow-hidden select-none pt-24 sm:pt-28 pb-10"
      style={{
        cursor: stateRef.current.isDragging ? 'grabbing' : 'default',
        isolation: 'isolate',
      }}
    >
      {/* Hidden Probe Element to Measure H */}
      <div
        ref={probeRef}
        className="absolute pointer-events-none opacity-0 h-[min(52vh,38vw)] max-h-[420px] min-h-[280px]"
        aria-hidden="true"
      />

      {/* SVG Ink Blot Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="vasari-ink-bleed">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="90"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Top Archival Header Bar */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto px-4 mt-2 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-[11px] font-mono tracking-widest uppercase text-[#5B6E2C] mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Curated Monograph Collection &bull; ICMR-NIN IFCT 2017</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#20271D] tracking-tight">
          The Living Food Archive
        </h1>
        <p className="text-xs sm:text-sm text-[#737B70] mt-2 max-w-lg leading-relaxed">
          Drag horizontally, scroll, or step to browse 12 authentic biological monographs. Click the active volume to unfold its chemical composition dossier.
        </p>
      </div>

      {/* 3D Arc Shelf Stage (Luxury Monograph Gallery) */}
      <div
        className="relative w-full h-[min(52vh,38vw)] max-h-[420px] min-h-[280px] flex items-center justify-center my-auto"
        style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Soft Floor Shadow Under Active Volume */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '82%',
            width: 'min(92vw, 1020px)',
            height: '90px',
            background:
              'radial-gradient(50% 50% at 50% 45%, rgba(45,56,24,.32), rgba(91,110,44,.10) 60%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* 3D Center Stage Anchor */}
        <div
          className="relative w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {tapes.map((tape) => {
            const isCenter = (tape.virtualIndex % 12) === activeIndex

            return (
              <div
                key={tape.virtualIndex}
                data-v={tape.virtualIndex}
                className="vasari-tape absolute top-[-180px] left-0 w-0 h-[360px]"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* 1. Spine Face (Archival Cloth Binding with Raised Gold Ribs) */}
                <div
                  className="absolute top-0 left-[-26px] w-[52px] h-[360px] rounded-xs overflow-hidden flex flex-col justify-between py-3 px-2 text-center shadow-xl transition-transform border-r border-black/30"
                  style={{
                    backgroundColor: tape.coverColor,
                    color: '#F3F6F4',
                    transform: 'translateZ(105px)',
                    backgroundImage:
                      'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.08) 0%, transparent 80%)',
                  }}
                >
                  {/* Darkness Overlay Driven by CSS variable --shade */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-black transition-opacity"
                    style={{ opacity: 'var(--shade, 0.2)' }}
                  />

                  {/* Top Rib & Monogram */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-full h-[2px] bg-[#F3F6F4]/30 mb-2 shadow-xs" />
                    <span className="text-[8px] font-mono tracking-widest uppercase opacity-75">
                      FOLIO
                    </span>
                    <span className="text-[9px] font-mono font-bold text-[#FF5A22]">
                      #0{tape.index + 1}
                    </span>
                  </div>

                  {/* Vertical Debossed Gold Title */}
                  <div
                    className="relative z-10 text-[11px] font-display font-bold tracking-widest uppercase my-auto whitespace-nowrap text-[#F3F6F4] drop-shadow-sm"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                    }}
                  >
                    {tape.name}
                  </div>

                  {/* Bottom Rib & Protein Seal */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="px-1.5 py-0.5 rounded-xs bg-black/30 border border-white/20 text-[9px] font-mono font-bold text-[#A3B18A]">
                      {tape.proteinVal}g
                    </div>
                    <div className="w-full h-[2px] bg-[#F3F6F4]/30 mt-2 shadow-xs" />
                  </div>
                </div>

                {/* 2. Simulated Deckled Paper Edges Block (Physical 3D Volume) */}
                <div
                  className="absolute top-[4px] bottom-[4px] left-[-24px] w-[208px] h-[352px] pointer-events-none opacity-90 shadow-md"
                  style={{
                    transform: 'rotateY(0deg) translateZ(0px)',
                    backgroundColor: '#EBE6D8',
                    backgroundImage:
                      'repeating-linear-gradient(180deg, #EBE6D8 0px, #EBE6D8 2px, #D5CEBE 3px)',
                  }}
                  aria-hidden="true"
                />

                {/* 3. Cover Face (Antique Archival Monograph with Gold Foil Inset) */}
                <div
                  onClick={(e) => {
                    if (isCenter) {
                      openDetailSheet(e)
                    } else {
                      stateRef.current.T = Math.round(tape.virtualIndex)
                    }
                  }}
                  className="absolute top-0 left-[-104px] w-[210px] h-[360px] rounded-xs overflow-hidden p-5 flex flex-col justify-between shadow-2xl cursor-pointer hover:brightness-105 transition-all border border-[#7D8D39]/30"
                  style={{
                    backgroundColor: '#20271D',
                    color: '#F3F6F4',
                    transform: 'rotateY(90deg) translateZ(26px)',
                    backgroundImage:
                      'radial-gradient(circle at 50% 20%, rgba(91,110,44,0.22) 0%, rgba(21,27,18,0.98) 80%)',
                  }}
                >
                  {/* Debossed Inset Border */}
                  <div
                    className="absolute inset-2.5 rounded-xs border border-[rgba(125,141,57,0.35)] pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Silk Bookmark Ribbon peeking from bottom */}
                  <div
                    className="absolute bottom-0 right-7 w-3.5 h-7 bg-[#FF5A22] shadow-md pointer-events-none rounded-b-xs"
                    aria-hidden="true"
                  />

                  {/* Top Folio Bar */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/20 pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#7D8D39]">
                      ICMR-NIN &bull; 0{tape.index + 1}
                    </span>
                    <span className="text-[9px] font-mono text-[#FF5A22] font-bold">
                      ₹{tape.costPer10g}/10g
                    </span>
                  </div>

                  {/* Center Archival Bookplate */}
                  <div className="relative z-10 my-auto text-center py-4 px-2 bg-black/25 rounded-xs border border-white/10">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-[#A3B18A] block mb-1">
                      {tape.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight text-[#F3F6F4] mb-1">
                      {tape.name}
                    </h3>
                    <p className="text-[11px] text-[#7D8D39] font-mono">
                      {tape.romaji}
                    </p>
                  </div>

                  {/* Bottom Macro Bar */}
                  <div className="relative z-10 pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#A3B18A] font-bold bg-white/10 px-2 py-0.5 rounded-xs">
                      {tape.proteinVal}g PROTEIN
                    </span>
                    <span className="text-white/70">
                      {tape.caloriesPer100g} kcal
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Caption & Navigation Controls */}
      <div className="relative z-20 flex flex-col items-center gap-3 w-full max-w-xl mx-auto px-4 mt-2">
        <div className="flex items-center justify-center gap-6 sm:gap-12 w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={stepLeft}
            className="w-11 h-11 rounded-full border border-[rgba(91,110,44,0.3)] text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-xs"
            aria-label="Previous Tape"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Center Masked Caption */}
          <div className="text-center overflow-hidden flex flex-col items-center">
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#5B6E2C] tracking-tight leading-none mb-1">
              {activeFood.name}
            </h3>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#7D8D39] block mb-2">
              {activeFood.romaji}
            </span>
            <div className="w-8 h-[1.5px] bg-[#5B6E2C] mb-2" />
            <span className="text-xs font-mono font-medium text-[#20271D]">
              {activeFood.proteinVal}G PROTEIN / 100G &mdash; ₹{activeFood.costPer10g} PER 10G
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={stepRight}
            className="w-11 h-11 rounded-full border border-[rgba(91,110,44,0.3)] text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-xs"
            aria-label="Next Tape"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Inspect Dossier Action Button */}
        <button
          type="button"
          onClick={openDetailSheet}
          className="mt-2 px-5 py-2 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-mono tracking-wider uppercase hover:bg-[#7D8D39] transition-all flex items-center gap-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Inspect Biological Dossier</span>
        </button>
      </div>

      {/* Timeline / Protein Metric Ruler */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 mt-6 mb-2">
        <div className="relative h-10 flex items-center">
          {/* Base Ruler Line */}
          <div className="absolute left-0 right-0 h-[1.5px] bg-[rgba(91,110,44,0.3)]" />

          {/* Ticks 5g to 60g */}
          {[10, 20, 30, 40, 50, 60].map((tick) => {
            const leftPct = ((tick - 5) / 55) * 100
            return (
              <div
                key={tick}
                className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
                style={{ left: `${leftPct}%` }}
              >
                <div className="w-[1px] h-3 bg-[#5B6E2C]" />
                <span className="text-[9px] font-mono text-[#7D8D39] mt-2">
                  {tick}g
                </span>
              </div>
            )
          })}

          {/* Sliding Tangerine Active Dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FF5A22] border-2 border-[#F3F6F4] shadow-md transition-all duration-300"
            style={{
              left: `clamp(0%, ${((activeFood.proteinVal - 5) / 55) * 100}%, 100%)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>

      {/* Full-Screen Biological Dossier with Ink Blot Bleed */}
      {detailOpen && (
        <div
          ref={detailRef}
          className="fixed inset-0 z-[120] bg-[#F3F6F4] text-[#20271D] overflow-y-auto flex flex-col justify-between p-6 sm:p-14 animate-in fade-in duration-200"
        >
          {/* Top Bar: Close & Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-[rgba(91,110,44,0.2)]">
            <button
              type="button"
              onClick={closeDetailSheet}
              className="px-4 py-2 rounded-full border border-[rgba(91,110,44,0.3)] text-xs font-mono uppercase tracking-widest text-[#20271D] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              <span>CLOSE ARCHIVE</span>
            </button>
            <span className="text-xs font-mono uppercase tracking-widest text-[#5B6E2C]">
              MACROSNAP &mdash; BIOLOGICAL DOSSIER // FOLIO #0{activeFood.index + 1}
            </span>
          </div>

          {/* Two-Column Editorial Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 my-auto py-8 max-w-6xl mx-auto w-full items-center">
            {/* Left Column: Scientific Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF5A22]">
                {activeFood.romaji} / {activeFood.category}
              </span>

              <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#5B6E2C] leading-none">
                {activeFood.name}
              </h1>

              <div className="text-xs font-mono text-[#737B70]">
                {activeFood.proteinVal}G PROTEIN &bull; {activeFood.caloriesPer100g} KCAL &bull;{' '}
                {activeFood.servingSizeGrams}G SERVING
              </div>

              <p className="text-sm sm:text-base text-[#20271D] font-serif leading-relaxed max-w-xl">
                {activeFood.shortDescription}
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[rgba(91,110,44,0.18)] text-xs space-y-1 shadow-xs">
                <strong className="text-[#5B6E2C]">Preparation &amp; Bioavailability Tip:</strong>
                <p className="text-[#737B70]">{activeFood.highlightTip}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#5B6E2C] block">
                    Retail Kirana Benchmark
                  </span>
                  <span className="text-xs text-[#20271D]">{activeFood.costNote}</span>
                </div>
                <strong className="font-display text-3xl font-bold text-[#5B6E2C]">
                  ₹{activeFood.costPer10g}
                  <span className="text-xs font-sans font-normal text-[#737B70]"> / 10g</span>
                </strong>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleAddToBasket}
                  className={`px-8 py-3.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                    addedToBasket
                      ? 'bg-[#7D8D39] text-white'
                      : 'bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4]'
                  }`}
                >
                  {addedToBasket ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Grocery Ledger</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add 100g to Grocery Basket</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: SVG Poster with Expanding Ink Bleed Circles */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[320px] sm:w-[380px] h-[480px] rounded-2xl overflow-hidden bg-[#20271D] shadow-2xl p-6 text-[#F3F6F4] flex flex-col justify-between border border-white/20">
                {/* SVG Ink Bleed Mask */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 474 900"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <mask id="vasari-poster-ink-mask">
                      <rect width="474" height="900" fill="black" />
                      <g ref={svgGroupRef} filter="url(#vasari-ink-bleed)">
                        <circle cx="150" cy="330" r="0" fill="white" data-delay="0" />
                        <circle cx="340" cy="600" r="0" fill="white" data-delay="120" />
                        <circle cx="250" cy="120" r="0" fill="white" data-delay="220" />
                        <circle cx="90" cy="760" r="0" fill="white" data-delay="300" />
                        <circle cx="400" cy="250" r="0" fill="white" data-delay="360" />
                        <circle cx="260" cy="860" r="0" fill="white" data-delay="420" />
                        <circle cx="230" cy="470" r="0" fill="white" data-delay="180" />
                      </g>
                    </mask>
                  </defs>

                  <rect
                    width="474"
                    height="900"
                    fill={activeFood.coverColor}
                    mask="url(#vasari-poster-ink-mask)"
                  />
                </svg>

                {/* Poster Content */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/30 pb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#FF5A22]">
                    NIN-ICMR IFCT 2017
                  </span>
                  <span className="text-xs font-mono text-white/80">#0{activeFood.index + 1}</span>
                </div>

                <div className="relative z-10 my-auto text-center">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#F3F6F4]/80 block mb-2">
                    BIOLOGICAL FOOD PROFILE
                  </span>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight mb-2">
                    {activeFood.name}
                  </h2>
                  <p className="text-sm font-sans text-[#F3F6F4]/90">{activeFood.romaji}</p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-mono">
                  <span>52% PURE DENSITY</span>
                  <span className="text-[#FF5A22] font-bold">₹{activeFood.costPer10g} / 10G</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
