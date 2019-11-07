/**
 * 根据接口返回的数据，对比routeConfig 生成过滤后的路由
 * @param {Array} menus 
 * @param {Array} routeConfig 
 */
function filterRouteFun(menus, routeConfig) {
  let result = [];
  for (let i = 0; i < routeConfig.length; i++) {
    if (isInMenus(routeConfig[i].path, menus)) {
      if (routeConfig[i].children) {
        let sub = filterRouteFun(menus, routeConfig[i].children);
        if (sub.length) {
          routeConfig[i].children = sub;
        }
      }
      result.push(routeConfig[i]);
    }
  }
  return result;
}

function isInMenus(path, menus) {
  return menus.some((item) => {
    return item.path === path;
  });
}

export default filterRouteFun;
