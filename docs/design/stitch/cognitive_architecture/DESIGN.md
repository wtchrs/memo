---
name: Cognitive Architecture
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464553'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777584'
  outline-variant: '#c8c4d5'
  surface-tint: '#544fc0'
  primary: '#1f108e'
  on-primary: '#ffffff'
  primary-container: '#3730a3'
  on-primary-container: '#a9a7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#511c00'
  on-tertiary: '#ffffff'
  tertiary-container: '#752c00'
  on-tertiary-container: '#fe9562'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3b35a7'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb694'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7a3003'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  sidebar-width: 260px
  max-width-editor: 800px
---

## Brand & Style

The design system is built upon the "Second Brain" philosophy: an external digital workspace designed to reduce cognitive load and enhance creative throughput. The brand personality is professional, hyper-organized, and intellectually dependable. 

The visual style is **Minimalist** with a focus on high information density. It prioritizes content over decoration, utilizing generous white space not as "empty space," but as a structural tool to separate complex ideas. The aesthetic avoids unnecessary flourishes, opting instead for precise alignments, clear hierarchies, and functional clarity to foster a state of "deep work" and mental flow.

## Colors

The palette is engineered for long-term legibility and reduced eye strain during extended research sessions.

- **Primary (Deep Indigo):** Used sparingly for primary call-to-actions, active navigation states, and key interactive highlights. It represents focus and intelligence.
- **Secondary (Slate Blue):** Applied to supporting metadata, icons, and secondary utility actions to provide a softer visual tier.
- **Neutral/Background (Off-white):** A subtle `#F8FAFC` foundation that differentiates the workspace from the standard stark white of a browser, creating a dedicated "canvas" feel.
- **Surfaces:** Pure white is reserved for cards and editor canvases to make content "pop" against the off-white background.
- **Text:** High-contrast Slate-900 is used for maximum readability, ensuring that even dense blocks of text remain accessible.

## Typography

The typography system utilizes **Inter** for its exceptional readability and neutral, professional tone. To support the "Second Brain" aspect of organization and metadata, **JetBrains Mono** is introduced for labels, tags, and technical metadata to provide a subtle "data-driven" aesthetic.

- **Scale:** A tight scale is used to maintain information density.
- **Body Text:** Optimized for long-form reading with a 1.6x line-height on `body-lg`.
- **Monospace Accents:** Use JetBrains Mono for tags, timestamps, and ID numbers to distinguish "system data" from "user thoughts."

## Layout & Spacing

This design system employs a **Fixed-Fluid Hybrid** model. 

- **Navigation:** A fixed-width sidebar (260px) houses high-level architecture (Inbox, Projects, Areas, Tags).
- **Workspace:** A fluid grid for "Memo Cards" using a masonry or multi-column CSS grid (typically 3 columns on desktop, 2 on tablet, 1 on mobile).
- **The Editor:** A centered, fixed-width "focus mode" column (max 800px) to prevent line lengths from becoming unreadable on ultra-wide monitors.
- **Rhythm:** An 8px base grid drives all padding and margins. Vertical rhythm is strictly enforced to maintain a sense of professional order.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** supplemented by **Ambient Shadows**.

- **Level 0 (Background):** The `#F8FAFC` base layer.
- **Level 1 (Cards/Sidebar):** Pure white surfaces with a very soft, diffused shadow (`0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)`). This makes cards feel like physical slips of paper resting on a desk.
- **Level 2 (Active/Hover):** When a memo is engaged, the shadow increases in depth and the border shifts to a subtle 1px primary-tinted stroke.
- **Overlays (Modals/Search):** High-diffusion shadows with a 10% backdrop blur on the layer beneath to maintain context while focusing the user.

## Shapes

The shape language is **Soft and Precise**. 

- **Standard Elements:** 0.25rem (4px) corner radius for most inputs and small components to maintain a crisp, professional edge.
- **Cards & Containers:** 0.5rem (8px) for larger surfaces like memo cards and editor containers to provide a modern, approachable feel.
- **Buttons:** Subtle rounding (4px) rather than pills to maintain the "serious tool" aesthetic. 
- **Tags:** Fully rounded (pill) to distinguish them clearly from interactive buttons or square cards.

## Components

- **Memo Cards:** White surfaces containing a `headline-sm` title, a `body-md` snippet, and a footer row with `label-caps` tags. Hover states should subtly lift the card via elevation.
- **Sidebar Navigation:** Clean, icon-led list items. Active states use a "soft-bleed" background in a 5% opacity version of the primary color and a 2px vertical indicator on the left.
- **Search Bar:** A prominent top-level component. On focus, the border transitions to Primary Indigo and expands slightly. Use a keyboard shortcut hint (e.g., `⌘K`) in the trailing edge.
- **Rich Text Editor:** A "distraction-free" interface. Formatting bars are hidden by default, appearing only on text selection (floating bubble) or as a subtle fixed footer.
- **Chips/Tags:** Small-scale elements with a light gray background and `label-md` text. Used for categorization without visual clutter.
- **Checkboxes:** Square with a 2px radius. When checked, they fill with the Primary Indigo color and a white checkmark, subtly striking through the associated text.