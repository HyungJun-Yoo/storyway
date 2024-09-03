/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxl: '1536px',
      xl: '1280px',
      lg: '1024px',
      md: '768px',
      sm: '640px',
      customSm: '600px',
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
