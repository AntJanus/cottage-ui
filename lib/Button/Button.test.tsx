import { render, screen } from "@testing-library/react";
import { Button, BUTTON_SIZES, BUTTON_VARIANTS } from "./Button";

describe("Component: Button", () => {
  it("should render default", () => {
    render(<Button>My button</Button>);

    const button = screen.getByRole('button')

    expect(button).toMatchInlineSnapshot(`
      <button
        class="rounded p-2 bg-gray-700 hover:bg-gray-800 text-white "
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
        class="rounded p-2 bg-orange-700 hover:bg-orange-500 text-white "
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
        class="rounded p-2 bg-gray-700 hover:bg-gray-800 text-white text-lg"
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
});
