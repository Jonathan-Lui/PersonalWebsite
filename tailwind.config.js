const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      blue: '#00b2ff',
      red: '#ff0000',
      gray: colors.gray,
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        mono: ['Source Code Pro', ...defaultTheme.fontFamily.mono],
      },
      margin: {
        n3: '-0.75rem',
      },
      minHeight: {
        500: '500px',
      },
      minWidth: {
        500: '500px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
