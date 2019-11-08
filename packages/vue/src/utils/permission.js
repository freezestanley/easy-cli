import store from '@/store'
import { MessageBox } from 'element-ui'
import { isIE } from './browser'
/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission(value) {
  if (value && value.length > 0) {
    const authDtoList = store.getters && store.getters.authDtoList
    const permissionButton = value || ''
    const hasPermission = authDtoList.some(role => {
      return permissionButton.trim() === role.perms
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(
      `need authDtoList! Like v-permission="['PLATFORM_0','PLATFORM_1']"`
    )
    return false
  }
}

/**
 * 检查企业是否已经通过认证， 未通过的要跳转到企业信息
 * @param {*} status
 */
let isPoping = false // 处理多个接口连续弹窗问题
const tipMap = {
  INIT: '企业信息平台审核中，审核通过才能操作业务',
  PROCESSING: '企业信息平台审核中，审核通过才能操作业务',
  REJECTED: '请先完成企业信息认证，通过后可使用业务功能'
}
export function checkCorpStatusJump(status, orderStatus) {
  if (status !== 'VALID' && orderStatus !== 'SUCCESS') {
    if (isPoping) return
    isPoping = true
    const text = !orderStatus
      ? '请先完善企业信息并提交！审核通过后可使用业务功能。'
      : tipMap[orderStatus]
    MessageBox.confirm(text, '提示', {
      confirmButtonText: '知道了',
      type: 'warning',
      showCancelButton: false
    })
      .then(() => {
        isPoping = false
        window.location.href = '#/account/corp-info'
        if (isIE()) {
          setTimeout(() => {
            location.reload()
          }, 400)
        }
      })
      .catch(() => {
        isPoping = false
        console.log('close')
      })
  }
}
