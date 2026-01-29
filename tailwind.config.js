/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7', 
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e', 
          950: '#082f49',
        }
      },
      borderRadius: {
        'squircle': '3.5rem',
        'squircle-sm': '1.5rem',
      },
      boxShadow: {
        'glow': '0 0 50px -10px rgba(14, 165, 233, 0.2)',
        'premium': '0 30px 60px -12px rgba(0, 0, 0, 0.08)',
        'squircle': '0 25px 70px -15px rgba(14, 165, 233, 0.12)',
      }
    },
  },
  plugins: [],
}