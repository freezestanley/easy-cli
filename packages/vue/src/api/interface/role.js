import request from '@/utils/request'

// 新增角色
export function addRole(data) {
  return request({
    url: '/api/ops/opsRoleApi/addRole',
    method: 'POST',
    data
  })
}

// 新增角色用户
export function addRoleUser(data) {
  return request({
    url: '/api/ops/opsRoleApi/addRoleUser',
    method: 'POST',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/api/ops/opsRoleApi/deleteRole',
    method: 'POST',
    data
  })
}

// 删除角色用户
export function deleteRoleUser(data) {
  return request({
    url: '/api/ops/opsRoleApi/deleteRoleUser',
    method: 'POST',
    data
  })
}

// 修改角色
export function modifyRole(data) {
  return request({
    url: '/api/ops/opsRoleApi/modifyRole',
    method: 'POST',
    data
  })
}

// 禁用/启动角色
export function modifyRoleStatus(data) {
  return request({
    url: '/api/ops/opsRoleApi/modifyRoleStatus',
    method: 'POST',
    data
  })
}

// 查询系统角色列表
export function queryRoleList(data) {
  return request({
    url: '/api/ops/opsRoleApi/queryRoleList',
    method: 'POST',
    data
  })
}
