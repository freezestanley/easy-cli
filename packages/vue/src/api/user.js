import request from '@/utils/request'

export function sendCodeResetPwd(data) {
  return request({
    url: '/user/sendCode',
    method: 'post',
    data
  })
}

export {
  login, logout, register, getInfo, queryCorpOperDetail, resetPwd, modifyPwd,
  registerSend,
  modifyEmail,
  modifySafeCodeSend,
  modifySafeCode,
  resetPwdSend,
  bindSafeCode,
  agreeLicense
} from './interface/ops'

