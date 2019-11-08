import request from '@/utils/request'

// 增加子模板
export function createChildFlowTemplate(data) {
  return request({
    url: '/api/ops/corpFlowTemplate/createChildFlowTemplate',
    method: 'POST',
    data
  })
}

// 获取所有模板
export function getAllTemplate(data) {
  return request({
    url: '/api/ops/corpFlowTemplate/getAllTemplate',
    method: 'POST',
    data
  })
}
// 获取企业所有用户
export function getAllUserByCorpNo(data) {
  return request({
    url: '/api/ops/corpFlowTemplate/getAllUserByCorpNo',
    method: 'POST',
    data
  })
}

// 获取子流程
export function getSubProcess(data) {
  return request({
    url: '/api/ops/corpFlowTemplate/getSubProcess',
    method: 'POST',
    data
  })
}

// 查询审批流
export function getHandleFlow(data) {
  return request({
    url: '/api/ops/corpFlowTemplate/getHandleFlow',
    method: 'POST',
    data
  })
}
