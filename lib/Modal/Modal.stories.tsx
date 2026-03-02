import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal, MODAL_SIZES } from './Modal'

const meta: Meta<typeof Modal> = {
	component: Modal,
	argTypes: {
		children: {
			control: 'text',
			description: 'Modal children'
		},
		isOpen: {
			control: 'boolean',
			description: 'Whether the modal is open'
		},
		title: {
			control: 'text',
			description: 'Modal title'
		},
		'aria-label': {
			control: 'text',
			description: 'Accessible label used when no title is provided'
		},
		size: {
			control: 'select',
			options: Object.values(MODAL_SIZES),
			description: 'Modal size'
		},
		onClose: {
			action: 'onClose',
			description: 'Called when modal is closed'
		}
	}
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
	args: {
		children: 'This is modal content.',
		isOpen: true,
		title: 'Modal Title'
	}
}

export const Small: Story = {
	args: {
		children: 'Small modal content.',
		isOpen: true,
		title: 'Small Modal',
		size: MODAL_SIZES.SMALL
	}
}

export const Large: Story = {
	args: {
		children: 'Large modal with more room for content.',
		isOpen: true,
		title: 'Large Modal',
		size: MODAL_SIZES.LARGE
	}
}

export const NoTitle: Story = {
	args: {
		children: 'Modal without a title.',
		isOpen: true,
		'aria-label': 'Details dialog'
	}
}
