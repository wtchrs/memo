# Stitch design references

This directory contains design guidelines, tokens, screenshots, and HTML exported
from Stitch as implementation references for the Second Brain web client.

## Contents

- [DESIGN.md](cognitive_architecture/DESIGN.md): design principles and YAML
  frontmatter containing color, typography, radius, and spacing tokens. There is
  no separate token file in this export.
- Dashboard: [screenshot](dashboard/screen.png) and
  [HTML](dashboard/code.html).
- Memo editor: [screenshot](editor/screen.png) and
  [HTML](editor/code.html).
- Search results: [screenshot](search/screen.png) and
  [HTML](search/code.html).
- Tags: [screenshot](tag/screen.png) and
  [HTML](tag/code.html).

All four screenshots are 1600 × 1280 pixels.

## Using the references

Read DESIGN.md for design intent and token values, compare screenshots for
layout and visual hierarchy, and consult the HTML for concrete styles and
structure. Translate these references into the existing React/Tailwind frontend
and shadcn components. The HTML files are static prototypes with placeholder
content and do not define the application's feature requirements.

The HTML references load Tailwind, fonts, icons, and some images from external
URLs. The PNG files preserve the exported appearance without those dependencies.

## Application token decisions

The frontend defines the Stitch palette and scales in
`apps/frontend/src/styles/tokens.foundation.css`. It maps semantic roles and
Tailwind color utilities in `tokens.semantic.css`.

- Use the DESIGN.md frontmatter background value, `#f7f9fb`. Its prose and the
  search stylesheet also use `#F8FAFC`. The frontmatter is the explicit token
  definition and agrees with the HTML theme configurations.
- Use the frontmatter radius scale: `sm: 0.125rem`, `DEFAULT: 0.25rem`,
  `md: 0.375rem`, `lg: 0.5rem`, `xl: 0.75rem`, and `full: 9999px`.
  The HTML uses smaller radii. DESIGN.md takes priority over those exports.
  Use `rounded` for buttons and inputs, `rounded-lg` for cards, and
  `rounded-full` for tags. Keep this scale when adding shadcn components.
  Its generated radius formulas and component classes can differ from Stitch.
- Use the frontmatter spacing unit of 4px. The prose describes an 8px rhythm.
  An 8px step is two units on this scale. Keep the named layout values from
  the frontmatter, including the 260px sidebar and 800px editor limit.
- Use all eight frontmatter typography styles. Keep the existing `text-sm`,
  `text-base`, and `text-lg` utilities as size and line-height aliases for
  `body-md`, `body-lg`, and `headline-sm`. Keep `text-heading-sm`,
  `text-heading-md`, and `text-heading-lg` as aliases for `headline-sm`,
  `headline-md`, and `display-lg`. The mobile headline has its own utility.
  Use `font-label-caps` with `text-label-caps` for monospace labels.
  Register all named text sizes in `customTailwindMerge.ts`. This lets size
  overrides replace earlier sizes without removing text colors.
- Load Inter and JetBrains Mono through the shared stylesheet with Google
  Fonts, as the dashboard export does. Use local fallback fonts while fonts
  load or if the font service is unavailable.
- Use shadcn role names for semantic CSS variables and Tailwind utilities.
  Keep the `ds-palette-*` variables as the original Stitch light palette.
  Keep `bg`, `fg`, `on-background`, `on-primary`, `on-secondary`, `danger`,
  and `on-danger` utility names as compatibility aliases.
- Use the exact level 1 shadow from DESIGN.md. Use the dashboard hover shadow
  for level 2 because DESIGN.md does not specify its numeric value.
- Use 38% foreground for disabled content and 12% foreground for disabled
  filled backgrounds. These state decisions follow Stitch's disabled-state
  guidance. DESIGN.md provides the base palette but does not define these
  opacity values.

### Semantic color roles

The role names follow [shadcn theming](https://ui.shadcn.com/docs/theming).
The mappings below preserve Stitch's light theme and visual hierarchy.

| Role | Stitch value or derivation | Reason |
| --- | --- | --- |
| `background` / `foreground` | `background` / `on-background` | Main canvas and text. |
| `card`, `popover` / their foregrounds | `surface-container-lowest` / `on-background` | White surfaces above the canvas. |
| `primary` / `primary-foreground` | `primary` / `on-primary` | Main actions use indigo and white. |
| `secondary` / `secondary-foreground` | `surface-container` / `secondary` | Supporting actions use a light fill and slate text. |
| `muted` / `muted-foreground` | `surface-container-low` / `on-surface-variant` | Subtle backgrounds and supporting text have separate roles. |
| `accent` / `accent-foreground` | 5% primary mixed with background / `primary` | Interactive highlights follow the navigation treatment in DESIGN.md. |
| `destructive` / `destructive-foreground` | `error` / `on-error` | Error emphasis and destructive actions. |
| `border`, `input` | `outline-variant` | Shared borders for surfaces and controls. |
| `disabled-bg` | `foreground` at 12% opacity | Neutral fill for unavailable filled buttons. |
| `disabled-fg` | `foreground` at 38% opacity | Reduced emphasis for unavailable text and icons. |
| `disabled-border` | `border` at 30% opacity | Weak boundary for unavailable inputs. |
| `ring` | `primary` | Keyboard focus. |
| `sidebar` roles | Corresponding card, foreground, primary, accent, border, and ring roles | Navigation follows the same hierarchy. |

Use `text-muted-foreground` for supporting text and placeholders. Use
`bg-muted` for subtle surfaces. Stitch's `secondary` is a slate color, while
shadcn's `secondary` names a supporting surface. Use the mapped role pair for
secondary buttons. The original slate color remains in `--ds-palette-secondary`.
Add chart roles when charts need a palette.

Disabled filled buttons use `disabled-bg` and `disabled-fg`, a transparent
border, and no shadow. Disabled inputs use `surface-container-low` as their
background, `disabled-fg` for values and placeholders, and `disabled-border`
for their boundary. This keeps disabled controls distinct from secondary
buttons, which retain their full slate text color, border, and shadow.

Define the opacity in each color token by mixing with transparent in sRGB.
The theme's `foreground` role matches Stitch's `on-surface` in light mode and
uses the preview foreground in dark mode. The translucent colors blend with
the surface underneath them. Keep these aliases at each theme boundary so
they resolve the local colors. Do not reduce the whole control's opacity as
well. Replace shadcn's default disabled opacity classes with these styles.

Keep disabled state separate from muted emphasis. Muted content includes
readable descriptions and placeholders in available controls. Disabled colors
identify controls that cannot be used. Their color values can overlap without
making the roles equivalent.

### Keyboard focus

Use a 1px outer ring with a 1px offset to show keyboard focus on buttons and
inputs. Use the `ring` role for its color and `background` for the offset.
The thin ring keeps focus visible without adding a heavy perimeter. Invalid
inputs keep the error border and use the error color for their focus ring.
These changes keep the control's dimensions unchanged.

Show the ring on `focus-visible` when suppressing the browser outline. Use
the same ring width and offset when adding shadcn components.

When initializing shadcn, use `src/styles/tailwind.css` as its CSS entry and
enable `tailwind.cssVariables`. Reconcile generated defaults with these roles.
Its `cn()` helper must use the configured merge function from
`src/utils/customTailwindMerge.ts` to preserve the named typography styles.

### Dark theme

Stitch does not define a dark palette. Keep the existing slate canvas, light
text, pale indigo primary, and pale red error colors as the dark preview base.
Derive the surface levels by mixing the canvas with 3%, 6%, 10%, 14%, and 18%
foreground, from `surface-container-lowest` through `surface-container-highest`.
Use the canvas for `surface` and `surface-dim`. Use the highest container for
`surface-bright`. Keep the existing 20% foreground mix for secondary actions.
Use a 10% primary mix for accent backgrounds in the dark theme.

Toggle `.dark` on the document or a preview container. Both semantic variables
and Tailwind `dark:` utilities follow this class. Define role aliases at each
theme boundary so scoped previews resolve local colors. Surface utilities,
their text colors, and outline utilities follow the active theme. The remaining
utilities for primary, secondary, and error containers, inverse colors, fixed
colors, and tertiary colors expose light palette values. Use the semantic roles
for components that must change theme.

## Version control

Track DESIGN.md, HTML, PNG, and this README in Git so design references can be
reviewed alongside implementation changes. This export is approximately 1.1 MB;
Git LFS is unnecessary at this size. Keep future exports limited to the screens
used as design references rather than accumulating every generated variant.
