// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from './index'

export const BIZ_STATUS_LIST = [{
  label: '待审核',
  value: 'CHAIN_CHECK_TRANSFER'
}, {
  label: '已驳回',
  value: 'CHAIN_REJECT_TRANSFER'
}, {
  label: '待平台审核',
  value: 'PLATFORM_CHECK_TRANSFER'
}, {
  label: '平台审核驳回',
  value: 'PLATFORM_REJECT_TRANSFER'
}, {
  label: '待签约',
  value: 'UPCHAIN_SEAL_TRANSFER'
}, {
  label: '待接收方签约',
  value: 'DOWNCHAIN_SEAL_TRANSFER'
}, {
  label: '已完成',
  value: 'SUCCESS'
}]

// 转让列表-我发起的
export const UPSTREAM_BIZ_STATUS_MAP = {
  'CHAIN_CHECK_TRANSFER': '待审核',
  'CHAIN_REJECT_TRANSFER': '已驳回',
  'PLATFORM_CHECK_TRANSFER': '待平台审核',
  'PLATFORM_REJECT_TRANSFER': '平台审核驳回',
  'UPCHAIN_SEAL_TRANSFER': '待签约',
  'DOWNCHAIN_SEAL_TRANSFER': '待接收方签约',
  'SUCCESS': '已完成',
  'KEY_CC': 'CHAIN_CHECK_TRANSFER',
  'KEY_CR': 'CHAIN_REJECT_TRANSFER',
  'KEY_PC': 'PLATFORM_CHECK_TRANSFER',
  'KEY_PR': 'PLATFORM_REJECT_TRANSFER',
  'KEY_US': 'UPCHAIN_SEAL_TRANSFER',
  'KEY_DS': 'DOWNCHAIN_SEAL_TRANSFER',
  'KEY_S': 'SUCCESS',
}
// 转让列表-我接收的
export const DOWNSTREAM_BIZ_STATUS_MAP = {
  // 'CHAIN_CHECK_TRANSFER': '待审核',
  // 'CHAIN_REJECT_TRANSFER': '已驳回',
  // 'PLATFORM_CHECK_TRANSFER': '待平台审核',
  // 'PLATFORM_REJECT_TRANSFER': '平台审核驳回',
  // 'UPCHAIN_SEAL_TRANSFER': '待发起方签约',
  'DOWNCHAIN_SEAL_TRANSFER': '待签约',
  'SUCCESS': '已完成',
  // 'KEY_CC': 'CHAIN_CHECK_TRANSFER',
  // 'KEY_CR': 'CHAIN_REJECT_TRANSFER',
  // 'KEY_PC': 'PLATFORM_CHECK_TRANSFER',
  // 'KEY_PR': 'PLATFORM_REJECT_TRANSFER',
  // 'KEY_US': 'UPCHAIN_SEAL_TRANSFER',
  'KEY_DS': 'DOWNCHAIN_SEAL_TRANSFER',
  'KEY_S': 'SUCCESS',
}
// 申请管理-我的申请
export const MY_APPLY_BIZ_STATUS_MAP = {
  'DOWNCHAIN_CHECK_APPLY_TRANSFER': '待审核',
  'DOWNCHAIN_REJECT_APPLY_TRANSFER': '已驳回',
  'UPCHAIN_TRANSFER_TOKEN': '待上游转让',
  'UPCHAIN_REJECT_APPLY_TRANSFER': '上游审核驳回',
  'UPCHAIN_CHECK_APPLY_TRANSFER': '待上游审核',
  'PLATFORM_CHECK_TRANSFER': '待平台审核',
  'PLATFORM_REJECT_TRANSFER': '平台审核驳回',
  'UPCHAIN_SEAL_TRANSFER': '待上游签约',
  'DOWNCHAIN_SEAL_TRANSFER': '待签约',
  'SUCCESS': '已完成',
  'KEY_DC': 'DOWNCHAIN_CHECK_APPLY_TRANSFER',
  'KEY_DR': 'DOWNCHAIN_REJECT_APPLY_TRANSFER',
  'KEY_UT': 'UPCHAIN_TRANSFER_TOKEN',
  'KEY_CR': 'UPCHAIN_REJECT_APPLY_TRANSFER',
  'KEY_UC': 'UPCHAIN_CHECK_APPLY_TRANSFER',
  'KEY_PC': 'PLATFORM_CHECK_TRANSFER',
  'KEY_PR': 'PLATFORM_REJECT_TRANSFER',
  'KEY_US': 'UPCHAIN_SEAL_TRANSFER',
  'KEY_DS': 'DOWNCHAIN_SEAL_TRANSFER',
  'KEY_S': 'SUCCESS',
}
// 申请管理-下游申请
export const DOWNSTREAM_APPLY_BIZ_STATUS_MAP = {
  'UPCHAIN_TRANSFER_TOKEN': '待转让',
  'UPCHAIN_REJECT_APPLY_TRANSFER': '已驳回',
  'UPCHAIN_CHECK_APPLY_TRANSFER': '待审核',
  'PLATFORM_CHECK_TRANSFER': '待平台审核',
  'PLATFORM_REJECT_TRANSFER': '平台审核驳回',
  'UPCHAIN_SEAL_TRANSFER': '待签约',
  'DOWNCHAIN_SEAL_TRANSFER': '待下游签约',
  'SUCCESS': '已完成',
  'KEY_UT': 'UPCHAIN_TRANSFER_TOKEN',
  'KEY_CR': 'CHAIN_REJECT_TRANSFER',
  'KEY_UC': 'UPCHAIN_CHECK_APPLY_TRANSFER',
  'KEY_PC': 'PLATFORM_CHECK_TRANSFER',
  'KEY_PR': 'PLATFORM_REJECT_TRANSFER',
  'KEY_US': 'UPCHAIN_SEAL_TRANSFER',
  'KEY_DS': 'DOWNCHAIN_SEAL_TRANSFER',
  'KEY_S': 'SUCCESS',
}
// 平台
export const PLATFORM_BIZ_STATUS_MAP = {
  'PLATFORM_CHECK_TRANSFER': '待平台审核',
  'PLATFORM_REJECT_TRANSFER': '平台审核驳回',
  'UPCHAIN_SEAL_TRANSFER': '待上游签约',
  'DOWNCHAIN_SEAL_TRANSFER': '待下游签约',
  'SUCCESS': '已完成',
  'KEY_PC': 'PLATFORM_CHECK_TRANSFER',
  'KEY_PR': 'PLATFORM_REJECT_TRANSFER',
  'KEY_US': 'UPCHAIN_SEAL_TRANSFER',
  'KEY_DS': 'DOWNCHAIN_SEAL_TRANSFER',
  'KEY_S': 'SUCCESS',
}