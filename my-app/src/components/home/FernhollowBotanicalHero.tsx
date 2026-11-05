'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Volume2, VolumeX, Sparkles, ArrowRight, ChevronDown } from 'lucide-react'

export function FernhollowBotanicalHero() {
  const [uiLoaded, setUiLoaded] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isHoveringGo, setIsHoveringGo] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setUiLoaded(true)
    }, 200)
    return () => clearTimeout(timer)
  }, [])

  // Audio Ambient Synthesizer (Generates calming ambient botanical drone)
  const toggleSound = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()
      gainNodeRef.current = gain

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(174, ctx.currentTime) // Solfeggio 174 Hz foundation
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(261.63, ctx.currentTime) // Middle C harmonic

      gain.gain.setValueAtTime(0.06, ctx.currentTime)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()
      setIsMuted(false)
    } else {
      const ctx = audioContextRef.current
      const gain = gainNodeRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
        gain?.gain.setTargetAtTime(0.06, ctx.currentTime, 0.1)
        setIsMuted(false)
      } else if (isMuted) {
        gain?.gain.setTargetAtTime(0.06, ctx.currentTime, 0.1)
        setIsMuted(false)
      } else {
        gain?.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.1)
        setIsMuted(true)
      }
    }
  }

  const scrollToJourney = () => {
    const nextSection = document.getElementById('food-intelligence')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col justify-between items-center select-none text-[#F3F6F4] pt-24 pb-12 px-6 sm:px-12 overflow-hidden">
      {/* Background Soft Shadow Vignette (Ensures deep contrast on spores) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 45%, rgba(32, 39, 29, 0.72) 0%, rgba(13, 17, 11, 0.94) 85%)',
        }}
        aria-hidden="true"
      />

      {/* Seamless bottom transition into Soft White page background (#F3F6F4) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-1"
        style={{
          background: 'linear-gradient(180deg, rgba(13, 17, 11, 0) 0%, #F3F6F4 100%)',
        }}
        aria-hidden="true"
      />

      {/* Floating Center Hero Typography (Exact Fernhollow condensed style) */}
      <div
        className={`relative z-10 my-auto text-center flex flex-col items-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${
          uiLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#A3B18A] text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/15 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
          <span>Biological Food Values &amp; Rupee Economics</span>
        </div>

        <h1 className="font-display text-6xl sm:text-8xl lg:text-9xl font-normal tracking-tight text-[#F3F6F4] leading-[0.92] mb-6">
          Know what you eat.
        </h1>

        <p className="text-base sm:text-xl text-[#F3F6F4]/85 font-sans leading-relaxed max-w-xl mb-10">
          Rooted in nature. Verified by ICMR-NIN science. <br />
          Benchmarking authentic Indian staples against synthetic gym marketing.
        </p>

        {/* Magnetic Circular Arrow Button with Hover Transition */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/explore"
            onPointerEnter={() => setIsHoveringGo(true)}
            onPointerLeave={() => setIsHoveringGo(false)}
            className="flex items-center gap-4 px-7 py-3.5 rounded-full bg-[#5B6E2C] text-[#F3F6F4] text-sm font-semibold tracking-wide hover:bg-[#7D8D39] hover:shadow-xl transition-all duration-300 group border border-[#7D8D39]/50"
          >
            <span>Open Book Archive</span>
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-4 h-4 text-[#F3F6F4]" />
            </div>
          </Link>

          <button
            type="button"
            onClick={scrollToJourney}
            className="px-6 py-3.5 rounded-full bg-white/10 text-[#F3F6F4] text-sm font-medium hover:bg-white/20 transition-all border border-white/20"
          >
            Explore Living Journey
          </button>
        </div>
      </div>

      {/* Bottom Controls Bar (Scroll to Wander & Ambient Sound) */}
      <div
        className={`relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto text-xs font-mono tracking-widest uppercase text-white/70 pt-8 transition-opacity duration-1000 ${
          uiLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-[#FF5A22] font-bold">ICMR-NIN IFCT 2017</span>
          <span className="hidden sm:inline text-white/30">&bull;</span>
          <span className="hidden sm:inline">100% TRANSPARENT SCIENCE</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollToJourney}
            className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">Scroll to wander</span>
            <ChevronDown className="w-4 h-4 text-[#7D8D39] animate-bounce" />
          </button>
          <div className="w-[1px] h-4 bg-white/20 hidden sm:inline" />
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-full border border-white/25 hover:border-white text-white transition-all flex items-center gap-2 bg-black/20 backdrop-blur-xs"
            aria-label={isMuted ? 'Unmute ambient sound' : 'Mute ambient sound'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#7D8D39]" />
            )}
            <span className="text-[10px] hidden sm:inline">{isMuted ? 'Audio Off' : 'Sound On'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
