/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        tablet: '768px',
        laptop: '992px',
        desktop: '1680px',
      }
    },
  },
  plugins: [],
}
