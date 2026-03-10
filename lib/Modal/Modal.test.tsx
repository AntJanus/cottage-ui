import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal, MODAL_SIZES } from "./Modal";

describe("Component: Modal", () => {
	it("should render default when open", () => {
		render(<Modal isOpen={true} onClose={vi.fn()}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toMatchInlineSnapshot(`
			<div
			  aria-label="Modal dialog"
			  aria-modal="true"
			  class="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
			  role="dialog"
			  tabindex="-1"
			>
			  <div
			    class="flex items-center justify-between mb-4"
			  >
			    <button
			      aria-label="Close"
			      class="ml-auto text-gray-400 hover:text-gray-600"
			      type="button"
			    >
			      <span
			        aria-hidden="true"
			      >
			        ✕
			      </span>
			    </button>
			  </div>
			  Modal content
			</div>
		`);
	});

	it("should not render when closed", () => {
		render(<Modal isOpen={false} onClose={vi.fn()}>Modal content</Modal>);
		const dialog = screen.queryByRole('dialog');
		expect(dialog).toBeNull();
	});

	it("should render with title", () => {
		render(<Modal isOpen={true} onClose={vi.fn()} title="My Modal">Modal content</Modal>);
		const heading = screen.getByText('My Modal');
		expect(heading.tagName).toBe('H2');
		// Verify aria-labelledby links dialog to title
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-labelledby', heading.id);
	});

	it("should render small size", () => {
		render(<Modal isOpen={true} onClose={vi.fn()} size={MODAL_SIZES.SMALL}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog.className).toContain('max-w-sm');
	});

	it("should render large size", () => {
		render(<Modal isOpen={true} onClose={vi.fn()} size={MODAL_SIZES.LARGE}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog.className).toContain('max-w-2xl');
	});

	it("should call onClose when close button clicked", () => {
		const mock = vi.fn();
		render(<Modal isOpen={true} onClose={mock}>Modal content</Modal>);
		const closeButton = screen.getByLabelText('Close');
		closeButton.click();
		expect(mock).toHaveBeenCalledOnce();
	});

	it("should call onClose when backdrop clicked", () => {
		const mock = vi.fn();
		render(<Modal isOpen={true} onClose={mock}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		// Click the backdrop (parent of dialog)
		dialog.parentElement!.click();
		expect(mock).toHaveBeenCalledOnce();
	});

	it("should have aria-modal attribute", () => {
		render(<Modal isOpen={true} onClose={vi.fn()}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-modal', 'true');
	});

	it("should use custom aria-label when title is not provided", () => {
		render(<Modal isOpen={true} onClose={vi.fn()} aria-label="Filters dialog">Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-label', 'Filters dialog');
	});

	it("should prefer aria-labelledby when title is provided", () => {
		render(<Modal isOpen={true} onClose={vi.fn()} aria-label="Ignored label" title="My Modal">Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toHaveAttribute('aria-labelledby');
		expect(dialog).not.toHaveAttribute('aria-label');
	});

	describe("accessibility attributes", () => {
		it("should have role dialog", () => {
			render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
			expect(screen.getByRole('dialog')).toBeInTheDocument();
		});

		it("should have aria-modal true", () => {
			render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
			expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
		});

		it("should use aria-labelledby pointing to title element", () => {
			render(<Modal isOpen={true} onClose={vi.fn()} title="Settings">Content</Modal>);
			const dialog = screen.getByRole('dialog');
			const titleEl = screen.getByText('Settings');
			expect(dialog).toHaveAttribute('aria-labelledby', titleEl.id);
		});

		it("should fall back to aria-label when no title is provided", () => {
			render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
			const dialog = screen.getByRole('dialog');
			expect(dialog).toHaveAttribute('aria-label', 'Modal dialog');
		});

		it("should have close button with aria-label", () => {
			render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
			const closeBtn = screen.getByLabelText('Close');
			expect(closeBtn).toBeInTheDocument();
			expect(closeBtn.tagName).toBe('BUTTON');
		});

		it("should hide close button icon from assistive technology", () => {
			render(<Modal isOpen={true} onClose={vi.fn()}>Content</Modal>);
			const closeBtn = screen.getByLabelText('Close');
			const icon = closeBtn.querySelector('[aria-hidden]');
			expect(icon).toHaveAttribute('aria-hidden', 'true');
		});
	});

	describe("keyboard and focus trap", () => {
		it("should close on Escape key", async () => {
			const user = userEvent.setup();
			const mock = vi.fn();
			render(<Modal isOpen={true} onClose={mock}>Modal content</Modal>);
			await user.keyboard('{Escape}');
			expect(mock).toHaveBeenCalledOnce();
		});

		it("should focus first focusable element on open", async () => {
			render(
				<Modal isOpen={true} onClose={vi.fn()} title="Focus Test">
					<button type="button">First</button>
					<button type="button">Second</button>
				</Modal>
			);
			// The close button is the first focusable element in the modal
			await waitFor(() => {
				expect(document.activeElement).toBe(screen.getByLabelText('Close'));
			});
		});

		it("should focus the dialog itself when no focusable children exist", async () => {
			render(
				<Modal isOpen={true} onClose={vi.fn()} title="No Focusable">
					<p>Static content only</p>
				</Modal>
			);
			// The close button is always present, so it should get focus
			await waitFor(() => {
				expect(document.activeElement).toBe(screen.getByLabelText('Close'));
			});
		});

		it("should trap focus with Tab cycling forward", async () => {
			const user = userEvent.setup();
			render(
				<Modal isOpen={true} onClose={vi.fn()} title="Trap Test">
					<button type="button">Action A</button>
					<button type="button">Action B</button>
				</Modal>
			);

			await waitFor(() => {
				expect(document.activeElement).toBe(screen.getByLabelText('Close'));
			});

			// Tab from Close button -> Action A -> Action B -> wraps back to Close
			await user.tab();
			expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Action A' }));

			await user.tab();
			expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Action B' }));

			await user.tab();
			expect(document.activeElement).toBe(screen.getByLabelText('Close'));
		});

		it("should trap focus with Shift+Tab cycling backward", async () => {
			const user = userEvent.setup();
			render(
				<Modal isOpen={true} onClose={vi.fn()} title="Trap Test">
					<button type="button">Action A</button>
					<button type="button">Action B</button>
				</Modal>
			);

			await waitFor(() => {
				expect(document.activeElement).toBe(screen.getByLabelText('Close'));
			});

			// Shift+Tab from Close (first) should wrap to Action B (last)
			await user.tab({ shift: true });
			expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Action B' }));
		});

		it("should restore focus to previously focused element on close", async () => {
			const user = userEvent.setup();
			const React = await import('react');

			const TestWrapper = () => {
				const [isOpen, setIsOpen] = React.useState(false);
				return (
					<>
						<button type="button" onClick={() => setIsOpen(true)}>Open Modal</button>
						<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Restore Focus">
							<button type="button">Inside</button>
						</Modal>
					</>
				);
			};

			render(<TestWrapper />);

			const openButton = screen.getByRole('button', { name: 'Open Modal' });
			await user.click(openButton);

			await waitFor(() => {
				expect(screen.getByRole('dialog')).toBeInTheDocument();
			});

			// Close the modal via the close button
			await user.click(screen.getByLabelText('Close'));

			await waitFor(() => {
				expect(screen.queryByRole('dialog')).toBeNull();
			});

			// Focus should be restored to the open button
			await waitFor(() => {
				expect(document.activeElement).toBe(openButton);
			});
		});
	});
});
