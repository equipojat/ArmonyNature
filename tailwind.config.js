/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          light: '#2d5a27',
          DEFAULT: '#1b4332',
          dark: '#081c15',
        },
        sage: {
          light: '#c9d3c4',
          DEFAULT: '#8f9e8b',
          dark: '#5c6a58',
        },
        olive: {
          light: '#97a97c',
          DEFAULT: '#606c38',
          dark: '#283618',
        },
        beige: {
          light: '#fcfaf2',
          DEFAULT: '#f4f1de',
          dark: '#eae6df',
        },
        cream: {
          DEFAULT: '#faf9f6',
        },
        earth: {
          light: '#dda15e',
          DEFAULT: '#bc6c25',
          dark: '#8c4f1c',
        },
        gold: {
          light: '#ecd185',
          DEFAULT: '#d4af37',
          dark: '#aa820a',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.3s ease-out forwards',
        'slide-right': 'slideRight 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
