import request from '@/utils/request'

// 申请还款
export const applyRepay = function(data) {
  return request({
    url: '/api/ops/repayApi/applyRepay',
    method: 'POST',
    data
  })
}

// 取消还款
export const cancelRepay = function(data) {
  return request({
    url: '/api/ops/repayApi/cancelRepay',
    method: 'POST',
    data
  })
}

// 审核还款
export const checkRepay = function(data) {
  return request({
    url: '/api/ops/repayApi/checkRepay',
    method: 'POST',
    data
  })
}

// 确认收款
export const confirmCollection = function(data) {
  return request({
    url: '/api/ops/repayApi/confirmCollection',
    method: 'POST',
    data
  })
}

// 查询收款详情
export const queryCollectionDetailList = function(data) {
  return request({
    url: '/api/ops/repayApi/queryCollectionDetailList',
    method: 'POST',
    data
  })
}

// 收款管理
export const queryCollectionPlan = function(data) {
  return request({
    url: '/api/ops/repayApi/queryCollectionPlan',
    method: 'POST',
    data
  })
}

// 查询还款详情
export const queryRepayDetail = function(data) {
  return request({
    url: '/api/ops/repayApi/queryRepayDetail',
    method: 'POST',
    data
  })
}

// 查询还款详情列表
export const queryRepayDetailList = function(data) {
  return request({
    url: '/api/ops/repayApi/queryRepayDetailList',
    method: 'POST',
    data
  })
}

// 还款管理
export const queryRepayPlan = function(data) {
  return request({
    url: '/api/ops/repayApi/queryRepayPlan',
    method: 'POST',
    data
  })
}

// 链属还款管理
export const queryRepayPlanForChain = function (data) {
  return request({
    url: '/api/ops/repayApi/queryRepayPlanForChain',
    method: 'POST',
    data
  })
}

// 拒绝收款
export const rejectCollection = function(data) {
  return request({
    url: '/api/ops/repayApi/rejectCollection',
    method: 'POST',
    data
  })
}

// 标记还款
export const signRepay = function(data) {
  return request({
    url: '/api/ops/repayApi/signRepay',
    method: 'POST',
    data
  })
}

//
export const getCollectionPlan = function (data) {
  return request({
    url: '/api/ops/repayApi/getCollectionPlan',
    method: 'POST',
    data
  })
}

//
export const getRepayPlan = function (data) {
  return request({
    url: '/api/ops/repayApi/getRepayPlan',
    method: 'POST',
    data
  })
}

// 平台方手动给有异议的订单解冻
export const platformThawToken = function (data) {
  return request({
    url: '/api/ops/repayApi/platformThawToken',
    method: 'POST',
    data
  })
}
