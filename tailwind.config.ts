import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['var(--font-geist-sans)', 'sans-serif'],
				mono: ['var(--font-geist-mono)', 'monospace'],
			},
		},
	},
	plugins: [],
};

export default config;
