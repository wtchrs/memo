# Stitch design references

This directory contains design guidelines, tokens, screenshots, and HTML exported
from Stitch as implementation references for the Second Brain web client.

## Contents

- [Light DESIGN.md](cognitive_architecture/DESIGN.md): shared design principles
  and light theme tokens.
- [Dark DESIGN.md](cognitive_architecture/dark/DESIGN.md): dark theme tokens,
  component styles, and additional typography and spacing definitions.

Tokens are in the DESIGN.md YAML frontmatter.

| Screen | Light references | Dark references |
| --- | --- | --- |
| Dashboard | [Screenshot](dashboard/screen.png), [HTML](dashboard/code.html) | [Screenshot](dashboard/dark/screen.png), [HTML](dashboard/dark/code.html) |
| Memo editor | [Screenshot](editor/screen.png), [HTML](editor/code.html) | [Screenshot](editor/dark/screen.png), [HTML](editor/dark/code.html) |
| Search results | [Screenshot](search/screen.png), [HTML](search/code.html) | [Screenshot](search/dark/screen.png), [HTML](search/dark/code.html) |
| Tags | [Screenshot](tag/screen.png), [HTML](tag/code.html) | [Screenshot](tag/dark/screen.png), [HTML](tag/dark/code.html) |

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

Use the PNG files to view the exports without the HTML's external dependencies.

## Application design decisions

This section records unresolved source conflicts, design additions, and intentional
overrides. See the [frontend README](../../../frontend/README.md)
for token files, Tailwind utilities, and component migration instructions.

- Use the frontmatter background value, `#f7f9fb`, over the conflicting
  `#F8FAFC` in the light document's prose and search stylesheet.
- Use the frontmatter spacing unit of 4px; treat the prose's 8px rhythm as two units.
- Use the [light dashboard's memo-card hover shadow](dashboard/code.html)
  for light level 2, whose value DESIGN.md does not specify.

### Semantic color roles

Use shadcn-compatible component roles, separate from the source palette.

The light document does not specify secondary-button surfaces. Use
`surface-container` for their fill and the source `secondary` for their text.
Use `surface-container-low` and `on-surface-variant` for muted surfaces and
supporting text. Use `outline-variant` for shared light borders.

Light component roles without a source definition use the surface hierarchy:
code uses the low container, selection uses the primary fixed pair, and
secondary hover uses the high container. Input backgrounds use the canvas.
Popovers and modals use the card surface and shared border.
Modals use a 10% foreground scrim. Use an 8px overlay blur in both themes.

### Disabled controls

Use `on-surface` at 38% opacity for disabled text and icons, and at 12% for
disabled filled-button backgrounds, with a transparent border and no shadow.

To preserve their shape, disabled `outline` and `secondary` buttons retain a
`disabled-border` stroke. This overrides the transparent-border rule for
filled light secondary buttons.

Use `surface-container-low` for disabled input backgrounds and `border` at 30%
opacity for their borders. In dark mode, `outline-variant` at this opacity is
too close to the input background.

Apply opacity to individual colors. Keep disabled roles separate from muted
roles, which describe available controls.

### Keyboard focus

In both themes, show a 1px outer ring with a 1px offset on `focus-visible`
when suppressing the browser outline on buttons and inputs. Use `ring` for
the ring color and `background` for the offset. Invalid inputs keep the error
border and use the error color for their ring. The dark input glow can
supplement this solid ring.

### Button treatments

In both themes:

- Fill `destructive` buttons with the error color pair.
- For enabled `default` and `destructive` buttons, use 90% background opacity on
  hover and 80% while pressed, without movement. This unifies the differing
  [screen treatments](editor/code.html).
- Give `ghost` buttons less emphasis than `outline` with `muted-foreground` text.
- Keep expanded `outline`, `ghost`, and `secondary` triggers highlighted with
  their hover treatments.

### Dark theme mapping

Resolve the dark document's conflicting palettes in favor of explicit `dark-*`
values where available; otherwise use its unprefixed values.
Use `dark-surface` for `background` and `dark-on-surface` for `on-background`.
Map `surface-variant` to the highest dark container and `surface-tint` to dark primary.
Use `surface-container-lowest` for the sidebar and `on-surface` for selection text,
as in the [dark dashboard](dashboard/dark/code.html).

### Shared typography and spacing

Use light typography in both themes, with 0em mobile heading tracking.
Share the dark document's additional typography and spacing definitions across
both themes.
