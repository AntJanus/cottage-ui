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
