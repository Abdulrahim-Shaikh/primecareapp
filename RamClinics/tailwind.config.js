/** @type {import('tailwindcss').Config} */

const { platformSelect } = require("nativewind/theme");
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
    colors: {
      white: "rgba(255, 255, 255, 1)",
      primaryColor:  platformSelect({ default: "green" }),
      secondaryBg: "rgba(230, 244, 242, 1)",
      neutralColor: "rgba(14, 13, 57, 1)",
      bodyText: "#454567",
      borderColor: "#c3c3ce",
    },
  },
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}