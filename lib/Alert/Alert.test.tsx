import { render, screen } from "@testing-library/react";
import { Alert, ALERT_VARIANTS } from "./Alert";

describe("Component: Alert", () => {
	it("should render default", () => {
		render(<Alert>This is an alert</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-info-soft border-info text-info-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      This is an alert
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render info variant", () => {
		render(<Alert variant={ALERT_VARIANTS.INFO}>Info message</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-info-soft border-info text-info-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      Info message
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render success variant", () => {
		render(<Alert variant={ALERT_VARIANTS.SUCCESS}>Success message</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-success-soft border-success text-success-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      Success message
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render warning variant", () => {
		render(<Alert variant={ALERT_VARIANTS.WARNING}>Warning message</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-warning-soft border-warning text-warning-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      Warning message
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render error variant", () => {
		render(<Alert variant={ALERT_VARIANTS.ERROR}>Error message</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-error-soft border-error text-error-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      Error message
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render with title", () => {
		render(<Alert title="Alert Title">Alert body</Alert>);
		const title = screen.getByText('Alert Title')
		expect(title.tagName).toBe('STRONG')
		expect(screen.getByRole('alert')).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-info-soft border-info text-info-strong"
			  role="alert"
			>
			  <div
			    class="flex justify-between"
			  >
			    <div>
			      <strong
			        class="block font-bold"
			      >
			        Alert Title
			      </strong>
			      Alert body
			    </div>
			  </div>
			</div>
		`);
	});

	it("should render dismiss button and call onDismiss", () => {
		const mock = vi.fn()
		render(<Alert onDismiss={mock}>Dismissable alert</Alert>);
		const button = screen.getByRole('button', { name: 'Dismiss' })
		button.click()
		expect(mock).toHaveBeenCalledOnce()
	});

	describe("accessibility", () => {
		it("should have role alert for live region semantics", () => {
			render(<Alert>Important message</Alert>);
			const element = screen.getByRole('alert')
			expect(element).toBeInTheDocument()
		});

		it("should have dismiss button with aria-label", () => {
			render(<Alert onDismiss={vi.fn()}>Dismissable</Alert>);
			const button = screen.getByRole('button', { name: 'Dismiss' })
			expect(button).toHaveAttribute('aria-label', 'Dismiss')
		});

		it("should hide dismiss X icon from assistive technology", () => {
			render(<Alert onDismiss={vi.fn()}>Dismissable</Alert>);
			const button = screen.getByRole('button', { name: 'Dismiss' })
			const icon = button.querySelector('[aria-hidden]')
			expect(icon).toHaveAttribute('aria-hidden', 'true')
		});

		it("should pass through aria-label for custom announcement", () => {
			render(<Alert aria-label="Critical error notification">Error occurred</Alert>);
			const element = screen.getByRole('alert')
			expect(element).toHaveAttribute('aria-label', 'Critical error notification')
		});
	});
});
