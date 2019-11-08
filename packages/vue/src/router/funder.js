// // 资金方菜单
// import Layout from '@/layout'
// import SubLayout from '@/components/SubLayout'
// import { ROLE_TYPE_MAP } from '@/utils/constant/index'
// // 为了业务路径不重复 前面添加f做前缀 business => fbusiness
// export const funderRoutes = [
//   {
//     path: '/fbusiness',
//     component: Layout,
//     // redirect: '/fbusiness/todo',
//     meta: {
//       title: '业务管理',
//       icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.FUND]
//     },
//     children: [
//       // {
//       //   path: 'todo',
//       //   name: 'index-page',
//       //   component: () => import('@/views/common/todo/index'),
//       //   meta: { title: '待办' }
//       // },
//       {
//         path: 'account',
//         name: 'account-manage',
//         component: () => import('@/views/funder/account-manage/index'),
//         meta: { title: '云信证账户管理' }
//       },
//       {
//         // 其他菜单照着写
//         path: '/quota',
//         name: 'quota-manage',
//         component: SubLayout,
//         meta: { title: '授信管理' },
//         children: [
//           {
//             path: 'wait-list',
//             name: 'wait-list',
//             component: () =>
//               import('@/views/funder/quota-manage/wait-quota-list'),
//             meta: { title: '待授信' }
//           },
//           {
//             path: 'corp-list',
//             name: 'corp-list',
//             component: () =>
//               import('@/views/funder/quota-manage/quota-corp-list'),
//             meta: { title: '授信企业列表' }
//           },
//           {
//             path: 'apply-list',
//             name: 'apply-list',
//             component: () =>
//               import('@/views/funder/quota-manage/quota-apply-list'),
//             meta: { title: '授信申请' }
//           }
//         ]
//       },
//       {
//         path: 'loan-manage',
//         name: 'loan-manage',
//         component: SubLayout,
//         meta: { title: '融资管理' },
//         children: [
//           {
//             path: 'list',
//             name: 'loan-manage-list',
//             component: () => import('@/views/funder/loan-manage/index'),
//             meta: { title: '融资管理' }
//           },
//           {
//             path: 'product-list',
//             name: 'loan-product',
//             component: () => import('@/views/funder/loan-manage/loan-product/index'),
//             meta: { title: '融资产品列表' }
//           },
//           {
//             path: 'product-add',
//             name: 'loan-product-add',
//             hidden: true,
//             component: () => import('@/views/funder/loan-manage/loan-product/add-product'),
//             meta: { title: '新增产品' }
//           },
//           {
//             path: 'product-edit',
//             name: 'loan-product-edit',
//             hidden: true,
//             component: () => import('@/views/funder/loan-manage/loan-product/edit-product'),
//             meta: { title: '编辑产品' }
//           },
//         ]
//       },
//       {
//         path: 'receipt',
//         name: 'receipt',
//         component: () => import('@/views/funder/receipt-manage/'),
//         meta: { title: '收款管理' },
//         redirect: '/fbusiness/receipt/list',
//         children: [
//           {
//             path: 'list',
//             name: 'repaymentList',
//             meta: { title: '收款管理' },
//             component: () => import('@/views/funder/receipt-manage/list'),
//           },
//           {
//             path: 'detail',
//             name: 'repaymentDetail',
//             component: () => import('@/views/funder/receipt-manage/detail'),
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
//     ]
//   }
// ]
