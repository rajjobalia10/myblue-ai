/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'instrument-serif': ['Instrument Serif', 'serif'],
      },
      colors: {
        'sidebar-bg': '#1A1B1E',
        'sidebar-hover': '#2C2F33',
        'sidebar-border': '#3A3D42',
      },
      spacing: {
        '18': '4.5rem',
        '80': '20rem',
      },
    },
  },
  plugins: [],
}
