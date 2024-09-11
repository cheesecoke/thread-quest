import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Lora", "serif"], // For logo text
        heading: ["Poppins", "sans-serif"], // For headings
        body: ["Roboto", "sans-serif"], // For body text
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#2C3E50", // Navy
        secondary: "#FFFFFF", // White
        accent: "#D4AF37", // Gold
        "text-primary": "#1C2833", // Dark Navy for primary text
        "text-secondary": "#566573", // Grayish Blue for secondary text
        warning: "#FFB400", // Amber/Gold Variant for warnings
        info: "#3498DB", // Soft Blue for informational messages
        success: "#27AE60", // Emerald Green for success messages
        error: "#E74C3C", // Red for alerts/errors
        "neutral-light": "#ECF0F1", // Soft Gray for light neutral backgrounds
        "neutral-mid": "#BDC3C7", // Cool Gray for mid-level neutral elements
        "neutral-dark": "#2F2F2F", // Charcoal for dark neutral elements
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
