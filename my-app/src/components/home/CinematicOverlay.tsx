'use client'

import React, { useEffect, useState } from 'react'

export function CinematicOverlay() {
  const [timecode, setTimecode] = useState('00:00:26:04')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const s = String(now.getSeconds()).padStart(2, '0')
      const m = String(now.getMinutes()).padStart(2, '0')
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0')
      setTimecode(`00:${m}:${s}:${ms}`)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. 35MM ANALOG FILM GRAIN TEXTURE (Pure SVG Turbulence)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.032] mix-blend-screen"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="cinematic-film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-film-grain)" />
        </svg>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ANAMORPHIC WIDESCREEN CINEMATIC VIGNETTE
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-30 bg-[radial-gradient(ellipse_at_center,_transparent_60%,_rgba(5,11,7,0.75)_100%)]"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          3. CAMERA CORNER CROSSHAIRS & RETICLE MARKS (A24 / ARRI Style)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-30 p-4 sm:p-6 lg:p-8 flex flex-col justify-between"
        aria-hidden="true"
      >
        {/* Top Camera Guides */}
        <div className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/35">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-white/60">REC</span>
            <span className="text-white/40">[{timecode}]</span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[9px]">
            <span>CAM A // 2.39:1 ANAMORPHIC</span>
            <span>·</span>
            <span>24.00 FPS</span>
            <span>·</span>
            <span className="text-chartreuse font-bold">50MM T1.2</span>
          </div>
        </div>

        {/* Bottom Technical Camera Guides */}
        <div className="w-full flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-white/30">
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-chartreuse font-bold">+</span>
            <span>FOCAL PLANE: BIOLOGICAL ABSORPTION</span>
          </div>

          <div className="flex items-center gap-3">
            <span>SPECTRAL RESOLUTION: 100% RAW</span>
            <span className="text-chartreuse font-bold">+</span>
          </div>
        </div>
      </div>
    </>
  )
}
