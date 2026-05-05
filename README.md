# front-end-unicorn

Monorepo with two parallel component libraries — vanilla **HTML/JS** and **Angular 20** — sharing a single SCSS token system. Both libraries are consumed by an **Astro 5** site and a pair of composed **Storybook 8** instances, with **Playwright**-driven visual regression covering every story across every theme.

## Layout

```
packages/
  tokens/              SCSS tokens + per-theme CSS bundles (light / dark / brand), Vite library build
  components-html/     Vanilla components (factory functions + custom-element wrappers), Vite library build
  components-ng/       Angular 20 standalone components, ng-packagr build
apps/
  storybook-html/      Storybook 8 (HTML + Vite) with theme toolbar
  storybook-ng/        Storybook 8 (Angular) with theme toolbar — composed with storybook-html
  site/                Astro 5 + @analogjs/astro-angular, demos every component in both flavors, swappable theme bundle per page
tools/
  visual-regression/   Playwright snapshots driven against both built Storybooks, every (story × theme) baseline
.github/workflows/ci.yml
```

## Themes

Themes are emitted as **independent compiled CSS bundles** (one per theme) by the `@feu/tokens` Vite build:

```
packages/tokens/dist/themes/light.css
packages/tokens/dist/themes/dark.css
packages/tokens/dist/themes/brand.css
```

Switching theme = swapping which bundle is loaded.

- **Astro:** `apps/site/src/layouts/Base.astro` picks a bundle via `<link rel="stylesheet" href="/_themes/<theme>.css" />`. The bundles are copied into `public/_themes/` by `scripts/copy-themes.mjs` (runs as a `prebuild` step). Pass `?theme=dark` (or `light` / `brand`) on any page to swap.
- **Storybook (both):** all three bundles are imported in `preview.ts`; a global `feuTheme` toolbar entry toggles `[data-feu-theme]` on the preview root so only the active theme's `:root` selector matches.
- Add a new theme by creating `packages/tokens/src/scss/themes/<name>.scss` + `packages/tokens/src/themes/<name>.ts`, registering the entry in `packages/tokens/vite.config.ts`, and listing it in the `THEMES` map in `apps/site/src/layouts/Base.astro` and the toolbar in each `preview.ts`.

## Component parity

Every component exists in two implementations with a matching API:

| Component | HTML factory          | Angular component                     |
| --------- | --------------------- | ------------------------------------- |
| Button    | `createButton(props)` | `<feu-button>`                        |
| Input     | `createInput(props)`  | `<feu-input>`                         |
| Card      | `createCard(props)`   | `<feu-card>`                          |
| Modal     | `createModal(props)`  | `<feu-modal>`                         |
| Tabs      | `createTabs(props)`   | `<feu-tabs>` + `<feu-tab-panel>`      |

The HTML package additionally exposes custom-element wrappers (`@feu/components-html/elements`) for declarative use in `.astro` files. The Angular components reuse the same SCSS sources via relative `@import`s, so styling stays identical to the HTML versions.

## Common scripts

```bash
pnpm install                       # install everything
pnpm build:packages                # build tokens + HTML + Angular libraries
pnpm dev:site                      # Astro dev server (also runs prebuild copy-themes)
pnpm dev:storybook-html            # HTML Storybook on :6006
pnpm dev:storybook-ng              # Angular Storybook on :6007 (composed under HTML)
pnpm storybook:build               # both static Storybooks
pnpm vr                            # Playwright visual regression (expects Storybooks running)
pnpm lint                          # eslint + stylelint
pnpm test                          # vitest for HTML components
```

## Tooling baseline

- **Node ≥ 20.19** (see `.nvmrc`, recommends 22 LTS)
- **pnpm 9** workspaces
- **TypeScript 5.8** with project references; strict mode
- **Angular 20**, **Astro 5**, **Storybook 8**, **Vite 5**

## Adding a new component

1. Add SCSS in `packages/components-html/src/components/<name>/<name>.scss` using only CSS custom properties (no `@use`).
2. Add the factory function (`create<Name>`) plus a custom-element wrapper.
3. Mirror the API in `packages/components-ng/src/lib/<name>/<name>.component.ts`; reference the same SCSS via relative `@import`.
4. Add a story file in each of `apps/storybook-{html,ng}/stories/`.
5. Add a demo page in `apps/site/src/pages/<name>.astro`.

Visual-regression baselines and Astro index links pick up new stories automatically.

## Open follow-ups

- Wire `@analogjs/astro-angular` static rendering for components that don't need hydration (currently every Angular component uses `client:load`).
- Add Karma/Jest unit tests for the Angular components (the workspace Vitest covers HTML only).
- Once Storybook ships native Vite support for Angular, collapse the two Storybook instances into one without composition.
