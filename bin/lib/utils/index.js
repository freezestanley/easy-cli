const ora = require('ora')
const execa = require('execa')
const chalk = require('chalk')

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
  
      const spinner = new ora({
        discardStdin: false,
        text: 'start init...',
      })
  
      spinner.start()
      const options = command == "npm" ? ['install', '--loglevel', 'error'] : ['add']
      const subprocess = execa('npm',options,{
        cwd: dir + '/',
        stdio: ['inherit']
      });
      subprocess.on('close', code => {
        if (code !== 0) {
          spinner.text = 'init error'
          reject(`command failed: ${command}`)
          return
        }
        subprocess.kill('SIGTERM', {
          forceKillAfterTimeout: 2000
        })
        spinner.text = 'init success'
        spinner.succeed()
        resolve('success')
      })
    })
  }

async function init (dir) {
    return await new Promise((resolve, reject) => {
        const spinner = new ora({
            discardStdin: false,
            text: 'easy init',
          })
        const subprocess = execa('npx',['easy', 'init'],{
            cwd: dir + '/',
            stdio: ['inherit']
        });
        subprocess.on('close', code => {
            if (code !== 0) {
                spinner.text = `init error ${code}`
                spinner.succeed()
                subprocess.kill('SIGTERM', {
                    forceKillAfterTimeout: 2000
                })
                reject(`command failed: eyweb init`)
                return
            }
            subprocess.kill('SIGTERM', {
                forceKillAfterTimeout: 2000
            })
            spinner.text = 'init done'
            spinner.succeed()
            resolve('success')
        })
    })
}
module.exports = {
    install: npminstall,
    checkDir,
    init
  }