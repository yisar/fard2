const path = require('path')
const FardWebpackPlugin = require('./plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new FardWebpackPlugin({
      filename: 'bridge.wxml',
      nodes: 20,
      ignoreElements: ['my-component']
    })
  ]
}