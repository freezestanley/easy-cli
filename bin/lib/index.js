#!/usr/bin/env node 
const command = require('commander')
const program = new command.Command()
const inquirer = require('inquirer')
const log = require("log")

const path = require('path')
const step = require('./step')
const icon = require('./icon')
const pk = require(path.resolve(__dirname,'../../package.json'))
const ejs = require('ejs')
const fs = require('fs-extra')
const perset = require('./perset')
const utils = require('./utils')
const ora = require('ora')


async function create (promptList, dir) {
  return await inquirer.prompt(promptList)
}
// 获取版本
program
  .version(pk.version)

program
  .command('create <project>')
  .action((dir, otherDirs) => {
    // 检查文件夹是否已存在
    const result = utils.checkDir(`${process.cwd()}/${dir}`)
    if (result) {
      create([
        step.first,
        step.mft,
        step.vue1,
        step.vue2,
        step.react1,
        step.react2
      ], 
      process.argv[3]).then((answers) => {
        fs.mkdirpSync(dir)
        if (answers.perset === 'default') {
          answers.select = answers.type === 'vue' ? perset.vue : perset.react
        }
        const spinner = new ora({
          discardStdin: false,
          text: 'start init...',
        })
        spinner.start()
        Promise.all(
          [
            ejs.renderFile(path.join(__dirname, './template/easyrc.js'), { 
              plugin: ['less', 'sass', 'babel', 'images', 'eslint', 'react'],// answers.select,
              mft: answers.mft,
              type: answers.type
            }),
            ejs.renderFile(path.join(__dirname, './template/package.json'), { 
              name: dir,
              plugin: ['less', 'sass', 'babel', 'images', 'eslint', 'react'], // answers.select
            })
          ]
        ).then((res) => {
          fs.writeFileSync(
            `${process.cwd()}/${dir}/.easyrc.js`,
            res[0]
          )
          fs.writeFileSync(
            `${process.cwd()}/${dir}/package.json`,
            res[1]
          )
          console.time(' timed: ')
          // 获取安装模块
          utils.install(`${process.cwd()}/${dir}`).then(success=>{
            console.timeEnd(' timed: ')
            console.time(' timed: ')
            // 获取成功，拉取模版
            spinner.text = 'create template...'
            utils.init(`${process.cwd()}/${dir}`).then(suc => {
              spinner.text = 'install '
              console.timeEnd(' timed: ')
              console.time(' timed: ')

              utils.install(`${process.cwd()}/${dir}`).then(
                su => {
                  console.timeEnd(' timed: ')
                  spinner.text = 'install success'
                  spinner.succeed()
              }, er => {
                console.log(er)
              })
              
            }, err => {
              console.log('create template error')
              console.log(err)
            })
            
          }, error=> {
            console.log('install template error')
            console.log(error)
          })
        })
      })
    }
  })

// 获取 help
program.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ custom-help --help');
    console.log('  $ custom-help -h');
  })

program.parse(process.argv)