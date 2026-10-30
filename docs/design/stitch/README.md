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

Within the applicable theme's DESIGN.md, component-specific rules take precedence
over general rules for the same element, property, and state. Use general rules
where no component-specific rule applies.

Translate these references into the existing React/Tailwind frontend and shadcn
components. The HTML files are static prototypes with placeholder content and
do not define the application's feature requirements.

The HTML references load Tailwind, fonts, icons, and some images from external
URLs. The PNG files preserve the exported appearance without those dependencies.

## Application design decisions

This section records unresolved source conflicts, design additions, and intentional
overrides. See the [frontend README](../../../frontend/README.md)
for token files, Tailwind utilities, and component migration instructions.

- Use the DESIGN.md frontmatter background value, `#f7f9fb`. Its prose and the
  search stylesheet also use `#F8FAFC`. The frontmatter is the explicit token
  definition and agrees with the HTML theme configurations.
- Use the frontmatter spacing unit of 4px. The prose describes an 8px rhythm.
  Treat an 8px step as two units. This preserves the named token scale and
  the layout rhythm without introducing a second spacing scale.
- Use the light dashboard memo-card hover shadow for light level 2.
  The light DESIGN.md requires increased depth but does not specify its value.
  The dashboard provides this treatment for memo cards. Its shadow is stronger
  than the tag export's active shadow and gives hovered cards a clearer depth
  change.

### Semantic color roles

Use shadcn-compatible names for component color roles. Keep the source palette
separate from these roles so one component's treatment does not redefine a
shared source color.

The light document does not specify secondary-button surfaces. Use
`surface-container` for their fill and the source `secondary` for their text.
This gives supporting actions a light fill and slate text. Use
`surface-container-low` and `on-surface-variant` for muted surfaces and supporting
text. Use `outline-variant` for shared light borders to keep them softer than
the source `outline`.

Light component roles without a source definition use the surface hierarchy:
code uses the low container, selection uses the primary fixed pair, and
secondary hover uses the high container. Input backgrounds use the canvas.
Popovers and modals use the card surface and shared border to separate floating
content from the canvas. Modals use a 10% foreground scrim. Use an 8px overlay
blur in both themes because the light document does not specify a blur length.

### Disabled controls

DESIGN.md does not define disabled states. Use `on-surface` at 38% opacity
for disabled text and icons. Use it at 12% opacity for disabled filled-button
backgrounds, with a transparent border and no shadow. These choices reduce
emphasis and remove the raised appearance of available actions.

To preserve their shape, disabled `outline` and `secondary` buttons retain a
`disabled-border` stroke. This overrides the transparent-border rule for
filled light secondary buttons.

Use `surface-container-low` for disabled input backgrounds and `border` at 30%
opacity for their borders. The solid background preserves the field shape. The
weaker border distinguishes the field from available inputs. In dark mode,
`outline-variant` at this opacity is too close to the input background.
Available secondary buttons retain their theme text color and border, so they
remain distinct from disabled controls.

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

Keep this solid keyboard focus ring in both themes. It provides a visible
indicator independently of the dark input rule's translucent glow. The glow
can supplement the ring.

### Button treatments

In both themes:

- Fill `destructive` buttons with the error color pair to emphasize destructive actions.
- For enabled `default` and `destructive` buttons, use 90% background opacity on
  hover and 80% while pressed, without movement. This unifies the differing
  [screen treatments](editor/code.html).
- Give `ghost` buttons less emphasis than `outline` with `muted-foreground` text.
- Keep expanded `outline`, `ghost`, and `secondary` triggers highlighted with
  their hover treatments to keep the expanded state visible.

### Dark theme mapping

The [dark DESIGN.md](cognitive_architecture/dark/DESIGN.md) defines conflicting
unprefixed and explicit `dark-*` palettes. Use the explicit `dark-*` values when
available because they agree with the document's semantic mapping and component
rules. Use `dark-surface` for `background` and `dark-on-surface` for
`on-background`. Map `surface-variant` to the highest dark container to preserve
its position in the source surface scale. Use the dark primary for `surface-tint`
so tinted surfaces use the same accent as actions. The dark document's `light-*`
values do not replace the light document's palette.

Use the dark document's unprefixed values for roles without a `dark-*` value:
inverse colors, `on-secondary-container`, tertiary colors, error colors, and
fixed colors. These roles have no explicit dark override in the source.

Use `surface-container-lowest` for the dark sidebar. The dashboard, search,
and tag exports use this recessed navigation surface. Use `on-surface` for
selection text, as in the dashboard export, to keep text readable on the
source selection fill.

### Shared typography and spacing

Use the light document's typography values in both themes. Set `label-caps`
to 12px with 0.05em tracking. Use 0em mobile heading tracking because the light
document does not specify it. These shared values keep text size and layout
stable during theme changes.
They take priority over the dark document's 11px label size, 0.06em label
tracking, and -0.015em mobile heading tracking.

Share the additional typography and spacing definitions from
[dark DESIGN.md](cognitive_architecture/dark/DESIGN.md) across both themes.
This includes `body-sm`, `code-inline`, and `code-block`, which describe content
roles useful in either theme. Shared spacing keeps layout stable during theme
changes.
