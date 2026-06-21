/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1c1c22",
        secondary: "#27272c",
        accent: {
          DEFAULT: "#00ff99",
          hover: "#00e187",
        },
      },
      fontFamily: {
        primary: ["var(--font-jetbrainsMono)"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-in-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [],
};
