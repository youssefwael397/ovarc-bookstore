/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins to the default sans-serif stack
      },
      colors: {
        darkOrange: '#BF5523',
      },
    },
  },
  plugins: [],
};
