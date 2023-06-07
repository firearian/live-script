const defaultTheme = require('tailwindcss/defaultTheme');
const elements = require('tw-elements/dist/plugin.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      height: {
        // prettier-ignore
        '1': '90vh',
      },
    },
  },
  plugins: [elements],
  darkMode: 'class',
};
