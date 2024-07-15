import type { Config } from 'tailwindcss';

const config: Config = {
	important: true,
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			primary: {
				main: '#75AAEB',
				light: '#2B3440',
			},
			background: {
				main: '#1B2028',
			},
			surface: {
				main: '#1B2028',
				light: '#2B3340',
				disable: '#5C6D88',
				brand: {
					light: '#2B3440',
					DEFAULT: '#75AAEB',
				},
				background: '#1B2028',
				primary: '#1B2028',
				secondary: '#2B3340',
				negative: {
					light: '#402B2F',
					DEFAULT: '#EB758B',
				},
				positive: {
					light: '#2B403B',
					DEFAULT: '#00BD92',
				},
				warning: {
					light: '#2B403B',
					DEFAULT: '#EBD675',
				},
				highlight: {
					positive: '#154641',
					negative: '#6B2F3B',
					warning: '#4D441C',
				},
			},
			negative: {
				main: '#EB758B',
				light: '#402B2F',
				highlight: '#6B2F3B',
			},
			positive: {
				main: '#00BD92',
				light: '#2B403B',
				highlight: '#154641',
			},
			warning: {
				main: '#EBD675',
				light: '#403C2B',
				highlight: '#4D441C',
			},
			content: {
				primary: '#E7EAEF',
				secondary: '#9FABBE',
				positive: '#00bd92',
				warning: '#ebd675',
			},
			overlay: 'rgba(12, 16, 17, 0.7)',
		},
	},
	plugins: [],
};
export default config;
