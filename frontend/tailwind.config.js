
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // all React components and files
    './public/index.html',         // your HTML file(s)
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font
      },
      fontSize: {
        'xxs-custom': '4px', // Define custom text size
      },
      backgroundImage: {
        'navbar-footer': 'linear-gradient(to right, #b28fd9, #f0ecf7, #b28fd7)',
      },
    },
  },
  plugins: [],
}
