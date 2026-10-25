# Project Stack & Quick Reference

## Dev
```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type check
```

## Add a shadcn component
```bash
npx shadcn@latest add <component>
# e.g.: npx shadcn@latest add dialog input select
```

## Key File Locations

| What | Where |
|---|---|
| Root layout (providers live here) | `src/app/layout.tsx` |
| Page routes | `src/app/<route>/page.tsx` |
| API routes | `src/app/api/<route>/route.ts` |
| Server Actions | `src/lib/actions/` |
| Zod schemas | `src/lib/schemas/` |
| Utility fns | `src/lib/utils.ts` |
| Lenis provider | `src/providers/lenis-provider.tsx` |
| GSAP hooks | `src/hooks/use-gsap.ts` |
| Vanta hook | `src/hooks/use-vanta.ts` |
| Animation primitives | `src/components/animation/motion-primitives.tsx` |
| shadcn UI components | `src/components/ui/` |
| Custom hooks | `src/hooks/` |

## Animation Quick Patterns

### GSAP scroll-triggered entrance
```tsx
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@/hooks/use-gsap"

gsap.registerPlugin(ScrollTrigger)

function MySection() {
  const containerRef = useGSAP((ctx) => {
    ctx.add(() => {
      gsap.from(".animate-item", {
        opacity: 0,
        y: 80,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      })
    })
  })

  return <section ref={containerRef}>{/* ... */}</section>
}
```

### Framer Motion entrance
```tsx
import { FadeUp, RevealLine, StaggerContainer, StaggerItem } from "@/components/animation/motion-primitives"

<RevealLine><h1>Title</h1></RevealLine>
<FadeUp delay={0.2}><p>Subtitle</p></FadeUp>
<StaggerContainer>
  {items.map(item => <StaggerItem key={item.id}>{item.name}</StaggerItem>)}
</StaggerContainer>
```

### Vanta background
```tsx
import { useVanta } from "@/hooks/use-vanta"
import WAVES from "vanta/dist/vanta.waves.min"
import * as THREE from "three"

function HeroSection() {
  const ref = useVanta({
    effect: WAVES,
    threeJs: THREE,
    options: { color: 0x0d0d0d, backgroundColor: 0x000000 },
  })
  return <section ref={ref as any} className="h-screen w-full" />
}
```

### Three.js / R3F scene
```tsx
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

function Scene() {
  return (
    <Canvas camera={{ fov: 60 }}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
```

### API Route with Zod validation
```ts
import { NextResponse } from "next/server"
import { z } from "zod"

const bodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = bodySchema.parse(body)
    // ... do work
    return NextResponse.json({ success: true, data })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
```
