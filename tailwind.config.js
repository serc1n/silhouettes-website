/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'cursive'],
        'noto': ['Noto Sans', 'sans-serif'],
      },
      colors: {
        'silhouette-black': '#000000',
        'silhouette-white': '#ffffff',
      }
    },
  },
  plugins: [],
} 