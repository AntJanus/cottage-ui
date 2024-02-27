import { render } from '@testing-library/react'
import { Button } from './Button'

describe(Button.name, () => {
  it('should render', () => {
    const { container } = render(<Button>My Button</Button>)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="bg-red-700"
        >
          My Button
        </button>
      </div>
    `)
  })
})
