import Vue from 'vue'
import ConfirmCom from '@/components/CustomConfirm'

let instance

const Constructor = Vue.extend(ConfirmCom)

const initInstance = () => {
  instance = new Constructor({
    el: document.createElement('div')
  })
}

const ConfirmComponent = function(params = {}) {
  if (!instance) {
    initInstance()
  }
  instance.odata = { ...params } // 重置旧数据
  instance.visible = true

  return new Promise((resolve, reject) => {
    instance.resolve = resolve
    instance.reject = reject
    instance.callback = function () {
      instance.$destroy()
      instance.$el.remove()
      instance = null
    }
  })
}

export default ConfirmComponent
