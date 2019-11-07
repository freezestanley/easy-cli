import request from 'utils/request';

// 查询机构关系列表
export function getListApi({
  insureName,
  fundName,
  pageNum,
  pageSize,
}) {
  return request({
    url: '/OrgRelation/queryOrgRelationList',
    method: 'post',
    data: {
      insureName,
      fundName,
      pageNum,
      pageSize,
    }
  });
}

// 查询机构列表
export function getOrgListApi({
  orgType,
  orgName,
  status,
  pageNum,
  pageSize,
}) {
  return request({
    url: '/org/queryOrgList',
    method: 'post',
    data: {
      orgType,
      orgName,
      status,
      pageNum,
      pageSize,
    }
  });
}

// 创建机构关系
export function addApi({
  insureId,
  insureName,
  fundId,
  fundName,
}) {
  return request({
    url: '/OrgRelation/add',
    method: 'post',
    data: {
      insureId,
      insureName,
      fundId,
      fundName,
    }
  });
}

// 编辑机构关系
export function editApi({
  id,
  insureId,
  insureName,
  fundId,
  fundName,
}) {
  return request({
    url: '/OrgRelation/updateOrgRelation',
    method: 'post',
    data: {
      id,
      insureId,
      insureName,
      fundId,
      fundName,
    }
  });
}

export function enableApi(id) {
  return request({
    url: '/OrgRelation/enableOrgRelation',
    method: 'post',
    data: {
      id
    }
  });
}

export function disableApi(id) {
  return request({
    url: '/OrgRelation/disableOrgRelation',
    method: 'post',
    data: {
      id
    }
  });
}
