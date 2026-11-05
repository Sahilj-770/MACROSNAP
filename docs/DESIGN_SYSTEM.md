# MACROSNAP — Visual Identity & Design System Specification

> **Version**: 2.0  
> **Color Standard**: Non-negotiable single source of truth across all routes, components, and animations.

---

## 1. Color Palette Tokens

| Token Name | Hex Code | CSS Variable | Semantic Usage |
|---|---|---|---|
| **Soft White** | `#F3F6F4` | `--ms-white` | Primary canvas background, clean light surfaces, card interior |
| **Sage** | `#7D8D39` | `--ms-sage` | Primary brand color, pill tags, subtle borders, brand marks |
| **Deep Olive** | `#5B6E2C` | `--ms-olive` | Major headings, high-contrast borders, active states, dark surfaces |
| **Tangerine** | `#FF5A22` | `--ms-orange` | Strategic CTAs, key calculated metric highlights, alert indicators |
| **Ink** | `#20271D` | `--ms-ink` | Primary reading typography, high-contrast dark accents |
| **Muted** | `#737B70` | `--ms-muted` | Secondary captions, source provenance labels, subtle borders |
| **Border Neutral** | `rgba(91, 110, 44, 0.18)` | `--ms-border` | Subtle structural division lines and container borders |

### Global CSS Declaration
```css
:root {
  --ms-white: #F3F6F4;
  --ms-sage: #7D8D39;
  --ms-olive: #5B6E2C;
  --ms-orange: #FF5A22;

  --ms-ink: #20271D;
  --ms-muted: #737B70;
  --ms-border: rgba(91, 110, 44, 0.18);

  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-smooth: cubic-bezier(0.76, 0, 0.24, 1);
}
```

---

## 2. Typography Rules

1. **Editorial Display Typeface**:
   - Usage: Main hero headlines, statement banners, food titles, section markers.
   - Styling: High-contrast serif style (`Instrument Serif` / `Georgia` / `serif`), italic accents, relaxed letter-spacing.
2. **Contemporary Sans-Serif**:
   - Usage: Body copy, navigation links, buttons, data labels, numerical inputs, tables.
   - System: Clean geometric sans (`system-ui`, `-apple-system`, `Inter`, `sans-serif`), crisp rendering, high legibility at micro sizes.

---

## 3. Component Design Rules

- **Navbar**: Must always be the first visible UI element on the page. Fixed, backdrop-blur with `--ms-white`/90 opacity, subtle `--ms-border` baseline. Never placed below announcement banners.
- **Buttons**:
  - Primary: Deep Olive background (`#5B6E2C`), Soft White text, rounded-full or rounded-xl, hover to Tangerine (`#FF5A22`).
  - Secondary: Soft White background, Deep Olive border, hover to Sage background (`#7D8D39`) with Soft White text.
  - Accent / CTA: Tangerine background (`#FF5A22`), white text, reserved for high-intent conversions.
- **Cards & Surfaces**:
  - Soft White surface with subtle `--ms-border` (1px solid `rgba(91, 110, 44, 0.18)`).
  - No generic heavy grey box-shadows. Shadows are soft, tinted with `--ms-ink`/5%.
- **Motion & Easing**:
  - All interactive transforms transition using `--ease-editorial` (`cubic-bezier(0.16, 1, 0.3, 1)`).
  - Main thread transforms restricted strictly to `transform` and `opacity`.
