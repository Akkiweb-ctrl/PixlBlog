/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'greenOne':'#22cc9d',
      'grayOne':'#DCDCDC',
      'headerGray':"#A9A9A9",
      'white' : "#fff",
      'red':'#ff1100',
      'bgcolor':'#e1eff6'
    },
    extend: {},
  },
  plugins: [],
}