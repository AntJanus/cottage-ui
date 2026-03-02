# Cottage UI

A React component library built with TypeScript, TailwindCSS, and Vite. Created as part of the [Build A React UI Library series](https://www.youtube.com/playlist?list=PLcfAVClOb1BiA6oIfHQ6Am3lpWzOmMO6J).

## Demo

![Cottage UI Components](docs/demo.png)

## Features

- TypeScript-first component library
- TailwindCSS utility styling
- ESM + UMD bundles
- Vitest + React Testing Library coverage
- Storybook docs with `@storybook/react-vite`
- Bundled type declarations

## Installation

```bash
npm install cottage-ui
```

## Usage

```tsx
import { Button, BUTTON_VARIANTS, BUTTON_SIZES } from 'cottage-ui'
import 'cottage-ui/dist/cottage-ui.css'

function App() {
	return (
		<Button
			variant={BUTTON_VARIANTS.PRIMARY}
			size={BUTTON_SIZES.LARGE}
			onClick={() => console.log('Clicked!')}
		>
			Click me
		</Button>
	)
}
```

## Development

This repo uses npm.

```bash
npm install
npm run dev
npm run storybook
npm run lint
npm run test -- --run
npm run build
```

## Project Layout

```
cottage-ui/
├── lib/                  # Published library source
├── src/                  # Local demo app
├── .storybook/           # Storybook config
└── dist/                 # Build outputs
```

## Contributing

1. Add or update code in `lib/`
2. Add/adjust tests and stories
3. Export new APIs in `lib/main.ts`
4. Run lint, tests, and build before opening a PR

## Documentation

- [AGENTS.md](AGENTS.md) - Agent and component architecture conventions
- [CLAUDE.md](CLAUDE.md) - AI coding-agent guidance
- [CREATE_COMPONENT_PROMPT.md](CREATE_COMPONENT_PROMPT.md) - Step-by-step component creation workflow
- [lib/README.md](lib/README.md) - Library directory-specific guidance

## License

See `package.json`.
