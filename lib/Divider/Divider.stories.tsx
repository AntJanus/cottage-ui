import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider, DIVIDER_ORIENTATIONS } from './Divider'

const meta: Meta<typeof Divider> = {
	component: Divider,
	argTypes: {
		orientation: {
			control: 'select',
			options: Object.values(DIVIDER_ORIENTATIONS),
			description: 'Divider orientation'
		}
	}
}

export default meta

type Story = StoryObj<typeof Divider>

export const Default: Story = {
	args: {}
}

export const Vertical: Story = {
	args: {
		orientation: DIVIDER_ORIENTATIONS.VERTICAL
	},
	decorators: [
		(Story) => (
			<div style={{ display: 'flex', height: '100px' }}>
				<span>Left</span>
				<Story />
				<span>Right</span>
			</div>
		)
	]
}
