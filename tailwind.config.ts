import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        outfit: ['"Outfit"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        rubik: ['"Rubik"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
