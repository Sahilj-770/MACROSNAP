import React from 'react'

export function EditorialTicker() {
  const phrases = [
    'LESS GUESSING',
    'MORE UNDERSTANDING',
    'REAL FOOD FIRST',
    'SMARTER PROTEIN CHOICES',
    'KNOW YOUR NUMBERS',
    'NO SYNTHETIC BULLSHIT',
    'WHOLE FOOD BIOLOGY',
    'ACCESSIBLE NUTRITION FOR EVERYONE',
  ]

  return (
    <div className="w-full bg-forest text-cream overflow-hidden border-y-2 border-forest-deep py-3 select-none">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[...phrases, ...phrases].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-6 px-6 font-mono font-bold text-xs tracking-widest uppercase">
            <span className={idx % 2 === 0 ? 'text-chartreuse' : 'text-cream'}>{phrase}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-tangerine inline-block" />
          </div>
        ))}
      </div>
    </div>
  )
}
