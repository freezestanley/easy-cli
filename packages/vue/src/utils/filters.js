import Vue from 'vue'
import { thousands } from '@/utils/index'
// vue全局filter方法

Vue.filter('dateFormat', function(value, f) {
  var fmt = f || 'yyyy/MM/dd'
  function format(value, fmt) {
    var date = new Date(value)
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'w+': date.getDay(), // 星期
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) {
      if (k === 'w+') {
        if (o[k] === 0) {
          fmt = fmt.replace('w', '周日')
        } else if (o[k] === 1) {
          fmt = fmt.replace('w', '周一')
        } else if (o[k] === 2) {
          fmt = fmt.replace('w', '周二')
        } else if (o[k] === 3) {
          fmt = fmt.replace('w', '周三')
        } else if (o[k] === 4) {
          fmt = fmt.replace('w', '周四')
        } else if (o[k] === 5) {
          fmt = fmt.replace('w', '周五')
        } else if (o[k] === 6) {
          fmt = fmt.replace('w', '周六')
        }
      } else if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  if (value) {
    value = format(value, fmt)
  }
  return value
})

// 格式化金钱 : xx.xx
Vue.filter('moneyFormat', function(val) {
  if (val) {
    val = val.toString().replace(/\$|\,/g, '')
  }

  if (isNaN(val)) {
    val = '0'
  }

  if (val === 0) {
    val = '0'
  }

  const sign = (val === (val = Math.abs(val).toString()))
  val = Math.floor(val * 100 + 0.50000000001)
  let cents = val % 100
  val = Math.floor(val / 100).toString()
  if (cents < 10) {
    cents = '0' + cents
  }
  for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
    val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3))
  }

  return (((sign) ? '' : '-') + val + '.' + cents)
})

// 将元转换为万
Vue.filter('formatWan', function(val) {
  if (!val || isNaN(val) || val < 1) {
    return 0
  } else {
    const num = parseFloat((val / 10000).toFixed(4))
    return num
  }
})
// 2000000 -> 2,000,000
Vue.filter('thousands', thousands)

// 对手机号做*隐藏处理
Vue.filter('dotMobile', (val) => {
  if (!val) return '****'
  return val.slice(0, 3) + '****' + val.slice(7)
})
// 对身份证做*隐藏处理
Vue.filter('dotIdCard', (val) => {
  if (!val) return '******'
  return val.slice(0, 6) + '******' + val.slice(14)
})
