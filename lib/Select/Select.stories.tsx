import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select, SELECT_VARIANTS } from './Select'

const meta: Meta<typeof Select> = {
	component: Select,
	argTypes: {
		options: {
			control: 'object',
			description: 'Select options'
		},
		value: {
			control: 'text',
			description: 'Selected value'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text'
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state'
		},
		variant: {
			control: 'select',
			options: Object.values(SELECT_VARIANTS),
			description: 'Select variant'
		},
		onChange: {
			action: 'onChange',
			description: 'Called when selection changes'
		}
	}
}

export default meta

type Story = StoryObj<typeof Select>

const defaultOptions = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' }
]

export const Default: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Select an option...'
	}
}

export const Error: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Invalid selection',
		variant: SELECT_VARIANTS.ERROR
	}
}

export const Disabled: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Disabled select',
		disabled: true
	}
}
