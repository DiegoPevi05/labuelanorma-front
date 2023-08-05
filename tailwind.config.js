/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#e9b433",
        secondary: "#15002e",
        tertiary: "#04ade2",
        fourth: "#fb1664",
        fifth:"#05c805",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        cardlight:"rgba(0, 0, 0, 0.24) 0px 3px 8px",
      },
      screens: {
        xs: "450px",
      },
      fontFamily: {
        heading: ['Coolvetica-regular','sans-serif'],
        body: ['Coolvetica-regular','sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
