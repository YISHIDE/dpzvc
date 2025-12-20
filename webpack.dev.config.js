const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.config.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, 'src/main.js'),
    vendors: ['vue', 'vue-router']
  },
  output: {
    path: path.resolve(__dirname, 'dist-dev'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  devtool: 'eval-source-map',
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist-dev') },
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 3000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/template/index.ejs'),
      inject: true,
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ]
});