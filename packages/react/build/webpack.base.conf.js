'use strict'
const Config = require('webpack-chain')
const path = require('path')
const config = new Config()
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

// entry output 
config
  .entry('index')
    .add('./src/index.js')
    .end()
  .output
    .path(path.resolve(__dirname, '../dist'))
    .filename('[name].[hash:8].js')
    .publicPath('/')
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

// modules
// config.resolve.modules.add('node_modules').add('src')
config.resolve.modules.add('node_modules').add(path.resolve(__dirname, '../src'))

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
  .use('eslint-loader')
  .loader('eslint-loader')
  .options({
    formatter: require('eslint-friendly-formatter')
  }).end()


config.module.rule('eslint')
  .exclude.add(/(node_modules|bower_components)/).end()
  .include.add(path.resolve(__dirname,'../src')).end()
  .test(/\.js$/)
  .enforce('pre')
  .use('eslint-loader')
  .loader('eslint-loader')
  .options({
    formatter: require('eslint-friendly-formatter')
  }).end()


config.module.rule('ts')
  .exclude.add(/(node_modules|bower_components)/)
  .end()
  .include.add(path.resolve(__dirname,'../src')).end()
  .test(/\.tsx?$/)
  .use('ts-loader')
  .loader('ts-loader').options({
    happyPackMode: true
  }).end()

// css
config.module.rule('css')
  .test(/\.css$/)
  .exclude.add(/\.module\.css$/).end()
  .use('style')
  .loader('style-loader')
  .end()
  .use('css')
  .loader('css-loader')
  .options({
    importLoaders: 1
  })
  .end()

// cssModule
config.module.rule('cssModule')
  .test(/\.module\.css$/)
  .use('style')
  .loader('style-loader')
  .end()
  .use('css')
  .loader('css-loader')
  .options({
    importLoaders: 1,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent,
  })
  .end()

 
// sass
config.module.rule('sass')
  .test(/\.(scss|sass)$/)
  .exclude.add(/\.module\.(scss|sass)$/).end()
  .use('style')
  .loader('style-loader').end()
  .use('css')
  .loader('css-loader')
  .options({
    importLoaders: 2
  })
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-flexbugs-fixes')(),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')({
        features: {
          customProperties: {
            warnings: false
          }
        }
      }),
      // require('postcss-import')({ root: loader.resourcePath }),
      // require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]
  }).end()
  .use('sass')
  .loader('sass-loader')
  .end()
  // .use('js2style')
  // .loader('js-to-styles-var-loader').end()

// sassModule
config.module.rule('sassModule')
  .test(/\.module\.(scss|sass)$/)
  .use('style')
  .loader('style-loader').end()
  .use('css')
  .loader('css-loader')
  .options({
    importLoaders: 2,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent,
  })
  .end()
  .use('postcss')
  .loader('postcss-loader')
  .options({
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-flexbugs-fixes')(),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-normalize')({ forceImport: true }),
      require('postcss-cssnext')({
        features: {
          customProperties: {
            warnings: false
          }
        }
      }),
      // require('postcss-import')({ root: loader.resourcePath }),
      // require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
    ]
  }).end()
  .use('sass')
  .loader('sass-loader')
  .end()
  // .use('js2style')
  // .loader('js-to-styles-var-loader').end()

// less
config.module.rule('less')
  .test(/\.less$/)
  .exclude.add(/\.module\.less$/).end()
  .use('style')
    .loader('style-loader').end()
  .use('css')
    .loader('css-loader')
    .options({
      importLoaders: 2
    })
    .end()
  // .use('postcss')
  //   .loader('postcss-loader')
  //   .options({
  //     ident: 'postcss',
  //     plugins: (loader) => [
  //       require('postcss-flexbugs-fixes')(),
  //       require('postcss-preset-env')({
  //         autoprefixer: {
  //           flexbox: 'no-2009',
  //         },
  //         stage: 3,
  //       }),
  //       require('postcss-normalize')({ forceImport: true }),
  //       require('postcss-cssnext')({
  //         features: {
  //           customProperties: {
  //             warnings: false
  //           }
  //         }
  //       }),
  //       // require('postcss-import')({ root: loader.resourcePath }),
  //       // require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
  //     ]}).end()
  .use('less')
    .loader('less-loader')
    .options({
      javascriptEnabled: true,
      modifyVars: {
        'primary-color': '#4FC58B',
      }
    }).end()
  // .use('js2style')
  //   .loader('js-to-styles-var-loader').end()

// lessModule
config.module.rule('lessModule')
  .test(/\.module\.less$/)
  .use('style')
  .loader('style-loader').end()
  .use('css')
  .loader('css-loader')
  .options({
    importLoaders: 2,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent,
  })
  .end()
  // .use('postcss')
  // .loader('postcss-loader')
  // .options({
  //   ident: 'postcss',
  //   plugins: (loader) => [
  //     require('postcss-flexbugs-fixes')(),
  //     require('postcss-preset-env')({
  //       autoprefixer: {
  //         flexbox: 'no-2009',
  //       },
  //       stage: 3,
  //     }),
  //     require('postcss-normalize')({ forceImport: true }),
  //     require('postcss-cssnext')({
  //       features: {
  //         customProperties: {
  //           warnings: false
  //         }
  //       }
  //     }),
  //     // require('postcss-import')({ root: loader.resourcePath }),
  //     // require('postcss-selector-namespace')({ selfSelector: ':namespace', namespace: `` })
  //   ]
  // }).end()
  .use('less')
  .loader('less-loader')
  .options({
    javascriptEnabled: true,
  }).end()
  // .use('js2style')
  //   .loader('js-to-styles-var-loader').end()


config.module.rule('images')
  .test(/\.(png|jpg|gif|svg)$/i)
  .use('url')
  .loader('url-loader').options({
    limit: 8192,
    quality: 85,
    name: 'images/[name].[hash:8].[ext]',
  }).end()


module.exports = config