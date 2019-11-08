const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  loginName: state => state.user.loginName,
  role: state => state.user.role,
  permission_routes: state => state.permission.routes,
  userInfo: state => state.user.userInfo,
  email: state => state.user.email,
  messageCount: state => state.user.messageCount, // 消息中心的红点 新消息大于0则展示
  authDtoList: state => state.user.userInfo.buttonList,
  currentDict: state => state.user.currentDict
}
export default getters
