var chromeExtension = 'hcjcnicjggmppomabbiidcpejdegajif'
var productID = 'com.cfca.cryptokit.suiyin' // hcjcnicjggmppomabbiidcpejdegajif

var extensionName = productID + '.extension'
var reqEventName = productID + '.request'
var respEventName = productID + '.response'

const Browser = {
  IE: 'Internet Explorer',
  Edge: 'Edge',
  Chrome: 'Chrome',
  Safari: 'Safari',
  Firefox: 'Firefox',
}

// Encapsulate Chrome sendMessage callback to Promise
function SendMessageforChrome(request) {
  return new Promise(function (resolve, reject) {
    // disabled eslint
    chrome.runtime.sendMessage(chromeExtension, request, function (response) {
      if (response) {
        if (response.errorcode === 0) {
          console.log('获取插件通信成功', request, response)
          resolve(response)
        } else {
          reject(response)
        }
      } else {
        var result = new Object()
        result.errorcode = 1
        result.result = chrome.runtime.lastError.message
        reject(result)
      }
    })
  })
}

// Encapsulate Edge&Firefox event to Promise
function SendMessagebyEvent(request) {
  var event = new CustomEvent(reqEventName, { detail: request })
  document.dispatchEvent(event)

  return new Promise(function (resolve, reject) {
    var responseEventName = respEventName
    if (request.funcInfo !== undefined && request.funcInfo.randomId !== undefined) { responseEventName += ('.' + request.funcInfo.randomId) }

    document.addEventListener(responseEventName, function CallBack(e) {
      document.removeEventListener(e.type, CallBack)
      var eJson = JSON.parse(e.detail)
      if (eJson !== null && eJson.errorcode === 0) {
        resolve(eJson)
      } else {
        reject(eJson)
      }
    }, false)
  })
}

// 跟插件之间发送消息
function SendMessage(browser, requestJSON) {
  if (Browser.Chrome === browser) {
    return SendMessageforChrome(requestJSON)
  } else {
    return SendMessagebyEvent(requestJSON)
  }
}

/**
 * 检查Chrome插件是否安装
 * @param {*} browser
 */
function checkExtension(browser) {
  return new Promise(function (resolve, reject) {
    var result = new Object()
    if (Browser.Chrome === browser) {
      // chrome.runtime.sendMessage() could check extension  existence.
      resolve(browser)
    } else if (Browser.Edge === browser || Browser.Firefox === browser) {
      if (document.getElementById(extensionName)) {
        resolve(browser)
      } else {
        result.errorcode = 1
        result.result = 'Extension does not exist!'
        reject(result)
      }
    } else {
      result.errorcode = 1
      result.result = 'Only support Chrome/Edge/Firefox'
      reject(result)
    }
  })
}

function nmCryptokit(browser) {
  this.browser = browser
}

function GenerateRandomId() {
  var charstring = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
  var maxPos = charstring.length
  var randomId = ''
  for (let i = 0; i < 10; i++) {
    randomId += charstring.charAt(Math.floor(Math.random() * maxPos))
  }
  return randomId
}

nmCryptokit.prototype.init = function () {
  var browser = this.browser
  return checkExtension(browser)
    .then(function (browser) {
      var request = new Object()
      request.action = 'connect'
      request.host = productID
      return SendMessage(browser, request)
    }).then(function () {
      var request = new Object()
      request.action = 'checkHost'
      return SendMessage(browser, request)
    })
}

nmCryptokit.prototype.uninit = function () {
  var request = new Object()
  request.action = 'disconnect'
  request.host = productID

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.getExtensionVersion = function () {
  var request = new Object()
  var funcInfo = new Object()

  funcInfo.function = 'getExtensionVersion'
  funcInfo.params = null
  request.action = 'getExtensionVersion'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.getHostVersion = function () {
  var request = new Object()
  var funcInfo = new Object()
  var randomId = GenerateRandomId()

  funcInfo.function = 'GetVersion'
  funcInfo.params = null
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.SelectCertificate = function (strSubjectDNFilter, strIssuerDNFilter, strSerialNo) {
  var request = new Object()
  var funcInfo = new Object()
  var paramArr = new Array()
  var randomId = GenerateRandomId()

  paramArr.push(strSubjectDNFilter)
  paramArr.push(strIssuerDNFilter)
  paramArr.push(strSerialNo)

  funcInfo.function = 'SelectCertificate'
  funcInfo.params = paramArr
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.GetSignCertInfo = function (strInfoType) {
  var request = new Object()
  var funcInfo = new Object()
  var paramArr = new Array()
  var randomId = GenerateRandomId()
  paramArr.push(strInfoType)

  funcInfo.function = 'GetSignCertInfo'
  funcInfo.params = paramArr
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.SignMsgPKCS7 = function (strSource, strSelectedAlg, bAttached) {
  var request = new Object()
  var funcInfo = new Object()
  var paramArr = new Array()
  var randomId = GenerateRandomId()

  paramArr.push(strSource)
  paramArr.push(strSelectedAlg)
  paramArr.push(bAttached)

  funcInfo.function = 'SignMsgPKCS7'
  funcInfo.params = paramArr
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.SignHashMsgPKCS7Detached = function (bstrSourceData, bstrHashAlg) {
  var request = new Object()
  var funcInfo = new Object()
  var paramArr = new Array()
  var randomId = GenerateRandomId()

  paramArr.push(bstrSourceData)
  paramArr.push(bstrHashAlg)

  funcInfo.function = 'SignHashMsgPKCS7Detached'
  funcInfo.params = paramArr
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.SetSM2CSPList = function (bstrSM2CSPList) {
  var request = new Object()
  var funcInfo = new Object()
  var paramArr = new Array()
  var randomId = GenerateRandomId()

  paramArr.push(bstrSM2CSPList)

  funcInfo.function = 'SetSM2CSPList'
  funcInfo.params = paramArr
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.getVersion = function () {
  var request = new Object()
  var funcInfo = new Object()
  var randomId = GenerateRandomId()

  funcInfo.function = 'GetVersion'
  funcInfo.params = null
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

nmCryptokit.prototype.GetLastErrorDesc = function () {
  var request = new Object()
  var funcInfo = new Object()
  var randomId = GenerateRandomId()

  funcInfo.function = 'GetLastErrorDesc'
  funcInfo.params = null
  funcInfo.randomId = randomId

  request.action = 'invoke'
  request.funcInfo = funcInfo

  return SendMessage(this.browser, request)
}

export {
  nmCryptokit
}
