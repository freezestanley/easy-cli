import Vue from 'vue'
import Router from 'vue-router'
// import { commonRoutes } from './common'
// import { funderRoutes } from './funder'
// import { coreRoutes } from './core'
// import { attchedEntRoutes } from './chain'
// import { platformRoutes } from './platform'
// import { ROLE_TYPE_MAP } from '../utils/constant/index'
// const _import = require('./import-development')
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
// import SubLayout from '@/components/SubLayout'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/common/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/common/register/index'),
    hidden: true
  },
  {
    path: '/forgetPwd',
    component: () => import('@/views/common/login/forgetPwd'),
    hidden: true
  },
  {
    path: '/agreement',
    component: () => import('@/views/common/login/agreement'),
    hidden: true
  },
  {
    path: '/installSafety',
    component: () => import('@/views/common/login/installSafety'),
    hidden: true
  },
  {
    path: '/bindSafety',
    component: () => import('@/views/common/register/bindSafety'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/common/error-page/404'),
    hidden: true
  },

]
// 超级管理员独有菜单
export const superRouter = [
  {
    path: '/',
    component: Layout,
    name: 'system-manage',
    redirect: 'system/batch',
    meta: { title: '系统管理', icon: 'yewu' },
    children: [
      {
        path: 'system/batch',
        name: 'batch',
        component: () => import('@/views/common/system/batch'),
        meta: { title: '生成菜单' },
      },
      {
        path: 'system/menu',
        name: 'menu',
        component: () => import('@/views/common/system/menu'),
        meta: { title: '菜单配置' },
      },
      {
        path: 'system/index',
        name: 'index-page',
        component: () => import('@/views/common/system/index'),
        meta: { title: '权限配置' },
      },
      {
        path: 'system/flow',
        name: 'flow',
        component: () => import('@/views/common/system/flow'),
        meta: { title: '主流程配置' },
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
/**
 * asyncRoutes 异步加载的路由
 * 为了避免每次开发冲突，将各个模块菜单分文件配置
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [
//   {
//     path: '/',
//     name: 'index-page',
//     redirect: 'todo',
//     component: Layout,
//     meta: { title: '待办事项', icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.FUND, ROLE_TYPE_MAP.CORE, ROLE_TYPE_MAP.CHAIN, ROLE_TYPE_MAP.PLATFORM]
//     },
//     children: [
//       {
//         path: 'todo',
//         name: 'index-page',
//         component: () => import('@/views/common/todo/index'),
//         meta: { title: '待办事项', icon: 'yewu' }
//       },
//     ]
//   },
//   ...superRouter,
//   ...funderRoutes,
//   ...coreRoutes,
//   ...attchedEntRoutes,
//   ...platformRoutes,
//   ...commonRoutes,
//   {
//     path: '/browser',
//     component: Layout,
//     meta: {
//       title: '链浏览器',
//       icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.FUND, ROLE_TYPE_MAP.CORE, ROLE_TYPE_MAP.CHAIN, ROLE_TYPE_MAP.PLATFORM]
//     },
//     children: [
//       {
//         path: 'index',
//         name: 'browser',
//         component: () => import('@/views/common/browser'),
//         meta: { title: '链浏览器', icon: 'chain' },
//       }
//     ]
//   },
//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }

//   // 以下是配置项demo
//   // {
//   //   path: '/example',  父菜单路径
//   //   component: Layout,
//   //   redirect: '/example/table', // 默认到第一个子菜单
//   //   name: 'Example',
//   //   meta: { title: 'Example', icon: 'example', roles: ['platfrom'] }, // title: 菜单标题， icon， roles: 表示哪个角色可以访问
//   //   children: [
//   //     {
//   //       path: 'table',
//   //       name: 'Table',
//   //       component: () => import('@/views/table/index'),
//   //       meta: { title: 'Table', icon: 'table' }
//   //     }
//   //   ]
//   // },

//   // {
//   //   path: '/form',
//   //   component: Layout,
//   //   children: [
//   //     {
//   //       path: 'index',
//   //       name: 'Form',
//   //       component: () => import('@/views/form/index'),
//   //       meta: { title: 'Form', icon: 'form' }
//   //     }
//   //   ]
//   // },
// ]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    isAddedDynamicRoute: false
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
