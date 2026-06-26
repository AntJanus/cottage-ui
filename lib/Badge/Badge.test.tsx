import { render, screen } from "@testing-library/react";
import { Badge, BADGE_VARIANTS } from "./Badge";

describe("Component: Badge", () => {
	it("should render default", () => {
		render(<Badge>Default</Badge>);
		const badge = screen.getByRole('status')
		expect(badge).toMatchInlineSnapshot(`
			<span
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-neutral-soft text-neutral-strong"
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
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-primary-soft text-primary-strong"
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
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-success-soft text-success-strong"
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
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-warning-soft text-warning-strong"
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
			  class="inline-block rounded-full px-3 py-1 text-sm font-medium bg-error-soft text-error-strong"
			  role="status"
			>
			  Danger
			</span>
		`);
	});
});
