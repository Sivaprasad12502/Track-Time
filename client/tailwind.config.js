/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'black-bg':'#0b0e14'
      },
      dropShadow:{
        'shadowBox':'0 4px 6px rgba(0,0,0,0.5)'
      },
      colors:{
        neonGreen:'#C1FF72',
        gray:"#E5E5E5",
      }
    },
  },
  plugins: [],
}

