# CLAUDE.md

Guidance for AI coding agents working in this repository.

## Essentials

- Package manager is npm. Use npm commands.
- Library source is in `lib/`; `src/` is only the local demo app.
- Components use named exports, and enums are exported alongside components.
- Storybook types/imports come from `@storybook/react-vite`.

## Common Commands

```bash
npm install
npm run dev
npm run storybook
npm run lint
npm run test -- --run
npm run build
```

## Theming (semantic color tokens)

Colors are addressed by **semantic role**, never raw hue. Never write a Tailwind
palette class (`bg-orange-700`, `text-gray-500`, `border-blue-500`) in a component —
use a role token so the component recolors with the active theme.

- Tokens live in `lib/tailwind.css`: `@theme inline` maps Tailwind color utilities
  to `--cu-*` base variables; each theme block swaps the `--cu-*` values.
- Themes: `cottage` (default, AJ signature), `graphite`, `evergreen`, `bloom`.
  Modes: light (default) and `data-mode="dark"`. Switch by setting
  `data-theme` / `data-mode` on any ancestor (e.g. `<html>`).
- Role utilities:
  - Structure: `bg-background`, `bg-surface`, `bg-surface-raised`, `border-border`,
    `border-border-strong` (form controls), `text-foreground`, `text-muted-foreground`,
    `text-subtle-foreground`.
  - Brand: `bg-primary` / `bg-primary-hover` / `text-primary-foreground`,
    `accent-primary` (form accents), `bg-accent`.
  - Secondary action: `bg-neutral` / `bg-neutral-hover` / `text-neutral-foreground`.
  - Status: `success` / `warning` / `error` / `info`, each with a `-soft` background
    and a `-strong` text variant for badges/alerts (e.g. `bg-error-soft text-error-strong`).
- `-soft` / `-strong` are derived with `color-mix(in oklab, …)`; all `-strong`-on-`-soft`
  pairs are WCAG AA (≥4.5:1) verified in both modes. Keep that property when adding roles.
- Palettes come from the `color-system` skill (Terracotta + Lunar Valley signature for
  Cottage; Graphite/Evergreen/Bloom UI sets). Re-verify contrast if you change a hex.

## Component Structure

Create in `lib/ComponentName/`:
- `ComponentName.tsx`
- `ComponentName.test.tsx`
- `ComponentName.stories.tsx`

### `ComponentName.tsx`

- Use `import type` for type-only React imports.
- Use normal React imports when hooks/runtime APIs are needed.
- Export enums in UPPER_SNAKE_CASE with lowercase values.
- Define internal `Record<ENUM, string>` styling maps.
- Keep props interface internal.
- Export component as a named export.
- Return type should be `ReactNode`.

### `ComponentName.test.tsx`

- `describe("Component: ComponentName", ...)`
- Cover default render, enum variants/sizes, and handlers.
- Prefer `screen.getByRole`.
- Use inline snapshots for markup.

### `ComponentName.stories.tsx`

- `import type { Meta, StoryObj } from '@storybook/react-vite'`
- Include `argTypes` for exposed props.
- Enum controls should use `Object.values(ENUM)`.
- Provide at least `Default` + one meaningful variant story.

## Export Contract

Update `lib/main.ts` for each component:

```ts
import './tailwind.css'
export { ComponentName, COMPONENT_VARIANTS } from './ComponentName/ComponentName'
```

## Accessibility Expectations

- Controls must have accessible names.
- Preserve keyboard accessibility for custom widgets (Tabs, Modal).
- Error visual states on fields should also use `aria-invalid`.
- Dialogs require an accessible name (`aria-labelledby` or `aria-label`).

## Verification Gate

Always run before finalizing:

```bash
npm run lint
npm run test -- --run
npm run build
```
