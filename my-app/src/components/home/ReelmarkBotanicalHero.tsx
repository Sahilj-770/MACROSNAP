'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Play, Sparkles, ArrowRight } from 'lucide-react'

const VIDEO_URL = '/videos/food_reels_grid.mp4'
const POSTER_URL = '/videos/food_reels_poster.webp'

// 10 Indian Staples / Whole Food cards mapped to the 10 tiles of the 5x2 video grid
const CARDS_DATA = [
  { index: 0, staple: 'Soya Chunks', protein: '52g / 100g', cost: '₹2.31 / 10g', tag: 'High Yield' },
  { index: 1, staple: 'Moong Dal', protein: '24g / 100g', cost: '₹6.25 / 10g', tag: 'Pantry Staple' },
  { index: 2, staple: 'Roasted Sattu', protein: '22.5g / 100g', cost: '₹6.67 / 10g', tag: 'Zero Cooking' },
  { index: 3, staple: 'Whole Eggs', protein: '13.3g / 100g', cost: '₹9.68 / 10g', tag: 'DIAAS 1.18' },
  { index: 4, staple: 'Cow Paneer', protein: '18g / 100g', cost: '₹18.89 / 10g', tag: 'Dairy Matrix' },
  { index: 5, staple: 'Firm Tofu', protein: '15g / 100g', cost: '₹14.71 / 10g', tag: 'Clean Plant' },
  { index: 6, staple: 'Sprouted Chana', protein: '21g / 100g', cost: '₹7.10 / 10g', tag: 'Bioavailable' },
  { index: 7, staple: 'Greek Dahi', protein: '10g / 100g', cost: '₹12.50 / 10g', tag: 'Probiotic' },
  { index: 8, staple: 'Chicken Breast', protein: '22g / 100g', cost: '₹9.68 / 10g', tag: 'Lean Cut' },
  { index: 9, staple: 'Roasted Peanuts', protein: '26g / 100g', cost: '₹7.69 / 10g', tag: 'Dense Energy' },
]

export function ReelmarkBotanicalHero() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const carouselTrackRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])

  const [mounted, setMounted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [scaleUnit, setScaleUnit] = useState(1)

  // Carousel physics state
  const stateRef = useRef({
    offset: 0,
    velocity: 0,
    isPointerDown: false,
    startX: 0,
    lastX: 0,
    lastTime: 0,
    autoSpeed: 50, // 50u per second
  })

  // Measure unit scale `--u = min(100vw / 1440, 100vh / 1080)`
  useEffect(() => {
    const updateUnit = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const u = Math.min(vw / 1440, vh / 1080)
      setScaleUnit(u)
      if (containerRef.current) {
        containerRef.current.style.setProperty('--u', `${u}px`)
      }
    }
    updateUnit()
    window.addEventListener('resize', updateUnit)
    const t = setTimeout(() => setMounted(true), 100)
    return () => {
      window.removeEventListener('resize', updateUnit)
      clearTimeout(t)
    }
  }, [])

  // Cylindrical curved carousel animation loop
  useEffect(() => {
    let animId: number
    let prevTime = performance.now()

    const loop = (now: number) => {
      const dt = Math.min((now - prevTime) / 1000, 0.1) // max 100ms delta
      prevTime = now

      const state = stateRef.current

      if (!state.isPointerDown) {
        if (Math.abs(state.velocity) > 0.5) {
          // Coasting with momentum (decays ~95% per second)
          state.offset += state.velocity * dt
          state.velocity *= Math.pow(0.05, dt)
        } else {
          // Base continuous auto-scroll right -> left
          state.offset += state.autoSpeed * dt
        }
      }

      const totalPitch = 1960 // 10 cards * 196u
      state.offset = ((state.offset % totalPitch) + totalPitch) % totalPitch

      // Update positions of all 10 cards
      for (let i = 0; i < 10; i++) {
        const cardEl = cardRefs.current[i]
        const pathEl = pathRefs.current[i]
        if (!cardEl) continue

        // Unpushed offset t from center (720)
        let rawT = ((i * 196 - state.offset) % totalPitch + totalPitch) % totalPitch
        if (rawT > totalPitch / 2) {
          rawT -= totalPitch
        }
        const t = rawT

        // Outward pushed center x
        const tNorm = t / 706
        const x = 720 + t * (1 + 0.083 * Math.pow(tNorm, 2))

        // Normalized distance from center (0 at 720, 1 at edges)
        const d = Math.abs(x - 720) / 706

        // Card width
        const w = 170 + 48 * Math.pow(d, 2)
        const xLeft = x - w / 2
        const xRight = x + w / 2

        // Left & right edge heights
        const qLeft = Math.abs(xLeft - 720) / 706
        const qRight = Math.abs(xRight - 720) / 706
        const hLeft = 280 + 92 * Math.pow(qLeft, 2.6)
        const hRight = 280 + 92 * Math.pow(qRight, 2.6)

        // Vertical center
        const yCenter = 687 - 12 * Math.pow(d, 2)

        const yTopLeft = yCenter - hLeft / 2
        const yBottomLeft = yCenter + hLeft / 2
        const yTopRight = yCenter - hRight / 2
        const yBottomRight = yCenter + hRight / 2

        const minTop = Math.min(yTopLeft, yTopRight)
        const maxBottom = Math.max(yBottomLeft, yBottomRight)
        const totalH = maxBottom - minTop

        // Coordinates relative to card bounding box
        const pTL = { x: 0, y: yTopLeft - minTop }
        const pTR = { x: w, y: yTopRight - minTop }
        const pBR = { x: w, y: yBottomRight - minTop }
        const pBL = { x: 0, y: yBottomLeft - minTop }

        // Construct 15u rounded quad SVG path
        const r = 15
        const pathD = `
          M ${pTL.x + r} ${pTL.y}
          L ${pTR.x - r} ${pTR.y}
          Q ${pTR.x} ${pTR.y} ${pTR.x} ${pTR.y + r}
          L ${pBR.x} ${pBR.y - r}
          Q ${pBR.x} ${pBR.y} ${pBR.x - r} ${pBR.y}
          L ${pBL.x + r} ${pBL.y}
          Q ${pBL.x} ${pBL.y} ${pBL.x} ${pBL.y - r}
          L ${pTL.x} ${pTL.y + r}
          Q ${pTL.x} ${pTL.y} ${pTL.x + r} ${pTL.y}
          Z
        `
          .replace(/\s+/g, ' ')
          .trim()

        if (pathEl) {
          pathEl.setAttribute('d', pathD)
        }

        // Apply style to card container using CSS variables in units
        cardEl.style.transform = `translate3d(calc(${xLeft} * var(--u)), calc(${minTop} * var(--u)), 0)`
        cardEl.style.width = `calc(${w} * var(--u))`
        cardEl.style.height = `calc(${totalH} * var(--u))`

        // Visibility culling for performance
        if (x < -200 || x > 1640) {
          cardEl.style.display = 'none'
        } else {
          cardEl.style.display = 'block'
        }
      }

      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animId)
  }, [])

  // Drag Handlers (Mouse & Touch with 1:1 tracking and coasting momentum)
  const handlePointerDown = (e: React.PointerEvent) => {
    const u = scaleUnit || 1
    stateRef.current.isPointerDown = true
    stateRef.current.startX = e.clientX / u
    stateRef.current.lastX = e.clientX / u
    stateRef.current.lastTime = performance.now()
    stateRef.current.velocity = 0
    setIsDragging(true)
    ;(e.target as HTMLElement)?.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!stateRef.current.isPointerDown) return
    const u = scaleUnit || 1
    const currentX = e.clientX / u
    const deltaX = currentX - stateRef.current.lastX
    const now = performance.now()
    const dt = Math.max((now - stateRef.current.lastTime) / 1000, 0.001)

    // Follow drag 1:1 (dragging right decreases offset, dragging left increases offset)
    stateRef.current.offset -= deltaX
    stateRef.current.velocity = -deltaX / dt

    stateRef.current.lastX = currentX
    stateRef.current.lastTime = now
  }

  const handlePointerUp = () => {
    stateRef.current.isPointerDown = false
    setIsDragging(false)
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#F5F8EF] text-[#101410] select-none flex flex-col items-center justify-start min-h-[95vh] lg:min-h-[1080px]"
      style={
        {
          '--u': 'min(100vw / 1440, 100vh / 1080)',
        } as React.CSSProperties
      }
    >
      {/* 
        ========================================================================
        1440x1080 CONTAINED STAGE
        ========================================================================
      */}
      <div className="relative w-full max-w-[1440px] h-[920px] lg:h-[1080px] mx-auto overflow-hidden">
        {/* Mint Badge: (575, 115) 292x37 */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-28 lg:top-[calc(115*var(--u))] z-20 flex items-center justify-center px-5 py-2 rounded-full bg-[#DAE7C7] border border-[#08482D]/15 text-[#08482D] text-xs lg:text-[calc(16.6*var(--u))] font-sans font-medium shadow-2xs transition-all duration-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span>Verified by ICMR-NIN IFCT 2017 &bull; 528 Indian Foods</span>
        </div>

        {/* Hand-Drawn "//" Doodle at (263, 377) */}
        <div
          className={`hidden xl:block absolute left-[calc(263*var(--u))] top-[calc(377*var(--u))] z-20 font-caveat text-[calc(36*var(--u))] text-[#08482D] font-bold select-none transition-opacity duration-1000 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          //
        </div>

        {/* Headline: Centred at top 176u, Inter Tight 700, 88u on 92u line */}
        <div className="absolute left-0 right-0 top-40 lg:top-[calc(176*var(--u))] z-20 text-center px-4">
          <h1 className="font-inter-tight font-bold tracking-[-0.035em] text-[#101410] text-4xl sm:text-6xl lg:text-[calc(88*var(--u))] leading-[0.96] lg:leading-[calc(92*var(--u))]">
            <span
              className={`block transition-all duration-700 ${
                mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-6 blur-xs'
              }`}
            >
              Know what you eat
            </span>
            <span
              className={`block tracking-[-0.022em] text-[#08482D] transition-all duration-700 delay-100 ${
                mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-6 blur-xs'
              }`}
            >
              with real food science
            </span>
          </h1>
        </div>

        {/* Subline: Centred at top 394u, 20.8u / 32u line */}
        <p
          className={`absolute left-0 right-0 top-[290px] sm:top-[340px] lg:top-[calc(394*var(--u))] z-20 text-center text-[#5E5E61] font-sans text-sm sm:text-base lg:text-[calc(20.8*var(--u))] leading-relaxed lg:leading-[calc(32*var(--u))] max-w-2xl mx-auto px-4 transition-all duration-700 delay-200 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Benchmark authentic Indian kitchen staples against expensive gym marketing. <br className="hidden sm:inline" />
          Transparent rupee-to-protein economics, verified by clinical scientific standards.
        </p>

        {/* Handwritten Note: "100% verified / by ICMR-NIN" rotated 16° in the right flank */}
        <div
          className={`hidden xl:flex flex-col items-center absolute right-12 lg:right-20 top-40 lg:top-48 z-20 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transform: 'rotate(16deg)' }}
        >
          <span className="font-caveat font-bold text-[#08482D] text-[calc(26*var(--u))] leading-tight text-center">
            100% verified <br /> by ICMR-NIN
          </span>
          {/* Long Curving Arrow Down to Cards */}
          <svg
            className="w-[calc(90*var(--u))] h-[calc(80*var(--u))] text-[#08482D] mt-1"
            viewBox="0 0 100 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M 50 10 C 50 45, 10 55, 15 85"
              className={mounted ? 'animate-in fade-in' : ''}
            />
            <path d="M 8 72 L 15 85 L 26 78" />
          </svg>
        </div>

        {/* 
          ========================================================================
          CYLINDRICAL CURVED CAROUSEL ROW (10 TALL VIDEO CARDS)
          Draggable with momentum, continuous right->left auto-scroll
          ========================================================================
        */}
        <div
          ref={carouselTrackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-0 z-10 select-none overflow-visible"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {CARDS_DATA.map((card, idx) => {
            const col = card.index % 5
            const row = Math.floor(card.index / 5)

            return (
              <div
                key={card.index}
                ref={(el) => {
                  cardRefs.current[idx] = el
                }}
                className="absolute left-0 top-0 will-change-transform pointer-events-auto"
                style={{
                  clipPath: `url(#card-clip-${idx})`,
                  WebkitClipPath: `url(#card-clip-${idx})`,
                }}
              >
                {/* 5x2 Grid Video Offset Container */}
                <div className="relative w-full h-full overflow-hidden bg-[#08482D]/20">
                  {/* High-res Food Image Instant Fallback */}
                  <img
                    src={`/images/food/food_${idx}.webp`}
                    alt={card.staple}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Single Shared Food Motion Grid Video for all 10 cards */}
                  <video
                    src={VIDEO_URL}
                    poster={POSTER_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute max-w-none pointer-events-none"
                    style={{
                      width: '500%',
                      height: '200%',
                      left: `-${col * 100}%`,
                      top: `-${row * 100}%`,
                      objectFit: 'cover',
                    }}
                  />

                  {/* Frosted Play Icon at Card's Bottom-Left */}
                  <div className="absolute left-3.5 bottom-3.5 z-20 w-8 h-8 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center text-[#08482D] shadow-xs">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>

                  {/* Food Staple Label Pill at Top of Card */}
                  <div className="absolute left-3 top-3 z-20 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-xs text-white text-[10px] font-mono tracking-wide">
                    {card.staple} &bull; {card.cost}
                  </div>
                </div>

                {/* SVG ClipPath Definition for Rounded Quad */}
                <svg className="absolute w-0 h-0" aria-hidden="true">
                  <defs>
                    <clipPath id={`card-clip-${idx}`} clipPathUnits="userSpaceOnUse">
                      <path
                        ref={(el) => {
                          pathRefs.current[idx] = el
                        }}
                        d="M 15 0 L 155 0 Q 170 0 170 15 L 170 265 Q 170 280 155 280 L 15 280 Q 0 280 0 265 L 0 15 Q 0 0 15 0 Z"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            )
          })}
        </div>

        {/* 
          ========================================================================
          CALL TO ACTION BUTTON WITH DASHED OUTLINE RING & "ZERO BRO-SCIENCE" NOTE
          ========================================================================
        */}
        {/* Handwritten Note: "Zero bro-science" rotated 24° at (521, 937) with small arrow */}
        <div
          className={`hidden xl:flex items-center gap-1.5 absolute left-[calc(480*var(--u))] top-[calc(920*var(--u))] z-20 transition-all duration-1000 delay-700 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transform: 'rotate(24deg)' }}
        >
          <span className="font-caveat font-bold text-[#08482D] text-[calc(24*var(--u))]">
            Zero bro-science
          </span>
          {/* Small Arrow Pointing to Button */}
          <svg
            className="w-[calc(40*var(--u))] h-[calc(24*var(--u))] text-[#08482D]"
            viewBox="0 0 50 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 5 22 C 20 20, 35 15, 45 10" />
            <path d="M 36 6 L 45 10 L 40 18" />
          </svg>
        </div>

        {/* CTA Button: Forest-Green Pill inside a Dashed Green Outline Ring at (626, 901) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-[820px] sm:top-[850px] lg:top-[calc(901*var(--u))] z-20 flex items-center justify-center transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {/* Dashed Outline Ring (190u x 74u) */}
          <div className="relative w-[190px] h-[74px] lg:w-[calc(190*var(--u))] lg:h-[calc(74*var(--u))] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-[#08482D]/40 pointer-events-none transition-transform duration-500 hover:scale-105"
              aria-hidden="true"
            />
            {/* Main Forest-Green Pill (172u x 58u) */}
            <Link
              href="/explore"
              className="w-[172px] h-[58px] lg:w-[calc(172*var(--u))] lg:h-[calc(58*var(--u))] rounded-full bg-[#08482D] hover:bg-[#5B6E2C] text-white text-sm lg:text-[calc(17*var(--u))] font-semibold flex items-center justify-center gap-2 shadow-md transition-all duration-300 hover:shadow-xl active:scale-95 group cursor-pointer"
            >
              <span>Explore Foods</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ReelmarkBotanicalHero
