import type { Preview, Decorator } from "@storybook/react-vite";
import { useEffect, type ReactNode } from "react";

import '../lib/tailwind.css'

// Set the attributes on the document root as well as the story wrapper so
// portal-rendered components (e.g. Modal) pick up the active theme too.
function ThemeWrapper({ theme, mode, children }: { theme: string; mode: string; children: ReactNode }) {
	useEffect(() => {
		const root = document.documentElement;
		root.dataset.theme = theme;
		root.dataset.mode = mode;
	}, [theme, mode]);

	return (
		<div data-theme={theme} data-mode={mode} className="bg-background text-foreground p-6">
			{children}
		</div>
	);
}

// Drive the theme/mode from the toolbar globals.
const withTheme: Decorator = (Story, context) => (
	<ThemeWrapper theme={context.globals.theme} mode={context.globals.mode}>
		<Story />
	</ThemeWrapper>
);

const preview: Preview = {
	decorators: [withTheme],
	globalTypes: {
		theme: {
			description: 'Cottage UI color theme',
			toolbar: {
				title: 'Theme',
				icon: 'paintbrush',
				items: [
					{ value: 'cottage', title: 'AJ Cottage' },
					{ value: 'graphite', title: 'Graphite' },
					{ value: 'evergreen', title: 'Evergreen' },
					{ value: 'bloom', title: 'Bloom' },
				],
				dynamicTitle: true,
			},
		},
		mode: {
			description: 'Light / dark mode',
			toolbar: {
				title: 'Mode',
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light', icon: 'sun' },
					{ value: 'dark', title: 'Dark', icon: 'moon' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: 'cottage',
		mode: 'light',
	},
	parameters: {
		actions: { argTypesRegex: "^on[A-Z].*" },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
};

export default preview;
