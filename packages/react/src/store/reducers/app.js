// import { getToken, setToken, removeToken, } from '@/utils/auth';
import { getToken, removeToken } from 'utils/auth';
import { ON_LOGIN, ON_LOGOUT, SET_USERINFO } from 'store/actionTypes/app';

const initState = {
  token: getToken(), // token
  userInfo: null, // 当前用户基本信息
  menus: [], // 当前用户所有已授权的菜单
};

const onLogin = (state, action) => {
  let newState = Object.assign({}, state, {
    token: action.token
  });
  return newState;
};

const onLogout = (state, action) => {
  removeToken();
  return Object.assign({}, state, {
    token: '',
    userInfo: null,
    menus: [],
  });
};

const setUserInfo = (state, { payload }) => {
  return Object.assign({}, state, {
    userInfo: payload.userInfo,
    menus: payload.menus,
  });
};

const reducerFn = (state = initState, action) => {
  if (action.type === ON_LOGIN) {
    return onLogin(state, action);
  } else if (action.type === ON_LOGOUT) {
    return onLogout(state, action);
  } else if (action.type === SET_USERINFO) {
    return setUserInfo(state, action);
  }
  return state;
};

export default reducerFn;
