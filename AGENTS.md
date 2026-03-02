# AGENTS.md - Cottage UI Component Library Architecture

This document defines the source-of-truth conventions for creating and maintaining components in Cottage UI.

## Project Overview

Cottage UI is a React component library with:
- TypeScript strict mode
- React 19+
- TailwindCSS utility styling
- Vite library builds (ESM + UMD)
- Vitest + React Testing Library
- Storybook with `@storybook/react-vite`
- npm as package manager

## Repository Structure

```
cottage-ui/
├── lib/                          # Published source
│   ├── main.ts                   # Public exports
│   ├── tailwind.css              # Tailwind imports
│   ├── test/
│   │   └── setup.ts              # Test setup
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── Button.stories.tsx
│   └── ...
├── src/                          # Local demo app (not published)
├── .storybook/                   # Storybook config
├── dist/                         # Build output
├── AGENTS.md
├── CLAUDE.md
├── CREATE_COMPONENT_PROMPT.md
└── package.json
```

## Component File Contract

Each component lives in `lib/ComponentName/` and should include:
- `ComponentName.tsx`
- `ComponentName.test.tsx`
- `ComponentName.stories.tsx`

## Component Implementation Rules (`ComponentName.tsx`)

Order:
1. React imports (`import type` where possible; regular imports when hooks/runtime APIs are used)
2. Exported enums (UPPER_SNAKE_CASE)
3. Internal styling records (`Record<ENUM, string>`)
4. Internal props interface
5. Named component export

Rules:
- Components are named exports only (no default component exports).
- Enum values are lowercase strings.
- Every enum value must exist in the corresponding style record.
- Enum props should default to `DEFAULT` enum members where applicable.
- Return type is `ReactNode`.
- Use Tailwind classes only.

Example:

```tsx
import type { MouseEvent, ReactNode } from "react";

export enum BADGE_VARIANTS {
	DEFAULT = 'default',
	PRIMARY = 'primary'
}

const BadgeVariantStyling: Record<BADGE_VARIANTS, string> = {
	[BADGE_VARIANTS.DEFAULT]: 'bg-gray-100 text-gray-800',
	[BADGE_VARIANTS.PRIMARY]: 'bg-orange-100 text-orange-800'
}

interface BadgeProps {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: BADGE_VARIANTS;
}

export const Badge = ({ children, variant = BADGE_VARIANTS.DEFAULT }: BadgeProps): ReactNode => {
	const className = `inline-block rounded-full px-3 py-1 ${BadgeVariantStyling[variant]}`
	return <span className={className}>{children}</span>;
};
```

## Testing Rules (`ComponentName.test.tsx`)

- Use `render`/`screen` from `@testing-library/react`.
- `describe("Component: ComponentName", ...)` format.
- Cover default render + each enum variant/size + event handlers.
- Prefer semantic queries (`getByRole`).
- Use inline snapshots for rendered markup checks.
- Use `vi.fn()` and `toHaveBeenCalledOnce()` for callbacks.

## Storybook Rules (`ComponentName.stories.tsx`)

- Import types from `@storybook/react-vite`.
- `meta` must include `component`.
- Include argTypes for public props.
- Enum props: `control: 'select'`, `options: Object.values(ENUM)`.
- Include `Default` story plus meaningful additional examples.
- Default export is `meta` (`export default meta`).

Example import:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
```

## Public API Registration

Every new component and exported enums must be re-exported from `lib/main.ts`:

```ts
import './tailwind.css'
export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'
```

## Accessibility Baseline

Every component should meet these defaults:
- Use semantic elements first (`button`, `input`, `label`, `select`, `textarea`, `hr`).
- Ensure interactive controls have accessible names.
- Keep keyboard support for interactive widgets (e.g. Tabs, Modal escape handling).
- For variant-based error states on form controls, expose `aria-invalid`.
- For dialogs, provide an accessible name via `aria-labelledby` or `aria-label`.

## Validation Checklist

Before merging component changes:
- `npm run lint`
- `npm run test -- --run`
- `npm run build`
- Verify story renders in Storybook

## Canonical References

- `lib/Button/` for a simple variant+size component
- `lib/Tabs/` for keyboard interaction pattern
- `lib/Modal/` for portal + focus/escape behavior

---
Last updated: March 2, 2026
