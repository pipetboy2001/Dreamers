module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0D92F4",
        text_lightblue: "#B4D4FF",
        primary_white: "#FFFFFF",
        title_gray: "#4B4B4B",
        title_lightgray: "#a9a9a9",
      },
    },
  },
  plugins: [],
}
