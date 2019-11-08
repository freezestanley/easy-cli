
import request from '@/utils/request'
const prefix = '/api/ops/quota'
const UKEY_bindUkey = prefix + '/bindUkey'
const UKEY_changeOper = prefix + '/changeOper'

// 绑定Ukey
export const bindUkey = function (data = {}) {
  return request({
    url: UKEY_bindUkey,
    method: 'POST',
    data
  })
}

// 分配操作员，更换操作员
export const changeOper = function (data = {}) {
  return request({
    url: UKEY_changeOper,
    method: 'POST',
    data
  })
}
