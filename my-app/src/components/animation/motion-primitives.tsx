"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

// ─── Fade Up ─────────────────────────────────────────────────────────────────

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Stagger Children ─────────────────────────────────────────────────────────

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

type StaggerProps = {
  children: React.ReactNode
  className?: string
}

export function StaggerContainer({ children, className }: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: StaggerProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  )
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────

type MagneticProps = {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function MagneticWrapper({
  children,
  strength = 0.3,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
    }

    const handleMouseLeave = () => {
      el.style.transform = "translate(0px, 0px)"
      el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
    }

    const handleMouseEnter = () => {
      el.style.transition = "transform 0.1s linear"
    }

    el.addEventListener("mousemove", handleMouseMove)
    el.addEventListener("mouseleave", handleMouseLeave)
    el.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      el.removeEventListener("mousemove", handleMouseMove)
      el.removeEventListener("mouseleave", handleMouseLeave)
      el.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [strength])

  return (
    <div ref={ref} className={cn("inline-block", className)}>
      {children}
    </div>
  )
}

// ─── Reveal Line ──────────────────────────────────────────────────────────────

type RevealLineProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function RevealLine({ children, delay = 0, className }: RevealLineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: "110%" }}
        animate={isInView ? { y: "0%" } : { y: "110%" }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
