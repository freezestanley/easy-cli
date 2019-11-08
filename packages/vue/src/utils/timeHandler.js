// 倒计时管理 1秒执行一次
var timeHanderObject = {}
var timeLine = -1
var isWorking = false

function beginTime() {
  if (!isWorking) {
    isWorking = true
    timeLine = setInterval(() => {
      let num = 0
      // console.log('timehandler---doing')
      for (const key in timeHanderObject) {
        const handler = timeHanderObject[key]
        const cf = handler.callBack
        const co = handler.target
        const compBack = handler.compBack
        // console.log('timehandler---key', key, handler.timeOut)
        if ((cf || compBack) && co) {
          if (handler.timeOut === null) {
            if (cf && co) cf.call(co)
          } else {
            --handler.timeOut
            if (cf && co) cf.call(co, handler.timeOut)
            if (handler.timeOut === -1) {
              clearTimeHandler(key)
              if (compBack && co) compBack.call(co)
            }
          }
        }
        ++num
      }
      if (num < 1) clearTime()
    }, 1000, this)
  }
}

function clearTime() {
  clearInterval(timeLine)
  timeLine = -1
  isWorking = false
  // console.log('timehandler---clear')
}

function setTimeHandler(type, callBack, target, timeOut = null, compBack = null) {
  if (timeHanderObject[type] == null) {
    timeHanderObject[type] = { callBack, target, timeOut, compBack }
    beginTime()
  }
}
function clearTimeHandler(type) {
  if (timeHanderObject[type] != null) { delete timeHanderObject[type] }
}

export const timeHandler = {
  setTimeHandler,
  clearTimeHandler
}
