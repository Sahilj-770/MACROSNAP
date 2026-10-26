import React from 'react'
import Link from 'next/link'
import { BotanicalLeaf } from '@/components/illustrations/BotanicalIllustrations'
import { ArrowLeft, Compass, Scale } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center text-cream bg-[#050B07]">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-white/5 border border-chartreuse/30 flex items-center justify-center mx-auto text-chartreuse shadow-[0_0_25px_rgba(216,243,67,0.2)]">
          <BotanicalLeaf className="w-8 h-8 text-chartreuse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-chartreuse uppercase tracking-widest font-bold block">
            404 // CALIBRATION VOID
          </span>
          <h1 className="text-4xl sm:text-5xl font-black font-serif text-white tracking-tight">
            Node Not Found.
          </h1>
          <p className="text-sm font-mono text-cream/70 leading-relaxed">
            The biological staple or comparison trajectory you requested does not exist in our audited index.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="min-h-[44px] px-6 py-3 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Film</span>
          </Link>
          <Link
            href="/explore"
            className="min-h-[44px] px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <Compass className="w-4 h-4 text-chartreuse" />
            <span>Explore 30+ Staples</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
