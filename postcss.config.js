/* eslint global-require: 0 */
module.exports = {
  plugins: [
    ['postcss-easy-import', { prefix: '_' }], // keep this first
    'autoprefixer'
  ]
};
