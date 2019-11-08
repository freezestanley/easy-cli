import request from 'utils/request';

// 查询机构列表
export function getListApi({
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

// 创建机构
export function createOrgApi({
  orgType,
  // orgCode,
  orgName,
  creditCode,
  legalName,
  legalIdCard,
  legalPhone,
  contectName,
  contectPhone,
  contectMail,
  loginName,
  otherDesc,
}) {
  return request({
    url: '/org/createOrgInfo',
    method: 'post',
    data: {
      orgType,
      // orgCode,s
      orgName,
      creditCode,
      legalName,
      legalIdCard,
      legalPhone,
      contectName,
      contectPhone,
      contectMail,
      loginName,
      otherDesc,
    }
  });
}

// 更新机构
export function updateOrgApi({
  id,
  orgType,
  // orgCode,
  orgName,
  creditCode,
  legalName,
  legalIdCard,
  legalPhone,
  contectName,
  contectPhone,
  contectMail,
  loginName,
  otherDesc,
}) {
  return request({
    url: '/org/updateOrg',
    method: 'post',
    data: {
      id,
      orgType,
      // orgCode,s
      orgName,
      creditCode,
      legalName,
      legalIdCard,
      legalPhone,
      contectName,
      contectPhone,
      contectMail,
      loginName,
      otherDesc,
    }
  });
}

export function enableApi(id) {
  return request({
    url: '/org/enableOrg',
    method: 'post',
    data: {
      id
    }
  });
}

export function disableApi(id) {
  return request({
    url: '/org/disableOrg',
    method: 'post',
    data: {
      id
    }
  });
}
