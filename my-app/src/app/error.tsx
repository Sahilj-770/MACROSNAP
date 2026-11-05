'use client'

import React, { useEffect } from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error internally if needed
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-[#FF5A22]/10 text-[#FF5A22] flex items-center justify-center mb-4">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#20271D] mb-3">
        System Interruption.
      </h1>

      <p className="max-w-md text-xs sm:text-sm text-[#737B70] leading-relaxed mb-6">
        An unexpected state variation occurred while computing nutrition benchmarks. You can reload
        the computation safely below.
      </p>

      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold transition-all shadow-xs"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Recalculate &amp; Recover</span>
      </button>
    </div>
  )
}
