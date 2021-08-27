module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        fit: "fit-content",
        '98': "32rem"
      },
      height: {
        '55vh': "55vh"
      },
      minWidth: {
        '7': "7rem"
      },
      colors: {
        primary: "#3498db",
        white: "#fff",
        gray: "#ecf0f1",
        transparent: "transparent"
      },
      borderRadius: {
        '3xl': '2.5rem',
      },
      textColor: {
        'primary': {
          bold: "#7b7b7b",
          normal: "#9a9a9a"
        },
        white: "#fff"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
