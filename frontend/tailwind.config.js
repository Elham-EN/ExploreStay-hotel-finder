/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // Change default style
    container: {
      padding: "10rem",
    },
  },
  plugins: [],
};
