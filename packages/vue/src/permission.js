import router, { superRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { checkCorpStatusJump } from '@/utils/permission'
// import { mainRoutes, platformRoutes } from './router/temp'
import { authToMenu } from './router/menu-config/util'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = [
  '/login',
  '/register',
  '/forgetPwd',
  '/installSafety',
  '/bindSafety'
] // no redirect whitelist
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRole = store.getters.role && store.getters.role.length > 0
      if (hasRole) {
        next()
      } else {
        try {
          // get user info
          // note: role must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roleType, corpStatus, corpOrderStatus, agreementStatus, authDtoList } = await store.dispatch('user/getInfo')
          if (
            roleType !== 'SUPER' && roleType !== 'PLATFORM' &&
            location.href.indexOf('/account/corp-info') === -1
          ) {
            checkCorpStatusJump(corpStatus, corpOrderStatus)
          }
          if (roleType !== 'SUPER' && roleType !== 'PLATFORM' && corpStatus === 'VALID' && agreementStatus !== 'VALID' &&
          location.href.indexOf('/agreement') === -1) {
            window.location.href = '#/agreement'
            return
          }
          console.log('用户权限列表', authDtoList)
          // debugger
          // generate accessible routes map based on role
          // const accessRoutes = await store.dispatch(
          //   'permission/generateRoutes',
          //   [roleType]
          // )
          // dynamically add accessible routes
          if (roleType === 'SUPER') {
            router.addRoutes(superRouter)
            store.commit('permission/SET_ROUTES', superRouter)
          } else {
            const menus = authToMenu(authDtoList)
            // debugger
            store.commit('permission/SET_ROUTES', menus) // 将菜单处理到vuex给侧边栏menu组件使用
            menus.push({
              path: '*', redirect: '/404', hidden: true
            })
            router.addRoutes(menus)
          }

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
