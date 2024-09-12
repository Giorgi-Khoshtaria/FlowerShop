/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#F2F2F2",
        black: "#000",
        semiBlack: "#121212",
        yellow: "#FF8F52",
        darkGray: "#838383",
        semiGray: "#D9D9D9",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
