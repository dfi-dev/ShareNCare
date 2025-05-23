/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      keyframes: {
        dotPulse: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.3' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        dotPulse: 'dotPulse 1.2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
