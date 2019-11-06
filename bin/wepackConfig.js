const Config = require('webpack-chain')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs-extra');

/**
 * 设置webpack 模板
 * @param {*} plugin 
 */
function getWebpackConfig(plugin = [], templatePath, writePath) {
  //base
  const baseName = 'webpack.base.conf.js'
  ejs.renderFile(path.join(templatePath, baseName), { plugin: plugin }).then(res=>{
    fs.writeFileSync(
      path.join(writePath, baseName),
      res
    );
  })

  //dev
  const devName = 'webpack.dev.conf.js'
  ejs.renderFile(path.join(templatePath, devName), { plugin: plugin }).then(res=>{
    fs.writeFileSync(
      path.join(writePath, devName),
      res
    );
  })

  //base
  const prodName = 'webpack.product.conf.js'
  ejs.renderFile(path.join(templatePath, prodName), { plugin: plugin }).then(res=>{
    fs.writeFileSync(
      path.join(writePath, prodName),
      res
    );
  })
}

module.exports = {
  getWebpackConfig
}