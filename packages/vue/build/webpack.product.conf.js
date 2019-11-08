'use strict'
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
config.mode(env.PRODUCTION)

// config.module.rule('sass')
// .use('mini')
// .loader(MiniCssExtractPlugin.loader).options({
//   hmr: process.env.NODE_ENV === 'development',
//   fallback: {
//     loader: require.resolve('style-loader'),
//     options: {
//       singleton: true
//     }
//   }
// }).before('css').end()

// config.module.rule('less')
// .use('mini')
// .loader(MiniCssExtractPlugin.loader).options({
//   hmr: process.env.NODE_ENV === 'development',
//   fallback: {
//     loader: require.resolve('style-loader'),
//     options: {
//       singleton: true
//     }
//   }
// }).before('css').end()


// plugin
config  
  .plugin('progress')
    .use(webpack.ProgressPlugin).end()
  .plugin('IgnorePlugin')
    .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]).end()
  .plugin('html')
    .use(require('html-webpack-plugin'), [
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, '../public/index.html'),
          favicon: path.resolve(__dirname, '../public/favicon.ico'),
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            removeScriptTypeAttributes: true
          },
        }
      )
    ]).end()
  .plugin('PreloadWebpackPlugin')
    .use(PreloadWebpackPlugin, [{
      rel: 'preload',
      as: 'script'
    }]).end()
  // .plugin('ScriptExtHtmlWebpackPlugin')
  //   .use(ScriptExtHtmlWebpackPlugin, [{
  //     preload: /\.js$/,
  //     defaultAttribute: 'defer'
  //   }]).end()
  .plugin('HardSourceWebpackPlugin')
    .use(HardSourceWebpackPlugin).end()
  .plugin('ModuleConcatenationPlugin')
    .use(webpack.optimize.ModuleConcatenationPlugin).end()
  .plugin('HashedModule')
    .use(webpack.HashedModuleIdsPlugin).end()
  // .plugin('Compression')
  //   .use(CompressionPlugin, [{
  //     algorithm: 'gzip',
  //     threshold: 10240,
  //     minRatio: 0.7
  //   }]).end()
  // .plugin('PurifyCSS')
  //   .use(PurifyCSS, [{
  //     paths: glob.sync([
  //       path.resolve(__dirname, '../src/*.js')
  //     ])
  //   }]).end()
  // .plugin('MiniCssExtractPlugin')
  //   .use(MiniCssExtractPlugin, [{
  //     filename: "[name].[contenthash:8].css",
  //     chunkFilename: "[name].[contenthash:8].css"
  //   }]).end()
  .plugin('OptimizeCssAssetsPlugin')
    .use(OptimizeCssAssetsPlugin, [{ cssProcessorOptions: { safe: true } }]).end()
  .plugin('NamedModulesPlugin')
    .use(webpack.NamedModulesPlugin).end()
  .plugin('clean')
    .use(CleanWebpackPlugin).end()
  .plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin)
    .end()

config.plugin('copy')
  .use(require('copy-webpack-plugin'), [[{
    from: path.resolve(__dirname, '../public'),
    to: path.resolve(__dirname, '../dist'),
    toType: 'dir',
    ignore: [
      '.DS_Store'
    ]
  }]])

config
  .plugin('ScriptExtHtmlWebpackPlugin')
  .after('html')
  .use('script-ext-html-webpack-plugin', [
    {
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }
  ])
  .end()

// 模版里的变量
config
  .plugin('html')
  .tap(args => {
    args[0].templateParameters = {
      VUE_APP_BASE_API: "/dev-api",
      VUE_APP_OSS_PATH: "https://za-charity-tst.oss-cn-hzfinance.aliyuncs.com/",
      VUE_APP_SUPER_MANAGE_URL: "http://17956-finance-bscf-scf-trans-service.test.za-tech.net/modeler.html",
      NODE_ENV: "development",
      BASE_URL: "/",
      webpackConfig: config
    }
    return args
  })

// devtool
config.devtool('source-map')
config.optimization
  .minimize(true)
  .minimizer('OptimizeCssAssetsPlugin')
  .use(OptimizeCssAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
  .end()
  .minimizer('TerserPlugin')
  .use(TerserPlugin)
  .end()
  .namedChunks(true)
  .runtimeChunk({ name: 'runtime' })
  .splitChunks({
    minSize: 3000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: false,
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial',
        reuseExistingChunk: true
      }
    }
  })
  .removeEmptyChunks(true)

const result = config.toString()
module.exports = merge({}, config.toConfig())