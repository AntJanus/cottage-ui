import { render, screen } from "@testing-library/react";
import { Label, LABEL_VARIANTS } from "./Label";

describe("Component: Label", () => {
	it("should render default", () => {
		render(<Label>Username</Label>);
		const label = screen.getByText('Username');
		expect(label).toMatchInlineSnapshot(`
			<label
			  class="text-gray-700 font-medium text-sm"
			>
			  Username
			</label>
		`);
	});

	it("should render required variant", () => {
		render(<Label variant={LABEL_VARIANTS.REQUIRED}>Email</Label>);
		const label = screen.getByText('Email');
		expect(label.closest('label')).toMatchInlineSnapshot(`
			<label
			  class="text-gray-800 font-semibold text-sm"
			>
			  Email
			  <span
			    aria-hidden="true"
			    class="text-red-500 ml-1"
			  >
			    *
			  </span>
			  <span
			    class="sr-only"
			  >
			    (required)
			  </span>
			</label>
		`);
	});

	it("should render with htmlFor", () => {
		render(<Label htmlFor="username-input">Username</Label>);
		const label = screen.getByText('Username');
		expect(label).toHaveAttribute('for', 'username-input');
	});

	it("should have screen reader text for required variant", () => {
		render(<Label variant={LABEL_VARIANTS.REQUIRED}>Email</Label>);
		const srText = screen.getByText('(required)');
		expect(srText).toHaveClass('sr-only');
	});

	describe("accessibility", () => {
		it("should render as a label element for form association", () => {
			render(<Label>Username</Label>);
			const label = screen.getByText('Username');
			expect(label.tagName).toBe('LABEL');
		});

		it("should support htmlFor to associate with form controls", () => {
			render(<Label htmlFor="email-field">Email</Label>);
			const label = screen.getByText('Email');
			expect(label).toHaveAttribute('for', 'email-field');
		});

		it("should hide asterisk from assistive technology in required variant", () => {
			render(<Label variant={LABEL_VARIANTS.REQUIRED}>Email</Label>);
			const asterisk = screen.getByText('*');
			expect(asterisk).toHaveAttribute('aria-hidden', 'true');
		});

		it("should provide screen reader text for required indicator", () => {
			render(<Label variant={LABEL_VARIANTS.REQUIRED}>Email</Label>);
			const srText = screen.getByText('(required)');
			expect(srText).toHaveClass('sr-only');
		});

		it("should not show required indicator for default variant", () => {
			render(<Label>Username</Label>);
			expect(screen.queryByText('*')).toBeNull();
			expect(screen.queryByText('(required)')).toBeNull();
		});
	});
});
