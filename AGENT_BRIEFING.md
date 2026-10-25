# AGENT_BRIEFING.md — Complete Workspace & Architecture Context

> **Audience**: AI Agents / Developers picking up this workspace.  
> **Purpose**: Provides immediate operational context, active codebase layout, animation setup, guidelines, and execution protocols so you can jump straight into building once the feature or idea is provided.

---

## 1. Workspace Overview

The root directory [`D:\Independant`](file:///d:/Independant) contains the following assets:

* **[`my-app`](file:///d:/Independant/my-app)**: **The active production application**. A Next.js 16 + React 19 + TypeScript web application fully configured with animation pipelines and UI components. All feature work happens inside this directory.
* **[`lenis`](file:///d:/Independant/lenis)**: Cloned source repository of Darkroom Engineering's Lenis smooth scroll engine (already built to `lenis/dist/` and published packages are installed in `my-app`).
* **[`vanta`](file:///d:/Independant/vanta)**: Cloned source repository of Vanta.js (compiled WebGL effects in `vanta/dist/`).
* **[`agentic-awesome-skills`](file:///d:/Independant/agentic-awesome-skills)**: AAS catalog containing 2,750+ specialized task instructions and skill definitions.
* **[`ui-skills`](file:///d:/Independant/ui-skills)**: UI and canvas/motion skill reference library.
* **[`ponytail`](file:///d:/Independant/ponytail)**: Lean development guidelines enforcing YAGNI, standard library first, and zero bloated abstractions.

---

## 2. Active Application Stack (`my-app`)

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 16.4 (App Router) + React 19.3 | Turbopack dev server, Server Components by default |
| **Language** | TypeScript 5 (Strict) | Configured with `@/*` path aliases to `src/*` |
| **Styling** | Tailwind CSS v4 | Utility classes, modern design tokens, dark mode friendly |
| **Components** | shadcn/ui (Radix primitives) | Pre-installed: `button`, `card`, `badge`, `separator`, `skeleton`, `tooltip` |
| **Smooth Scroll** | `lenis` (v1.3.27) | Pre-configured in root layout with GSAP ticker synchronization |
| **Timelines & Scroll** | `gsap` (v3.15.0) + ScrollTrigger | Pre-configured hook with auto-cleanup |
| **React Animations** | `framer-motion` (v14.6) | Pre-built reusable motion primitives ready to import |
| **3D / WebGL** | `three` + `@react-three/fiber` + `@react-three/drei` | Full R3F pipeline configured |
| **Backgrounds** | `vanta` (v0.5.24) | Pre-built React hook with auto-destroy |
| **State & Validation**| `zustand` (v5) + `zod` (v4) | Global state & robust contract validation |
| **Interactive Components** | React Bits (`reactbits.dev`) | Configured via shadcn registry (`@react-bits`) |

---

## 3. Pre-Built Integration Architecture

Do not write boilerplate from scratch. Use the existing primitives in `my-app/src/`:

### A. Root Layout & Smooth Scroll
* **File**: [`my-app/src/providers/lenis-provider.tsx`](file:///d:/Independant/my-app/src/providers/lenis-provider.tsx)
* **Status**: Wraps the entire application inside [`my-app/src/app/layout.tsx`](file:///d:/Independant/my-app/src/app/layout.tsx).
* **Sync Rule**: GSAP's `ScrollTrigger` and Lenis RAF are bound into a single loop with `lagSmoothing(0)`.

### B. GSAP Scoped Animations
* **File**: [`my-app/src/hooks/use-gsap.ts`](file:///d:/Independant/my-app/src/hooks/use-gsap.ts)
* **Usage**:
  ```tsx
  import { useGSAP, useScrollAnimation } from "@/hooks/use-gsap"

  // Automatically scoped and reverted on unmount
  const containerRef = useGSAP((ctx) => {
    ctx.add(() => {
      gsap.from(".item", { opacity: 0, y: 50, stagger: 0.1, ease: "power3.out" })
    })
  })
  ```

### C. Motion Primitives
* **File**: [`my-app/src/components/animation/motion-primitives.tsx`](file:///d:/Independant/my-app/src/components/animation/motion-primitives.tsx)
* **Exports**:
  * `<FadeUp delay={0.2}>`: Smooth viewport-triggered entrance.
  * `<RevealLine>`: Text or element reveal clipping overflow.
  * `<StaggerContainer>` + `<StaggerItem>`: Coordinated list reveals.
  * `<MagneticWrapper strength={0.3}>`: Physics cursor magnetic pull.

### D. Vanta.js WebGL Backgrounds
* **File**: [`my-app/src/hooks/use-vanta.ts`](file:///d:/Independant/my-app/src/hooks/use-vanta.ts)
* **Usage**:
  ```tsx
  import { useVanta } from "@/hooks/use-vanta"
  import WAVES from "vanta/dist/vanta.waves.min"
  import * as THREE from "three"

  const ref = useVanta({
    effect: WAVES,
    threeJs: THREE,
    options: { color: 0x0f172a, backgroundColor: 0x020617 }
  })
  ```

### E. API Contracts & Utilities
* **File**: [`my-app/src/lib/schemas/api.ts`](file:///d:/Independant/my-app/src/lib/schemas/api.ts): Base Zod validation schemas and `ActionResult<T>`.
* **File**: [`my-app/src/lib/utils.ts`](file:///d:/Independant/my-app/src/lib/utils.ts): Tailwind merge helper `cn()`, numeric clippers, and range mappers.

---

## 4. Specialised Agents Configured

Persistent subagent configurations have been placed in the Antigravity plugin directories:

1. **`animation-3d-specialist`**:
   - Location: `agentic-bundle-animation/agents/animation-3d-specialist/AGENT.md`
   - Handles: GSAP timelines, ScrollTrigger, Three.js, R3F, GLSL shaders, Vanta backgrounds, 60fps performance tuning.
2. **`nextjs-frontend-specialist`**:
   - Location: `agentic-bundle-web-app/agents/nextjs-frontend-specialist/AGENT.md`
   - Handles: Server Components, layouts, shadcn/ui components, Tailwind styling, a11y, responsive design.
3. **`nextjs-backend-specialist`**:
   - Location: `agentic-bundle-web-app/agents/nextjs-backend-specialist/AGENT.md`
   - Handles: Next.js API route handlers, Server Actions, Zod validation, database integrations, authentication, security.

---

## 5. Execution Rules for Any Agent

1. **Working Directory**: All commands and code edits must be rooted in [`D:\Independant\my-app`](file:///d:/Independant/my-app).
2. **Component Architecture**:
   - Default to React Server Components.
   - Only add `"use client"` when component requires browser events, hooks, or direct animations.
3. **Performance First**:
   - Animate strictly on `transform` and `opacity`. Never animate layout properties (`top`, `left`, `width`, `height`).
   - Clean up event listeners, GSAP contexts, and WebGL contexts on component unmount.
4. **Validation**:
   - Every API request body, query parameter, or server action argument must pass through a strict Zod schema.
5. **Quality Verification**:
   - Always run `npx tsc --noEmit` to ensure zero type errors before concluding tasks.

---

## 6. React Bits Workflow Protocol
- Check [React Bits](https://reactbits.dev/) first when adding distinctive animation effects, interactive cards, text motion, or decorative backgrounds.
- Install components directly using the CLI:
  ```bash
  npx shadcn@latest add @react-bits/<component-name>
  ```
- Select TypeScript (`-TS-TW`) variants.
- Check and fix any strict indexing issues (`noUncheckedIndexedAccess: true`).
- Ensure `prefers-reduced-motion` is respected and WebGL contexts have fallbacks.
- Never add unnecessary dependencies or combine disjointed art directions.
