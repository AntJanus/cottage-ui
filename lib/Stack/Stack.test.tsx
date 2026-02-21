import { render, screen } from "@testing-library/react";
import { Stack, STACK_DIRECTIONS, STACK_GAPS } from "./Stack";

describe("Component: Stack", () => {
	it("should render default (vertical, default gap)", () => {
		render(<Stack><span>Child 1</span><span>Child 2</span></Stack>);
		const element = screen.getByText('Child 1').parentElement!
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="flex flex-col gap-3"
			>
			  <span>
			    Child 1
			  </span>
			  <span>
			    Child 2
			  </span>
			</div>
		`);
	});

	it("should render horizontal direction", () => {
		render(<Stack direction={STACK_DIRECTIONS.HORIZONTAL}><span>Child 1</span><span>Child 2</span></Stack>);
		const element = screen.getByText('Child 1').parentElement!
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="flex flex-row gap-3"
			>
			  <span>
			    Child 1
			  </span>
			  <span>
			    Child 2
			  </span>
			</div>
		`);
	});

	it("should render vertical direction", () => {
		render(<Stack direction={STACK_DIRECTIONS.VERTICAL}><span>Child 1</span><span>Child 2</span></Stack>);
		const element = screen.getByText('Child 1').parentElement!
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="flex flex-col gap-3"
			>
			  <span>
			    Child 1
			  </span>
			  <span>
			    Child 2
			  </span>
			</div>
		`);
	});

	it("should render small gap", () => {
		render(<Stack gap={STACK_GAPS.SMALL}><span>Child 1</span><span>Child 2</span></Stack>);
		const element = screen.getByText('Child 1').parentElement!
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="flex flex-col gap-1"
			>
			  <span>
			    Child 1
			  </span>
			  <span>
			    Child 2
			  </span>
			</div>
		`);
	});

	it("should render large gap", () => {
		render(<Stack gap={STACK_GAPS.LARGE}><span>Child 1</span><span>Child 2</span></Stack>);
		const element = screen.getByText('Child 1').parentElement!
		expect(element).toMatchInlineSnapshot(`
			<div
			  class="flex flex-col gap-6"
			>
			  <span>
			    Child 1
			  </span>
			  <span>
			    Child 2
			  </span>
			</div>
		`);
	});
});
