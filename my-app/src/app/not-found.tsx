import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5B6E2C]/10 text-[#5B6E2C] text-xs font-medium mb-4">
        <Sparkles className="w-3.5 h-3.5 text-[#FF5A22]" />
        <span>404 — Page Not Found</span>
      </div>

      <h1 className="font-display text-5xl sm:text-7xl font-bold text-[#20271D] mb-4">
        Missing Food Point.
      </h1>

      <p className="max-w-md text-sm text-[#737B70] leading-relaxed mb-8">
        The nutritional pathway you are searching for does not exist in our validated food registry.
        Return to the archive to explore benchmarked Indian staples.
      </p>

      <Link
        href="/explore"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B6E2C] hover:bg-[#FF5A22] text-[#F3F6F4] text-xs font-semibold transition-all shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Food Archive</span>
      </Link>
    </div>
  )
}
