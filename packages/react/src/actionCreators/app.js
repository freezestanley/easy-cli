import { loginApi, getUserInfoApi, logoutApi } from 'api/login.js';
import { ON_LOGIN, ON_LOGOUT, SET_USERINFO } from 'store/actionTypes/app';
import { setToken } from 'utils/auth';

export const loginAction = (params) => {
  return (dispatch) => {
    return loginApi(params).then(data => {
      const token = data.data.token;
      dispatch({
        type: ON_LOGIN,
        token: token,
      });
      setToken(token);
    });
  };
};

export const getUserInfoAction = () => {
  return (dispatch) => {
    return getUserInfoApi().then(data => {
      dispatch({
        type: SET_USERINFO,
        payload: data.data,
      });
    });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    return logoutApi().then(() => {
      dispatch({
        type: ON_LOGOUT,
      });
    });
  };
};
