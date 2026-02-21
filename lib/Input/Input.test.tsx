import { fireEvent, render, screen } from "@testing-library/react";
import { Input, INPUT_SIZES, INPUT_VARIANTS } from "./Input";

describe("Component: Input", () => {
	it("should render default", () => {
		render(<Input placeholder="Enter text" />);
		const input = screen.getByRole('textbox')
		expect(input).toMatchInlineSnapshot(`
			<input
			  class="rounded border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2"
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
			  class="rounded border focus:outline-none focus:ring-2 border-red-500 focus:ring-red-500 focus:border-red-500 p-2"
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
			  class="rounded border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-lg p-3"
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
			  class="rounded border focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2 opacity-50"
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
});
