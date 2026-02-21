import { render, screen } from "@testing-library/react";
import { Spinner, SPINNER_SIZES } from "./Spinner";

describe("Component: Spinner", () => {
	it("should render default", () => {
		render(<Spinner />);
		const spinner = screen.getByRole('status');
		expect(spinner).toMatchInlineSnapshot(`
			<div
			  aria-label="Loading"
			  role="status"
			>
			  <div
			    class="rounded-full border-2 border-gray-200 border-t-orange-600 animate-spin h-8 w-8"
			  />
			</div>
		`);
	});

	it("should render small size", () => {
		render(<Spinner size={SPINNER_SIZES.SMALL} />);
		const spinner = screen.getByRole('status');
		expect(spinner).toMatchInlineSnapshot(`
			<div
			  aria-label="Loading"
			  role="status"
			>
			  <div
			    class="rounded-full border-2 border-gray-200 border-t-orange-600 animate-spin h-4 w-4"
			  />
			</div>
		`);
	});

	it("should render large size", () => {
		render(<Spinner size={SPINNER_SIZES.LARGE} />);
		const spinner = screen.getByRole('status');
		expect(spinner).toMatchInlineSnapshot(`
			<div
			  aria-label="Loading"
			  role="status"
			>
			  <div
			    class="rounded-full border-2 border-gray-200 border-t-orange-600 animate-spin h-12 w-12"
			  />
			</div>
		`);
	});

	it("should have accessible label", () => {
		render(<Spinner />);
		const spinner = screen.getByRole('status');
		expect(spinner).toHaveAttribute('aria-label', 'Loading');
	});

	it("should render with custom label", () => {
		render(<Spinner label="Processing" />);
		const spinner = screen.getByRole('status');
		expect(spinner).toHaveAttribute('aria-label', 'Processing');
	});
});
