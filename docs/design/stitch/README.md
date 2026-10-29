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
- Use the light dashboard memo-card hover shadow for light level 2.
  The light DESIGN.md requires increased depth but does not specify its value.
  The dashboard provides this treatment for memo cards. Its shadow is stronger
  than the tag export's active shadow and gives hovered cards a clearer depth
  change.

### Semantic color roles

The role names follow [shadcn theming](https://ui.shadcn.com/docs/theming).
The mappings below preserve Stitch's light theme and visual hierarchy. Dark
overrides are listed under [Dark theme mapping](#dark-theme-mapping).

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

Use `surface-container-low` for disabled input backgrounds and `border` at 30%
opacity for their borders. The solid background preserves the field shape. The
weaker border distinguishes the field from available inputs. In dark mode,
`outline-variant` at this opacity is too close to the input background.
Available secondary buttons retain their full theme text color, border, and
shadow, so they remain distinct from disabled controls.

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

### Dark theme mapping

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

Use the explicit `dark-*` values when available. They agree with the document's
semantic mapping and component rules. Use `dark-surface` for `background` and
`dark-on-surface` for `on-background`. Map `surface-variant` to the highest dark
container. Use the dark primary for `surface-tint` so tinted surfaces use the
same accent as actions. The dark document's `light-*` values do not replace
the light document's palette.

Use the dark document's unprefixed values for roles without a `dark-*` value:
inverse colors, `on-secondary-container`, tertiary colors, error colors, and
fixed colors. These are explicit source values. This also makes all container,
inverse, fixed, and tertiary utilities respond to the active theme.

| Dark role | Value or source | Reason |
| --- | --- | --- |
| `background` / `foreground` | `#0f172a` / `#f8fafc` | Explicit dark canvas and text. |
| `card` | `#1e293b` | The document specifies this surface for level 1 cards, although screen exports use lower surfaces. |
| `popover` / `popover-border` | [`dark-surface-container-high` / `dark-surface-container-highest`](cognitive_architecture/dark/DESIGN.md) | Level 2 floating surfaces and borders. |
| `primary` / `primary-foreground` | `#818cf8` / `#0f172a` | The action-button rule takes priority over the editor and search HTML. |
| `secondary` / `secondary-foreground` | [Secondary action-button rule](cognitive_architecture/dark/DESIGN.md#components) | The document specifies outlined secondary buttons. |
| `secondary-hover` | [`dark-secondary-container`](cognitive_architecture/dark/DESIGN.md) | Hover fill for secondary actions. |
| `accent` / `accent-foreground` | [`dark-primary-container` / `dark-primary`](cognitive_architecture/dark/DESIGN.md) | Active navigation and chip fills follow the explicit component rules. |
| `border`, `input` | `#334155` | Card and input boundaries use the dark outline. |
| `outline-variant`, `code-border` | `#1e293b` | Keep the softer palette boundary separate from component borders. |
| `input-background` | [`dark-surface-dim`](cognitive_architecture/dark/DESIGN.md) | Inset background for available inputs. |
| `sidebar` | `#070d19` | The lowest surface follows the dashboard, search, and tag navigation exports. |
| `code-bg` / `code-foreground` | [`dark-code-bg` / `dark-primary`](cognitive_architecture/dark/DESIGN.md) | Recessed code surfaces and inline syntax. |
| `selection` / `selection-foreground` | `#312e81` / `#f8fafc` | The explicit selection fill with readable text, as in the dashboard export. |
| `modal` / `modal-border` | `#1e293b` / 20% primary | Level 3 dialog core and edge. |
| `scrim` | [Elevation 3 scrim](cognitive_architecture/dark/DESIGN.md#elevation--depth) | Level 3 backdrop with an 8px blur. |

Use the dark document's level 1 and level 2 shadows for `shadow-elev-1` and
`shadow-elev-2`. Screen-specific shadows differ. The document defines the
shared elevation scale and takes priority. Keep `ring` at the solid primary
color for keyboard focus. The input rule's 25% glow can supplement this ring.
It does not replace the visible focus indicator documented above.

Keep the existing light values. New roles without a light reference use the
existing hierarchy: code uses the low container, selection uses the primary
fixed pair, and secondary hover uses the high container. Input backgrounds
use the canvas. Popover and modal borders use the shared border. Modals use
the card surface with a 10% foreground scrim. Use an 8px overlay blur in both
themes because the light document does not specify a blur length.

### Shared typography and spacing

Use the light document's typography values in both themes. Set `label-caps`
to 12px with 0.05em tracking. Keep mobile headings at 28px with 0em tracking.
The light document does not specify mobile heading tracking; use 0em.
These shared values keep text size and layout stable during theme changes.
They take priority over the dark document's 11px label size, 0.06em label
tracking, and -0.015em mobile heading tracking.

Add `body-sm`, `code-inline`, and `code-block` to both themes. These styles
describe content roles that are useful in either theme. Their size, line
height, and weight follow the dark document. Load JetBrains Mono at weight
400 for code and weight 500 for labels.

Share the additional spacing tokens across themes. Use 24px for `gutter-lg`
and `margin-tablet`. Keep `margin` and `margin-mobile` at 16px. The named
`space-xs` through `space-2xl` values follow the spacing definitions in
[dark DESIGN.md](cognitive_architecture/dark/DESIGN.md).
Keep the existing 260px sidebar and 800px editor width from the shared rules.
