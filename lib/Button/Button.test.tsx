import { render, screen } from "@testing-library/react";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "./Button";

describe("Component: Button", () => {
  it("should render default", () => {
    render(<Button>My button</Button>);

    const button = screen.getByRole('button')

    expect(button).toMatchInlineSnapshot(`
      <button
        class="rounded p-2 bg-neutral hover:bg-neutral-hover text-neutral-foreground "
        type="button"
      >
        My button
      </button>
    `);
  });

  it("should render primary button", () => {
    render(<Button variant={BUTTON_VARIANTS.PRIMARY}>My button</Button>);

    const button = screen.getByRole('button')

    expect(button).toMatchInlineSnapshot(`
      <button
        class="rounded p-2 bg-primary hover:bg-primary-hover text-primary-foreground "
        type="button"
      >
        My button
      </button>
    `);
  });

  it("should render large button", () => {
    render(<Button size={BUTTON_SIZES.LARGE}>My button</Button>);
    const button = screen.getByRole('button')

    expect(button).toMatchInlineSnapshot(`
      <button
        class="rounded p-2 bg-neutral hover:bg-neutral-hover text-neutral-foreground text-lg"
        type="button"
      >
        My button
      </button>
    `);
  });

  it("should click", () => {
    const mock = vi.fn()

    render(<Button size={BUTTON_SIZES.LARGE} onClick={mock}>My button</Button>);

    const button = screen.getByRole('button')

    button.click()

    expect(mock).toHaveBeenCalledOnce()
  });

  it("should support custom type", () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  });

  describe("accessibility", () => {
    it("should default type to button to prevent accidental form submission", () => {
      render(<Button>Click me</Button>);
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'button')
    });

    it("should pass through aria-label", () => {
      render(<Button aria-label="Close dialog">X</Button>);
      const button = screen.getByRole('button', { name: 'Close dialog' })
      expect(button).toBeInTheDocument()
    });

    it("should pass through aria-disabled", () => {
      render(<Button aria-disabled="true">Click me</Button>);
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    });

    it("should support disabled attribute", () => {
      render(<Button disabled>Click me</Button>);
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    });

    it("should derive accessible name from text content", () => {
      render(<Button>Save changes</Button>);
      const button = screen.getByRole('button', { name: 'Save changes' })
      expect(button).toBeInTheDocument()
    });
  });
});
