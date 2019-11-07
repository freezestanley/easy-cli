import React, { Component } from 'react';
import {
  message, Button, Table, Spin, Modal
} from 'antd';
import FilterForm from './FilterForm/index';
import RoleDrawer from './RoleDrawer';

// import { ORG_TYPE } from 'utils/constant';

import styles from './index.module.scss';

import { getListApi, deleteRoleApi } from 'api/super/roleManage';

class RoleManage extends Component {
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
        title: '角色名称',
        width: 200,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left',
      },
      // {
      //   title: '角色所属',
      //   width: 200,
      //   dataIndex: 'orgType',
      //   key: 'orgType',
      //   render: (text, record, index) => {
      //     return ORG_TYPE[record.orgType];
      //   }
      // },
      {
        title: '角色描述',
        // width: 200,
        dataIndex: 'remarks',
        key: 'remarks',
      },
      {
        title: '更新用户',
        dataIndex: 'modifier',
        key: 'modifier',
        width: 200,
      },
      {
        title: '更新时间',
        dataIndex: 'gmtModified',
        key: 'gmtModified',
        width: 200,
      },
      {
        title: '创建用户',
        dataIndex: 'creator',
        key: 'creator',
        width: 150,
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreated',
        key: 'gmtCreated',
        width: 200,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
          return (
            <div>
              <span className="theme cursor mar-r-8" onClick={() => this.onEdit(record)}>编辑</span>
              <span className="theme cursor" onClick={() => this.onDelete(record)}>删除</span>
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
    this.roleDrawer.showDrawer();
  }

  onEdit = (data) => {
    this.roleDrawer.showDrawer({
      id: data.id,
      name: data.name,
      orgType: data.orgType,
      remarks: data.remarks,
      menuIds: data.menuIds,
    });
  }

  onDelete = (record) => {
    Modal.confirm({
      title: '提示',
      content: '确定删除该角色吗？',
      onOk: () => {
        deleteRoleApi(record.id).then(() => {
          this.getData();
          message.success('删除成功');
        });
      },
    });
  }

  getData = () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    const filterData = this.filterForm.props.form.getFieldsValue();
    const params = {
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

  // toggleStatus = (id, type) => {
  //   if (this.state.loading) return;
  //   this.setState({ loading: true });

  //   let api = type === 'enable' ? enableUserApi : disableUserApi;
  //   let tip = type === 'enable' ? '启用' : '停用';
  //   api({ id }).then(() => {
  //     this.setState({ loading: false }, () => {
  //       this.getData();
  //       message.success(`${tip}成功`);
  //     });
  //   }).finally(() => {
  //     this.setState({ loading: false });
  //   });
  // }

  render() {
    const {
      total, pageNum, pageSize, data
    } = this.state;
    return (
      <div className={styles['role-manage']}>
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
            scroll={{ x: 1250 }}
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

        <RoleDrawer ref={(roleDrawer) => this.roleDrawer = roleDrawer} callback={this.getData}></RoleDrawer>
      </div>
    );
  }
}

export default RoleManage;
