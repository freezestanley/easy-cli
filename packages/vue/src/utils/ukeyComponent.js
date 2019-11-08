import Vue from 'vue'
import UkeyVue from '@/components/Ukey'

let instance

const Constructor = Vue.extend(UkeyVue)

const initInstance = () => {
  instance = new Constructor({
    el: document.createElement('div')
  })
}
// 将参数传递到底层
const UkeyBox = function(params) {
  if (!instance) {
    initInstance()
  }

  instance.odata = params || {} // 重置旧数据
  instance.ukeyVisible = true

  return new Promise((resolve, reject) => {
    instance.resolve = resolve

    instance.reject = reject
    instance.callback = function () {
      instance.$destroy()
      // instance.$el.remove()
      instance = null
    }
  })
}

export default UkeyBox
