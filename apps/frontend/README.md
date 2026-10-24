# Second Brain frontend

The frontend uses React, TypeScript, Vite, and Tailwind CSS. Storybook displays
the UI primitives and their states.

## Development

Install workspace dependencies and start the frontend from the repository root:

```sh
bun install
bun run dev:frontend
```

Run these commands from `apps/frontend`:

| Command | Purpose |
| --- | --- |
| `bun run build` | Check TypeScript and build the application. |
| `bun run lint` | Run ESLint. |
| `bun run preview` | Serve the application build locally. |
| `bun run storybook` | Start Storybook on port 6006. |
| `bun run storybook:build` | Build Storybook. |

## Design tokens

Read the [Stitch references](../../docs/design/stitch/README.md) for design
rules, reference conflicts, and application design decisions.

| File | Responsibility |
| --- | --- |
| [tokens.foundation.css](src/styles/tokens.foundation.css) | Stitch light palette, typography, spacing, radius, and shadow values. |
| [tokens.semantic.css](src/styles/tokens.semantic.css) | Component color roles, Tailwind color utilities, and compatibility aliases. |
| [tailwind.css](src/styles/tailwind.css) | Shared CSS entry, Google Fonts import, token imports, and the class-based `dark:` variant. |
| [customTailwindMerge.ts](src/utils/customTailwindMerge.ts) | Merge rules for named text sizes, shadows, and font weights. |

The `--ds-palette-*` variables hold the source Stitch light palette. Semantic
variables such as `--primary` and `--secondary` map that palette to component
roles. Tailwind exposes these roles through utilities such as `bg-primary`
and `text-secondary-foreground`.

Use `text-muted-foreground` for supporting text and placeholders. Use
`bg-muted` for subtle surfaces. Add chart roles when charts need a palette.

### Typography utilities

All eight DESIGN.md typography styles have named text-size and font-family
utilities. Pair `font-label-caps` with `text-label-caps` for monospace labels.
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

Keep `text-sm`, `text-base`, and `text-lg`. These are standard Tailwind size
utilities used by shadcn components. The `text-heading-*` aliases support the
Heading primitive. Review their removal separately if consumers move to the
named Stitch styles.

Use the configured `twMerge` from `src/utils/customTailwindMerge.ts` when
merging component classes. Register new named text sizes there. This lets
size overrides replace earlier sizes without removing text colors.

### Disabled styles

The `disabled-bg`, `disabled-fg`, and `disabled-border` color utilities
implement the [disabled control decisions](../../docs/design/stitch/README.md#disabled-controls).
They mix their source colors with transparent in sRGB. The `foreground` role
provides disabled content and filled-button colors. The `border` role provides
the disabled input border color.

Define these variables at each theme boundary so they resolve local colors.
Do not also reduce the whole control's opacity. This would attenuate the
individual color opacities a second time.

## shadcn migration

The color roles are prepared for shadcn. Component generation is not yet
configured. When initializing shadcn, use `src/styles/tailwind.css` as its
CSS entry and enable `tailwind.cssVariables`.

Reconcile generated styles with the Stitch design rules:

- Preserve the semantic role mappings and the DESIGN.md radius scale.
  Generated radius formulas and component classes can differ from Stitch.
  Use `rounded` for buttons and inputs, `rounded-lg` for cards, and
  `rounded-full` for tags.
- Make the generated `cn()` helper use the configured `twMerge` function.
  This preserves the named typography styles when classes are overridden.
- Replace default disabled opacity classes with the disabled color utilities
  and the component styles specified in the Stitch README.
- Use the documented 1px focus ring and 1px offset when suppressing browser
  outlines.

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
