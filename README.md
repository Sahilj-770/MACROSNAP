# MACROSNAP — Know what you eat.

> Biological food values, Indian dietary benchmarks, and uncompromised rupee-to-protein economics — democratizing nutrition science with transparent data.

**Live Application:** [macrosnap-two.vercel.app](https://macrosnap-two.vercel.app/)  
**GitHub Repository:** [Sahilj-770/MACROSNAP](https://github.com/Sahilj-770/MACROSNAP)

---

## Overview

**MACROSNAP** is an independent food and nutrition intelligence platform comparing everyday Indian staples against commercial fitness products. Most commercial high-protein snacks (protein bars, cookies, specialized shakes) carry 10× to 26× price premiums per gram of actual protein, often masking high sugars, fractionated oils, and polyols under front-of-pack claims.

MACROSNAP benchmarks real Indian staples against the **ICMR-NIN Indian Food Composition Tables (IFCT 2017)** and local kirana/mandi pricing to deliver:

1. **Standardized Rupee Cost per 10g Protein:** Directly compare pure protein yield across whole foods and packaged snacks:
   $$\text{Cost per 10g Protein (₹)} = \left(\frac{\text{Retail Cost per 100g (₹)}}{\text{Protein per 100g (g)}}\right) \times 10$$
2. **Food Discovery Archive:** Leon Vasari-inspired 3D curved shelf showcasing authentic biological food profiles (macros, micros, fiber, prep time, kirana modal costs).
3. **Protein on a Budget Ribbon:** Vante-inspired 3D scroll-driven journey through affordable protein champions with a 30-day savings simulator.
4. **Scientific Instrument Nutrition Calculator:** ACSM/ISSN daily requirements, bodyweight dynamics, and 4-meal protein distribution pacing.
5. **Editorial Myth Busters:** Aurevon-inspired video hero with peer-reviewed scientific dossiers deconstructing bro-science myths.
6. **Head-to-Head Nutritional Duels:** Side-by-side macro/micro comparisons with single-click winner basket actions.
7. **Whole Food High-Protein Kitchen & Recipes:** 15-minute chef-tested Indian staple recipes with dynamic 1x to 4x serving scaling.
8. **Foil-Pack Label Decoder:** Supermarket back-of-pack hotspot scanner exposing hidden sugars, maltitol, and serving size manipulation.
9. **Local-First Grocery Ledger:** Persistent basket and saved comparisons using versioned browser storage (`Zustand` + `localStorage`).

---

## Brand Visual Identity & Color System

The platform strictly adheres to the MacroSnap design token standard:

| Token Name | Hex Code | Semantic Role |
|---|---|---|
| **Soft White** | `#F3F6F4` | Canvas background, light cards, clean breathing room |
| **Sage** | `#7D8D39` | Primary brand accent, category pills, subtle badges |
| **Deep Olive** | `#5B6E2C` | Headings, active states, high-contrast borders |
| **Tangerine** | `#FF5A22` | Strategic CTAs, key numerical highlights, deception alerts |
| **Ink** | `#20271D` | High-contrast editorial typography |

---

## Application Route Breakdown

```text
my-app/src/app/
├── page.tsx            # Home: Fernhollow-inspired botanical ecosystem & narrative
├── explore/page.tsx    # Food Discovery Archive: Leon Vasari curved 3D shelf
├── budget/page.tsx     # Protein on a Budget: Vante 3D video ribbon & savings simulator
├── calculator/page.tsx # Scientific Instrument: ACSM/ISSN daily target calculator
├── learn/page.tsx      # Myth Busters: Aurevon-inspired video hero & truth dossiers
├── compare/page.tsx    # Nutritional Duel: Side-by-side macro & rupee showdown
├── recipes/page.tsx    # Whole Food Lab: 15-min recipes with dynamic serving scaling
├── kitchen/page.tsx    # Pantry Matcher: Ingredient combination discovery
├── labels/page.tsx     # Label Decoder: Supermarket back-of-pack hotspot lab
├── library/page.tsx    # Saved Intelligence: Offline bookmarked foods, duels & recipes
└── basket/page.tsx     # Grocery Ledger: Real-time cost accumulator & list export
```

---

## Tech Stack

- **Framework:** Next.js 16.4 (App Router) with **Turbopack**
- **Runtime & Language:** React 19.3, TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4 with custom CSS variable tokens
- **Motion & Interaction:**
  - GSAP 3.15 + ScrollTrigger (Scroll-linked 3D ribbon and pinning)
  - Framer Motion / Motion (Layout transitions, modal reveals)
  - Lenis 1.3 (Inertial smooth scrolling with `prefers-reduced-motion` guards)
  - HTML5 Canvas (Botanical particle depth on homepage)
- **Testing & QA:** Playwright end-to-end test runner across Desktop, Tablet, and Mobile

---

## Getting Started

```bash
# Navigate to application
cd my-app

# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build

# Start production server
npm run start
```
