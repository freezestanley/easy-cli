var inquirer = require('inquirer')

const first = {
  type: 'list',
  message: '请选择技术栈?',
  name: 'type',
  choices: [
    {
      key: "vue",
      name: "vue",
      value: "vue"
    },
    {
      key: "react",
      name: "react",
      value: "react"
    }
  ]
}

const mft = {
  type: 'confirm',
  message: '是否为微前端项目？',
  name: 'mft',
  filter: function (val) { // 使用filter将回答变为小写
      return val;
  }
}
const vue1 = {
  type: 'list',
  message: '请选择项目预设?',
  name: 'perset',
  choices: [
      {
        key: "default",
        name: "默认(vue+vuex+vue-router+babel+zarmUI+xflow)",
        value: "default"
      },
      {
        key: "select",
        name: "自定义功能",
        value: "select"
      }
  ],
  filter: function (val) { // 使用filter将回答变为小写
    return val
  },
  when: function (val) {
    return val.type === 'vue'
  }
}

const vue2 = { // vue-2
  type: 'checkbox',
  message: '请选择所需要的功能?',
  name: 'select',
  choices: [
    {
      key: "vuex",
      name: "vuex",
      value: "vuex"
    },
    {
      key: "router",
      name: "router",
      value: "router"
    },
    {
      key: "typeScript",
      name: "typeScript",
      value: "typeScript"
    },
    {
      key: "css",
      name: "CSS Pre-processors",
      value: "css"
    },
    {
      key: "formatter",
      name: "Linter / Formatter",
      value: "formatter"
    },
    {
      key: "zarm",
      name: "ZarmUI",
      value: "zarm"
    },
    {
      key: "xflow",
      name: "xflow",
      value: "xflow"
    }
  ],
  filter: function (val) { // 使用filter将回答变为小写
    return val
  },
  when: function (val) {
    return val.type === 'vue' && val.perset === 'select'
  },
  validate: function (val) {
    return val.length <= 0 ? '请选择': true
  }
}

const react1 = { // react-1
  type: 'list',
  message: '请选择项目预设?',
  name: 'perset',
  choices: [
      {
        key: "default",
        name: "defult(react+redux+react-router-dom+babel+zarmUI+xflow)",
        value: "default"
      },
      {
        key: "select",
        name: "Manually select features",
        value: "select"
      }
  ],
  filter: function (val) { // 使用filter将回答变为小写
      return val
  },
  when: function (val) {
    return val.type === 'react'
  }
}

const react2 = {
  type: 'checkbox',
  message: '请选择项目预设?',
  name: 'select',
  choices: [
    { 
      key: "redux",
      name: "redux",
      value: "redux"
    },
    {
      key: "router",
      name: "react-router-dom",
      value: "router"
    },
    {
      key: "typeScript",
      name: "typeScript",
      value: "typeScript"
    },
    {
      key: "css",
      name: "CSS Pre-processors",
      value: "css"
    },
    {
      key: "formatter",
      name: "Linter / Formatter",
      value: "formatter"
    },
    {
      key: "xflow",
      name: "xflow",
      value: "xflow"
    }
  ],
  validate: function (val) {
    return val.length <= 0 ? '请选择': true
  },
  filter: function (val) { // 使用filter将回答变为小写
    return val
  },
  when: function (val) {
    return val.type === 'react' && val.perset === 'select'
  }
}
const promptList = [
  first,
  mft,
  vue1,
  vue2,
  react1,
  react2
]


inquirer.prompt(promptList).then((answers) => {
  console.log(answers)
})

// const step2 = () => 
// inquirer.prompt([{
//   type: 'confirm',
//   message: '是否使用zarm-mobile ui',
//   name: 'ui',
//   filter: function (val) { // 使用filter将回答变为小写
//       return val.toLowerCase();
//   }
// }]).then((answers) => {
//   console.log(answers)
//   step3()
// })

// const step3 = () => 
// inquirer.prompt([{
//   type: 'confirm',
//   message: '是否为微前端项目',
//   name: 'ui',
//   filter: function (val) { // 使用filter将回答变为小写
//       return val.toLowerCase();
//   }
// }]).then((answers) => {
//   console.log(answers)
// })

// const step4 = () => 
// inquirer.prompt([{
//   type: 'confirm',
//   message: '是否接入xflow',
//   name: 'ui',
//   filter: function (val) { // 使用filter将回答变为小写
//       return val.toLowerCase();
//   }
// }]).then((answers) => {
//   console.log(answers)
// })


// inquirer.prompt([ { 
//   type: 'confirm', 
//   name: 'test', 
//   message: '欢迎使用easy-cli,请选择技术栈?', 
//   default: true 
// }]).then((answers) => { 
//     console.log('结果为:')
//     console.log(answers)}
// )
// inquirer.prompt([ { 
//     type: 'input', 
//     name: 'test', 
//     message: 'Are you handsome?', 
//     default: true 
//   }]).then((answers) => { 
//       console.log('结果为:')
//       console.log(answers)}
//   )

// const promptList = [{
//     type: 'list',
//     message: '请选择一种水果:',
//     name: 'fruit',
//     choices: [
//         "Apple",
//         "Pear",
//         "Banana"
//     ],
//     filter: function (val) { // 使用filter将回答变为小写
//         return val.toLowerCase();
//     }
// }]
// inquirer.prompt(promptList).then((answers) => {
//     console.log('结果为:')
//     console.log(answers)
// })
