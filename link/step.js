const first = {
    type: 'list',
    message: '请选择技术栈?',
    name: 'type',
    prefix: '🔧',
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
    prefix: '🌟',
    filter: function (val) { // 使用filter将回答变为小写
        return val;
    }
  }
  const vue1 = {
    type: 'list',
    message: '请选择项目预设?',
    name: 'perset',
    prefix: '📦',
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
    prefix: '🧰',
    choices: [
      {
        key: "vuex",
        name: "vuex",
        value: "vuex"
      },
      {
        key: "router",
        name: "router",
        value: "router",
        checked: true
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
        value: "zarm",
        checked: true
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
  
  const react1 = {
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
    prefix: '🧰',
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
        key: "zarm",
        name: "ZarmUI",
        value: "zarm",
        checked: true
      },
      {
        key: "xflow",
        name: "xflow",
        value: "xflow"
      },
      {
        key: "cloudEvent",
        name: "cloudEvent",
        value: "cloudEvent"
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
module.exports = {
    first,
    mft,
    vue1,
    vue2,
    react1,
    react2
}