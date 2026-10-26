'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error cleanly for client diagnostics
    console.error('MACROSNAP Application Encountered Error:', error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center text-cream bg-[#050B07]">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-red-400 uppercase tracking-widest font-bold block">
            ANOMALY DETECTED // TELEMETRY PAUSED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif text-white tracking-tight">
            Unexpected Disruption
          </h1>
          <p className="text-xs font-mono text-cream/70 leading-relaxed">
            A client-side runtime exception was intercepted. Your local laboratory data remains safely stored.
          </p>
        </div>

        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => reset()}
            className="min-h-[44px] px-6 py-3 rounded-full bg-chartreuse text-forest font-mono text-xs font-black uppercase tracking-wider hover:bg-white transition-all shadow-lg flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Operation</span>
          </button>
          <Link
            href="/"
            className="min-h-[44px] px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-cream font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-chartreuse focus-visible:outline-none"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
