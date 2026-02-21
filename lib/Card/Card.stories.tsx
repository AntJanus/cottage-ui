import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CARD_VARIANTS } from './Card'

const meta: Meta<typeof Card> = {
	component: Card,
	argTypes: {
		children: {
			control: 'text',
			description: 'Card content'
		},
		header: {
			control: 'text',
			description: 'Card header'
		},
		footer: {
			control: 'text',
			description: 'Card footer'
		},
		variant: {
			control: 'select',
			options: Object.values(CARD_VARIANTS),
			description: 'Card variant'
		}
	}
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
	args: {
		children: 'This is a card with some content.',
	}
}

export const WithHeader: Story = {
	args: {
		header: 'Card Title',
		children: 'This is a card with a header and content.',
	}
}

export const WithHeaderAndFooter: Story = {
	args: {
		header: 'Card Title',
		children: 'This is a card with all sections.',
		footer: 'Card footer',
		variant: CARD_VARIANTS.OUTLINED
	}
}

export const Elevated: Story = {
	args: {
		children: 'An elevated card with a shadow.',
		variant: CARD_VARIANTS.ELEVATED
	}
}
