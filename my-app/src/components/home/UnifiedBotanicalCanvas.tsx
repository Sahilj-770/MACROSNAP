'use client'

import React, { useEffect, useRef } from 'react'

interface UnifiedBotanicalCanvasProps {
  interactive?: boolean
}

export function UnifiedBotanicalCanvas({ interactive = true }: UnifiedBotanicalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle definition for botanical spores and amino-acid nutrient nodes
    interface Spore {
      x: number
      y: number
      z: number
      radius: number
      color: string
      alpha: number
      vx: number
      vy: number
      bloom: number
      rotation: number
      spin: number
      type: 'pollen' | 'filament' | 'spark'
    }

    const spores: Spore[] = []
    const colors = ['#7D8D39', '#5B6E2C', '#FF5A22', '#8FA351', '#4A5B22']
    const isMobile = width < 768
    const count = isMobile ? 26 : 48
    const worldHeight = Math.max(height * 2.5, 2000)

    for (let i = 0; i < count; i++) {
      const typeRand = Math.random()
      const type: 'pollen' | 'filament' | 'spark' =
        typeRand > 0.82 ? 'spark' : typeRand > 0.5 ? 'filament' : 'pollen'
      const color =
        type === 'spark'
          ? '#FF5A22'
          : type === 'filament'
          ? '#5B6E2C'
          : colors[Math.floor(Math.random() * colors.length)] || '#7D8D39'

      spores.push({
        x: (Math.random() - 0.5) * width * 1.8,
        y: (Math.random() - 0.5) * worldHeight,
        z: Math.random() * 1200 + 100,
        radius: type === 'spark' ? Math.random() * 1.8 + 1 : Math.random() * 3 + 1.8,
        color,
        alpha: Math.random() * 0.35 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.2 - 0.05,
        bloom: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.015,
        type,
      })
    }

    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    let lastScrollY = window.scrollY
    let scrollDelta = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX - width / 2
      targetMouseY = e.clientY - height / 2
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY
      scrollDelta = currentScroll - lastScrollY
      lastScrollY = currentScroll
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    // Perspective projection depth
    const fov = 480

    // Render loop
    const render = () => {
      // Smooth cursor lerp
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Smooth scroll delta dampening
      scrollDelta *= 0.88
      const scrollSpeedBoost = Math.min(1.2, Math.abs(scrollDelta) * 0.06)

      ctx.clearRect(0, 0, width, height)

      // Subtle ambient cursor glow (whisper soft, zero eye strain)
      const mouseGlow = ctx.createRadialGradient(
        width / 2 + mouseX,
        height / 2 + mouseY,
        10,
        width / 2 + mouseX,
        height / 2 + mouseY,
        320
      )
      mouseGlow.addColorStop(0, 'rgba(125, 141, 57, 0.035)')
      mouseGlow.addColorStop(1, 'rgba(125, 141, 57, 0)')
      ctx.fillStyle = mouseGlow
      ctx.fillRect(0, 0, width, height)

      // Render living botanical spores
      spores.forEach((p) => {
        // Slow forward velocity + soft scroll influence
        const flightSpeed = 0.3 + scrollSpeedBoost
        p.z -= flightSpeed

        // Soft vertical drift + parallax scroll nudge
        p.y += p.vy - scrollDelta * 0.22
        p.x += p.vx

        // Continuous wrap in 3D world space (seamless, no popping)
        if (p.z <= 60) {
          p.z = 1400
          p.x = (Math.random() - 0.5) * width * 1.8
          p.y = (Math.random() - 0.5) * worldHeight
        } else if (p.z > 1400) {
          p.z = 60
        }

        // Y wrap (far off-screen)
        if (p.y < -worldHeight / 2) {
          p.y += worldHeight
        } else if (p.y > worldHeight / 2) {
          p.y -= worldHeight
        }

        // Depth fading: 0 at z=1400, full at 300..1100, fades to 0 at z=60
        let depthFade = 1
        if (p.z > 1100) {
          depthFade = Math.max(0, (1400 - p.z) / 300)
        } else if (p.z < 260) {
          depthFade = Math.max(0, (p.z - 60) / 200)
        }

        // Perspective scaling
        const scale = fov / p.z
        const projX = width / 2 + (p.x - mouseX * 0.25) * scale
        const projY = height / 2 + (p.y - mouseY * 0.25) * scale

        // Gentle organic bloom oscillation
        p.bloom += 0.018
        p.rotation += p.spin

        const rCurrent = Math.max(0.8, p.radius * scale * (1 + Math.sin(p.bloom) * 0.18))
        const finalAlpha = p.alpha * depthFade

        if (
          finalAlpha > 0.01 &&
          projX > -60 &&
          projX < width + 60 &&
          projY > -60 &&
          projY < height + 60
        ) {
          ctx.save()
          ctx.translate(projX, projY)
          ctx.rotate(p.rotation)
          ctx.globalAlpha = finalAlpha

          // Soft ambient halo
          const halo = ctx.createRadialGradient(0, 0, 0, 0, 0, rCurrent * 2.2)
          halo.addColorStop(0, p.color)
          halo.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = halo
          ctx.beginPath()
          ctx.arc(0, 0, rCurrent * 2.2, 0, Math.PI * 2)
          ctx.fill()

          // Core spore geometry
          ctx.fillStyle = p.color
          if (p.type === 'filament') {
            ctx.beginPath()
            ctx.ellipse(0, 0, rCurrent * 1.8, rCurrent * 0.7, 0, 0, Math.PI * 2)
            ctx.fill()
          } else if (p.type === 'spark') {
            ctx.fillStyle = '#FF5A22'
            ctx.beginPath()
            ctx.arc(0, 0, rCurrent * 1.1, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.beginPath()
            ctx.arc(0, 0, rCurrent, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.restore()
        }
      })

      // Interconnecting living rhizome filaments (subtle, calm)
      ctx.lineWidth = 0.6
      const connectMaxDist = isMobile ? 55 : 80

      for (let i = 0; i < spores.length; i += 2) {
        const p1 = spores[i]!
        if (p1.z > 1150 || p1.z < 200) continue
        const scale1 = fov / p1.z
        const x1 = width / 2 + (p1.x - mouseX * 0.25) * scale1
        const y1 = height / 2 + (p1.y - mouseY * 0.25) * scale1

        for (let j = i + 1; j < spores.length; j += 4) {
          const p2 = spores[j]!
          if (p2.z > 1150 || p2.z < 200) continue
          if (Math.abs(p1.z - p2.z) > 160) continue

          const scale2 = fov / p2.z
          const x2 = width / 2 + (p2.x - mouseX * 0.25) * scale2
          const y2 = height / 2 + (p2.y - mouseY * 0.25) * scale2

          const dist = Math.hypot(x1 - x2, y1 - y2)
          if (dist < connectMaxDist) {
            const filamentAlpha = (1 - dist / connectMaxDist) * 0.12
            ctx.strokeStyle = '#5B6E2C'
            ctx.globalAlpha = filamentAlpha
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [interactive])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
