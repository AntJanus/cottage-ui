import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner, SPINNER_SIZES } from './Spinner'

const meta: Meta<typeof Spinner> = {
	component: Spinner,
	argTypes: {
		size: {
			control: 'select',
			options: Object.values(SPINNER_SIZES),
			description: 'Spinner size'
		}
	}
}

export default meta

type Story = StoryObj<typeof Spinner>

export const Default: Story = {
	args: {}
}

export const Small: Story = {
	args: {
		size: SPINNER_SIZES.SMALL
	}
}

export const Large: Story = {
	args: {
		size: SPINNER_SIZES.LARGE
	}
}
