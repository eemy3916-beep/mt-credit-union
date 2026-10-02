/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0d1714",
        moss: "#17352d",
        mint: "#dceee7",
        sand: "#f6f4ef",
        gold: "#c7a66a"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(13,23,20,.08)"
      }
    }
  },
  plugins: []
};