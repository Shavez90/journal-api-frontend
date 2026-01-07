/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#000000',
        'gradient-soft': '#f3f4f6',
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}
