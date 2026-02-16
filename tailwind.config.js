/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Headings: Clean sans-serif (Inter)
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        // Body: Elegant serif (Merriweather)
        'serif': ['Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        // Custom colors for "Soft & Manly" palette
        paper: '#fafaf9',      // stone-50
        ink: '#0f172a',        // slate-900
        accent: '#475569',     // slate-600
      },
    },
  },
  plugins: [],
}
