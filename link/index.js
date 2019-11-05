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

function doit () {
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
  shell.exec(`cp -rf ${__dirname}/as ${process.cwd()}`)
}
const create = (promptList) => {
  inquirer.prompt(promptList).then((answers) => {
    // log(answers)
    doit(answers)
  })
}



// program.parse(process.argv);
// program.version(pk.version).option('-f, --foo', 'enable some foo')
// program.on('--help', function(){
//   console.log('');
//   console.log('Examples:');
//   console.log('  $ custom-help --help');
//   console.log('  $ custom-help -h');
// });
// program.parse(process.argv);
// console.log(`You ordered a pizza with  and `);

// program
//   .requiredOption('-c, --cheese <type>', 'pizza must have cheese');
program
  .option('-f, --foo', 'enable some foo').action(function (dir, cmdObj) {
    // console.log('remove ' + JSON.stringify(dir) + JSON.stringify(cmdObj))
    create([
      step.first,
      step.mft,
      step.vue1,
      step.vue2,
      step.react1,
      step.react2])
  })

program.on('--help', function(){
    console.log('');
    console.log('Examples:');
    console.log('  $ custom-help --help');
    console.log('  $ custom-help -h');
  })
program.version(pk.version)
program.parse(process.argv)
// console.log(process.argv)
