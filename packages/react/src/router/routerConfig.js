import Loadable from 'react-loadable';
import Loading from 'components/Loading';

/**
 * 里面只放需登录后访问的路由
 * component：组件地址
 * key可能没用了，我在Menu组件里用的path做key
 */
const routes = [
  {
    key: 'plat',
    path: '/plat',
    icon: 'inbox',
    title: '平台方',
    redirect: true, // redirect到children第一个
    childrenType: 'menu',
    children: [
      {
        key: 'orgManage',
        path: '/plat/orgManage',
        icon: 'inbox',
        title: '机构管理',
        component: () => import('pages/plat/orgManage'),
        childrenType: 'button',
        children: [
          {
            key: '/org/createOrgInfo',
            path: '/org/createOrgInfo', // 接口名
            title: '新增'
          },
        ]
      },
      {
        key: 'partnershipManage',
        path: '/plat/partnershipManage',
        icon: 'inbox',
        title: '合作关系',
        component: () => import('pages/plat/partnershipManage'),
        childrenType: 'button',
        children: [
          {
            key: '/OrgRelation/add',
            path: '/OrgRelation/add', // 接口名
            title: '新增'
          },
        ]
      },
      {
        key: 'plat-sysAccountManage',
        path: '/plat/sysAccountManage',
        icon: 'inbox',
        title: '系统账号管理',
        component: () => import('pages/common/sysAccountManage'),
        childrenType: 'button',
        children: [
          {
            key: 'plat-sysAccountManage-addBtn',
            path: '/api/user/addActOp',
            title: '添加',
          },
          {
            key: 'plat-sysAccountManage-editBtn',
            path: '/api/user/updateAccount',
            title: '编辑',
          },
        ],
      },
    ],
  },
  {
    key: 'channel',
    path: '/channel',
    icon: 'inbox',
    title: '渠道方',
    redirect: true,
    childrenType: 'menu',
    children: [
      {
        key: 'unknownEntry',
        path: '/channel/unknownEntry',
        icon: 'inbox',
        title: '不明入账',
        component: () => import('pages/channel/unknownEntry'),
      },
      {
        key: 'reportCredit',
        path: '/channel/reportCredit',
        icon: 'inbox',
        title: '上报征信',
        component: () => import('pages/channel/reportCredit'),
      },
      {
        key: 'servicerManage',
        path: '/channel/servicerManage',
        icon: 'inbox',
        title: '服务商管理',
        component: () => import('pages/channel/servicerManage'),
      },
      {
        key: 'channel-sysAccountManage',
        path: '/channel/sysAccountManage',
        icon: 'inbox',
        title: '系统账号管理',
        component: () => import('pages/common/sysAccountManage'),
      },
      {
        key: 'adMoneyManage',
        path: '/channel/adMoneyManage',
        icon: 'inbox',
        title: '垫资查询',
        component: () => import('pages/channel/adMoneyManage'),
      },
      {
        key: 'orgInfo',
        path: '/channel/orgInfo',
        icon: 'inbox',
        title: '机构信息',
        component: () => import('pages/channel/orgInfo'),
      },
    ],
  },
  {
    key: 'clerk',
    path: '/clerk',
    icon: 'inbox',
    title: '业务员',
    redirect: true,
    childrenType: 'menu',
    children: [
      {
        key: 'clerk-adMoneyManage',
        path: '/clerk/adMoneyManage',
        icon: 'inbox',
        title: '垫资管理',
        component: () => import('pages/clerk/adMoneyManage'),
        childrenType: 'menu',
        children: [
          {
            key: 'clerk-addAdMoneyPage',
            path: '/clerk/addAdMoneyPage/addAdMoneyPage',
            title: '申请资料',
            component: () => import('pages/clerk/addAdMoneyPage'),
            hidden: true,
          }
        ]
      },
      {
        key: 'clerk-personInfo',
        path: '/clerk/personInfo',
        icon: 'inbox',
        title: '个人信息',
        component: () => import('pages/clerk/personInfo'),
      },
    ],
  },
  {
    key: 'super',
    path: '/super',
    icon: 'inbox',
    title: '后台配置',
    redirect: true,
    childrenType: 'menu',
    children: [
      {
        key: 'super-roleManage',
        path: '/super/roleManage',
        icon: 'inbox',
        title: '角色管理',
        component: () => import('pages/super/roleManage'),
        childrenType: 'button',
        children: [
          {
            key: 'super-roleManage-addBtn',
            path: '/super/roleManage/addBtn',
            title: '添加',
          },
          {
            key: 'super-roleManage-deleteBtn',
            path: '/super/roleManage/deleteBtn',
            title: '删除',
          }
        ],
      },
    ],
  },
];


function format(routes) {
  routes.forEach(route => {
    if (route.children && route.childrenType === 'menu') {
      route.children = format(route.children);
    }
    if (route.component) {
      route.component = Loadable({
        loader: route.component,
        loading: Loading,
      });
    }
    route.exact = true;
  });
  return routes;
}

const resultRoutes = format(routes);

export default resultRoutes;
