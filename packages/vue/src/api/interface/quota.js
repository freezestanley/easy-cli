import request from '@/utils/request'

// 授信申请
export function applyIssueQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/applyIssueQuotaTrans',
    method: 'POST',
    data
  })
}

// 额度操作交易申请
export function applyManageQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/applyManageQuotaTrans',
    method: 'POST',
    data
  })
}

// queryIssueQuotaTrans
export function queryIssueQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/queryIssueQuotaTrans',
    method: 'POST',
    data
  })
}

// 查询额度操作交易列表
export function queryManageQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/queryManageQuotaTrans',
    method: 'POST',
    data
  })
}

// 分页获取授信企业列表
export function queryQuotaCorp(data) {
  return request({
    url: '/api/ops/quota/queryQuotaCorp',
    method: 'POST',
    data
  })
}

// 查询授信明细
export function queryQuotaDetail(data) {
  return request({
    url: '/api/ops/quota/queryQuotaDetail',
    method: 'POST',
    data
  })
}

// 查询指定核心企业待授信的资金方列表
export function queryQuotafundCorps(data) {
  return request({
    url: '/api/ops/quota/queryQuotafundCorps',
    method: 'POST',
    data
  })
}

// 授信审核
export function updateIssueQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/updateIssueQuotaTrans',
    method: 'POST',
    data
  })
}

// 额度操作交易审核
export function updateManageQuotaTrans(data) {
  return request({
    url: '/api/ops/quota/updateManageQuotaTrans',
    method: 'POST',
    data
  })
}
