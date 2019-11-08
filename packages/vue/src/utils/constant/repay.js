// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE } from './index'

// 还款状态（所有的，可能用不上全部）
export const REPAY_STATUS = [
  { value: 'APPLYED', label: '还款方已申请' },
  { value: 'CANCEL', label: '还款方取消还款申请' },
  { value: 'SIGN', label: '还款方已标记还款申请' },
  { value: 'REJECTED', label: '收款方已拒绝' },
  { value: 'CONFIRM', label: '收款方已确认' },
  { value: 'UNDUE', label: '待还款' },
  { value: 'REPAYED', label: '还清' },
  { value: 'OVERDUED', label: '逾期' },
  { value: 'OVERDUED_REPAYED', label: '逾期还清' },
]

export const REPAY_STATUS_MAP = {
  APPLYED: '还款方已申请',
  CANCEL: '还款方取消还款申请',
  SIGN: '待确认',
  REJECTED: '收款方已拒绝',
  CONFIRM: '收款方已确认',
  UNDUE: '待还款',
  REPAYED: '还清',
  OVERDUED: '逾期',
  OVERDUED_REPAYED: '逾期还清'
}

export const REPAY_MANAGE_STATUS_MAP = {
  UNDUE: '待还款',
  REPAYED: '还清',
  OVERDUED: '逾期',
  OVERDUED_REPAYED: '逾期还清'
}
// 还款管理状态
export const REPAY_MANAGE_STATUS = [
  { value: 'UNDUE', label: '待还款' },
  { value: 'REPAYED', label: '还清' },
  { value: 'OVERDUED', label: '逾期' },
  { value: 'OVERDUED_REPAYED', label: '逾期还清' },
]

