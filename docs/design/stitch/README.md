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

## Differences to resolve during implementation

- DESIGN.md frontmatter defines `background` as `#f7f9fb`, while its prose uses
  `#F8FAFC`. The HTML theme configurations use `#f7f9fb`, but the search results
  stylesheet also contains `#F8FAFC`.
- DESIGN.md defines radius values of `DEFAULT: 0.25rem`, `lg: 0.5rem`,
  `xl: 0.75rem`, and `full: 9999px`. All four HTML theme configurations instead
  use `DEFAULT: 0.125rem`, `lg: 0.25rem`, `xl: 0.5rem`, and `full: 0.75rem`.

Compare the affected elements with the screenshots before selecting application
values. Record resolved choices here as implementation proceeds, keeping the
original exports unchanged.

## Version control

Track DESIGN.md, HTML, PNG, and this README in Git so design references can be
reviewed alongside implementation changes. This export is approximately 1.1 MB;
Git LFS is unnecessary at this size. Keep future exports limited to the screens
used as design references rather than accumulating every generated variant.
