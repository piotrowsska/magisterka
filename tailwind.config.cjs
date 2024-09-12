/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "sans-serif"]
      },
      letterSpacing: {
        small: "0.6px",
        normal: "1px",
        wide: "2px",
        widest: "3px"
      },
    },
    colors: {
      white: "#FFFFFF",
      black: "#161616",
      orange: "#EF9A60",
      blue: "#1586fe",
      grey100: "#f8f9fb",
      grey300: "#e6e7ed",
      grey500: "#96a0b1"
    },
  },
  plugins: [],
};

