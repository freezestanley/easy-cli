#!/usr/bin/env node 
const command = require('commander');
const program = new command.Command();
const inquirer = require('inquirer')
const shell = require('shelljs')
const log = require("log")
const chalk = require('chalk')
const path = require('path')
const step = require('./step')
const aqa = path.resolve(__dirname,'../package.json')
const pk = require(aqa)

function doit (answer, dir) {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  // shell.exec('git clone https://github.com/freezestanley/electronDemo.git')
  // console.log(chalk.blue('Hello world!'));
  // console.log(__dirname)
  // console.log(__filename)
  // console.log(path.resolve("."))
  // console.log(process.cwd())
  shell.exec(`cp -rf ${__dirname}/as/ ${process.cwd()}/${dir}/`)
}
const create = (promptList, dir) => {
  inquirer.prompt(promptList).then((answers) => {
    doit(answers, dir)
  })
}

program
  .version(pk.version)

program
  .command('create <project>', '生成项目')
  .action((dir, otherDirs) => {
    console.log('fasdfasdf')
    create([
      step.first,
      step.mft,
      step.vue1,
      step.vue2,
      step.react1,
      step.react2], 
    process.argv[3])
  })

program.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ custom-help --help');
    console.log('  $ custom-help -h');
  })

program.parse(process.argv)