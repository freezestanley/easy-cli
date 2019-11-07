import requset from 'utils/request';

export function loginApi({ loginName, loginPwd }) {
  return requset({
    url: '/api/user/login',
    method: 'post',
    data: {
      loginName,
      loginPwd
    }
  });
}

export function getUserInfoApi() {
  return requset({
    url: '/api/role/queryUserInfoAndMenu',
    method: 'post',
  });
}

export function logoutApi() {
  return requset({
    url: '/api/user/logout',
    method: 'post',
  });
}
