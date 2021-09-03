module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./product/**/*.{js,ts,jsx,tsx}",
    "./modal/**/*.{js,ts,jsx,tsx}",
    "./cart/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      gradient: "#1d1d1d",
    }),
    extend: {
      animation: {
        textspin: "textspin 10s linear infinite",
      },
      keyframes: {
        textspin: {
          "0%": {transform: "translateX(0%)"},
          "100%": {transform: "translateX(-40.6%)"},
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
