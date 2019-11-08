export function isWindows() {
  return navigator.userAgent.indexOf('Windows') >= 0
}

export function isIE() {
  return navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0
}
export function isChrome() {
  return /chrome/i.test(window.navigator.userAgent)
}
// IE下才能区分
export function isX86() {
  return window.navigator.cpuClass === 'x86'
}

export function BrowserInfo() {
  const res = {
    name: '',
    version: ''
  }
  const userAgent = self.navigator.userAgent
  const reg = /edge\/([\d\.]+)/i.exec(userAgent)

  if (reg) {
    res.name = 'Edge'
    res.version = reg[1]
  } else if (/msie/i.test(userAgent)) {
    res.name = 'IE'
    res.version = /msie ([\d\.]+)/i.exec(userAgent)[1]
  } else if (/Trident/i.test(userAgent)) {
    res.name = 'IE'
    res.version = /rv:([\d\.]+)/i.exec(userAgent)[1]
  } else if (/chrome/i.test(userAgent)) {
    res.name = 'Chrome'
    res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1]
  } else if (/safari/i.test(userAgent)) {
    res.name = 'Safari'
    res.version = /version\/([\d\.]+)/i.exec(userAgent)[1]
  } else if (/firefox/i.test(userAgent)) {
    res.name = 'Firefox'
    res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1]
  }
  return res
}

export const browser = new BrowserInfo()
