'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, ShieldCheck, TrendingDown } from 'lucide-react'

export function BotanicalHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle nodes for floating botanical seeds / grains
    interface Particle {
      x: number
      y: number
      radius: number
      color: string
      vx: number
      vy: number
      alpha: number
      angle: number
      spin: number
    }

    const particles: Particle[] = []
    const colors = ['#7D8D39', '#5B6E2C', '#FF5A22', '#A3B18A']
    const count = Math.min(width < 768 ? 24 : 50, 60)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)] ?? '#7D8D39',
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.5 - 0.1, // gently float upward like spores/seeds
        alpha: Math.random() * 0.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
      })
    }

    // Pointer interaction
    let mouseX = width / 2
    let mouseY = height / 2
    let targetMouseX = mouseX
    let targetMouseY = mouseY

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX
      targetMouseY = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop
    const render = () => {
      // Lerp mouse
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      ctx.clearRect(0, 0, width, height)

      // Ambient radial botanical glow
      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      )
      gradient.addColorStop(0, 'rgba(125, 141, 57, 0.08)')
      gradient.addColorStop(0.5, 'rgba(91, 110, 44, 0.03)')
      gradient.addColorStop(1, 'rgba(243, 246, 244, 0)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Render botanical particles
      particles.forEach((p) => {
        p.x += p.vx + (mouseX - width / 2) * 0.0002
        p.y += p.vy + (mouseY - height / 2) * 0.0002
        p.angle += p.spin

        // Wrap around bounds
        if (p.y < -10) p.y = height + 10
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        // Draw seed-like oval
        ctx.beginPath()
        ctx.ellipse(0, 0, p.radius * 1.6, p.radius, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-24 pb-16">
      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Decorative Botanical Ambient Blur Orbs */}
      <div
        className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full bg-[#7D8D39]/10 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full bg-[#FF5A22]/5 blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Editorial Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5B6E2C]/10 border border-[#5B6E2C]/20 text-[#5B6E2C] text-xs font-medium tracking-wide mb-6 backdrop-blur-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Biological Food Values & Rupee-to-Protein Economics</span>
        </div>

        {/* Master Headline (Exact prompt suggested headline) */}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#20271D] leading-[0.95] mb-6">
          Know what <br className="hidden sm:inline" />
          <span className="italic font-normal text-[#5B6E2C]">you eat.</span>
        </h1>

        {/* Supporting Copy (Exact prompt suggested copy) */}
        <p className="max-w-2xl text-base sm:text-xl text-[#737B70] font-sans font-normal leading-relaxed mb-10">
          Understand your food. Make smarter nutritional choices. Benchmarking Indian staples
          against commercial fitness snacks with transparent ICMR-NIN science.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <span>Explore your nutrition</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="#overview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#20271D] border border-[rgba(91,110,44,0.25)] hover:border-[#5B6E2C] text-sm font-semibold transition-all duration-300"
          >
            <span>Discover MacroSnap</span>
          </Link>
        </div>

        {/* Live Empirical Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 pt-10 border-t border-[rgba(91,110,44,0.18)] w-full max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#5B6E2C]">
              ₹2.31
            </span>
            <span className="text-xs text-[#737B70] mt-1">
              Lowest cost / 10g protein <br />
              <strong className="text-[#20271D] font-medium">(Soy Chunks)</strong>
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#FF5A22]">
              12× – 26×
            </span>
            <span className="text-xs text-[#737B70] mt-1">
              Typical price premium in <br />
              commercial fitness bars
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex flex-col items-center text-center">
            <span className="font-display text-3xl sm:text-4xl font-bold text-[#20271D]">
              100%
            </span>
            <span className="text-xs text-[#737B70] mt-1">
              ICMR-NIN IFCT 2017 <br />
              verified food points
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
