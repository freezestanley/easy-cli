
// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE } from './index'

// 签发 链属、核心、平台等状态
export const SIGN_AUDIT_STATE = {
  CORE_CHECK: '待核心审核',
  CORE_REJECT: '核心驳回',
  PLATFORM_CHECK: '待平台审核',
  PLATFORM_REJECT: '平台驳回',
  CORE_SIGN: '待核心签约',
  CHAIN_SIGN:	'待链属签约',
  CHAIN_CHECK: '待链属审核',
  CHAIN_REJECT:	'链属驳回',
  CORE_ISSUE: '待核心签发',
  SUCCESS: '已完成',
  FAIL:	'已失败',
}
// 签发 链属、核心、平台等状态
export const CORE_SIGN_AUDIT_STATE = {
  CORE_CHECK: '待核心审核',
  CORE_REJECT: '核心驳回',
  PLATFORM_CHECK: '待平台审核',
  PLATFORM_REJECT: '平台驳回',
  CORE_SIGN: '待核心签约',
  CHAIN_SIGN:	'待链属签约',
  CHAIN_CHECK: '待链属审核',
  CHAIN_REJECT:	'链属驳回',
  CORE_ISSUE: '待核心签发',
  SUCCESS: '已完成',
  FAIL:	'已失败',
}

// // 签发 状态code 核心企业 链属企业 平台方
// ========链属签发列表===========
// 已完成 CORE_CORP_SIGNED

// ========链属申请签发===========
// 待复核 CHAIN_CORP_APPLYED
// 待核心审核 CHAIN_CORP_REVIEWED|CORE_CORP_CHECKED
// 待平台审核 CORE_CORP_REVIEWED
// 待核心签约 PLATFORM_CHECKED
// 已完成 CORE_CORP_SIGNED
// 复核驳回 CHAIN_CORP_REVIEW_REJECTED
// 核心驳回 CORE_CORP_CHECK_REJECTED|CORE_CORP_REVIEW_REJECTED
// 平台驳回 PLATFORM_REJECTED

// ========核心签发列表=============
// 待复核 CORE_CORP_APPLYED
// 待平台审核 CORE_CORP_REVIEWED
// 待签约 PLATFORM_CHECKED
// 已完成 CORE_CORP_SIGNED
// 复核驳回 CORE_CORP_REVIEW_REJECTED
// 平台驳回 PLATFORM_REJECTED

// =========核心签发申请=============
// 待审核 CHAIN_CORP_REVIEWED
// 待复核 CORE_CORP_CHECKED
// 待平台审核 CORE_CORP_REVIEWED
// 待签约 PLATFORM_CHECKED
// 已完成 CORE_CORP_SIGNED
// 已驳回 CORE_CORP_CHECK_REJECTED
// 复核驳回 CORE_CORP_REVIEW_REJECTED
// 平台驳回 PLATFORM_REJECTED

// ==========平台====================
// 待审核 CORE_CORP_REVIEWED
// 待核心签约 PLATFORM_CHECKED
// 已完成 CORE_CORP_SIGNED
// 审核驳回 PLATFORM_REJECTED
// 签发 链属、核心、平台等状态
