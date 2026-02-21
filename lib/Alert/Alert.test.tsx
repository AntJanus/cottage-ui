import { render, screen } from "@testing-library/react";
import { Alert, ALERT_VARIANTS } from "./Alert";

describe("Component: Alert", () => {
	it("should render default", () => {
		render(<Alert>This is an alert</Alert>);
		const element = screen.getByRole('alert')
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="rounded p-4 border-l-4 bg-blue-50 border-blue-500 text-blue-800"
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
			  class="rounded p-4 border-l-4 bg-blue-50 border-blue-500 text-blue-800"
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
			  class="rounded p-4 border-l-4 bg-green-50 border-green-500 text-green-800"
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
			  class="rounded p-4 border-l-4 bg-yellow-50 border-yellow-500 text-yellow-800"
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
			  class="rounded p-4 border-l-4 bg-red-50 border-red-500 text-red-800"
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
			  class="rounded p-4 border-l-4 bg-blue-50 border-blue-500 text-blue-800"
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
});
