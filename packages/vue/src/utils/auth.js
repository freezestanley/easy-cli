import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const LoginNameKey = 'FIRSTLASTNAME'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 操作用户名
export function getLoginName() {
  return Cookies.get(LoginNameKey)
}

export function setLoginName(loginName) {
  return Cookies.set(LoginNameKey, loginName)
}

export function removeLoginName() {
  return Cookies.remove(LoginNameKey)
}
