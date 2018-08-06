module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: '> 5%'
    },
    'postcss-custom-properties': {
      preserve: false
    },
    'postcss-color-function': {},
    cssnano: {
      autoprefixer: false
    }
  }
};
