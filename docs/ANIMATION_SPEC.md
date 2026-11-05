# MACROSNAP — Animation & Interaction Engineering Specification

## 1. Core Motion Philosophy

Animations must feel **cinematic, intentional, and biologically connected** — never decorative or gratuitous.

- Main thread transitions: strictly `transform` and `opacity`.
- Timing: Micro-interactions (150ms–250ms), structural transitions (400ms–600ms), cinematic editorial reveals (700ms–1100ms).
- Easing: Custom cubic-bezier `--ease-editorial` (`cubic-bezier(0.16, 1, 0.3, 1)`) and `--ease-smooth` (`cubic-bezier(0.76, 0, 0.24, 1)`).
- Accessibility: Full `prefers-reduced-motion` compliance. When enabled, all transforms and scroll-linked pinning instantly settle to their terminal states.

---

## 2. Reference Implementation Specs

### Reference 1: Fernhollow-Inspired Botanical Homepage
- **Element**: Full-viewport botanical canvas & ambient floating organic food elements.
- **Technology**: HTML5 Canvas / WebGL fallback with smooth parallax pointer interaction.
- **Progress**: Mouse coordinate smoothing with lerp factor `0.05`.
- **Text Reveal**: Staggered line reveals (`y: 30px` to `y: 0px`, `opacity: 0` to `1`) using `--ease-editorial`.
- **Fallback**: On mobile or low-power devices, static layered botanical compositions with gentle CSS fade-ins.

### Reference 2: Leon Vasari-Inspired Curved Food Discovery Archive
- **Element**: 3D curved shelf / horizontal arc displaying food cards along an elliptical path.
- **Technology**: CSS 3D Transforms (`perspective: 1200px`, `rotateY`, `translateZ`, `translateX`) or Canvas rendering.
- **Math**:
  - For item index $i$ and active index $A$:
  - Distance: $d = i - A$.
  - Translation X: $X = d \times 240\text{px}$.
  - Translation Z: $Z = -|d| \times 90\text{px}$.
  - Rotation Y: $\theta = -\text{clamp}(d \times 18^\circ, -45^\circ, 45^\circ)$.
  - Scale: $S = \text{max}(0.75, 1 - |d| \times 0.12)$.
  - Opacity: $O = \text{max}(0.4, 1 - |d| \times 0.25)$.
- **Interaction**: Mouse drag, touch swipe, left/right keyboard arrows, mouse wheel.
- **Detail View**: Clicking active food smoothly expands an editorial food dossier modal without page reload.

### Reference 3: Vante-Inspired 3D Video Ribbon for Protein on a Budget
- **Element**: Continuous 3D ribbon of food media cards traversing through depth as the user scrolls.
- **Technology**: GSAP 3 + ScrollTrigger with normalized scroll progress (`0.0` to `1.0`).
- **Path Dynamics**: 
  - Rail begins deep in z-space ($Z = -600\text{px}, Y = 100\text{px}$).
  - Approaching camera at $50\%$ progress ($Z = 0\text{px}, Y = 0\text{px}$).
  - Transitioning cards into a structured comparison podium at $100\%$ progress.
  - Reversible: backward scrolling gracefully reverses the ribbon back into deep space.
- **Performance Safeguard**: Video cards lazy-load metadata only; active playback begins only when within viewport bounds. Mobile devices fall back to an interactive swipeable ribbon.

### Reference 4: Aurevon-Inspired Myth Busters
- **Element**: Full-viewport video hero with fixed transparent-to-solid navigation and editorial text stagger.
- **Video Background**: Exact AWS CloudFront stream with `autoplay`, `muted`, `loop`, `playsinline`, `object-fit: cover`.
- **Navigation Overlay**: Full-screen mobile overlay with staggered link entries and body scroll lock.
- **Myth Dossier Cards**: Expandable truth panels with smooth height transition (`grid-template-rows: 0fr` to `1fr`).
