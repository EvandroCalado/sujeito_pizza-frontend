import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-900': '#101026',
        'dark-700': '#1d1d2e',
        'gray-100': '#8a8a8a',
        'green-900': '#3fffa3',
        'red-900': '#ff3f4b',
      },
    },
  },
  plugins: [],
};
export default config;
