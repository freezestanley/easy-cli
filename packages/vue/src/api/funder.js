import request from '@/utils/request'
// 融资产品
export {
  getLoanServiceFee,
  addOrUpdateLoanProduct,
  queryLoanProductByFund,
  getLatestLoanProduct,
  getLoanProduct
} from './interface/product'

export function getList(params) {
  return request({
    url: '/ent/list',
    method: 'get',
    params
  })
}

export {
  queryTemplateFile,
  uploadContractTemplate,
  deleteContractTemplate
} from './interface/contract'

// 融资相关
export {
  queryLoanTrans,
  downLoadLoanInfo, // 下载信息
  fundCheckLoanTrans,
  fundConfirmPaid,
  fundSignedLoanTrans,
  fundSignedReviewLoanTrans,
  previewFinContract, // 详情通过交易no查询预览pdf地址
} from './interface/financing'
