// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, CHECK_FLOW_STATUS, FLOW_POP_TYPE } from './index'
// 银行卡相关
export const CARD_TYPE = {
  PAYMENT: '付款账号',
  COLLECT: '收款账号',
  ALL: '收/付款账号',
  KEY_PAYMENT: 'PAYMENT',
  KEY_COLLECT: 'COLLECT',
  KEY_ALL: 'ALL'
}
export const CARD_TYPE_LIST = [
  { value: 'PAYMENT', label: '付款账号' },
  { value: 'COLLECT', label: '收款账号' },
  { value: 'ALL', label: '收付账号' }
]
export const CARD_BIZ_STATUS_LIST = [
  { value: 'PLATFORM_PAYMENT', label: '待平台打款' }, // 刚添加，待平台打款验证
  { value: 'CORP_PAYMENT', label: '待企业确认' }, // 待企业标记打款信息
  { value: 'PLATFORM_PAYMENT_REJECT', label: '平台打款驳回' }, // 平台未打款驳回
  { value: 'PLATFORM_BIND_CARD_CHECK_REJECT', label: '平台审核驳回' }, // 待企业标记打款信息
  { value: 'PLATFORM_BIND_CARD_CHECK', label: '待审核' }, // 待平台审核
  { value: 'SUCCESS', label: '已完成' },
  { value: 'FAIL', label: '失败' }
]
export const CARD_BIZ_STATUS = {
  PLATFORM_PAYMENT: '待平台打款',
  CORP_PAYMENT: '待企业确认',
  PLATFORM_PAYMENT_REJECT: '平台打款驳回',
  PLATFORM_BIND_CARD_CHECK_REJECT: '平台审核驳回',
  PLATFORM_BIND_CARD_CHECK: '待审核',
  SUCCESS: '已完成',
  FAIL: '失败',
  KEY_I: 'PLATFORM_PAYMENT',
  KEY_P: 'CORP_PAYMENT',
  KEY_N: 'PLATFORM_PAYMENT_REJECT',
  KEY_R: 'PLATFORM_BIND_CARD_CHECK_REJECT',
  KEY_C: 'PLATFORM_BIND_CARD_CHECK',
  KEY_S: 'SUCCESS',
  KEY_F: 'FAIL'
}

