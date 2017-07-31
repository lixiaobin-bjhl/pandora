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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'chat.html',
      template: 'chat.html',
      chunks: ['chat'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'bindTel.html',
      template: 'bindTel.html',
      inject: true,
      chunks: ['bindTel']
    }),
    new HtmlWebpackPlugin({
      filename: 'card.html',
      template: 'card.html',
      inject: true,
      chunks: ['card']
    }),
    new HtmlWebpackPlugin({
      filename: 'patientIndex.html',
      template: 'patientIndex.html',
      inject: true,
      chunks: ['patientIndex']
    }),
    new HtmlWebpackPlugin({
      filename: 'browserError.html',
      template: 'browserError.html',
      inject: false
    })
  ]
})
