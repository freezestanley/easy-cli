
const Config = require('webpack-chain')
const path = require('path')
const config = new Config()
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractTextPlugin = new ExtractTextPlugin("style.css")

// config.name('vue-test')

// entry output 
config
  .context(path.resolve(__dirname, '../'))
  .entry('app')
    .add('./src/main.js')
    .end()
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].js')
    .publicPath('/')
    .library('other')
    .libraryTarget('umd')

/**
 * resolve
 */
// extensions
const fileType = ['.mjs','.js','.jsx','.vue','.json','.wasm']
  fileType.map((ele) => {
    config.resolve.extensions.add(ele)
  })
config.resolve.extensions.end()
// alias
config.resolve.alias.set('@', path.resolve(__dirname, '../src'))
// externals
config.externals({
//   'react': 'react',
//   'react-dom': 'ReactDOM',
//   'react-router-dom': 'reactRouterDom',
//   'vue': 'vue',
//   'vue-router': 'vueRouter',
})

/**
 * module
 */
// noParse
config.module.noParse(/^(vue|vue-router|vuex|vuex-router-sync)$/)

// rules
// vue-loader
config.module
  .rule('vue')
    .test(/\.vue$/)
      .use('cache-loader')
        .loader('cache-loader')
        .end()
      .use('vue-loader')
        .loader('vue-loader')
        .options({
          compilerOptions: {
            preserveWhitespace: true
          },
          extractCSS: extractTextPlugin
        })

// static assets ----------------------------------------------------------
config.module
  .rule('images')
    .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      })

// do not base64-inline SVGs.
// https://github.com/facebookincubator/create-react-app/pull/1180
config.module
  .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'static/img/[name].[hash:8].[ext]'
      })

config.module
  .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      })

config.module
  .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'static/fonts/[name].[hash:8].[ext]'
          }
        }
      })

config.module
  .rule('css')
    .test(/\.css$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()

config.module
  .rule('postcss')
    .test(/\.p(ost)?css$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .end()

config.module
  .rule('scss')
    .test(/\.scss$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .end()
        .end()

config.module
  .rule('sass')
    .test(/\.sass$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .options({
            indentedSyntax: true
          })
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .options({
            indentedSyntax: true
          })
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .options({
            indentedSyntax: true
          })
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('sass')
          .loader('sass-loader')
          .options({
            indentedSyntax: true
          })
          .end()
        .end()

config.module
  .rule('less')
    .test(/\.less$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('less')
          .loader('less-loader')
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('less')
          .loader('less-loader')
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('less')
          .loader('less-loader')
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('less')
          .loader('less-loader')
          .end()
        .end()

config.module
  .rule('stylus')
    .test(/\.styl(us)?$/)
      .oneOf('vue-modules')
        .resourceQuery(/module/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('stylus')
          .loader('stylus-loader')
          .options({
            preferPathResolver: 'webpack'
          })
          .end()
        .end()
      .oneOf('vue')
        .resourceQuery(/\?vue/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('stylus')
          .loader('stylus-loader')
          .options({
            preferPathResolver: 'webpack'
          })
          .end()
        .end()
      .oneOf('normal-modules')
        .resourceQuery(/\.module\.\w+$/)
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:5]'
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('stylus')
          .loader('stylus-loader')
          .options({
            preferPathResolver: 'webpack'
          })
          .end()
        .end()
      .oneOf('normal')
        .use('vue-style')
          .loader('vue-style-loader')
          .end()
        .use('css')
          .loader('css-loader')
          .options({
            sourceMap: false,
            importLoaders: 2,
          })
          .end()
        .use('postcss')
          .loader('postcss-loader')
          .options({
            sourceMap: false,
          })
          .end()
        .use('stylus')
          .loader('stylus-loader')
          .options({
            preferPathResolver: 'webpack'
          })
          .end()
        .end()

config.module
  .rule('js')
    .test(/\.m?jsx?$/)
    .exclude.add(/node_modules/).end()
    .include.add(path.resolve(__dirname,'../src')).end()
    .use('babel')
      .loader('babel-loader')
      .options({
        "presets": ["@babel/preset-env", "@vue/babel-preset-jsx"],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-transform-react-jsx-self",
          '@babel/plugin-transform-runtime'
        ]
      })


config.module
  .rule('eslint')
    .test(/\.(vue|(j|t)sx?)$/)
    .enforce('pre')
    .include.add(path.resolve(__dirname, '../src')).end()
    .exclude.add(/node_modules/).end()
    .use('eslint')
      .loader('eslint-loader')
      .options({
        extensions: ['.js','.jsx','.vue'],
        cache: true,
        emitWarning: true,
        emitError: false,
        formatter: require('eslint-friendly-formatter'),
        ignore: true,
      })

// 这是为了跑的这个项目加的
config.module
  .rule('svg')
  .exclude.add(path.resolve(__dirname, '../src/icons'))
  .end()
config.module
  .rule('icons')
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, '../src/icons')).end()
    .use('svg-sprite')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
const oneOfsMap = config.module.rule('scss').oneOfs.store
oneOfsMap.forEach(item => {
  item
    .use('sass-resources-loader')
    .loader('sass-resources-loader')
    .options({
      // Provide path to the file with resources
      resources: path.resolve(__dirname, '../src/styles/variables.scss')

      // Or array of paths
      // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
    })
    .end()
})

/**
 * plugins
 */
// vue-loader必须的plugin
config
  .plugin('vue-loader')
  .use(require('vue-loader/lib/plugin'))
// css分包
config
  .plugin('extract-text-webpack')
  .use(ExtractTextPlugin, ["style.css"])
// 定义环境变量的
config
  .plugin('define')
  .use(require('webpack').DefinePlugin, [
    {
      'process.env': JSON.stringify({
        VUE_APP_BASE_API: '/dev-api',
        VUE_APP_OSS_PATH: 'https://za-charity-tst.oss-cn-hzfinance.aliyuncs.com/',
        VUE_APP_SUPER_MANAGE_URL: 'http://17956-finance-bscf-scf-trans-service.test.za-tech.net/modeler.html',
        NODE_ENV: 'development',
        BASE_URL: '/'
      })
    }
  ])

config
  .plugin('case-sensitive-paths')
  .use(require('case-sensitive-paths-webpack-plugin'))

config
  .plugin('friendly-errors')
  .use(require('@soda/friendly-errors-webpack-plugin'), [{
    
  }])


module.exports = config