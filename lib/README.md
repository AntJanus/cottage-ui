# Library Source Directory

This directory contains the source code for the Cottage UI component library. Everything in this directory gets published to npm.

## Directory Structure

```
lib/
├── main.ts              # Main entry point - exports all components
├── tailwind.css         # TailwindCSS imports
├── test/                # Test configuration and utilities
│   └── setup.ts
└── ComponentName/       # Each component in its own directory
    ├── ComponentName.tsx
    ├── ComponentName.test.tsx
    └── ComponentName.stories.tsx
```

## What Gets Published

When you run `pnpm run build`, the contents of this `lib/` directory are:

1. Bundled by Vite into `dist/cottage-ui.js` (ESM) and `dist/cottage-ui.umd.cjs` (UMD)
2. Styles processed into `dist/style.css`
3. Types generated into `dist/cottage-ui.d.ts`

The `dist/` folder is what gets published to npm, NOT the raw `lib/` files.

## Adding a New Component

Follow these steps to add a new component to the library:

### 1. Create Component Directory

```bash
mkdir lib/NewComponent
```

### 2. Create Component Files

Create three files in the new directory:

**NewComponent.tsx** - Component implementation
```typescript
import type { ReactNode } from "react";

export enum NEW_COMPONENT_VARIANTS {
  PRIMARY = 'primary',
  DEFAULT = 'default'
}

const VariantStyling: Record<NEW_COMPONENT_VARIANTS, string> = {
  [NEW_COMPONENT_VARIANTS.PRIMARY]: 'bg-blue-700 text-white',
  [NEW_COMPONENT_VARIANTS.DEFAULT]: 'bg-gray-700 text-white'
}

interface NewComponentProps {
  children: ReactNode;
  variant?: NEW_COMPONENT_VARIANTS;
}

const NewComponent = ({
  children,
  variant = NEW_COMPONENT_VARIANTS.DEFAULT
}: NewComponentProps): ReactNode => {
  const className = `base-classes ${VariantStyling[variant]}`
  return <div className={className}>{children}</div>;
};

export default NewComponent
```

**NewComponent.test.tsx** - Tests
```typescript
import { render, screen } from "@testing-library/react";
import NewComponent, { NEW_COMPONENT_VARIANTS } from "./NewComponent";

describe(`Component: ${NewComponent.name}`, () => {
  it("should render default", () => {
    render(<NewComponent>Content</NewComponent>);
    const element = screen.getByText('Content');
    expect(element).toBeInTheDocument();
  });

  it("should render primary variant", () => {
    render(
      <NewComponent variant={NEW_COMPONENT_VARIANTS.PRIMARY}>
        Content
      </NewComponent>
    );
    const element = screen.getByText('Content');
    expect(element).toMatchInlineSnapshot(`
      <div class="base-classes bg-blue-700 text-white">
        Content
      </div>
    `);
  });
});
```

**NewComponent.stories.tsx** - Storybook stories
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import NewComponent, { NEW_COMPONENT_VARIANTS } from './NewComponent';

const meta = {
  title: 'Components/NewComponent',
  component: NewComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Component',
  },
};

export const Primary: Story = {
  args: {
    variant: NEW_COMPONENT_VARIANTS.PRIMARY,
    children: 'Primary Component',
  },
};
```

### 3. Export from main.ts

Add your component to `lib/main.ts`:

```typescript
export { default as NewComponent } from './NewComponent/NewComponent'
// Or with named export:
// export { NewComponent } from './NewComponent/NewComponent'
```

### 4. Test Your Component

```bash
# Run tests
pnpm test

# View in Storybook
pnpm run storybook
```

### 5. Build and Verify

```bash
pnpm run build
```

Check that your component appears in `dist/cottage-ui.d.ts` and is exported correctly.

## Component Patterns

### Enum-Based Variants

Always use TypeScript enums for component variants:

```typescript
export enum COMPONENT_VARIANTS {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}
```

**Why enums?**
- Type safety
- Autocomplete in IDEs
- Easy refactoring
- Clear API for consumers

### Record Type Style Mappings

Map variants to Tailwind classes using Record types:

```typescript
const VariantStyling: Record<COMPONENT_VARIANTS, string> = {
  [COMPONENT_VARIANTS.PRIMARY]: 'bg-blue-700 text-white',
  [COMPONENT_VARIANTS.SECONDARY]: 'bg-gray-200 text-gray-900'
}
```

This ensures TypeScript will error if you forget to provide styles for a variant.

### Props Interfaces

Always define TypeScript interfaces for props:

```typescript
interface ComponentProps {
  children: ReactNode;
  variant?: COMPONENT_VARIANTS;
  size?: COMPONENT_SIZES;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}
```

Use optional props with sensible defaults.

### Default Exports

Components use default exports, enums use named exports:

```typescript
// Component file
export enum BUTTON_VARIANTS { ... }
export default Button

// Consumer usage
import Button, { BUTTON_VARIANTS } from 'cottage-ui'
```

## Styling Guidelines

### Use Tailwind Utilities Only

DO NOT create separate CSS files. Use Tailwind utility classes directly:

```typescript
const className = `rounded-lg p-4 ${variantStyles} ${sizeStyles}`
```

### Common Tailwind Patterns

**Spacing**: `p-2`, `px-4`, `py-2`, `m-4`, `gap-2`
**Colors**: `bg-blue-700`, `text-white`, `border-gray-300`
**Layout**: `flex`, `grid`, `items-center`, `justify-between`
**Interactive**: `hover:bg-blue-800`, `active:scale-95`, `transition-colors`

### Combining Classes

Use template literals to combine classes:

```typescript
const baseStyles = 'rounded p-2 transition-colors'
const className = `${baseStyles} ${variantStyles} ${sizeStyles}`
```

## Testing Guidelines

### What to Test

1. **Default rendering** - Component renders without errors
2. **Variant rendering** - Each variant applies correct styles
3. **User interactions** - Click handlers, form submissions, etc.
4. **Props** - Different prop combinations work correctly

### Use Inline Snapshots

Prefer inline snapshots over external snapshot files:

```typescript
expect(element).toMatchInlineSnapshot(`
  <button class="rounded p-2 bg-blue-700">
    Click me
  </button>
`);
```

Inline snapshots are easier to review in pull requests.

### Testing Library Queries

Use semantic queries from React Testing Library:

```typescript
// Good
screen.getByRole('button')
screen.getByLabelText('Email')
screen.getByText('Submit')

// Avoid
screen.getByClassName('btn')
screen.getByTestId('submit-button')
```

## File Naming Conventions

- Component files: `ComponentName.tsx` (PascalCase)
- Test files: `ComponentName.test.tsx`
- Story files: `ComponentName.stories.tsx`
- Utility files: `utilityName.ts` (camelCase)

## Exports from main.ts

The `lib/main.ts` file is the single entry point for the library. All components must be exported from this file:

```typescript
import './tailwind.css'

export { default as Button } from './Button/Button'
export { default as Input } from './Input/Input'
export { default as Card } from './Card/Card'

// Export types if needed
export type { ButtonProps } from './Button/Button'
```

## Common Mistakes to Avoid

1. **Creating files in src/ instead of lib/** - The src/ directory is not published
2. **Creating separate CSS files** - Use Tailwind utilities only
3. **Forgetting to export from main.ts** - Components won't be available to consumers
4. **Not using enums for variants** - Leads to typos and poor autocomplete
5. **Missing tests** - All components should have tests
6. **Missing stories** - All components should have Storybook stories

## See Also

- [Testing Documentation](test/README.md) - Detailed testing patterns
- [Button Component](Button/Button.md) - Reference implementation
