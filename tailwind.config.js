/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  plugins: [require('daisyui')],

  daisyui: {
    fontFamily: {
      custom: ['font-bairu', 'sans-serif'],
    },
    themes: [
      {
        mytheme: {
          primary: '#C3151F',
          secondary: '#C3151F',

          accent: '#fff4f8',
          neutral: '#fff4f8',
          'base-100': '#fff4f8',
        },
      },
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset',
    ],
  },
};
