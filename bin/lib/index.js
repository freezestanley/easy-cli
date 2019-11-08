#!/usr/bin/env node 
const command = require('commander')
const program = new command.Command()
const inquirer = require('inquirer')
const log = require("log")
const chalk = require('chalk')
const path = require('path')
const step = require('./step')
const icon = require('./icon')
const pk = require(path.resolve(__dirname,'../../package.json'))
const ejs = require('ejs')
const fs = require('fs-extra')
const perset = require('./perset')
const spawn = require('cross-spawn')
const utils = require('./utils')

const checkDir = (dirPath) => {
  try {
    fs.accessSync(dirPath)
    console.error(chalk.red(`${icon.wow} 该项目已存在`))
  } catch (error) {
    return true 
  }
}

const create = (promptList, dir) => {
  inquirer.prompt(promptList).then((answers) => {
    fs.mkdirpSync(dir)
    if (answers.perset === 'default') {
      answers.select = answers.type === 'vue' ? perset.vue : perset.react
    }

    ejs.renderFile(path.join(__dirname, './template/zarc.js'), { 
      plugin: answers.select,
      mft: answers.mft,
      type: answers.type
    }).then(res=>{
      fs.writeFileSync(
        `${process.cwd()}/${dir}/.zarc.js`,
        res
      );
    })
    ejs.renderFile(path.join(__dirname, './template/package.json'), { 
      name: dir
    }).then(res=>{
      fs.writeFileSync(
        `${process.cwd()}/${dir}/package.json`,
        res
      )
      utils.install()
     
      const child = spawn('npm', ['i', '-depth', '0'], { stdio: 'inherit' })
      console.log(chalk.green('success!'))
    })
    
  })
}

// 获取版本
program
  .version(pk.version)

program
  .command('create <project>')
  .action((dir, otherDirs) => {
    const result = checkDir(`${process.cwd()}/${dir}`)
    if (result) {
      create([
        step.first,
        step.mft,
        step.vue1,
        step.vue2,
        step.react1,
        step.react2
      ], 
      process.argv[3])
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