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
      },
    },
  },
  plugins: [],
};
