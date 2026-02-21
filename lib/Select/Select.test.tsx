import { fireEvent, render, screen } from "@testing-library/react";
import { Select, SELECT_VARIANTS } from "./Select";

const mockOptions = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' }
];

describe("Component: Select", () => {
	it("should render default", () => {
		render(<Select options={mockOptions} />);
		const select = screen.getByRole('combobox')
		expect(select).toMatchInlineSnapshot(`
			<select
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			>
			  <option
			    value="a"
			  >
			    Option A
			  </option>
			  <option
			    value="b"
			  >
			    Option B
			  </option>
			  <option
			    value="c"
			  >
			    Option C
			  </option>
			</select>
		`);
	});

	it("should render error variant", () => {
		render(<Select options={mockOptions} variant={SELECT_VARIANTS.ERROR} />);
		const select = screen.getByRole('combobox')
		expect(select).toMatchInlineSnapshot(`
			<select
			  aria-invalid="true"
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-red-500 focus:ring-red-500 focus:border-red-500"
			>
			  <option
			    value="a"
			  >
			    Option A
			  </option>
			  <option
			    value="b"
			  >
			    Option B
			  </option>
			  <option
			    value="c"
			  >
			    Option C
			  </option>
			</select>
		`);
	});

	it("should render with placeholder", () => {
		render(<Select options={mockOptions} placeholder="Select an option" />);
		const select = screen.getByRole('combobox')
		expect(select).toMatchInlineSnapshot(`
			<select
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
			>
			  <option
			    disabled=""
			    value=""
			  >
			    Select an option
			  </option>
			  <option
			    value="a"
			  >
			    Option A
			  </option>
			  <option
			    value="b"
			  >
			    Option B
			  </option>
			  <option
			    value="c"
			  >
			    Option C
			  </option>
			</select>
		`);
	});

	it("should render disabled", () => {
		render(<Select options={mockOptions} disabled />);
		const select = screen.getByRole('combobox')
		expect(select).toBeDisabled();
		expect(select).toMatchInlineSnapshot(`
			<select
			  class="rounded border p-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 opacity-50"
			  disabled=""
			>
			  <option
			    value="a"
			  >
			    Option A
			  </option>
			  <option
			    value="b"
			  >
			    Option B
			  </option>
			  <option
			    value="c"
			  >
			    Option C
			  </option>
			</select>
		`);
	});

	it("should handle onChange", () => {
		const mock = vi.fn()
		render(<Select options={mockOptions} onChange={mock} />);
		const select = screen.getByRole('combobox')
		fireEvent.change(select, { target: { value: 'b' } })
		expect(mock).toHaveBeenCalledOnce()
	});

	it("should set aria-invalid on error variant", () => {
		render(<Select options={mockOptions} variant={SELECT_VARIANTS.ERROR} />);
		const select = screen.getByRole('combobox')
		expect(select).toHaveAttribute('aria-invalid', 'true')
	});

	it("should not set aria-invalid on default variant", () => {
		render(<Select options={mockOptions} />);
		const select = screen.getByRole('combobox')
		expect(select).not.toHaveAttribute('aria-invalid')
	});
});
