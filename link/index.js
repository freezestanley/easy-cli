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
  shell.exec(`cp -rf ${path.resolve(__dirname, '../packages/react/')} ${process.cwd()}/${dir}/`)
}
const create = (promptList, dir) => {
  inquirer.prompt(promptList).then((answers) => {
    console.log(answers)
    doit(answers, dir)
  })
}

program
  .command('rmdir <dir> [otherDirs...]')
  .action(function (dir, otherDirs) {
    console.log('rmdir %s', dir);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  })
  
program
  .version('0.1.0')

program
  .command('create <project>')
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