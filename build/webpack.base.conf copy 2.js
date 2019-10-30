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
const config = new Config()

console.log(env.isDev)
// entry output 
config
  .entry('index')
    .add('./src/index.js')
    .end()
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[hash:8].js')
    // .publicPath()
    .library('other')
    .libraryTarget('umd')


// extensions
const fileType = ['.ts', '.tsx', '.js', '.json', '.vue', '.jsx']
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
config.module.rule('compile')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
  .include.add(path.resolve(__dirname,'../src')).end()
  .test(/\.js|jsx|mjs$/)
  .use('babel')
  .loader('babel-loader').options({
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-react-jsx-self"
    ]
  }).end()


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

config.mode(env.isDev ? env.DEVELOPMENT : env.PRODUCTION)
config.devtool(env.isDev ? 'cheap-module-eval-source-map' : 'source-map')

// plugin
config  
.plugin('progress')
  .use(webpack.ProgressPlugin).end()
.plugin('htmlwebpackplugin')
  .use(HtmlWebpackPlugin, [
    Object.assign(
      {},
      {
        inject: true,
        template: path.resolve(__dirname, '../index.html')
      },
      env.isDev ?
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
      } : {}
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
.plugin('DefinePlugin')
  .use(webpack.DefinePlugin, [{
    // 'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
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
.plugin('NamedModulesPlugin')
  .use(webpack.NamedModulesPlugin).end()
.plugin('clean')
  .use(CleanWebpackPlugin).end()

config.when(env.isDev, config => {
  config.plugin('HotModuleReplacementPlugin')
  .use(webpack.HotModuleReplacementPlugin).end()
  
  // devServer
  config.devServer.contentBase('../dist')
    .port(8080)
    .inline(true)
    .historyApiFallback(true)
    .hot(true)
    .compress(true)
})

config.when(env.isPrd, config => {
  config.plugin('Compression')
    .use(CompressionPlugin, [{
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.7
    }]).end()
  config.plugin('IgnorePlugin')
    .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]).end()
  config.plugin('BundleAnalyzerPlugin')
    .use(BundleAnalyzerPlugin)
    .end()
})

const result = config.toString()
console.log(result)
module.exports = merge({}, config.toConfig())