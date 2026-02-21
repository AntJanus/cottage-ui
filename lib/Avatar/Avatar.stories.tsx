import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AVATAR_SIZES } from './Avatar'

const meta: Meta<typeof Avatar> = {
	component: Avatar,
	argTypes: {
		name: {
			control: 'text',
			description: 'User name (used for initials fallback)'
		},
		src: {
			control: 'text',
			description: 'Image source URL'
		},
		alt: {
			control: 'text',
			description: 'Image alt text'
		},
		size: {
			control: 'select',
			options: Object.values(AVATAR_SIZES),
			description: 'Avatar size'
		}
	}
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
	args: {
		name: 'John Doe'
	}
}

export const WithImage: Story = {
	args: {
		name: 'John Doe',
		src: 'https://i.pravatar.cc/150?img=3',
		alt: 'John Doe'
	}
}

export const SingleName: Story = {
	args: {
		name: 'John'
	}
}

export const Large: Story = {
	args: {
		name: 'Jane Smith',
		size: AVATAR_SIZES.LARGE
	}
}
