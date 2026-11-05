# MACROSNAP — Comprehensive Project & Architecture Audit

> **Document Version**: 2.0  
> **Status**: Approved & Authoritative  
> **Scope**: Master architectural inventory for MacroSnap visual overhaul and full-stack product implementation.

---

## 1. Product Overview

**MacroSnap — Know what you eat.** is a high-precision nutrition intelligence and dietary economics platform. It benchmarks authentic Indian staples and everyday ingredients against commercial, heavily-marketed fitness foods (protein bars, cookies, specialized shakes). 

Commercial fitness foods in India command a 10× to 26× rupee markup per gram of protein while often hiding maltitol, artificial sweeteners, and low-bioavailability proteins behind aggressive front-of-pack claims. MacroSnap leverages validated **ICMR-NIN Indian Food Composition Tables (IFCT 2017)** data and real mandi/kirana modal pricing to democratize nutritional transparency.

### Core Value Proposition
- **Standardized Rupee Cost per 10g Protein**: $\text{Cost/10g Protein (₹)} = (\frac{\text{Price per 100g}}{\text{Protein per 100g}}) \times 10$.
- **Food Discovery Archive**: 3D curved shelf showcasing authentic biological food profiles (macros, micros, fiber, prep time, kirana modal costs).
- **Protein on a Budget Ribbon**: Scroll-driven journey through affordable protein champions with dynamic cost-efficiency comparison.
- **Scientific Instrument Nutrition Calculator**: ACSM/ISSN daily requirements, bodyweight dynamics, and macro meal distribution.
- **Evidence-Based Myth Busters**: Deconstructing Indian dietary myths (e.g., soy chunks & estrogen, raw egg safety, kidney stress) backed by peer-reviewed literature.
- **Head-to-Head Nutritional Duels**: Side-by-side macro/micro comparisons and immediate basket integration.
- **Whole Food High-Protein Kitchen & Recipes**: 15-minute chef-tested staple recipes with dynamic serving scaling.
- **Foil-Pack Label Decoder**: Supermarket back-of-pack hotspot scanner exposing hidden sugars and serving size manipulation.
- **Local-First Grocery Ledger**: Persistent basket and saved comparisons using versioned browser storage (`Zustand` + `localStorage`).

---

## 2. Existing Features Inventory

| Feature | Description | State | Data Source |
|---|---|---|---|
| **Curated Food Database** | 12 core validated Indian staples & commercial fitness foods | Preserved | `src/data/foods.ts` (ICMR-NIN IFCT 2017) |
| **Pantry Recipes & Myths** | High-protein whole food recipes, science lessons, and myth dossiers | Preserved | `src/data/recipes-and-lessons.ts` |
| **Local-First Store** | Persistent favorites, basket items, protein targets, and comparison duels | Preserved | `src/store/useUserStore.ts` (`macrosnap-user-storage-v2`) |
| **API Contract Validation** | Zod schemas for food queries and calculation contracts | Preserved | `src/lib/schemas/api.ts` |
| **Utility Functions** | Tailwind merge `cn` and numeric helpers | Preserved | `src/lib/utils.ts` |

---

## 3. Route & Feature Matrix

| Route | Feature Area | Status / Plan | Description |
|---|---|---|---|
| `/` | **Botanical Ecosystem Homepage** | Overhaul | Fernhollow-inspired immersive botanical canvas, organic food textures, hero typography, guided feature journey. |
| `/explore` | **Curved Food Discovery Archive** | Overhaul | Leon Vasari-inspired curved 3D shelf / arc, central active item, depth scaling, category filtering, detailed editorial profile. |
| `/budget` | **Protein on a Budget 3D Ribbon** | Overhaul | Vante-inspired scroll-driven 3D media ribbon, reversing motion, smooth transition into comparison podium. |
| `/calculator` | **Scientific Nutrition Calculator** | Overhaul | Precision instrument with real-time sliders, daily protein/calorie requirements, macro split, educational disclosures. |
| `/learn` | **Editorial Myth Busters** | Overhaul | Aurevon-inspired full-viewport video hero, truth dossiers, peer-reviewed citations, scientific verdicts. |
| `/compare` | **Contender Duel Showdown** | Rebuild | Dynamic side-by-side comparison between whole foods and packaged snacks with cost/10g protein differential. |
| `/recipes` | **Whole Food Recipe Lab** | Rebuild | Dynamic serving scaler (1x to 4x), macro breakdown, single-click "Add to Basket", cost vs commercial bar comparison. |
| `/kitchen` | **Pantry Ingredient Matcher** | Rebuild | Multi-ingredient selection engine with instant high-protein meal discovery. |
| `/labels` | **Foil Pack Label Decoder** | Rebuild | Interactive supermarket package simulator with 5 hotspot scan zones (maltitol, serving tricks, sugar aliases). |
| `/library` | **Saved Intelligence** | Rebuild | Offline bookmarks for foods, saved comparisons, and favorite recipes. |
| `/basket` | **Virtual Grocery Ledger** | Rebuild | Cost accumulator, daily protein yield, budget warning thresholds, and grocery export. |

---

## 4. Incomplete & Missing Functionality Identified

1. **Global Navigation**: Previous navigation contained fragmented headers and lacked unified brand active states. A unified, fixed navbar is required as the very first visible UI element.
2. **Curved 3D Shelf**: Previously lacked physical depth, smooth arc geometry, and responsive touch transitions.
3. **Scroll-Driven 3D Ribbon**: Previously lacked reversible ribbon animation, proper easing curves, and smooth landing into the comparison podium.
4. **Calculator Visual Polish**: Previous calculator looked like standard forms rather than a scientific instrument.
5. **Myth Busters Route**: Needed full-viewport video hero with the provided AWS CloudFront asset and structured interactive dossiers.
6. **Mobile Continuity**: Ensure 3D components degrade gracefully on touch devices without horizontal scrolling or viewport jank.

---

## 5. Technical Stack & Architecture

- **Framework**: Next.js 16.4 (App Router) + React 19.3
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 with CSS variables token system
- **Motion & Interaction**:
  - GSAP 3.15 + ScrollTrigger (Scroll timelines, ribbon animation, pinned states)
  - Framer Motion / Motion (Component mounts, modals, layout morphs)
  - Lenis 1.3 (Inertial smooth scrolling with reduced-motion safeguards)
  - HTML5 Canvas & Three.js (Botanical particle depth and 3D card ribbon)
- **State Management**: Zustand v5 with local-first persistent storage
- **Validation**: Zod 4

---

## 6. Recommended Action Plan

1. Re-establish package dependencies cleanly.
2. Implement master CSS tokens (`--ms-white`, `--ms-sage`, `--ms-olive`, `--ms-orange`).
3. Build the global unified Navbar (first UI element) and Footer.
4. Implement the Fernhollow-inspired Botanical Homepage with interactive canvas and modular journey sections.
5. Implement the Leon Vasari Curved Food Discovery Archive on `/explore`.
6. Implement the Vante 3D Video Ribbon for Protein on a Budget on `/budget`.
7. Implement the Scientific Instrument Nutrition Calculator on `/calculator`.
8. Implement the Aurevon-inspired Myth Busters on `/learn`.
9. Implement supporting routes: `/compare`, `/recipes`, `/kitchen`, `/labels`, `/library`, `/basket`.
10. Verify responsiveness, run Playwright test suites, and generate final documentation.
