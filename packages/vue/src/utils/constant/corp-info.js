export const QIYE_TYPE_URL = 'http://www.miit.gov.cn/n1146285/n1146352/n3054355/n3057278/n3057286/c3592332/part/3592333.pdf'
// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST } from './index'

export const AUTH_MAP = {
  INIT: '待审核',
  PROCESSING: '审核中',
  SUCCESS: '审核通过',
  REJECTED: '已驳回',
  FAIL: '失败',
}

export const ROLE_TYPE = {
  PLATFORM: '平台方',
  FUND: '资金方',
  CORE: '核心企业',
  CHAIN: '链属企业'
}

export const ROLE_TYPE_LIST_PLATFORM = [
  { value: 'FUND', label: '资金方' },
  { value: 'CORE', label: '核心企业' },
  { value: 'CHAIN', label: '链属企业' }
]
