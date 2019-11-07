import React, { Component } from 'react';
import {
  message, Button, Table, Popconfirm, Spin 
} from 'antd';
import { connect } from 'react-redux';
import FilterForm from './FilterForm/index';
import UserModal from './UserModal/index';

import styles from './index.module.scss';

import { getListApi, enableUserApi, disableUserApi } from 'api/common/sysAccountManage';

@connect(
  state => ({
    userInfo: state.app.userInfo,
  })
)
class SysAccountManage extends Component {
  state = {
    loading: false,
    // pagination 配置
    total: 0,
    pageNum: 1,
    pageSize: 10,
    // 表格数据
    data: [],
  };

  componentDidMount() {
    this.getData();
  }

  getColumns() {
    return [
      {
        title: '用户名称',
        width: 200,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      {
        title: '用户手机号',
        width: 150,
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '用户邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 150,
      },
      {
        title: '登录账号',
        dataIndex: 'loginName',
        key: 'loginName',
        width: 150,
      },
      {
        title: '系统角色',
        dataIndex: 'roleName',
        key: 'roleName',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (text, record, index) => (record.status === 'VALID' ? <span className="theme">启用</span> : <span>停用</span>)
      },
      {
        title: '更新用户',
        dataIndex: 'modifier',
        key: 'modifier',
        width: 150,
      },
      {
        title: '更新时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
        width: 200,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record, index) => {
          const statusBtn = record.status === 'VALID' ? (
            <Popconfirm title="你确定要停用吗?" onConfirm={() => this.toggleStatus(record.id, 'disable')}>
              <span className="theme cursor">停用</span>
            </Popconfirm>
          ) : (
            <Popconfirm title="你确定要启用吗?" onConfirm={() => this.toggleStatus(record.id, 'enable')}>
              <span className="theme cursor">启用</span>
            </Popconfirm>
          );
          return (
            <div>
              <span className="theme cursor mar-r-8" onClick={() => this.onEdit(record)}>编辑</span>
              {statusBtn}
            </div>
          );
        },
      },
    ];
  }

  /**
   * pagination 操作
   */
  onSizeChange = (s) => {
    this.setState({
      pageNum: 1,
      pageSize: s,
    }, () => {
      this.getData();
    });
  }

  onCurrentChange = (p) => {
    this.setState({
      pageNum: p,
    }, () => {
      this.getData();
    });
  }
  
  // 点击查询按钮时， 从第一页开始查询
  onSearch = () => {
    this.setState({
      pageNum: 1,
    }, () => {
      this.getData();
    });
  }

  onNewAdd = () => {
    this.userModal.showModal('add');
  }

  onEdit = (data) => {
    this.userModal.showModal('edit', {
      id: data.id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      loginName: data.loginName,
      roleId: data.roleId,
    });
  }

  getData = () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    const filterData = this.filterForm.props.form.getFieldsValue();
    const params = {
      accountType: this.props.userInfo.accountType,
      orgId: this.props.userInfo.orgId,
      ...filterData,
      pageSize: this.state.pageSize,
      pageNum: this.state.pageNum
    };

    getListApi(params).then(data => {
      this.setState({
        data: data.data,
        total: data.total
      });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  toggleStatus = (id, type) => {
    if (this.state.loading) return;
    this.setState({ loading: true });

    let api = type === 'enable' ? enableUserApi : disableUserApi;
    let tip = type === 'enable' ? '启用' : '停用';
    api({ id }).then(() => {
      this.setState({ loading: false }, () => {
        this.getData();
        message.success(`${tip}成功`);
      });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const {
      total, pageNum, pageSize, data 
    } = this.state;
    return ( 
      <div className={styles['sys-account-manage']}>
        <Spin spinning={this.state.loading} size="large">
          {/* 筛选条件 */}
          <FilterForm wrappedComponentRef={(form) => this.filterForm = form} onSearch={this.onSearch}></FilterForm>
          {/* 添加按钮 */}
          <div className={styles['add-button-container']}>
            <Button type="primary" icon="plus" onClick={this.onNewAdd}>
              新增
            </Button>
          </div>
          {/* 表格 */}
          <Table
            columns={this.getColumns()}
            dataSource={data}
            scroll={{ x: 1450 }}
            className="fixedWidthTable"
            rowKey="id"
            pagination={{
              total: total,
              showTotal: total => `共 ${total} 条记录`,
              current: pageNum,
              pageSize: pageSize,
              hideOnSinglePage: true,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: (page, pageSize) => { this.onCurrentChange(page); },
              onShowSizeChange: (current, size) => { this.onSizeChange(size); },
            }}
          />
        </Spin>

        <UserModal ref={(userModal) => this.userModal = userModal} callback={this.getData}></UserModal>
      </div>
    );
  }
}
 
export default SysAccountManage;
