import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import Menu from 'components/Menu';
import HeaderContent from 'components/Header';
import PageName from 'components/PageName';
import filterRouteFun from 'utils/filterRoute';
import routerConfig from 'router/routerConfig';
import color from 'styles/variables.scss';
import styles from './BasicLayout.module.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserInfoAction } from 'actionCreators/app';

const { Header, Content, Sider } = Layout;

@connect(
  state => ({
    appState: state.app,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { getUserInfoAction },
      dispatch
    )
  })
)
class BasicLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  getUserInfo = () => {
    this.props.actions.getUserInfoAction().catch((err) => {
      console.log(err);
    });
  }

  onEnter = (Component, props) => {
    return <Component {...props} />;
  }

  flatRoutes = (data) => {
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(data[i]);
      if (data[i].children && data[i].childrenType === 'menu') {
        const sub = this.flatRoutes(data[i].children);
        result = result.concat(sub);
      }
    }
    return result;
  }

  render() {
    const { appState } = this.props;

    if (!appState.token) { // token 不存在直接去登录
      return (
        <Redirect exact from="/" to="/login" />
      );
    } else if (!appState.userInfo) { // token存在，但用户信息不存在，去获取用户信息并设置
      this.getUserInfo();
      return (
        <div></div>
      );
    } else {
      // 根据返回的menu和前端的routerConfig对比得出权限过滤后的路由
      const filterRoute = filterRouteFun(appState.menus, routerConfig);
      
      // 传递给menu的filterRoute还要处理一次，如果只有单种权限，把最顶层menu去掉
      let menuRoute = filterRoute;
      if (filterRoute.length === 1
        && (filterRoute[0].path === '/plat' || filterRoute[0].path === '/channel' || filterRoute[0].path === '/clerk' || filterRoute[0].path === '/super')) {
        menuRoute = filterRoute[0].children;
      }

      // 得到的路由是一个递归的数组，要先展开
      const flatData = this.flatRoutes(filterRoute);
      const routerData = flatData.map((route, i) => {
        // <Route {...route} {...this.props}></Route>
        if (route.redirect) {
          return (
            <Redirect exact key={route.key} from={route.path} to={route.children[0].path} {...this.props} />
          );
        } else {
          return (
            <Route
              path={route.path}
              key={route.key}
              exact
              render={() => this.onEnter(route.component, { ...this.props, ...route })}
            >
            </Route>
          );
        }
      });

      return (
        <Layout className={styles.layout}>
          <Header className={styles['header-layout'] + ' bg-white'}>
            <HeaderContent></HeaderContent>
          </Header>
          <Layout>
            <Sider width={200} style={{ background: color.siderbarBg }}>
              <Menu routes={menuRoute} {...this.props}></Menu>
            </Sider>
            <Layout style={{ padding: '40px 40px', minWidth: '1200px' }}>
              <PageName routes={flatData} {...this.props}></PageName>
              <Content>
                <Switch>
                  <Redirect exact from="/" to={flatData[0].path} />
                  {routerData}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      );
    }
  }
}
 
export default BasicLayout;
