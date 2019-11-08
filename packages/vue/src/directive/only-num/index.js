export default {
  inserted(el, binding, vnode) {
    const ele = el.tagName === 'INPUT' ? el : el.querySelector('input')
    ele.oninput = function () {
      // 获取相关的指令配置信息
      const rel = vnode.data.directives.filter(item => {
        return item.name === 'only-num'
      })[0]
      vnode.context.$nextTick(() => {
        handleInput(ele, vnode, rel)
      })
    }
    console.log('当前节点', el)
    console.log('当前binding', binding)
    console.log('当前 value', binding.value)
    console.log('当前 vnode', vnode)
  }
}

/**
 * [handleInput 在输入阶段的处理逻辑]
 * @param  {[DOM]} ele   [当前指令操作的dom对象]
 * @param  {[虚拟节点]} vnode [当前指令渲染的虚拟节点]
 * @param  {[指令信息]} rel   [当前指令的所有指令信息]
 * @param  {[校验类型]} type  [输入阶段的校验类型]
 *      "number": 仅支持输入数字
 *      "float": 仅支持数字和小数点
 */
function handleInput(ele, vnode, rel) {
  let rule
  switch (true) {
    case rel.modifiers.float: // 浮点型
      rule = /[^\d\.]/g; break
    default: // 默认仅支持输入数字
      rule = /\D/g
  }
  let val = ele.value.replace(rule, '')
  val = val && parseFloat(val)
  const maxLen = vnode.data.attrs && vnode.data.attrs['max-len'] ? vnode.data.attrs['max-len'] : 0
  if (maxLen > 0) { val = val.substr(0, maxLen) }
  setValueWithExpressionVue({
    currObj: vnode.context.$data,
    expression: rel.expression,
    value: val,
    key: vnode.key,
    arg: rel.arg,
    toString: rel.modifiers.string || rel.modifiers.float
  })
}

/**
 * [setValueWithExpressionVue 更新数据模型]
 * @param {Boolean} toString    [是否转化为字符串]
 * @param {[type]}  currObj    [当前的数据模型]
 * @param {[type]}  expression [指令表达式]
 * @param {[type]}  value      [指令的值]
 * @param {[type]}  key        [用于批量渲染时的跟踪键]
 * @param {[type]}  arg        [指令的参数]
 */
function setValueWithExpressionVue(option) {
  const expression = option.expression.split('.')
  expression.forEach(function (item, i) {
    if (i < expression.length - 1) {
      option.currObj = option.currObj[item]
    } else {
      if (option.key !== undefined) {
        option.currObj[item][option.key][option.arg] = (option.value === '' || option.toString) ? option.value : option.value * 1
      } else {
        option.currObj[item] = (option.value === '' || option.toString) ? option.value : option.value * 1
      }
    }
  })
}

/**
 * 使用方法
 */

// 仅数字（如：输入09，会自动变成9）
// <el-input v-only-num="info.age" v-model="info.age"></el-input>
// 仅数字，显示8位数以内（如：输入09，会自动变成9）
// <el-input v-only-num="info.age" v-model="info.age" :max-len=”8”></el-input>

// 字符型数字（如：输入09，不会自动变成9）
// <el-input v-only-num.string="info.tel" v-model="info.tel"></el-input>

// 浮点型数据(支持数字和小数点的混合输入)
// <el-input v-only-num.float="info.tel" v-model="info.tel"></el-input>
// ————————————————
// 版权声明：本文为CSDN博主「henyulee」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/henyulee/article/details/83383228
