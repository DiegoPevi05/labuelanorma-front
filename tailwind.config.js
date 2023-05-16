/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#fed0d2",//#ecc22e
        secondary: "#cb285d",//#cb285d
        tertiary: "#11002c",//#11002c
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
        heading: ['Dancing Script','sans-serif'],
        body: ['Poppins','sans-serif'],
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/images/bgChicha.jpg')",
      },
    },
  },
  plugins: [
  ],
};
