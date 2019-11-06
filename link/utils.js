const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');

function npmInstall(root,dependencies) {
  return new Promise((resolve, reject) => {
    let command=process.platform === "win32" ? "npm.cmd" : "npm";
    let args= [
      'install',
      '--save',
      '--save-exact',
      '--loglevel',
      'error',
    ].concat(dependencies);
    
    // const childOutput = spawn.sync('npm', ['config', 'list']).output.join('');

    // args.push('--cwd');
    // args.push(root);
    
    const child = spawn(command, args, { stdio: 'inherit' });

    child.on('close', code => {
      // console.log("code:"+code)
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
}
//检查NPM
function checkThatNpmCanReadCwd() {
  const cwd = process.cwd();
  let childOutput = null;
  try {
    childOutput = spawn.sync('npm', ['config', 'list']).output.join('');
  } catch (err) {
    return true;
  }
  if (typeof childOutput !== 'string') {
    return true;
  }
  const lines = childOutput.split('\n');
 
  const prefix = '; cwd = ';
  const line = lines.find(line => line.indexOf(prefix) === 0);
  if (typeof line !== 'string') {
    // Fail gracefully. They could remove it.
    return true;
  }
  const npmCWD = line.substring(prefix.length);
  if (npmCWD === cwd) {
    return true;
  }
  console.error(
    chalk.red(
      `Could not start an npm process in the right directory.\n\n` +
        `The current directory is: ${chalk.bold(cwd)}\n` +
        `However, a newly started npm process runs in: ${chalk.bold(
          npmCWD
        )}\n\n` +
        `This is probably caused by a misconfigured system terminal shell.`
    )
  );
  if (process.platform === 'win32') {
    console.error(
      chalk.red(`On Windows, this can usually be fixed by running:\n\n`) +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKCU\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n` +
        `  ${chalk.cyan(
          'reg'
        )} delete "HKLM\\Software\\Microsoft\\Command Processor" /v AutoRun /f\n\n` +
        chalk.red(`Try to run the above two lines in the terminal.\n`) +
        chalk.red(
          `To learn more about this problem, read: https://blogs.msdn.microsoft.com/oldnewthing/20071121-00/?p=24433/`
        )
    );
  }
  return false;
}

/**
 * 检查npm包版本 并写入到package.json
 * @param {*} packageName 
 */
function checkPackageRange(packageName) {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkgJson = require(pkgPath);

  if (typeof pkgJson.dependencies === 'undefined') {
    console.error(chalk.red(`未在package.json中查找到 dependencies`));
    process.exit(1);
  }

  const packageVersion = pkgJson.dependencies[packageName];
  if (typeof packageVersion === 'undefined') {
    console.error(chalk.red(`无法在package.json中查找到${packageName}`));
    process.exit(1);
  }

  return packageVersion
}
//删除文件夹
function delDir(path){
  let files = [];
  if(fs.existsSync(path)){
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
          let curPath = path + "/" + file;
          if(fs.statSync(curPath).isDirectory()){
              delDir(curPath); //递归删除文件夹
          } else {
              fs.unlinkSync(curPath); //删除文件
          }
      });
      fs.rmdirSync(path);
  }
}

module.exports={
  install:npmInstall,
  checkThatNpmCanReadCwd,
  checkPackageRange,
  delDir
}