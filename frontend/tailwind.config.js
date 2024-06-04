// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }, // Move by 50% to handle duplicated items
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite', // Adjust timing as needed
      },
    },
  },
  plugins: [],
};
