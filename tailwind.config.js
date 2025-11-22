// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lgc: {
          // Colores de marca base
          everdeep: "#1b3c2a",
          olive: "#81988d", // Olive Ashes
          manna: "#fdfaed", // Manna Light
          desert: "#b3885f",
          covenant: "#8a6d54",
          clay: "#c16c4f",

          // UI LIGHT
          bg: "#fdfaed",
          surface: "#ffffff",
          surfaceMuted: "#f5efe2",
          border: "#e2d5c2",
          text: "#1b3c2a",
          textMuted: "#6b7280",

          primary: "#1b3c2a",
          primarySoft: "#274c36",
          onPrimary: "#fdfaed",

          accent: "#b3885f",
          onAccent: "#fdfaed",

          danger: "#c16c4f",
          onDanger: "#fdfaed",

          // Tokens específicos para SIDEBAR (light)
          sidebarBg: "#81988d", // Olive Ashes
          sidebarText: "#fdfaed", // Manna sobre el verde
          sidebarMuted: "#e9f0ec", // Olive aclarado para hovers suaves
          sidebarActiveBg: "#1b3c2a", // Everdeep para item activo
          sidebarActiveText: "#fdfaed",

          // DARK
          darkBg: "#10241a",
          darkBgAlt: "#1b3c2a",
          darkSurface: "#1a3326",
          darkSurfaceMuted: "#223f30",
          darkBorder: "#274235",

          darkText: "#fdfaed",
          darkTextMuted: "#cbd5cf",

          darkPrimary: "#fdfaed",
          darkOnPrimary: "#1b3c2a",
          darkAccent: "#c16c4f",
          darkOnAccent: "#fdfaed",

          // Sidebar en dark
          darkSidebarBg: "#1a3326",
          darkSidebarMuted: "#223f30",
          darkSidebarActiveBg: "#fdfaed",
          darkSidebarActiveText: "#1b3c2a",
        },
      },
    },
  },
  plugins: [],
};
