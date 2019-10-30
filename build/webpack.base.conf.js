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
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const glob = require('glob-all')
const config = new Config()

// entry output 
config
  .entry('index')
    .add('./src/index.js')
    .end()
  .mode('production')
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[hash:8].js')
    // .publicPath()
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
// config.externals({
//   'react': 'react',
//   'react-dom': 'ReactDOM',
//   'react-router-dom': 'reactRouterDom',
//   'vue': 'vue',
//   'vue-router': 'vueRouter',
// })

// module
config.module
  .rule('compile')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
  .include.add(path.resolve(__dirname,'../src')).end()
  .test(/\.js|jsx|mjs$/)
  .use('babel')
  .loader('babel-loader')
  


config.module.rule('less')
  .test(/\.less$/)
  .use('mini')
  .loader(MiniCssExtractPlugin.loader).options({
    hmr: process.env.NODE_ENV === 'development',
    fallback: {
      loader: require.resolve('style-loader'),
      options: {
        singleton: true
      }
    }
  })
  .end()
  .use('css')
  .loader('css-loader')
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-preset-env')(),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')(),
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]})
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
    fallback: {
      loader: require.resolve('style-loader'),
      options: {
        singleton: true
      }
    }
  }).end()
  .use('css')
  .loader('css-loader').end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-preset-env')(),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')(),
      require('postcss-import')({ root: loader.resourcePath }),
      require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]}).end()
  .use('sass')
  .loader('sass-loader').end()
  .use('js2style')
  .loader('js-to-styles-var-loader').end()

config.module.rule('images')
  .test(/\.(png|jpg|gif)$/i)
  .use('urlloader')
  .loader('url-loader').options({
    limit: 8192,
    quality: 85,
    name: '../dist/images/[name].[hash:8].[ext]',
  }).end()


// plugin
config  
  .plugin('progress')
    .use(webpack.ProgressPlugin).end()
  .plugin('IgnorePlugin')
    .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]).end()
  .plugin('htmlwebpackplugin')
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
  .plugin('PreloadWebpackPlugin')
    .use(PreloadWebpackPlugin, [{
      rel: 'preload',
      as: 'script'
    }]).end()
  .plugin('ScriptExtHtmlWebpackPlugin')
    .use(ScriptExtHtmlWebpackPlugin, [{
      preload: /\.js$/,
      defaultAttribute: 'defer'
    }]).end()
  .plugin('HardSourceWebpackPlugin')
    .use(HardSourceWebpackPlugin).end()
  
  .plugin('ModuleConcatenationPlugin')
    .use(webpack.optimize.ModuleConcatenationPlugin).end()
  .plugin('HashedModule')
    .use(webpack.HashedModuleIdsPlugin).end()
  .plugin('Compression')
    .use(CompressionPlugin, [{
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.7
    }]).end()
  
  .plugin('PurifyCSS')
    .use(PurifyCSS, [{
      paths: glob.sync([
        path.resolve(__dirname, '../src/*.js')
      ])
    }]).end()
  .plugin('MiniCssExtractPlugin')
    .use(MiniCssExtractPlugin, [{
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[name].[contenthash:8].css"
  }]).end()
  .plugin('OptimizeCssAssetsPlugin')
    .use(OptimizeCssAssetsPlugin, [{ cssProcessorOptions: { safe: true } }]).end()
  .plugin('HotModuleReplacementPlugin')
    .use(webpack.HotModuleReplacementPlugin).end()
  .plugin('clean')
    .use(CleanWebpackPlugin).end()

  // .plugin('BundleAnalyzerPlugin')
  //   .use(BundleAnalyzerPlugin)
  //   .end()

// devServer
config.devServer.contentBase('../dist')
  .port(8080)
  .inline(true)
  .historyApiFallback(true)
  .hot(true)
  .compress(true)


// nodeEnv: 'production',
//         minimizer: [ new UglifyJSPlugin() ],
//         namedChunks: true,
//         runtimeChunk: {
//             name: 'manifest'
//         },
//         splitChunks: {
//             minSize: 30000,
//             minChunks: 1,
//             maxAsyncRequests: 5,
//             maxInitialRequests: 3,
//             name: false,
//             cacheGroups: {
//                 vendor: {
//                     test: /[\\/]node_modules[\\/]/,
//                     name: 'vendor',
//                     chunks: 'initial',
//                     reuseExistingChunk: true
//                 }
//             }
//         }
config.optimization
  .minimizer('css')
  .use(OptimizeCssAssetsPlugin, [{ cssProcessorOptions: { safe: true } }])
  .end()
  .minimizer('js')
  .use(UglifyJSPlugin)
  .end()



const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())