'use client'

import React, { useRef, useState } from 'react'
import { motion, useSpring } from 'motion/react'

interface TiltedCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export default function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const scale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    rotateX.set(tiltX)
    rotateY.set(tiltY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.02)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
