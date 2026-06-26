import { render, screen } from "@testing-library/react";
import { Card, CARD_VARIANTS } from "./Card";

describe("Component: Card", () => {
	it("should render default", () => {
		render(<Card>Card content</Card>);
		const article = screen.getByRole('article')
		expect(article).toMatchInlineSnapshot(`
			<article
			  class="bg-surface rounded shadow-sm"
			>
			  <div
			    class="p-4"
			  >
			    Card content
			  </div>
			</article>
		`);
	});

	it("should render outlined variant", () => {
		render(<Card variant={CARD_VARIANTS.OUTLINED}>Card content</Card>);
		const article = screen.getByRole('article')
		expect(article).toMatchInlineSnapshot(`
			<article
			  class="border border-border rounded"
			>
			  <div
			    class="p-4"
			  >
			    Card content
			  </div>
			</article>
		`);
	});

	it("should render elevated variant", () => {
		render(<Card variant={CARD_VARIANTS.ELEVATED}>Card content</Card>);
		const article = screen.getByRole('article')
		expect(article).toMatchInlineSnapshot(`
			<article
			  class="bg-surface rounded shadow-lg"
			>
			  <div
			    class="p-4"
			  >
			    Card content
			  </div>
			</article>
		`);
	});

	it("should render with header", () => {
		render(<Card header="Card Header">Card content</Card>);
		const header = screen.getByText('Card Header')
		expect(header).toMatchInlineSnapshot(`
			<header
			  class="p-4 border-b border-border"
			>
			  Card Header
			</header>
		`);
	});

	it("should render with footer", () => {
		render(<Card footer="Card Footer">Card content</Card>);
		const footer = screen.getByText('Card Footer')
		expect(footer).toMatchInlineSnapshot(`
			<footer
			  class="p-4 border-t border-border"
			>
			  Card Footer
			</footer>
		`);
	});

	it("should render with header and footer", () => {
		render(<Card header="Header" footer="Footer">Body</Card>);
		const article = screen.getByRole('article')
		expect(article).toMatchInlineSnapshot(`
			<article
			  class="bg-surface rounded shadow-sm"
			>
			  <header
			    class="p-4 border-b border-border"
			  >
			    Header
			  </header>
			  <div
			    class="p-4"
			  >
			    Body
			  </div>
			  <footer
			    class="p-4 border-t border-border"
			  >
			    Footer
			  </footer>
			</article>
		`);
	});
});
