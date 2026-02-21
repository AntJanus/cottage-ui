import { render, screen } from "@testing-library/react";
import { Divider, DIVIDER_ORIENTATIONS } from "./Divider";

describe("Component: Divider", () => {
	it("should render default (horizontal)", () => {
		render(<Divider />);
		const divider = screen.getByRole('separator');
		expect(divider).toMatchInlineSnapshot(`
			<hr
			  class="border-t border-gray-200 my-4"
			/>
		`);
	});

	it("should render horizontal orientation", () => {
		render(<Divider orientation={DIVIDER_ORIENTATIONS.HORIZONTAL} />);
		const divider = screen.getByRole('separator');
		expect(divider).toMatchInlineSnapshot(`
			<hr
			  class="border-t border-gray-200 my-4"
			/>
		`);
	});

	it("should render vertical orientation", () => {
		render(<Divider orientation={DIVIDER_ORIENTATIONS.VERTICAL} />);
		const divider = screen.getByRole('separator');
		expect(divider).toHaveAttribute('aria-orientation', 'vertical');
		expect(divider).toMatchInlineSnapshot(`
			<div
			  aria-orientation="vertical"
			  class="border-l border-gray-200 mx-4 self-stretch"
			  role="separator"
			/>
		`);
	});
});
