---
name: Cognitive Architecture
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c6c5d5'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908f9e'
  outline-variant: '#454653'
  surface-tint: '#bdc2ff'
  primary: '#bdc2ff'
  on-primary: '#131e8c'
  primary-container: '#818cf8'
  on-primary-container: '#101b8a'
  inverse-primary: '#4953bc'
  secondary: '#b9c8de'
  on-secondary: '#233143'
  secondary-container: '#39485a'
  on-secondary-container: '#a7b6cc'
  tertiary: '#7bd0ff'
  on-tertiary: '#00354a'
  tertiary-container: '#00a0d7'
  on-tertiary-container: '#003246'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e0e0ff'
  primary-fixed-dim: '#bdc2ff'
  on-primary-fixed: '#000767'
  on-primary-fixed-variant: '#2f3aa3'
  secondary-fixed: '#d4e4fa'
  secondary-fixed-dim: '#b9c8de'
  on-secondary-fixed: '#0d1c2d'
  on-secondary-fixed-variant: '#39485a'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
  dark-surface: '#0f172a'
  dark-surface-dim: '#0b1120'
  dark-surface-bright: '#1e293b'
  dark-surface-container-lowest: '#070d19'
  dark-surface-container-low: '#131d31'
  dark-surface-container: '#1e293b'
  dark-surface-container-high: '#334155'
  dark-surface-container-highest: '#475569'
  dark-on-surface: '#f8fafc'
  dark-on-surface-variant: '#94a3b8'
  dark-outline: '#334155'
  dark-outline-variant: '#1e293b'
  dark-primary: '#818cf8'
  dark-on-primary: '#0f172a'
  dark-primary-container: '#3730a3'
  dark-on-primary-container: '#e0e7ff'
  dark-secondary: '#94a3b8'
  dark-secondary-container: '#1e293b'
  dark-on-secondary: '#0f172a'
  dark-code-bg: '#090d16'
  dark-selection: '#312e81'
  light-surface: '#f7f9fb'
  light-surface-container: '#eceef0'
  light-surface-container-high: '#e6e8ea'
  light-surface-container-lowest: '#ffffff'
  light-on-surface: '#191c1e'
  light-on-surface-variant: '#464553'
  light-outline: '#777584'
  light-outline-variant: '#c8c4d5'
  light-primary: '#3730a3'
  light-primary-container: '#e0e7ff'
  light-on-primary: '#ffffff'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
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
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system is built upon the "Second Brain" philosophy: an external digital workspace engineered to reduce cognitive strain, curate fragmented insights, and power sustained deep work. The brand personality is calm, rigorous, and intellectually dependable—functioning less like an ephemeral social tool and more like an archival instrument.

The design style is **Minimalism with Technical Precision**. Content and synthesis supersede decoration. The workspace relies on structured typographic contrast, meticulous alignment, and tonal hierarchy rather than aggressive visual styling. The addition of an immersive dark mode specifically targets night-time synthesis, terminal workflows, and low-light knowledge mapping, maintaining an uninterrupted state of cognitive flow.

## Colors

The color system operates on dual operational tiers: a high-efficiency dark mode engineered for low ocular strain during prolonged synthesis sessions, and a crisp, archival light mode for daytime document preparation.

### Dark Mode Semantic Mapping
- **Canvas Base (`#0f172a`):** Deep slate provides a non-reflective, ink-like foundation that avoids the harsh contrast of pitch black (`#000000`).
- **Surface Elevation Series:** Surfaces gain visual height through increasing zinc/slate luminance (`#131d31` low -> `#1e293b` container -> `#334155` high -> `#475569` highest).
- **Luminous Indigo (`#818cf8`):** Serves as the primary dark-mode accent. Its higher lightness value ensures strong contrast ratios against dark containers without glare.
- **Deep Indigo Container (`#3730a3`):** Utilized for active navigation states, selected memo chips, and primary action fills.
- **Outlines (`#334155` and `#1e293b`):** Soft, structural boundaries that separate dense information grids without introducing visual clutter.
- **Code & Editor Backgrounds (`#090d16`):** An ultra-deep inset tone that sets mono blocks and script snippets apart from parent card containers.

## Typography

The typographic hierarchy distinguishes organic user thoughts from systematic metadata. 

- **Primary Voice (Inter):** Headlines and body copy use Inter with tight tracking on headings (`-0.02em` to `-0.01em`) to create unified visual word shapes. Body copy is set with a relaxed line height (`26px` on `16px` font) to guarantee long-form legibility during extended reading sessions.
- **System & Syntax Voice (JetBrains Mono):** Code snippets, property labels, timestamps, hotkeys, and taxonomy tags adopt JetBrains Mono. In dark mode, code blocks maintain high legibility by pairing crisp monospace text against deep recessed background plates (`#090d16`).

## Layout & Spacing

The layout is structured around an asymmetrical three-pane architectural model:

1. **Structural Rail & Navigation (260px fixed width):** Holds root taxonomies, workspaces, projects, and contextual tag trees. It collapses into a drawer on tablet and mobile viewports.
2. **Contextual Stream / Masonry Grid:** Dynamically fills remaining canvas space with cards arranged in 1 to 3 columns depending on device width (1 column on mobile `<768px`, 2 columns on tablet `<1280px`, and 3 columns on desktop `≥1280px`).
3. **Synthesis Canvas / Focus Column:** When editing long-form documents, the interface enters a dedicated distraction-free canvas constrained to a maximum width of 800px.

All layouts strictly adhere to an 8px spatial grid, using half-step units (`4px` / `0.25rem`) exclusively for compact badge paddings, code line tags, and input icon offsets.

## Elevation & Depth

In dark mode, depth cannot be communicated through traditional drop shadows alone, as dark ambient backgrounds absorb shadow outlines. Hierarchy is instead articulated through **Tonal Layering** supplemented with **Subtle Luminous Borders**:

- **Elevation 0 (Canvas Base):** Base backdrop `#0f172a`. Flat, borderless, neutral.
- **Elevation 1 (Card & Content Blocks):** `#1e293b` surface outlined with a 1px border of `#334155`. Soft ambient shadow: `0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)`.
- **Elevation 2 (Floating Menus & Popovers):** `#334155` container with 1px border of `#475569`. Diffuse shadow: `0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.5)`.
- **Elevation 3 (Command Palette & Modal Dialogs):** `#1e293b` core with high-contrast `rgba(129, 140, 248, 0.2)` edge stroke, layered over a backdrop blur (`backdrop-filter: blur(8px)`) with a `rgba(7, 13, 25, 0.75)` scrim.

## Shapes

The design system employs a soft, restrained shape language. Small interface elements such as inputs, buttons, and code tags use a tight `0.25rem` (4px) corner radius, preserving the crisp visual cues of a structured productivity engine.

Card containers and editor frames use `rounded-lg` (`0.5rem` / 8px). Interactive metadata pills and system tags use full pill borders (`9999px`) to maintain clear differentiation from functional buttons and actionable card targets.

## Components

- **Memo & Insight Cards:** Rendered on `#1e293b` with a 1px `#334155` border. On hover, the border transitions to luminous indigo (`#818cf8`) at 50% opacity, accompanied by an elevation shift to Elevation 2. Internal tags are nested at the bottom edge.
- **Code Blocks & Inline Syntax:** Inline snippets use `#090d16` with text colored in luminous indigo `#818cf8` and a 1px border of `#1e293b`. Multi-line code blocks utilize full-width recessed frames (`#090d16`) with an upper metadata bar indicating the language via `label-caps` in `#94a3b8`.
- **Action Buttons:** 
  - *Primary:* `#818cf8` background with `#0f172a` text (dark mode) or `#3730a3` background with `#ffffff` text (light mode), rounded to 4px.
  - *Secondary:* Transparent background with a 1px `#334155` border and `#f8fafc` text. Hover fills to `#1e293b`.
- **Search & Quick-Switcher (`⌘K`):** Floating modal centered on the screen, bounded by a 1px `#475569` border. Displays recent queries and indexed notes. Monospace keycaps are styled with a subtle `#334155` surface fill and `#94a3b8` typography.
- **Chips & Categorization Badges:** Fully rounded pills with a `#1e293b` surface and `#94a3b8` label. When active or filtered, they transition to a `#3730a3` fill with luminous `#818cf8` text and an `#818cf8` hairline border.
- **Form Inputs & Search Fields:** In dark mode, inputs use an inset surface of `#0b1120` surrounded by `#334155`. On active focus, the border shifts to `#818cf8` with a 1px outer ring glow (`rgba(129, 140, 248, 0.25)`).
- **Checklists & Task Toggles:** Square boxes with a 2px radius and 1.5px `#475569` stroke. When toggled, they animate into an indigo `#818cf8` fill with a `#0f172a` checkmark, applying a strikethrough and `#64748b` color shift to the associated text.