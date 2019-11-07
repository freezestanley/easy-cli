import React, { Component } from 'react';
import {
  Spin, Button, Table, Popconfirm, message
} from 'antd';
import FilterForm from './FilterForm';
import ShipModal from './ShipModal/index';
import { getListApi, enableApi, disableApi } from 'api/plat/partnershipManage';

import styles from './index.module.scss';

class PartnershipManage extends Component {
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
        title: '渠道方名称',
        // width: 200,
        dataIndex: 'insureName',
        key: 'insureName',
      },
      {
        title: '资金方名称',
        // width: 200,
        dataIndex: 'fundName',
        key: 'fundName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (text, record, index) => (record.status === 'VALID' ? <span className="theme">启用</span> : <span>停用</span>)
      },
      {
        title: '更新时间',
        dataIndex: 'gmtCreated',
        key: 'gmtCreated',
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
    this.shipModal.showModal('add');
  }

  onEdit = (data) => {
    this.shipModal.showModal('edit', data);
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
      <div className={styles['partnership-manage']}>
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
            scroll={{ x: 600 }}
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

        <ShipModal ref={(shipModal) => this.shipModal = shipModal} callback={this.getData}></ShipModal>
      </div>
    );
  }
}
 
export default PartnershipManage;
