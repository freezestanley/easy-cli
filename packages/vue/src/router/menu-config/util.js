import platform from './menu-platform'
import chain from './menu-chain'
import core from './menu-core'
import fund from './menu-funder'
import Layout from '@/layout'
import SubLayout from '@/components/SubLayout'
const _import = require('@/router/import-' + process.env.NODE_ENV)

const menuMap = {
  PLATFORM: platform,
  FUND: fund,
  CORE: core,
  CHAIN: chain
}
/**
 * 执行批量添加操作
 * @param {*} target 当前操作的角色
 * @param {*} handle 操作函数回调
 */
export function execute(target = '', handle = () => {}) {
  const roleMenu = menuMap[target]
  const ms = menuToAuth(roleMenu, { authName: '', authNo: '' }, target)
  console.log('当前处理角色：', target)
  handle(ms)
}
/**
 * 将菜单数据，转换成权限格式
 * @param {*} menu 菜单列表
 * @param {*} parent 父节点
 * @param {*} roleType 当前转换的角色类型
 */
export function menuToAuth (menus, parent = { authName: '', authNo: '' }, roleType) {
  return menus.map((item, index) => {
    const isDir = item.children && item.children.length > 0
    const hasBtns = item.btns && item.btns.length > 0
    const authName = item.meta && item.meta.title || ''
    const authNo = parent.authNo ? parent.authNo + '_' + item.authNo : item.authNo
    console.log(item.authName, 'parent:', parent.authNo, 'child-authNo:', authNo)
    return ({
      authNo: authNo,
      authName: authName,
      url: item.path,
      parentAuthName: parent.authName,
      parentAuthNo: parent.authNo,
      redirect: item.redirect,
      remarks: item.name,
      icon: item.meta && item.meta.icon,
      component: item.component,
      level: parent.authNo ? 2 : 1,
      roleType: roleType,
      type: item.type ? item.type : isDir ? 'CATA' : 'MENU',
      visible: item.hidden ? 'N' : 'Y',
      back: item.meta && item.meta.back ? 'Y' : 'N',
      sortNum: index,
      children: isDir ? menuToAuth(item.children, {
        authName: authName,
        authNo: authNo,
      }, roleType) : hasBtns ? _getBtns(item.btns, authNo, roleType) : null
    })
  })
}

function _getBtns (btns, authNo, roleType) {
  return btns.map(item => ({
    authNo: authNo + '_' + item.authNo,
    authName: item.authName,
    roleType: roleType,
    level: 3,
    type: item.type,
    perms: item.perms
  }))
}
/**
 * 将接口获取回来的权限数据，转换成菜单数据格式
 * @param {*} authList
 */
export function authToMenu(authList = []) {
  return authList.map(item => {
    const isDir = item.children && item.children.length > 0
    const noGrandson = item.children.length === 1 && item.children[0].children.length < 2
    return ({
      path: item.url,
      name: item.remarks,
      meta: {
        title: (isDir && item.level === 1 && item.children.length === 1) && !noGrandson ? '' : item.authName,
        icon: item.icon,
        back: item.back === 'Y'
      },
      hidden: item.visible === 'N',
      redirect: item.redirect,
      component: _getComponent(item.component),
      children: isDir ? authToMenu(item.children) : null
    })
  })
}

function _getComponent(componentName = '') {
  if (!componentName) return null
  if (componentName === 'Layout') return Layout
  if (componentName === 'SubLayout') return SubLayout
  return _import(componentName)
}

/**
 * 命令行测试代码
 */
/*
var pre = 'PLATFORM'
var a = platform
var Layout = 'Layout'
var SubLayout = 'SubLayout'
var b = menuToAuth(a, { authName: '', authNo: '' }, 'PLATFORM')
*/
