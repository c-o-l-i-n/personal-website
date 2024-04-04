/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.component.ts'],
  theme: {
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '1rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '100%',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui'],
      mono: ['JetBrains Mono', 'ui-monospace'],
    },
  },
  plugins: [],
};
