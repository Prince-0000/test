// tailwind.config.mjs
export default {
  reactStrictMode: true,
  darkMode: 'class',
  
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // required for App Router
    './components/**/*.{js,ts,jsx,tsx}',
    "./utils/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        publica: ['"Publica Play"', 'sans-serif'],
      },
      animation: {
        'border-rotate': 'border-rotate 3s linear infinite',
      },
      keyframes: {
        'border-rotate': {
          to: {
            '--border-angle': '360deg',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
