export const BASE_URL = '/apiMid';

export const FILE_TYEPS = ['jpg', 'jpeg', 'png', 'zip', 'rar', 'docx', 'doc', 'pdf', 'xlsx'];

// 平台方 -机构管理-机构类型
export const PLAT_ORG_TYPE = {
  INS: '渠道方-QD',
  FUND: '资金方-ZJ',
};

// 机构类型
export const ORG_TYPE = {
  PLAT: '平台方',
  INS: '渠道方',
  FUND: '资金方',
};

// 不明入账状态
export const UNKONWN_ENTRY_STATUS = {
  PEND: '待处理',
  CLER: '已处理',
};

// 垫资类型
export const CAPITAL_TYPE = {
  FIRST: '首次',
  APPEND: '追加',
};

// 出险原因
export const CAUSE_REASON = {
  1: '疾病住院',
  2: '未知',
};

// 证件类型
export const CARD_TYPE = {
  I: '身份证',
};

// 与被保险人关系
export const RELATIONSHIP_ENUM = {
  本人: '本人',
  配偶: '配偶',
  父母: '父母',
  子女: '子女',
  祖父母: '祖父母',
  孙子女: '孙子女',
  兄弟姐妹: '兄弟姐妹',
  其他: '其他',
};

// 性别
export const GENDER = {
  1: '男',
  2: '女',
};

// 婚姻状况
export const MARRY_FLAG = {
  1: '未婚',
  2: '已婚',
};

// 最高学历
export const HIGHEST_EDU = {
  0: '小学',
  1: '初中',
  2: '高中',
  3: '专科',
  4: '本科',
  5: '硕士',
  6: '博士',
};

// 最高学位
export const HIGHEST_DEG = {
  0: '无',
  1: '学士',
  2: '硕士',
  3: '博士',
};

// 所属行业
export const INDUSTRY = {
  1: '行业1',
  2: '行业1',
};

// 居住状况
export const LIVING_CONDITION = {
  1: '良好',
  2: '一般',
  3: '较差',
};

// 还款状态
export const REPAY_STATUS = {
  SUCCESS: '成功',
  FAIL: '失败',
  REPAYING: '还款中',
};

// 还款方式
export const REPAY_TYPE = {
  UNKNOWENTRY: '不明入账',
  CLAIMS: '理赔打款',
  ONLINE: '线上还款',
  OFFLINE: '线下还款',
};

// 垫资状态
export const AD_MONEY_STATUS = {
  INIT: '初始化',
  TO_APPLY: '待提交申请',
  CUSTOMER_CONFIRM: '待客户确认',
  CUSTOMER_CONFIRM_FAIL: '客户确认有误',
  INSURER_CHECKING: '保险方审核中',
  INSURER_CHECK_FAIL: '保险方审核失败',
  INSURER_CHECK_PATCH: '保险方审核补件',
  INSURER_REJECT: '保险方拒绝',
  FUNDER_CHECKING: '资金方审核中',
  FUNDER_CHECK_FAIL: '资金方审核失败',
  FUNDER_CHECK_PATCH: '资金方审核补件',
  CUSTOMER_SIGN: '待客户签约',
  APPLY_LOAN: '待申请放款',
  CANCEL: '取消垫资',
  TO_LOAN: '待放款',
  LOAN_FAIL: '放款失败',
  PAY_BACK: '待还款',
  OVERDUE: '逾期',
  CLEARED: '已结清',
};

// 上报征信状态
export const REPORT_CREDIT_STATUS = {
  SB_TB: '待上报',
  SB_ING: '上报中',
  SB_SU: '已上报',
  SB_FA: '上报失败',
};

// 逾期天数
export const YUQI_STATUS = {
  NORL: '正常',
  ODUE: '逾期',
  CLER: '结清',
};
