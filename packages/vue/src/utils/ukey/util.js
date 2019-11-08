import { browser } from '../browser'
import { MessageBox } from 'element-ui'
export const ERROR_CODE = {
  CANCEL: -2147023673, // 用户取消输入密码
}
export const ERROR_MAP = {
  EXTEND_UNINSTALL: '网银控件或chrome扩展插件未安装，请先下载并安装',
  UKEY_UNINSTER: '请先插入CFCA网银ukey',
  DRIVER_UNINSTALL: '网银控件未安装，请先安装驱动',
  IE_UNINSTALL: '请检查网银控件是否安装和ukey是否插入',
  INVALID_CA: '证书验证不通过，请检查ukey是否正确',
  INVALID_SIGN: '获取ukey签名错误',
}
/**
 * 几个Chrome插件的工具方法
 * @param {*} version1
 * @param {*} version2
 */

// version1 === version2 0
// version1 < version2	 -1
// version1 > version2	 1
export const compareVersion = function (version1, version2) {
  const v1Arr = version1.split('.')
  const v2Arr = version2.split('.')
  const len = Math.min(v1Arr.length, v2Arr.length)
  for (let i = 0; i < len; i++) {
    if (parseInt(v1Arr[i], 10) > parseInt(v2Arr[i], 10)) { return 1 }

    if (parseInt(v1Arr[i], 10) < parseInt(v2Arr[i], 10)) { return -1 }
  }

  if (len < v1Arr.length) {
    for (let j = len; j < v1Arr.length; j++) {
      if (parseInt(v1Arr[j], 10) !== 0) { return 1 }
    }
  }

  if (len < v2Arr.length) {
    for (let j = len; j < v2Arr.length; j++) {
      if (parseInt(v2Arr[j], 10) !== 0) { return -1 }
    }
  }

  return 0
}

// version1 === version2 0
// version1 < version2	 -1
// version1 > version2	 1
export const compareExtensionVersion = function (version) {
  if (browser.name === 'Chrome') {
    return compareVersion(version, '3.4.0.1')
  }
}

export const installHost = function () {
  if (browser.name === 'Chrome') {
    var hostURL = 'http://127.0.0.1:8080/CryptoKitHost.SuiYin.x86.exe'
    var wObj = window.open(hostURL, '_self')
    console.log('插件本地服务：：：', wObj)
  } else {
    alert('Unsupported browser!')
  }
}

export function showWarning(msg) {
  msg && MessageBox.alert(msg, '警告', {
    confirmButtonText: '确定'
  })
}

export function logErrorInfo() {
  if (window.CryptoAgentObj) {
    CryptoAgentObj.GetLastErrorDesc().then(error)
    console.error('ukey错误：', error)
  }
}