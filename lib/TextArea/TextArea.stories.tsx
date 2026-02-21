import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea, TEXTAREA_VARIANTS } from './TextArea'

const meta: Meta<typeof TextArea> = {
	component: TextArea,
	argTypes: {
		value: {
			control: 'text',
			description: 'TextArea value'
		},
		placeholder: {
			control: 'text',
			description: 'TextArea placeholder'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the textarea is disabled'
		},
		rows: {
			control: 'number',
			description: 'Number of rows'
		},
		variant: {
			control: 'select',
			options: Object.values(TEXTAREA_VARIANTS),
			description: 'TextArea variant'
		},
		onChange: {
			action: 'onChange',
			description: 'Called when textarea value changes'
		}
	}
}

export default meta

type Story = StoryObj<typeof TextArea>

export const Default: Story = {
	args: {
		placeholder: 'Enter your text here...'
	}
}

export const Error: Story = {
	args: {
		placeholder: 'This field has an error',
		variant: TEXTAREA_VARIANTS.ERROR
	}
}

export const Disabled: Story = {
	args: {
		placeholder: 'Disabled textarea',
		disabled: true
	}
}
