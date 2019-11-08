// 企业用户相关业务
import request from '@/utils/request'
const prefix = '/api/ops/corp/user'

const OPS_addCorp = prefix + '/addCorp'
const OPS_addCorpBankAccount = prefix + '/addCorpBankAccount'
const OPS_addCorpInfo = prefix + '/addCorpInfo'
const OPS_addCorpInviteCode = prefix + '/addCorpInviteCode'
const OPS_changeCorpInviteCodeStatus = prefix + '/changeCorpInviteCodeStatus'
const OPS_deleteCorpBankAccount = prefix + '/deleteCorpBankAccount'
const OPS_getCorp = prefix + '/getCorp'
const OPS_getCorpBankAccount = prefix + '/getCorpBankAccount'
const OPS_getCorpInfo = prefix + '/getCorpInfo'
const OPS_getCorpInviteCode = prefix + '/getCorpInviteCode'
const OPS_getCorpList = prefix + '/listCorp'
const OPS_queryCorp = prefix + '/queryCorp'
const OPS_queryCorpBankAccount = prefix + '/queryCorpBankAccount'
const OPS_queryBankAccountAuthTrans = prefix + '/queryBankAccountAuthTrans'
const OPS_queryCorpInviteCode = prefix + '/queryCorpInviteCode'
const OPS_updateCorpBankAccount = prefix + '/updateCorpBankAccount'
const OPS_updateCorpBankAccountFlow = prefix + '/updateCorpBankAccountFlow'
const OPS_updateBankAccountAuthTrans =
    prefix + '/updateBankAccountAuthTrans'
const OPS_updateBankAccountAuthTransPlatformPayInfo =
    prefix + '/updateBankAccountAuthTransPlatformPayInfo'
const OPS_updateBankAccountAuthTransCorpPayInfo =
    prefix + '/updateBankAccountAuthTransCorpPayInfo'
const OPS_updateCorpInfo = prefix + '/updateCorpInfo'
const OPS_updateCorpStatus = prefix + '/updateCorpStatus'

// 新增企业
export function addCorp(data = {}) {
  return request({
    url: OPS_addCorp,
    method: 'POST',
    data
  })
}

// 新增企业信息
export function addCorpInfo(data = {}) {
  return request({
    url: OPS_addCorpInfo,
    method: 'POST',
    data
  })
}

// 生成邀请码
export function addCorpInviteCode(data = {}) {
  return request({
    url: OPS_addCorpInviteCode,
    method: 'POST',
    data
  })
}

// 修改邀请码状态
export function changeCorpInviteCodeStatus(data = {}) {
  return request({
    url: OPS_changeCorpInviteCodeStatus,
    method: 'POST',
    data
  })
}

// 查询企业
export function getCorp(data = {}) {
  return request({
    url: OPS_getCorp,
    method: 'POST',
    data
  })
}

// 查询企业详情
export function getCorpInfo(data = {}) {
  return request({
    url: OPS_getCorpInfo,
    method: 'POST',
    data
  })
}

// 查询邀请码
export function getCorpInviteCode(data = {}) {
  return request({
    url: OPS_getCorpInviteCode,
    method: 'POST',
    data
  })
}

// 获取企业列表
export function getCorpList(data = {}) {
  return request({
    url: OPS_getCorpList,
    method: 'POST',
    data
  })
}
// 获取审核中的企业详细信息
export function getEntDetail(data) {
  return request({
    url: `/api/ops/corp/user/getCorpAuthTrans`,
    method: 'post',
    data
  })
}
// 分页获取企业列表
export function queryCorp(data = {}) {
  return request({
    url: OPS_queryCorp,
    method: 'POST',
    data
  })
}

// 获取邀请码列表
export function queryCorpInviteCode(data = {}) {
  return request({
    url: OPS_queryCorpInviteCode,
    method: 'POST',
    data
  })
}

// 修改企业信息
export function updateCorpInfo(data = {}) {
  return request({
    url: OPS_updateCorpInfo,
    method: 'POST',
    data
  })
}

// 平台添加企业信息
export function platformAddCorpInfo (data) {
  return request({
    url: '/api/ops/corp/user/platformAddCorpInfo',
    method: 'POST',
    data,
  })
}

// 修改企业状态
export function updateCorpStatus(data = {}) {
  return request({
    url: OPS_updateCorpStatus,
    method: 'POST',
    data
  })
}

// 对公账号相关
// 新增对公账号
export function addCorpBankAccount(data = {}) {
  return request({
    url: OPS_addCorpBankAccount,
    method: 'POST',
    data
  })
}

// 删除对公账号
export function deleteCorpBankAccount(id) {
  return request({
    url: OPS_deleteCorpBankAccount + '?bankAccountId=' + id,
    method: 'GET'
  })
}

// 查询对公账号
export function getCorpBankAccount(data = {}) {
  return request({
    url: OPS_getCorpBankAccount,
    method: 'POST',
    data
  })
}

// 获取对公账号列表
export function queryCorpBankAccount(data = {}) {
  return request({
    url: OPS_queryCorpBankAccount,
    method: 'POST',
    data
  })
}

// 平台查询对公账号审核表
export function queryBankAccountAuthTrans(data = {}) {
  return request({
    url: OPS_queryBankAccountAuthTrans,
    method: 'POST',
    data
  })
}

// 修改对公账号
export function updateCorpBankAccount(data = {}) {
  return request({
    url: OPS_updateCorpBankAccount,
    method: 'POST',
    data
  })
}

// 平台标记已打款
export function updateCorpBankAccountFlow(data = {}) {
  return request({
    url: OPS_updateCorpBankAccountFlow,
    method: 'POST',
    data
  })
}

// 修改对公账号审核状态
export function updateBankAccountAuthTrans(data = {}) {
  return request({
    url: OPS_updateBankAccountAuthTrans,
    method: 'POST',
    data
  })
}
export function updateBankAccountAuthTransPlatformPayInfo(data = {}) {
  return request({
    url: OPS_updateBankAccountAuthTransPlatformPayInfo,
    method: 'POST',
    data
  })
}
// 企业标记对公账号已打款
export function updateBankAccountAuthTransCorpPayInfo(data = {}) {
  return request({
    url: OPS_updateBankAccountAuthTransCorpPayInfo,
    method: 'POST',
    data
  })
}
