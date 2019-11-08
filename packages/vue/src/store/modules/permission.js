import { constantRoutes } from '@/router'
// import { asyncRoutes } from '@/router'
// import Layout from '@/layout'
// import Todo from '@/views/common/todo'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}
// const RoleMap = {
//   FUND: '/fbusiness',
//   PLATFORM: '/pbusiness',
//   CORE: '/cbusiness',
//   CHAIN: '/abusiness',
//   SUPER: '/system/index',
// }

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  setMenu({ commit }, menus) {
    commit('SET_ROUTES', menus)
  },
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // let accessedRoutes
      // if (roles.includes('PLATFORM')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
      // const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // 添加统一的todo首页
      // accessedRoutes.unshift({
      //   path: '/',
      //   // component: Layout,
      //   hidden: true,
      //   redirect: '/todo', // RoleMap[roles[0]],
      //   // children: [
      //   //   {
      //   //     path: 'todo',
      //   //     name: 'todo',
      //   //     component: Todo,
      //   //     meta: { title: '待办', icon: 'dashboard' }
      //   //   }
      //   // ]
      // })
      // commit('SET_ROUTES', accessedRoutes)
      // resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
