// import Layout from '@/layout'
// import { ROLE_TYPE_MAP } from '../utils//constant/index'

// // 企业账户管理公共菜单
// export const commonRoutes = [
//   {
//     path: '/account',
//     component: Layout,
//     redirect: '/account/corp-info',
//     meta: {
//       title: '账户管理',
//       icon: 'user',
//       roles: [ROLE_TYPE_MAP.FUND, ROLE_TYPE_MAP.CORE, ROLE_TYPE_MAP.CHAIN]
//     },
//     children: [
//       {
//         path: 'corp-info',
//         name: 'corp-info',
//         component: () => import('@/views/common/corp-info/index'),
//         meta: { title: '企业信息' }
//       },
//       {
//         path: 'security',
//         name: 'security',
//         component: () => import('@/views/common/security/index'),
//         meta: { title: '安全管理' }
//       },
//       {
//         path: 'bank-card',
//         name: 'bank-card',
//         component: () => import('@/views/common/bank-card/index'),
//         meta: { title: '对公账号管理' }
//       },
//       {
//         path: 'role-manage',
//         name: 'role-manage',
//         component: () => import('@/views/common/role-manage/index'),
//         meta: { title: '角色管理' }
//       },
//       {
//         path: 'user-list',
//         name: 'user-list',
//         component: () => import('@/views/common/user-list/index'),
//         meta: { title: '用户管理' }
//       },
//       {
//         path: 'ukey',
//         name: 'ukey',
//         component: () => import('@/views/common/ukey/index'),
//         meta: { title: 'Ukey管理' }
//       },
//       {
//         path: 'message',
//         name: 'message',
//         component: () => import('@/views/common/message/index'),
//         hidden: true,
//         meta: { title: '消息中心' }
//       },
//       {
//         path: 'flow-template',
//         name: 'flow-template',
//         component: () => import('@/views/common/flow-template/index'),
//         meta: { title: '审批流配置' }
//       },
//     ]
//   },
//   {
//     path: '/paccount',
//     component: Layout,
//     redirect: '/paccount/role-manage',
//     meta: { title: '账户管理', icon: 'user', roles: [ROLE_TYPE_MAP.PLATFORM] },
//     children: [
//       {
//         path: 'security',
//         name: 'security',
//         component: () => import('@/views/common/security/index'),
//         meta: { title: '安全管理' }
//       },
//       {
//         path: 'role-manage',
//         name: 'role-manage',
//         component: () => import('@/views/common/role-manage/index'),
//         meta: { title: '角色管理' }
//       },
//       {
//         path: 'user-list',
//         name: 'user-list',
//         component: () => import('@/views/common/user-list/index'),
//         meta: { title: '用户管理' }
//       },
//       {
//         path: 'messageManage',
//         name: 'messageManage',
//         component: () => import('@/views/platform/message/index'),
//         meta: { title: '消息管理' }
//       },
//       {
//         path: 'message',
//         name: 'message',
//         component: () => import('@/views/common/message/index'),
//         hidden: true,
//         meta: { title: '消息中心' }
//       },
//       {
//         path: 'flow-template',
//         name: 'flow-template',
//         component: () => import('@/views/common/flow-template/index'),
//         meta: { title: '审批流配置' }
//       },
//     ]
//   },
//   {
//     path: '/common',
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: 'corpDetail',
//         name: 'corpDetail',
//         hidden: true,
//         component: () => import('@/views/common/corp-detail/index'),
//         meta: { title: '企业信息' },
//         props: route => ({
//           corpNo: route.query.corpNo,
//           transNo: route.query.transNo,
//         })
//       },
//       {
//         path: 'payexamine',
//         name: 'payexamine',
//         hidden: true,
//         component: () => import('@/views/common/assets-register/examine/index'),
//         meta: { title: '应付资产详情' }
//       },
//       {
//         path: 'colletexamine',
//         name: 'colletexamine',
//         hidden: true,
//         component: () => import('@/views/common/assets-register/examine/index'),
//         meta: { title: '应收资产详情' }
//       },
//     ]
//   }
// ]

// // // 平台账户管理菜单
// // export const platRoutes = [
// //   {
// //     path: '/common',
// //     component: Layout,
// //     redirect: '/common/account',
// //     meta: { title: '账户管理', icon: 'user', roles: ['platform'] },
// //     children: [{
// //       path: 'account',
// //       name: 'account',
// //       component: () => import('@/views/common/account/index'),
// //       meta: { title: '账号权限管理', icon: 'user' }
// //     }, {
// //       path: 'security',
// //       name: 'security',
// //       component: () => import('@/views/common/security/index'),
// //       meta: { title: '安全管理', icon: 'dashboard' }
// //     }]
// //   }
// // ]
