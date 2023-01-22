/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      gray: {
        10: "#fff",
        20: "#ECECF1",
        30: "#C5C5D1",
        40: "#9A9B9F",
        50: "#444654",
        60: "#343541",
        70: "#202123",
      },
      blue: {
        default: "#5536DA",
      },
      green: {
        10: "#8DCDB8",
        20: "#0FA47F",
        30: "#00897B",
      },
    },
    extend: {},
  },
  plugins: [],
};
