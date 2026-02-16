# AGENTS.md - Cottage UI Component Library Architecture

This document provides comprehensive guidance for AI agents and developers creating new components in Cottage UI.

## Project Overview

Cottage UI is a professional React component library with:
- **TypeScript** strict mode with full type safety
- **React 18+** with JSX automatic runtime
- **TailwindCSS** for styling (no CSS files)
- **Vite** for building ESM and UMD bundles
- **Vitest** for testing with React Testing Library
- **Storybook** for component documentation
- **pnpm** as the package manager

## Repository Structure

```
cottage-ui/
├── lib/                          # Library source code (published)
│   ├── main.ts                   # Entry point: exports all components & enums
│   ├── tailwind.css              # Tailwind imports
│   ├── test/
│   │   └── setup.ts              # Test configuration
│   ├── Button/                   # Example component
│   │   ├── Button.tsx            # Component implementation
│   │   ├── Button.test.tsx       # Vitest tests
│   │   └── Button.stories.tsx    # Storybook stories
│   ├── ComponentName/            # New components follow this structure
│   │   ├── ComponentName.tsx
│   │   ├── ComponentName.test.tsx
│   │   └── ComponentName.stories.tsx
│   └── ... other components
├── src/                          # Development app (NOT published)
├── .storybook/                   # Storybook configuration
├── dist/                         # Build output (ESM + UMD)
├── CLAUDE.md                     # AI assistant guidance
├── AGENTS.md                     # This file
├── CREATE_COMPONENT_PROMPT.md    # Step-by-step component creation guide
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.js            # Tailwind configuration
└── package.json                  # Dependencies
```

## File Structure for Each Component

Every component MUST have exactly 3 files in its own directory:

### 1. `ComponentName.tsx` - Component Implementation

**Purpose**: Contains the component logic and styling configuration.

**Structure (in order)**:
1. Type imports from React
2. Enum definitions (exported, UPPER_SNAKE_CASE)
3. Styling Record types (NOT exported)
4. Props interface (NOT exported)
5. Component function (named export)

**Key Rules**:
- Import types using `import type { ... } from "react"`
- Enums: `COMPONENT_VARIANTS`, `COMPONENT_SIZES`, etc. (exported, values are lowercase strings)
- Every enum value MUST have a corresponding Tailwind class in its styling Record
- Props interface uses camelCase naming, NOT exported
- Default prop values should use the `DEFAULT` enum member
- Component function returns `ReactNode`
- Component is a **named export** (NOT default)
- Use tabs for indentation
- className built via template literal: `` `base-classes ${StyleRecord[enum]} ${StyleRecord[enum]}` ``

**Minimal Example**:
```typescript
import type { ReactNode } from "react";

export enum BADGE_VARIANTS {
  PRIMARY = 'primary',
  DEFAULT = 'default'
}

const BadgeVariantStyling: Record<BADGE_VARIANTS, string> = {
  [BADGE_VARIANTS.PRIMARY]: 'bg-orange-700 text-white',
  [BADGE_VARIANTS.DEFAULT]: 'bg-gray-200 text-gray-800'
}

interface BadgeProps {
  children: ReactNode;
  variant?: BADGE_VARIANTS;
}

export const Badge = ({ children, variant = BADGE_VARIANTS.DEFAULT }: BadgeProps): ReactNode => {
  const className = `inline-block px-3 py-1 rounded-full ${BadgeVariantStyling[variant]}`
  return <span className={className}>{children}</span>;
};
```

### 2. `ComponentName.test.tsx` - Vitest Tests

**Purpose**: Comprehensive test coverage using React Testing Library.

**Structure**:
- Import `render` and `screen` from `@testing-library/react`
- Import component AND all enums from relative path
- Describe block: `"Component: ComponentName"`
- One test per variant
- One test per size (if applicable)
- Tests for all event handlers
- Use inline snapshots with `toMatchInlineSnapshot()`
- Use semantic HTML roles: `getByRole('button')`, `getByRole('link')`, etc.

**Key Rules**:
- Test globals enabled: `describe`, `it`, `expect`, `vi` available without imports
- Use `vi.fn()` for mocking callbacks
- Use `toHaveBeenCalledOnce()` for assertions
- Use `screen.getByRole()` to query elements (preferred over getByTestId)
- Inline snapshots: let Vitest generate them on first run
- Test every enum variant and size value
- Test every event handler prop

**Minimal Example**:
```typescript
import { render, screen } from "@testing-library/react";
import { Badge, BADGE_VARIANTS } from "./Badge";

describe("Component: Badge", () => {
  it("should render default", () => {
    render(<Badge>New</Badge>);
    const element = screen.getByText('New')
    expect(element).toMatchInlineSnapshot(`
      <span
        class="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-800"
      >
        New
      </span>
    `);
  });

  it("should render primary variant", () => {
    render(<Badge variant={BADGE_VARIANTS.PRIMARY}>Featured</Badge>);
    const element = screen.getByText('Featured')
    expect(element).toMatchInlineSnapshot(`
      <span
        class="inline-block px-3 py-1 rounded-full bg-orange-700 text-white"
      >
        Featured
      </span>
    `);
  });
});
```

### 3. `ComponentName.stories.tsx` - Storybook Stories

**Purpose**: Interactive component documentation in Storybook.

**Structure**:
- Import `Meta` and `StoryObj` from `@storybook/react`
- Define `meta` object with component and argTypes
- Define `Story` type alias
- Always export `Default` story
- Add additional stories showing meaningful combinations
- Export default meta

**Key Rules**:
- Use `import type` for type imports
- Every prop gets an argType entry
- Enum props use `control: 'select'` with `options: Object.values(ENUM_NAME)`
- `children` props use `control: 'text'`
- Include helpful descriptions in argTypes
- Default story uses minimal args
- Additional stories show real-world use cases
- `export default meta` (NOT component)

**Minimal Example**:
```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { Badge, BADGE_VARIANTS } from './Badge'

const meta: Meta<typeof Badge> = {
  component: Badge,
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge text content'
    },
    variant: {
      control: 'select',
      options: Object.values(BADGE_VARIANTS),
      description: 'Badge style variant'
    }
  }
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'New'
  }
}

export const Featured: Story = {
  args: {
    children: 'Featured',
    variant: BADGE_VARIANTS.PRIMARY
  }
}
```

## Registering Components in `lib/main.ts`

All components MUST be exported from `lib/main.ts`:

**Pattern**:
```typescript
import './tailwind.css'
export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'
export { Badge, BADGE_VARIANTS } from './Badge/Badge'
export { ComponentName, COMPONENT_VARIANTS } from './ComponentName/ComponentName'
```

**Rules**:
- Use **named re-exports** (NOT default imports/exports)
- Export component AND all its enums
- `import './tailwind.css'` MUST remain at the top
- Maintain alphabetical order of exports (optional but recommended)
- One line per component

## Naming Conventions

### Files
- Component file: `PascalCase.tsx` (e.g., `Button.tsx`, `Badge.tsx`)
- Test file: `PascalCase.test.tsx` (e.g., `Button.test.tsx`)
- Story file: `PascalCase.stories.tsx` (e.g., `Button.stories.tsx`)
- Directory: PascalCase matching component name (e.g., `lib/Button/`)

### Enums
- Format: `COMPONENT_VARIANT_TYPE` (UPPER_SNAKE_CASE)
- Examples:
  - `BUTTON_VARIANTS` - style variants
  - `BUTTON_SIZES` - size variants
  - `BADGE_COLORS` - color variants
  - `CARD_LAYOUTS` - layout variants
- Values: lowercase strings (e.g., `PRIMARY = 'primary'`, `LARGE = 'large'`)
- Always export enums

### Styling Records
- Format: `ComponentVariantTypeStyling` (PascalCase with "Styling" suffix)
- Examples:
  - `ButtonVariantStyling`
  - `ButtonSizeStyling`
  - `BadgeColorStyling`
- NOT exported (internal to component file)
- Type: `Record<ENUM_TYPE, string>` where string is Tailwind classes
- Values are Tailwind class strings, can include hover/active states

### Props Interface
- Format: `ComponentProps` (PascalCase with "Props" suffix)
- Examples:
  - `ButtonProps`
  - `BadgeProps`
- NOT exported (internal to component file)
- All optional enum props have defaults
- All variant/size props are optional (`?:`)

### Components
- Format: PascalCase (e.g., `Button`, `Badge`, `Card`)
- Always named exports, NOT default exports
- Examples: `export const Button = ...`, `export const Badge = ...`

## Styling Guidelines

### Tailwind CSS Only
- All styling via TailwindCSS utility classes
- NO separate CSS files
- NO CSS modules
- NO styled-components or emotion
- All utilities available via `lib/tailwind.css`

### Class Organization
Classes should be organized logically in the className:
1. Layout/Display: `inline-block`, `flex`, `grid`, etc.
2. Spacing: `p-2`, `mx-4`, `gap-2`, etc.
3. Sizing: `w-full`, `h-10`, `text-lg`, etc.
4. Colors/Backgrounds: `bg-*`, `text-*`, `border-*`
5. Effects/States: `hover:*`, `active:*`, `shadow-*`
6. Border/Rounding: `rounded`, `border`

Example pattern:
```typescript
const className = `inline-block px-3 py-1 rounded-full ${BadgeVariantStyling[variant]} ${BadgeSizeStyling[size]}`
```

## Testing Guidelines

### Test Structure
- **Describe**: `"Component: ComponentName"`
- **Test cases**:
  - One for default render
  - One per variant (if enum exists)
  - One per size (if enum exists)
  - One for each event handler

### Query Priority (React Testing Library)
1. `getByRole()` - preferred, semantic queries
2. `getByLabelText()` - for form inputs
3. `getByPlaceholderText()` - for inputs with placeholder
4. `getByText()` - for text content
5. `getByTestId()` - last resort

### Common Roles
- `button` - HTML buttons
- `link` - Anchor tags
- `textbox` - Input elements
- `combobox` - Select elements
- `heading` - h1-h6 tags
- `region` - Semantic sections

### Snapshot Testing
- Use `toMatchInlineSnapshot()`
- Let Vitest generate snapshots on first run
- Include the full HTML output in snapshot
- Update snapshots if styling changes intentionally

## Build & Deployment

### Build Process
```bash
pnpm run build
```
- Cleans `dist/` directory
- Runs TypeScript type checking
- Builds with Vite in library mode
- Generates ESM output: `dist/cottage-ui.js`
- Generates UMD output: `dist/cottage-ui.umd.cjs`
- Generates TypeScript declarations: `dist/*.d.ts`

### Testing
```bash
pnpm test          # Run tests (watch mode)
pnpm run coverage  # Coverage report
```

### Storybook
```bash
pnpm run storybook       # Dev server
pnpm run build-storybook # Build static site
```

### External Dependencies
- React and react-dom are externalized (peerDependencies)
- TypeScript declarations bundled
- vite-plugin-dts generates .d.ts files

## Component Creation Checklist

When creating a new component:

- [ ] Create directory `lib/ComponentName/`
- [ ] Create `ComponentName.tsx` with proper structure
  - [ ] Type imports from React
  - [ ] Enum(s) definition(s) (exported)
  - [ ] Styling Record(s) (NOT exported)
  - [ ] Props interface (NOT exported)
  - [ ] Named component export
- [ ] Create `ComponentName.test.tsx`
  - [ ] Describe block: "Component: ComponentName"
  - [ ] Test default render with snapshot
  - [ ] Test each variant
  - [ ] Test each size (if applicable)
  - [ ] Test each event handler
- [ ] Create `ComponentName.stories.tsx`
  - [ ] Meta object with component and argTypes
  - [ ] Default story
  - [ ] Additional stories (at least one)
  - [ ] Type: `type Story = StoryObj<typeof Component>`
- [ ] Add exports to `lib/main.ts`
  - [ ] Export component (named)
  - [ ] Export all enums
- [ ] Run tests: `pnpm test` (all pass)
- [ ] Run build: `pnpm run build` (no errors)
- [ ] View in Storybook: `pnpm run storybook`
- [ ] Verify all stories render
- [ ] Verify component appears in Storybook sidebar
- [ ] Git commit with descriptive message

## Quick Reference: Button Component

The Button component serves as the canonical reference. See `lib/Button/` for a complete, working example:

- **Button.tsx**: 34 lines - Full component with variants and sizes
- **Button.test.tsx**: 58 lines - Complete test suite with snapshots
- **Button.stories.tsx**: 51 lines - Stories with multiple examples
- **Export in main.ts**: `export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'`

Use this as a template for new components.

## TypeScript Configuration

- **Target**: ES2020
- **Strict mode**: enabled
- **JSX runtime**: react-jsx (automatic)
- **Module resolution**: bundler
- **No unused locals or parameters**: enforced
- **Vitest globals**: included in types

## Common Patterns

### Multiple Enum-Based Variants
```typescript
export enum COMPONENT_VARIANTS { ... }
export enum COMPONENT_SIZES { ... }
export enum COMPONENT_COLORS { ... }

const ComponentVariantStyling: Record<COMPONENT_VARIANTS, string> = { ... }
const ComponentSizeStyling: Record<COMPONENT_SIZES, string> = { ... }
const ComponentColorStyling: Record<COMPONENT_COLORS, string> = { ... }

const className = `base-classes ${ComponentVariantStyling[variant]} ${ComponentSizeStyling[size]} ${ComponentColorStyling[color]}`
```

### Optional Handler Props
```typescript
interface ComponentProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  onChange?: (value: string) => void;
}

export const Component = ({ onClick, onChange, ... }: ComponentProps) => {
  return <button onClick={onClick}>...</button>
}
```

### Testing Event Handlers
```typescript
it("should handle click", () => {
  const mock = vi.fn()
  render(<Component onClick={mock}>Click</Component>)
  screen.getByRole('button').click()
  expect(mock).toHaveBeenCalledOnce()
})
```

### Testing Multiple Variants in Stories
```typescript
export const AllVariants: Story = {
  render: (args) => (
    <div className="flex gap-4">
      {Object.values(COMPONENT_VARIANTS).map(variant => (
        <Component key={variant} {...args} variant={variant}>
          {variant}
        </Component>
      ))}
    </div>
  )
}
```

## Troubleshooting

### Tests Failing
- Run `pnpm test` to see detailed errors
- Check that snapshots match actual HTML output
- Verify enum values are lowercase strings
- Confirm all enum values have styling entries

### Build Failing
- Run `pnpm run build` to see errors
- Check TypeScript strict mode compliance
- Verify all exports are in `lib/main.ts`
- Ensure no unused imports/variables

### Storybook Not Showing Component
- Check component file is in `lib/ComponentName/ComponentName.tsx`
- Verify story file is `lib/ComponentName/ComponentName.stories.tsx`
- Story auto-discovery pattern: `lib/**/*.stories.tsx`
- Restart Storybook with `pnpm run storybook`

### Type Errors
- Use `import type` for React imports
- Props interface must NOT be exported
- Enums MUST be exported
- Component MUST be named export
- All enum values must be in styling Record

## References

- Button component: `lib/Button/` (canonical template)
- CLAUDE.md: Project guidance for AI assistants
- CREATE_COMPONENT_PROMPT.md: Step-by-step prompt for AI component creation
- vite.config.ts: Build configuration
- tsconfig.json: TypeScript configuration
- tailwind.config.js: Tailwind setup

---

**Last Updated**: February 2026  
**Library Version**: 1.0.0  
**Package Manager**: pnpm
