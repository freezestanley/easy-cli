// 核心企业和链属企业 共用api

export { getCorpList } from './interface/crop' // 企业

export {
  registerAsset,
  queryAssetList, // 资产浏览
  queryRegCorpList,
  destroyAsset,
  queryAssetDetail,
  editAsset,
} from './interface/asset'

export {
  coreCorpApplyIssueTokenTrans,
  coreCorpCheckIssueTokenTrans,
  coreCorpQueryIssueTokenTrans,
  coreCorpReviewIssueTokenTrans,
  coreCorpSignIssueTokenContract,
  coreCorpReviewSignIssueTokenContract, // 签约复核
} from './interface/sign'

// 转让
export {
  queryTransferTrans, // 查询转让通证交易
  upToDownFirstNodeTrans, // 上游企业主动发起转让通证
  downFromUpFirstNodeTransferTrans, // 下游企业申请转让通证
  downFromUpSecondNodeTransferTrans, // 下游链属企业申请通证转让 - 上游转让
  endNodeTransferTrans, // 审核转让通证
  previewTransferTokenContract // 合同预览
} from './interface/transfer'

// 融资
export {
  addLoanTrans, // 增加融资
  chainCorpReviewLoanTrans, // 链属企业复核融资
  chainCorpSignedLoanTrans, // 链属企业签约
  chainCorpSignedReviewLoanTrans, // 链属企业签约复核
  corpUpdateLoanPercentage, // 融资企业修改融资抽成付款详情
  getLoanPercentage, // 查询融资抽成详情
  queryLoanTrans, // 查询融资
  previewFinContract, // 详情通过交易no查询预览pdf地址
  preview, // 新建融资查看pdf
} from './interface/financing'

// token
export {
  queryToken, // 增加融资
} from './interface/token'

// 融资产品
export {
  getLoanProduct, // 查询融资产品详情
  queryLoanProductByChain, // 链属方分页查询自身融资产品
  getLoanServiceFee, // 获取融资服务费配置信息
} from './interface/product'
