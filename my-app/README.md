# MACROSNAP

> Biological food values, Indian dietary benchmarks, and uncompromised rupee-to-protein economics — democratizing nutrition science with transparent data.

**Live Application:** [macrosnap-two.vercel.app](https://macrosnap-two.vercel.app/)  
**GitHub Repository:** [Sahilj-770/MACROSNAP](https://github.com/Sahilj-770/MACROSNAP)

---

## Overview

**MACROSNAP** is an independent food and nutrition platform comparing Indian staples against commercial fitness products. Most commercial high-protein snacks (protein bars, cookies, specialized shakes) carry 10× to 26× price premiums per gram of actual protein, often masking high sugars, fractionated oils, and polyols under front-of-pack claims.

MACROSNAP benchmarks real Indian staples against the **ICMR-NIN Indian Food Composition Tables (IFCT 2017)** and local kirana/mandi pricing to deliver:

1. **Standardized Rupee Cost per 10g Protein:** Directly compare pure protein yield across whole foods and packaged snacks.
2. **Head-to-Head Nutritional Showdowns:** Side-by-side macro and micro profiles with calculated savings.
3. **Pantry Ingredient Matcher:** Practical recipe discovery connecting shelf staples to 15-minute, high-yield Indian recipes.
4. **Physiological Daily Target Calculator:** Evidence-based protein intake recommendations (ACSM / ISSN) with real-food plate simulation and meal distribution timing.
5. **Educational Label Decoder:** Interactive simulator demonstrating packaging practices such as micro-portions, hidden sugars, and deceptive protein claims.
6. **Local-First Personal Collection & Basket:** Offline-capable bookmarking and grocery budget planning backed by versioned browser storage (`Zustand` + `localStorage`).

---

## Core Pillars & Scientific Methodology

### 1. The Cost-per-10g Protein Formula
Nutritional value is normalized across all items using the standard metric:

$$\text{Cost per 10g Protein (₹)} = \left(\frac{\text{Retail Cost per 100g (₹)}}{\text{Protein per 100g (g)}}\right) \times 10$$

This standardizes foods regardless of manufacturer serving sizes (e.g., a 15g biscuit serving vs. a 67g bar vs. 100g dry pulse).

### 2. Biological Quality Benchmarks
- **Protein Density & Bioavailability:** Sourced directly from **ICMR-NIN IFCT 2017** data points (e.g., DIAAS > 1.18 for whole poultry eggs; 52% protein density for whole soy chunks; 22.5g protein + 16.8g prebiotic fiber for roasted Bengal gram).
- **Price Transparency:** Wholesale mandi and kirana modal pricing in the local application repository are updated regularly, transparently separated from quick-commerce markups.

---

## Application Architecture & Routes

```
src/
├── app/
│   ├── page.tsx            # Home: Panoramic editorial scroll experience
│   ├── explore/            # Food Directory: Filter by 8 categories & dietaries
│   ├── compare/            # Contender Showdown: Head-to-head economic duels
│   ├── budget/             # Protein on a Budget: National value podium & ₹/day simulator
│   ├── calculator/         # Target Engine: ACSM/ISSN model + plate simulator + meal timing
│   ├── labels/             # Label Decoder: Supermarket back-of-pack hotspot lab
│   ├── kitchen/            # Pantry Matcher: Ingredient picker & matching recipes
│   ├── recipes/            # Homemade Lab: 15-minute chef-tested whole food recipes
│   ├── learn/              # Science Dossiers: Myth busters & 60-second lessons
│   ├── library/            # Saved Intelligence: Offline bookmarked foods, duels & recipes
│   ├── basket/             # Grocery Ledger: Live budget tracking & protein yield
│   ├── sitemap.ts          # Automated XML sitemap generation
│   ├── robots.ts           # Crawler directives
│   ├── not-found.tsx       # Custom 404 recovery page
│   └── error.tsx           # Global client error boundary
├── components/
│   ├── features/           # FoodCard, comparison stages, recipe views
│   ├── home/               # Landing sections (OpeningHero, TelemetryLens, SpreadingStaples, etc.)
│   ├── layout/             # Redesigned Navbar, EditorialTicker
│   └── ui/                 # Accessible primitives, badges, inputs
├── data/
│   ├── foods.ts            # Audited database of 12 validated core Indian staples
│   └── recipes-and-lessons.ts # High-protein recipes, debunked myths & micro-lessons
├── providers/
│   └── lenis-provider.tsx  # Smooth scroll provider with reduced-motion guard
└── store/
    └── useUserStore.ts     # Versioned local-first store (macrosnap-user-storage-v2)
```

### Route Breakdown

| Route | Purpose | Key Features |
|---|---|---|
| `/` | **Landing Page** | Editorial scroll-driven introduction, molecular lens, staple spread, and economics preview. |
| `/explore` | **Food Explorer** | Search, sort by protein density / lowest cost, filter by categories (`soy`, `dairy`, `lentils`, `eggs`, `grains`, etc.). |
| `/compare` | **Contender Duel** | Dynamic side-by-side comparison with preset matchups, custom dropdowns, and instant winner-to-basket actions. |
| `/budget` | **Protein Economics** | Top value podium (Soy Chunks, Moong Dal, Roasted Chana), interactive daily ₹ spend slider, and 30-day savings breakdown. |
| `/calculator` | **Target Calculator** | Interactive body weight dial (30kg–200kg) synchronized with numeric input, activity goal multipliers, and 4-meal distribution guidance. |
| `/labels` | **Label Decoder** | Interactive foil pack simulator with 5 hotspot scan zones (serving tricks, protein claims, hidden sugar aliases, maltitol, binders). |
| `/kitchen` | **Pantry Matcher** | Interactive ingredient selector with presets (e.g., Hostel Sattu Elixir, Soy Bhurji) and matching recipe engine. |
| `/recipes` | **Homemade Lab** | Dynamic serving scaler (`1x` to `4x`), macro breakdowns, direct "Add All Ingredients to Basket", and cost comparisons vs. packaged snacks. |
| `/learn` | **Myths & Lessons** | Investigative dossiers debunking common bro-science myths with peer-reviewed literature citations. |
| `/library` | **Saved Collection** | Tabbed storage for bookmarked foods, saved duels, and favorite recipes with single-click sample loaders. |
| `/basket` | **Virtual Basket** | Live cost accumulation, protein total, quantity steppers, and budget threshold warnings. |

---

## Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) with **Turbopack**
- **Runtime & Language:** [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation & Motion:** 
  - [GSAP 3](https://greensock.com/gsap/) with `ScrollTrigger` and `gsap.matchMedia()`
  - [Framer Motion](https://motion.dev/)
  - [Lenis](https://lenis.darkroom.engineering/) smooth scrolling
- **State Management:** [Zustand 5](https://github.com/pmndrs/zustand) with `persist` middleware (`localStorage`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing & Verification:** [Playwright](https://playwright.dev/) for headless end-to-end browser testing

---

## Motion Architecture

MACROSNAP separates motion into **three distinct environments** using `gsap.matchMedia()`:

1. **Desktop (`>= 1024px`):**
   - Lenis smooth inertial scrolling.
   - Scroll-scrubbed radial card expansions and orbital trajectories.
   - Velocity-based `skewX` clamped to `[-5°, 5°]` to prevent visual distortion.
   - Smooth clipPath transitions on the Telemetry Lens.
2. **Mobile (`< 1024px`):**
   - Lenis disabled in favor of native 120Hz touch scroll.
   - GSAP scroll pinning and horizontal skews disabled to eliminate scroll-trapping and jitter.
   - Lightweight vertical fade-ins (12–20px) and static touch-optimized crops.
3. **Reduced Motion (`prefers-reduced-motion: reduce`):**
   - All animations instantly resolve to final resting states (`opacity: 1`, `transform: none`).
   - Smooth scroll hijacking fully bypassed.
   - CSS transitions clamped to `0.01ms`.

---

## Accessibility & Responsive Standards

- **WCAG 2.2 AA Compliance:**
  - High-contrast color palette: Obsidian `#050B07` background, Organic Cream `#F4EFEA` text (18.2:1 contrast ratio), Chartreuse `#D8F343` accents (12.4:1 contrast ratio).
  - Strict minimum touch targets of **44 × 44 CSS pixels** on all mobile buttons and inputs.
  - Visible focus rings across all interactive controls (`outline: 2px solid #D8F343; outline-offset: 2px`).
  - Screen-reader accessible alerts using non-blocking toasts (`role="status"`, `aria-live="polite"`).
  - Semantic HTML5 structure throughout (`<article>`, `<nav>`, `<header>`, `<main>`, `<aside>`).
- **Zero Horizontal Overflow:** Verified across all standard viewports:
  - 360 × 800 (Compact Mobile)
  - 390 × 844 (Standard iPhone/Pixel)
  - 768 × 1024 (Tablet Portrait)
  - 1366 × 768 (Standard Laptop)
  - 1440 × 900+ (Desktop Widescreen)

---

## Getting Started

### Prerequisites
- **Node.js:** v18.18.0 or newer
- **npm**, **pnpm**, or **yarn**

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build & Testing

### TypeScript Type Check
```bash
npx tsc --noEmit
```

### Production Build
Build the fully optimized static application with Next.js Turbopack:
```bash
npm run build
```

---

## License

This project is licensed under the [MIT License](LICENSE).
