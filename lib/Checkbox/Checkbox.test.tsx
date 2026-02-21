import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox, CHECKBOX_VARIANTS } from "./Checkbox";

describe("Component: Checkbox", () => {
	it("should render default", () => {
		render(<Checkbox label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-orange-600"
			  type="checkbox"
			/>
		`);
	});

	it("should render with default variant", () => {
		render(<Checkbox variant={CHECKBOX_VARIANTS.DEFAULT} label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-orange-600"
			  type="checkbox"
			/>
		`);
	});

	it("should render disabled", () => {
		render(<Checkbox disabled label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-orange-600"
			  disabled=""
			  type="checkbox"
			/>
		`);
	});

	it("should render label text", () => {
		render(<Checkbox label="Accept terms" />);
		const label = screen.getByText('Accept terms')
		expect(label).toMatchInlineSnapshot(`
			<span
			  class="text-gray-700"
			>
			  Accept terms
			</span>
		`);
	});

	it("should call onChange", () => {
		const mock = vi.fn()
		render(<Checkbox onChange={mock} label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		fireEvent.click(element)
		expect(mock).toHaveBeenCalledOnce()
	});

	it("should pass id and name props", () => {
		render(<Checkbox id="my-checkbox" name="my-name" label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toHaveAttribute('id', 'my-checkbox')
		expect(element).toHaveAttribute('name', 'my-name')
	});
});
