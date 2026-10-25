"use client"

import { useEffect, useRef } from "react"
import type * as THREE from "three"

type VantaEffect = {
  destroy: () => void
}

type VantaOptions = {
  el: HTMLElement
  THREE: typeof THREE
  mouseControls?: boolean
  touchControls?: boolean
  gyroControls?: boolean
  minHeight?: number
  minWidth?: number
  scale?: number
  scaleMobile?: number
  color?: number
  backgroundColor?: number
  [key: string]: unknown
}

type VantaEffectFn = (options: VantaOptions) => VantaEffect

type UseVantaOptions = {
  effect: VantaEffectFn
  threeJs: typeof THREE
  options?: Omit<VantaOptions, "el" | "THREE">
}

/**
 * Hook to attach a Vanta.js WebGL background to a container element.
 * Automatically destroys the effect on unmount.
 *
 * Usage:
 *   import WAVES from "vanta/dist/vanta.waves.min"
 *   import * as THREE from "three"
 *   const ref = useVanta({ effect: WAVES, threeJs: THREE, options: { color: 0x0d0d0d } })
 *   return <div ref={ref} className="h-screen w-full" />
 */
export function useVanta({ effect, threeJs, options = {} }: UseVantaOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const vantaRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || vantaRef.current) return

    vantaRef.current = effect({
      el,
      THREE: threeJs,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      ...options,
    })

    return () => {
      vantaRef.current?.destroy()
      vantaRef.current = null
    }
  }, [effect, threeJs, options])

  return containerRef
}
