/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff5f3",
          100: "#ffe8e3",
          200: "#ffd1c7",
          300: "#ffb09e",
          400: "#ff8066",
          500: "#f04a2e",
          600: "#de3218",
          700: "#bb2612",
          800: "#9a2213",
          900: "#802114",
        },
        mint: {
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
        },
        ink: {
          900: "#0f1218",
          800: "#1a1f2e",
          700: "#2a3144",
          600: "#3d465c",
          500: "#5c657a",
          400: "#8b93a7",
        },
        cream: {
          50: "#fffbf8",
          100: "#fff5ef",
        },
      },
      boxShadow: {
        soft: "0 12px 40px -12px rgba(240, 74, 46, 0.25)",
        card: "0 8px 24px -8px rgba(15, 18, 24, 0.12)",
        glow: "0 0 32px -4px rgba(240, 74, 46, 0.45)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
