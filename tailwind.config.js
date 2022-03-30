/* eslint-disable unicorn/prefer-module */
module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '640px',
        lg: '1024px',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
