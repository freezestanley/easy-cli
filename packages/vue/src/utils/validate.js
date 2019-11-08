// // 验证方法

// /**
//  * @param {string} path
//  * @returns {Boolean}
//  */
// export function isExternal(path) {
//   return /^(https?:|mailto:|tel:)/.test(path)
// }

// /**
//  * @param {string} str
//  * @returns {Boolean}
//  */
// export function validUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

// export const isEmail = function(mail) {
//   const reg = /^[A-Za-z0-9]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
//   return reg.test(mail)
// }

// export const isTel = function(tel) {
//   const reg = /[0-9-()（）]{7,18}/
//   return reg.test(tel)
// }

// export const isPhone = function(val) {
//   const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
//   return reg.test(val)
// }

// export const twoDecimal = function(val) {
//   const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
//   return reg.test(val)
// }

// export const fourDecimal = function(val) {
//   const reg = /^[0-9]+([.]{1}[0-9]{1,4})?$/
//   return reg.test(val)
// }

// export const email = function(val) {
//   return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
//     val
//   )
// }

// // 检测密码
// export const checkPassword = function(val) {
//   const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/
//   return reg.test(val)
// }

// // 统一社会信用代码校验 Unified Social Credit Code
// export const isUSCC = function(val) {
//   const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/
//   return reg.test(val)
// }

// // 身份证号码校验/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
// export const isIdNo = function(val) {
//   const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
//   return reg.test(val)
// }

// const isRequiredNoDot = (rule, value, callback) => {
//   if (value && value !== '') {
//     callback()
//   } else {
//     callback(new Error(rule.message))
//   }
// }
// // 验证数据是否为空 前面不带星号
// export const isStrNoDot = (errMsg, req = true) => [
//   {
//     type: 'string',
//     message: errMsg,
//     validator: req && isRequiredNoDot,
//     trigger: 'change'
//   }
// ]
// // 验证是否数字
// export const isNumber = (errMsg, req = true) => [
//   {
//     type: 'number',
//     required: req,
//     // validator: checkNumber,
//     message: errMsg,
//     trigger: 'blur',
//     transform(value) {
//       if (/^[0-9]+\.?[0-9]*$/.test(+value)) return parseFloat(value)
//       return false
//     }
//   }
// ]

// // 验证是否并数字不显示* 必填
// export const isNumberNoDot = errMsg => [
//   {
//     type: 'number',
//     // validator: checkNumber,
//     message: errMsg,
//     trigger: 'blur',
//     transform(value) {
//       if (/^[0-9]+\.?[0-9]*$/.test(+value)) return parseFloat(value)
//       return false
//     }
//   }
// ]

// // 只能选择之前的时间
// export const beforeDate = {
//   disabledDate(time) {
//     return time.getTime() > Date.now()
//   }
// }

// export const afterDate = {
//   disabledDate(time) {
//     return time.getTime() < Date.now() - 8.64e7
//   }
// }

// export const isRightNum = num => {
//   const reg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/
//   return reg.test(num)
// }

