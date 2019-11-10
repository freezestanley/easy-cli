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
        
        Promise.all(
          [
            ejs.renderFile(path.join(__dirname, './template/zarc.js'), { 
              plugin: ['less', 'sass'],// answers.select,
              mft: answers.mft,
              type: answers.type
            }),
            ejs.renderFile(path.join(__dirname, './template/package.json'), { 
              name: dir,
              plugin: ['less', 'sass'], // answers.select
            })
          ]
        ).then((res) => {
          fs.writeFileSync(
            `${process.cwd()}/${dir}/.zarc.js`,
            res[0]
          )
          fs.writeFileSync(
            `${process.cwd()}/${dir}/package.json`,
            res[1]
          )
          // npm install
          utils.install(`${process.cwd()}/${dir}`).then((success) => {
            // eyweb init
            utils.init(`${process.cwd()}/${dir}`).catch(err => {
              console.log(err)
            })

          }, (fail) => {
            console.log(fail)
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