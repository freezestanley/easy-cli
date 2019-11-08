import { debounce } from '@/utils/index'
/**
 * 防抖函数，防止连续点击。连续触发提交事件
 */
export default {
  inserted(el, binding, vnode) {
    const handler = debounce(binding.value, 300)
    el.onclick = handler
  },
  unbind(el) {
    console.log('fast-click unbind')
    el.onclick = null
  }
}

/**
 * 使用方法 默认是300毫秒
 * v-fast-click="wrapClick(method, arg1, arg2)"
 */
/* <el-button v-fast-click="wrapClick(doSomeThing, arg1, arg2)">提交</el-button> */
