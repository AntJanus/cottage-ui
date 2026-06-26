import { render, screen } from "@testing-library/react";
import { Avatar, AVATAR_SIZES } from "./Avatar";

describe("Component: Avatar", () => {
	it("should render default with initials", () => {
		render(<Avatar name="John Doe" />);
		const avatar = screen.getByRole('img', { name: 'John Doe' });
		expect(avatar).toMatchInlineSnapshot(`
			<div
			  aria-label="John Doe"
			  class="rounded-full overflow-hidden flex items-center justify-center bg-primary-soft text-primary-strong font-medium h-10 w-10 text-sm"
			  role="img"
			>
			  JD
			</div>
		`);
	});

	it("should render single name initial", () => {
		render(<Avatar name="John" />);
		const avatar = screen.getByRole('img', { name: 'John' });
		expect(avatar).toMatchInlineSnapshot(`
			<div
			  aria-label="John"
			  class="rounded-full overflow-hidden flex items-center justify-center bg-primary-soft text-primary-strong font-medium h-10 w-10 text-sm"
			  role="img"
			>
			  J
			</div>
		`);
	});

	it("should render with image", () => {
		render(<Avatar name="John Doe" src="https://example.com/avatar.jpg" alt="John Doe" />);
		const img = screen.getByRole('img', { name: 'John Doe' });
		expect(img).toMatchInlineSnapshot(`
			<img
			  alt="John Doe"
			  class="h-full w-full object-cover"
			  src="https://example.com/avatar.jpg"
			/>
		`);
	});

	it("should render small size", () => {
		render(<Avatar name="John Doe" size={AVATAR_SIZES.SMALL} />);
		const avatar = screen.getByRole('img', { name: 'John Doe' });
		expect(avatar).toMatchInlineSnapshot(`
			<div
			  aria-label="John Doe"
			  class="rounded-full overflow-hidden flex items-center justify-center bg-primary-soft text-primary-strong font-medium h-8 w-8 text-xs"
			  role="img"
			>
			  JD
			</div>
		`);
	});

	it("should render large size", () => {
		render(<Avatar name="John Doe" size={AVATAR_SIZES.LARGE} />);
		const avatar = screen.getByRole('img', { name: 'John Doe' });
		expect(avatar).toMatchInlineSnapshot(`
			<div
			  aria-label="John Doe"
			  class="rounded-full overflow-hidden flex items-center justify-center bg-primary-soft text-primary-strong font-medium h-14 w-14 text-lg"
			  role="img"
			>
			  JD
			</div>
		`);
	});
});
