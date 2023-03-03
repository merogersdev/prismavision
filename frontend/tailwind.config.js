export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        // Blue
        primary: {
          100: '#5E9BD4',
          200: '#347FC4',
        },
        // Grey
        secondary: {
          100: '#C6C8D2',
          200: '#63687E',
          300: '#515567',
          400: '#3F4250',
          500: '#272932',
        },
        // Orange
        cta: {
          100: '#FF7433',
          200: '#FF570A',
        },
      },
      // Nunito
      fontFamily: {
        app: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
