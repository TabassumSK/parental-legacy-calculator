/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "Georgia", "serif"],
        heading: ["Outfit", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#0B0C10",
          900: "#12141D",
          800: "#1B1E2E",
          700: "#272B40",
          600: "#393F5B",
        },
        parchment: {
          50: "#FAF9F5",
          100: "#F2EFE7",
          200: "#E5DEC9",
        },
        mother: {
          DEFAULT: "#D97706",
          light: "#F59E0B",
          dark: "#B45309",
          glow: "rgba(217, 119, 6, 0.25)",
        },
        father: {
          DEFAULT: "#0284C7",
          light: "#38BDF8",
          dark: "#0369A1",
          glow: "rgba(2, 132, 199, 0.25)",
        },
      },
      boxShadow: {
        seal: "0 10px 30px -5px rgba(217, 119, 6, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
        glow: "0 0 25px -5px rgba(217, 119, 6, 0.2), 0 0 25px -5px rgba(2, 132, 199, 0.2)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
