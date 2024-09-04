/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".hide-scrollbar": {
          "::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
          "scrollbar-width": "none", 
          overflow: "auto",
        },
      });
    },
  ],
};
