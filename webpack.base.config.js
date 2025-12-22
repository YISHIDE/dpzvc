const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintPlugin = require('eslint-webpack-plugin')
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js', // webpack5 推荐使用 contenthash
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      // Vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // JS 文件
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      // CSS 文件
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      // LESS 文件
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // 图片、字体等资源
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff2?)$/,
        type: 'asset', // webpack5 新资源模块
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          filename: 'assets/[name].[hash:7][ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ESLintPlugin({
      extensions: ['js', 'vue'],
      emitWarning: true, // 输出警告，但不会阻止编译
      emitError: true, // 输出错误
      failOnWarning: false, // 不把警告当作错误
      failOnError: true // 有错误直接阻止编译
      // lintDirtyModulesOnly: true,
      // overlay: false
    })
  ],
  devtool: 'source-map'
}
