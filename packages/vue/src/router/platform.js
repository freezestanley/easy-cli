// // 平台专属菜单
// import Layout from '@/layout'
// import SubLayout from '@/components/SubLayout'
// import { ROLE_TYPE_MAP } from '@/utils//constant/index'
// export const platformRoutes = [
//   {
//     path: '/corp-manage',
//     component: Layout,
//     meta: {
//       title: '企业管理',
//       icon: 'qiye',
//       roles: [ROLE_TYPE_MAP.PLATFORM]
//     },
//     children: [
//       {
//         path: 'invite-code',
//         name: 'invite-code',
//         component: () => import('@/views/platform/invite-code'),
//         meta: { title: '邀请码管理' }
//       },
//       {
//         path: 'corp-list',
//         name: 'corp-manage-corp-list',
//         component: () => import('@/views/platform/corp-list'),
//         meta: { title: '企业认证列表' }
//       },
//       {
//         path: 'add-corp',
//         name: 'corp-manage-add-corp',
//         component: () => import('@/views/platform/corp-list/add-corp'),
//         meta: { title: '添加企业' },
//         hidden: true
//       },
//       {
//         path: 'bank-card-check',
//         name: 'bank-card-check',
//         component: () => import('@/views/platform/bank-card-check'),
//         meta: { title: '对公账号审核' }
//       },
//       {
//         path: 'addCorpIncTrust',
//         name: 'addCorpIncTrust',
//         hidden: true,
//         component: () => import('@/views/platform/addCredit/index'),
//         meta: { title: '补充增信' },
//         props: route => ({
//           corpNo: route.query.corpNo,
//           corpName: route.query.corpName
//         })
//       },

//       {
//         path: 'updateCorpIncTrust',
//         name: 'updateCorpIncTrust',
//         hidden: true,
//         component: () => import('@/views/platform/addCredit/index'),
//         meta: { title: '编辑增信' },
//         props: route => ({
//           corpNo: route.query.corpNo,
//           corpName: route.query.corpName,
//           model: 'edit'
//         })
//       }
//     ]
//   },
//   {
//     path: '/business',
//     component: Layout,
//     // redirect: '/pbusiness/todo',
//     meta: {
//       title: '业务管理',
//       icon: 'yewu',
//       roles: [ROLE_TYPE_MAP.PLATFORM]
//     },
//     children: [
//       {
//         path: 'quota-manage',
//         name: 'quota-manage',
//         component: SubLayout,
//         meta: { title: '授信管理' },
//         children: [
//           {
//             path: 'push-quota',
//             name: 'push-quota',
//             component: () => import('@/views/platform/quota-manage/push-quota'),
//             meta: { title: '推送授信' }
//           },
//           {
//             path: 'quota-list',
//             name: 'quota-list',
//             component: () => import('@/views/platform/quota-manage/quota-list'),
//             meta: { title: '授信企业列表' }
//           },
//           {
//             path: 'quota-apply',
//             name: 'quota-apply',
//             component: () =>
//               import('@/views/platform/quota-manage/quota-apply'),
//             meta: { title: '授信申请' }
//           }
//         ]
//       },
//       {
//         path: 'issue-manage',
//         name: 'issue-manage',
//         component: () => import('@/views/platform/issue-manage/index'),
//         meta: { title: '签发管理' }
//       },
//       {
//         path: 'transfer-manage',
//         name: 'transfer-manage',
//         component: () => import('@/views/platform/transfer-manage'),
//         meta: { title: '转让管理' }
//       },
//       {
//         path: 'loan-manage',
//         name: 'loan-manage',
//         component: SubLayout,
//         meta: { title: '融资管理' },
//         children: [
//           {
//             path: 'index',
//             name: 'loan-manage-index',
//             component: () => import('@/views/platform/loan-manage/index'),
//             meta: { title: '融资列表' },
//           },
//           {
//             path: 'products',
//             name: 'loan-manage-products',
//             component: () => import('@/views/platform/loan-manage/products/index'),
//             meta: { title: '融资产品列表' }
//           },
//           {
//             path: 'config',
//             name: 'loan-manage-config',
//             component: () => import('@/views/platform/loan-manage/config/index'),
//             meta: { title: '融资服务费配置' }
//           },

//           {
//             path: 'fee',
//             name: 'loan-manage-fee',
//             component: () => import('@/views/platform/loan-manage/fee/index'),
//             meta: { title: '融资服务费管理' }
//           },
//           {
//             path: 'fee-detail/:id',
//             name: 'loan-manage-fee-detail',
//             hidden: true,
//             component: () => import('@/views/platform/loan-manage/fee/detail'),
//             meta: { title: '编辑抽成' }
//           },
//           {
//             path: 'check',
//             name: 'loan-manage-check',
//             props: route => ({
//               productNo: route.query.productNo,
//             }),
//             component: () => import('@/views/platform/loan-manage/check.vue'),
//             meta: { title: '融资审核' },
//             hidden: true
//           },
//         ]
//       },
//       {
//         path: 'repay-manage',
//         name: 'repay-manage',
//         component: () => import('@/views/platform/repay-manage'),
//         meta: { title: '还款管理' },
//         children: [
//           {
//             path: 'list',
//             name: 'repay-manage-list',
//             meta: { title: '还款管理' },
//             component: () => import('@/views/platform/repay-manage/list.vue'),
//           },
//           {
//             path: 'detail',
//             name: 'repay-manage-detail',
//             component: () => import('@/views/platform/repay-manage/detail.vue'),
//             meta: { title: '还款详情' },
//             hidden: true,
//             props: route => ({
//               repayPlanNo: route.query.repayPlanNo,
//             })
//           }
//         ]
//       },
//     ]
//   }
// ]
