/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'argf-',
  corePlugins: {
    preflight: false,
  },
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b6faf',
          hover: '#3567a4',
        },
        danger: {
          DEFAULT: '#c04d4d',
          hover: '#ac4242',
        },
        warning: {
          DEFAULT: '#e0a736',
          hover: '#cb952f',
        },
        success: {
          DEFAULT: '#5c865c',
          hover: '#527a52',
        },
        secondary: {
          DEFAULT: '#6b7280',
          hover: '#5f6771',
        },
      },
    },
  },
  plugins: [],
};
