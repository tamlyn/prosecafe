const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader' }],
  },
  plugins: [new htmlWebpackPlugin({ template: 'src/index.html' })],
}
