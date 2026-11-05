'use client'

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Eye, ShoppingBag, Check, ArrowDown, Sparkles } from 'lucide-react'
import { FOOD_DATABASE } from '@/data/foods'
import { FoodItem } from '@/types/food'
import { useUserStore } from '@/store/useUserStore'

// 100% authentic MacroSnap nutritional economics staples with genuine food photography
const NUTRITION_STAPLES = [
  {
    foodId: 'soy-chunks',
    name: 'Soya Chunks',
    protein: '52.0g',
    cost: '₹2.31 / 10g',
    tag: 'National Champion',
    desc: 'Highest Protein Density per Rupee',
    color: '#3A481B',
    image: '/images/food/food_0.webp',
    isBar: false,
  },
  {
    foodId: 'yellow-moong-dal',
    name: 'Yellow Moong Dal',
    protein: '24.0g',
    cost: '₹6.25 / 10g',
    tag: 'Pantry Staple',
    desc: 'Easily Digestible Plant Foundation',
    color: '#5B6E2C',
    image: '/images/food/food_1.webp',
    isBar: false,
  },
  {
    foodId: 'sattu-chana',
    name: 'Roasted Sattu',
    protein: '22.5g',
    cost: '₹6.67 / 10g',
    tag: 'Zero Cooking',
    desc: 'Instant Whole-Grain Super Drink',
    color: '#66792D',
    image: '/images/food/food_2.webp',
    isBar: false,
  },
  {
    foodId: 'eggs-whole',
    name: 'Poultry Whole Eggs',
    protein: '13.3g',
    cost: '₹9.68 / 10g',
    tag: 'DIAAS 1.18',
    desc: 'Gold Standard Complete Bioavailability',
    color: '#4E5F24',
    image: '/images/food/food_3.webp',
    isBar: false,
  },
  {
    foodId: 'paneer-fresh',
    name: 'Cow Milk Paneer',
    protein: '18.0g',
    cost: '₹18.89 / 10g',
    tag: 'Dairy Matrix',
    desc: 'Slow-Release Micellar Casein',
    color: '#3E4E1C',
    image: '/images/food/food_4.webp',
    isBar: false,
  },
  {
    foodId: 'tofu-firm',
    name: 'Non-GMO Firm Tofu',
    protein: '15.0g',
    cost: '₹14.71 / 10g',
    tag: 'Pure Plant',
    desc: 'Clean Vegan Nitrogen Retention',
    color: '#5B6E2C',
    image: '/images/food/food_5.webp',
    isBar: false,
  },
  {
    foodId: 'chicken-breast',
    name: 'Chicken Breast',
    protein: '31.0g',
    cost: '₹9.68 / 10g',
    tag: 'Animal Lean',
    desc: 'Zero Carb High-Yield Muscle Fuel',
    color: '#354318',
    image: '/images/food/food_8.webp',
    isBar: false,
  },
  {
    foodId: 'commercial-protein-bar',
    name: 'Commercial Protein Bar',
    protein: '20.0g',
    cost: '₹60.00 / 10g',
    tag: '26× Gym-Bro Tax',
    desc: 'Maltitol & Collagen Inflated Filler',
    color: '#C84013',
    image: '/images/food/food_9.webp',
    isBar: true,
  },
]

// Generate rich texture rendering genuine food photography and clear typography
function createStapleTexture(item: typeof NUTRITION_STAPLES[0]): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 720
  canvas.height = 450
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  const isBar = item.isBar

  const renderContent = (loadedImg?: HTMLImageElement) => {
    ctx.clearRect(0, 0, 720, 450)

    if (loadedImg) {
      // Draw authentic daylight photograph
      ctx.drawImage(loadedImg, 0, 0, 720, 450)

      // Editorial vignette overlay for guaranteed high-contrast legibility
      const overlay = ctx.createLinearGradient(0, 0, 0, 450)
      if (isBar) {
        overlay.addColorStop(0, 'rgba(38, 18, 14, 0.82)')
        overlay.addColorStop(0.45, 'rgba(30, 14, 10, 0.68)')
        overlay.addColorStop(1, 'rgba(20, 10, 8, 0.95)')
      } else {
        overlay.addColorStop(0, 'rgba(22, 28, 19, 0.82)')
        overlay.addColorStop(0.45, 'rgba(26, 35, 22, 0.68)')
        overlay.addColorStop(1, 'rgba(16, 22, 14, 0.95)')
      }
      ctx.fillStyle = overlay
      ctx.fillRect(0, 0, 720, 450)
    } else {
      // High-end dark botanical background while image loads
      ctx.fillStyle = isBar ? '#2A1712' : '#1C2417'
      ctx.fillRect(0, 0, 720, 450)
    }

    // Border Inset
    ctx.strokeStyle = isBar ? 'rgba(255, 90, 34, 0.55)' : 'rgba(125, 141, 57, 0.5)'
    ctx.lineWidth = 2.5
    ctx.strokeRect(16, 16, 688, 418)

    // Top Category Pill
    ctx.fillStyle = isBar ? '#FF5A22' : '#5B6E2C'
    ctx.beginPath()
    ctx.roundRect(36, 36, 260, 36, 18)
    ctx.fill()

    ctx.fillStyle = '#F3F6F4'
    ctx.font = 'bold 13px monospace'
    ctx.fillText(item.tag.toUpperCase(), 50, 59)

    // Serial / Source
    ctx.fillStyle = isBar ? '#FF5A22' : '#A3B18A'
    ctx.font = '13px monospace'
    ctx.textAlign = 'right'
    ctx.fillText('ICMR-NIN IFCT 2017', 684, 59)
    ctx.textAlign = 'left'

    // Food Name
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 42px "Inter Tight", -apple-system, sans-serif'
    ctx.fillText(item.name, 36, 148)

    // Food Description
    ctx.fillStyle = 'rgba(243, 246, 244, 0.82)'
    ctx.font = '17px "Inter Tight", -apple-system, sans-serif'
    ctx.fillText(item.desc, 36, 186)

    // Divider Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(36, 222)
    ctx.lineTo(684, 222)
    ctx.stroke()

    // Cost Per 10g Protein (Big Focus Metric)
    ctx.fillStyle = 'rgba(243, 246, 244, 0.65)'
    ctx.font = '13px monospace'
    ctx.fillText('STANDARDIZED ECONOMIC YIELD:', 36, 268)

    ctx.fillStyle = isBar ? '#FF5A22' : '#7D8D39'
    ctx.font = 'bold 52px monospace'
    ctx.fillText(item.cost, 36, 332)

    // Protein Density Badge
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)'
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.roundRect(460, 258, 224, 84, 16)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = 'rgba(243, 246, 244, 0.7)'
    ctx.font = '12px monospace'
    ctx.fillText('PROTEIN / 100G', 480, 288)

    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 36px monospace'
    ctx.fillText(item.protein, 480, 326)
  }

  renderContent()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.minFilter = THREE.LinearFilter
  tex.magFilter = THREE.LinearFilter

  // Load genuine image and update texture
  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = item.image
  img.onload = () => {
    renderContent(img)
    tex.needsUpdate = true
  }

  return tex
}

export interface VanteVideoRibbonProps {
  onSelectFood?: (food: FoodItem) => void
}

interface ScreenRect {
  left: number
  top: number
  width: number
  height: number
}

export function VanteVideoRibbon({ onSelectFood }: VanteVideoRibbonProps) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const nameElRef = useRef<HTMLDivElement | null>(null)
  const l1Ref = useRef<HTMLDivElement | null>(null)
  const l2Ref = useRef<HTMLDivElement | null>(null)
  const capRef = useRef<HTMLDivElement | null>(null)
  const ruleRef = useRef<HTMLDivElement | null>(null)

  const [isSettled, setIsSettled] = useState(false)
  const isSettledRef = useRef(false)
  const [cardPositions, setCardPositions] = useState<ScreenRect[]>([])
  const [addedStapleId, setAddedStapleId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const addToBasket = useUserStore((state) => state.addToBasket)

  const handleInspect = (foodId: string) => {
    const food = FOOD_DATABASE.find((f) => f.id === foodId)
    if (food && onSelectFood) {
      onSelectFood(food)
    }
  }

  const handleAddToBasket = (foodId: string, name: string) => {
    addToBasket(foodId, 100)
    setAddedStapleId(foodId)
    setToastMessage(`Added 100g ${name} to your Basket`)
    setTimeout(() => {
      setAddedStapleId((prev) => (prev === foodId ? null : prev))
    }, 2000)
    setTimeout(() => {
      setToastMessage(null)
    }, 2500)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const track = trackRef.current
    if (!canvas || !track) return

    let animId: number
    let frozen = false

    const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
    const mix = (a: number, b: number, t: number) => a + (b - a) * t
    const ease = (t: number) => t * t * (3 - 2 * t)
    const out = (t: number) => 1 - Math.pow(1 - t, 3)
    const span = (p: number, a: number, b: number) => clamp((p - a) / (b - a))

    // Three.js Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setClearColor(0, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    const FOV = 35
    const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100)

    // Ribbon Path
    let path: THREE.CatmullRomCurve3
    let PATH_L = 1
    const SAMPLES = 1200
    const pathP: THREE.Vector3[] = []
    const pathT: THREE.Vector3[] = []
    const PH0 = -1.5
    const PH1 = Math.PI * 2 + 1.35

    function buildPath() {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 160; i++) {
        const t = i / 160
        const ph = mix(PH0, PH1, t)
        const cs = Math.cos(ph)
        const u = 2 * t - 1
        const depth = cs > 0 ? 7.6 + 16.4 * Math.pow(cs, 0.9) : 7.6 + 2.2 * cs
        const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1)
        pts.push(
          new THREE.Vector3(
            edge * Math.sin(ph) * depth * 0.561,
            0.5 * Math.sign(u) * Math.pow(Math.abs(u), 1.4) * depth * 0.63,
            -depth
          )
        )
      }
      path = new THREE.CatmullRomCurve3(pts, false, 'centripetal')
      path.arcLengthDivisions = 1500
      PATH_L = path.getLength()
      pathP.length = 0
      pathT.length = 0
      for (let i = 0; i <= SAMPLES; i++) {
        const u = i / SAMPLES
        pathP.push(path.getPointAt(u))
        pathT.push(path.getTangentAt(u))
      }
    }

    const at = (s: number, op: THREE.Vector3, ot: THREE.Vector3) => {
      const f = clamp(s / PATH_L) * SAMPLES
      const i = Math.min(SAMPLES - 1, Math.floor(f))
      const k = f - i
      if (pathP[i] && pathP[i + 1]) {
        op.lerpVectors(pathP[i]!, pathP[i + 1]!, k)
      }
      if (pathT[i] && pathT[i + 1]) {
        ot.lerpVectors(pathT[i]!, pathT[i + 1]!, k).normalize()
      }
    }

    // Cards & Shader
    const CARD_W = 2.1
    const CARD_H = 1.32
    const GAP = 0.04
    const STEP = CARD_W + GAP
    const NX = 28
    const NY = 3

    const vs = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`
    const fs = `uniform sampler2D map;uniform float radius,aspect;varying vec2 vUv;
    void main(){
      vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
      float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
      float px=fwidth(d),a=1.-smoothstep(-px,px,d);
      if(a<.01)discard;
      vec2 uv=vUv;
      vec3 c=texture2D(map,uv).rgb;
      gl_FragColor=vec4(c,a);
    }`

    const cards = NUTRITION_STAPLES.map((staple, i) => {
      const tex = createStapleTexture(staple)
      const geo = new THREE.PlaneGeometry(1, 1, NX, NY)
      const mat = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          map: { value: tex },
          aspect: { value: CARD_W / CARD_H },
          radius: { value: 0.02 },
        },
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.frustumCulled = false
      scene.add(mesh)

      return {
        i,
        staple,
        title: `${staple.name} — ${staple.cost}`,
        tex,
        geo,
        mat,
        mesh,
        rect: null as any,
      }
    })

    // Layout Sizing
    const GZ = 8
    let W = window.innerWidth
    let H = window.innerHeight
    let asp = W / H
    let cols = 4
    let rows = 2
    let tanH = 0.3153

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      asp = W / H
      renderer.setSize(W, H)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
      camera.aspect = asp
      camera.updateProjectionMatrix()
      tanH = Math.tan(((FOV / 2) * Math.PI) / 180)

      cols = W < 640 ? 1 : W < 1024 ? 2 : 4
      rows = Math.ceil(cards.length / cols)
      const gw = 2 * tanH * GZ * asp
      const gh = 2 * tanH * GZ
      const mX = gw * (W < 640 ? 0.05 : 0.035)
      const gapX = gw * (W < 640 ? 0.02 : 0.02)
      const gapY = gh * (W < 640 ? 0.02 : 0.03)

      const cw = (gw - 2 * mX - (cols - 1) * gapX) / cols
      const ch = cw / (CARD_W / CARD_H)

      // Perfectly center grid both horizontally and vertically
      const totalGridW = cols * cw + (cols - 1) * gapX
      const totalGridH = rows * ch + (rows - 1) * gapY
      const ox = -totalGridW / 2 + cw / 2
      const oy = totalGridH / 2 - ch / 2

      cards.forEach((c) => {
        const col = c.i % cols
        const row = Math.floor(c.i / cols)
        c.rect = {
          x: ox + col * (cw + gapX),
          y: oy - row * (ch + gapY),
          w: cw,
          h: ch,
          vw: gw,
          vh: gh,
        }
      })

      // Calculate pixel coordinates for HTML overlay cards
      const screenRects: ScreenRect[] = cards.map((c) => {
        const left = ((c.rect.x - c.rect.w / 2) / gw + 0.5) * W
        const top = (0.5 - (c.rect.y + c.rect.h / 2) / gh) * H
        const width = (c.rect.w / gw) * W
        const height = (c.rect.h / gh) * H
        return { left, top, width, height }
      })
      setCardPositions(screenRects)

      buildPath()
    }
    resize()
    window.addEventListener('resize', resize)

    // Scroll interpolation
    let p = 0
    let target = 0

    function onScroll() {
      if (!track) return
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return
      const y = -rect.top
      target = span(y, 0, total)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // Interactive Hover raycast on canvas
    const nameEl = nameElRef.current
    const handlePointerMove = (e: PointerEvent) => {
      if (p < 0.75) {
        if (nameEl) nameEl.style.opacity = '0'
        canvas.style.cursor = 'default'
        return
      }
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = 0.5 - e.clientY / window.innerHeight
      let hit: typeof cards[0] | null = null
      for (const c of cards) {
        const g = c.rect
        if (!g) continue
        const x = nx * g.vw
        const y = ny * g.vh
        if (Math.abs(x - g.x) < g.w / 2 && Math.abs(y - g.y) < g.h / 2) {
          hit = c
          break
        }
      }
      canvas.style.cursor = hit ? 'pointer' : 'default'
      if (nameEl) {
        // When grid is fully settled, HTML overlay handles card interactions
        if (p >= 0.82) {
          nameEl.style.opacity = '0'
        } else {
          nameEl.style.opacity = hit ? '1' : '0'
          if (hit) {
            nameEl.textContent = hit.title ?? ''
            nameEl.style.transform = `translate(${e.clientX + 14}px,${e.clientY + 16}px)`
          }
        }
      }
    }
    window.addEventListener('pointermove', handlePointerMove)

    // Click raycast on canvas
    const handleCanvasClick = (e: MouseEvent) => {
      if (p < 0.75) return
      const rect = canvas.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top
      const nx = clientX / rect.width - 0.5
      const ny = 0.5 - clientY / rect.height
      for (const c of cards) {
        if (!c.rect) continue
        const x = nx * c.rect.vw
        const y = ny * c.rect.vh
        if (Math.abs(x - c.rect.x) < c.rect.w / 2 && Math.abs(y - c.rect.y) < c.rect.h / 2) {
          handleInspect(c.staple.foodId)
          break
        }
      }
    }
    canvas.addEventListener('click', handleCanvasClick)

    function loop() {
      if (!frozen) {
        p += (target - p) * 0.1
        if (Math.abs(target - p) < 0.00005) p = target

        // Update settled state
        const settled = p >= 0.82
        if (settled !== isSettledRef.current) {
          isSettledRef.current = settled
          setIsSettled(settled)
        }

        // Headlines Animation
        const l1 = l1Ref.current
        const l2 = l2Ref.current
        const cap = capRef.current
        const rule = ruleRef.current

        if (l1 && l2 && cap && rule) {
          const u = span(p, 0, 0.7)
          const sh = W * 0.85 * ease(u)
          l1.style.transform = `translate3d(${-sh}px, 0, 0)`
          l2.style.transform = `translate3d(${sh}px, 0, 0)`

          const cu = span(p, 0.45, 0.78)
          cap.style.opacity = String(1 - ease(cu))

          const ru = span(p, 0.72, 0.95)
          rule.style.transform = `scaleX(${out(ru)})`
        }

        // Camera positioning: stable vantage point viewing the Catmull-Rom rail into the grid
        camera.position.set(0, 0, 0)
        camera.lookAt(0, 0, -1)

        // Cards along Catmull-Rom rail into 4x2 grid
        const head = p * (PATH_L + cards.length * STEP)
        const tGrid = out(span(p, 0.72, 0.98))

        const dummyPos = new THREE.Vector3()
        const dummyTan = new THREE.Vector3()
        const dummyNorm = new THREE.Vector3(0, 1, 0)
        const dummyBinorm = new THREE.Vector3()

        for (const c of cards) {
          const s = head - c.i * STEP
          if (s < 0 || s > PATH_L) {
            c.mesh.visible = tGrid > 0.01
          } else {
            c.mesh.visible = true
          }

          at(s, dummyPos, dummyTan)
          dummyBinorm.crossVectors(dummyTan, dummyNorm).normalize()

          const curPos = dummyPos.clone()
          const curRot = new THREE.Euler().setFromRotationMatrix(
            new THREE.Matrix4().makeBasis(dummyBinorm, dummyNorm, dummyTan)
          )

          // Interpolate to grid when tGrid > 0
          if (c.rect) {
            curPos.lerp(new THREE.Vector3(c.rect.x, c.rect.y, -GZ), tGrid)
            const gridRot = new THREE.Euler(0, 0, 0)
            curRot.x = mix(curRot.x, gridRot.x, tGrid)
            curRot.y = mix(curRot.y, gridRot.y, tGrid)
            curRot.z = mix(curRot.z, gridRot.z, tGrid)

            const scaleW = mix(CARD_W, c.rect.w, tGrid)
            const scaleH = mix(CARD_H, c.rect.h, tGrid)
            c.mesh.scale.set(scaleW, scaleH, 1)
          }

          c.mesh.position.copy(curPos)
          c.mesh.rotation.copy(curRot)
        }

        renderer.render(scene, camera)
      }
      animId = requestAnimationFrame(loop)
    }

    animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('click', handleCanvasClick)
      cards.forEach((c) => {
        c.tex.dispose()
        c.geo.dispose()
        c.mat.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return (
    <div ref={trackRef} className="relative w-full h-[320vh]">
      {/* Sticky 100vh Stage with pure dark botanical theme */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#182015] text-[#F3F6F4] select-none pt-20">
        {/* Canvas for Three.js 3D Ribbon */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-10" />

        {/* Opposite Moving Headline Lines */}
        <h1 aria-label="Protein on a budget" className="pointer-events-none z-20">
          <div
            ref={l1Ref}
            className="absolute left-0 right-0 font-display text-[clamp(44px,7.5vw,140px)] font-bold tracking-tight text-[#F3F6F4] text-center will-change-transform leading-none"
            style={{ top: 'calc(50% - 1.1em)' }}
          >
            <span className="inline-block mr-[15vw]">PROTEIN ON</span>
          </div>
          <div
            ref={l2Ref}
            className="absolute left-0 right-0 font-display text-[clamp(44px,7.5vw,140px)] font-bold tracking-tight text-[#7D8D39] text-center will-change-transform leading-none"
            style={{ top: 'calc(50% + 0.1em)' }}
          >
            <span className="inline-block ml-[15vw]">A BUDGET</span>
          </div>
        </h1>

        {/* Center Caption */}
        <div
          ref={capRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[22em] text-center text-[clamp(11px,0.9vw,15px)] font-mono font-medium tracking-widest uppercase text-[#A3B18A] z-20 pointer-events-none"
        >
          Democratizing pure protein through transparent rupee economics &bull; ICMR-NIN IFCT 2017
        </div>

        {/* Hairline Divider at p > 0.72 */}
        <div
          ref={ruleRef}
          className="absolute left-[3.5vw] right-[3.5vw] top-1/2 h-[1px] bg-[rgba(125,141,57,0.3)] origin-left z-20 pointer-events-none scale-x-0"
        />

        {/* Top Floating Controls */}
        <div
          className={`absolute left-8 right-8 top-24 flex items-center justify-between z-20 pointer-events-none transition-opacity duration-300 ${
            isSettled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#7D8D39]">
            <span className="w-2 h-2 rounded-full bg-[#FF5A22] animate-pulse" />
            <span>3D PROTEIN ECONOMIC RIBBON</span>
          </div>
          <div className="text-xs font-mono text-white/70">
            SCROLL TO ADVANCE WHOLE-FOOD BENCHMARKS
          </div>
        </div>

        {/* Bottom Floating Legend */}
        <div
          className={`absolute left-8 right-8 bottom-8 flex items-center justify-between z-20 pointer-events-none text-xs font-mono text-white/70 transition-opacity duration-300 ${
            isSettled ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span>8 LIVE ECONOMIC STAPLES</span>
          <span className="text-[#FF5A22] font-bold">100% TRANSPARENT PUBLIC DATA</span>
        </div>

        {/* Interactive HTML Card Overlays when Grid Animation is Settled */}
        <div
          className="absolute inset-0 z-30 transition-opacity duration-300 pointer-events-none"
          style={{
            opacity: isSettled ? 1 : 0,
            pointerEvents: isSettled ? 'auto' : 'none',
          }}
        >
          {/* Top Settled Status Bar */}
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 rounded-full bg-[#182015]/95 border border-[#7D8D39]/50 backdrop-blur-md shadow-2xl text-xs font-mono text-[#F3F6F4] pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7D8D39] animate-pulse" />
            <span className="font-semibold text-[#A3B18A]">STAPLES SETTLED</span>
            <span className="text-white/30 hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline text-white/90">
              Click any card to inspect clinical macros &bull; Tap +100g to add to basket
            </span>
          </div>

          {/* Interactive Card Elements positioned directly over Three.js meshes */}
          {cardPositions.map((pos, idx) => {
            const staple = NUTRITION_STAPLES[idx]
            if (!staple) return null
            const isAdded = addedStapleId === staple.foodId

            return (
              <div
                key={staple.foodId}
                onClick={() => handleInspect(staple.foodId)}
                style={{
                  position: 'absolute',
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                  width: `${pos.width}px`,
                  height: `${pos.height}px`,
                }}
                className={`group rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between p-3 select-none ${
                  staple.isBar
                    ? 'border-[#FF5A22]/50 hover:border-[#FF5A22] hover:bg-[#FF5A22]/15 hover:shadow-2xl hover:shadow-[#FF5A22]/25'
                    : 'border-[#7D8D39]/40 hover:border-[#7D8D39] hover:bg-[#7D8D39]/15 hover:shadow-2xl hover:shadow-[#7D8D39]/25'
                } hover:-translate-y-1.5 hover:scale-[1.02]`}
              >
                {/* Top Bar with Category and Inspect Hint */}
                <div className="flex items-center justify-between pointer-events-none">
                  <span
                    className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md shadow-xs ${
                      staple.isBar
                        ? 'bg-[#FF5A22] text-white'
                        : 'bg-[#5B6E2C] text-[#F3F6F4]'
                    }`}
                  >
                    {staple.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/60 group-hover:text-white transition-colors flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#A3B18A]" />
                    <span className="hidden sm:inline">Inspect</span>
                  </span>
                </div>

                {/* Center Content Placeholder (Three.js canvas shows underlying photo + typography) */}
                <div className="flex-1" />

                {/* Bottom Action Dock */}
                <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-white/15 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-lg">
                  <div className="leading-tight">
                    <div className="text-[8px] font-mono text-white/50 uppercase">Per 10g:</div>
                    <div className={`font-mono font-bold text-xs ${staple.isBar ? 'text-[#FF5A22]' : 'text-[#7D8D39]'}`}>
                      {staple.cost}
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleInspect(staple.foodId)}
                      className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 active:scale-95 text-[#F3F6F4] text-[10px] font-mono font-medium flex items-center gap-1 transition-all border border-white/15 cursor-pointer"
                      title="Inspect full nutritional & DIAAS analysis"
                    >
                      <Eye className="w-3 h-3 text-[#A3B18A]" />
                      <span className="hidden sm:inline">Inspect</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddToBasket(staple.foodId, staple.name)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 transition-all shadow-md active:scale-95 cursor-pointer ${
                        isAdded
                          ? 'bg-[#7D8D39] text-[#101410]'
                          : staple.isBar
                          ? 'bg-[#FF5A22] hover:bg-[#e04a16] text-white'
                          : 'bg-[#5B6E2C] hover:bg-[#7D8D39] text-white'
                      }`}
                      title="Add 100g to MacroSnap basket"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3 h-3 stroke-[2.5]" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3 h-3" />
                          <span>+100g</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom Prompt indicating more content below */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs font-mono text-white/70 pointer-events-auto">
            <span>Scroll down for 30-Day Grocery Savings Simulator</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#7D8D39]" />
          </div>
        </div>

        {/* Hover Pill Label Following Cursor */}
        <div
          ref={nameElRef}
          className="fixed left-0 top-0 px-4 py-2 rounded-full bg-[#5B6E2C] text-white text-xs font-bold font-mono tracking-wide pointer-events-none opacity-0 transition-opacity z-[130] whitespace-nowrap shadow-xl border border-white/20"
        />

        {/* Added Feedback Toast */}
        {toastMessage && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-[#101410]/95 border border-[#7D8D39] text-white text-xs font-mono font-medium shadow-2xl flex items-center gap-2 z-[200] animate-in fade-in zoom-in-95 duration-200">
            <Check className="w-4 h-4 text-[#7D8D39] stroke-[2.5]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
