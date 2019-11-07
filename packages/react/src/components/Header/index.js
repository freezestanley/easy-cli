import React, { Component } from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAction } from 'actionCreators/app';

import styles from './index.module.scss';

@connect(
  state => ({
    name: state.app.userInfo.name,
  }),
  dispatch => ({
    actions: bindActionCreators(
      { logoutAction },
      dispatch
    )
  })
)
class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  handleLogout = () => {
    this.props.actions.logoutAction();
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={this.handleLogout}>退出登录</Menu.Item>
      </Menu>
    );

    return (
      <div className={styles['header-container']}>
        <div className={styles['system-name']}>理赔垫资机构管理</div>

        <div className={styles['right-container']}>
          <Dropdown overlay={menu} trigger={['click']}>
            <span className="ant-dropdown-link cursor">
              {this.props.name} <Icon type="down" />
            </span>
          </Dropdown>
        </div>
      </div>
    );
  }
}
 
export default MyHeader;
