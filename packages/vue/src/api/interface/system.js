import request from '@/utils/request'

// 获取权限，传参数则是查指定角色的（ PLATFORM，FUND..）
export const listAuth = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/listAuth',
    method: 'POST',
    data
  })
}

// 加载角色菜单列表树
export const roleAuthTreeData = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/roleAuthTreeData',
    method: 'POST',
    data
  })
}
// 菜单列表
export const list = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/list',
    method: 'POST',
    data
  })
}
// 父菜单列表
export const simplifyAuthList = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/simplifyAuthList',
    method: 'POST',
    data
  })
}
// 加载菜单
export const addAuth = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/addAuth',
    method: 'POST',
    data
  })
}
// 设置菜单
export const setAuth = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/setAuth',
    method: 'POST',
    data
  })
}

// 修改菜单
export const updAuth = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/updAuth',
    method: 'POST',
    data
  })
}
// 删除菜单
export const delAuth = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/delAuth/' + data,
    method: 'DELETE',
    data
  })
}
// 批量添加菜单
export const addAuthBatch = function (data = {}) {
  return request({
    url: '/api/ops/opsAuthApi/addAuthBatch',
    method: 'POST',
    data
  })
}
// 批量删除DELETE
export const delAuthBatch = function (data = '') {
  return request({
    url: '/api/ops/opsAuthApi/delAuthBatch/' + data,
    method: 'DELETE',
    data
  })
}
// 主流程ID列表
export const queryModelList = function (data = {}) {
  return request({
    url: '/api/ops/activiti/queryModelList',
    method: 'POST',
    data
  })
}
