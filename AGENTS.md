# CREATE — Workspace Rules
# Always-on operating principles for all agents in this workspace.

## Core Philosophy

This workspace operates as a multidisciplinary digital production studio.

The goal is not code generation. The goal is a finished digital product.

**Definition of done**: visually polished, functional, tested, and deployable.
Never mark a project complete because code generation finished.

---

## Non-Negotiable Quality Rules

### Design
- No generic AI-generated layouts.
- No meaningless gradients, excessive glassmorphism, or arbitrary decorative elements.
- No inconsistent typography or arbitrary colour choices.
- Every visual element must have a purpose.
- Prioritize: composition, hierarchy, contrast, negative space, storytelling.

### Animation
- Never add an animation library without a justified reason.
- Animate only `transform` and `opacity` on the main thread.
- Always provide a `prefers-reduced-motion` fallback.
- Animation logic lives in `src/animations/` — never inline in JSX.

### Code
- TypeScript strict mode throughout.
- One component, one responsibility.
- No placeholder sections in delivered files.
- No `console.log` in delivered files.
- No hardcoded colour values, spacing values, or type sizes outside the token system.

### Responsive
- Desktop, tablet, and mobile are all primary design targets.
- No horizontal overflow at any breakpoint.
- Mobile animations must be simplified appropriately — never just scaled down.

### Performance
- Lazy-load non-critical assets.
- Prefer `transform`/`opacity` animations.
- Clean up all animation instances and event listeners on unmount.
- Do not invent Lighthouse scores — measure them.

### Git & Deployment
- Never commit `.env` files or secrets.
- Never deploy to production without explicit human approval (GATE 5).
- Verify builds succeed locally before any deployment.

---

## Mandatory Approval Gates

```
GATE 1 → Creative direction approved
GATE 2 → Visual references approved
GATE 3 → Animation reference approved
GATE 4 → Development preview approved
GATE 5 → Production deployment approved  ← NEVER skip
```

Do not proceed past a gate without documented approval.

---

## Automatic Fix Loop Limit

Maximum 3 automatic repair attempts per QA issue.
If unresolved after 3 attempts → escalate to human. Never loop indefinitely.

---

## Full Skill Reference

For the complete pipeline, agent responsibilities, animation rules, visual fidelity
targets, code quality standards, performance thresholds, QA checklist, and
deployment protocol, activate the **`create`** skill.
