// 系统公共相关接口
import request from '@/utils/request'
const prefix = '/api/ops/product'

// 融资产品相关
const OPS_queryLoanProductByPlatform =
  prefix + '/queryLoanProductByPlatform'
const OPS_addOrUpdateLoanProduct = prefix + '/addOrUpdateLoanProduct'
const OPS_addOrUpdateLoanServiceFee =
  prefix + '/addOrUpdateLoanServiceFee'
const OPS_getLoanServiceFee = prefix + '/getLoanServiceFee'
const OPS_queryLoanProductByFund = prefix + '/queryLoanProductByFund'
const OPS_queryLoanProductByChain = prefix + '/queryLoanProductByChain'
const OPS_getLoanProduct = prefix + '/getLoanProduct'
const OPS_getLatestLoanProduct = prefix + '/getLatestLoanProduct'

// 平台分页查询融资产品
export function queryLoanProductByPlatform(data) {
  return request({
    url: OPS_queryLoanProductByPlatform,
    method: 'POST',
    data
  })
}
// 资金方增加融资产品
export function addOrUpdateLoanProduct(data) {
  return request({
    url: OPS_addOrUpdateLoanProduct,
    method: 'POST',
    data
  })
}
// 查询融资产品详情
export function getLoanProduct(data) {
  return request({
    url: OPS_getLoanProduct,
    method: 'POST',
    data
  })
}
export function getLatestLoanProduct(data) {
  return request({
    url: OPS_getLatestLoanProduct,
    method: 'get',
    data
  })
}

// 平台增加产品服务费配置
export function addOrUpdateLoanServiceFee(data) {
  return request({
    url: OPS_addOrUpdateLoanServiceFee,
    method: 'POST',
    data
  })
}
// 获取融资服务费配置信息
export function getLoanServiceFee(data) {
  return request({
    url: OPS_getLoanServiceFee,
    method: 'POST',
    data
  })
}
// 资金方分页查询自身融资产品
export function queryLoanProductByFund(data) {
  return request({
    url: OPS_queryLoanProductByFund,
    method: 'POST',
    data
  })
}
// 链属方分页查询自身融资产品
export function queryLoanProductByChain(data) {
  return request({
    url: OPS_queryLoanProductByChain,
    method: 'POST',
    data
  })
}
