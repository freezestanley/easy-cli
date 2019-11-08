// 每个模块中都将这三个状态变量引入，免得每个页面都要分开引入
export { ORDER_STATUS_COLOR, ORDER_STATUS_MAP, ORDER_STATUS_LIST, FLOW_POP_TYPE, CHECK_FLOW_STATUS, BUSINESS_FLOW_NAME } from './index'
// 融资管理列表 链属 状态+颜色
// export const FINANCING_ATTACHED_STATUS_MAP = {
//   FUND_CONFIRM_PAID: {
//     text: '已完成',
//     class: 'success'
//   },
//   CHAIN_CORP_APPLYED: {
//     text: '待复核', // 待链属企业复核
//     class: 'wait'
//   },
//   CHAIN_CORP_REVIEWED: {
//     text: '待平台审核',
//     class: 'warning'
//   },
//   PLATFORM_CHECKED: {
//     text: '待资金方审核',
//     class: 'warning'
//   },
//   FUND_CHECKED: {
//     text: '待资金方签约',
//     class: 'warning'
//   },
//   FUND_SIGNED: {
//     text: '待资金方复核', // 待链属企业签约
//     class: 'wait'
//   },
//   FUND_SIGNED_REVIEWED: {
//     text: '待签约',
//     class: 'wait'
//   },
//   CHAIN_CORP_SIGNED: {
//     text: '待签约复核',
//     class: 'wait'
//   },
//   CHAIN_CORP_REVIEW_REJECTED: {
//     text: '复核驳回', // 链属企业复核驳回
//     class: 'error'
//   },
//   CHAIN_CORP_SIGNED_REVIEWED: {
//     text: '待资金方放款',
//     class: 'warning'
//   },
//   PLATFORM_CHECK_REJECTED: {
//     text: '平台驳回',
//     class: 'error'
//   },
//   FUND_CHECK_REJECTED: {
//     text: '资金方驳回',
//     class: 'error'
//   }
// }
// 融资管理列表 链属 状态+颜色
export const FINANCING_FUND_STATUS_MAP = {
  FUND_CONFIRM_PAID: {
    text: '已完成',
    class: 'success'
  },
  CHAIN_CORP_APPLYED: {
    text: '待复核', // 待链属企业复核
    class: 'wait'
  },
  CHAIN_CORP_REVIEWED: {
    text: '待平台审核',
    class: 'warning'
  },
  PLATFORM_CHECKED: {
    text: '待资金方审核',
    class: 'wait'
  },
  FUND_CHECKED: {
    text: '待资金方签约',
    class: 'wait'
  },
  FUND_SIGNED: {
    text: '待资金方复核', // 待链属企业签约
    class: 'wait'
  },
  FUND_SIGNED_REVIEWED: {
    text: '待链属签约',
    class: 'warning'
  },
  CHAIN_CORP_SIGNED: {
    text: '待链属签约复核',
    class: 'warning'
  },
  CHAIN_CORP_REVIEW_REJECTED: {
    text: '复核驳回', // 链属企业复核驳回
    class: 'error'
  },
  CHAIN_CORP_SIGNED_REVIEWED: {
    text: '待资金方放款',
    class: 'wait'
  },
  PLATFORM_CHECK_REJECTED: {
    text: '平台驳回',
    class: 'error'
  },
  FUND_CHECK_REJECTED: {
    text: '资金方驳回',
    class: 'error'
  }
}
// 平台 状态+颜色
export const FINANCING_PLATFORM_STATUS_MAP = {
  FUND_CONFIRM_PAID: {
    text: '已完成',
    class: 'success'
  },
  CHAIN_CORP_REVIEWED: {
    text: '待审核',
    class: 'warning'
  },
  PLATFORM_CHECKED: {
    text: '待资金方审核',
    class: 'warning'
  },
  FUND_CHECKED: {
    text: '待资金方签约',
    class: 'warning'
  },
  FUND_SIGNED: {
    text: '待资金方签约复核',
    class: 'warning'
  },
  FUND_SIGNED_REVIEWED: {
    text: '待链属签约',
    class: 'warning'
  },
  CHAIN_CORP_SIGNED: {
    text: '待融资方签约复核',
    class: 'warning'
  },
  CHAIN_CORP_SIGNED_REVIEWED: {
    text: '待资金方放款',
    class: 'warning'
  },
  CHAIN_CORP_REVIEW_REJECTED: {
    text: '审核驳回',
    class: 'error'
  },
  FUND_CHECK_REJECTED: {
    text: '资金方驳回',
    class: 'error'
  },
  CHAIN_CORP_APPLYED: {
    text: '待融资方复核',
    class: 'warning'
  },
  PLATFORM_CHECK_REJECTED: {
    text: '平台驳回',
    class: 'error'
  },
}

export const returnOptinos = function(res) {
  const data = res
  const list = [{ label: '全部', value: '' }]
  for (const key in data) {
    list.push({ label: data[key].text, value: key })
  }
  return list
}

export const PAY_STATUS_LIST = [
  { value: 'UNPAID', label: '待支付' },
  { value: 'OFFLINE_UNPAID', label: '线下待支付' },
  { value: 'PAID', label: '已支付' },
  { value: 'CONFIRMED', label: '平台已确认' },
  { value: 'REJECTED', label: '平台已驳回' },
]
export const PAY_STATUS = {
  UNPAID: '待支付',
  PAID: '已支付',
  INIT: '待支付',
  OFFLINE_UNPAID: '线下待支付',
  CONFIRMED: '已确认',
  REJECTED: '已驳回',
  KEY_UNPAID: 'UNPAID',
  KEY_PAID: 'PAID',
  KEY_INIT: 'INIT',
  KEY_OFFLINE_UNPAID: 'OFFLINE_UNPAID',
  KEY_CONFIRMED: 'CONFIRMED',
  KEY_REJECTED: 'REJECTED'
}

// 抽成支付方式 线上、线下
export const PAY_METHOD = {
  OFF_LINE: 'OFF_LINE',
  ON_LINE: 'ON_LINE',
  ALL: 'ALL',
  NONE: 'NONE',
}
