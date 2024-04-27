/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    screens: {
      sm: '420px',
      md: '768px',
      lg: '900px',
      xl: '1440px'

    },

    extend: {
      colors:{
        text: '#151D07',
        primary: '#A2D544',
        secondary: '#99E486',
        accent: '#66DA62',
        background: '#FCFDF7',
        
      },
    },
  },
  plugins: [],
}

