module.exports = {
  root: true,
  extends: '../eslint-config/index.js',
  parserOptions: {
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: [
    'html'
  ]
};
