export default {
  content: ["./index.html", "./src/pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")], // Enable the plugin
};
