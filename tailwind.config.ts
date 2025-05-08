import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: { extend: {} },
	plugins: [],
	future: {
		// Tailwind doesn't officially expose this, but it works
		unstable_disableOpacityUtilitiesByDefault: false,
		unstable_disablePreflightByDefault: false,
		// this is the one that matters
		disableExperimentalPlugins: true,
	},
};

export default config;
