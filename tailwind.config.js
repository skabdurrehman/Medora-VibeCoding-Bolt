/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm Orange Premium Color Palette
        'premium-bg-primary': '#1a1612',        // Deep warm dark
        'premium-bg-secondary': '#2a1f18',       // Warm secondary
        'premium-bg-tertiary': '#3d2b1f',       // Lighter tertiary
        'premium-accent-orange': '#ff6b35',     // Vibrant orange
        'premium-accent-coral': '#ff8c42',      // Warm coral
        'premium-accent-gold': '#ffa726',       // Rich gold
        'premium-accent-cream': '#fff3e0',      // Warm cream
        'premium-accent-sage': '#8bc34a',       // Fresh sage
        'premium-accent-slate': '#607d8b',      // Cool slate
        'premium-text-primary': '#fff8f0',      // Warm white
        'premium-text-secondary': '#d7ccc8',    // Warm gray
        'premium-text-muted': '#a1887f',        // Warm muted
        'premium-border': '#bf360c',            // Orange border
        'premium-border-light': '#ff8a65',      // Light orange border
      },
      backgroundImage: {
        'premium-gradient-primary': 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
        'premium-gradient-secondary': 'linear-gradient(135deg, #ff8c42 0%, #ffa726 100%)',
        'premium-gradient-tertiary': 'linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)',
        'premium-gradient-gold': 'linear-gradient(135deg, #ffa726 0%, #ffb74d 100%)',
        'premium-gradient-dark': 'linear-gradient(135deg, #1a1612 0%, #2a1f18 50%, #3d2b1f 100%)',
        'premium-gradient-text-primary': 'linear-gradient(135deg, #ff6b35 0%, #ffa726 100%)',
        'premium-gradient-text-secondary': 'linear-gradient(135deg, #ff8c42 0%, #ffb74d 100%)',
        'premium-gradient-text-accent': 'linear-gradient(135deg, #ffa726 0%, #fff3e0 100%)',
      },
    },
  },
  plugins: [],
};