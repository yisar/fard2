const path = require('path')
const FardWebpackPlugin = require('.')

module.exports = {
  mode: 'development',
  entry: {
    main: './main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  plugins: [
    new FardWebpackPlugin({
      filename: 'bridge.wxml',
      nodes: 10,
      ignoreElements: {
        'my-component': ['text']
      }
    })
  ]
}
