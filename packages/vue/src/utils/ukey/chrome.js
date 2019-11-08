// ukey相关的API方法
import { browser } from '../browser'
import { CommonApi } from '@/api'
import { nmCryptokit } from './nmCryptoKit'
import { showWarning, logErrorInfo, ERROR_MAP, ERROR_CODE } from './util'


/**
 * 初始化ukey
 * 1、判断系统
 * 2、判断浏览器
 * 3、检查驱动
 */
export async function initUkey() {
  window.CryptoAgentObj = new nmCryptokit(browser.name)
  console.log('CryptoAgentObj', CryptoAgentObj)
  await window.CryptoAgentObj.init()
  return CryptoAgentObj
  if (!CryptoAgentObj) {
    // 插件未安装
    showWarning('网银驱动未安装，请先安装驱动')
    return false
  }
  // return new Promise((resolve, reject) => {
  // window.CryptoAgentObj.init()
  // .then(function () {
  //   return CryptoAgentObj.getExtensionVersion()
  // })
  // .then(function (response) {
  //   extensionVer = response.result
  //   console.log('插件版本', extensionVer)
  //   return CryptoAgentObj.getHostVersion()
  // })
  // .then(function (response) {
  //   hostVer = response.result
  //   console.log("extension version: " + extensionVer)
  //   console.log("host version: " + hostVer)

  //   const extensionLevel = compareExtensionVersion(extensionVer)
  //   const hostLevel = compareVersion(hostVer, "3.4.0.1")
  //   if (hostLevel < 0 && extensionLevel < 0) {
  //     alert("Please install host")
  //   } else if (hostLevel < 0) {
  //     installHost()
  //   }
  //   return true
  // })
  // .catch(function (response) {
  //   console.error(response)
  //   alert('出错了' + response.result)
  // })

  // })
}

// 检查ukey是否已经插入
async function checkUkeyInsert() {
  const CertRes = await CryptoAgentObj.SelectCertificate('', 'CFCA', '')
  console.log('证书是否准备好:::', CertRes.result)
  if (CertRes.result) {
    return Promise.all([
      CryptoAgentObj.GetSignCertInfo('IssuerDN'),
      CryptoAgentObj.GetSignCertInfo('SerialNumber'),
      CryptoAgentObj.GetSignCertInfo('SubjectDN')
    ]).then(res => {
      console.log('证书res::=', res)
      const [IssuerDn, SerialNumber, SubjectDN] = res.map(item => item.result)
      console.log('获取到的证书信息', IssuerDn, SerialNumber, SubjectDN)
      if (IssuerDn) {
        return ({
          IssuerDn,
          SerialNumber,
          SubjectDN
        })
      } else {
        return ({ errorDesc: '无效证书' })
      }
    })
  } else {
    throw new Error('无效证书')
  }
}

/**
 * 验证ukey信息接口
 * @param {Object} params 加密的参数
 * @param {Boolean} needDNInfo 是否需要证书dn信息（绑定ukey时用）
 */
export function checkChromeUkeyValid(params = {}, needDNInfo = false) {
  return new Promise(async (resolve, reject) => {
    // 第一步初始化ukey控件
    window.CryptoAgentObj = new nmCryptokit(browser.name)
    await window.CryptoAgentObj.init().catch(error => {
      reject(new Error(ERROR_MAP.EXTEND_UNINSTALL))
    })

    // 第二步，获取证书信息
    const { IssuerDn, errorDesc, SubjectDN, SerialNumber } = await checkUkeyInsert().catch(error => {
      reject(new Error(ERROR_MAP.UKEY_UNINSTER))
    })
    console.log('checkUkeyInsert 的结果', IssuerDn)
    if (errorDesc) {
      throw new Error(errorDesc)
    }
    const issuerInfo = {
      issuerDn: IssuerDn,
      serialNo: SerialNumber,
      subjectDn: SubjectDN
    }
    console.log('证书的信息：', issuerInfo)

    // 第三步，异步验证证书有效性
    const res = await CommonApi.checkCertificate(issuerInfo)
    console.log('调用后端接口验证证书', res.data)
    if (res.data.status === '0') { // 证书正常 // 验证证书通过
      // 第四步 获取签名信息
      CryptoAgentObj.SignMsgPKCS7(
        JSON.stringify(params), // 要签名的数据
        'MD-5', // 'SHA-1', 'SHA-256'
        true
      ).then((signature) => {
        console.log('签名信息：：', signature)
        if (signature && !signature.result) {
          logErrorInfo()
          reject(new Error(ERROR_MAP.INVALID_SIGN))
        } else {
          // 返回结果  如果是
          resolve(needDNInfo ? issuerInfo : signature.result)
        }
      }).catch((err) => {
        if (err.errorcode === ERROR_CODE.CANCEL) {
          resolve('-1')
        }
      })
    } else {
      reject(new Error(ERROR_MAP.INVALID_CA))
      logErrorInfo()
    }
  }).catch((error) => {
    showWarning(error.message, '警告', {
      confirmButtonText: '确定'
    })
    reject()
  })
}
