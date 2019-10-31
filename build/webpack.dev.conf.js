'use strict'
const Config = require('webpack-chain')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PurifyCSS = require('purifycss-webpack')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const glob = require('glob-all')
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