// 上传图片的oss接口地址
export { UPLOAD_URL }
  from './interface/ops'

// 获取全部 字典数据
export { queryOpsDictionariesDOListAll as queryAllDict }
  from './interface/ops'

// 账号权限接口
export {
  addRole,
  addRoleUser,
  deleteRole,
  deleteRoleUser,
  modifyRole,
  modifyRoleStatus,
  queryRoleList
}
  from './interface/role'

// 用户管理接口
export {
  deleteUser,
  editUser,
  getUserList,
  addSaveUser,
  getUserRoleList
} from './interface/ops'

// 企业信息接口
export {
  addCorpInfo,
  getCorpInfo,
  updateCorpInfo,
  platformAddCorpInfo,
  getEntDetail, // 平台获取企业提交的信息
}
  from './interface/crop'

// 消息管理
export {
  queryMessageList,
  markAllRead,
  markRead
}
  from './interface/message'

// 对公账号管理
export {
  addCorpBankAccount,
  deleteCorpBankAccount,
  queryCorpBankAccount,
  getCorpBankAccount,
  updateCorpBankAccount,
  updateBankAccountAuthTransCorpPayInfo
}
  from './interface/crop'

// ukey绑定解绑
export {
  checkCertificate,
  changeOper,
  bindUkey,
  unBindUkey,
  queryOperByCorpNo,
  queryUkeyList,
  queryTasks,
  downloadFile
}
  from './interface/ops'

// 通证相关接口
export {
  queryCoreToken,
  queryChainToken,
  queryFundReToken,
  queryFundToken,
  queryQuotaCorpList,
  tokenRecord, // token流转记录
}
  from './interface/token'

// 链属签约
export {
  chainCorpQueryIssueTokenTrans,
  chainCorpApplyIssueTokenTrans,
  chainCorpReviewIssueTokenTrans,
  chainCorpSignIssueTokenContract,
  previewIssueTokenContract
}
  from './interface/sign'

// 融资产品
export {
  getLoanProduct, // 查询融资产品详情
  getLoanServiceFee, // 获取融资服务费配置信息
}
  from './interface/product'

// 还款管理
export {
  applyRepay, // 申请还款
  cancelRepay, // 取消还款
  checkRepay, // 审核还款
  confirmCollection, // 确认收款
  queryCollectionDetailList, // 查询收款详情
  queryCollectionPlan, // 收款管理
  queryRepayDetail, // 查询还款详情
  queryRepayDetailList, // 查询还款详情列表
  platformThawToken, // 手动释放冻结token
  queryRepayPlan, // 还款管理
  queryRepayPlanForChain, // 链属还款管理
  rejectCollection, // 拒绝收款
  signRepay, // 标记还款
  getCollectionPlan,
  getRepayPlan,
}
  from './interface/repay'

// 链浏览器
export {
  evidence, // 存证查询
  tokenInfo, // token查询
  transer, // 交易查询
}
  from './interface/chain'

// 链浏览器
export {
  getContractByCorp // 查看合约url
}
  from './interface/ops'

// 子流程相关
export {
  createChildFlowTemplate,
  getAllTemplate,
  getAllUserByCorpNo,
  getSubProcess,
  getHandleFlow,
}
  from './interface/corp-flow-template'

// 授信相关接口
export {
  applyIssueQuotaTrans, // 授信申请
  applyManageQuotaTrans, // 额度操作交易申请
  queryIssueQuotaTrans, // queryIssueQuotaTrans
  queryManageQuotaTrans, // 查询额度操作交易列表
  queryQuotaCorp, // 分页获取授信企业列表
  queryQuotaDetail, // 查询授信明细
  queryQuotafundCorps, // 查询指定核心企业待授信的资金方列表
  updateIssueQuotaTrans, // 授信审核
  updateManageQuotaTrans, // 额度操作交易审核
} from './interface/quota'

// 数据字典
export {
  getAllBizStatus, // 查询当前用户所有能看到的业务状态
  getBizStatusCondition, // 根据流程类型查询交易筛选框里出现的bizStatus
  getDetailByCode, // 根据code查询字典
  queryOpsDictionariesDOListAll, // 查询全部字典
  refreshAll, // 刷新字典
} from './interface/dic'
