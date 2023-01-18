/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#fff',
        secondary: {
          100: '#fff',
          200: '#fff',
        },
        cta: '#fff',
      },
      fontFamily: {
        app: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
