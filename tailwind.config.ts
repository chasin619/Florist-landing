import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryGray: "#484848",
        orange: "#e6913f",
        green: "#7EB5A7",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
      screens: {
        xs: "360px",
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
};
export default config;
