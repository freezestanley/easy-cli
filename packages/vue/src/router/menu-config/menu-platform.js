// 平台专属菜单
const pre = 'PLATFORM'

export default [
  {
    authNo: pre + '_index',
    path: '/',
    name: 'index-page',
    redirect: '/todo',
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
    authNo: pre + '_corp-manage',
    path: '/corp-manage',
    component: 'Layout',
    meta: { title: '企业管理', icon: 'qiye' },
    type: 'CATA',
    children: [
      {
        authNo: '_invite-code',
        path: 'invite-code',
        name: 'invite-code',
        component: 'platform/invite-code',
        meta: { title: '邀请码管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'corp-list__look'
          },
          {
            authNo: '_add',
            authName: '添加按钮',
            type: 'BUTTON',
            perms: 'invite-code__add'
          },
        ]
      },
      {
        authNo: '_corp-list',
        path: 'corp-list',
        name: 'corp-manage-corp-list',
        component: 'platform/corp-list',
        meta: { title: '企业认证列表' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'corp-list__look'
          },
          {
            authNo: '_add',
            authName: '添加按钮',
            type: 'BUTTON',
            perms: 'corp-list__add'
          },
          {
            authNo: '_auth_check',
            authName: '认证审核按钮',
            type: 'BUTTON',
            perms: 'corp-list__auth_check'
          },
          {
            authNo: '_change_check',
            authName: '变更审核按钮',
            type: 'BUTTON',
            perms: 'corp-list__change_check'
          },
        ]
      },
      {
        authNo: '_add-corp',
        path: 'add-corp',
        name: 'corp-manage-add-corp',
        component: 'platform/corp-list/add-corp',
        meta: { title: '添加企业' },
        hidden: true
      },
      {
        authNo: '_bank-card-check',
        path: 'bank-card-check',
        name: 'bank-card-check',
        component: 'platform/bank-card-check',
        meta: { title: '对公账号审核' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'bank-card-check__look'
          },
          {
            authNo: '_check',
            authName: '审核按钮',
            type: 'BUTTON',
            perms: 'bank-card-check__check'
          },
          {
            authNo: '_mark',
            authName: '标记按钮',
            type: 'BUTTON',
            perms: 'bank-card-check__mark'
          }
        ]
      }
    ]
  },
  {
    authNo: pre + '_business',
    path: '/business',
    component: 'Layout',
    meta: { title: '业务管理', icon: 'yewu' },
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
        authNo: '_quota-manage',
        path: 'quota-manage',
        name: 'quota-manage',
        component: 'SubLayout',
        meta: { title: '授信管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_push-quota',
            path: 'push-quota',
            name: 'push-quota',
            component: 'platform/quota-manage/push-quota',
            meta: { title: '推送授信' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'push-quota__look'
              },
              {
                authNo: '_push',
                authName: '推送按钮',
                type: 'BUTTON',
                perms: 'push-quota__push'
              },
            ]
          },
          {
            authNo: '_quota-list',
            path: 'quota-list',
            name: 'quota-list',
            component: 'platform/quota-manage/quota-list',
            meta: { title: '授信企业列表' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-list__look'
              }, {
                authNo: '_modify',
                authName: '调整授信',
                type: 'BUTTON',
                perms: 'quota-list__modify'
              }]
          },
          {
            authNo: '_quota-apply',
            path: 'quota-apply',
            name: 'quota-apply',
            component: 'platform/quota-manage/quota-apply',
            meta: { title: '授信申请' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'quota-apply__look'
              }, {
                authNo: '_check',
                authName: '审核',
                type: 'BUTTON',
                perms: 'quota-apply__check'
              }]
          }
        ]
      },
      {
        authNo: '_issue-manage',
        path: 'issue-manage',
        name: 'issue-manage',
        component: 'platform/issue-manage/index',
        meta: { title: '签发管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'issue-manage__look'
          },
          {
            authNo: '_check',
            authName: '审核按钮',
            type: 'BUTTON',
            perms: 'issue-manage__check'
          },
        ]
      },
      {
        authNo: '_transfer-manage',
        path: 'transfer-manage',
        name: 'transfer-manage',
        component: 'platform/transfer-manage',
        meta: { title: '转让管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'transfermanage__look'
          },
          {
            authNo: '_check',
            authName: '审核按钮',
            type: 'BUTTON',
            perms: 'transfer-manage__check'
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
            authNo: '_index',
            path: 'index',
            name: 'loan-manage-index',
            component: 'platform/loan-manage/index',
            meta: { title: '融资列表' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'loan-manage-index__look'
              },
              {
                authNo: '_check',
                authName: '审核按钮',
                type: 'BUTTON',
                perms: 'loan-manage-index__check'
              }
            ]
          },
          {
            authNo: '_products',
            path: 'products',
            name: 'loan-manage-products',
            component: 'platform/loan-manage/products/index',
            meta: { title: '融资产品列表' }
          },
          {
            authNo: '_config',
            path: 'config',
            name: 'loan-manage-config',
            component: 'platform/loan-manage/config/index',
            meta: { title: '融资服务费配置' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'loan-manage-config__look'
              },
              {
                authNo: '_edit',
                authName: '编辑',
                type: 'BUTTON',
                perms: 'loan-manage-config__edit'
              }
            ]
          },

          {
            authNo: '_fee',
            path: 'fee',
            name: 'loan-manage-fee',
            component: 'platform/loan-manage/fee/index',
            meta: { title: '融资服务费管理' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'loan-manage-fee__look'
              },
              {
                authNo: '_edit',
                authName: '编辑',
                type: 'BUTTON',
                perms: 'loan-manage-fee__edit'
              },
              {
                authNo: '_sure',
                authName: '确认收款',
                type: 'BUTTON',
                perms: 'loan-manage-fee__sure'
              }
            ]
          },
          {
            authNo: '_fee-detail/:id',
            path: 'fee-detail/:id',
            name: 'loan-manage-fee-detail',
            hidden: true,
            component: 'platform/loan-manage/fee/detail',
            meta: { title: '编辑抽成' }
          },
          {
            authNo: '_check',
            path: 'check',
            name: 'loan-manage-check',
            component: 'platform/loan-manage/check.vue',
            meta: { title: '融资审核' },
            hidden: true
          },
        ]
      },
      {
        authNo: '_repay-manage',
        path: 'repay-manage',
        name: 'repay-manage',
        component: 'platform/repay-manage',
        meta: { title: '还款管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'repay-manage-list',
            meta: { title: '还款管理' },
            component: 'platform/repay-manage/list.vue',
          },
          {
            authNo: '_detail',
            path: 'detail',
            name: 'repay-manage-detail',
            component: 'platform/repay-manage/detail.vue',
            meta: { title: '还款详情' },
            hidden: true,
            btns: [
              {
                authNo: '_frozen',
                authName: '冻结',
                type: 'BUTTON',
                perms: 'repay-manage__frozen'
              }
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
        authNo: '_message-manage',
        path: 'message-manage',
        name: 'message-manage',
        component: 'platform/message/index',
        meta: { title: '消息管理' }
      },
      {
        authNo: '_message',
        path: 'message',
        name: 'message',
        component: 'common/message/index',
        hidden: true,
        meta: { title: '消息中心' }
      }
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
