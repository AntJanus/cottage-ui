# CREATE_COMPONENT_PROMPT.md - Step-by-Step Component Creation Guide

This document is the definitive guide for creating new components in Cottage UI. Follow this process exactly.

## Before You Start

### Prerequisites
- Read AGENTS.md to understand the architecture and conventions
- Review the Button component in `lib/Button/` as your reference
- Ensure you have the project set up: `pnpm install`

### Planning Your Component
Before writing code:
1. Define the component's purpose and use cases
2. Identify all enum variants (variants, sizes, colors, etc.)
3. Plan the Tailwind classes for each variant
4. Identify all props (children, event handlers, etc.)
5. Plan test cases for each variant and handler
6. Sketch out 2-3 meaningful story examples

## Step 1: Create the Component Directory

Create a new directory in `lib/` named after your component (PascalCase):

```bash
mkdir lib/ComponentName
```

The directory structure will be:
```
lib/ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
└── ComponentName.stories.tsx
```

## Step 2: Create `ComponentName.tsx`

This is the component implementation file. Follow the exact structure:

### Structure Template

```typescript
import type { [ReactTypes] from "react";

// 1. Enums (exported, UPPER_SNAKE_CASE)
export enum COMPONENT_VARIANTS {
	VARIANT_A = 'variant-a',
	VARIANT_B = 'variant-b',
	DEFAULT = 'default'
}

export enum COMPONENT_SIZES {
	SMALL = 'small',
	DEFAULT = 'default',
	LARGE = 'large'
}

// 2. Styling Records (NOT exported, one per enum)
const ComponentVariantStyling: Record<COMPONENT_VARIANTS, string> = {
	[COMPONENT_VARIANTS.VARIANT_A]: 'bg-blue-500 text-white',
	[COMPONENT_VARIANTS.VARIANT_B]: 'bg-gray-500 text-white',
	[COMPONENT_VARIANTS.DEFAULT]: 'bg-gray-300 text-black'
}

const ComponentSizeStyling: Record<COMPONENT_SIZES, string> = {
	[COMPONENT_SIZES.SMALL]: 'text-sm px-2 py-1',
	[COMPONENT_SIZES.DEFAULT]: 'text-base px-3 py-2',
	[COMPONENT_SIZES.LARGE]: 'text-lg px-4 py-3'
}

// 3. Props Interface (NOT exported)
interface ComponentProps {
	children: ReactNode;
	variant?: COMPONENT_VARIANTS;
	size?: COMPONENT_SIZES;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
}

// 4. Component (named export)
export const ComponentName = ({
	children,
	variant = COMPONENT_VARIANTS.DEFAULT,
	size = COMPONENT_SIZES.DEFAULT,
	onClick
}: ComponentProps): ReactNode => {
	const className = `base-element-classes ${ComponentVariantStyling[variant]} ${ComponentSizeStyling[size]}`

	return <element className={className} onClick={onClick}>{children}</element>;
};
```

### Implementation Checklist

- [ ] Type imports using `import type { ... } from "react"`
- [ ] All enum values are lowercase strings
- [ ] One Styling Record per enum
- [ ] Every enum value has a corresponding Tailwind class in Record
- [ ] Props interface is NOT exported
- [ ] All variant/size props are optional (`?:`)
- [ ] All optional enum props default to the `DEFAULT` enum member
- [ ] Component is a **named export**
- [ ] Component returns `ReactNode`
- [ ] className built via template literal with Record lookups
- [ ] Proper semantic HTML element (button, div, span, etc.)

### Example: Badge Component

```typescript
import type { ReactNode } from "react";

export enum BADGE_VARIANTS {
	PRIMARY = 'primary',
	SUCCESS = 'success',
	WARNING = 'warning',
	DEFAULT = 'default'
}

const BadgeVariantStyling: Record<BADGE_VARIANTS, string> = {
	[BADGE_VARIANTS.PRIMARY]: 'bg-blue-600 text-white',
	[BADGE_VARIANTS.SUCCESS]: 'bg-green-600 text-white',
	[BADGE_VARIANTS.WARNING]: 'bg-amber-600 text-white',
	[BADGE_VARIANTS.DEFAULT]: 'bg-gray-300 text-gray-800'
}

interface BadgeProps {
	children: ReactNode;
	variant?: BADGE_VARIANTS;
}

export const Badge = ({ children, variant = BADGE_VARIANTS.DEFAULT }: BadgeProps): ReactNode => {
	const className = `inline-block px-3 py-1 rounded-full font-medium ${BadgeVariantStyling[variant]}`
	return <span className={className}>{children}</span>;
};
```

## Step 3: Create `ComponentName.test.tsx`

This is the test file. Follow the exact structure:

### Structure Template

```typescript
import { render, screen } from "@testing-library/react";
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from "./ComponentName";

describe("Component: ComponentName", () => {
	// Test 1: Default render
	it("should render default", () => {
		render(<ComponentName>Content</ComponentName>);
		const element = screen.getByRole('role-name')
		expect(element).toMatchInlineSnapshot(`...`);
	});

	// Test 2+: Each variant
	it("should render variant-a variant", () => {
		render(<ComponentName variant={COMPONENT_VARIANTS.VARIANT_A}>Content</ComponentName>);
		const element = screen.getByRole('role-name')
		expect(element).toMatchInlineSnapshot(`...`);
	});

	// Test: Each size (if applicable)
	it("should render large size", () => {
		render(<ComponentName size={COMPONENT_SIZES.LARGE}>Content</ComponentName>);
		const element = screen.getByRole('role-name')
		expect(element).toMatchInlineSnapshot(`...`);
	});

	// Test: Event handlers
	it("should handle click", () => {
		const mock = vi.fn()
		render(<ComponentName onClick={mock}>Content</ComponentName>);
		const element = screen.getByRole('role-name')
		element.click()
		expect(mock).toHaveBeenCalledOnce()
	});
});
```

### Implementation Steps

1. Write all test cases (structure above)
2. Run `pnpm test` to generate snapshots
3. Verify snapshots match the rendered HTML
4. All tests should pass before moving forward

### Test Checklist

- [ ] Describe block: `"Component: ComponentName"`
- [ ] Import `render` and `screen` from `@testing-library/react`
- [ ] Import component AND all enums
- [ ] One test for default render
- [ ] One test per variant
- [ ] One test per size (if applicable)
- [ ] One test per event handler
- [ ] Use `screen.getByRole()` for queries
- [ ] Use `toMatchInlineSnapshot()` for assertions
- [ ] Use `vi.fn()` for mocking
- [ ] Use `toHaveBeenCalledOnce()` for assertions
- [ ] All snapshots generated and verified

### Example: Badge Tests

```typescript
import { render, screen } from "@testing-library/react";
import { Badge, BADGE_VARIANTS } from "./Badge";

describe("Component: Badge", () => {
	it("should render default", () => {
		render(<Badge>New</Badge>);
		const element = screen.getByText('New')
		expect(element).toMatchInlineSnapshot(`
			<span
				class="inline-block px-3 py-1 rounded-full font-medium bg-gray-300 text-gray-800"
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
				class="inline-block px-3 py-1 rounded-full font-medium bg-blue-600 text-white"
			>
				Featured
			</span>
		`);
	});

	it("should render success variant", () => {
		render(<Badge variant={BADGE_VARIANTS.SUCCESS}>Verified</Badge>);
		const element = screen.getByText('Verified')
		expect(element).toMatchInlineSnapshot(`
			<span
				class="inline-block px-3 py-1 rounded-full font-medium bg-green-600 text-white"
			>
				Verified
			</span>
		`);
	});

	it("should render warning variant", () => {
		render(<Badge variant={BADGE_VARIANTS.WARNING}>Caution</Badge>);
		const element = screen.getByText('Caution')
		expect(element).toMatchInlineSnapshot(`
			<span
				class="inline-block px-3 py-1 rounded-full font-medium bg-amber-600 text-white"
			>
				Caution
			</span>
		`);
	});
});
```

## Step 4: Create `ComponentName.stories.tsx`

This is the Storybook stories file. Follow the exact structure:

### Structure Template

```typescript
import type { Meta, StoryObj } from '@storybook/react'
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
	component: ComponentName,
	argTypes: {
		children: {
			control: 'text',
			description: 'Component text content'
		},
		variant: {
			control: 'select',
			options: Object.values(COMPONENT_VARIANTS),
			description: 'Component style variant'
		},
		size: {
			control: 'select',
			options: Object.values(COMPONENT_SIZES),
			description: 'Component size'
		}
	}
}

export default meta

type Story = StoryObj<typeof ComponentName>

// Required: Default story
export const Default: Story = {
	args: {
		children: 'Default'
	}
}

// Additional stories
export const PrimaryLarge: Story = {
	args: {
		children: 'Primary Large',
		variant: COMPONENT_VARIANTS.PRIMARY,
		size: COMPONENT_SIZES.LARGE
	}
}
```

### Implementation Steps

1. Define `meta` object with component and argTypes
2. Add argType for each prop:
   - `children` → `control: 'text'`
   - Enum props → `control: 'select'` with `options: Object.values(ENUM)`
   - Other props → appropriate control
3. Define `type Story = StoryObj<typeof ComponentName>`
4. Create `Default` story with minimal args
5. Add 2-3 meaningful additional stories
6. Export `meta` as default

### Stories Checklist

- [ ] Import types using `import type`
- [ ] Meta object includes component and argTypes
- [ ] All props have argTypes entries
- [ ] Type alias: `type Story = StoryObj<typeof ComponentName>`
- [ ] Default story exported
- [ ] Additional stories (at least 1-2)
- [ ] `export default meta` at the end
- [ ] No JSX in meta, only in stories

### Example: Badge Stories

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
			description: 'Badge color variant'
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

export const Primary: Story = {
	args: {
		children: 'Featured',
		variant: BADGE_VARIANTS.PRIMARY
	}
}

export const Success: Story = {
	args: {
		children: 'Verified',
		variant: BADGE_VARIANTS.SUCCESS
	}
}

export const Warning: Story = {
	args: {
		children: 'Caution',
		variant: BADGE_VARIANTS.WARNING
	}
}

export const AllVariants: Story = {
	render: () => (
		<div className="flex gap-2">
			<Badge>Default</Badge>
			<Badge variant={BADGE_VARIANTS.PRIMARY}>Primary</Badge>
			<Badge variant={BADGE_VARIANTS.SUCCESS}>Success</Badge>
			<Badge variant={BADGE_VARIANTS.WARNING}>Warning</Badge>
		</div>
	)
}
```

## Step 5: Register in `lib/main.ts`

Add your component to the main entry point:

```typescript
import './tailwind.css'
export { Button, BUTTON_VARIANTS, BUTTON_SIZES } from './Button/Button'
export { Badge, BADGE_VARIANTS } from './Badge/Badge'
export { ComponentName, COMPONENT_VARIANTS, COMPONENT_SIZES } from './ComponentName/ComponentName'
```

### Registration Checklist

- [ ] Named export for component
- [ ] Named exports for all enums
- [ ] Follows alphabetical order
- [ ] Uses `from './ComponentName/ComponentName'` path pattern

## Step 6: Verify Everything

### Run Tests
```bash
pnpm test
```
- All tests pass ✓
- Snapshots are correct ✓

### Run Build
```bash
pnpm run build
```
- No TypeScript errors ✓
- Build succeeds ✓
- dist/ created with output ✓

### Check Storybook
```bash
pnpm run storybook
```
- Component appears in sidebar ✓
- All stories render correctly ✓
- Controls work in Storybook ✓

### Verification Checklist

- [ ] `pnpm test` passes
- [ ] All snapshots verified
- [ ] `pnpm run build` succeeds
- [ ] No TypeScript errors
- [ ] Storybook shows component
- [ ] All stories render
- [ ] Storybook controls work

## Step 7: Commit Your Work

```bash
git add lib/ComponentName/
git add lib/main.ts
git commit -m "feat: add ComponentName component"
```

### Commit Checklist

- [ ] All new files added
- [ ] lib/main.ts updated
- [ ] Commit message follows convention
- [ ] Changes are atomic and focused

## Complete Component Anatomy

Here's a reference for what a complete component looks like:

### Component File Structure (ComponentName.tsx)
- Lines 1-3: Type imports
- Lines 5-10: Enum definitions (exported)
- Lines 12-18: Styling Records (NOT exported)
- Lines 20-25: Props interface (NOT exported)
- Lines 27-32: Component function (named export)

**Total: ~30-40 lines**

### Test File Structure (ComponentName.test.tsx)
- Lines 1-3: Imports
- Lines 5-7: Describe block
- Lines 8-12: Test 1 (default)
- Lines 14-18: Test 2 (variant 1)
- Lines 20-24: Test 3 (variant 2)
- Lines 26-30: Test 4 (size/etc)
- Lines 32-38: Test 5 (event handler)

**Total: ~40-50 lines**

### Story File Structure (ComponentName.stories.tsx)
- Lines 1-3: Imports
- Lines 5-30: Meta definition with argTypes
- Lines 32-34: Type alias
- Lines 36-42: Default story
- Lines 44-50: Additional story 1
- Lines 52-58: Additional story 2
- Lines 60-70: Optional AllVariants story

**Total: ~60-80 lines**

## Naming Conventions Quick Reference

| Type | Format | Example | Export |
|------|--------|---------|--------|
| Component | PascalCase | `Button` | ✓ Yes |
| Component Directory | PascalCase | `lib/Button/` | N/A |
| Component File | `PascalCase.tsx` | `Button.tsx` | N/A |
| Test File | `PascalCase.test.tsx` | `Button.test.tsx` | N/A |
| Story File | `PascalCase.stories.tsx` | `Button.stories.tsx` | N/A |
| Enum | UPPER_SNAKE_CASE | `BUTTON_VARIANTS` | ✓ Yes |
| Enum Value | lowercase string | `primary = 'primary'` | N/A |
| Styling Record | ComponentTypeStyling | `ButtonVariantStyling` | ✗ No |
| Props Interface | ComponentProps | `ButtonProps` | ✗ No |

## Common Mistakes to Avoid

❌ **Don't**: Create CSS files or use CSS modules
✓ **Do**: Use Tailwind classes in styling Records

❌ **Don't**: Export styling Records or props interfaces
✓ **Do**: Only export components and enums

❌ **Don't**: Use default exports for components
✓ **Do**: Use named exports

❌ **Don't**: Use arbitrary enum values
✓ **Do**: Use lowercase string values matching enum keys

❌ **Don't**: Skip test snapshots or use generic queries
✓ **Do**: Use inline snapshots and semantic role queries

❌ **Don't**: Forget to register in lib/main.ts
✓ **Do**: Add named exports for component and enums

❌ **Don't**: Use import React from 'react'
✓ **Do**: Use `import type { ReactNode } from 'react'`

## Quick Checklist for New Components

- [ ] Component directory created: `lib/ComponentName/`
- [ ] `ComponentName.tsx` written and follows structure
- [ ] `ComponentName.test.tsx` written with all cases
- [ ] `ComponentName.stories.tsx` written with stories
- [ ] Component registered in `lib/main.ts`
- [ ] `pnpm test` passes
- [ ] `pnpm run build` succeeds
- [ ] Storybook displays component correctly
- [ ] All stories render without errors
- [ ] Code follows naming conventions
- [ ] Changes committed to git

## Helpful Resources

- **AGENTS.md** - Complete architecture reference
- **lib/Button/** - Canonical component template
- **vite.config.ts** - Build configuration
- **tsconfig.json** - TypeScript settings
- **tailwind.config.js** - Tailwind setup

## Running the Full Workflow

```bash
# 1. Create component files
mkdir lib/ComponentName
# ... create the 3 files following the steps above ...

# 2. Run tests (will generate snapshots)
pnpm test

# 3. Verify snapshots look correct
# ... review test output ...

# 4. Run build
pnpm run build

# 5. View in Storybook
pnpm run storybook
# ... verify in browser at http://localhost:6006 ...

# 6. Commit
git add lib/ComponentName/ lib/main.ts
git commit -m "feat: add ComponentName component"
```

---

**Last Updated**: February 2026  
**Version**: 1.0.0
