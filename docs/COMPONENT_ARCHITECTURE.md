# MACROSNAP — Component Architecture & Directory Structure

```text
my-app/src/
├── app/
│   ├── layout.tsx              # Global root layout with Lenis provider & Navigation
│   ├── globals.css             # Brand tokens, editorial eases, typography styles
│   ├── page.tsx                # Homepage: Fernhollow-inspired botanical ecosystem & journey
│   ├── explore/
│   │   └── page.tsx            # Food Explorer: Leon Vasari curved 3D shelf archive
│   ├── budget/
│   │   └── page.tsx            # Protein on a Budget: Vante 3D ribbon & value podium
│   ├── calculator/
│   │   └── page.tsx            # Scientific Instrument: ACSM/ISSN nutrition engine
│   ├── learn/
│   │   └── page.tsx            # Myth Busters: Aurevon video hero & fact dossiers
│   ├── compare/
│   │   └── page.tsx            # Contender Showdown: Macro/rupee duel & 30-day savings
│   ├── recipes/
│   │   └── page.tsx            # Whole Food Lab: High-protein Indian staple recipes
│   ├── kitchen/
│   │   └── page.tsx            # Pantry Matcher: Ingredient combination engine
│   ├── labels/
│   │   └── page.tsx            # Foil Pack Label Decoder: Supermarket deception scanner
│   ├── library/
│   │   └── page.tsx            # Saved Intelligence: Offline bookmarked foods & recipes
│   ├── basket/
│   │   └── page.tsx            # Grocery Ledger: Real-time cost accumulator & export
│   ├── not-found.tsx           # Compassionate 404 recovery
│   └── error.tsx               # Client error boundary
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Global unified navigation (always top/first element)
│   │   ├── MobileNavOverlay.tsx# Fullscreen staggered mobile navigation
│   │   └── Footer.tsx          # Editorial brand footer & scientific disclosures
│   ├── home/
│   │   ├── BotanicalHero.tsx   # Interactive canvas botanical simulation
│   │   ├── FoodIntelligence.tsx# Scientific pillars & ICMR-NIN methodology
│   │   ├── BudgetRibbonTeaser.tsx# Preview of protein economics
│   │   ├── CalculatorTeaser.tsx# Interactive preview of nutrition target dials
│   │   └── MythBustersTeaser.tsx# Highlighted myth showdown
│   ├── explore/
│   │   ├── CurvedFoodShelf.tsx # 3D perspective arc & drag/wheel controls
│   │   ├── FoodDetailModal.tsx # Deep editorial food profile inspection
│   │   └── CategoryFilterPills.tsx# Filter tags with brand-consistent badges
│   ├── budget/
│   │   ├── VideoRibbonRail.tsx # 3D media ribbon with GSAP ScrollTrigger
│   │   ├── ValuePodium.tsx     # National rupee-to-protein winners
│   │   └── MonthlySavingsSimulator.tsx# Interactive daily spend vs savings slider
│   ├── calculator/
│   │   ├── PrecisionDial.tsx   # Custom interactive range dial & slider
│   │   ├── MacroSplitCard.tsx  # Protein/carb/fat grams and kcal breakdown
│   │   └── MealTimingSchedule.tsx# 4-meal optimal protein distribution
│   ├── learn/
│   │   ├── VideoHero.tsx       # AWS CloudFront video background hero
│   │   └── MythCard.tsx        # Fact-checked dossier card with scientific verdict
│   └── ui/
│       ├── Button.tsx          # Brand buttons with hover physics
│       ├── Badge.tsx           # Sage/Tangerine/Olive status indicators
│       └── Card.tsx            # Soft white surfaces with subtle border
│
├── data/
│   ├── foods.ts                # Validated 12-item ICMR-NIN Indian food dataset
│   └── recipes-and-lessons.ts  # High-protein recipes, debunked myths & lessons
│
├── store/
│   └── useUserStore.ts         # Local-first Zustand store with persistence
│
└── lib/
    ├── utils.ts                # Tailwind merge cn() and helpers
    └── schemas/api.ts          # Zod validation schemas
```
