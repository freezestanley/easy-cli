// 数据字典
import request from '@/utils/request'

// 根据流程类型查询交易筛选框里出现的bizStatus
export function getAllBizStatus(data) {
  return request({
    url: '/api/ops/dicApi/getAllBizStatus',
    method: 'POST',
    data
  })
}
// 根据流程类型查询交易筛选框里出现的bizStatus
export function getBizStatusCondition(data) {
  return request({
    url: '/api/ops/dicApi/getBizStatusCondition',
    method: 'POST',
    data
  })
}

// 根据code查询字典
export function getDetailByCode(data) {
  return request({
    url: `/api/ops/dicApi/getDetailByCode/${data.dicCode}`,
    method: 'POST',
    data
  })
}

// 查询全部字典
export function queryOpsDictionariesDOListAll(data) {
  return request({
    url: '/api/ops/dicApi/queryOpsDictionariesDOListAll',
    method: 'POST',
    data
  })
}

// 刷新字典
export function refreshAll(data) {
  return request({
    url: '/api/ops/dicApi/refreshAll',
    method: 'POST',
    data
  })
}
