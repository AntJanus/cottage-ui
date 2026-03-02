# CREATE_COMPONENT_PROMPT.md - Step-by-Step Component Creation Guide

Use this process to create new components that match the current Cottage UI conventions.

## 1. Prepare

- Review `lib/Button/` for baseline structure.
- Confirm props and enum-based variants/sizes.
- Plan stories and tests before coding.

## 2. Create Folder + Files

```bash
mkdir lib/ComponentName
```

Create:
- `lib/ComponentName/ComponentName.tsx`
- `lib/ComponentName/ComponentName.test.tsx`
- `lib/ComponentName/ComponentName.stories.tsx`

## 3. Implement Component (`ComponentName.tsx`)

Template:

```tsx
import type { MouseEvent, ReactNode } from "react";

export enum COMPONENT_VARIANTS {
	DEFAULT = 'default',
	PRIMARY = 'primary'
}

export enum COMPONENT_SIZES {
	DEFAULT = 'default',
	LARGE = 'large'
}

const ComponentVariantStyling: Record<COMPONENT_VARIANTS, string> = {
	[COMPONENT_VARIANTS.DEFAULT]: 'bg-gray-700 text-white',
	[COMPONENT_VARIANTS.PRIMARY]: 'bg-orange-700 text-white'
}

const ComponentSizeStyling: Record<COMPONENT_SIZES, string> = {
	[COMPONENT_SIZES.DEFAULT]: 'p-2',
	[COMPONENT_SIZES.LARGE]: 'p-3 text-lg'
}

interface ComponentNameProps {
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	variant?: COMPONENT_VARIANTS;
	size?: COMPONENT_SIZES;
}

export const ComponentName = ({
	children,
	onClick,
	variant = COMPONENT_VARIANTS.DEFAULT,
	size = COMPONENT_SIZES.DEFAULT
}: ComponentNameProps): ReactNode => {
	const className = `rounded ${ComponentVariantStyling[variant]} ${ComponentSizeStyling[size]}`
	return <button onClick={onClick} className={className}>{children}</button>;
};
```

Rules:
- Named component export only.
- Enums exported.
- Props interface internal.
- Tailwind classes only.

## 4. Add Tests (`ComponentName.test.tsx`)

Template:

```tsx
import { render, screen } from "@testing-library/react";
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from "./ComponentName";

describe("Component: ComponentName", () => {
	it("should render default", () => {
		render(<ComponentName>Content</ComponentName>);
		expect(screen.getByRole('button')).toMatchInlineSnapshot(`...`);
	});

	it("should render primary variant", () => {
		render(<ComponentName variant={COMPONENT_VARIANTS.PRIMARY}>Content</ComponentName>);
		expect(screen.getByRole('button')).toMatchInlineSnapshot(`...`);
	});

	it("should render large size", () => {
		render(<ComponentName size={COMPONENT_SIZES.LARGE}>Content</ComponentName>);
		expect(screen.getByRole('button')).toMatchInlineSnapshot(`...`);
	});

	it("should handle click", () => {
		const mock = vi.fn()
		render(<ComponentName onClick={mock}>Content</ComponentName>);
		screen.getByRole('button').click()
		expect(mock).toHaveBeenCalledOnce()
	});
});
```

## 5. Add Stories (`ComponentName.stories.tsx`)

Use `@storybook/react-vite` types:

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComponentName, COMPONENT_SIZES, COMPONENT_VARIANTS } from './ComponentName'

const meta: Meta<typeof ComponentName> = {
	component: ComponentName,
	argTypes: {
		children: { control: 'text', description: 'Component content' },
		variant: { control: 'select', options: Object.values(COMPONENT_VARIANTS), description: 'Variant' },
		size: { control: 'select', options: Object.values(COMPONENT_SIZES), description: 'Size' },
		onClick: { action: 'onClick', description: 'Click handler' }
	}
}

export default meta

type Story = StoryObj<typeof ComponentName>

export const Default: Story = {
	args: { children: 'Click me' }
}

export const PrimaryLarge: Story = {
	args: {
		children: 'Primary CTA',
		variant: COMPONENT_VARIANTS.PRIMARY,
		size: COMPONENT_SIZES.LARGE
	}
}
```

## 6. Export Public API

Add to `lib/main.ts`:

```ts
export { ComponentName, COMPONENT_VARIANTS, COMPONENT_SIZES } from './ComponentName/ComponentName'
```

## 7. Accessibility Check

Before finalizing:
- Interactive elements have accessible names.
- Inputs/select/textarea support proper aria attributes.
- Error variants expose `aria-invalid` when relevant.
- Keyboard behavior works for custom widgets.

## 8. Verify

```bash
npm run lint
npm run test -- --run
npm run build
```
