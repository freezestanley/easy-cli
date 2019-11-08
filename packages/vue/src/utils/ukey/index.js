// ukey相关的API方法
import { isWindows, BrowserInfo } from '../browser'
import { Message, MessageBox } from 'element-ui'

const isLocal = process.env.NODE_ENV === 'development' && !isWindows()
window.CryptoAgentObj = ''
import { initUkey as initIE, checkIEUkeyValid } from './ie'
import { initUkey as initChrome, checkChromeUkeyValid } from './chrome'

const browser = BrowserInfo()
function showWarning(msg) {
  msg && MessageBox.alert(msg, '警告', {
    confirmButtonText: '确定'
  })
}

/**
 * 初始化ukey
 * 1、判断系统
 * 2、判断浏览器
 * 3、检查驱动
 */
function initUkey() {
  if (!isWindows()) {
    showWarning('请使用Windows系统操作网银ukey')
    return false
  }
  if (!browser.name === 'IE' || !browser.name === 'Chrome') {
    showWarning('请使用微软IE浏览器或谷歌chrome浏览器操作ukey')
    return false
  }
  if (browser.name === 'IE') {
    initIE()
  } else if (browser.name === 'Chrome' && parseInt(browser.version) > 41) {
    initChrome()
  } else {
    Message.error('请使用windows系统的IE10,IE11 或 chrome浏览器')
    document.getElementById('FakeCryptoAgent').innerHTML =
      '<embed id="CryptoAgent" type="application/npCryptoKit.UA.x86" style="height: 0px; width: 0px">'
  }
}

/**
 * 验证ukey信息接口
 * @param {Object} params 加密的参数
 * @param {Boolean} needDNInfo 是否需要证书dn信息（绑定ukey时用）
 */
export async function checkUkeyValid(params = {}, needDNInfo) {
  if (isLocal) {
    return '666666'
  }
  if (!isWindows()) {
    showWarning('请使用Windows系统操作网银ukey')
    return false
  }
  if (!browser.name === 'IE' || !browser.name === 'Chrome') {
    showWarning('请使用微软IE浏览器或谷歌chrome浏览器操作ukey')
    return false
  }
  if (browser.name === 'IE') {
    return checkIEUkeyValid(params = {}, needDNInfo)
  } else if (browser.name === 'Chrome' && parseInt(browser.version) > 41) {
    return checkChromeUkeyValid(params = {}, needDNInfo)
  } else {
    Message.error('请使用windows系统的IE10,IE11 或 chrome浏览器')
    document.getElementById('FakeCryptoAgent').innerHTML =
      '<embed id="CryptoAgent" type="application/npCryptoKit.UA.x86" style="height: 0px; width: 0px">'
  }
}
