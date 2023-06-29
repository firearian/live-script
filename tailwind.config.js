const defaultTheme = require('tailwindcss/defaultTheme');
const elements = require('tw-elements/dist/plugin.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        courier: ['source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', ' monospace'],
      },
      height: {
        // prettier-ignore
        '1': '90vh',
        // prettier-ignore
        '2': '1.9rem',
      },
      width: {
        // prettier-ignore
        '1': '300px',
      },
      zIndex: {
        // prettier-ignore
        '1': '1001',
      },
    },
  },
  plugins: [elements],
  darkMode: 'class',
};
