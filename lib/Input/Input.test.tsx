import { fireEvent, render, screen } from "@testing-library/react";
import { Input, INPUT_SIZES, INPUT_VARIANTS } from "./Input";

describe("Component: Input", () => {
	it("should render default", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toMatchInlineSnapshot(`
			<input
			  class="rounded border focus:outline-none focus:ring-2 border-border-strong focus:ring-primary focus:border-primary p-2"
			  placeholder="Enter text"
			  type="text"
			/>
		`);
	});

	it("should render error variant", () => {
		render(<Input variant={INPUT_VARIANTS.ERROR} placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toMatchInlineSnapshot(`
			<input
			  aria-invalid="true"
			  class="rounded border focus:outline-none focus:ring-2 border-error focus:ring-error focus:border-error p-2"
			  placeholder="Enter text"
			  type="text"
			/>
		`);
	});

	it("should render large size", () => {
		render(<Input size={INPUT_SIZES.LARGE} placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toMatchInlineSnapshot(`
			<input
			  class="rounded border focus:outline-none focus:ring-2 border-border-strong focus:ring-primary focus:border-primary text-lg p-3"
			  placeholder="Enter text"
			  type="text"
			/>
		`);
	});

	it("should render disabled", () => {
		render(<Input disabled placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toMatchInlineSnapshot(`
			<input
			  class="rounded border focus:outline-none focus:ring-2 border-border-strong focus:ring-primary focus:border-primary p-2 opacity-50"
			  disabled=""
			  placeholder="Enter text"
			  type="text"
			/>
		`);
	});

	it("should handle onChange", () => {
		const mock = vi.fn()
		render(<Input onChange={mock} placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'hello' } })
		expect(mock).toHaveBeenCalledOnce()
	});

	it("should set aria-invalid on error variant", () => {
		render(<Input variant={INPUT_VARIANTS.ERROR} placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toHaveAttribute('aria-invalid', 'true')
	});

	it("should not set aria-invalid on default variant", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).not.toHaveAttribute('aria-invalid')
	});

	it("should pass id and name props", () => {
		render(<Input id="my-input" name="my-name" placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toHaveAttribute('id', 'my-input')
		expect(input).toHaveAttribute('name', 'my-name')
	});

	describe("accessibility", () => {
		it("should pass through aria-label", () => {
			render(<Input aria-label="Search query" />);
			const input = screen.getByRole('textbox', { name: 'Search query' })
			expect(input).toBeInTheDocument()
		});

		it("should pass through aria-describedby for error messages", () => {
			render(
				<>
					<Input variant={INPUT_VARIANTS.ERROR} aria-describedby="email-error" />
					<span id="email-error">Email is required</span>
				</>
			);
			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-invalid', 'true')
			expect(input).toHaveAttribute('aria-describedby', 'email-error')
		});

		it("should pass through aria-required", () => {
			render(<Input aria-required="true" placeholder="Required field" />);
			const input = screen.getByRole('textbox')
			expect(input).toHaveAttribute('aria-required', 'true')
		});

		it("should pass through required attribute", () => {
			render(<Input required placeholder="Required field" />);
			const input = screen.getByRole('textbox')
			expect(input).toBeRequired()
		});

		it("should be associable with a label via id", () => {
			render(
				<>
					<label htmlFor="email-input">Email</label>
					<Input id="email-input" />
				</>
			);
			const input = screen.getByRole('textbox', { name: 'Email' })
			expect(input).toBeInTheDocument()
		});
	});
});
