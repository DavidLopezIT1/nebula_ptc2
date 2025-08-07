/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        verde: '#88e23b',
        aguamarina: '#a6cccc',
      },
    },
  },
  plugins: [],
};
