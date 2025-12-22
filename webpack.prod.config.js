const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

process.env.NODE_ENV = 'production'

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: {
    main: './src/main.js',
    vendors: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, 'dist-prod'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: '',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new HtmlWebpackPlugin({
      template: './src/template/index.ejs',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
})
