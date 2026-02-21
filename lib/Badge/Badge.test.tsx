import { render, screen } from "@testing-library/react";
import { Badge, BADGE_VARIANTS } from "./Badge";

describe("Component: Badge", () => {
	it("should render default", () => {
		render(<Badge>Default</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800"
			  role="status"
			>
			  Default
			</span>
		`);
	});

	it("should render primary variant", () => {
		render(<Badge variant={BADGE_VARIANTS.PRIMARY}>Primary</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-orange-100 text-orange-800"
			  role="status"
			>
			  Primary
			</span>
		`);
	});

	it("should render success variant", () => {
		render(<Badge variant={BADGE_VARIANTS.SUCCESS}>Success</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-green-100 text-green-800"
			  role="status"
			>
			  Success
			</span>
		`);
	});

	it("should render warning variant", () => {
		render(<Badge variant={BADGE_VARIANTS.WARNING}>Warning</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800"
			  role="status"
			>
			  Warning
			</span>
		`);
	});

	it("should render danger variant", () => {
		render(<Badge variant={BADGE_VARIANTS.DANGER}>Danger</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-red-100 text-red-800"
			  role="status"
			>
			  Danger
			</span>
		`);
	});
});
