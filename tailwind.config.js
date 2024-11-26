/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",  "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "san-serif"],
    }, 
    extend: {
      colors: {
        primary: {
          light: " #FECA9F",
          normal: " #FD7E14",
          dark: " #9A4D0C",
        },
        borderColor: '#E4E4E4',
      }
    },
  },
  plugins: [],
}

