import React, { Component } from 'react';
import {
  Menu, Icon
} from 'antd';
import { Link } from 'react-router-dom';

import color from 'styles/variables.scss';

const { SubMenu } = Menu;

class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  makeTreeDom = data => {
    return data.map((item, index) => {
      if (item.children && item.childrenType === 'menu' && this.hasOneShowingChild(item.children)) {
        return (
          <SubMenu
            key={item.path}
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              ) : (
                item.title
              )
            }
          >
            {this.makeTreeDom(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              {item.icon ? <Icon type={item.icon} /> : null}
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      }
    });
  }

  hasOneShowingChild = (children = []) => {
    const showingChildren = children.filter(item => {
      if (item.hidden) {
        return false;
      } else {
        return true;
      }
    });
    if (showingChildren.length === 1) {
      return true;
    }
    return false;
  }

  render() {
    const { routes } = this.props;
    return (
      <Menu
        selectedKeys={[this.props.location.pathname]}
        mode="inline"
        style={{
          height: '100%',
          background: color.siderbarBg
        }}
      >
        {this.makeTreeDom(routes)}
      </Menu>
    );
  }
}
 
export default MyMenu;
