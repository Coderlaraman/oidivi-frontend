import type { Config } from 'tailwindcss';

export default {
  darkMode: 'media', // Se basará en la preferencia del SO
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
