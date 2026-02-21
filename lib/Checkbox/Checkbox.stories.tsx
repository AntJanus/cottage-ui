import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox, CHECKBOX_VARIANTS } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
	argTypes: {
		label: {
			control: 'text',
			description: 'Checkbox label text'
		},
		checked: {
			control: 'boolean',
			description: 'Whether the checkbox is checked'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the checkbox is disabled'
		},
		variant: {
			control: 'select',
			options: Object.values(CHECKBOX_VARIANTS),
			description: 'Checkbox variant'
		},
		onChange: {
			action: 'onChange',
			description: 'Called when checkbox state changes'
		}
	}
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
	args: {
		label: 'Accept terms and conditions'
	}
}

export const Checked: Story = {
	args: {
		label: 'I agree',
		checked: true
	}
}

export const Disabled: Story = {
	args: {
		label: 'Unavailable option',
		disabled: true
	}
}
