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
  - `lib/main.ts` - Main entry point that exports all components
  - `lib/tailwind.css` - TailwindCSS imports
  - `lib/ComponentName/` - Each component gets its own directory
    - `ComponentName.tsx` - Component implementation
    - `ComponentName.test.tsx` - Vitest tests
    - `ComponentName.stories.tsx` - Storybook stories
  - `lib/test/setup.ts` - Test configuration
- `src/` - Development app (NOT published)
  - Used for local development and testing

### Build Configuration

The build process uses Vite with library mode:

- Entry point: `lib/main.ts`
- Outputs: ESM (`dist/cottage-ui.js`) and UMD (`dist/cottage-ui.umd.cjs`)
- React, react-dom, and react/jsx-runtime are externalized (peerDependencies)
- TypeScript declarations are generated and bundled using vite-plugin-dts

## Component Development Pattern

When creating a new component, follow this structure:

1. Create a new directory in `lib/ComponentName/`
2. Component file uses enums for variants and sizes
3. Style mappings use Record types: `Record<VARIANTS, string>`
4. Components export both the component and their enum types
5. Component props use TypeScript interfaces
6. Default export for the component, named exports for enums

Example pattern from Button:
```typescript
export enum BUTTON_VARIANTS {
  PRIMARY = 'primary',
  DEFAULT = 'default'
}

const ButtonVariantStyling: Record<BUTTON_VARIANTS, string> = {
  [BUTTON_VARIANTS.PRIMARY]: 'bg-orange-700 hover:bg-orange-500 text-white',
  [BUTTON_VARIANTS.DEFAULT]: 'bg-gray-700 hover:bg-gray-800 text-white'
}

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  variant?: BUTTON_VARIANTS;
}

export default Button
```

Then export from `lib/main.ts`:
```typescript
export { Button } from './Button/Button'
```

## Styling

This library uses TailwindCSS for styling:
 
- All Tailwind utilities are available via `lib/tailwind.css`
- Components use inline className concatenation
- Style variants are defined as Record types mapping enums to Tailwind class strings
- The published package exports `./dist/style.css` for consumers

Don'ts:

- DO NOT create separate CSS/SCSS files for components

## Testing

Tests use Vitest with React Testing Library:

- Test file name structure: `ComponentName.test.tsx`
- Run all tests: `pnpm test`
- Run tests in watch mode: `pnpm test` (Vitest runs in watch by default)
- Coverage: `pnpm run coverage`
- Test globals are enabled (describe, it, expect, vi available without imports)
- Use inline snapshots for component rendering tests: `expect(element).toMatchInlineSnapshot()`
- Test setup file: `lib/test/setup.ts` imports jest-dom matchers

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
