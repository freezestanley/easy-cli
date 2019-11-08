#!/usr/bin/env node 
const command = require('commander');
const program = new command.Command();
const inquirer = require('inquirer')
const shell = require('shelljs')
const chalk = require('chalk')
const path = require('path')
const step = require('./step')
const icon = require('./icon')
const utils = require('./utils')
// const webpack = require('./wepackConfig')
const pk = require(path.resolve(__dirname,'../package.json'))
const fs = require('fs')

async function doit (answer, name) {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }



  const {select=['zarm','cloudEvent','xflow'], perset,type} = answer
  // const pkg = {
  //   name,
  //   version: '0.1.0',
  //   private: true,
  //   dependencies:{},
  //   devDependencies: {},
  //   "lint-staged": {
  //     "*.{js,jsx}": [
  //       "eslint --fix",
  //       "git add"
  //     ]
  //   },
  //   engines: {
  //     "node": ">=8.0.0"
  //   }
  // }
  
  const __PATH__ = `${process.cwd()}/${name}` //目标路径
  // const __TEMPLATE_PATH__ = path.resolve(__dirname, '../packages/react/')

  //判断框架
  // if(type=='vue'){
  //   dependencies.push('vue','@vue/cli-service')
  //   if(perset=="default")dependencies.push('vuex','vue-router')
  // }
  // if(type=='react'){
  //   dependencies.push('react','react-dom')
  //   if(perset=="default")dependencies.push('react-redux','react-router-dom')
  // }
  // cloudEvent
  
  utils.createFolder(__PATH__)
  //获取git 模板
  await utils.downloadTemplate(name,type,__PATH__)
  //替换package
  const pkgPath = path.join(__PATH__, 'package.json')
  const pkg = utils.getPackage(pkgPath)
  let devDependencies={}
  let dependencies = {};

  //加入插件进行安装
  if((select||'').includes('cloudEvent')){
    devDependencies={'za-plugin-cloudevent':'1.0.0'}
  }
  //react
  if((select||'').includes('zarm') && type=="react")dependencies={'zarm':'1.1.1'}
  //vue
  if((select||'').includes('zarm') && type=="vue")dependencies={...dependencies,'zarm-vue':'1.6.1'}

  pkg.devDependencies= {...pkg.devDependencies,...devDependencies}
  pkg.dependencies= {...pkg.dependencies,...dependencies}
  fs.writeFileSync(
    pkgPath,
    JSON.stringify(pkg, null, 2)
  );
  // xflow
  // if(perset=='default' || (select||'').includes('xflow')){
  //   installXflow(path.join(__PATH__, 'index.html'),true)
  // }else{
  //   installXflow(path.join(__PATH__, 'index.html'),false)
  // }
  await utils.install(__PATH__,'npm')
  
  const CloudEvent = require('easy-plugin-cloudevent')
  console.log(CloudEvent)
  CloudEvent(__PATH__)
  
  console.log("安装完成!")
  //拷贝文件
  // utils.copyFolder(__TEMPLATE_PATH__, __PATH__)
  // shell.exec(`cp -rf ${__TEMPLATE_PATH__} ${__PATH__}`)

  

  //判断是否是自选
  // if(Array.isArray(select)){
  //   select.forEach(dep => {
  //     switch(dep){
  //       case 'vuex':
  //         dependencies.push('vuex')
  //       break
  //       case 'router':
  //           //vue react
  //           dependencies.push(type=='vue'?'vue-router':'react-router-dom')
  //       break
  //       case 'css':
  //           dependencies.push('style-loader','node-sass','sass-loader','less-loader','postcss-loader','css-loader')
  //       break
  //       case 'formatter':
  //           dependencies.push(type=='vue'?'@vue/cli-plugin-eslint':'','eslint-loader')
  //       break
  //       case 'cloudEvent':
  //           dependencies.push('axios','uuid')
  //       break
  //       case 'zarm':
  //         dependencies.push('zarm')
  //       break
  //       // case 'xflow':
  //       //   // dependencies.push('xflow')
  //       // break
  //       case 'redux':
  //         dependencies.push('react-redux')
  //       break
  //     }
  //   })
  // }

  // webpack.getWebpackConfig(select,path.join(__TEMPLATE_PATH__, '/build/'),path.join(__PATH__, '/build/'))
  
  //安装npm包
  
  // utils.install(__PATH__,[...dependencies,...devDependencies]).then(()=>{
  //   let pkgDependencies={}
  //   dependencies.forEach(pkg=>pkgDependencies[pkg]=utils.checkPackageRange(pkg))
  //   pkg.dependencies=pkgDependencies
  //   let pkgDevDependencies={}
  //   devDependencies.forEach((pkg)=>pkgDevDependencies[`'${pkg}'`]=utils.checkPackageRange(pkg))
  //   pkg.devDependencies=pkgDevDependencies
  //   // //输出package.json
  //   // fs.writeFileSync(
  //   //   path.join(__PATH__, 'package.json'),
      
  //   //   JSON.stringify(pkg, null, 2)
  //   // );

  // })
  // shell.exit(1);
}

//设置xflow
const installXflow=(root,flag)=>{

  fs.readFile(root,function(error,data){    //读取文件，回调函数第一个参数表示错误信息，第二个参数为读取的文本内容
      if(error){
          console.log(error);
          shell.exit(1)
      }
      let _html = data.toString()
      if(flag){
        _html=_html.replace("<%=xflow%>","<script src='https://xflow-test1.zhongan.io/static/sdk/lastest/visual_ilog.min.js?id=id'></script>")
      }else{
        _html=_html.replace("<%=xflow%>","")
      }
      fs.writeFileSync(root,_html);
  })
  
}

const create = (promptList, dir) => {
  inquirer.prompt(promptList).then((answers) => {
    if (!shell.which('git')) {
      shell.echo('Sorry, this script requires git');
      shell.exit(1);
    }
    doit(answers, dir)
  })
}

const checkDir = (dirPath) => {
  try {
    fs.accessSync(dirPath)
    console.error(chalk.red(`${icon.wow} 该项目已存在`))
  } catch (error) {
    return true 
  }
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