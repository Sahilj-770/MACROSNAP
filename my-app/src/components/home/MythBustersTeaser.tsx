'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, XCircle, Compass } from 'lucide-react'
import { FOOD_MYTHS } from '@/data/recipes-and-lessons'

export function MythBustersTeaser() {
  const featuredMyths = FOOD_MYTHS.slice(0, 3)

  return (
    <section className="relative py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(125,141,57,0.12)] border border-[rgba(91,110,44,0.2)] text-xs font-mono tracking-widest uppercase text-[#5B6E2C] mb-4">
              <Compass className="w-3.5 h-3.5 text-[#7D8D39]" />
              <span>Chapter IV &mdash; Scientific Debunking</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold text-[#20271D] tracking-tight leading-[1.05] mb-4">
              Not everything you hear <br />
              <span className="italic font-normal text-[#5B6E2C]">about food is true.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#737B70] leading-relaxed">
              Separating Indian gym folklore from empirical metabolic literature. We examine phytoestrogens, raw eggs, kidney filtration, and dal protein illusions with clinical citations.
            </p>
          </div>

          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#5B6E2C] hover:bg-[#7D8D39] text-[#F3F6F4] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-xs self-start md:self-auto shrink-0 group"
          >
            <span>Explore All Myth Dossiers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Featured Myths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredMyths.map((myth) => (
            <div
              key={myth.id}
              className="p-8 rounded-3xl bg-white/75 backdrop-blur-md border border-[rgba(91,110,44,0.18)] hover:border-[#5B6E2C] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#7D8D39] px-2.5 py-1 rounded-full bg-[rgba(125,141,57,0.1)]">
                    {myth.category}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                      myth.verdict === 'BUSTED'
                        ? 'bg-[#FF5A22]/15 text-[#FF5A22]'
                        : 'bg-[#5B6E2C]/15 text-[#5B6E2C]'
                    }`}
                  >
                    {myth.verdict === 'BUSTED' ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      <CheckCircle className="w-3.5 h-3.5" />
                    )}
                    <span>{myth.verdict}</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-[#20271D] mb-3 leading-snug">
                  &ldquo;{myth.myth}&rdquo;
                </h3>
                <p className="text-xs text-[#737B70] leading-relaxed mb-6">
                  {myth.theTruth}
                </p>
              </div>

              <div className="pt-4 border-t border-[rgba(91,110,44,0.12)]">
                <span className="text-[10px] font-mono text-[#7D8D39] line-clamp-1">
                  Ref: {myth.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
