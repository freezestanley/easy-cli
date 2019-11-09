const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const ora = require('ora');
const download = require('download-git-repo')
const execa = require('execa');
const spinner = ora('正在下载模板…');

async function npmInstall(targetDir, command) {
  const npmSpinner = ora('开始安装NPM包…');
  return await new Promise((resolve, reject) => {

    const options = command == "npm" ? ['install', '--loglevel', 'error'] : ['add']
    const child = execa(command, options, {
      cwd: targetDir + '/',
      stdio: ['inherit']
    })
    npmSpinner.start()
    child.stdout.on('data', buffer => {
      let str = buffer.toString().trim()
      if (str && command === 'yarn' && str.indexOf('"type":') !== -1) {
        const newLineIndex = str.lastIndexOf('\n')
        if (newLineIndex !== -1) {
          str = str.substr(newLineIndex)
        }
        try {
          const data = JSON.parse(str)
          if (data.type === 'step') {
            // progress.enabled = false
            // progress.log(data.data.message)
          } else if (data.type === 'progressStart') {
            // progressTotal = data.data.total
          } else if (data.type === 'progressTick') {
            // const time = Date.now()
            // if (time - progressTime > 20) {
            //   progressTime = time
            //   progress.progress = data.data.current / progressTotal
            // }
          } else {
            console.log("npm install complete！")
            // progress.enabled = false
          }
        } catch (e) {
          console.error(e)
          console.log(str)
        }
      } else {
        // console.log(buffer)

        // process.stdout.write(buffer)
      }
    })

    child.on('close', code => {
      npmSpinner.stop()
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(' ')}`)
        return
      }
      resolve()
    })

  });
}
/**
 * 拷贝目录
 * @param {*} from 
 * @param {*} to 
 */
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
 * 新建文件夹
 * @param {*} path 
 */
function createFolder(path) {
  fs.mkdir(path, function (err) {
    if (err) {
      return console.error(err);
    }
  });
  // try{
  //   if(fs.statSync(path).isDirectory())
  //     fs.mkdir(path)
  //   else
  //     console.log(`${path} 目录已存在`)
  //   }catch(e){
  //       console.log(e)
  //   }  
}
/**
 * 从 github 上下载已有的模版
 * @param {*} projectName 项目名称
 * @param {*} framework 选择框架
 */
async function downloadTemplate(projectName, framework, path) {
  // const { frame, name = dirname, description = dirname } = answers;
  // 从 github 上找了两个 star 比较多的脚手架模版, 一个 react, 一个 vue
  let url = 'https://github.com:bodyno/react-starter-kit#master';
  if (framework === 'vue') {
    url = 'https://github.com:Mrminfive/vue-multiple-page#master';
  }
  spinner.start();
  return await new Promise((resolve, reject) => {
    download(url, path, { clone: true }, err => {
      spinner.stop(); // 关闭 loading 动效
      if (err) {
        console.log(chalk.red('download template failed'));
        console.log(err);
        return reject()
      }
      console.log(chalk.green('download template success'));
      // 重写 package 中的 name、description 等项目信息
      
      const pkg = `${path}/package.json`;
      const content = getPackage(pkg);
      content.name = projectName;
      // content.description = description;
      const result = JSON.stringify(content);
      fs.writeFileSync(pkg, result);
      resolve()
    })
  })
}

/**
 * 获取package配置
 * @param {*} path 
 */
function getPackage(path){
  return JSON.parse(fs.readFileSync(path, 'utf8'))
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
function delDir(path) {
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports = {
  install: npmInstall,
  // checkThatNpmCanReadCwd,
  downloadTemplate,
  checkPackageRange,
  delDir,
  copyFolder,
  createFolder,
  getPackage
}