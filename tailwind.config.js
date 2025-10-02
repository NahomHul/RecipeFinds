/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#2563eb",
        primaryBlueDark: "#1e40af",
        offwhite: "#f9fafb",
        darkGray: "#4b5563",
      },
    },
  },
  plugins: [],
};
