import request from '@/utils/request'

// 添加企业增信信息
export function addCorpIncTrust(data) {
  return request({
    url: '/api/ops/corpIncTrustApi/addCorpIncTrust',
    method: 'POST',
    data
  })
}

// 查询企业增信信息
export function queryCorpIncTrust(data) {
  return request({
    url: '/api/ops/corpIncTrustApi/queryCorpIncTrust',
    method: 'POST',
    data
  })
}

// 更新企业增信信息
export function updateCorpIncTrust(data) {
  return request({
    url: '/api/ops/corpIncTrustApi/updateCorpIncTrust',
    method: 'POST',
    data
  })
}
