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
        primary: "#2C3E50", // Navy (Primary color)
        "primary-light": "#4D6B8C", // Lightened blue for softer components
        "primary-dark": "#222F3D", // Darkened blue for hover effects
        secondary: "#A9DDFF", // Soft Blue (Updated secondary color)
        "secondary-light": "#BFE3FA", // Lightened blue for softer components
        "secondary-dark": "#89CDFA", // Darkened blue for hover effects

        accent: "#D4AF37", // Gold (Accent color)
        "accent-light": "#E2C063", // Lighter gold for soft elements
        "accent-dark": "#B7950B", // Darker gold for hover or emphasis

        "text-primary": "#1C2833", // Dark Navy for primary text
        "text-secondary": "#fff", // White for secondary text

        warning: "#FFCE5C", // Amber/Gold Variant for warnings
        info: "#74B9E7", // Soft Blue for informational messages
        success: "#7AE1A5", // Emerald Green for success messages
        error: "#EF8B80", // Red for alerts/errors

        "neutral-light": "#ECF0F1", // Soft Gray for light neutral backgrounds
        "neutral-mid": "#BDC3C7", // Cool Gray for mid-level neutral elements
        "neutral-dark": "#2F2F2F", // Charcoal for dark neutral elements
        "neutral-accent": "#7F8C8D", // Slightly darker neutral for text/buttons
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
