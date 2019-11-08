// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE } from './index'

export const ROLE_TYPE_MAP = {
  PLATFORM: 'PLATFORM',
  FUND: 'FUND',
  CORE: 'CORE',
  CHAIN: 'CHAIN'
}

// 核心企业推送状态
export const CORE_PUSH_STATUS = {
  N: '未推送',
  Y: '已推送'
}

// 授信企业状态
export const CREDIT_STATUS = [
  { value: '', label: '全部' },
  { value: 'AVALIABLE', label: '正常' },
  { value: 'FREEZED', label: '已冻结' },
  { value: 'EXPIRED', label: '已过期' }
]
export const CREDIT_STATUS_MAP = {
  AVALIABLE: '正常',
  FREEZED: '已冻结',
  EXPIRED: '已过期'
}
export const CREDIT_STATUS_MAP_COLOR = {
  AVALIABLE: { value: '正常', class: 'success' },
  FREEZED: { value: '已冻结', class: 'error' },
  EXPIRED: { value: '已过期', class: 'disabled' }
}
// 授信账户状态
export const CREDIT_STATUS_CLS_MAP = {
  AVALIABLE: 'available',
  FREEZED: 'frozen',
  EXPIRED: 'expired',
}

// 额度操作
export const AQUOTA_OPERATE_LIST = [
  { value: 'FROZEN_QUOTA', label: '冻结' },
  { value: 'THAW_QUOTA', label: '解冻' },
  { value: 'CHANGE_QUOTA', label: '调额' },
  { value: 'EXTEND_EXPIRE_DATE', label: '延长有效期' }
]

export const AQUOTA_OPERATE_MAP = {
  FROZEN_QUOTA: '冻结',
  THAW_QUOTA: '解冻',
  CHANGE_QUOTA: '额度调增',
  EXTEND_EXPIRE_DATE: '延长有效期'
}
