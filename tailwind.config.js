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
        sbarro: {
          primary: '#C3151F',
          secondary: '#0000',
          accent: '#F2F2F2',
          neutral: '#fff4f8',
          'base-100': '#fff4f8',
          grayCustom: '#F2F2F2',
        },
        bigcake: {
          primary: '#00BED6',
          secondary: '#FF9A01',
          accent: '#FFA8A8',
          neutral: '#fff4f8',
          //background color =>
          'base-100': '#FAFAFA',
          // gray 1 => steps component
          // grayCustom: '#F2F2F2',
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
