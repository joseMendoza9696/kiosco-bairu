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
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
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
