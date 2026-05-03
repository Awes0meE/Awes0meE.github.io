import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{mdx,ts,json}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17201d",
        graphite: "#4f5854",
        line: "#d9dfda",
        paper: "#fbfcfa",
        pine: "#124c34",
        moss: "#2f7a56",
        copper: "#b65f23",
        chalk: "#f2f4f0"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        display: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        fine: "0 20px 70px rgba(18, 76, 52, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
