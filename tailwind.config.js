const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html','./src/*'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        fit: "fit-content",
        '98': "32rem",
        '35perc': "35%"
      },
      height: {
        '55vh': "55vh",
        'full-minus-above': "calc(100% - 8.4rem)"
      },
      minWidth: {
        '7': "7rem"
      },
      maxWidth: {
        'xxs': "10rem"
      },
      colors: {
        // primary: "#3498db",
        primary: "#46413b",
        white: "#fff",
        grey: "#ecf0f1",
        transparent: "transparent"
      },
      borderRadius: {
        '3xl': '2.5rem',
      },
      textColor: {
        'primary': {
          // bold: "#7b7b7b",
          bold: "#46413b",
          normal: "#9a9a9a"
        },
        white: "#fff"
      }
    },
  },
  variants: {
    extend: {
      scale: ['active']
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none' 
        },
      }

      addUtilities(newUtilities)
    })
  ],
}
