/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF5E27",
        gray: "#E2E2E2",
        darkGray: "#C2C2C2",
        blackGray: "#191919",
      },
      fontFamily: {
        display: ["AgencyFB", "sans-serif"],
        body: ["Proxima Nova", "sans-serif"],
      },
    },
  },
  plugins: [],
};
