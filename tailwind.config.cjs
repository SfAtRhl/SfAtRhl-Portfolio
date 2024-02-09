/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "primary-black": "#FDFDFD",
        secondary: "#aaa6c3",
        "secondary-black": "#000000",

        tertiary: "#FFFFFF",
        "tertiary-black": "#272829",

        // "black-200": "#FFFFFF",
        // "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      // backgroundImage: {
      //   "hero-pattern": "url('/src/assets/herobg.png')",
      // },
    },
  },
  plugins: [],
  darkMode: "class",
};
