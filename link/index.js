#!/usr/bin/env node 
const command = require('commander');
const program = new command.Command();
const inquirer = require('inquirer')
const shell = require('shelljs')
const log = require("log")
const chalk = require('chalk')
const path = require('path')
const step = require('./step')
const icon = require('./icon')
const pk = require(path.resolve(__dirname,'../package.json'))
const fs = require('fs')

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
    console.log('========')
    console.log(answers)
    if (!shell.which('git')) {
      shell.echo('Sorry, this script requires git');
      shell.exit(1);
    }
    shell.exec(`cp -rf ${path.resolve(__dirname, '../packages/react/')} ${process.cwd()}/${dir}/`)
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
        step.react2,
        step.ui
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