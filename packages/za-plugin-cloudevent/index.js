const fs = require('fs-extra')
const path = require('path')

module.exports = (copyPath, options) => {
  return new Promise((resolve, reject) => {
    fs.copy(path.resolve(__dirname, 'network'), path.join(copyPath, 'network/'), function(err) {
      if (err) {
        reject(err)
        return console.error(err)
      }
      resolve()
    })
  })
}
