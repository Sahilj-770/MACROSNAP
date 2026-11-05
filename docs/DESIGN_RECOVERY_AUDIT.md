# MACROSNAP — Design Recovery & Art-Direction Correction Plan

## 1. Problem Audit & Design Inconsistencies Identified

| Component / Area | Current State (Problematic) | Corrected State (Target) |
|---|---|---|
| **Overall Aesthetic** | Dark, heavy, experimental cinematic portfolio, camera HUD overlays, excessive glassmorphism. | **Premium botanical editorial design** (modern food magazine / wellness publication / curated digital food archive). |
| **Color System** | Dark vignette backgrounds (`#0D110B`), competing hues, inconsistent dark/light flip. | **Light-first design system**: `#F3F6F4` (Soft White), `#7D8D39` (Sage), `#5B6E2C` (Deep Olive), `#FF5A22` (Tangerine), `#20271D` (Ink). |
| **Navbar** | Complex dark/light mode switching, hidden submenus, non-standard naming ("Book Archive", "Economics", "Nutritional Duel"). | **Single unified MacroSnap navbar** on `#F3F6F4`. Exact labels: **Home**, **Explore Foods**, **Compare**, **Protein on Budget**, **Recipes**, **Calculator**, **Learn / Myth Busters**, **Basket**. |
| **Homepage Hero** | Pitch dark radial vignette (`rgba(13,17,11,0.94)`), Solfeggio audio synthesizer, generic "volume / chapter" text. | **Natural light, rich botanical food imagery**, spacious editorial layout, clear value proposition, direct CTA buttons. |
| **Homepage Chapters** | "Chapter I: Biological Truth", "Chapter II: Macro Economics", "Chapter III: Scientific Instrument", "Chapter IV: Scientific Debunking", "Chapter V", "Epilogue". | **Editorial section flow**: Natural Botanical Hero → The ₹/10g Standard & Nutrition Philosophy → Curated Food Explorer → Protein on a Budget Ribbon → Daily Macro Calculator → Myth Busters → Clear Closing CTA. |
| **Copy & Wording** | Pseudo-scientific jargon: "Biological Absorption", "Spectrometry", "Physiological Target Simulator", "Nocturnal Repair Synthesis", "UV Forensic Exposure". | **Human, understandable, scientific content**: "Nutritional Comparison", "Breakfast / Lunch / Evening / Dinner", "FSSAI Label Traps", "Standardized Cost per 10g Protein". |
| **Food Explorer (`/explore`)** | Curved 3D shelf works, but needed z-index balance and light botanical theme integration. | Preserved Leon Vasari curved food shelf with central active selection and expanded nutrition detail modal, styled in botanical Soft White & Deep Olive. |
| **Protein on Budget (`/budget`)** | Vante 3D ribbon with nutrition textures works; needed seamless transition into the podium. | Vante 3D ribbon leads naturally into the value podium and grocery economics table. |
| **Nutrition Calculator (`/calculator`)** | Accurate calculations but overly robotic jargon ("Morning Metabolic Ignition"). | Minimal, elegant editorial interface; clear daily calories, protein, carbs, fats; readable 4-meal plan; instant goal save. |
| **Myth Busters (`/learn`)** | Had fictional brand name "Aurevon" in logo; pure black theme disconnected from brand. | MacroSnap branding; Instrument Serif editorial typography; elegant morphing navigation; natural video hero transitioning into light botanical dossiers. |
| **Comparison (`/compare`)** | Titled "The Nutritional Colosseum". | Re-titled to "Nutritional Comparison"; clear side-by-side analysis of protein, cost, and calories. |
| **Label Decoder (`/labels`)** | Heavy UV forensic wording. | Educational, interactive investigation of Indian packaged food labels (maltitol, serving tricks, collagen fillers). |

---

## 2. Reusable Components & Preserved Product Architecture

The following functional core remains 100% intact and untouched in logic:
- **Zustand Store (`src/store/useUserStore.ts`)**: Persists basket items, favorite foods, favorite recipes, custom protein targets, and saved comparisons.
- **Nutrition Database (`src/data/foods.ts`)**: All 18 authentic Indian staples with ICMR-NIN IFCT 2017 scientific data (protein, carbs, fats, fiber, iron, calcium, DIAAS, estimated retail pricing).
- **Recipes & Myths (`src/data/recipes-and-lessons.ts`)**: All 6 chef-crafted high-protein recipes and 8 peer-reviewed myth debunking dossiers.
- **Formulas & Calculations**: Standardized `(Cost per 100g / Protein per 100g) × 10` economics; Mifflin-St Jeor BMR; ACSM/ISSN activity multipliers.
- **Interactive State**: Food Detail Modal, Calculator Dials, Duel Matchups, Label Hotspots, Grocery Basket checkout/print receipt.

---

## 3. Implementation Steps

1. **Navbar Refinement (`my-app/src/components/layout/Navbar.tsx`)**:
   - Standardize to a single, consistent, light-first MacroSnap navbar.
   - Implement exact user labels: Home, Explore Foods, Compare, Protein on Budget, Recipes, Calculator, Learn / Myth Busters, Basket.
   - Elegant mobile navigation drawer with all links and basket counter.

2. **Homepage Art-Direction Correction**:
   - `FernhollowBotanicalHero.tsx`: Replace dark vignette with **natural light**, fresh botanical food imagery, spacious composition, crisp Instrument Serif typography, human copy ("Know what you eat. Nutrition intelligence for real Indian food."), and clear CTAs. Remove synthetic audio synthesizer.
   - `FoodIntelligence.tsx`: Remove "Chapter I" and pseudo-scientific noise; highlight the ₹/10g standard and ICMR-NIN verified data.
   - `BudgetRibbonTeaser.tsx`: Streamline section heading, remove "Chapter II" label.
   - `CalculatorTeaser.tsx`: Friendly human copy, remove "Chapter III".
   - `MythBustersTeaser.tsx`: Clean editorial styling, remove "Chapter IV".
   - `RecipeAndPantryTeaser.tsx`: Remove "Chapter V".
   - `FinalCTA.tsx`: Clean editorial closing section, remove "Epilogue".

3. **Myth Busters Page Correction (`my-app/src/app/learn/page.tsx`)**:
   - Replace "Aurevon" with MacroSnap brand identity.
   - Keep the Instrument Serif typography, Flower2 botanical icon, and smooth overlay menu.
   - Connect overlay links to MacroSnap routes.
   - Adapt hero subcopy to authentic nutrition myth debunking.
   - Transition smoothly into the light-first botanical dossiers section (`#F3F6F4` background, Deep Olive `#5B6E2C` cards, Sage `#7D8D39` badges).

4. **Page-by-Page Editorial Refinements**:
   - `/compare`: Change "The Nutritional Colosseum" to "Nutritional Comparison: Compare Foods Side by Side".
   - `/calculator`: Clean up meal names ("Breakfast: High Protein Start", "Lunch: Balanced Indian Plate", etc.).
   - `/labels`: Polish typography into an educational, interactive report.
   - `/recipes`: Enhance editorial kitchen layout.
   - `/budget`: Ensure seamless flow from Vante ribbon into Value Podium.

5. **Verification**:
   - Next.js production build (`npm run build`).
   - Playwright end-to-end QA (`run_playwright_qa.py`) with 0 console errors and screenshot verification.
