# Design System Document: Sovereign Verification

## 1. Overview & Creative North Star: "The Architectural Ledger"
This design system moves beyond the "SaaS template" aesthetic to establish a visual language of permanence and authority. For Crossgates Connect, we are not just building an interface; we are building a digital infrastructure for global trade.

**Creative North Star: The Architectural Ledger**
The system is inspired by high-end editorial layouts and modern architectural drafting. It balances the organic stability of sage and deep forest greens with a rigid, mathematical precision. We break the "flat" web tradition by using **Tonal Layering** and **Intentional Asymmetry**. We create trust not through heavy borders, but through the sophisticated use of whitespace, "glass" surfaces, and a hierarchy that feels like a well-organized legal document.

---

## 2. Colors: Tonal Depth & The No-Line Rule
Our palette is rooted in the earth (greens) and the archive (off-whites). 

### The "No-Line" Rule
To achieve a premium, custom feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. This creates a "molded" look rather than a "pasted" look.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper and frosted glass.
- **Surface (`#f9f9f9`)**: The base canvas.
- **Surface-Container-Lowest (`#ffffff`)**: Used for primary cards or focal points to make them "pop" against the off-white base.
- **Surface-Container-Highest (`#e2e2e2`)**: Used for utility bars or "sunken" interactive areas.

### The "Glass & Gradient" Rule
Standard buttons feel "default." To create a signature feel:
- **Hero CTAs:** Use a subtle linear gradient from `primary` (#326a39) to `primary-container` (#6da770) at a 135-degree angle. This adds a "weighted" metallic luster.
- **Floating Overlays:** Use `surface-container-lowest` with a 85% opacity and a `20px` backdrop-blur to create a "frosted glass" effect for navigation headers or modal backgrounds.

---

## 3. Typography: The Editorial Voice
We utilize a dual-font strategy to balance character with utility.

*   **Display & Headlines (Manrope):** The "Architect." Manrope’s geometric yet warm proportions provide an authoritative, modern feel. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for hero moments to evoke a sense of global scale.
*   **Body & Labels (Inter):** The "Workhorse." Inter provides maximum legibility for complex trade data.
*   **Hierarchy as Identity:** Use high contrast between `headline-lg` and `body-md`. Bold, oversized headings paired with generous leading in body text create an "Editorial" look that feels premium and curated.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "cheap" for enterprise-grade verification. We use **Ambient Depth.**

*   **The Layering Principle:** Instead of shadows, stack `surface-container` tiers. A `surface-container-lowest` card on a `surface-container-low` background creates a natural, soft lift.
*   **Ambient Shadows:** If a floating element (like a dropdown) requires a shadow, use a large blur (30px+) at 4% opacity, using a tinted color: `rgba(26, 28, 28, 0.04)`.
*   **The "Ghost Border" Fallback:** If a container needs more definition (e.g., in a complex data table), use the `outline-variant` (#c1c9bd) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Apply to global navigation bars to allow the brand’s deep greens and sage accents to "bleed" through as the user scrolls, maintaining a sense of place.

---

## 5. Components: Enterprise-Grade Solidity

### Buttons
*   **Primary:** Gradient of `primary` to `primary-container`. Corner radius: `md` (0.375rem). Text: `label-md` uppercase with 0.05em tracking.
*   **Secondary:** `surface-container-highest` background with `on-surface` text. No border.
*   **Tertiary:** Transparent background with `primary` text. Use a `2px` underline on hover.

### Input Fields
*   **Styling:** Forgo the 4-sided box. Use a `surface-container-low` background with a `2px` bottom-stroke of `outline-variant`.
*   **States:** On focus, the bottom-stroke transitions to `primary` (#326a39) and the background shifts to `surface-container-lowest`.

### Cards & Lists
*   **No Dividers:** Forbid the use of horizontal lines between list items. Use **Vertical White Space** (16px - 24px) or a subtle alternating background shift (`surface` to `surface-container-low`) to separate data rows.
*   **The "Verification" Chip:** Use `secondary-container` (#cde6d1) with `on-secondary-container` (#516857) text. Roundedness: `full`. This provides a "soft-secure" signal.

### Verification Timeline (Context-Specific)
*   A custom vertical component using `primary-fixed` (#b4f2b4) for the progress line and `headline-sm` for the status. This creates a clear, visual "path of truth" for global trade assets.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Grids:** Align text to a 12-column grid but allow imagery or secondary data cards to span "off-center" to create a high-end feel.
*   **Embrace Negative Space:** If a screen feels "empty," leave it. In verification, clarity is a feature, not a bug.
*   **Tonal Transitions:** Use `surface-dim` to transition between major content blocks instead of a line.

### Don’t:
*   **Don't use pure black:** Use `on-surface` (#1a1c1c) for all "black" text to keep the palette organic.
*   **Don't use standard shadows:** Avoid `0px 2px 4px rgba(0,0,0,0.5)`. It breaks the "Architectural Ledger" aesthetic.
*   **Don't crowd data:** Never sacrifice the 8px spacing scale for the sake of fitting more content. If data is dense, use "Physical Layers" (modals or drawers) to hide secondary information.