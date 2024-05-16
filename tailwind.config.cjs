/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poetsen One", "sans-serif"]
      },
      letterSpacing: {
        small: "0.6px",
        normal: "1px",
        wide: "2px",
        widest: "3px"
      },
      backgroundImage: {
       "gradient": "linear-gradient(90deg, rgba(0,136,194,1) 0%, rgba(29,32,89,1) 100%)"
      }
    },
    colors: {
      white: "#FFFFFF",
      black: "#040404",
      grey: "#F1F2F4",
      orange: "#EF9A60",
      purple: "#6F5CF2",
      blue: "#0099DD",
      violet: "#1d2059"
    },
  },
  plugins: [],
};

