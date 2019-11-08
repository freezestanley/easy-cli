// 链浏览器
import request from '@/utils/request'

// 存证查询
export function evidence (data = {}) {
  return request({
    url: '/api/ops/chain/query/evidence',
    method: 'POST',
    data
  })
}

// token查询
export function tokenInfo ({ txhash = '' }) {
  return request({
    url: '/api/ops/chain/query/tokenInfo',
    method: 'POST',
    data: { tokenNo: txhash }
  })
}

// 交易查询
export function transer (data = {}) {
  return request({
    url: '/api/ops/chain/query/transer',
    method: 'POST',
    data
  })
}
