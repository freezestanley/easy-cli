import request from '@/utils/request'

export function createInviteCode(data) {
  return request({
    url: '/invite/list',
    method: 'post',
    data
  })
}
// 获取企业认证列表
export function getEntList(data) {
  return request({
    url: '/api/ops/corp/user/queryCorpAuthTrans',
    method: 'post',
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

// 修改企业审核状态
export function setEntAudit(data) {
  return request({
    url: `/api/ops/corp/user/updateCorpAuthTrans`,
    method: 'post',
    data
  })
}

// 平台添加企业
export function platformAddCorpInfo(data) {
  return request({
    url: `/api/ops/corp/user/platformAddCorpInfo`,
    method: 'post',
    data
  })
}

export {
  login
}
  from './interface/ops'
export {
  getCorpInviteCode,
  queryCorpInviteCode,
  addCorpInviteCode
}
  from './interface/crop'
export { getCorpList, queryCorp }
  from './interface/crop'
export {
  addAnnouncement,
  queryAnnouncementList,
  cancelSendMessage,
  querySendMessageCorp,
  resendMessage
}
  from './interface/message'
// 银行卡
export {
  queryBankAccountAuthTrans,
  updateBankAccountAuthTrans,
  updateCorpBankAccountFlow,
  updateBankAccountAuthTransPlatformPayInfo
}
  from './interface/crop'

// 企业增信接口
export {
  addCorpIncTrust,
  queryCorpIncTrust,
  updateCorpIncTrust
}
  from './interface/crop-inc-trust'

// 资产相关接口
export {
  queryAssetList // 资产浏览，平台查看核心企业的应付资产
}
  from './interface/asset'

export {
  queryQuotaCorpList // 授信企业列表查询(平台/资金方共用)
}
  from './interface/token'

// 签发
export {
  platformCheckIssueTokenTrans,
  platformQueryIssueTokenTrans
}
  from './interface/sign'

// 转让
export {
  queryTransferTrans, // 查询转让通证交易
  endNodeTransferTrans, // 审核转让交易
  previewTransferTokenContract
}
  from './interface/transfer'

// 融资产品
export {
  queryLoanProductByPlatform,
  addOrUpdateLoanServiceFee,
  getLoanServiceFee
}
  from './interface/product'

// 融资
export {
  queryLoanPercentage, // 获取融资抽成列表
  getLoanTrans, // 获取融资详情（修改抽成前调用）
  platformUpdateLoanPercentage, // 修改融资抽成比例
  queryLoanTrans, // 查询融资
  platformEnterPercentage, // 平台方录入抽成
  platformCheckLoanTrans, // 平台方审核融资
  platformConfirmLoanPercentage, // 平台确认抽成已收到
}
  from './interface/financing'
