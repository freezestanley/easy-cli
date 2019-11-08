import request from 'utils/request';

// 查询系统内所有角色
export function getListApi({
  name,
  pageNum,
  pageSize,
}) {
  return request({
    url: '/api/role/query',
    method: 'post',
    data: {
      name,
      pageNum,
      pageSize,
    }
  });
}

// 添加角色
export function addRoleApi({
  name,
  orgType,
  remarks,
  menuIds,
}) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data: {
      name,
      orgType,
      remarks,
      menuIds,
    }
  });
}

// 编辑角色
export function updateRoleApi({
  id,
  name,
  remarks,
  menuIds,
}) {
  return request({
    url: '/api/role/update',
    method: 'post',
    data: {
      id,
      name,
      remarks,
      menuIds,
    }
  });
}

// 删除角色
export function deleteRoleApi(id) {
  return request({
    url: '/api/role/delete',
    method: 'post',
    data: {
      id,
    }
  });
}

// 获取权限 treeData
export function getMenuTreeApi() {
  return request({
    url: '/api/role/queryMenuTree',
    method: 'post',
  });
}
