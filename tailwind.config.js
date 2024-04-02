/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html",  "./src/**/*.{vue,js,ts,jsx,tsx}", ],
  theme: {
    fontFamily: {
      satoshi: ["Satoshi", "san-serif"],
    }, 
    
    extend: {
      colors: {
        primary:{
          primaryCol:'#FD7E14',
          bgColor:"#767676",
          btnbck:"#9A4D0C"
        },
        btnbg:"#FFF2E8",
        hero:'#12B76A'
      },
      fontSize: {
        'xs': '.7rem', 
        'small' : '.8rem',
        'h1': '1.9rem',
      },
    },
  },
  plugins: [
  ],
}

