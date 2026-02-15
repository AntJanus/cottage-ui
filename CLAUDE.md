# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cottage UI is a React component library built with TypeScript, TailwindCSS, and Vite. It is distributed as an npm package with ESM and UMD builds. This project is part of the "Build A React UI Library" YouTube series.

## Package Manager

This project uses pnpm. DO NOT use npm or yarn.

```bash
pnpm install
pnpm run dev
pnpm run build
pnpm test
```

## Architecture

### Library Structure

The library source code lives in `lib/`, NOT in `src/`. The `src/` directory is for development/demo purposes only.

- `lib/` - Library source code (what gets published)
  - `lib/main.ts` - Main entry point that exports all components and their enums
  - `lib/tailwind.css` - TailwindCSS imports
  - `lib/ComponentName/` - Each component gets its own directory with these required files:
    - `ComponentName.tsx` - Component implementation
    - `ComponentName.test.tsx` - Vitest tests
    - `ComponentName.stories.tsx` - Storybook stories
  - `lib/test/setup.ts` - Test configuration (imports `@testing-library/jest-dom`)
- `src/` - Development app (NOT published)
  - Used for local development and testing

### Build Configuration

The build process uses Vite with library mode:

- Entry point: `lib/main.ts`
- Outputs: ESM (`dist/cottage-ui.js`) and UMD (`dist/cottage-ui.umd.cjs`)
- React, react-dom, and react/jsx-runtime are externalized (peerDependencies)
- TypeScript declarations are generated and bundled using vite-plugin-dts

## Component Template (Button Reference)

The Button component (`lib/Button/`) is the canonical template for ALL new components. Every new component MUST follow this exact structure. Below is the complete reference for each required file.

### 1. Component Implementation (`ComponentName.tsx`)

Structure order:
1. Imports (type-only imports from React)
2. Enum(s) for variants, sizes, or other categorical props (UPPER_SNAKE_CASE, exported)
3. Styling Record(s) mapping each enum value to Tailwind class strings
4. Props interface
5. Named export of the component function

```typescript
// lib/ComponentName/ComponentName.tsx
import type { MouseEvent, ReactNode } from "react";

// Enums: COMPONENT_VARIANTS, COMPONENT_SIZES, etc.
// Always exported. Values are lowercase strings.
export enum COMPONENT_VARIANTS {
	PRIMARY = 'primary',
	DEFAULT = 'default'
}

export enum COMPONENT_SIZES {
	LARGE = 'large',
	DEFAULT = 'default'
}

// Styling Records: map every enum value to Tailwind classes
const ComponentVariantStyling: Record<COMPONENT_VARIANTS, string> = {
	[COMPONENT_VARIANTS.PRIMARY]: 'bg-orange-700 hover:bg-orange-500 text-white',
	[COMPONENT_VARIANTS.DEFAULT]: 'bg-gray-700 hover:bg-gray-800 text-white'
}

const ComponentSizeStyling: Record<COMPONENT_SIZES, string> = {
	[COMPONENT_SIZES.DEFAULT]: '',
	[COMPONENT_SIZES.LARGE]: 'text-lg'
}

// Props interface (not exported — internal to the file)
interface ComponentProps {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: COMPONENT_VARIANTS;
	size?: COMPONENT_SIZES;
}

// Named export (NOT default export)
export const ComponentName = ({ children, onClick, variant = COMPONENT_VARIANTS.DEFAULT, size = COMPONENT_SIZES.DEFAULT }: ComponentProps): ReactNode => {
	const className = `rounded p-2 ${ComponentVariantStyling[variant]} ${ComponentSizeStyling[size]}`

	return <button onClick={onClick} className={className}>{children}</button>;
};
```

Key rules:
- Use `import type` for React type imports
- Enums use `COMPONENT_VARIANTS` naming convention (UPPER_SNAKE_CASE with component prefix)
- Enum values are lowercase strings
- Every enum value MUST have a corresponding entry in its styling Record
- Props interface is NOT exported
- Component is a named export (e.g., `export const Button = ...`)
- Default values for enum props should be the `DEFAULT` enum member
- className is built via template literal concatenation of styling Records
- Use tabs for indentation

### 2. Tests (`ComponentName.test.tsx`)

```typescript
// lib/ComponentName/ComponentName.test.tsx
import { render, screen } from "@testing-library/react";
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from "./ComponentName";

describe("Component: ComponentName", () => {
  // Test 1: Default render with inline snapshot
  it("should render default", () => {
    render(<ComponentName>Content</ComponentName>);
    const element = screen.getByRole('button') // use appropriate role
    expect(element).toMatchInlineSnapshot(`...`);
  });

  // Test 2+: One test per variant
  it("should render primary variant", () => {
    render(<ComponentName variant={COMPONENT_VARIANTS.PRIMARY}>Content</ComponentName>);
    const element = screen.getByRole('button')
    expect(element).toMatchInlineSnapshot(`...`);
  });

  // Test: One test per size
  it("should render large size", () => {
    render(<ComponentName size={COMPONENT_SIZES.LARGE}>Content</ComponentName>);
    const element = screen.getByRole('button')
    expect(element).toMatchInlineSnapshot(`...`);
  });

  // Test: Event handlers
  it("should click", () => {
    const mock = vi.fn()
    render(<ComponentName onClick={mock}>Content</ComponentName>);
    const element = screen.getByRole('button')
    element.click()
    expect(mock).toHaveBeenCalledOnce()
  });
});
```

Key rules:
- Import `render` and `screen` from `@testing-library/react`
- Import the component AND all its enums from the relative path
- Describe block: `"Component: ComponentName"`
- Use `screen.getByRole()` to query elements (prefer semantic roles)
- Use `toMatchInlineSnapshot()` for rendering assertions (let Vitest fill in the snapshot on first run)
- Test globals are enabled — no need to import `describe`, `it`, `expect`, `vi`
- Test every variant, every size, and all event handlers
- Use `vi.fn()` for event handler mocks
- Use `.toHaveBeenCalledOnce()` for click assertions

### 3. Stories (`ComponentName.stories.tsx`)

```typescript
// lib/ComponentName/ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
	component: ComponentName,
	argTypes: {
		children: {
			control: 'text',
			description: 'Component children'
		},
		size: {
			control: 'select',
			options: Object.values(COMPONENT_SIZES),
			description: 'Component size'
		},
		variant: {
			control: 'select',
			options: Object.values(COMPONENT_VARIANTS),
			description: 'Component variant'
		}
	}
}

export default meta

type Story = StoryObj<typeof ComponentName>

// Required: Default story with minimal args
export const Default: Story = {
	args: {
		children: 'Click me!'
	}
}

// Additional stories showing specific combinations
export const CallToAction: Story = {
	args: {
		children: 'Contact Support',
		variant: COMPONENT_VARIANTS.PRIMARY,
		size: COMPONENT_SIZES.LARGE
	}
}
```

Key rules:
- Import `Meta` and `StoryObj` types from `@storybook/react` using `import type`
- Import component and all enums from the relative path
- `meta` object: set `component` and define `argTypes` for every prop
- Enum props use `control: 'select'` with `options: Object.values(ENUM_NAME)`
- `export default meta` (meta is the default export)
- Define `type Story = StoryObj<typeof ComponentName>`
- Always include a `Default` story
- Add additional stories showing meaningful prop combinations

### 4. Registering in `lib/main.ts`

Every component and its enums MUST be exported from `lib/main.ts`:

```typescript
import './tailwind.css'
export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'
export { ComponentName, COMPONENT_VARIANTS, COMPONENT_SIZES } from './ComponentName/ComponentName'
```

Key rules:
- Use named re-exports (NOT default imports/exports)
- Export the component AND all its enums
- `import './tailwind.css'` must remain at the top

## New Component Checklist

When creating a new component:

1. [ ] Create directory: `lib/ComponentName/`
2. [ ] Create `ComponentName.tsx` following the structure above
3. [ ] Create `ComponentName.test.tsx` with inline snapshot tests
4. [ ] Create `ComponentName.stories.tsx` with Default + additional stories
5. [ ] Add exports to `lib/main.ts` (component + all enums)
6. [ ] Run `pnpm test` — ensure all tests pass
7. [ ] Run `pnpm run build` — ensure build succeeds
8. [ ] Verify in Storybook: `pnpm run storybook`

## Styling

This library uses TailwindCSS for styling:

- All Tailwind utilities are available via `lib/tailwind.css`
- Components use inline className concatenation via template literals
- Style variants are defined as Record types mapping enums to Tailwind class strings
- The published package exports `./dist/style.css` for consumers

Don'ts:

- DO NOT create separate CSS/SCSS files for components
- DO NOT use CSS modules
- DO NOT use styled-components or emotion

## Testing

Tests use Vitest with React Testing Library:

- Test file name structure: `ComponentName.test.tsx`
- Run all tests: `pnpm test`
- Run tests in watch mode: `pnpm test` (Vitest runs in watch by default)
- Coverage: `pnpm run coverage`
- Test globals are enabled (describe, it, expect, vi available without imports)
- Use inline snapshots for component rendering tests: `expect(element).toMatchInlineSnapshot()`
- Test setup file: `lib/test/setup.ts` imports jest-dom matchers
- Test environment: jsdom (configured in vite.config.ts)

## Storybook

Component stories are co-located with components:
- Story files: `ComponentName.stories.tsx`
- Run Storybook: `pnpm run storybook`
- Build Storybook: `pnpm run build-storybook`

## Development Workflow

1. Make changes in `lib/` directory
2. Run tests: `pnpm test`
3. View in Storybook: `pnpm run storybook`
4. Build library: `pnpm run build`
5. Lint: `pnpm run lint`

The build command runs TypeScript compilation first, then Vite build. The prebuild script cleans the `dist/` directory.

## Path Aliases

TypeScript is configured with a path alias:
- `cottage-ui` → `./lib/main.ts`

This is resolved by vite-tsconfig-paths plugin.

## TypeScript Configuration

- Target: ES2020
- Strict mode enabled
- No unused locals or parameters allowed
- JSX: react-jsx (automatic runtime)
- Module resolution: bundler
- Vitest globals types included
