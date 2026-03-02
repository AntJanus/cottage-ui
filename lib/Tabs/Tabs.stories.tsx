import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TAB_VARIANTS } from './Tabs'

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	argTypes: {
		activeTab: {
			control: 'number',
			description: 'Active tab index'
		},
		'aria-label': {
			control: 'text',
			description: 'Accessible label for the tab list'
		},
		variant: {
			control: 'select',
			options: Object.values(TAB_VARIANTS),
			description: 'Tab variant'
		}
	}
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
	args: {
		'aria-label': 'Product sections',
		tabs: [
			{ label: 'Overview', content: 'Overview content goes here.' },
			{ label: 'Details', content: 'Details content goes here.' },
			{ label: 'Settings', content: 'Settings content goes here.' }
		]
	}
}

export const Pills: Story = {
	args: {
		'aria-label': 'Product sections',
		tabs: [
			{ label: 'Overview', content: 'Overview content goes here.' },
			{ label: 'Details', content: 'Details content goes here.' },
			{ label: 'Settings', content: 'Settings content goes here.' }
		],
		variant: TAB_VARIANTS.PILLS,
		activeTab: 1
	}
}
