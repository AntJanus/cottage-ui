import { fireEvent, render, screen } from "@testing-library/react";
import { TextArea, TEXTAREA_VARIANTS } from "./TextArea";

describe("Component: TextArea", () => {
	it("should render default", () => {
		render(<TextArea placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).toMatchInlineSnapshot(`
			<textarea
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			  placeholder="Enter text"
			  rows="3"
			/>
		`);
	});

	it("should render error variant", () => {
		render(<TextArea variant={TEXTAREA_VARIANTS.ERROR} placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).toMatchInlineSnapshot(`
			<textarea
			  aria-invalid="true"
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-red-500 focus:ring-red-500 focus:border-red-500"
			  placeholder="Enter text"
			  rows="3"
			/>
		`);
	});

	it("should render disabled", () => {
		render(<TextArea disabled placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).toMatchInlineSnapshot(`
			<textarea
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 opacity-50"
			  disabled=""
			  placeholder="Enter text"
			  rows="3"
			/>
		`);
	});

	it("should render with custom rows", () => {
		render(<TextArea rows={5} placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).toMatchInlineSnapshot(`
			<textarea
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			  placeholder="Enter text"
			  rows="5"
			/>
		`);
	});

	it("should call onChange", () => {
		const mock = vi.fn()
		render(<TextArea onChange={mock} placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		fireEvent.change(element, { target: { value: 'hello' } })
		expect(mock).toHaveBeenCalledOnce()
	});

	it("should set aria-invalid on error variant", () => {
		render(<TextArea variant={TEXTAREA_VARIANTS.ERROR} placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).toHaveAttribute('aria-invalid', 'true')
	});

	it("should not set aria-invalid on default variant", () => {
		render(<TextArea placeholder="Enter text" />);
		const element = screen.getByRole('textbox')
		expect(element).not.toHaveAttribute('aria-invalid')
	});
});
