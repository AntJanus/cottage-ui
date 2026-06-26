import { fireEvent, render, screen } from "@testing-library/react";
import { Checkbox, CHECKBOX_VARIANTS } from "./Checkbox";

describe("Component: Checkbox", () => {
	it("should render default", () => {
		render(<Checkbox label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-primary"
			  type="checkbox"
			/>
		`);
	});

	it("should render with default variant", () => {
		render(<Checkbox variant={CHECKBOX_VARIANTS.DEFAULT} label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-primary"
			  type="checkbox"
			/>
		`);
	});

	it("should render disabled", () => {
		render(<Checkbox disabled label="Accept terms" />);
		const element = screen.getByRole('checkbox')
		expect(element).toMatchInlineSnapshot(`
			<input
			  class="accent-primary"
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
			  class="text-foreground"
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

	describe("accessibility", () => {
		it("should derive accessible name from wrapping label text", () => {
			render(<Checkbox label="Accept terms" />);
			const element = screen.getByRole('checkbox', { name: 'Accept terms' })
			expect(element).toBeInTheDocument()
		});

		it("should pass through aria-label when no label prop is given", () => {
			render(<Checkbox aria-label="Toggle dark mode" />);
			const element = screen.getByRole('checkbox', { name: 'Toggle dark mode' })
			expect(element).toBeInTheDocument()
		});

		it("should pass through aria-describedby", () => {
			render(
				<>
					<Checkbox label="Accept terms" aria-describedby="terms-help" />
					<span id="terms-help">You must accept to continue</span>
				</>
			);
			const element = screen.getByRole('checkbox')
			expect(element).toHaveAttribute('aria-describedby', 'terms-help')
		});

		it("should pass through required attribute", () => {
			render(<Checkbox label="Accept terms" required />);
			const element = screen.getByRole('checkbox')
			expect(element).toBeRequired()
		});

		it("should have the checkbox wrapped in a label element", () => {
			render(<Checkbox label="Accept terms" />);
			const element = screen.getByRole('checkbox')
			expect(element.closest('label')).not.toBeNull()
		});
	});
});
