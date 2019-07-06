const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FardWebpackPlugin = require('fard-webpack-plugin')

module.exports = {
  entry: {
    'pages/index/index': path.resolve(__dirname, 'pages/index/index.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },

      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin(),

    new CopyWebpackPlugin([
      {
        from: './app.json',
        to: 'app.json'
      },
      {
        from: './app.js',
        to: 'app.js'
      }
    ]),

    new FardWebpackPlugin({
      filename: 'bridge.wxml',
      viewLevel: 20
    })
  ],
  mode: 'production'
}
