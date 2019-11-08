// 核心专属菜单
import { PROJECT_TOKEN_NAME as TOKEN__NAME } from '@/utils/constant/index'
const pre = 'CORE'

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
        component: 'core/account-manage/index',
        meta: { title: TOKEN__NAME + '账户管理' }
      },
      {
        authNo: '_payassets',
        path: 'payassets',
        name: 'business-payassets',
        component: 'common/assets-register/index',
        meta: { title: '资产登记' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'assets-register-list__look'
          },
          {
            authNo: '_add',
            authName: '新增按钮',
            type: 'BUTTON',
            perms: 'assets-register-list__add'
          },
          {
            authNo: '_edit',
            authName: '编辑作废按钮',
            type: 'BUTTON',
            perms: 'assets-register-list__edit'
          }
        ]
      },
      {
        authNo: '_payadd',
        path: 'payadd',
        name: 'business-payadd',
        hidden: true,
        component: 'common/assets-register/add/index',
        meta: { title: '新增应付' }
      },
      // 几个隐藏菜单
      {
        authNo: '_payedit',
        path: 'payedit',
        name: 'business-payedit',
        hidden: true,
        component: 'common/assets-register/edit/index',
        meta: { title: '编辑应付' }
      },
      {
        authNo: '_payexamine',
        path: 'payexamine',
        name: 'cpayexamine',
        hidden: true,
        component: 'common/assets-register/examine/index',
        meta: { title: '应付资产详情' }
      },
      // {
      //   authNo: '_collectexamine',
      //   path: 'collectexamine',
      //   name: 'collectexamine',
      //   hidden: true,
      //   component: 'common/assets-register/examine/index',
      //   meta: { title: '应收资产详情' }
      // },
      {
        authNo: '_quota',
        path: 'quota',
        redirect: '/quota/quota-manage',
        component: 'core/quota-manage/index',
        meta: { title: '授信管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_quota-manage',
            path: 'quota-manage',
            name: 'quota-manage',
            component: 'core/quota-manage/quota-manage',
            meta: { title: '授信管理' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-manage__look'
              },
              {
                authNo: '_up',
                authName: '申请调增',
                type: 'BUTTON',
                perms: 'quota-manage__up'
              },
              {
                authNo: '_check',
                authName: '审核',
                type: 'BUTTON',
                perms: 'quota-manage__check'
              }
            ]
          },
        ]
      },
      {
        authNo: '_issue',
        path: 'issue',
        name: 'issue-manage',
        component: 'core/issue-manage/index',
        meta: { title: '签发管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'issue-manage__look'
          },
          {
            authNo: '_newcheck',
            authName: '新增签发',
            type: 'BUTTON',
            perms: 'issue-manage__new'
          },
          {
            authNo: '_check',
            authName: '审核',
            type: 'BUTTON',
            perms: 'issue-manage__check'
          },
          {
            authNo: '_issuance',
            authName: '签发',
            type: 'BUTTON',
            perms: 'issue-manage__issuance'
          },
          {
            authNo: '_rejected',
            authName: '驳回',
            type: 'BUTTON',
            perms: 'issue-manage__rejected'
          },
          {
            authNo: '_sign',
            authName: '签约',
            type: 'BUTTON',
            perms: 'issue-manage__sign'
          },
        ]
      },
      {
        authNo: '_new-issue',
        path: 'new-issue',
        name: 'new-issue',
        hidden: true,
        component: 'core/issue-manage/new-issue',
        meta: { title: '新增签发' }
      },
      {
        authNo: '_repay-manage',
        path: 'repay-manage',
        name: 'repay-manage',
        component: 'SubLayout',
        meta: { title: '还款管理' },
        redirect: '/business/repay-manage/list',
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'repay-manage-list',
            meta: { title: '还款管理' },
            component: 'core/repay-manage/list.vue',
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'repay-manage-list__look'
              },
              {
                authNo: '_apply',
                authName: '申请还款',
                type: 'BUTTON',
                perms: 'repay-manage-list__apply'
              },
              {
                authNo: '_view',
                authName: '查看还款',
                type: 'BUTTON',
                perms: 'repay-manage-list__view'
              },
              {
                authNo: '_contract',
                authName: '查看合约',
                type: 'BUTTON',
                perms: 'repay-manage-list__contract'
              },
            ]
          },
          {
            authNo: '_detail',
            path: 'detail',
            name: 'repay-manage-detail',
            component: 'core/repay-manage/detail.vue',
            meta: { title: '还款详情' },
            hidden: true,
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'repay-manage__look'
              },
              {
                authNo: '_apply',
                authName: '申请还款',
                type: 'BUTTON',
                perms: 'repay-manage__apply'
              },
              {
                authNo: '_view',
                authName: '查看还款',
                type: 'BUTTON',
                perms: 'repay-manage__view'
              },
              {
                authNo: '_sign',
                authName: '标记还款',
                type: 'BUTTON',
                perms: 'repay-manage__sign'
              },
              {
                authNo: '_cancel',
                authName: '取消申请',
                type: 'BUTTON',
                perms: 'repay-manage__cancel'
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
