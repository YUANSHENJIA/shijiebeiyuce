/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        wc: {
          dark: '#0A1F1C',
          darker: '#071614',
          mid: '#0D2B26',
          accent: '#00E676',
          gold: '#FFD700',
          red: '#FF1744',
          surface: '#112E29',
          border: '#1A3F38',
          muted: '#5A7A72',
        },
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Noto Sans SC', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 230, 118, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 230, 118, 0.6)' },
        },
        'flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
    },
  },
  plugins: [],
};
