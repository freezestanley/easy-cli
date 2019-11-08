import request from '@/utils/request'
const prefix = '/api/ops/trans/transfer'
const TRANS_downFromUpFirstNodeTransferTrans = prefix + '/downFromUpFirstNodeTransferTrans'
const TRANS_endNodeTransferTrans = prefix + '/endNodeTransferTrans'
const TRANS_queryTransferTrans = prefix + '/queryTransferTrans'
const TRANS_upToDownFirstNodeTrans = prefix + '/upToDownFirstNodeTrans'
const TRANS_previewTransferTokenContract = prefix + '/previewTransferTokenContract'
const TRANS_downFromUpSecondNodeTransferTrans = prefix + '/downFromUpSecondNodeTransferTrans'

// 查询转让通证交易
export function queryTransferTrans (data = {}) {
  return request({
    url: TRANS_queryTransferTrans,
    method: 'POST',
    data
  })
}

// 上游链属企业主动发起转让通证
export function upToDownFirstNodeTrans (data = {}) {
  return request({
    url: TRANS_upToDownFirstNodeTrans,
    method: 'POST',
    data
  })
}

// 审核转让交易
export function endNodeTransferTrans (data = {}) {
  return request({
    url: TRANS_endNodeTransferTrans,
    method: 'POST',
    data
  })
}

// 下游链属企业申请通证转让
export function downFromUpFirstNodeTransferTrans (data = {}) {
  return request({
    url: TRANS_downFromUpFirstNodeTransferTrans,
    method: 'POST',
    data
  })
}

// 下游链属企业申请通证转让 - 上游转让
export function downFromUpSecondNodeTransferTrans (data = {}) {
  return request({
    url: TRANS_downFromUpSecondNodeTransferTrans,
    method: 'POST',
    data
  })
}

// 合同预览
export function previewTransferTokenContract (data = {}) {
  return request({
    url: TRANS_previewTransferTokenContract,
    method: 'POST',
    data
  })
}
