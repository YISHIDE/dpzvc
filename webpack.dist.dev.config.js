/**
 * webpack.dist.dev.config.js
 * 开发环境打包库文件 (Webpack 5)
 */

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
  mode: 'production',

  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'dpzvc.js',
    library: 'dpzvc',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    clean: false, // webpack5 新增，每次构建清理旧文件
  },

  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  // Webpack 5 建议禁用多余 optimization，因为是库打包
  optimization: {
    minimize: false, // 开发库打包通常不压缩
  },
});