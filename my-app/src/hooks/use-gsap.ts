"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

type GSAPCallback = (context: gsap.Context) => void

/**
 * Scoped GSAP context hook — auto-reverts all animations on unmount.
 * Usage:
 *   const containerRef = useGSAP((ctx) => {
 *     ctx.add(() => gsap.from(".box", { opacity: 0, y: 60 }))
 *   })
 */
export function useGSAP(callback: GSAPCallback) {
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx)
    }, containerRef)

    return () => ctx.revert()
  }, [callback])

  return containerRef
}

/**
 * ScrollTrigger animation hook with auto-cleanup.
 * Usage:
 *   const ref = useScrollAnimation((el) => {
 *     gsap.from(el, { opacity: 0, y: 80, scrollTrigger: { trigger: el, start: "top 80%" } })
 *   })
 */
export function useScrollAnimation(
  callback: (element: HTMLElement) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      callback(el)
    }, el)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
