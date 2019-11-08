import { getToken, setToken, removeToken, getLoginName, setLoginName, removeLoginName } from '@/utils/auth'
import { resetRouter } from '@/router'
import { UserApi, CommonApi } from '@/api/'
// import { ROLE_TYPE_MAP } from '@/utils/constant/index'
// function _transformDict(dictList = []) {
//   const map = _listToMap(dictList)
//   const keys = Object.keys(map) // 所有的业务类型
//   const roles = Object.keys(ROLE_TYPE_MAP) // 所有的角色
//   const dictsByRole = {}
//   roles.forEach((role) => {
//     dictsByRole[role] = {}
//     keys.forEach(key => {
//       dictsByRole[role][key] = map[key].filter((dict) => dict.corpType === role || dict.corpType === 'ALL')
//     })
//   })
//   return dictsByRole
// }

// function _listToMap(list, key) {
//   const map = {}
//   list.forEach(item => {
//     if (!map[item.flowType]) {
//       map[item.flowType] = []
//     }
//     map[item.flowType].push(item)
//   })
//   return map
// }
// function _authObjectToArr(arr) {
//   const result = []
//   arr.forEach(item => {
//     if (item.authNo) {
//       result.push(item.authNo)
//     }
//   })
//   return result
// }

const state = {
  token: getToken(),
  userInfo: {
    loginName: '',
    email: 'abc@zhongan.io',
  },
  loginName: getLoginName(),
  name: '',
  role: '', // platform：平台  fund：资金方   core：核心  chian: 链属
  email: '',
  messageCount: 0,
  currentDict: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGINNAME: (state, loginName) => {
    state.loginName = loginName
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_EMAIL: (state, userInfo) => {
    state.email = userInfo
  },
  SET_MSG_COUNT: (state, count) => {
    state.messageCount = count
  },
  SET_DICT: (state, dict) => {
    state.currentDict = dict
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      UserApi.login(userInfo).then(({ data }) => {
        commit('SET_LOGINNAME', userInfo.loginName)
        commit('SET_TOKEN', data.token || data)
        setLoginName(userInfo.loginName)
        setToken(data.token || data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      UserApi.queryCorpOperDetail(state.loginName || getLoginName()).then(({ data }) => {
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { roleType, roleName, email, messageCount = 0 } = data
        // role must be a non-empty array
        if (!roleType) {
          reject('用户角色异常')
        }
        // 处理按钮权限
        // data.authDtoList = _authObjectToArr(authDtoList || [])
        commit('SET_USERINFO', data)
        commit('SET_EMAIL', email)
        commit('SET_ROLE', roleType)
        commit('SET_NAME', roleName)
        commit('SET_MSG_COUNT', +messageCount)
        dispatch('getDicts')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDicts({ commit }) {
    return new Promise((resolve, reject) => {
      CommonApi.getAllBizStatus({}).then(({ data }) => {
        commit('SET_DICT', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register({ commit }, formInfo) {
    return new Promise((resolve, reject) => {
      UserApi.register(formInfo).then(() => {
        commit('SET_EMAIL', formInfo.email)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      UserApi.logout(state).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLE', [])
        commit('SET_DICT', {})
        removeToken()
        removeLoginName()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', [])
      commit('SET_DICT', {})
      removeToken()
      removeLoginName()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

