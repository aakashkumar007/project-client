/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path according to your file structure
  ],
  theme: {
    extend: {
      keyframes: {
        'reverse-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        'reverse-spin': 'reverse-spin 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}

