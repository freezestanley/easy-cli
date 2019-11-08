// CORP_AUTH("企业认证")
// PLATFORM_ADD_CORP("平台新增企业")
// BIND_CARD("企业对公账号绑定")
// PLATFORM_PUSH_CREDIT("平台推送授信")
// FUND_ADJUST_CREDIT("资金方调整授信")
// CORE_APPLY_ADJUST_CREDIT("核心授信调增申请")
// PLATFORM_APPLY_ADJUST_CREDIT("平台对核心的授信调整申请")
// CORE_ISSUE("核心主动签发")
// CHAIN_APPLY_ISSUE("链属申请签发")
// CHAIN_TRANSFER("链属主动转让")
// DCHAIN_TO_UCHAIN_APPLY_TRANSFER("下游链属向上游申请转让")
// TOKEN("融资")
// REPAY("还款")
let flowStatus = ''
/**
 * 获取待办路径
 * @param {*} type roleType
 * @param {*} bizType PLATFORM | CORE | CHAIN | FUND
 */
export function getTodoPath(type, bizType, bizStatus) {
  flowStatus = bizStatus
  if (!type || !bizType) return
  const config = getConfig()
  const usrConfig = config[type]
  const bizConfig = usrConfig[bizType]
  if (!bizConfig) return
  return {
    path: bizConfig.path,
    tab: bizConfig.tab
  }
}
/**
 * 根据flowType(+flowStatus)来判断获取对应path
 */
function getConfig() {
  return {
    PLATFORM: {
      BIND_CARD: { // 企业对公账号绑定待审核
        path: '/corp-manage/bank-card-check'
      },
      PLATFORM_PUSH_CREDIT: { // 平台推送授信
        path: '/business/quota-manage/push-quota'
      },
      CORE_APPLY_ADJUST_CREDIT: { // 核心授信调增申请
        path: '/business/quota-manage/quota-apply',
        tab: 'core-up-list'
      },
      PLATFORM_APPLY_ADJUST_CREDIT: { // 平台发起调整授信申请
        path: '/business/quota-manage/quota-apply',
        tab: 'plat-apply-list'
      },
      /** 签发 */
      CORE_ISSUE: { // 核心主动签发
        path: '/business/issue-manage'
      },
      CHAIN_APPLY_ISSUE: {
        path: '/business/issue-manage'
      },
      /** 转让 */
      CHAIN_TRANSFER: {
        path: '/business/transfer-manage'
      },
      DCHAIN_TO_UCHAIN_APPLY_TRANSFER: {
        path: '/business/transfer-manage'
      },
      TOKEN: { // 融资
        path: '/business/loan-manage/index'
      },
      REPAY: { // 还款
        path: '/business/repay-manage/list'
      }
    },
    CORE: {
      CORP_AUTH: { // 企业认证
        path: '/account/corp-info'
      },
      CORE_APPLY_ADJUST_CREDIT: { // 核心授信调整申请
        path: '/business/quota/quota-manage'
      },
      CHAIN_APPLY_ISSUE: { // 链属申请签发
        path: '/business/issue',
        tab: 'applySign'
      },
      CORE_ISSUE: { // 核心主动签发
        path: '/business/issue',
        tab: 'signList'
      },
      REPAY: { // 还款
        path: '/business/repay-manage/list'
      }
    },
    CHAIN: {
      CORP_AUTH: { // 企业认证
        path: '/account/corp-info'
      },
      CHAIN_APPLY_ISSUE: { // 链属申请签发
        path: '/business/issue',
        tab: 'applySign'
      },
      // 遗漏 链属获得签发
      CHAIN_TRANSFER: { // 链属主动转让
        path: '/business/transfer/transfer-list',
        tab: flowStatus.indexOf('DOWNCHAIN') !== -1 ? 'accept' : 'launched'
      },
      DCHAIN_TO_UCHAIN_APPLY_TRANSFER: { // 下游向上游申请转让
        path: '/business/transfer/transfer-list',
        tab: 'accept'
      },
      TOKEN: { // 融资
        path: '/business/loan-manage'
      },
      REPAY: { // 还款
        path: '/business/repayment/list'
      }
    },
    FUND: {
      CORP_AUTH: { // 企业认证
        path: '/account/corp-info'
      },
      CORE_APPLY_ADJUST_CREDIT: { // 核心授信调整
        path: '/quota/wait-list' // 待授信列表页面  /quota/apply-list 授信申请页面
      },
      TOKEN: { // 融资
        path: '/business/loan-manage/list'
      },
      REPAY: { // 还款
        path: '/business/loan-manage/list'
      }
    }
  }
}
