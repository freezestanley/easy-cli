
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
// 正则
export const Regs = {
  isExternal: val => isExternal(val),
  isEmail: val => /^[A-Za-z0-9]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val),
  isTel: val => /[0-9-()（）]{7,18}/.test(val),
  isPhone: val => /^1(3|4|5|6|7|8|9)\d{9}$/.test(val),
  isPhoneUser: val => /^((\+?86)|(\(\+86\)|(\d{3,4}\)|\d{3,4}-|\s)))?[0-9]*$/.test(val),
  isUSCC: val => /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/.test(val),
  isIdCardNo: val => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val),
  isPassword: val => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/.test(val),
  isBandcard: val => /\d{12}|\d{20}/g.test(val),
  isCommonChar: val => /^[\w_]{6,20}$/.test(val),
}

/**
 * rules
 * 使用方法：
 * rules: {
    phone: [
      isRequired('请输入手机号'),
      isPhone()
    ]
  }
 **/
// 验证邮箱格式
export const isEmail = function (message = '请输入正确格式的邮箱') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isEmail(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}
// 验证座机格式
export const isTel = function (message) {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isTel(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}
// 手机号格式验证
export const isPhone = function (message = '请输入正确格式的手机号') {
  return {
    type: 'number',
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isPhone(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}

// 手机号格式验证(用户列表))
export const isPhoneUser = function (message = '请输入正确格式的手机号') {
  return {
    type: 'number',
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isPhoneUser(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}

// 检测密码
export const isPassword = function (message = '请输入正确格式的密码(包含:大小写字母和数字，长度6-20位)') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isPassword(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}

// 统一社会信用代码校验 Unified Social Credit Code
export const isUSCC = function (message = '请输入正确统一社会信用代码') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isUSCC(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}
// 登录名
export const isLoginName = function (message = '请输入数字字母下划线等组合字符6~20位') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isCommonChar(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}

// 银行卡号 15~20 位数字
export const isBandcard = function (message = '请输入正确银行卡号') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isBandcard(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
}

// 身份证号码校验/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
export const isIdCardNo = function (message = '请输入正确格式的身份证号码') {
  return {
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (Regs.isIdCardNo(value)) {
        callback()
      } else {
        callback(message)
      }
    }
  }
}
// 输入正确的数字
export const isRightNumer = (rule, value, callback) => {
  const reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?$/
  if (reg.test(value)) {
    if (+value > Number.MAX_SAFE_INTEGER) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  } else {
    callback(new Error(rule.message))
  }
}
// 输入正确的数字-小数点后两位
export const twoPointNumber = (rule, value, callback) => {
  const reg = /^[+-]?(\d|[1-9]\d+)(\.\d{1,2})?$/
  if (reg.test(value)) {
    if (+value > Number.MAX_SAFE_INTEGER) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  } else {
    callback(new Error(rule.message))
  }
}
// 输入正确的数字-小数点后四位
export const fourPointNumber = (rule, value, callback) => {
  const reg = /^[+-]?(\d|[1-9]\d+)(\.\d{1,4})?$/
  if (reg.test(value)) {
    if (+value > Number.MAX_SAFE_INTEGER) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  } else {
    callback(new Error(rule.message))
  }
}
// 验证数据是否为空
export const isRequired = function (message = '请输入', option = {}) {
  return {
    required: true,
    message: message,
    trigger: 'blur',
    ...option
  }
}

// 验证数据是否为空
export const checkLength = function (message = '请输入', option = {}) {
  return {
    required: true,
    trigger: 'blur',
    ...option,
    message
  }
}
// 验证是否为正确的数字
export const isNumber = function (message = '请输入正确的数字') {
  return {
    type: 'number',
    message: message,
    trigger: 'blur',
    validator: isRightNumer,
    // transform(value) {
    //   if (/^[0-9]\.?[0-9]*$/.test(+value)) return parseFloat(value)
    //   return false
    // }
  }
}
// 验证是否是2位小数 - 金额校验（元）
export const isTwoPointNumber = function (message) {
  return {
    type: 'number',
    trigger: 'blur',
    message,
    validator: twoPointNumber
  }
}
// 验证是否是4位小数 - 金额校验（万元）
export const isFourPointNumber = function (message) {
  return {
    type: 'number',
    trigger: 'blur',
    message,
    validator: fourPointNumber
  }
}

// 正整数 （一般交易时填交易数量用）
export const isPositiveInteger = function (message) {
  return {
    type: 'number',
    trigger: 'blur',
    validator: (rule, value, callback) => {
      if (/^\+?[1-9][0-9]*$/.test(+value)) {
        callback()
      } else {
        callback(message)
      }
    },
    transform(value) {
      if (/^\+?[1-9][0-9]*$/.test(+value)) return parseFloat(value)
      return false
    }
  }
}

// 只能选择之前的时间（DatePicker限制时间用）
export const beforeDate = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  }
}
// 现在以后的时间
export const afterDate = {
  disabledDate(time) {
    return time.getTime() < Date.now() - 8.64e7
  }
}

export const twoDecimal = function (val) {
  const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
  return reg.test(val)
}

export const fourDecimal = function (val) {
  const reg = /^[0-9]+([.]{1}[0-9]{1,4})?$/
  return reg.test(val)
}
/**
 * 将数值转换成千分位, dot表示保留的小数位
 * @param {numberr} num
 * @param {number} dot
 */
function _thousandPoint (num, dot = 0) {
  if (!num || num === 0) return '0'
  const res = Number(num).toLocaleString('zh-CN', { maximumFractionDigits: dot })
  return res.indexOf('.') === 0 ? '0' + res : res
}
// 格式化数字 为 200,000.00
export const numToStr = (num, unit = '元', isTenthousand = false) => {
  if (num === null) return 0
  if (isTenthousand) {
    num = (num / 10000).toFixed(4)
  }
  return _thousandPoint(num, 4) + (isTenthousand ? `${unit === '' ? '' : '万'}${unit}` : unit)
}

/* 默认导出，其他页面直接 import Validate from '@/utils/validator'
 * 使用: [Validate.isRequired()]
 * Validate.beforeDate
**/
const Validate = {
  isRequired,
  isPassword,
  isPhone,
  isPhoneUser,
  isIdCardNo,
  isNumber,
  isTwoPointNumber,
  isFourPointNumber,
  isEmail,
  isUSCC,
  beforeDate,
  afterDate,
  isBandcard,
  isLoginName,
  checkLength,
  Regs
}
export default Validate
