import request from '@/utils/request'
const prefix = '/api/ops/token'

const TOKEN_queryTokenProfile = prefix + '/queryTokenProfile'
const TOKEN_queryCoreToken = prefix + '/queryCoreToken'
const TOKEN_queryFundToken = prefix + '/queryFundToken'
const TOKEN_queryFundReToken = prefix + '/queryFundReToken'
const TOKEN_queryChainToken = prefix + '/queryChainToken'
const TOKEN_queryQuotaCorpList = prefix + '/queryQuotaList'
const TOKEN_tokenRecord = prefix + '/tokenRecord'
const TOKEN_queryToken = prefix + '/queryToken'// /查询token
// 链属企业账户管理
export const queryTokenProfile = function(data = {}) {
  return request({
    url: TOKEN_queryTokenProfile,
    method: 'POST',
    data
  })
}

// 核心企业账户管理
export const queryCoreToken = function(data = {}) {
  return request({
    url: TOKEN_queryCoreToken,
    method: 'POST',
    data
  })
}

// 链属企业账户管理
export const queryChainToken = function(data = {}) {
  return request({
    url: TOKEN_queryChainToken,
    method: 'POST',
    data
  })
}

// 资金方回收企业账户管理
export const queryFundToken = function(data = {}) {
  return request({
    url: TOKEN_queryFundToken,
    method: 'POST',
    data
  })
}

// 资金方企业账户管理
export const queryFundReToken = function(data = {}) {
  return request({
    url: TOKEN_queryFundReToken,
    method: 'POST',
    data
  })
}

// 授信企业列表查询(平台/资金方共用)
export const queryQuotaCorpList = function(data = {}) {
  return request({
    url: TOKEN_queryQuotaCorpList,
    method: 'POST',
    data
  })
}
// token流转记录
export const tokenRecord = function(data = {}) {
  return request({
    url: TOKEN_tokenRecord,
    method: 'POST',
    data
  })
}
// token流转记录
export const queryToken = function(data = {}) {
  return request({
    url: TOKEN_queryToken,
    method: 'POST',
    data
  })
}
