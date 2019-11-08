// 签发相关业务
import request from '@/utils/request'
const prefix = '/api/ops/token/issue'

const Sign_chainCorpApplyIssueTokenTrans =
  prefix + '/applyIssueTokenTrans'
const Sign_chainCorpQueryIssueTokenTrans =
  prefix + '/queryIssueTokenTrans'
const Sign_chainCorpReviewIssueTokenTrans =
  prefix + '/updateIssueTokenTrans'
const Sign_chainCorpSignIssueTokenContract =
  prefix + '/updateIssueTokenTrans'
const Sign_coreCorpApplyIssueTokenTrans =
  prefix + '/applyIssueTokenTrans'
const Sign_coreCorpCheckIssueTokenTrans =
  prefix + '/updateIssueTokenTrans'
const Sign_coreCorpQueryIssueTokenTrans =
  prefix + '/queryIssueTokenTrans'
const Sign_coreCorpReviewIssueTokenTrans =
  prefix + '/updateIssueTokenTrans'
const Sign_coreCorpSignIssueTokenContract =
  prefix + '/updateIssueTokenTrans'
const Sign_platformCheckIssueTokenTrans =
  prefix + '/updateIssueTokenTrans'
const Sign_platformQueryIssueTokenTrans =
  prefix + '/queryIssueTokenTrans'
const Sign_previewIssueTokenContract = prefix + '/previewIssueTokenContract'
// 链属企业申请签发通证
export const chainCorpApplyIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_chainCorpApplyIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 链属企业查询签发通证交易
export const chainCorpQueryIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_chainCorpQueryIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 链属企业复核签发通证
export const chainCorpReviewIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_chainCorpReviewIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 链属企业签约
export const chainCorpSignIssueTokenContract = function(data = {}) {
  return request({
    url: Sign_chainCorpSignIssueTokenContract,
    method: 'POST',
    data
  })
}

// 核心企业主动发起签发通证
export const coreCorpApplyIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_coreCorpApplyIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 核心企业审核签发通证
export const coreCorpCheckIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_coreCorpCheckIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 核心企业查询签发通证交易
export const coreCorpQueryIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_coreCorpQueryIssueTokenTrans,
    method: 'POST',
    data
  })
}
// 核心企业复核签发通证
export const coreCorpReviewIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_coreCorpReviewIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 核心企业签约
export const coreCorpSignIssueTokenContract = function(data = {}) {
  return request({
    url: Sign_coreCorpSignIssueTokenContract,
    method: 'POST',
    data
  })
}
// 核心企业签约复核
export const coreCorpReviewSignIssueTokenContract = function(data = {}) {
  return request({
    url: prefix + '/coreCorpReviewSignIssueTokenContract',
    method: 'POST',
    data
  })
}

// 平台方审核签发通证
export const platformCheckIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_platformCheckIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 平台方查询签发通证交易
export const platformQueryIssueTokenTrans = function(data = {}) {
  return request({
    url: Sign_platformQueryIssueTokenTrans,
    method: 'POST',
    data
  })
}

// 平台签发预览PDF
export const previewIssueTokenContract = function(data = {}) {
  return request({
    url: Sign_previewIssueTokenContract,
    method: 'POST',
    data
  })
}
