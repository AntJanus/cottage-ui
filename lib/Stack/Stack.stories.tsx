import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack, STACK_DIRECTIONS, STACK_GAPS } from './Stack'

const meta: Meta<typeof Stack> = {
	component: Stack,
	argTypes: {
		children: {
			control: 'text',
			description: 'Stack children'
		},
		direction: {
			control: 'select',
			options: Object.values(STACK_DIRECTIONS),
			description: 'Stack direction'
		},
		gap: {
			control: 'select',
			options: Object.values(STACK_GAPS),
			description: 'Stack gap size'
		}
	}
}

export default meta

type Story = StoryObj<typeof Stack>

export const Default: Story = {
	args: {
		children: 'Stacked content'
	}
}

export const HorizontalLargeGap: Story = {
	args: {
		children: 'Horizontal content',
		direction: STACK_DIRECTIONS.HORIZONTAL,
		gap: STACK_GAPS.LARGE
	}
}

export const VerticalSmallGap: Story = {
	args: {
		children: 'Compact content',
		direction: STACK_DIRECTIONS.VERTICAL,
		gap: STACK_GAPS.SMALL
	}
}
