import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n 使用中文
import './styles/theme/index.css'
import '@/styles/index.scss' // global css
import '@/utils/filters'
import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import permission from '@/directive/permission/index.js' // 权限按钮判断指令
import onlyNum from '@/directive/only-num/index.js' // 权限按钮判断指令
import clickoutside from '@/directive/clickoutside/index.js'
import fastClick from '@/directive/fast-click/index.js'

import SecurityCodeBox from '@/utils/securityCode.js'
import UkeyComponent from '@/utils/ukeyComponent.js'
import ConfirmComponent from '@/utils/confirmComponent.js'
import { PROJECT_TOKEN_NAME } from '@/utils/constant/index'

console.log('当前环境变量：', process.env.NODE_ENV)
// set ElementUI lang to zh-CN
Vue.use(ElementUI, { locale, size: 'small' })

dayjs.extend(quarterOfYear)
Vue.prototype.$dayjs = dayjs
Vue.prototype.$securityCode = SecurityCodeBox
Vue.prototype.$ukey = UkeyComponent
Vue.prototype.$myConfirm = ConfirmComponent
Vue.prototype.TOKEN__NAME = PROJECT_TOKEN_NAME
// 全局封装的指令引用方法
Vue.prototype.wrapClick = (method, ...arg) => {
  return () => {
    if (!method) {
      throw new TypeError('method cannot be null')
    }
    return method(...arg)
  }
}
Vue.prototype.$browser = function(txhash, type) {
  this.$router.push({
    path: '/browser',
    query: { txhash, type },
    target: '_blank'
  })
}

Vue.directive('permission', permission)
Vue.directive('only-num', onlyNum)
Vue.directive('fast-click', fastClick)
Vue.directive('clickoutside', clickoutside)

Vue.config.productionTip = false
window.TOKEN__NAME = PROJECT_TOKEN_NAME // 设置到全局。方便取变量

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
