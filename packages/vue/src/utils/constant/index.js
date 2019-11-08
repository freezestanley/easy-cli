// 所有常量配置
// ukey驱动下载地址
export const DOWNLOAD = {
  suiyin: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/CryptoKit.SuiYin.exe',
  chrome: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/suiyin_ukey.crx',
  x86: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/CryptoKit.UA.x86.exe',
  x64: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/CryptoKit.UA.x64.exe'
}
export const INSTALL_HELP = 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/help.docx'
export const UKEY_HELP = 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/chrome-extensions.pdf'
export const directDownload = ['jpg', 'jpeg', 'png', 'zip', 'rar'] // 直接下载
export const openPreview = ['pdf', 'docx', 'doc']
export const FILE_TYEPS = [...directDownload, ...openPreview]

export const ZHONGDENG_URL = 'https://www.zhongdengwang.org.cn'
export const QIYE_TYPE_URL = 'http://www.miit.gov.cn/n1146285/n1146352/n3054355/n3057278/n3057286/c3592332/part/3592333.pdf'
export const REGISTER_PRO_URL = 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/other/%E5%B9%B3%E5%8F%B0%E6%B3%A8%E5%86%8C%E5%8F%8A%E4%BD%BF%E7%94%A8%E5%8D%8F%E8%AE%AE.pdf'
export const PROJECT_TOKEN_NAME = '通证' // 自定义的token名称
export const TAB_STATUS = {
  SUCCESS: 'success',
  RESOLVED: 'resolved', // 已处理
  PENDING: 'pending', // 带处理
}

// 账号角色类型
export const ROLE_TYPE = {
  PLATFORM: '平台方',
  FUND: '资金方',
  CORE: '核心企业',
  CHAIN: '链属企业',
  GENERAL: '通用'
}
export const ROLE_TYPE_MAP = {
  PLATFORM: 'PLATFORM',
  FUND: 'FUND',
  CORE: 'CORE',
  CHAIN: 'CHAIN'
}
export const ROLE_TYPE_LIST = [
  { value: 'PLATFORM', label: '平台方' },
  { value: 'FUND', label: '资金方' },
  { value: 'CORE', label: '核心企业' },
  { value: 'CHAIN', label: '链属企业' }
]
export const ROLE_TYPE_LIST_PLATFORM = [
  { value: 'FUND', label: '资金方' },
  { value: 'CORE', label: '核心企业' },
  { value: 'CHAIN', label: '链属企业' }
]
export const ROLE_MAP = {
  PLATFORM: 'PLATFORM',
  FUND: 'FUND',
  CORE: 'CORE',
  CHAIN: 'CHAIN',
}
export const AUTH_MAP = {
  I: '待审核',
  P: '审核中',
  S: '审核通过',
  F: '已驳回'
}

// ukey类型
export const UKEY_TYPE = {
  HANDLE: 'HANDLE',
  CHECK: 'CHECK'
}
export const UKEY_TYPE_TEXT = {
  HANDLE: '经办',
  CHECK: '复核'
}

export const UKEY_TYPE_LIST = [
  { value: 'HANDLE', label: '经办' },
  { value: 'CHECK', label: '复核' }
]
// ukey状态status
export const UKEY_STATUS = {
  '0': '激活',
  '1': '过期',
  '2': '吊销'
}

/**
 * 状态相关的字典、颜色及文字
 */

// 订单的状态字典（表格中取状态）
export const ORDER_STATUS_COLOR = {
  INIT: 'finish',
  PROCESSING: 'ing', // 进行中
  SUCCESS: 'finish', // 已完成
  REJECTED: 'close', // 已关闭
  FAIL: 'close', // 失败
}
// 订单状态文案
export const ORDER_STATUS_MAP = {
  INIT: '已创建', // 已创建(这个正常情况不会出现)
  PROCESSING: '进行中', // 进行中
  SUCCESS: '已完成', // 已完成
  REJECTED: '已关闭', // 已关闭
  FAIL: '失败', // 失败(这个正常情况不会出现)
  KEY_INIT: 'INIT',
  KEY_PROCESSING: 'PROCESSING',
  KEY_SUCCESS: 'SUCCESS',
  KEY_REJECTED: 'REJECTED',
  KEY_FAIL: 'FAIL'
}
// 用户过滤表单查询
export const ORDER_STATUS_LIST = [
  { value: 'PROCESSING', label: '进行中' }, // 进行中
  { value: 'SUCCESS', label: '已完成' }, // 已完成
  { value: 'REJECTED', label: '已关闭' }, // 已关闭
]

/**
 * 审核流中状态
 */
export const CHECK_FLOW_STATUS = {
  NONE: 'NONE', // 本人未参与审核流或流程还未到 本人 一般不会用到
  OPERATE: 'OPERATE', // 当前正是本人操作 显示 审核、或操作、签约流 按钮
  DONE: 'DONE', // 本人已操作完， 可以查看审核流
}

export const FLOW_POP_TYPE = {
  CHECK: 'CHECK', // 审核
  FLOW: 'FLOW', // 审核流
  SIGN: 'SIGN', // 签约
  SFLOW: 'SFLOW', // 签约流
  SEAL: 'SEAL', // 签约，但不要审核流
  SEALFLOW: 'SEALFLOW', // 签约流，但不要审核流
}

// 所有业务流程名称  用来获取对应的字典 this.currentDict[BUSINESS_FLOW_NAME.TOKEN] 得到当前流程能看到的流程状态
export const BUSINESS_FLOW_NAME = {
  TOKEN: 'TOKEN',
  REPAY: 'REPAY',
  BIND_CARD: 'BIND_CARD',
  PLATFORM_APPLY_ADJUST_CREDIT: 'PLATFORM_APPLY_ADJUST_CREDIT',
  CHAIN_APPLY_ISSUE: 'CHAIN_APPLY_ISSUE',
  CHAIN_TRANSFER: 'CHAIN_TRANSFER',
  DCHAIN_TO_UCHAIN_APPLY_TRANSFER: 'DCHAIN_TO_UCHAIN_APPLY_TRANSFER',
  CORP_AUTH: 'CORP_AUTH',
  PLATFORM_PUSH_CREDIT: 'PLATFORM_PUSH_CREDIT',
  PLATFORM_ADD_CORP: 'PLATFORM_ADD_CORP'
}
