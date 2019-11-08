const fs = require('fs-extra')
const path = require('path')

module.exports = (copyPath, options) => {
  fs.copy(path.resolve(__dirname, 'network'), path.join(copyPath, 'network/'), function(err) {
    if (err) return console.error(err)
  })
}
