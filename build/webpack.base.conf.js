'use strict'
const Config = require('webpack-chain')
const path = require('path')
const config = new Config()

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
//   'react': 'react',
//   'react-dom': 'ReactDOM',
//   'react-router-dom': 'reactRouterDom',
//   'vue': 'vue',
//   'vue-router': 'vueRouter',
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
//   .use('mini')
//   .loader(MiniCssExtractPlugin.loader).options({
//     hmr: env.isDev,
//     fallback: {
//       loader: require.resolve('style-loader'),
//       options: {
//         singleton: true
//       }
//     }
//   })
//   .end()
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

module.exports = config