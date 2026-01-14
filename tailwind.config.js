/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sky-blue": "#87CEEB",
        "sunny-yellow": "#FFD700",
        "cloudy-gray": "#B0C4DE",
        "rainy-blue": "#4682B4",
      },
      fontFamily: {
        playful: ["Comic Sans MS", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [],
};
