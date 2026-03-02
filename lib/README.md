# lib/ - Published Library Source

Everything in this directory is the source for the published component library.

## Structure

```
lib/
├── main.ts
├── tailwind.css
├── test/
│   └── setup.ts
└── ComponentName/
    ├── ComponentName.tsx
    ├── ComponentName.test.tsx
    └── ComponentName.stories.tsx
```

## Component Conventions

- Components are named exports.
- Enums are exported and re-exported from `lib/main.ts`.
- Props interfaces and style maps stay internal to component files.
- Tailwind utility classes only.
- Story types/imports use `@storybook/react-vite`.

## Public Exports

Add every component and enum to `lib/main.ts`:

```ts
import './tailwind.css'
export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'
```

## Build Output

`npm run build` produces:
- `dist/cottage-ui.js` (ESM)
- `dist/cottage-ui.umd.cjs` (UMD)
- `dist/cottage-ui.css`
- `dist/*.d.ts`

## Verification

Run before merge:

```bash
npm run lint
npm run test -- --run
npm run build
```

## References

- [AGENTS.md](../AGENTS.md)
- [CREATE_COMPONENT_PROMPT.md](../CREATE_COMPONENT_PROMPT.md)
- [Button component](./Button/Button.tsx)
