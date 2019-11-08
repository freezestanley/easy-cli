// 资金方专属菜单
import { PROJECT_TOKEN_NAME as TOKEN__NAME } from '@/utils/constant/index'
const pre = 'FUND'

export default [
  {
    authNo: pre + '_index',
    path: '/',
    name: 'index-page',
    redirect: 'todo',
    component: 'Layout',
    meta: { title: '待办事项', icon: 'yewu' },
    type: 'CATA',
    children: [
      {
        authNo: '_todo',
        path: 'todo',
        name: 'index-page-todo',
        component: 'common/todo/index',
        meta: { title: '待办事项', icon: 'yewu' }
      },
    ]
  },
  {
    authNo: pre + '_business',
    path: '/business',
    component: 'Layout',
    meta: {
      title: '业务管理',
      icon: 'yewu',
    },
    type: 'CATA',
    children: [
      {
        authNo: '_flow-template',
        path: 'flow-template',
        name: 'flow-template',
        component: 'common/flow-template/index',
        meta: { title: '审批流配置' }
      },
      {
        authNo: '_account-manage',
        path: 'account-manage',
        name: 'account-manage',
        component: 'funder/account-manage/index',
        meta: { title: TOKEN__NAME + '账户管理' }
      },
      {
        authNo: '_quota',
        path: '/quota',
        name: 'quota-manage',
        component: 'SubLayout',
        meta: { title: '授信管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_wait-list',
            path: 'wait-list',
            name: 'wait-list',
            component: 'funder/quota-manage/wait-quota-list',
            meta: { title: '待授信' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-manage__look'
              },
              {
                authNo: '_wait-list_check',
                authName: '审核',
                type: 'BUTTON',
                perms: 'quota-manage__wait-list_check'
              }
            ]
          },
          {
            authNo: '_corp-list',
            path: 'corp-list',
            name: 'corp-list',
            component: 'funder/quota-manage/quota-corp-list',
            meta: { title: '授信企业列表' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-manage__look'
              },
              {
                authNo: '_corp-list_modify',
                authName: '调整授信',
                type: 'BUTTON',
                perms: 'quota-manage__corp-list_modify'
              }
            ]
          },
          {
            authNo: '_apply-list',
            path: 'apply-list',
            name: 'apply-list',
            component: 'funder/quota-manage/quota-apply-list',
            meta: { title: '授信申请' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-apply-list__look'
              },
              {
                authNo: '_apply-list_check',
                authName: '审核',
                type: 'BUTTON',
                perms: 'quota-manage__apply-list_check'
              }
            ]
          }
        ]
      },
      {
        authNo: '_loan-manage',
        path: 'loan-manage',
        name: 'loan-manage',
        component: 'SubLayout',
        meta: { title: '融资管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'loan-manage-list',
            component: 'funder/loan-manage/index',
            meta: { title: '融资管理' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'loan-manage-list__look'
              },
              {
                authNo: '_check',
                authName: '审核',
                type: 'BUTTON',
                perms: 'loan-manage-list__check'
              },
              {
                authNo: '_sign',
                authName: '签约',
                type: 'BUTTON',
                perms: 'loan-manage-list__sign'
              },
              {
                authNo: '_sure',
                authName: '确认已放款',
                type: 'BUTTON',
                perms: 'loan-manage-list__sure'
              }
            ]
          },
          {
            authNo: '_product-list',
            path: 'product-list',
            name: 'loan-product',
            component: 'funder/loan-manage/loan-product/index',
            meta: { title: '融资产品列表' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'loan-product__look'
              },
              {
                authNo: '_add',
                authName: '新增',
                type: 'BUTTON',
                perms: 'loan-product__add'
              },
              {
                authNo: '_edit',
                authName: '编辑',
                type: 'BUTTON',
                perms: 'loan-product__edit'
              }
            ]
          },
          {
            authNo: '_product-add',
            path: 'product-add',
            name: 'loan-product-add',
            hidden: true,
            component: 'funder/loan-manage/loan-product/add-product',
            meta: { title: '新增产品' }
          },
          {
            authNo: '_product-edit',
            path: 'product-edit',
            name: 'loan-product-edit',
            hidden: true,
            component: 'funder/loan-manage/loan-product/edit-product',
            meta: { title: '编辑产品' }
          },
        ]
      },
      {
        authNo: '_receipt',
        path: 'receipt',
        name: 'receipt',
        component: 'SubLayout',
        meta: { title: '收款管理' },
        redirect: '/business/receipt/list',
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'receipt-manage-list',
            meta: { title: '收款管理' },
            component: 'funder/receipt-manage/list',
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'receipt-manage-list__look'
              },
              {
                authNo: '_view',
                authName: '查看收款',
                type: 'BUTTON',
                perms: 'receipt-manage-list__view'
              },
              {
                authNo: '_contract',
                authName: '查看合约',
                type: 'BUTTON',
                perms: 'receipt-manage-list__contract'
              },
            ],
          },
          {
            authNo: '_detail',
            path: 'detail',
            name: 'receipt-manage-detail',
            component: 'funder/receipt-manage/detail',
            meta: { title: '收款详情' },
            hidden: true,
            props: route => ({
              repayPlanNo: route.query.repayPlanNo,
              collectionCorpNo: route.query.collectionCorpNo,
              tokenNo: route.query.tokenNo,
            }),
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'receipt-manage__look'
              },
              {
                authNo: '_accept',
                authName: '收款确认',
                type: 'BUTTON',
                perms: 'receipt-manage__accept'
              },
              {
                authNo: '_reject',
                authName: '收款拒绝',
                type: 'BUTTON',
                perms: 'receipt-manage__reject'
              },
            ]
          }
        ]
      },
    ]
  },
  {
    authNo: pre + '_account',
    path: '/account',
    component: 'Layout',
    meta: { title: '账户管理', icon: 'user' },
    type: 'CATA',
    children: [
      {
        authNo: '_corp-info',
        path: 'corp-info',
        name: 'account-corp-info',
        component: 'common/corp-info/index',
        meta: { title: '企业信息' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'corp-info__look'
          },
          {
            authNo: '_edit',
            authName: '编辑按钮',
            type: 'BUTTON',
            perms: 'account-corp-info__edit'
          },
          {
            authNo: '_add',
            authName: '添加按钮',
            type: 'BUTTON',
            perms: 'account-corp-info__add'
          },
        ]
      },
      {
        authNo: '_bank-card',
        path: 'bank-card',
        name: 'bank-card',
        component: 'common/bank-card/index',
        meta: { title: '对公账号管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'bank-card__look'
          },
          {
            authNo: '_check',
            authName: '操作按钮', // 增删改用一个
            type: 'BUTTON',
            perms: 'bank-card__opt'
          }
        ]
      },
      {
        authNo: '_security',
        path: 'security',
        name: 'security',
        component: 'common/security/index',
        meta: { title: '安全管理' }
      },
      {
        authNo: '_role',
        path: 'role',
        name: 'role',
        component: 'common/role-manage/index',
        meta: { title: '角色管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'role-manage__look'
          },
          {
            authNo: '_check',
            authName: '新增按钮',
            type: 'BUTTON',
            perms: 'role__check'
          },
          {
            authNo: '_modify',
            authName: '编辑按钮',
            type: 'BUTTON',
            perms: 'role__modify'
          },
          {
            authNo: '_delete',
            authName: '删除按钮',
            type: 'BUTTON',
            perms: 'role__delete'
          },
        ]
      },
      {
        authNo: '_user-list',
        path: 'user-list',
        name: 'user-list',
        component: 'common/user-list/index',
        meta: { title: '用户管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'user-list__look'
          },
          {
            authNo: '_check',
            authName: '新增按钮',
            type: 'BUTTON',
            perms: 'user-list__check'
          },
          {
            authNo: '_modify',
            authName: '编辑按钮',
            type: 'BUTTON',
            perms: 'user-list__modify'
          },
          {
            authNo: '_delete',
            authName: '删除按钮',
            type: 'BUTTON',
            perms: 'user-list__delete'
          },
        ]
      },
      {
        authNo: '_message',
        path: 'message',
        name: 'message',
        component: 'common/message/index',
        hidden: true,
        meta: { title: '消息中心' }
      },
    ]
  },
  {
    authNo: pre + '_browser',
    path: '/browser',
    component: 'Layout',
    meta: {
      title: '链浏览器',
      icon: '',
    },
    type: 'CATA',
    children: [
      {
        authNo: '_index',
        path: 'index',
        name: 'browser',
        component: 'common/browser',
        meta: { title: '链浏览器', icon: 'chain' },
      }
    ]
  },
]
