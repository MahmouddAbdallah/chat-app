/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1877F2",
        greenColor: "#42b72a",
        videosColor: "#E42645",
        photosColor: "#41B35D",
        happyColor: "#EAB026",
        greenHover: "#36A420",
        bg: "#F8FAFC",
        inputGray: "#F5F6F7"
      },
      boxShadow: {
        'sm': ' 0px 0px .9px  rgb(0 0 0 / 0.05);',
      },
      fontWeight: {
        "500": "500"
      },
      width: {
        "432": "432px"
      },


    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}