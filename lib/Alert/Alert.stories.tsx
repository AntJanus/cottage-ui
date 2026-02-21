import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, ALERT_VARIANTS } from './Alert'

const meta: Meta<typeof Alert> = {
	component: Alert,
	argTypes: {
		children: {
			control: 'text',
			description: 'Alert content'
		},
		title: {
			control: 'text',
			description: 'Alert title'
		},
		variant: {
			control: 'select',
			options: Object.values(ALERT_VARIANTS),
			description: 'Alert variant'
		},
		onDismiss: {
			action: 'onDismiss',
			description: 'Called when alert is dismissed'
		}
	}
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
	args: {
		children: 'This is an informational alert.'
	}
}

export const Success: Story = {
	args: {
		children: 'Operation completed successfully!',
		title: 'Success',
		variant: ALERT_VARIANTS.SUCCESS
	}
}

export const Warning: Story = {
	args: {
		children: 'Please review your input before proceeding.',
		title: 'Warning',
		variant: ALERT_VARIANTS.WARNING
	}
}

export const Error: Story = {
	args: {
		children: 'Something went wrong. Please try again.',
		title: 'Error',
		variant: ALERT_VARIANTS.ERROR
	}
}

export const Dismissable: Story = {
	args: {
		children: 'This alert can be dismissed.',
		title: 'Dismissable',
		onDismiss: () => {}
	}
}
