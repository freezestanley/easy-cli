// 链属专属菜单
import { PROJECT_TOKEN_NAME as TOKEN__NAME } from '@/utils/constant/index'

const pre = 'CHAIN'

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
        component: 'chain/account-manage/index',
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
      // ----- 隐藏路由
      {
        authNo: '_payadd',
        path: 'payadd',
        name: 'business-payadd',
        hidden: true,
        component: 'common/assets-register/add/index',
        meta: { title: '新增应付' }
      },
      {
        authNo: '_collectadd',
        path: 'collectadd',
        name: 'business-collectadd',
        hidden: true,
        component: 'common/assets-register/add/index',
        meta: { title: '新增应收' }
      },
      {
        authNo: '_payedit',
        path: 'payedit',
        name: 'business-payedit',
        hidden: true,
        component: 'common/assets-register/edit/index',
        meta: { title: '编辑应付' }
      },
      {
        authNo: '_collectedit',
        path: 'collectedit',
        name: 'business-collectedit',
        hidden: true,
        component: 'common/assets-register/edit/index',
        meta: { title: '编辑应收' }
      },
      {
        authNo: '_payexamine',
        path: 'payexamine',
        name: 'cpayexamine',
        hidden: true,
        component: 'common/assets-register/examine/index',
        meta: { title: '应付资产详情' }
      },
      {
        authNo: '_collectexamine',
        path: 'collectexamine',
        name: 'collectexamine',
        hidden: true,
        component: 'common/assets-register/examine/index',
        meta: { title: '应收资产详情' }
      },
      // ----隐藏路由结束
      {
        authNo: '_issue',
        path: 'issue',
        name: 'issue-manage',
        component: 'chain/issue-manage/index',
        meta: { title: '签发管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'issue-manage__look'
          },
          {
            authNo: '_apply',
            authName: '申请签发按钮',
            type: 'BUTTON',
            perms: 'issue-manage__apply'
          },
          {
            authNo: '_check',
            authName: '审核',
            type: 'BUTTON',
            perms: 'issue-manage__check'
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
        authNo: '_transfer',
        path: 'transfer',
        redirect: '/chain/transfer-list',
        component: 'SubLayout',
        meta: { title: '转让管理' },
        type: 'CATA',
        children: [
          {
            authNo: '_transfer-list',
            path: 'transfer-list',
            name: 'transfer-list',
            component: 'chain/transfer-manage/transfer-list',
            meta: { title: '转让列表' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'transfer-list__look'
              },
              {
                authNo: '_add',
                authName: '新增转让按钮',
                type: 'BUTTON',
                perms: 'transfer-list__add'
              },
              {
                authNo: '_up_check',
                authName: '上游链属审核按钮',
                type: 'BUTTON',
                perms: 'transfer-list__up_check'
              },
              {
                authNo: '_up_sign',
                authName: '转出方签约按钮',
                type: 'BUTTON',
                perms: 'transfer-list__up_sign'
              },
              {
                authNo: '_down_sign',
                authName: '接收方签约按钮',
                type: 'BUTTON',
                perms: 'transfer-list__down_sign'
              }
            ]
          },
          {
            authNo: '_transfer-apply',
            path: 'transfer-apply',
            name: 'transfer-apply',
            component: 'chain/transfer-manage/transfer-apply',
            meta: { title: '申请管理' },
            btns: [
              {
                authNo: '_look',
                authName: '查看权限',
                type: 'BUTTON',
                perms: 'transfer-list__look'
              },
              {
                authNo: '_apply',
                authName: '申请转让按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__apply'
              },
              {
                authNo: '_down_check',
                authName: '下游链属审核按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__down_check'
              },
              {
                authNo: '_add',
                authName: '新增转让按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__add'
              },
              {
                authNo: '_reject',
                authName: '上游驳回按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__reject'
              },
              {
                authNo: '_up_check',
                authName: '上游链属审核按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__up_check'
              },
              {
                authNo: '_up_sign',
                authName: '转出方签约按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__up_sign'
              },
              {
                authNo: '_down_sign',
                authName: '接收方签约按钮',
                type: 'BUTTON',
                perms: 'transfer-apply__down_sign'
              }
            ]
          }
        ]
      },
      {
        authNo: '_loan-manage',
        path: 'loan-manage',
        name: 'loan-manage',
        component: 'chain/loan-manage/index',
        meta: { title: '融资管理' },
        btns: [
          {
            authNo: '_look',
            authName: '查看权限',
            type: 'BUTTON',
            perms: 'loan-list__look'
          },
          {
            authNo: '_add',
            authName: '新增融资',
            type: 'BUTTON',
            perms: 'loan-manage__add'
          },
          {
            authNo: '_check',
            authName: '审核',
            type: 'BUTTON',
            perms: 'loan-manage__check'
          },
          {
            authNo: '_sign',
            authName: '签约',
            type: 'BUTTON',
            perms: 'loan-manage__sign'
          },
          {
            authNo: '_mark',
            authName: '标记抽成已支付',
            type: 'BUTTON',
            perms: 'loan-manage__mark'
          }
        ]
      },
      {
        authNo: '_add-loan',
        path: 'add-loan',
        name: 'loan-manage-add',
        hidden: true,
        component: 'chain/loan-manage/add',
        meta: { title: '新增融资' }
      },
      {
        authNo: '_receipt',
        path: 'receipt',
        name: 'receipt-manage',
        component: 'SubLayout',
        meta: { title: '收款管理' },
        redirect: '/business/receipt/list',
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'repayment-list',
            meta: { title: '收款管理' },
            component: 'chain/receipt-manage/list.vue',
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
            name: 'repayment-detail',
            component: 'chain/receipt-manage/detail.vue',
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
      {
        authNo: '_repayment',
        path: 'repayment',
        name: 'repayment',
        component: 'chain/repay-manage/index',
        meta: { title: '还款管理' },
        redirect: '/business/repayment/list',
        type: 'CATA',
        children: [
          {
            authNo: '_list',
            path: 'list',
            name: 'repaymentList',
            meta: { title: '还款管理' },
            component: 'chain/repay-manage/list.vue',
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
            name: 'repaymentDetail',
            component: 'chain/repay-manage/detail.vue',
            meta: { title: '还款详情' },
            hidden: true,
            props: route => ({
              repayPlanNo: route.query.repayPlanNo,
              repayCorpNo: route.query.repayCorpNo,
              tokenNo: route.query.tokenNo,
            }),
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
  }
]
