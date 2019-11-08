import Vue from 'vue'
import CodeVue from '@/components/SecurityCode/index'

let instance

const CodeConstructor = Vue.extend(CodeVue)

const initInstance = () => {
  instance = new CodeConstructor({
    el: document.createElement('div')
  })
}

const SecurityCodeBox = function() {
  if (!instance) {
    initInstance()
  }

  instance.codeDialogVisible = true

  return new Promise((resolve, reject) => {
    instance.resolve = resolve
    instance.reject = reject
  })
}

export default SecurityCodeBox
