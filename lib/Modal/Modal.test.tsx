import { render, screen } from "@testing-library/react";
import { Modal, MODAL_SIZES } from "./Modal";

describe("Component: Modal", () => {
	it("should render default when open", () => {
		render(<Modal isOpen={true} onClose={vi.fn()}>Modal content</Modal>);
		const dialog = screen.getByRole('dialog');
		expect(dialog).toMatchInlineSnapshot(`
			<div
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
});
