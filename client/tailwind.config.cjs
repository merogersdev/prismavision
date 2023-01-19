/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#5E9BD4',
          200: '#347FC4',
        },
        secondary: {
          100: '#C6C8D2',
          200: '#3F4250',
          300: '#6C7189',
          400: '#272932',
        },
        cta: {
          100: '#FF7433',
          200: '#347FC4',
        },
      },
      fontFamily: {
        app: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
