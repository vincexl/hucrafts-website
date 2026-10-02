/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Robot Frames world: neutral ground, ink, and the three axis colors.
        // Axis colors mark coordinate frames only — never decoration.
        paper: "#f7f7f5",
        ink: { DEFAULT: "#111315", soft: "#3b3f44", mute: "#5d6167" },
        rule: "#d9dad6",
        well: "#ecedea",
        axis: { x: "#e5322d", y: "#2bb24c", z: "#2f6bff" },
      },
      fontFamily: {
        sans: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
