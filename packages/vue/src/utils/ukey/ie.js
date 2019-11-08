import { isX86 } from '../browser'
import { CommonApi } from '@/api'
import { showWarning, logErrorInfo, ERROR_MAP, ERROR_CODE } from './util'

function GetCertInfoOnClick() {
  try {
    const IssuerDn = CryptoAgentObj.GetSignCertInfo('IssuerDN')
    const SerialNumber = CryptoAgentObj.GetSignCertInfo('SerialNumber')
    const SubjectDN = CryptoAgentObj.GetSignCertInfo('SubjectDN')
    // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
    if (!IssuerDn || !SerialNumber) {
      const errorDesc = CryptoAgentObj.GetLastErrorDesc()
      return ({ errorDesc })
    } else {
      return {
        IssuerDn,
        SerialNumber,
        SubjectDN
      }
    }
  } catch (e) {
    console.error('获取信息发生错误了：', e)
    const errorDesc = CryptoAgentObj.GetLastErrorDesc()
    return { errorDesc }
  }
}

/**
 * 初始化ukey
 * 1、判断系统
 * 2、判断浏览器
 * 3、检查驱动
 */
export const initUkey = function() {
  if (isX86()) {
    document.getElementById('FakeCryptoAgent').innerHTML =
      '<object id=\"CryptoAgent\" codebase=\"CryptoKit.SuiYin.x86.cab#version=3,4,0,1\" classid=\"clsid:174D0573-2751-4CBF-8056-B59DB9330C2A\" ></object>'
  } else {
    console.error('不是x86')
    document.getElementById('FakeCryptoAgent').innerHTML =
      '<object id=\"CryptoAgent\" codebase=\"CryptoKit.SuiYin.x64.cab#version=3,4,0,1\" classid=\"clsid:E7EBEE4D-3D0F-4E9F-B190-F9AF6F4DF190\" ></object>'
  }
  return new Promise(async (resolve, reject) => {
    window.CryptoAgentObj = document.getElementById('CryptoAgent')

    console.log('IE CryptoAgentObj:::::========', CryptoAgentObj)
    if (CryptoAgentObj) {
      resolve()
    }
    if (!CryptoAgentObj) {
      // 控件未安装
      reject()
    }
  })
}

// 检查ukey是否已经插入
async function checkUkeyInsert() {
  console.log('准备check inster')
  return new Promise(async (resolve, reject) => {
    let zhengshuIsOk = null
    try {
      zhengshuIsOk = CryptoAgentObj.SelectCertificate('', 'CFCA', '')
    }catch(err) {
      reject({ errorDesc: '证书是无效的' })
    }
    console.log('zhengshuIsOk:::', zhengshuIsOk)
    if (zhengshuIsOk) {
      const { IssuerDn, SerialNumber, SubjectDN, errorDesc } = await GetCertInfoOnClick()
      console.log('获取到的信息', IssuerDn, SerialNumber)
      if (errorDesc) {
        reject({ errorDesc })
      } else {
        resolve({
          IssuerDn,
          SerialNumber,
          SubjectDN
        })
      }
    } else {
      reject({ errorDesc: '证书是无效的' })
    }
  })
}

/**
 * 验证ukey信息接口
 * @param {Object} params 加密的参数
 * @param {Boolean} needDNInfo 是否需要证书dn信息（绑定ukey时用）
 */
export async function checkIEUkeyValid(params = {}, needDNInfo) {
  return new Promise(async (resolve, reject) => {
    initUkey().catch(error => {
      reject(new Error(ERROR_MAP.EXTEND_UNINSTALL))
    })
    const { IssuerDn, errorDesc, SubjectDN, SerialNumber } = await checkUkeyInsert().catch(error => {
      reject(new Error(ERROR_MAP.IE_UNINSTALL))
    })
    console.log('checkUkeyInsert 的结果', IssuerDn)
    if (errorDesc) {
      return false
    }
    const issuerInfo = {
      issuerDn: IssuerDn,
      serialNo: SerialNumber,
      subjectDn: SubjectDN
    }
    console.log('证书的信息：', issuerInfo)
    try {
      const res = await CommonApi.checkCertificate(issuerInfo)
      console.log('调用后端接口验证证书', res.data)
      if (res.data.status === '0') { // 证书正常 // 验证证书通过
        const signature = CryptoAgentObj.SignMsgPKCS7(
          params, // 要签名的数据
          'MD-5', // 'SHA-1', 'SHA-256'
          true
        )
        if (!signature) {
          logErrorInfo()
          reject(new Error(ERROR_MAP.INVALID_SIGN))
        }
        resolve(needDNInfo ? issuerInfo : signature)
      } else {
        logErrorInfo()
        reject(new Error(ERROR_MAP.INVALID_CA))
      }
    } catch (err) {
      if (err.number === ERROR_CODE.CANCEL) {
        resolve('-1')
      }
    }
  }).catch((error) => {
    showWarning(error.message, '警告', {
      confirmButtonText: '确定'
    })
    reject()
  })

}
