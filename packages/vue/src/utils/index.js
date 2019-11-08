/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 查询区块链hash
export function viewHash(hash) {
  window.open(`https://www.baidu.com/s?wd=${hash}`)
}
// 从请求url中将query参数中的文件名抽取出来
export function getQueryFileName(url = '') {
  const dUrl = decodeURIComponent(url)
  return dUrl.slice(dUrl.lastIndexOf('/') + 1)
}

/**
 * 获取云信证树节点的最深层级
 * @param {Array} list
 */
export function getDepth(list = []) {
  return list.map((item) => {
    return item.children.length ? Math.max(...getDepth(item.children)) : item.level
  })
}
// 获取最多节点的层
export function getMaxChild(list = [], arr = {}) {
  list.forEach(item => {
    if (item.children && item.children.length) {
      if (arr[item.level]) {
        arr[item.level] += (item.children.length || 0)
      } else {
        arr[item.level] = (item.children.length || 0)
      }
      getMaxChild(item.children, arr)
    }
  })
  return arr
}
export function getMaxLength(list = []) {
  const arr = flat(list)
  const maps = arr.reduce(function (map, item) {
    if (item.level in map) {
      map[item.level]++
    } else {
      map[item.level] = 1
    }
    return map
  }, {})
  return Math.max(...Object.values(maps), 2)
}
/**
 * 将复杂数组大平成map
 * @param {*} arr
 */
export function flat(arr = []) {
  return [].concat(...arr.map(item => [].concat(item, ...flat(item.children))))
}

export function getUrlFileName(url = '') {
  let str = ''
  if (url) {
    const i = url.lastIndexOf('/')
    str = url.slice(i + 1)
  }
  return str
}

// 格式化数字 200,000.00（表格中所有的交易数量都保留两位小数）
/**
 * 将数值转换成千分位, dot表示保留的小数位
 * @param {number} num 要转换的数字
 * @param {number} decimal 保留的小数位
 */
export function thousands(num, dot = 2) {
  if (!num || num === 0) return '0.00'
  if (isNaN(num)) return '0.00'
  const numStr = Number(num).toLocaleString('zh-CN')
  const res = numStr.split('.')
  const integer = res[0]
  const dicimal = (res[1] || '').padEnd(dot, '0').slice(0, dot)
  return integer + (dicimal ? '.' + dicimal : '')
}

export function formatWan(val) {
  if (!val || isNaN(val) || val < 1) {
    return 0
  } else {
    const num = parseFloat((val / 10000).toFixed(4))
    return num
  }
}
