import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label, LABEL_VARIANTS } from './Label'

const meta: Meta<typeof Label> = {
	component: Label,
	argTypes: {
		children: {
			control: 'text',
			description: 'Label children'
		},
		htmlFor: {
			control: 'text',
			description: 'Associated input ID'
		},
		variant: {
			control: 'select',
			options: Object.values(LABEL_VARIANTS),
			description: 'Label variant'
		}
	}
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
	args: {
		children: 'Username'
	}
}

export const Required: Story = {
	args: {
		children: 'Email',
		variant: LABEL_VARIANTS.REQUIRED
	}
}
