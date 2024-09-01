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
      'bgcolor':'#e1eff6',
      'editColor':'#f2fa05',
      'app-bg': '#e1eff6'
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }
      '2md': '860px',

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      '2xs': '8px'
    },
    extend: {},
  },
  plugins: [],
}