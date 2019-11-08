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

// // plugin
// config.plugin('htmlwebpackplugin')
//     .use(HtmlWebpackPlugin, [
//     Object.assign(
//         {},
//         {
//         inject: true,
//         template: path.resolve(__dirname, '../index.html')
//         },
//         {
//         minify: {
//             removeComments: true,
//             collapseWhitespace: true,
//             removeRedundantAttributes: true,
//             useShortDoctype: true,
//             removeEmptyAttributes: true,
//             removeStyleLinkTypeAttributes: true,
//             keepClosingSlash: true,
//             minifyJS: true,
//             minifyCSS: true,
//             minifyURLs: true,
//         }
//         }
//     )
//     ]).end()
//   .plugin('HotModuleReplacementPlugin')
//   .use(webpack.HotModuleReplacementPlugin).end()

// devServer
config.devServer.contentBase('../dist')
  .port(9527)
  .proxy({
    '/dev-api': {
      target: 'http://17956-finance-bscf-scf-ops.test.za-tech.net',
      changeOrigin: true,
      pathRewrite: {
        '^/dev-api': ''
      }
    }
  })
  .inline(true)
  .historyApiFallback(true)
  .hot(true)
  .compress(true)

config.performance.hints(false)

config
  .plugin('hmr')
  .use(require('webpack').HotModuleReplacementPlugin)

config
  .plugin('progress')
  .use(require('webpack').ProgressPlugin)

config.plugin('html')
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
  ])

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

const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())