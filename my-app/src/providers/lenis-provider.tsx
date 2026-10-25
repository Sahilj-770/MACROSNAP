"use client"

import { createContext, useContext, useEffect, useSyncExternalStore } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

let globalLenis: Lenis | null = null
const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

function getSnapshot(): Lenis | null {
  return globalLenis
}

function getServerSnapshot(): Lenis | null {
  return null
}

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  const contextLenis = useContext(LenisContext)
  const storeLenis = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return contextLenis ?? storeLenis
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ultra-smooth liquid momentum interpolation tuned for high-refresh and stepped wheels
    const instance = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.5,
      smoothWheel: true,
      autoResize: true,
    })

    globalLenis = instance
    if (typeof window !== "undefined") {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = instance
    }
    listeners.forEach((l) => l())

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    instance.on("scroll", ScrollTrigger.update)

    // Add Lenis RAF to GSAP ticker — unified 60/120fps animation loop
    const rafCallback = (time: number) => {
      instance.raf(time * 1000)
    }
    gsap.ticker.add(rafCallback)

    // Smooth out micro-hiccups over 33ms instead of hard frame drops
    gsap.ticker.lagSmoothing(500, 33)

    return () => {
      gsap.ticker.remove(rafCallback)
      instance.destroy()
      globalLenis = null
      listeners.forEach((l) => l())
    }
  }, [])

  return (
    <LenisContext.Provider value={globalLenis}>
      {children}
    </LenisContext.Provider>
  )
}
