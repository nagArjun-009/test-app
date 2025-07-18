/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Custom colors for light and dark modes
        background: {
          light: '#ffffff',
          dark: '#1f2937',
        },
        foreground: {
          light: '#1f2937',
          dark: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
};
