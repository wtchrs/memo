# Stitch design references

This directory contains design guidelines, tokens, screenshots, and HTML exported
from Stitch as implementation references for the Second Brain web client.

## Contents

- [Light DESIGN.md](cognitive_architecture/DESIGN.md): shared design principles
  and light theme tokens.
- [Dark DESIGN.md](cognitive_architecture/dark/DESIGN.md): dark theme tokens,
  component styles, and additional typography and spacing definitions.

Both documents contain tokens in YAML frontmatter. There is no separate token
file in these exports.

| Screen | Light references | Dark references |
| --- | --- | --- |
| Dashboard | [Screenshot](dashboard/screen.png), [HTML](dashboard/code.html) | [Screenshot](dashboard/dark/screen.png), [HTML](dashboard/dark/code.html) |
| Memo editor | [Screenshot](editor/screen.png), [HTML](editor/code.html) | [Screenshot](editor/dark/screen.png), [HTML](editor/dark/code.html) |
| Search results | [Screenshot](search/screen.png), [HTML](search/code.html) | [Screenshot](search/dark/screen.png), [HTML](search/dark/code.html) |
| Tags | [Screenshot](tag/screen.png), [HTML](tag/code.html) | [Screenshot](tag/dark/screen.png), [HTML](tag/dark/code.html) |

All eight screenshots are 1600 × 1280 pixels.

## Using the references

Read the light DESIGN.md for shared rules and light theme values. Read the dark
DESIGN.md for dark theme colors and styles. Each design document takes priority
over its screen references. Compare screenshots for layout and visual hierarchy.
Consult the HTML for concrete styles and structure.

Translate these references into the existing React/Tailwind frontend and shadcn
components. The HTML files are static prototypes with placeholder content and
do not define the application's feature requirements.

The HTML references load Tailwind, fonts, icons, and some images from external
URLs. The PNG files preserve the exported appearance without those dependencies.

## Application design decisions

This section records reference conflicts and design choices that DESIGN.md
does not specify. See the [frontend README](../../../apps/frontend/README.md)
for token files, Tailwind utilities, and component migration instructions.

- Use the DESIGN.md frontmatter background value, `#f7f9fb`. Its prose and the
  search stylesheet also use `#F8FAFC`. The frontmatter is the explicit token
  definition and agrees with the HTML theme configurations.
- Use the DESIGN.md radius scale. Its `DEFAULT`, `lg`, `xl`, and `full`
  values are 4px, 8px, 12px, and 9999px. The HTML configurations define
  these values as 2px, 4px, 8px, and 12px. The screenshots also show
  rectangular tags and varying button shapes. Follow the DESIGN.md shape
  rules because they define the intended roles: 4px buttons and inputs,
  8px cards, and pill-shaped tags.
- Use the frontmatter spacing unit of 4px. The prose describes an 8px rhythm.
  Treat an 8px step as two units. This preserves the named token scale and
  the layout rhythm without introducing a second spacing scale.
- Load Inter and JetBrains Mono from Google Fonts, as the dashboard export
  does. This supplies the specified typefaces without bundled font files.
  Use local fallback fonts while fonts load or if the service is unavailable.
- Use the dashboard memo-card hover shadow for level 2. DESIGN.md requires
  increased depth but does not specify its numeric value. The dashboard
  provides this treatment for memo cards. Its shadow is stronger than the
  tag export's active shadow and gives hovered cards a clearer depth change.

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
| `ring` | `primary` | Keyboard focus. |
| `sidebar` roles | Corresponding card, foreground, primary, accent, border, and ring roles | Navigation follows the same hierarchy. |

Stitch's `secondary` is a slate color, while shadcn's `secondary` names a
supporting surface. Map the surface and its foreground separately so secondary
buttons retain a light fill and slate text. The source palette remains separate
from these component roles.

### Disabled controls

DESIGN.md does not define disabled states. Use `on-surface` at 38% opacity
for disabled text and icons. Use it at 12% opacity for disabled filled-button
backgrounds, with a transparent border and no shadow. These choices reduce
emphasis and remove the raised appearance of available actions.

Use `surface-container-low` for disabled input backgrounds and
`outline-variant` at 30% opacity for their borders. The solid background
preserves the field shape. The weaker border distinguishes the field from
available inputs. Secondary buttons retain their full slate text color,
border, and shadow, so they remain distinct from disabled controls.

Apply opacity to individual colors. This keeps the background, content, and
border independently controlled as their colors blend with the surface below.

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

### Dark theme references

The [dark DESIGN.md](cognitive_architecture/dark/DESIGN.md) supplies the dark
palette and component treatments. It contains two color sets that differ:

| Role | Unprefixed token | Explicit dark token |
| --- | --- | --- |
| Canvas | `surface: #0b1326` | `dark-surface: #0f172a` |
| Main text | `on-surface: #dae2fd` | `dark-on-surface: #f8fafc` |
| Primary | `primary: #bdc2ff` | `dark-primary: #818cf8` |

The document's prose uses the explicit `dark-*` set. The editor and search
HTML use the unprefixed primary value. The dashboard and tag HTML override it
with `#818cf8`. The HTML also retains the smaller radius scale described above.

The dark document defines `label-caps` at 11px with 0.06em letter spacing.
The light document defines it at 12px with 0.05em letter spacing. Check these
differences when mapping the dark references to application tokens. Record
the selected values and their reasons here.

### Current dark preview

The frontend still uses a fallback dark palette. It has not been mapped to the
Stitch dark references. The preview uses a slate canvas, light text, pale indigo
primary, and pale red error colors. Surface levels mix the canvas with 3%, 6%,
10%, 14%, and 18% foreground, from `surface-container-lowest` through
`surface-container-highest`. The canvas supplies `surface` and `surface-dim`.
The highest container supplies `surface-bright`. Secondary actions use a 20%
foreground mix. Accent backgrounds use a 10% primary mix.

Toggle `.dark` on the document or a preview container. Both semantic variables
and Tailwind `dark:` utilities follow this class. Define role aliases at each
theme boundary so scoped previews resolve local colors. Surface utilities,
their text colors, and outline utilities follow the active theme. The remaining
utilities for primary, secondary, and error containers, inverse colors, fixed
colors, and tertiary colors expose light palette values. Use the semantic roles
for components that must change theme.
