'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./env')

const config = require('./webpack.base.conf.js')
config.mode(env.DEVELOPMENT)
// devtool
config.devtool('cheap-module-eval-source-map')

// plugin
config.plugin('htmlwebpackplugin')
    .use(HtmlWebpackPlugin, [
    Object.assign(
        {},
        {
        inject: true,
        template: path.resolve(__dirname, '../index.html')
        },
        {
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }
        }
    )
    ]).end()
  .plugin('HotModuleReplacementPlugin')
  .use(webpack.HotModuleReplacementPlugin).end()
// devServer
config.devServer.contentBase('../dist')
  // .publicPath('/')
  .port(8080)
  .proxy({
    '/apiMid': {
      target: 'http://17225-finance-hil-hil-ops.test.za-tech.net/',
      changeOrigin: true,
      pathRewrite: {
        '^/apiMid': ''
      }
    }
  })
  .inline(true)
  .historyApiFallback(true)
  .hot(true)
  .compress(true)

config.performance.hints(false)

const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())