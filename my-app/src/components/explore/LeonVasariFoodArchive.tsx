'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FOOD_DATABASE } from '@/data/foods'
import { useUserStore } from '@/store/useUserStore'
import { ShoppingBag, Check, X, ArrowRight, ArrowLeft, BookOpen, Sparkles } from 'lucide-react'

// Authentic daylight food imagery mapping
const FOOD_IMAGES: Record<string, string> = {
  'soy-chunks': '/images/food/food_0.webp',
  'roasted-chana': '/images/food/food_6.webp',
  'paneer-fresh': '/images/food/food_4.webp',
  'whole-eggs': '/images/food/food_3.webp',
  'yellow-moong-dal': '/images/food/food_1.webp',
  'sattu-roasted': '/images/food/food_2.webp',
  'chicken-breast': '/images/food/food_8.webp',
  'greek-yogurt-curd': '/images/food/food_7.webp',
  'peanuts-roasted': '/images/food/food_9.webp',
  'tofu-firm': '/images/food/food_5.webp',
  'almonds-raw': '/images/food/food_9.webp',
  'whey-protein-isolate': '/images/food/food_0.webp',
}

// 12 authentic food items from FOOD_DATABASE
const FOOD_ARCHIVE_DATA = FOOD_DATABASE.slice(0, 12).map((item, idx) => ({
  ...item,
  index: idx,
  romaji: item.hindiName || item.name.toUpperCase(),
  proteinVal: item.proteinPer100g,
  costPer10g: ((item.estimatedCostPer100g / item.proteinPer100g) * 10).toFixed(2),
  image: FOOD_IMAGES[item.id] || item.imageUrl || '/images/food/food_0.webp',
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
  const detailRef = useRef<HTMLDivElement | null>(null)
  const svgGroupRef = useRef<SVGGElement | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [detailOpen, setDetailOpen] = useState(false)
  const [addedToBasket, setAddedToBasket] = useState(false)
  const addToBasket = useUserStore((state) => state.addToBasket)

  const activeFood = FOOD_ARCHIVE_DATA[activeIndex] || FOOD_ARCHIVE_DATA[0]!

  // Shelf physics refs
  const stateRef = useRef({
    s: 0,
    T: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    lastDragX: 0,
    lastDragTime: 0,
    T0: 0,
    tiltX: 0,
    tiltY: 0,
    detailOpen: false,
  })

  // Animation Loop with Butter-Smooth Spring Physics & Inertia
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animId: number
    let lastTime = performance.now()

    const itemEls: HTMLElement[] = Array.from(
      container.querySelectorAll<HTMLElement>('.archive-shelf-item')
    )

    // Wheel event for trackpad / mousewheel scrolling through the shelf
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 4) {
        stateRef.current.T += e.deltaY > 0 ? 0.35 : -0.35
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

    const smoothstep = (x: number) => {
      const c = Math.max(0, Math.min(1, x))
      return c * c * (3 - 2 * c)
    }

    const loop = (currentTime: number) => {
      const dt = Math.min(0.04, (currentTime - lastTime) / 1000)
      lastTime = currentTime

      const st = stateRef.current

      // Crisp spring damping
      if (!st.isDragging) {
        const diff = st.T - st.s
        if (Math.abs(diff) < 0.003 && Math.abs(st.velocity) < 0.003) {
          st.s = st.T
          st.velocity = 0
        } else {
          st.velocity = st.velocity * 0.72 + diff * 28 * dt
          st.s += st.velocity
        }
      }

      // Continuous loop normalization around 12 items
      while (st.s >= 12) {
        st.s -= 12
        st.T -= 12
      }
      while (st.s < 0) {
        st.s += 12
        st.T += 12
      }

      // Current active index
      const currIdx = (Math.round(st.s) % 12 + 12) % 12
      setActiveIndex((prev) => (prev !== currIdx ? currIdx : prev))

      const isMobile = window.innerWidth <= 768

      // Render each monograph in 3D arc space
      itemEls.forEach((el) => {
        const idx = Number(el.dataset.idx)
        let r = ((idx - st.s) % 12 + 12) % 12
        if (r >= 6) r -= 12

        const d = Math.abs(r)
        const o = smoothstep(Math.max(0, 1 - d))

        // Culling: items beyond distance 4.5 are hidden
        if (d > 4.5) {
          el.style.display = 'none'
          return
        }
        el.style.display = 'block'

        // Lateral X offset
        const lateralSpacing = isMobile ? 48 : 72
        const centerSpread = isMobile ? 110 : 160
        let x = 0
        if (r > 0) {
          x = centerSpread * Math.min(1, r) + Math.max(0, r - 1) * lateralSpacing
        } else if (r < 0) {
          x = -centerSpread * Math.min(1, -r) - Math.max(0, -r - 1) * lateralSpacing
        }

        // Depth Z offset (Center card stands forward; sides recede into background)
        const z = 30 * o - Math.pow(d, 1.35) * (isMobile ? 40 : 65)

        // Vertical Y subtle arc
        const y = Math.pow(d, 1.2) * (isMobile ? 2.5 : 5)

        // Rotation Y (Active card faces directly forward at 0deg; side cards turn to show spines)
        const rotY =
          r > 0
            ? -(55 + Math.min(15, (r - 1) * 5)) * (1 - o)
            : r < 0
            ? (55 + Math.min(15, (-r - 1) * 5)) * (1 - o)
            : st.tiltY * o

        const rotX = st.tiltX * o

        // Scale: active card is prominent; side cards scale gently
        const scale = 1.04 * o + (1 - o) * Math.max(0.72, 1 - d * 0.05)

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`

        // Z-Index: center is on top
        const relativeZ = Math.round(50 - d * 6)
        el.style.zIndex = String(relativeZ)

        // Cards remain 100% solid & opaque
        el.style.opacity = '1'

        // Clean toggle between Cover and Spine representations
        const coverFace = el.querySelector<HTMLElement>('.card-cover-face')
        const spineFace = el.querySelector<HTMLElement>('.card-spine-face')
        if (coverFace && spineFace) {
          if (o > 0.45) {
            coverFace.style.opacity = '1'
            coverFace.style.pointerEvents = 'auto'
            spineFace.style.opacity = '0'
            spineFace.style.pointerEvents = 'none'
          } else {
            coverFace.style.opacity = '0'
            coverFace.style.pointerEvents = 'none'
            spineFace.style.opacity = '1'
            spineFace.style.pointerEvents = 'auto'
          }
        }
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
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
      const stepDist = 180

      st.T = st.T0 - dx / stepDist
      st.velocity = -((e.clientX - st.lastDragX) / stepDist) / (dt / 16)
      st.lastDragX = e.clientX
      st.lastDragTime = now
    } else {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const mx = (e.clientX - rect.left) / rect.width - 0.5
        const my = (e.clientY - rect.top) / rect.height - 0.5
        st.tiltY = mx * 10
        st.tiltX = -my * 8
      }
    }
  }

  const handlePointerUp = () => {
    const st = stateRef.current
    st.isDragging = false
    const fling = Math.max(-2, Math.min(2, Math.round(st.velocity * 2.2)))
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

  const handleAddToBasket = (foodId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    addToBasket(foodId, 100)
    setAddedToBasket(true)
    setTimeout(() => setAddedToBasket(false), 2400)
  }

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#F3F6F4] overflow-hidden select-none pt-20 sm:pt-28 pb-8"
      style={{
        cursor: stateRef.current.isDragging ? 'grabbing' : 'default',
        isolation: 'isolate',
      }}
    >
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
      <div className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto px-4 mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-[11px] font-mono tracking-widest uppercase text-[#5B6E2C] mb-2 sm:mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Curated Monograph Collection &bull; ICMR-NIN IFCT 2017</span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#20271D] tracking-tight">
          The Living Food Archive
        </h1>
        <p className="text-xs sm:text-sm text-[#737B70] mt-1.5 sm:mt-2 max-w-lg leading-relaxed hidden sm:block">
          Drag horizontally, scroll, or step through 12 authentic biological monographs. Click the active volume to unfold its chemical composition dossier.
        </p>
      </div>

      {/* 3D Arc Shelf Stage */}
      <div
        className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center my-auto"
        style={{ perspective: '1400px', perspectiveOrigin: '50% 50%' }}
      >
        {/* Soft Ambient Floor Shadow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '84%',
            width: 'min(92vw, 1020px)',
            height: '70px',
            background:
              'radial-gradient(50% 50% at 50% 45%, rgba(45,56,24,.24), rgba(91,110,44,.06) 60%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* 3D Center Stage Anchor */}
        <div
          className="relative w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {FOOD_ARCHIVE_DATA.map((item) => {
            const isCenter = item.index === activeIndex

            return (
              <div
                key={item.id}
                data-idx={item.index}
                onClick={(e) => {
                  if (!isCenter) {
                    stateRef.current.T = item.index
                  }
                }}
                className="archive-shelf-item absolute top-[-180px] sm:top-[-200px] left-[-125px] sm:left-[-145px] w-[250px] sm:w-[290px] h-[360px] sm:h-[420px] will-change-transform cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* 
                  ==============================================================
                  1. FRONT COVER FACE (Prominent daylight photo, never clipped title, stats & action)
                  ==============================================================
                */}
                <div
                  className="card-cover-face absolute inset-0 rounded-2xl overflow-hidden bg-[#1C2417] text-[#F3F6F4] shadow-2xl border border-[#7D8D39]/30 flex flex-col justify-between transition-opacity duration-200"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 50% 15%, rgba(91,110,44,0.25) 0%, rgba(20,26,17,0.98) 85%)',
                  }}
                >
                  {/* Daylight Food Photography Window */}
                  <div className="relative w-full h-[155px] sm:h-[190px] overflow-hidden bg-[#2D3818]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C2417] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Folio Strip */}
                    <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-mono text-[#A3B18A] uppercase tracking-wider">
                        FOLIO #0{item.index + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF5A22] text-[10px] font-mono text-white font-bold shadow-xs">
                        ₹{item.costPer10g} / 10g
                      </span>
                    </div>

                    {/* Category Pill at bottom of image */}
                    <div className="absolute bottom-2 left-3 z-10">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#A3B18A]/90 bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base sm:text-xl font-bold text-[#F3F6F4] leading-snug line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#7D8D39] font-mono mt-0.5">
                        {item.romaji}
                      </p>
                    </div>

                    {/* Macro Matrix */}
                    <div className="grid grid-cols-3 gap-1.5 py-2 sm:py-2.5 border-y border-white/10 my-1 sm:my-2 text-center">
                      <div className="p-1 rounded-lg bg-white/5">
                        <span className="block text-[8px] sm:text-[9px] font-mono text-[#A3B18A] uppercase">Protein</span>
                        <strong className="text-xs font-mono font-bold text-white">{item.proteinVal}g</strong>
                      </div>
                      <div className="p-1 rounded-lg bg-white/5">
                        <span className="block text-[8px] sm:text-[9px] font-mono text-white/60 uppercase">Energy</span>
                        <strong className="text-xs font-mono font-bold text-white">{item.caloriesPer100g}k</strong>
                      </div>
                      <div className="p-1 rounded-lg bg-white/5">
                        <span className="block text-[8px] sm:text-[9px] font-mono text-[#FF5A22] uppercase">Cost/100g</span>
                        <strong className="text-xs font-mono font-bold text-[#FF5A22]">₹{item.estimatedCostPer100g}</strong>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-0.5 sm:pt-1">
                      <button
                        type="button"
                        onClick={(e) => handleAddToBasket(item.id, e)}
                        className={`flex-1 py-1.5 sm:py-2 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                          isCenter && addedToBasket
                            ? 'bg-[#7D8D39] text-white'
                            : 'bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4]'
                        }`}
                      >
                        {isCenter && addedToBasket ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add 100g</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={openDetailSheet}
                        className="p-1.5 sm:p-2 rounded-full border border-white/20 hover:border-[#7D8D39] text-white/80 hover:text-white transition-colors"
                        title="Inspect Biological Dossier"
                        aria-label="Inspect Biological Dossier"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 
                  ==============================================================
                  2. SPINE FACE (Archival Cloth Binding with Debossed Gold Title)
                  ==============================================================
                */}
                <div
                  className="card-spine-face absolute inset-0 rounded-xs overflow-hidden flex flex-col justify-between py-4 px-2 text-center shadow-xl border-r border-black/30 transition-opacity duration-200"
                  style={{
                    backgroundColor: item.coverColor,
                    color: '#F3F6F4',
                    width: '56px',
                    left: 'calc(50% - 28px)',
                    backgroundImage:
                      'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.12) 0%, transparent 80%)',
                  }}
                >
                  {/* Top Rib & Monogram */}
                  <div className="flex flex-col items-center">
                    <div className="w-full h-[2px] bg-[#F3F6F4]/30 mb-2 shadow-xs" />
                    <span className="text-[8px] font-mono tracking-widest uppercase opacity-75">
                      FOLIO
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#FF5A22]">
                      #0{item.index + 1}
                    </span>
                  </div>

                  {/* Vertical Debossed Gold Title */}
                  <div
                    className="text-[11px] font-display font-bold tracking-widest uppercase my-auto whitespace-nowrap text-[#F3F6F4] drop-shadow-sm"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                    }}
                  >
                    {item.name}
                  </div>

                  {/* Bottom Rib & Protein Seal */}
                  <div className="flex flex-col items-center">
                    <div className="px-1.5 py-0.5 rounded-xs bg-black/40 border border-white/20 text-[9px] font-mono font-bold text-[#A3B18A]">
                      {item.proteinVal}g
                    </div>
                    <div className="w-full h-[2px] bg-[#F3F6F4]/30 mt-2 shadow-xs" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Caption & Step Navigation Controls */}
      <div className="relative z-20 flex flex-col items-center gap-2.5 w-full max-w-xl mx-auto px-4 mt-2 sm:mt-4">
        <div className="flex items-center justify-center gap-5 sm:gap-10 w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={stepLeft}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(91,110,44,0.3)] bg-white/70 backdrop-blur-xs text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Previous Monograph"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Center Masked Caption */}
          <div className="text-center overflow-hidden flex flex-col items-center max-w-xs sm:max-w-sm">
            <h3 className="font-display text-xl sm:text-3xl font-bold text-[#5B6E2C] tracking-tight leading-tight mb-0.5">
              {activeFood.name}
            </h3>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#7D8D39] block mb-1">
              {activeFood.romaji}
            </span>
            <div className="w-8 h-[1.5px] bg-[#5B6E2C] my-1" />
            <span className="text-[11px] sm:text-xs font-mono font-medium text-[#20271D]">
              {activeFood.proteinVal}G PROTEIN / 100G &mdash; ₹{activeFood.costPer10g} PER 10G
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={stepRight}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(91,110,44,0.3)] bg-white/70 backdrop-blur-xs text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-xs active:scale-95"
            aria-label="Next Monograph"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Inspect Dossier Action Button */}
        <button
          type="button"
          onClick={openDetailSheet}
          className="mt-1 sm:mt-2 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-xs font-mono tracking-wider uppercase hover:bg-[#7D8D39] transition-all flex items-center gap-2 shadow-xs hover:shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Inspect Full Biological Dossier</span>
        </button>
      </div>

      {/* Timeline / Protein Metric Ruler */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 mt-4 sm:mt-6 mb-1">
        <div className="relative h-9 sm:h-10 flex items-center">
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
                <div className="w-[1px] h-2.5 sm:h-3 bg-[#5B6E2C]" />
                <span className="text-[8px] sm:text-[9px] font-mono text-[#7D8D39] mt-1.5 sm:mt-2">
                  {tick}g
                </span>
              </div>
            )
          })}

          {/* Sliding Tangerine Active Dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#FF5A22] border-2 border-[#F3F6F4] shadow-md transition-all duration-300 pointer-events-none"
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

              <h1 className="font-display text-4xl sm:text-6xl font-bold text-[#5B6E2C] leading-none">
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
                  onClick={() => handleAddToBasket(activeFood.id)}
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

            {/* Right Column: High-Res Plated Food Poster with SVG Ink Bleed */}
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
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-white/30 shadow-lg mb-4">
                    <img
                      src={activeFood.image}
                      alt={activeFood.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#F3F6F4]/80 block mb-2">
                    BIOLOGICAL FOOD PROFILE
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-2">
                    {activeFood.name}
                  </h2>
                  <p className="text-sm font-sans text-[#F3F6F4]/90">{activeFood.romaji}</p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-mono">
                  <span>{activeFood.proteinVal}G PROTEIN / 100G</span>
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
