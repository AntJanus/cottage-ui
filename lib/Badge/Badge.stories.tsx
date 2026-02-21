import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge, BADGE_VARIANTS } from './Badge'

const meta: Meta<typeof Badge> = {
	component: Badge,
	argTypes: {
		children: {
			control: 'text',
			description: 'Badge content'
		},
		variant: {
			control: 'select',
			options: Object.values(BADGE_VARIANTS),
			description: 'Badge variant'
		}
	}
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
	args: {
		children: 'Badge'
	}
}

export const Primary: Story = {
	args: {
		children: 'New',
		variant: BADGE_VARIANTS.PRIMARY
	}
}

export const Success: Story = {
	args: {
		children: 'Active',
		variant: BADGE_VARIANTS.SUCCESS
	}
}

export const Warning: Story = {
	args: {
		children: 'Pending',
		variant: BADGE_VARIANTS.WARNING
	}
}

export const Danger: Story = {
	args: {
		children: 'Error',
		variant: BADGE_VARIANTS.DANGER
	}
}
