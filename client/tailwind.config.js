/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'quicksand' : 'Quicksand',
        'urbanist' : 'Urbanist'
      },
      width : {
        '82': '21rem',
        '116' : '34rem',
        '128' : '38rem'
      },
      height : {
        '50' : '200px'
      }
    },
  },
  plugins: [],
}
