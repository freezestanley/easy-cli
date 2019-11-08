// // 链属企业

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
// // 为了业务路径不重复 前面添加a做前缀
// export const attchedEntRoutes = [
//   {
//     path: '/abusiness',
//     component: Layout,
//     // redirect: '/abusiness/todo',
//     meta: {
//       title: '业务管理',
//       icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.CHAIN]
//     },
//     children: [
//       // {
//       //   path: 'todo',
//       //   name: 'index-page',
//       //   component: () => import('@/views/common/todo/index'),
//       //   meta: { title: '待办' }
//       // },
//       {
//         path: 'payassets',
//         name: PAY_ASSETS,
//         component: () => import('@/views/common/assets-register/index'),
//         meta: { title: '资产登记' }
//       },
//       {
//         path: 'account',
//         name: 'account-manage',
//         component: () => import('@/views/chain/account-manage/index'),
//         meta: { title: '云信证账户管理' }
//       },
//       {
//         path: 'issue',
//         name: 'issue-manage',
//         component: () => import('@/views/chain/issue-manage/index'),
//         meta: { title: '签发管理' }
//       },
//       {
//         path: 'transfer',
//         redirect: '/chain/transfer-manage',
//         component: () => import('@/views/chain/transfer-manage/index'),
//         meta: { title: '转让管理' },
//         children: [
//           {
//             path: 'transfer-list',
//             name: 'transfer-list',
//             component: () =>
//               import('@/views/chain/transfer-manage/transfer-list'),
//             meta: { title: '转让列表' }
//           },
//           {
//             path: 'transfer-apply',
//             name: 'transfer-apply',
//             component: () =>
//               import('@/views/chain/transfer-manage/transfer-apply'),
//             meta: { title: '申请管理' }
//           }
//         ]
//       },
//       {
//         path: 'rechecksign',
//         name: 'rechecksign',
//         hidden: true,
//         component: () => import('@/views/chain/issue-manage/index'),
//         meta: { title: '申请签发' }
//       },
//       {
//         path: 'loan-manage',
//         name: 'loan-manage',
//         component: () => import('@/views/chain/loan-manage/index'),
//         meta: { title: '融资管理' }
//       },
//       {
//         path: 'receipt',
//         name: 'receipt',
//         component: () => import('@/views/chain/receipt-manage/index'),
//         meta: { title: '收款管理' },
//         redirect: '/abusiness/receipt/list',
//         children: [
//           {
//             path: 'list',
//             name: 'repaymentList',
//             meta: { title: '收款管理' },
//             component: () => import('@/views/chain/receipt-manage/list.vue'),
//           },
//           {
//             path: 'detail',
//             name: 'repaymentDetail',
//             component: () => import('@/views/chain/receipt-manage/detail.vue'),
//             meta: { title: '收款详情' },
//             hidden: true,
//             props: route => ({
//               repayPlanNo: route.query.repayPlanNo,
//               collectionCorpNo: route.query.collectionCorpNo,
//               tokenNo: route.query.tokenNo,
//             })
//           }
//         ]
//       },
//       {
//         path: 'repayment',
//         name: 'repayment',
//         component: () => import('@/views/chain/repay-manage/index'),
//         meta: { title: '还款管理' },
//         redirect: '/abusiness/repayment/list',
//         children: [
//           {
//             path: 'list',
//             name: 'repaymentList',
//             meta: { title: '还款管理' },
//             component: () => import('@/views/chain/repay-manage/list.vue'),
//           },
//           {
//             path: 'detail',
//             name: 'repaymentDetail',
//             component: () => import('@/views/chain/repay-manage/detail.vue'),
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
//         meta: { title: '新增应付资产' }
//       },
//       {
//         path: 'collectadd',
//         name: COLLECT_ADD,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/add/index'),
//         meta: { title: '新增应收资产' }
//       },
//       {
//         path: 'payedit',
//         name: PAY_EDIT,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/edit/index'),
//         meta: { title: '编辑应付资产' }
//       },
//       {
//         path: 'collectedit',
//         name: COLLECT_EDIT,
//         hidden: true,
//         component: () => import('@/views/common/assets-register/edit/index'),
//         meta: { title: '编辑应收资产' }
//       },
//       {
//         path: 'payexamine',
//         name: 'payexamine',
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
//       },
//       {
//         path: 'add',
//         name: 'add',
//         hidden: true,
//         component: () =>
//           import('@/views/chain/loan-manage/add'),
//         meta: { title: '新增融资' }
//       }
//     ]
//   }
// ]
