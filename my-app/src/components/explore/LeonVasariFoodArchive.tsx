'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { FOOD_DATABASE } from '@/data/foods'
import { useUserStore } from '@/store/useUserStore'
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Check,
  X,
  Sparkles,
  Scale,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

// 12 Authentic Indian Food Items from FOOD_DATABASE
const FOOD_ARCHIVE_ITEMS = FOOD_DATABASE.slice(0, 12).map((item, idx) => {
  const costPer10gVal = ((item.estimatedCostPer100g / item.proteinPer100g) * 10).toFixed(2)
  const diaasScore =
    item.id === 'whole-eggs'
      ? 1.18
      : item.id === 'paneer-fresh' || item.id === 'greek-yogurt-curd'
      ? 1.15
      : item.id === 'chicken-breast'
      ? 1.08
      : item.id === 'whey-protein-isolate'
      ? 1.15
      : item.id === 'soy-chunks' || item.id === 'tofu-firm'
      ? 0.91
      : item.id === 'roasted-chana' || item.id === 'sattu-roasted'
      ? 0.82
      : item.id === 'yellow-moong-dal'
      ? 0.74
      : 0.52

  // Archival Bookcloth Palette for the Spines
  const spinePalettes = [
    { bg: '#2D3818', accent: '#A3B18A', foil: '#D4AF37' }, // Forest Olive & Gold
    { bg: '#3F4D20', accent: '#BAC79B', foil: '#E5C158' }, // Deep Sage Linen
    { bg: '#1C2616', accent: '#8F9F72', foil: '#C9A038' }, // Dark Botanical
    { bg: '#4A3B22', accent: '#D4C49E', foil: '#DEB887' }, // Antique Buckram
    { bg: '#334024', accent: '#A9BA90', foil: '#D8B244' }, // Olive Khaki
    { bg: '#222B19', accent: '#97A97C', foil: '#C49A2D' }, // Slate Cypress
  ]
  const spineStyle = spinePalettes[idx % spinePalettes.length]!

  return {
    ...item,
    archiveIndex: idx,
    costPer10g: costPer10gVal,
    diaas: diaasScore,
    spineBg: spineStyle.bg,
    spineAccent: spineStyle.accent,
    spineFoil: spineStyle.foil,
    image: item.imageUrl || `/images/food/food_${idx % 10}.webp`,
  }
})

// 5 Curated Nutritional Dietary Categories
const CATEGORIES = [
  { id: 'all', label: 'ALL / सब खाद्य', targetIndex: 0 },
  { id: 'legumes', label: 'LEGUMES / दालें व चना', targetIndex: 1 },
  { id: 'dairy', label: 'DAIRY & EGGS / दुग्ध व अंडे', targetIndex: 2 },
  { id: 'soy', label: 'SOY & PLANT / सोया व पादप', targetIndex: 0 },
  { id: 'poultry', label: 'NUTS & MEATS / मेवे व पोल्ट्री', targetIndex: 6 },
]

export function LeonVasariFoodArchive() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const stageRef = useRef<HTMLDivElement | null>(null)
  const detailModalRef = useRef<HTMLDivElement | null>(null)
  const inkMaskGroupRef = useRef<SVGGElement | null>(null)
  const tapeElsRef = useRef<(HTMLDivElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [detailOpen, setDetailOpen] = useState(false)
  const [addedToast, setAddedToast] = useState<string | null>(null)

  // Custom Cursor State
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [cursorMode, setCursorMode] = useState<'default' | 'spine' | 'cover' | 'button'>('default')

  const addToBasket = useUserStore((state) => state.addToBasket)
  const activeFood = FOOD_ARCHIVE_ITEMS[activeIndex] || FOOD_ARCHIVE_ITEMS[0]!

  // Shelf Physics State (Continuous Endless 36-Tape Loop)
  const stateRef = useRef({
    s: 12, // start on second copy at item 0 (12)
    T: 12,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragLastX: 0,
    dragLastTime: 0,
    T0: 12,
    tiltX: 0,
    tiltY: 0,
    onCover: false,
    detailOpen: false,
    cursorX: -100,
    cursorY: -100,
    targetCursorX: -100,
    targetCursorY: -100,
    hoverVirtualIdx: -1,
    liftValues: new Array(36).fill(0),
  })

  // Smoothstep helper: S-curve transition
  const smoothstep = (x: number) => {
    const c = Math.max(0, Math.min(1, x))
    return c * c * (3 - 2 * c)
  }

  // Smooth Step Push B(r) from Leon Vasari Math
  const pushStep = (r: number) => {
    if (Math.abs(r) < 1) {
      return (r + Math.sin(Math.PI * r) / Math.PI) / 2
    }
    return Math.sign(r) * 0.5
  }

  // Determine active category based on current item
  useEffect(() => {
    const item = FOOD_ARCHIVE_ITEMS[activeIndex]
    if (!item) return
    if (item.category === 'lentils-legumes') setActiveCategory('legumes')
    else if (item.category === 'dairy' || item.category === 'eggs') {
      if (item.id === 'chicken-breast') setActiveCategory('poultry')
      else setActiveCategory('dairy')
    } else if (item.category === 'soy-products') setActiveCategory('soy')
    else if (item.category === 'nuts-seeds') setActiveCategory('poultry')
    else setActiveCategory('all')
  }, [activeIndex])

  // Main Animation Loop
  useEffect(() => {
    let animId: number
    let prevTime = performance.now()

    const loop = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.05)
      prevTime = now

      const st = stateRef.current
      const container = containerRef.current
      if (!container) {
        animId = requestAnimationFrame(loop)
        return
      }

      // Smooth cursor lerp
      st.cursorX += (st.targetCursorX - st.cursorX) * (1 - Math.exp(-16 * dt))
      st.cursorY += (st.targetCursorY - st.cursorY) * (1 - Math.exp(-16 * dt))
      setCursorPos({ x: st.cursorX, y: st.cursorY })

      // Spring physics for shelf scroll position s towards target T
      const springK = st.isDragging ? 18 : 5.2
      st.s += (st.T - st.s) * (1 - Math.exp(-springK * dt))
      if (Math.abs(st.T - st.s) < 1e-4) {
        st.s = st.T
      }

      // Keep s normalized within [0, 36)
      while (st.s >= 36) {
        st.s -= 12
        st.T -= 12
      }
      while (st.s < 0) {
        st.s += 12
        st.T += 12
      }

      // Active item index
      const currActive = ((Math.round(st.s) % 12) + 12) % 12
      setActiveIndex((prev) => (prev !== currActive ? currActive : prev))

      // Dimensions calculated dynamically from viewport
      const vw = window.innerWidth
      const vh = window.innerHeight
      const isMobile = vw <= 768
      const H = isMobile ? Math.min(vw * 0.62, vh * 0.42) : Math.min(vh * 0.48, vw * 0.32)
      const ws = (H * 142) / 840 // spine width
      const d = (H * 474) / 900 // cover width
      const gap = H * 0.032

      // Write CSS variables on stage
      if (stageRef.current) {
        stageRef.current.style.setProperty('--H', `${H}px`)
        stageRef.current.style.setProperty('--ws', `${ws}px`)
        stageRef.current.style.setProperty('--d', `${d}px`)
      }

      // Cursor tilt calculation when hovering active cover
      const cx = vw / 2
      const cy = vh / 2
      const onCover =
        Math.abs(st.targetCursorX - cx) < 0.55 * d &&
        Math.abs(st.targetCursorY - cy) < 0.55 * H &&
        !st.detailOpen &&
        Math.abs(st.T - st.s) < 0.3

      st.onCover = onCover
      if (onCover) {
        const targetTiltY = ((st.targetCursorX - cx) / (0.55 * d)) * 9
        const targetTiltX = -((st.targetCursorY - cy) / (H / 2)) * 6
        st.tiltY += (targetTiltY - st.tiltY) * (1 - Math.exp(-7 * dt))
        st.tiltX += (targetTiltX - st.tiltX) * (1 - Math.exp(-7 * dt))
      } else {
        const driftTiltY = ((st.targetCursorX - cx) / vw) * 5
        st.tiltY += (driftTiltY - st.tiltY) * (1 - Math.exp(-7 * dt))
        st.tiltX += (0 - st.tiltX) * (1 - Math.exp(-7 * dt))
      }

      // Update Cursor Mode
      if (!isMobile) {
        if (onCover) {
          setCursorMode('cover')
        } else if (st.hoverVirtualIdx !== -1) {
          const hoveredRelative = ((((st.hoverVirtualIdx - st.s) % 36) + 36) % 36) - 18
          if (Math.abs(hoveredRelative) > 0.5) {
            setCursorMode('spine')
          } else {
            setCursorMode('cover')
          }
        } else {
          setCursorMode('default')
        }
      }

      // Render each of the 36 tapes in 3D
      tapeElsRef.current.forEach((el, vIdx) => {
        if (!el) return

        // Relative index r in [-18, 18]
        let r = ((((vIdx - st.s) % 36) + 36) % 36) - 18
        const absR = Math.abs(r)

        // Culling: off-screen tapes beyond horizontal range
        if (absR > 14) {
          el.style.visibility = 'hidden'
          return
        }
        el.style.visibility = 'visible'

        // Smooth placement X with neighbor push B(r)
        const B = pushStep(r)
        const x = r * (ws + gap) + (d - ws + 1.6 * gap) * B

        // Openness o: 1 for active item, 0 for side spines
        const o = smoothstep(Math.max(0, 1 - absR))

        // Hover lift animation per spine
        const isHovered = st.hoverVirtualIdx === vIdx && absR > 0.5
        const targetLift = isHovered ? 1 : 0
        st.liftValues[vIdx] += (targetLift - (st.liftValues[vIdx] || 0)) * (1 - Math.exp(-12 * dt))
        const lift = st.liftValues[vIdx] || 0

        // 3D Transformations
        const rotY = -90 * o + st.tiltY * o
        const rotX = st.tiltX * o
        const rotZ = -4.5 * o
        const z = o * 0.22 * H
        const y = -o * 0.025 * H - lift * 0.048 * H

        el.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`
        el.style.zIndex = String(Math.round(100 - absR * 4))

        // Shading: spine darkens to 55%, cover brightens from 50% dark to fully lit
        el.style.setProperty('--shade-sp', String(o * 0.55))
        el.style.setProperty('--shade-cv', String((1 - o) * 0.5))
      })

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Mouse Wheel / Trackpad Scrubbing
  const handleWheel = (e: React.WheelEvent) => {
    if (stateRef.current.detailOpen) return
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    if (Math.abs(delta) > 2) {
      stateRef.current.T += delta * 0.004
    }
  }

  // Pointer / Touch Scrubbing with Velocity Fling
  const handlePointerDown = (e: React.PointerEvent) => {
    if (stateRef.current.detailOpen) return
    const st = stateRef.current
    st.isDragging = true
    st.dragStartX = e.clientX
    st.dragLastX = e.clientX
    st.dragLastTime = performance.now()
    st.T0 = st.s
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    const st = stateRef.current
    st.targetCursorX = e.clientX
    st.targetCursorY = e.clientY

    if (st.isDragging && !st.detailOpen) {
      const now = performance.now()
      const dt = Math.max(1, now - st.dragLastTime)
      const dx = e.clientX - st.dragStartX
      const stepPitch = 90

      st.T = st.T0 - dx / stepPitch
      st.velocity = -((e.clientX - st.dragLastX) / stepPitch) / (dt / 16)
      st.dragLastX = e.clientX
      st.dragLastTime = now
    }
  }

  const handlePointerUp = () => {
    const st = stateRef.current
    if (st.isDragging) {
      st.isDragging = false
      const fling = Math.max(-3, Math.min(3, Math.round(st.velocity * 1.8)))
      st.T = Math.round(st.T + fling)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (stateRef.current.detailOpen) {
        if (e.key === 'Escape') closeDetail()
        return
      }
      if (e.key === 'ArrowLeft') {
        stateRef.current.T = Math.round(stateRef.current.T) - 1
      } else if (e.key === 'ArrowRight') {
        stateRef.current.T = Math.round(stateRef.current.T) + 1
      } else if (e.key === 'Enter') {
        openDetail()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Step left / right handlers
  const stepPrev = () => {
    stateRef.current.T = Math.round(stateRef.current.T) - 1
  }
  const stepNext = () => {
    stateRef.current.T = Math.round(stateRef.current.T) + 1
  }

  // Category Tab Click
  const handleCategoryClick = (cat: (typeof CATEGORIES)[number]) => {
    setActiveCategory(cat.id)
    const st = stateRef.current
    const currMod = ((Math.round(st.T) % 12) + 12) % 12
    let diff = cat.targetIndex - currMod
    if (diff > 6) diff -= 12
    if (diff < -6) diff += 12
    st.T = Math.round(st.T) + diff
  }

  // Click on a tape
  const handleTapeClick = (vIdx: number) => {
    const st = stateRef.current
    const r = ((((vIdx - st.s) % 36) + 36) % 36) - 18
    if (Math.abs(r) < 0.5) {
      openDetail()
    } else {
      st.T = Math.round(st.T + r)
    }
  }

  // Open Detail Sequence with Paper Sheet Growth & Ink Blot Animation
  const openDetail = () => {
    const st = stateRef.current
    st.detailOpen = true
    setDetailOpen(true)

    // Web Animations API: Grow sheet out of active cover rect
    setTimeout(() => {
      const modal = detailModalRef.current
      const activeEl = tapeElsRef.current.find((el) => {
        if (!el) return false
        const vIdx = Number(el.dataset.vidx)
        const r = ((((vIdx - st.s) % 36) + 36) % 36) - 18
        return Math.abs(r) < 0.5
      })

      if (modal && activeEl) {
        const coverFace = activeEl.querySelector('.face-cover') as HTMLElement | null
        const rect = (coverFace || activeEl).getBoundingClientRect()
        const top = rect.top
        const left = rect.left
        const right = window.innerWidth - rect.right
        const bottom = window.innerHeight - rect.bottom

        modal.animate(
          [
            {
              clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round 4px)`,
              transform: 'rotate(-4.5deg)',
            },
            {
              clipPath: 'inset(0px 0px 0px 0px round 0px)',
              transform: 'rotate(0deg)',
            },
          ],
          {
            duration: 950,
            easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
            fill: 'both',
          }
        )
      }

      // Trigger 7-blob Ink Blot Expansion
      const g = inkMaskGroupRef.current
      if (g) {
        const circles = g.querySelectorAll('circle')
        circles.forEach((c) => {
          c.setAttribute('r', '0')
          const delay = Number(c.dataset.delay || 0)
          setTimeout(() => {
            c.setAttribute('r', '780')
            c.style.transition = 'r 1.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }, delay + 450)
        })
      }
    }, 20)
  }

  const closeDetail = () => {
    const modal = detailModalRef.current
    if (modal) {
      const anim = modal.animate(
        [
          { clipPath: 'inset(0px 0px 0px 0px round 0px)', transform: 'rotate(0deg)', opacity: 1 },
          { clipPath: 'inset(25% 25% 25% 25% round 12px)', transform: 'rotate(-4deg)', opacity: 0 },
        ],
        {
          duration: 450,
          easing: 'cubic-bezier(0.76, 0, 0.18, 1)',
          fill: 'both',
        }
      )
      anim.onfinish = () => {
        stateRef.current.detailOpen = false
        setDetailOpen(false)
      }
    } else {
      stateRef.current.detailOpen = false
      setDetailOpen(false)
    }
  }

  // Add active food to user basket
  const handleAddToBasket = (foodId: string, grams = 100) => {
    addToBasket(foodId, grams)
    setAddedToast(`Added 100g of ${activeFood.name} to your Basket!`)
    setTimeout(() => setAddedToast(null), 3200)
  }

  // Generate 36 tapes (3 full copies of 12 foods)
  const TAPES = useMemo(() => {
    const list = []
    for (let c = 0; c < 3; c++) {
      for (let i = 0; i < FOOD_ARCHIVE_ITEMS.length; i++) {
        list.push({
          virtualIndex: c * 12 + i,
          item: FOOD_ARCHIVE_ITEMS[i]!,
        })
      }
    }
    return list
  }, [])

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full min-h-screen bg-[#F3F6F4] text-[#101410] overflow-hidden select-none flex flex-col justify-between pt-20 sm:pt-24 pb-8"
      style={{
        cursor: stateRef.current.isDragging ? 'grabbing' : 'default',
        isolation: 'isolate',
      }}
    >
      {/* 
        ========================================================================
        SVG INK BLOT TURBULENCE FILTER DEFINITION
        ========================================================================
      */}
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
              scale="95"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#08482D] text-[#F5F8EF] shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          <Check className="w-4 h-4 text-[#DAE7C7]" />
          <span>{addedToast}</span>
          <Link href="/basket" className="underline font-semibold ml-2 hover:text-white">
            View Basket
          </Link>
        </div>
      )}

      {/* 
        ========================================================================
        CUSTOM RING CURSOR (desktop fine pointers)
        ========================================================================
      */}
      <div
        className="hidden md:block pointer-events-none fixed z-50 will-change-transform"
        style={{
          left: 0,
          top: 0,
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)`,
        }}
      >
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
            cursorMode === 'cover'
              ? 'w-24 h-24 bg-[#5B6E2C] text-white shadow-lg'
              : cursorMode === 'spine'
              ? 'w-9 h-9 border-[1.5px] border-[#5B6E2C] bg-white/20 backdrop-blur-xs'
              : 'w-12 h-12 border-[1.5px] border-[#101410]/60'
          }`}
        >
          {cursorMode === 'cover' ? (
            <div className="text-center font-mono leading-tight">
              <span className="block text-[10px] font-bold tracking-widest uppercase">OPEN</span>
              <span className="block text-[8px] opacity-80">खोलें</span>
            </div>
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[#5B6E2C]" />
          )}
        </div>
      </div>

      {/* 
        ========================================================================
        TOP ARCHIVAL HEADER & CATEGORY TABS
        ========================================================================
      */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Top Provenance Monogram */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-[#5B6E2C] text-xs font-mono tracking-wider uppercase mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#7D8D39]" />
          <span>Biological Food Archive &bull; ICMR-NIN IFCT 2017</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#101410] tracking-tight">
          The Living Food Archive.
        </h1>
        <p className="text-xs sm:text-sm text-[#5E5E61] mt-1.5 max-w-xl leading-relaxed hidden sm:block">
          Explore 12 authentic biological monographs in physical 3D. Pull any volume out to inspect clinical macro economics and amino acid dossiers.
        </p>

        {/* Category Filter Tabs with Sliding Block */}
        <div className="relative flex items-center justify-center gap-1 sm:gap-2 mt-4 p-1 rounded-full bg-black/5 border border-black/10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className={`relative z-10 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-[#F3F6F4] font-bold' : 'text-[#5E5E61] hover:text-[#101410]'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span
                    className="absolute inset-0 bg-[#5B6E2C] rounded-full -z-10 shadow-xs animate-in fade-in duration-300"
                    style={{ transition: 'all 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        3D ENDLESS SHELF STAGE (perspective: 2200px)
        ========================================================================
      */}
      <div
        className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center my-auto overflow-visible select-none"
        style={{
          perspective: '2200px',
          perspectiveOrigin: '50% 50%',
          touchAction: 'pan-y',
        }}
      >
        {/* Soft Ambient Shelf Shadow */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: '84%',
            width: 'min(94vw, 1100px)',
            height: '80px',
            background:
              'radial-gradient(50% 50% at 50% 45%, rgba(45,56,24,0.28), rgba(91,110,44,0.08) 60%, transparent 75%)',
          }}
          aria-hidden="true"
        />

        {/* Zero-Size 3D Stage Anchor */}
        <div
          ref={stageRef}
          className="relative w-0 h-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {TAPES.map(({ virtualIndex, item }) => {
            return (
              <div
                key={virtualIndex}
                data-vidx={virtualIndex}
                ref={(el) => {
                  tapeElsRef.current[virtualIndex] = el
                }}
                onPointerEnter={() => {
                  stateRef.current.hoverVirtualIdx = virtualIndex
                }}
                onPointerLeave={() => {
                  if (stateRef.current.hoverVirtualIdx === virtualIndex) {
                    stateRef.current.hoverVirtualIdx = -1
                  }
                }}
                onClick={() => handleTapeClick(virtualIndex)}
                className="tape absolute left-0 top-0 will-change-transform cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* 
                  ==============================================================
                  1. SPINE FACE (.sp) — Front face of the 3D cuboid
                  Width: --ws, Height: --H, Left: -ws/2, Transform: translateZ(d/2)
                  ==============================================================
                */}
                <div
                  className="face-spine absolute rounded-xs overflow-hidden flex flex-col justify-between py-4 px-2 text-center shadow-xl border-r border-black/30"
                  style={{
                    width: 'var(--ws)',
                    height: 'var(--H)',
                    left: 'calc(-1 * var(--ws) / 2)',
                    top: 'calc(-1 * var(--H) / 2)',
                    transform: 'translateZ(calc(var(--d) / 2))',
                    backfaceVisibility: 'hidden',
                    backgroundColor: item.spineBg,
                    color: '#F3F6F4',
                    backgroundImage:
                      'radial-gradient(circle at 50% 25%, rgba(255,255,255,0.14) 0%, transparent 75%)',
                  }}
                >
                  {/* Top Rib & Foil Monogram */}
                  <div className="flex flex-col items-center">
                    <div className="w-full h-[1.5px] bg-white/30 mb-2 shadow-xs" />
                    <span className="text-[7.5px] sm:text-[8.5px] font-mono tracking-widest uppercase opacity-75">
                      FOLIO
                    </span>
                    <span
                      className="text-[9.5px] sm:text-[11px] font-mono font-bold"
                      style={{ color: item.spineFoil }}
                    >
                      #0{item.archiveIndex + 1}
                    </span>
                  </div>

                  {/* Vertical Debossed Gold Title */}
                  <div
                    className="text-[10px] sm:text-[12px] font-display font-bold tracking-widest uppercase my-auto whitespace-nowrap text-[#F3F6F4] drop-shadow-sm select-none"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.7)',
                    }}
                  >
                    {item.name}
                  </div>

                  {/* Bottom Rib & Protein Value Badge */}
                  <div className="flex flex-col items-center">
                    <div className="px-1.5 py-0.5 rounded-xs bg-black/50 border border-white/20 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-[#DAE7C7]">
                      {item.proteinPer100g}g
                    </div>
                    <div className="w-full h-[1.5px] bg-white/30 mt-2 shadow-xs" />
                  </div>

                  {/* Shading overlay: darkens as the spine turns away */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    style={{ opacity: 'var(--shade-sp, 0)' }}
                  />
                </div>

                {/* 
                  ==============================================================
                  2. COVER FACE (.cv) — Right-hand side face of the 3D cuboid
                  Width: --d, Height: --H, Left: -d/2, Transform: rotateY(90deg) translateZ(ws/2)
                  ==============================================================
                */}
                <div
                  className="face-cover absolute rounded-2xl overflow-hidden bg-[#182014] text-[#F3F6F4] border border-[#7D8D39]/35 flex flex-col justify-between"
                  style={{
                    width: 'var(--d)',
                    height: 'var(--H)',
                    left: 'calc(-1 * var(--d) / 2)',
                    top: 'calc(-1 * var(--H) / 2)',
                    transform: 'rotateY(90deg) translateZ(calc(var(--ws) / 2))',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 30px 60px -28px rgba(20,16,10,0.65)',
                    backgroundImage:
                      'radial-gradient(circle at 50% 12%, rgba(91,110,44,0.3) 0%, rgba(18,24,15,0.98) 85%)',
                  }}
                >
                  {/* Daylight Food Photography Window */}
                  <div className="relative w-full h-[48%] overflow-hidden bg-[#24301B]">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="eager"
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#182014] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Folio Header Strip */}
                    <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-mono text-[#DAE7C7] uppercase tracking-wider">
                        FOLIO #0{item.archiveIndex + 1}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FF5A22] text-[9.5px] font-mono text-white font-bold shadow-xs">
                        ₹{item.costPer10g} / 10g
                      </span>
                    </div>

                    {/* Category Label at bottom of image */}
                    <div className="absolute bottom-2 left-3 z-10">
                      <span className="text-[9px] uppercase font-mono tracking-widest text-[#DAE7C7]/90 bg-black/50 px-2 py-0.5 rounded-xs backdrop-blur-xs">
                        {item.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-sm sm:text-lg font-bold text-[#F3F6F4] leading-snug line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#A3B18A] font-mono mt-0.5 line-clamp-1">
                        {item.hindiName || item.name}
                      </p>
                    </div>

                    {/* Macro Matrix */}
                    <div className="grid grid-cols-3 gap-1.5 py-1.5 sm:py-2 border-y border-white/10 text-center my-1">
                      <div className="p-1 rounded-md bg-white/5">
                        <span className="block text-[8px] font-mono text-[#A3B18A] uppercase">Protein</span>
                        <strong className="text-xs font-mono font-bold text-white">{item.proteinPer100g}g</strong>
                      </div>
                      <div className="p-1 rounded-md bg-white/5">
                        <span className="block text-[8px] font-mono text-white/60 uppercase">Energy</span>
                        <strong className="text-xs font-mono font-bold text-white">{item.caloriesPer100g}k</strong>
                      </div>
                      <div className="p-1 rounded-md bg-white/5">
                        <span className="block text-[8px] font-mono text-[#FF5A22] uppercase">Cost/100g</span>
                        <strong className="text-xs font-mono font-bold text-[#FF5A22]">₹{item.estimatedCostPer100g}</strong>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToBasket(item.id, 100)
                        }}
                        className="flex-1 py-1.5 px-3 rounded-full text-xs font-semibold bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add 100g</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openDetail()
                        }}
                        className="p-1.5 rounded-full border border-white/20 hover:border-[#7D8D39] text-white/80 hover:text-white transition-colors"
                        title="Inspect Biological Dossier"
                        aria-label="Inspect Biological Dossier"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
                      </button>
                    </div>
                  </div>

                  {/* Shading overlay: brightens as cover turns forward */}
                  <div
                    className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-75"
                    style={{ opacity: 'var(--shade-cv, 0.5)' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 
        ========================================================================
        CAPTION BELOW SHELF WITH MASKED TEXT SLIDE & STEP CONTROLS
        ========================================================================
      */}
      <div className="relative z-20 flex flex-col items-center gap-3 w-full max-w-xl mx-auto px-4 mt-2 sm:mt-4">
        <div className="flex items-center justify-between w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={stepPrev}
            className="w-11 h-11 rounded-full border border-[#5B6E2C]/25 bg-white/80 backdrop-blur-xs text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-2xs active:scale-95 group"
            aria-label="Previous Monograph"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </button>

          {/* Masked Sliding Caption Container */}
          <div className="text-center overflow-hidden flex flex-col items-center flex-1 px-4">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#5B6E2C] tracking-tight leading-tight line-clamp-1">
              {activeFood.name}
            </h2>
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#7D8D39] block mt-0.5">
              {activeFood.hindiName || activeFood.name} &bull; IFCT 2017
            </span>
            <div className="w-8 h-[1.5px] bg-[#5B6E2C]/40 my-1.5" />
            <span className="text-[11px] sm:text-xs font-mono font-medium text-[#101410]">
              {activeFood.proteinPer100g}G PROTEIN / 100G &mdash; ₹{activeFood.costPer10g} PER 10G &mdash; DIAAS {activeFood.diaas}
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={stepNext}
            className="w-11 h-11 rounded-full border border-[#5B6E2C]/25 bg-white/80 backdrop-blur-xs text-[#5B6E2C] hover:bg-[#5B6E2C] hover:text-[#F3F6F4] flex items-center justify-center transition-all shadow-2xs active:scale-95 group"
            aria-label="Next Monograph"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Inspect Dossier Action Button */}
        <button
          type="button"
          onClick={openDetail}
          className="mt-1 px-6 py-2.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 shadow-xs hover:shadow-md active:scale-98"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Inspect Full Biological Dossier</span>
        </button>
      </div>

      {/* 
        ========================================================================
        DETAIL MODAL (Paper Sheet Grow & SVG Ink Blot Poster Bleed-In)
        ========================================================================
      */}
      {detailOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={detailModalRef}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[200] bg-[#F4F2ED] text-[#101410] overflow-y-auto flex flex-col justify-between will-change-transform"
          >
          {/* Top Modal Navigation Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-12 py-5 bg-[#F4F2ED]/95 backdrop-blur-md border-b border-black/10">
            <button
              type="button"
              onClick={closeDetail}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/30 hover:border-black text-xs font-mono uppercase tracking-wider transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>CLOSE / बंद करें</span>
            </button>

            <div className="flex flex-col items-center">
              <span className="font-display font-bold text-sm tracking-widest text-[#5B6E2C]">
                MACROSNAP LABS
              </span>
              <span className="text-[9px] font-mono text-[#5E5E61] uppercase tracking-widest">
                BIOLOGICAL DOSSIER #{activeFood.archiveIndex + 1}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleAddToBasket(activeFood.id, 100)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-white text-xs font-semibold shadow-xs transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add 100g to Basket</span>
            </button>
          </div>

          {/* Modal Grid Content */}
          <div className="max-w-6xl mx-auto w-full px-6 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center flex-1">
            {/* Left Column: Clinical Dossier Information */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-mono uppercase tracking-wider mb-2">
                  {activeFood.category.replace('-', ' ')} &bull; IFCT 2017
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-bold text-[#101410] tracking-tight">
                  {activeFood.name}
                </h2>
                <p className="text-sm sm:text-base text-[#7D8D39] font-mono mt-1">
                  {activeFood.hindiName}
                </p>
              </div>

              {/* Complete Macronutrient Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white border border-black/10 shadow-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#5E5E61] uppercase block">Protein</span>
                  <strong className="text-xl font-display font-bold text-[#5B6E2C]">
                    {activeFood.proteinPer100g}g
                  </strong>
                  <span className="text-[9px] text-[#5E5E61] block">per 100g raw</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5E5E61] uppercase block">Energy</span>
                  <strong className="text-xl font-display font-bold text-[#101410]">
                    {activeFood.caloriesPer100g}
                  </strong>
                  <span className="text-[9px] text-[#5E5E61] block">kcal / 100g</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#5E5E61] uppercase block">Carbs &bull; Fat</span>
                  <strong className="text-base font-display font-bold text-[#101410]">
                    {activeFood.carbsPer100g}g &bull; {activeFood.fatPer100g}g
                  </strong>
                  <span className="text-[9px] text-[#5E5E61] block">macronutrients</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#FF5A22] uppercase block">Rupee Cost</span>
                  <strong className="text-xl font-display font-bold text-[#FF5A22]">
                    ₹{activeFood.costPer10g}
                  </strong>
                  <span className="text-[9px] text-[#5E5E61] block">per 10g protein</span>
                </div>
              </div>

              {/* Biological Description & Clinical Preparation Tip */}
              <div className="space-y-3">
                <p className="text-sm text-[#5E5E61] leading-relaxed">
                  {activeFood.shortDescription}
                </p>
                <div className="p-3.5 rounded-xl bg-[#5B6E2C]/8 border border-[#5B6E2C]/20 text-xs text-[#2D3818] leading-relaxed">
                  <strong className="font-semibold block mb-0.5 text-[#5B6E2C]">
                    Clinical Kitchen Tip:
                  </strong>
                  {activeFood.highlightTip}
                </div>
              </div>

              {/* Provenance & Action Strip */}
              <div className="pt-4 border-t border-black/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] font-mono text-[#5E5E61]">
                  <span>Source: {activeFood.sourceProvenance}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/compare?foodA=${activeFood.id}&foodB=whole-eggs`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6E2C] hover:text-[#7D8D39] underline"
                  >
                    <span>Compare vs Eggs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToBasket(activeFood.id, 100)}
                    className="px-5 py-2.5 rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-[#F5F8EF] text-xs font-semibold shadow-xs flex items-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add 100g to Basket</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Poster with Spreading SVG Ink Blot Reveal */}
            <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
              <svg
                viewBox="0 0 474 900"
                className="w-full h-full max-h-[540px] object-contain drop-shadow-2xl rounded-2xl overflow-hidden"
              >
                <defs>
                  {/* Ragged Ink Mask with 7 Staggered Blobs */}
                  <mask id="ink-mask" x="-200" y="-200" width="874" height="1300">
                    <g ref={inkMaskGroupRef} filter="url(#vasari-ink-bleed)">
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

                {/* The Masked Food Poster Image */}
                <image
                  href={activeFood.image}
                  width="474"
                  height="900"
                  preserveAspectRatio="xMidYMid slice"
                  mask="url(#ink-mask)"
                />

                {/* Poster Editorial Border & Typography Overlay */}
                <rect
                  x="12"
                  y="12"
                  width="450"
                  height="876"
                  fill="none"
                  stroke="#5B6E2C"
                  strokeWidth="1.5"
                  strokeOpacity="0.4"
                  rx="8"
                />
              </svg>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
