// 系统公共相关接口
import request from '@/utils/request'
const prefix = '/api/ops'

const OPS_login = prefix + '/corpOperApi/login'
const OPS_logout = prefix + '/corpOperApi/logout'
const OPS_register = prefix + '/corpOperApi/register'
const OPS_queryCorpOperDetail = prefix + '/corpOperApi/queryCorpOperDetail'
const OPS_getInfo = prefix + '/corpOperApi/getInfo'
const OPS_agreeLicense = prefix + '/corp/user/agreeLicense'

// 用户管理
const OPS_delUser = prefix + '/corpOperApi/delUser'
const OPS_editUser = prefix + '/corpOperApi/editUser'
const OPS_list = prefix + '/corpOperApi/list'
const OPS_saveUser = prefix + '/corpOperApi/saveUser'
const OPS_getUserRoleList = prefix + '/opsRoleApi/querySimplifyRoleList'

const OPS_modifyEmail = prefix + '/safetyApi/modifyEmail'
const OPS_modifyPwd = prefix + '/safetyApi/modifyPwd'
const OPS_modifySafeCode = prefix + '/safetyApi/modifySafeCode'
const OPS_resetPwd = prefix + '/safetyApi/resetPwd'
const OPS_bindSafeCode = prefix + '/safetyApi/bindSafeCode'

// 发送用户邮件
const OPS_registerSend = prefix + '/sendEmailApi/registerSend'
const OPS_resetPwdSend = prefix + '/sendEmailApi/resetPwdSend'
const OPS_modifySafeCodeSend = prefix + '/sendEmailApi/modifySafeCodeSend'

// ukey部分
const OPS_checkCertificate = prefix + '/uKeyApi/checkCertificate'
const OPS_bindUkey = prefix + '/uKeyApi/bindUkey'
const OPS_unBindUkey = prefix + '/uKeyApi/unBindUkey'
const OPS_queryOperByCorpNo = prefix + '/uKeyApi/queryOperByCorpNo'
const OPS_changeOper = prefix + '/uKeyApi/changeOper'
const OPS_queryUkeyList = prefix + '/uKeyApi/queryUkeyList'

const OPS_queryOpsDictionariesDOListAll =
  prefix + '/dicApi/queryOpsDictionariesDOListAll'
const OPS_upload = process.env.VUE_APP_BASE_API + prefix + '/oss/upload'
const OPS_queryTasks = prefix + '/taskApi/queryTasks'

const OPS_getContractByCorp = prefix + '/repayApi/getContractByCorp'

// 上传接口
export { OPS_upload as UPLOAD_URL }

// 登录
export function login(data) {
  return request({
    url: OPS_login,
    method: 'POST',
    data
  })
}

// 查询登录人详情(登录后里面调用的接口)
export function queryCorpOperDetail(loginName) {
  return request({
    url: OPS_queryCorpOperDetail,
    method: 'POST',
    data: { loginName }
  })
}

// 登出
export function logout(data) {
  return request({
    url: OPS_logout,
    method: 'POST',
    data
  })
}

// 注册
export function register(data) {
  return request({
    url: OPS_register,
    method: 'POST',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: OPS_getInfo,
    method: 'GET',
    params: { token }
  })
}

// 用户同意协议
export function agreeLicense(data) {
  return request({
    url: OPS_agreeLicense,
    method: 'POST',
    data
  })
}

// 修改邮箱
export function modifyEmail(data) {
  return request({
    url: OPS_modifyEmail,
    method: 'POST',
    data
  })
}

// 修改密码
export function modifyPwd(data) {
  return request({
    url: OPS_modifyPwd,
    method: 'POST',
    data
  })
}

// 修改动态码
export function modifySafeCode(data) {
  return request({
    url: OPS_modifySafeCode,
    method: 'POST',
    data
  })
}

// 重置密码
export function resetPwd(data) {
  return request({
    url: OPS_resetPwd,
    method: 'POST',
    data
  })
}

// 注册发送邮件
export function registerSend(email) {
  return request({
    url: OPS_registerSend,
    method: 'POST',
    data: {
      email
    }
  })
}
// 重置密码发送邮件
export function resetPwdSend(loginName) {
  return request({
    url: OPS_resetPwdSend,
    method: 'POST',
    data: {
      loginName
    }
  })
}
// 更改动态码发送邮件
export function modifySafeCodeSend(email) {
  return request({
    url: OPS_modifySafeCodeSend,
    method: 'GET',
    data: {
      email
    }
  })
}

// 绑定动态码
export function bindSafeCode(data) {
  return request({
    url: OPS_bindSafeCode,
    method: 'POST',
    data
  })
}

// 验证证书有效性
export function checkCertificate(data) {
  return request({
    url: OPS_checkCertificate,
    method: 'POST',
    data
  })
}
// 绑定Ukey
export function bindUkey(data) {
  return request({
    url: OPS_bindUkey,
    method: 'POST',
    data
  })
}
// 解绑Ukey
export function unBindUkey(data) {
  return request({
    url: OPS_unBindUkey,
    method: 'POST',
    data
  })
}
// 查询企业下的操作员列表
export function queryOperByCorpNo(data) {
  return request({
    url: OPS_queryOperByCorpNo,
    method: 'POST',
    data
  })
}
// 分配操作员，更换操作员
export function changeOper(data) {
  return request({
    url: OPS_changeOper,
    method: 'POST',
    data
  })
}

// 获取ukey列表
export function queryUkeyList(data) {
  return request({
    url: OPS_queryUkeyList,
    method: 'POST',
    data
  })
}

// 文件上传
export function upload(data) {
  return request({
    url: OPS_upload,
    method: 'POST',
    data
  })
}
// 下载文件
export function downloadFile(fileUrl) {
  return request({
    url: '/api/ops/oss/downLoad?fileUrl=' + fileUrl,
    method: 'POST',
    responseType: 'blob', // ms-stream IE中支持这个
    headers: {
      'Content-Type': 'text/html;charset=utf-8'
    }
  })
}

// 获取全部 字典数据
export function queryOpsDictionariesDOListAll(data = {}) {
  return request({
    url: OPS_queryOpsDictionariesDOListAll,
    method: 'POST',
    data
  })
}

// 查询待办任务总数
export function queryTasks(data = {}) {
  return request({
    url: OPS_queryTasks,
    method: 'POST',
    data
  })
}

// 收还款列表查询合约地址
export function getContractByCorp(data = {}) {
  return request({
    url: OPS_getContractByCorp,
    method: 'POST',
    data
  })
}

// 用户管理-删除用户
export function deleteUser(data = {}) {
  return request({
    url: OPS_delUser,
    method: 'POST',
    data
  })
}

// 用户管理-编辑用户
export function editUser(data = {}) {
  return request({
    url: OPS_editUser,
    method: 'POST',
    data
  })
}

// 用户管理-用户列表
export function getUserList(data = {}) {
  return request({
    url: OPS_list,
    method: 'POST',
    data
  })
}

// 用户管理-新增用户
export function addSaveUser(data = {}) {
  return request({
    url: OPS_saveUser,
    method: 'POST',
    data
  })
}

// 用户管理-角色查询
export function getUserRoleList(data = {}) {
  return request({
    url: OPS_getUserRoleList,
    method: 'POST',
    data
  })
}
