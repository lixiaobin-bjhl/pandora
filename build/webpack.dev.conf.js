var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    // loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true,
        disable: false 
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: 'main.html',
      chunks: ['app'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: 'login.html',
      chunks: ['login'],
      inject: true
    })
  ]
})
