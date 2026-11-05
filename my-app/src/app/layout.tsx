import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SmoothScrollProvider } from '@/providers/lenis-provider'

export const metadata: Metadata = {
  title: 'MacroSnap — Know what you eat',
  description:
    'Biological food values, Indian dietary benchmarks, and uncompromised rupee-to-protein economics.',
  keywords: [
    'nutrition',
    'protein cost',
    'Indian diet',
    'ICMR-NIN IFCT',
    'soy chunks',
    'paneer',
    'macro calculator',
    'dietary benchmarks',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F3F6F4] text-[#20271D] selection:bg-[#7D8D39] selection:text-[#F3F6F4]">
        <SmoothScrollProvider>
          {/* Global Navbar is strictly the first visible UI element */}
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
