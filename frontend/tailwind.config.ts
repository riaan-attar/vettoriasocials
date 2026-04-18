import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        beige: "var(--color-beige)",
        "beige-deep": "var(--color-beige-deep)",
        black: "var(--color-black)",
        gold: "var(--color-gold)",
        "gold-light": "var(--color-gold-light)",
        "warm-gray": "var(--color-warm-gray)",
        accent: "var(--color-accent)",
        cream: "var(--color-cream)",
        white: "var(--color-white)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        stats: ["var(--font-clash)", "sans-serif"],
      },
      transitionTimingFunction: {
        smoothEnter: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snappyOut: 'cubic-bezier(0.5, 0, 0.75, 0)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        goldShine: 'cubic-bezier(0.4, 0, 0.2, 1)',
        cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }
    },
  },
  plugins: [],
};
export default config;
