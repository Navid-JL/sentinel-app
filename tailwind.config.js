module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  // add daisyUI plugin
  plugins: [require('daisyui')],
  // daisyUI config
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    themes: ['winter', 'night', 'cmyk'],
  },
}
