// super 超级管理员
export {
  list, // 权限菜单列表
  listAuth, // 获取权限，传参数则是查指定角色的（ PLATFORM，FUND..）
  setAuth,
  addAuth, // 添加菜单
  updAuth, // 修改菜单
  delAuth, // 删除菜单
  addAuthBatch, // 批量添加
  delAuthBatch, // 批量删除
  simplifyAuthList, // 获取父菜单列表
  roleAuthTreeData, // 加载角色菜单列表树
  queryModelList, // 主流程名称列表
} from './interface/system'

