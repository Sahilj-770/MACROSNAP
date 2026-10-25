import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { LenisProvider } from '@/providers/lenis-provider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MACROSNAP — Independent Food Intelligence & Protein Economics',
  description:
    'Vibrant, evidence-informed food intelligence. Discover affordable protein, compare packaged foods with kitchen staples, and decode nutrition labels with zero marketing bias.',
  keywords: ['protein calculator', 'food comparison', 'affordable protein India', 'nutrition label decoder', 'sattu', 'soy chunks'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAF7F0] text-forest font-sans selection:bg-chartreuse selection:text-forest">
        <LenisProvider>
          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
