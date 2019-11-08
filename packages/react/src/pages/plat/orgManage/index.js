import React, { Component } from 'react';
import {
  Spin, Button, Table, Popconfirm, message
} from 'antd';
import FilterForm from './FilterForm';
import ActionDrawer from './ActionDrawer';
import { PLAT_ORG_TYPE } from 'utils/constant';

import { getListApi, enableApi, disableApi, } from 'api/plat/orgManage';

import styles from './index.module.scss';

class OrgManage extends Component {
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
        title: '机构名称',
        width: 200,
        dataIndex: 'orgName',
        key: 'orgName',
        fixed: 'left',
      },
      {
        title: '机构类型',
        width: 150,
        dataIndex: 'orgType',
        key: 'orgType',
        render: (text, record, index) => (PLAT_ORG_TYPE[record.orgType])
      },
      {
        title: '统一社会信用代码',
        dataIndex: 'creditCode',
        key: 'creditCode',
        width: 200,
      },
      {
        title: '联系人',
        dataIndex: 'contectName',
        key: 'contectName',
        width: 150,
      },
      {
        title: '联系人手机号',
        dataIndex: 'contectPhone',
        key: 'contectPhone',
        width: 150,
      },
      {
        title: '联系人邮箱',
        dataIndex: 'contectMail',
        key: 'contectMail',
        width: 200,
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
              <span className="theme cursor mar-r-8" onClick={() => this.onView(record)}>详情</span>
              {statusBtn}
            </div>
          );
        },
      },
    ];
  }

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

  onSearch = () => {
    this.setState({
      pageNum: 1,
    }, () => {
      this.getData();
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

  onNewAdd = () => {
    this.actionDrawer.showDrawer('add');
  }

  onEdit = (data) => {
    this.actionDrawer.showDrawer('edit', data);
  }

  onView = (data) => {
    this.actionDrawer.showDrawer('view', data);
  }

  toggleStatus = (id, type) => {
    if (this.state.loading) return;
    this.setState({ loading: true });

    let api = type === 'enable' ? enableApi : disableApi;
    let tip = type === 'enable' ? '启用' : '停用';
    api(id).then(() => {
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
      <div className={styles['org-manage']}>
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
            scroll={{ x: 1600 }}
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

        <ActionDrawer ref={(actionDrawer) => this.actionDrawer = actionDrawer} callback={this.getData}></ActionDrawer>
      </div>
    );
  }
}
 
export default OrgManage;
