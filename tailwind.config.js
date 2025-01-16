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
        status: {
          resolved:"#027A48",
          pending:"#DA1E28",
          inprogress:"#FDB022",
          rejected:"#373737",
          successful:"#007BFF",
          canceled:"#373737",
        },
        statusbg: {
          resolved:"#ECFDF3",
          pending:"#FFF2F1",
          inprogress:"#FFFCF2",
          rejected:"#EDEDED",
          successful:"#001F40",
          canceled:"#EDEDED",
        },
        borderColor: '#E4E4E4',
      }
    },
  },
  plugins: [],
}

