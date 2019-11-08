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

function copyFolder(from, to) {        // 复制文件夹到指定目录
    let files = [];
    if (fs.existsSync(to)) {           // 文件是否存在 如果不存在则创建
        files = fs.readdirSync(from);
        files.forEach(function (file, index) {
            var targetPath = from + "/" + file;
            var toPath = to + '/' + file;
            if (fs.statSync(targetPath).isDirectory()) { // 复制文件夹
                copyFolder(targetPath, toPath);
            } else {                                    // 拷贝文件
                fs.copyFileSync(targetPath, toPath);
            }
        });
    } else {
        fs.mkdirSync(to);
        copyFolder(from, to);
    }
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
  // checkThatNpmCanReadCwd,
  checkPackageRange,
  delDir,
  copyFolder
}