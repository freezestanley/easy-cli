import request from '@/utils/request'

// 增加融资
export function addLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/addLoanTrans',
    method: 'POST',
    data
  })
}

// 链属企业复核融资
export function chainCorpReviewLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/chainCorpReviewLoanTrans',
    method: 'POST',
    data
  })
}

// 链属企业签约
export function chainCorpSignedLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/chainCorpSignedLoanTrans',
    method: 'POST',
    data
  })
}
// 链属企业签约复核
export function chainCorpSignedReviewLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/chainCorpSignedReviewLoanTrans',
    method: 'POST',
    data
  })
}

// 融资企业修改融资抽成付款详情
export function corpUpdateLoanPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/corpUpdateLoanPercentage',
    method: 'POST',
    data
  })
}

// 资金方下载中登网融资信息
export function downLoadLoanInfo(data = {}) {
  return request({
    url: '/api/ops/loanTrans/downLoadLoanInfo',
    method: 'POST',
    responseType: 'blob', // ms-stream IE中支持这个
    // responseHeaders: {
    //   'Content-Type': 'application/octet-stream;charset=utf-8'
    // },
    data
  })
}

// 资金方审核融资
export function fundCheckLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/fundCheckLoanTrans',
    method: 'POST',
    data
  })
}

// 资金方确认放款
export function fundConfirmPaid(data = {}) {
  return request({
    url: '/api/ops/loanTrans/fundConfirmPaid',
    method: 'POST',
    data
  })
}

// 资金方创建合约 第一步
export function fundSignedLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/fundSignedLoanTrans',
    method: 'POST',
    data
  })
}
// 资金方复核签约 第二部、步
export function fundSignedReviewLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/fundSignedReviewLoanTrans',
    method: 'POST',
    data
  })
}

// 查询融资抽成详情
export function getLoanPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/getLoanPercentage',
    method: 'POST',
    data
  })
}
// 平台确认抽成
export function platformConfirmLoanPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/platformConfirmLoanPercentage',
    method: 'POST',
    data
  })
}

// 获取融资详情（编辑抽成时调用）
export function getLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/getLoanTrans',
    method: 'POST',
    data
  })
}

// 平台方录入抽成
export function platformEnterPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/platformEnterPercentage',
    method: 'POST',
    data
  })
}

// 平台方审核融资
export function platformCheckLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/platformCheckLoanTrans',
    method: 'POST',
    data
  })
}

// 平台修改融资抽成比例
export function platformUpdateLoanPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/platformUpdateLoanPercentage',
    method: 'POST',
    data
  })
}

// 平台方查询融资抽成列表
export function queryLoanPercentage(data = {}) {
  return request({
    url: '/api/ops/loanTrans/queryLoanPercentage',
    method: 'POST',
    data
  })
}

// 查询融资
export function queryLoanTrans(data = {}) {
  return request({
    url: '/api/ops/loanTrans/queryLoanTrans',
    method: 'POST',
    data
  })
}

// 详情通过交易no查询预览pdf地址
export function previewFinContract(data = {}) {
  return request({
    url: '/api/ops/loanTrans/previewFinContract',
    method: 'POST',
    data
  })
}

// 新建融资查看pdf
export function preview(data = {}) {
  return request({
    url: '/api/ops/loanTrans/preview',
    method: 'POST',
    data
  })
}

