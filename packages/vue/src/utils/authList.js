// 各个角色权限配置列表
export const ROLE_AUTH_LIST = {
  PLATFORM: [
    { authName: '邀请码管理', authNo: 'PLATFORM_0' },
    { authName: '企业认证', authNo: 'PLATFORM_1' },
    { authName: '企业信息变更审核', authNo: 'PLATFORM_2' },
    { authName: '消息管理', authNo: 'PLATFORM_3' },
    { authName: '推送授信', authNo: 'PLATFORM_5' },
    {
      authName: '授信调整（授信额度调增/调减；延长授信有效期；冻结/解冻）',
      authNo: 'PLATFORM_6'
    },
    { authName: '核心企业授信调增审核', authNo: 'PLATFORM_7' },
    { authName: '对公账号管理', authNo: 'PLATFORM_8' },
    { authName: '融资服务费配置', authNo: 'PLATFORM_9' },
    { authName: '签发审核', authNo: 'PLATFORM_10' },
    { authName: '转让审核', authNo: 'PLATFORM_11' },
    { authName: '融资审核', authNo: 'PLATFORM_12' },
    { authName: '发送公告', authNo: 'PLATFORM_13' }
  ],
  FUND: [
    { authName: '企业信息管理（提交认证+编辑）', authNo: 'FUND_INFO' },
    { authName: '对公账号管理', authNo: 'FUND_CARD' },
    { authName: '账号权限管理', authNo: 'FUND_AUTH' },
    { authName: 'ukey更换操作员', authNo: 'FUND_OPERATOR' },

    { authName: '业务经办', authNo: 'FUND_HANDLE' },
    { authName: '业务复核', authNo: 'FUND_CHECK' },
  ],
  CORE: [
    { authName: '企业信息管理（提交认证+编辑）', authNo: 'CORE_INFO' },
    { authName: '对公账号管理', authNo: 'CORE_CARD' },
    { authName: '账号权限管理', authNo: 'CORE_AUTH' },
    { authName: 'ukey更换操作员', authNo: 'CORE_OPERATOR' },

    { authName: '业务经办', authNo: 'CORE_HANDLE' },
    { authName: '业务复核', authNo: 'CORE_CHECK' },
  ],
  CHAIN: [
    { authName: '企业信息管理（提交认证+编辑）', authNo: 'CHAIN_INFO' },
    { authName: '对公账号管理', authNo: 'CHAIN_CARD' },
    { authName: '账号权限管理', authNo: 'CHAIN_AUTH' },
    { authName: 'ukey更换操作员', authNo: 'CHAIN_OPERATOR' },

    { authName: '业务经办', authNo: 'CHAIN_HANDLE' },
    { authName: '业务复核', authNo: 'CHAIN_CHECK' },
  ]
}

// 各个角色权限配置列表
export const ROLE_AUTH_LIST_MAP = {
  PLATFORM: {
    PLATFORM_0: '邀请码管理',
    PLATFORM_1: '企业认证',
    PLATFORM_2: '企业信息变更审核',
    PLATFORM_3: '消息中心',
    PLATFORM_4: '待办',
    PLATFORM_5: '推送授信',
    PLATFORM_6: '授信调整（授信额度调增/调减；延长授信有效期；冻结/解冻）',
    PLATFORM_7: '核心企业授信调增审核',
    PLATFORM_8: '对公账号管理',
    PLATFORM_9: '融资服务费配置',
    PLATFORM_10: '签发审核',
    PLATFORM_11: '转让审核',
    PLATFORM_12: '融资审核',
    PLATFORM_13: '发送公告',
    PLATFORM_14: '账号权限管理'
  },
  FUND: {
    FUND_INFO: '企业信息管理（提交认证+编辑）',
    FUND_CARD: '对公账号管理',
    FUND_AUTH: '账号权限管理',
    FUND_OPERATOR: 'ukey更换操作员',

    FUND_HANDLE: '业务经办',
    FUND_CHECK: '业务复核',
  },
  CORE: {
    CORE_INFO: '企业信息管理（提交认证+编辑）',
    CORE_CARD: '对公账号管理',
    CORE_AUTH: '账号权限管理',
    CORE_OPERATOR: 'ukey更换操作员',

    CORE_HANDLE: '业务经办',
    CORE_CHECK: '业务复核',
  },
  CHAIN: {
    CHAIN_INFO: '企业信息管理（提交认证+编辑）',
    CHAIN_CARD: '对公账号管理',
    CHAIN_AUTH: '账号权限管理',
    CHAIN_OPERATOR: 'ukey更换操作员',

    CHAIN_HANDLE: '业务经办',
    CHAIN_CHECK: '业务复核',
  }
}
