const icon = require('./icon')
const first = {
    type: 'list',
    message: '请选择技术栈?',
    name: 'type',
    prefix: icon.hand,
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
  
    
  const projectDefault = {
    type: 'checkbox',
    message: '请选择项目预设?',
    name: 'select',
    prefix: icon.tool,
    choices: [
      {
        key: "zarmui",
        name: "Zarm ui",
        value: "zarm",
        checked: true
      },
      {
        key: "xflow",
        name: "xflow",
        value: "xflow"
      },
      {
        key: "static",
        name: "静态检查",
        value: "static"
      }
    ],
    validate: function (val) {
      return val.length <= 0 ? '请选择': true
    },
    filter: function (val) { // 使用filter将回答变为小写
      return val
    }
  }

  const xflowCode = {
    type: 'code',
    message: '请输入xflow 站点ID',
    name: 'xcode',
    prefix: icon.star,
    filter: function (val) { // 使用filter将回答变为小写
      return val
    },
    when: function (val) {
      return (val.select||[]).indexOf('xflow')>=0
    }
  }


// const ui = {
//   type: 'list',
//   message: '请选择项目预设?',
//   prefix: icon.tool,
//   name: 'ui',
//   choices: [
//       {
//         key: "zarm",
//         name: "zarm",
//         value: "zarm"
//       },
//       {
//         key: "antd",
//         name: "antd",
//         value: "antd"
//       }
//   ],
//   filter: function (val) { // 使用filter将回答变为小写
//       return val
//   },
//   when: function (val) {
//     return val.select.find((e) => e === 'ui')
//   }
// }

module.exports = {
    first,
    projectDefault,
    xflowCode
}