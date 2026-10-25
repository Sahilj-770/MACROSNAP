import React from 'react'

export function BotanicalLeaf({ className = 'w-8 h-8 text-leaf' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20 80C20 80 25 35 75 25C75 25 70 70 20 80Z"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="M20 80C35 65 55 45 75 25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 64C48 64 56 61 60 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M46 51C52 48 58 43 62 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function HandDrawnArrow({ className = 'w-12 h-6 text-tangerine' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M8 22C35 12 70 28 108 16M108 16L95 8M108 16L98 28"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HandDrawnCircle({ className = 'w-24 h-12 text-chartreuse' }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20 38C15 15 65 8 115 12C145 15 142 55 105 62C55 70 12 55 28 32C35 22 65 14 98 16"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function ScribbleUnderline({ className = 'w-full h-3 text-tangerine' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M3 11C45 4 100 14 197 5C140 13 85 9 15 13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PlantSeedIcon({ className = 'w-6 h-6 text-forest' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path
        d="M20 6C12 14 10 24 14 30C18 36 28 36 32 30C36 24 28 12 20 6Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <circle cx="21" cy="22" r="3" fill="currentColor" />
    </svg>
  )
}
