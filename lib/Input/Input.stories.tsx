import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, INPUT_SIZES, INPUT_VARIANTS } from './Input'

const meta: Meta<typeof Input> = {
	component: Input,
	argTypes: {
		value: {
			control: 'text',
			description: 'Input value'
		},
		placeholder: {
			control: 'text',
			description: 'Input placeholder'
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state'
		},
		type: {
			control: 'text',
			description: 'Input type'
		},
		size: {
			control: 'select',
			options: Object.values(INPUT_SIZES),
			description: 'Input size'
		},
		variant: {
			control: 'select',
			options: Object.values(INPUT_VARIANTS),
			description: 'Input variant'
		},
		onChange: {
			action: 'onChange',
			description: 'Called when input value changes'
		}
	}
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
	args: {
		placeholder: 'Enter text...'
	}
}

export const Error: Story = {
	args: {
		placeholder: 'Invalid input',
		variant: INPUT_VARIANTS.ERROR
	}
}

export const Large: Story = {
	args: {
		placeholder: 'Large input',
		size: INPUT_SIZES.LARGE
	}
}
