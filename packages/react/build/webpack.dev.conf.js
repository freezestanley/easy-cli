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

config.module.rule('sass')
.use('style-loader')
.loader('style-loader').before('css').end()

config.module.rule('less')
.use('style-loader')
.loader('style-loader').before('css').end()

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
  .port(8080)
  .inline(true)
  .historyApiFallback(true)
  .hot(true)
  .compress(true)

config.performance.hints(false)

const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())