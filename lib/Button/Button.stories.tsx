import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from './Button'

const meta: Meta<typeof Button> = {
	component: Button,
	argTypes: {
		// this can be inferred! :)
		children: {
			control: 'text',
			description: 'Button children'
		},
		size: {
			control: 'select',
			options: Object.values(BUTTON_SIZES),
			description: 'Button size'
		},
		variant: {
			control: 'select',
			options: Object.values(BUTTON_VARIANTS),
			description: 'Button variant'
		},
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'Native button type'
		}
	}
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
	args: {
		children: 'Click me!'
	}
}

// add common example
export const CallToAction: Story = {
	args: {
		children: 'Contact Support',
		variant: BUTTON_VARIANTS.PRIMARY,
		size: BUTTON_SIZES.LARGE
	}
}

export const Emoji: Story = {
	args: {
		children: '😅'
	}
}

export const Submit: Story = {
	args: {
		children: 'Submit form',
		type: 'submit'
	}
}
