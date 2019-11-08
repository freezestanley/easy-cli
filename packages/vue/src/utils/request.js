import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { getQueryFileName } from '@/utils'
import { checkCorpStatusJump } from '@/utils/permission'
import { isIE } from './browser'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data || {}
    const message = res.resultMessage || res.message
    const code = res.resultCode || res.code
    // 处理文件下载
    if (res instanceof Blob) {
      let fileName = ''
      if (res.type.indexOf('multipart/form-data') > -1) {
        fileName = decodeURI(response.headers['content-disposition'].split('=')[1])
      } else {
        fileName = getQueryFileName(response.request.responseURL)
      }
      if (isIE()) {
        window.navigator.msSaveBlob(res, fileName)
      } else {
        const url = window.URL.createObjectURL(new Blob([res]))
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
      }
      return
    }
    /**
     * code为非00000是抛错 可结合自己业务进行修改
     */
    if (code !== '000000') {
      // 根据后端返回具体业务错误码处理
      if (code === 'TIME_OUT' && location.hash.indexOf('/login') === -1) {
        MessageBox.alert('您已被登出，请重新登录', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      } else if (code === 'UN_VERIFY') { // 未认证通过, 强制去认证
        checkCorpStatusJump('', store.getters.userInfo && store.getters.userInfo.corpFlowStatus)
      } else if (code === '400001') { // 申请还款，还有还款未确认订单
        return Promise.reject(code || 'error')
      } else {
        Message({
          message: message || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(message || 'error')
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: '服务器异常，请稍后再试' || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
