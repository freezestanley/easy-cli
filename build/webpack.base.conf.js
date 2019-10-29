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
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const config = new Config()

// entry output 
config
  .entry('index')
    .add('./src/index.js')
    .end()
  .mode('development')
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[chunkhash:8].js')
    .publicPath('http://localhost:7010/')
    .library('other')
    .libraryTarget('umd')

// devtool
config => config.devtool('cheap-module-eval-source-map')
config.when(
    process.env.NODE_ENV === 'production',
    config => config.devtool('source-map')
)

// extensions
const fileType = ['.ts', '.tsx', '.js', '.json']
  fileType.map((ele) => {
    config.resolve.extensions.add(ele)
  })
config.resolve.extensions.end()

// alias
config.resolve.alias.set('react-native','react-native-web')

// externals
config.externals({
  'react': 'react',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'reactRouterDom',
  'vue': 'vue',
  'vue-router': 'vueRouter',
})

// module
config.module
  .rule('compile')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
    .test(/\.js|jsx|mjs$/)
    .use('babel')
    .loader('babel-loader')

config.module.rule('less')
  .test(/\.less$/)
  .use('mini')
  .loader(MiniCssExtractPlugin.loader).options({
    hmr: process.env.NODE_ENV === 'development',
  })
  .end()
  // .use('style')
  // .loader('style-loader')
  // .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('less')
  .loader('less-loader')
  .end()
  .use('js2style')
  .loader('js-to-styles-var-loader')
  .end()

config.module.rule('sass')
  .test(/\.s[ac]ss$/i)
  .use('mini')
  .loader(MiniCssExtractPlugin.loader).options({
    hmr: process.env.NODE_ENV === 'development',
  })
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('sass')
  .loader('sass-loader')
  .end()
  .use('js2style')
  .loader('js-to-styles-var-loader')
  .end()


// plugin
config
  .plugin('progress')
    .use(webpack.ProgressPlugin)
    .end()
  .plugin('clean')
    .use(CleanWebpackPlugin)
    .end()
  .plugin('HashedModule')
    .use(webpack.HashedModuleIdsPlugin)
    .end()
  .plugin('HardSourceWebpackPlugin')
    .use(HardSourceWebpackPlugin)
    .end()
  .plugin('Compression')
    .use(CompressionPlugin, [{
      algorithm: 'gzip',
      test: /\.js(\?.*)?$/i,
      threshold: 10240,
      minRatio: 0.8
    }]).end()
  .plugin('MiniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [{
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
  }]).end()
  .plugin('OptimizeCssAssetsPlugin')
    .use(OptimizeCssAssetsPlugin).end()
  .plugin('PurifyCSS')
  .use(PurifyCSS, [{
    paths: glob.sync([
      path.resolve(__dirname, '../src/*.js')
    ])
  }]).end()
  .plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin)
    .end()



const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())