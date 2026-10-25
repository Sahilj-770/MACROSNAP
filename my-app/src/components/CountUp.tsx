'use client'

import React, { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  to,
  from = 0,
  duration = 1.5,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: CountUpProps) {
  const [val, setVal] = useState(from)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const startTime = performance.now()
          const diff = to - from

          const update = (now: number) => {
            const elapsed = (now - startTime) / 1000
            const progress = Math.min(1, elapsed / duration)
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const currentVal = from + diff * easeProgress

            setVal(currentVal)

            if (progress < 1) {
              requestAnimationFrame(update)
            } else {
              setVal(to)
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [to, from, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
