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
        ink: "rgb(var(--c-warm) / <alpha-value>)",
        graphite: "rgb(var(--c-t3) / <alpha-value>)",
        dim: "rgb(var(--c-t5) / <alpha-value>)",
        line: "rgb(var(--c-rule) / <alpha-value>)",
        paper: "rgb(var(--c-canvas) / <alpha-value>)",
        chalk: "rgb(var(--c-panel) / <alpha-value>)",
        raised: "rgb(var(--c-raised) / <alpha-value>)",
        code: "rgb(var(--c-code) / <alpha-value>)",
        well: "rgb(var(--c-well) / <alpha-value>)",
        pine: "rgb(var(--c-ember-text) / <alpha-value>)",
        moss: "rgb(var(--c-ember-text) / <alpha-value>)",
        copper: "rgb(var(--c-ember-hover) / <alpha-value>)",
        ember: "rgb(var(--c-ember) / <alpha-value>)",
        "on-ember": "rgb(var(--c-on-ember) / <alpha-value>)"
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
        fine: "0 18px 48px rgb(var(--c-shadow) / calc(0.22 * var(--shadow-k)))"
      }
    }
  },
  plugins: []
};

export default config;
