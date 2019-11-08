// // 核心企业

// /* Layout */
// import Layout from '@/layout'
// import {
//   PAY_ASSETS,
//   PAY_ADD,
//   COLLECT_ADD,
//   PAY_EDIT,
//   COLLECT_EDIT,
//   ROLE_TYPE_MAP
// } from '@/utils/constant/index'

// // 为了业务路径不重复 前面添加c做前缀
// export const coreRoutes = [
//   {
//     path: '/cbusiness',
//     component: Layout,
//     meta: {
//       title: '业务管理',
//       icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.CORE]
//     },
//     children: [
//       {
//         path: 'payassets',
//         name: PAY_ASSETS,
//         component: () => import('@/views/common/assets-register/index'),
//         meta: { title: '资产登记' }
//       },
//       {
//         path: 'account',
//         name: 'account-manage',
//         component: () => import('@/views/core/account-manage/index'),
//         meta: { title: '云信证账户管理' }
//       },
//       {
//         path: 'quota',
//         redirect: '/quota/quota-manage',
//         component: () => import('@/views/core/quota-manage/index'),
//         meta: { title: '授信管理' },
//         children: [
//           {
//             path: 'quota-manage',
//             name: 'quota-manage',
//             component: () =>
//               import('@/views/core/quota-manage/quota-manage'),
//             meta: { title: '授信管理' }
//           },
//         ]
//       },
//       {
//         path: 'issue',
//         name: 'issue-manage',
//         component: () => import('@/views/core/issue-manage/index'),
//         meta: { title: '签发管理' }
//       },
//       {
//         path: 'new-issue',
//         name: 'new-issue',
//         hidden: true,
//         component: () => import('@/views/core/issue-manage/new-issue'),
//         meta: { title: '新增签发' }
//       },
//       {
//         path: 'apply-issue',
//         name: 'apply-issue',
//         hidden: true,
//         params: {
//           transNo: '',
//           assetName: '',
//           balAmt: '',
//           corpName: ''
//         },
//         component: () => import('@/views/core/issue-manage/new-issue'),
//         meta: { title: '签发' }
//       },
//       {
//         path: 'repayment',
//         name: 'repayment',
//         component: () => import('@/views/core/repay-manage/index'),
//         meta: { title: '还款管理' },
//         redirect: '/cbusiness/repayment/list',
//         children: [
//           {
//             path: 'list',
//             name: 'repaymentList',
//             meta: { title: '还款管理' },
//             component: () => import('@/views/core/repay-manage/list.vue'),
//           },
//           {
//             path: 'detail',
//             name: 'repaymentDetail',
//             component: () =>
//               import('@/views/core/repay-manage/detail.vue'),
//             meta: { title: '还款详情' },
//             hidden: true,
//             props: route => ({
//               repayPlanNo: route.query.repayPlanNo,
//               repayCorpNo: route.query.repayCorpNo,
//               tokenNo: route.query.tokenNo,
//             })
//           }
//         ]
//       },
//       // 隐藏路由
//       {
//         path: 'payadd',
//         name: PAY_ADD,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/add/index'),
//         meta: { title: '新增应付' }
//       },
//       {
//         path: 'collectadd',
//         name: COLLECT_ADD,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/add/index'),
//         meta: { title: '新增应收' }
//       },
//       {
//         path: 'payedit',
//         name: PAY_EDIT,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/edit/index'),
//         meta: { title: '编辑应付' }
//       },
//       {
//         path: 'collectedit',
//         name: COLLECT_EDIT,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/edit/index'),
//         meta: { title: '编辑应收' }
//       },
//       {
//         path: 'payexamine',
//         name: 'cpayexamine',
//         hidden: true,
//         component: () => import('@/views/common/assets-register/examine/index'),
//         meta: { title: '应付资产详情' }
//       },
//       {
//         path: 'collectexamine',
//         name: 'collectexamine',
//         hidden: true,
//         component: () => import('@/views/common/assets-register/examine/index'),
//         meta: { title: '应收资产详情' }
//       }
//       // 这里继续加菜单
//     ]
//   }
// ]
