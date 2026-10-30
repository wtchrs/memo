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

Toggle `.dark` on the document or a preview container to switch themes.
Both semantic variables and Tailwind `dark:` utilities follow this class.
Define role aliases at each theme boundary so scoped previews resolve local
colors. The `--ds-palette-*` variables hold the active palette; semantic roles
map it to component colors. Use their Tailwind utilities, such as `bg-primary`.

The `shadow-elev-1` and `shadow-elev-2` utilities set shadows independently of
surface and border colors. Use `border-modal-border` for general dialogs and
`border-search-dialog-border` for search and quick-switcher containers.

### Typography utilities

Use `font-<style>` with `text-<style>` for DESIGN.md typography styles.
For example, pair `font-label-caps` with `text-label-caps` for monospace labels.
The text-size utility sets size, line height, weight, and any specified letter
spacing. The font-family utility selects the typeface.

The following aliases are also available:

| Utility | Stitch style | Aliased properties |
| --- | --- | --- |
| `text-sm` | `body-md` | Size and line height. |
| `text-base` | `body-lg` | Size and line height. |
| `text-lg` | `headline-sm` | Size and line height. |
| `text-heading-sm` | `headline-sm` | Size, line height, and weight. |
| `text-heading-md` | `headline-md` | Size, line height, weight, and letter spacing. |
| `text-heading-lg` | `display-lg` | Size, line height, weight, and letter spacing. |

Keep the standard size aliases for shadcn and `text-heading-*` while the
Heading primitive uses them.

Use the configured `twMerge` from `src/utils/customTailwindMerge.ts` when
merging component classes. Register new named text sizes there. This lets
size overrides replace earlier sizes without removing text colors.
When regenerating `cn()`, preserve its import of this configured function.

### Disabled styles

The `disabled-bg`, `disabled-fg`, and `disabled-border` color utilities
implement the [disabled control decisions](../docs/design/stitch/README.md#disabled-controls).
Do not also reduce whole-control opacity; this would apply opacity twice.

## shadcn migration

Add components from `frontend` with `bunx --bun shadcn@latest add <name>`.
[components.json](components.json) defines the generator settings.

Reconcile generated styles with the Stitch design rules:

- Replace generated radius classes using the
  [Stitch interpretation rules](../docs/design/stitch/README.md#using-the-references).
- Preserve semantic role mappings and apply the [disabled styles](#disabled-styles).
- Follow the [keyboard focus rules](../docs/design/stitch/README.md#keyboard-focus)
  when suppressing browser outlines.

### Button

Import `Button` from `@/components/ui/button`. Its API follows shadcn and its
styles follow the
[Stitch button decisions](../docs/design/stitch/README.md#button-treatments).

Set `type="submit"` for form submission. Provide an accessible name such as
`aria-label` for icon-only buttons. See the [Button stories](src/components/ui/button.stories.ts)
for variants and states in both themes. Style disabled Base UI buttons with
`data-disabled` to also cover `focusableWhenDisabled`.

### Color aliases scheduled for removal

Use canonical semantic names in new code. These aliases support existing primitives:

| Compatibility name | Canonical semantic name |
| --- | --- |
| `bg` | `background` |
| `fg` | `foreground` |
| `on-background` | `foreground` |
| `on-primary` | `primary-foreground` |
| `on-secondary` | `secondary-foreground` |
| `danger` | `destructive` |
| `on-danger` | `destructive-foreground` |

Remove an alias only after all application and Storybook references are migrated,
including ring offsets and direct CSS variable references. Keep Stitch source
roles such as `surface-container-*` and `primary-container`.
