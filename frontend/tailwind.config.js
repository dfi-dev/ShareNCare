export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // all React components and files
    './public/index.html',         // your HTML file(s)
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], 
        poppins: ['Poppins', 'sans-serif'],       
      },
      fontSize: {
        'xxs-custom': '4px', 
      },
      backgroundImage: {
        'navbar-footer': 'linear-gradient(to right,rgb(18, 17, 17), #f0ecf7,rgb(3, 105, 195))',
      },
    },
  },
  plugins: [],
};
