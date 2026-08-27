/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#070516',
          2: '#0d0a22',
        },
        ink: '#f6f4ff',
        muted: '#a09cc4',
        dim: '#6f6a99',
        line: 'rgba(246, 244, 255, 0.10)',
        violet: {
          DEFAULT: '#7c5cff',
          deep: '#4b3bd6',
          soft: 'rgba(124, 92, 255, 0.14)',
        },
        ember: {
          DEFAULT: '#f7941e',
          soft: 'rgba(247, 148, 30, 0.14)',
        },
        glass: {
          DEFAULT: 'rgba(246, 244, 255, 0.045)',
          line: 'rgba(246, 244, 255, 0.12)',
        },
        pill: {
          DEFAULT: '#f6f4ff',
          ink: '#070516',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        'nav-h': 'var(--nav-h)',
      },
    },
  },
  plugins: [],
}
