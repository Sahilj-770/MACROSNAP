# MACROSNAP — Production Deployment & Environment Guide

## 1. Hosting Architecture

- **Platform Target**: Vercel (Next.js 16 App Router optimized).
- **Domain**: `macrosnap-two.vercel.app` (or custom brand domain).
- **Node.js Runtime**: v20+ / v22 LTS.

---

## 2. Build Pipeline

```bash
# Navigate to application directory
cd my-app

# Install exact dependencies
npm install

# Run static type & lint verification
npm run lint

# Compile production bundle
npm run build

# Test local production output
npm run start
```

---

## 3. Environment Configuration

MacroSnap uses a local-first, privacy-respecting client architecture:
- No sensitive external API keys required for core food intelligence, nutrition calculations, or persistent basket features.
- All nutritional calculations run deterministically in browser runtime.
- User storage leverages versioned `localStorage` keys (`macrosnap-user-storage-v2`).

---

## 4. Quality & Approval Gates (GATE 5 Protocol)

Per Master Studio Rules:
1. **Zero Build Failures**: Build command `npm run build` must exit 0 without TypeScript or Turbopack errors.
2. **Zero Incompatible Assets**: No external placeholder images or unverified third-party scripts.
3. **Responsive Verification**: Verified on 1440px desktop, 768px tablet, and 375px mobile viewports.
4. **Approval**: Production deployments strictly gated by human approval.
