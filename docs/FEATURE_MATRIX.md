# MACROSNAP — Complete Feature Matrix

| Feature Area | User Action | System Processing | UI Feedback | Persistence / Storage |
|---|---|---|---|---|
| **Cost per 10g Protein** | User views any food card or comparison | Normalizes retail cost against protein concentration | Visual badge, color-coded affordability tier | In-memory data (`foods.ts`) |
| **Curved 3D Food Archive** | User drags, swipes, or wheels through food items | Calculates 3D arc transform, scaling, z-index, and opacity | Central focused item expands, audio-visual feedback | Active item state |
| **Protein Ribbon Journey** | User scrolls down the page | Maps scroll progress (0% to 100%) to 3D spatial curve coordinates | Cards approach, pivot, and land into comparison podium | GSAP ScrollTrigger timeline |
| **Target Protein Calculator** | User slides bodyweight or selects activity tier | Applies ACSM/ISSN grams-per-kg multipliers (1.2g to 2.2g) | Live numerical counter, daily plate distribution | Saved to `useUserStore` |
| **Myth Busters Dossier** | User clicks category or expands myth card | Reveals peer-reviewed verdict, literature citations, and takeaways | Animated accordion / modal with badge (Busted/Nuanced/Confirmed) | In-memory data |
| **Head-to-Head Duel** | User selects 2 foods from dropdowns or presets | Computes macro delta, cost difference, and 30-day projected savings | "Winner" badge with 1-click "Add Winner to Basket" | Saved to `useUserStore` |
| **Recipe Scaler** | User clicks 1x, 2x, 3x, or 4x serving buttons | Multiplies ingredient grams, protein contribution, and total price | Instant re-render of recipe card and nutrition facts | Component state |
| **Foil Pack Decoder** | User hovers or taps on back-of-pack hotspots | Explains food industry manipulation tactics (e.g. maltitol GI) | Callout card highlighting deception risk | Component state |
| **Grocery Basket** | User adds foods or recipes to basket | Sums total cost (₹), total protein (g), and avg cost per 10g protein | Sticky header bar, budget gauge, item quantity steppers | `localStorage` (`macrosnap-user-storage-v2`) |
| **Saved Library** | User bookmarks foods, duels, or recipes | Updates favorites arrays | Heart / bookmark icon filled, instant sync in Library tab | `localStorage` (`macrosnap-user-storage-v2`) |
