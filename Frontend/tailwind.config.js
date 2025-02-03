/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ASSgreen: "#0CFFA7",
        ASSblue: "#79A9F8",
        ASSred: "#E24040",
        ASSyellow: "#EDFC27",
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
