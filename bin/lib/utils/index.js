const ora = require('ora')
const execa = require('execa')
const chalk = require('chalk')
const dir = require('./dir')

const checkDir = (dirPath) => {
    try {
      fs.accessSync(dirPath)
      console.error(chalk.red(`${icon.wow} project exist`))
    } catch (error) {
      return true 
    }
  }
async function npminstall (dir, command) {
    return await new Promise((resolve, reject) => {
      execa("npm",["i"], {
          cwd: dir + '/',
          stdio: ['inherit']
      }).then(result => {
        resolve(result)
      }).catch(e => {
        reject(e)
      })
    })
  }

async function init (dir) {
    return await new Promise((resolve, reject) => {
        const spinner = new ora({
            discardStdin: false,
            text: 'easy init',
          })
        execa('npx',['easy', 'init'],{
            cwd: dir + '/',
            stdio: ['inherit']
        }).then(result => {
          resolve(result)
        }).catch(e => {
          reject(e)
        })
    })
}
module.exports = {
    install: npminstall,
    checkDir,
    init
  }