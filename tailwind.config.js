module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      }
    },
    container: {
      center: true,
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}