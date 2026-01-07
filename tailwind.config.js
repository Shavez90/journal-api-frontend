export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        sage: '#A8B89F',
        terracotta: '#D4896B',
        moss: '#6B7F5E',
        sand: '#E8DCC4',
        // Enhanced color palette
        'sage-light': '#C8D5BF',
        'sage-dark': '#8A9B81',
        'moss-light': '#8B9F7E',
        'moss-dark': '#4B5F3E',
        'terracotta-light': '#E4A98B',
        'terracotta-dark': '#B4694B',
        'warm-accent': '#E8B86D',
        'cool-accent': '#6B9FAA',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #A8B89F 0%, #6B7F5E 100%)',
        'gradient-warm': 'linear-gradient(135deg, #E8B86D 0%, #D4896B 100%)',
        'gradient-cool': 'linear-gradient(135deg, #C8D5BF 0%, #6B9FAA 100%)',
        'gradient-soft': 'linear-gradient(135deg, #FFF8E7 0%, #E8DCC4 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'large': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'hover': '0 12px 32px rgba(0, 0, 0, 0.15)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'wide-plus': '0.05em',
      },
    },
  },
  plugins: [],
}