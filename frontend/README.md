# Second Brain frontend

The frontend uses React, TypeScript, Vite, and Tailwind CSS. Storybook displays
the UI primitives and their states.

## Development

Install workspace dependencies and start the frontend from the repository root:

```sh
bun install
bun run dev:frontend
```

Run these commands from `frontend`:

| Command | Purpose |
| --- | --- |
| `bun run build` | Check TypeScript and build the application. |
| `bun run lint` | Run ESLint. |
| `bun run preview` | Serve the application build locally. |
| `bun run storybook` | Start Storybook on port 6006. |
| `bun run storybook:build` | Build Storybook. |

## Design tokens

Read the [Stitch references](../docs/design/stitch/README.md) for design
rules, reference conflicts, and application design decisions.

| File | Responsibility |
| --- | --- |
| [tokens.foundation.css](src/styles/tokens.foundation.css) | Stitch light and dark palettes, typography, spacing, radius, and shadow values. |
| [tokens.semantic.css](src/styles/tokens.semantic.css) | Component color roles, Tailwind color utilities, and compatibility aliases. |
| [tailwind.css](src/styles/tailwind.css) | Shared CSS entry, Google Fonts import, token imports, and the class-based `dark:` variant. |
| [customTailwindMerge.ts](src/utils/customTailwindMerge.ts) | Merge rules for named text sizes, shadows, and font weights. |

Load the specified typefaces through Google Fonts in `tailwind.css`. The local
fallback stacks in `tokens.foundation.css` cover font loading and service
unavailability.

Toggle `.dark` on the document or a preview container to switch themes.
Both semantic variables and Tailwind `dark:` utilities follow this class.
Define role aliases at each theme boundary so scoped previews resolve local
colors. The `--ds-palette-*` variables hold the active palette. Semantic
variables such as `--primary` and `--secondary` map that palette to component
roles. Tailwind exposes these roles through utilities such as `bg-primary`
and `text-secondary-foreground`.

Read the [dark theme mapping](../docs/design/stitch/README.md#dark-theme-mapping)
for palette conflicts and application choices. All Stitch color utilities follow
the active palette, including inverse and fixed colors.

Use the dedicated `input-background`, `secondary-hover`, `popover-border`,
`code-bg`, `code-foreground`, and `code-border` utilities for these component
treatments. Selection colors are available as `selection:bg-selection` and
`selection:text-selection-foreground`. Use `bg-modal`, `bg-scrim`, and
`backdrop-blur-overlay` for dialog surfaces and backdrops. Use
`border-modal-border` for general dialogs and `border-search-dialog-border`
for the search and quick-switcher dialog container. Input focus styles apply
to the input separately.

The `shadow-elev-1` and `shadow-elev-2` utilities set shadows independently of
surface and border colors. Use `bg-card border-border` for default dark cards
and `bg-popover border-popover-border` for generic dark popovers. Select hover
and focus utilities from the component's specification.

Use `text-muted-foreground` for supporting text and placeholders. Use
`bg-muted` for subtle surfaces. Add chart roles when charts need a palette.

### Typography utilities

All eleven DESIGN.md typography styles have named text-size and font-family
utilities. Pair `font-label-caps` with `text-label-caps` for monospace labels.
The text-size utility sets size, line height, weight, and any specified letter
spacing. The font-family utility selects the typeface.

Use `font-code-inline text-code-inline` and `font-code-block text-code-block`
for code. Use `font-body-sm text-body-sm` for small body text. See the
[typography and spacing decisions](../docs/design/stitch/README.md#shared-typography-and-spacing)
for source values and theme policy.

The following aliases are also available:

| Utility | Stitch style | Aliased properties |
| --- | --- | --- |
| `text-sm` | `body-md` | Size and line height. |
| `text-base` | `body-lg` | Size and line height. |
| `text-lg` | `headline-sm` | Size and line height. |
| `text-heading-sm` | `headline-sm` | Size, line height, and weight. |
| `text-heading-md` | `headline-md` | Size, line height, weight, and letter spacing. |
| `text-heading-lg` | `display-lg` | Size, line height, weight, and letter spacing. |

Keep `text-sm`, `text-base`, and `text-lg`. These are standard Tailwind size
utilities used by shadcn components. The `text-heading-*` aliases support the
Heading primitive. Review their removal separately if consumers move to the
named Stitch styles.

Use the configured `twMerge` from `src/utils/customTailwindMerge.ts` when
merging component classes. Register new named text sizes there. This lets
size overrides replace earlier sizes without removing text colors.

### Spacing utilities

Use named spacing utilities such as `gap-gutter-lg`, `px-margin-tablet`,
and `p-space-xs` through `p-space-2xl`.

### Disabled styles

The `disabled-bg`, `disabled-fg`, and `disabled-border` color utilities
implement the [disabled control decisions](../docs/design/stitch/README.md#disabled-controls).
They mix their source colors with transparent in sRGB.

Do not also reduce the whole control's opacity. This would attenuate the
individual color opacities a second time.

## shadcn migration

Component generation is configured in `components.json`. It uses Base UI,
the `src/components/ui` directory, and `src/styles/tailwind.css` with
`tailwind.cssVariables` enabled. The `cn()` helper uses the configured
`twMerge` function.

Add components from `frontend` with `bunx --bun shadcn@latest add <name>`.

Reconcile generated styles with the Stitch design rules:

- Preserve the semantic role mappings and the DESIGN.md radius scale.
  Generated radius formulas and component classes can differ from Stitch.
  Choose radius utilities for each component using the
  [Stitch interpretation rules](../docs/design/stitch/README.md#using-the-references).
- Make the generated `cn()` helper use the configured `twMerge` function.
  This preserves the named typography styles when classes are overridden.
- Replace default disabled opacity classes with the disabled color utilities
  and the component styles specified in the Stitch README.
- Follow the [keyboard focus rules](../docs/design/stitch/README.md#keyboard-focus)
  when suppressing browser outlines.

### Button

Import the shadcn Button from `@/components/ui/button`. Its prop names,
variants, size options, and defaults follow shadcn. Its styles use the
[Stitch button decisions](../docs/design/stitch/README.md#button-treatments).

```tsx
import { Button } from '@/components/ui/button'

<Button>Save memo</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="destructive">Delete memo</Button>
```

Set `type="submit"` for form submission. Provide an accessible name such as
`aria-label` for icon-only buttons. Use the `ui/Button` stories to inspect
variants and disabled states in both themes. Disabled styles use Base UI's
`data-disabled` attribute so they also cover `focusableWhenDisabled`.

### Color aliases scheduled for removal

These color utility names support components during the shadcn migration.
Use the canonical semantic names in new code. For example, use `bg-background`
instead of `bg-bg`, and `text-destructive` instead of `text-danger`.

| Compatibility name | Canonical semantic name |
| --- | --- |
| `bg` | `background` |
| `fg` | `foreground` |
| `on-background` | `foreground` |
| `on-primary` | `primary-foreground` |
| `on-secondary` | `secondary-foreground` |
| `danger` | `destructive` |
| `on-danger` | `destructive-foreground` |

Remove each alias from `tokens.semantic.css` after all application and
Storybook references have been migrated. Check color utilities, ring offsets,
and direct CSS variable references before removal. Installing shadcn alone
does not meet this condition.

Stitch roles such as `surface-container-*` and `primary-container` remain
available for design-specific surfaces. They are separate from the
compatibility aliases and are not scheduled for removal by this migration.
