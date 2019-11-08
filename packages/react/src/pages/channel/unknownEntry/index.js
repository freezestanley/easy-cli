import React, { Component } from 'react';
import { Spin, Table, } from 'antd';
import FilterForm from './FilterForm';
import ActionDrawer from './ActionDrawer';
import { UNKONWN_ENTRY_STATUS } from 'utils/constant';
import { thousandPoint } from 'utils/index';

import { getListApi } from 'api/channel/unknownEntry';

class OrgManage extends Component {
  state = {
    loading: false,
    // pagination 配置
    total: 0,
    pageNum: 1,
    pageSize: 10,
    // 表格数据
    data: [
      { id: 1, orgName: '测试' }
    ],
  };

  componentDidMount() {
    this.getData();
  }

  getColumns() {
    return [
      {
        title: '代收付申请单号',
        width: 200,
        dataIndex: 'paymentNo',
        key: 'paymentNo',
        fixed: 'left',
      },
      {
        title: '入账金额(元)',
        width: 200,
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record, index) => {
          // 先转为元
          const temp = Number(record.amount) / 100;
          return thousandPoint(temp, 2);
        }
      },
      {
        title: '入账时间',
        dataIndex: 'finishDate',
        key: 'finishDate',
        width: 200,
      },
      {
        title: '付款方账户名',
        dataIndex: 'payerName',
        key: 'payerName',
        width: 150,
      },
      {
        title: '付款方账号',
        dataIndex: 'payerAccount',
        key: 'payerAccount',
        width: 200,
      },
      {
        title: '付款方银行',
        dataIndex: 'payerBank',
        key: 'payerBank',
        width: 150,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 150,
        render: (text, record, index) => (UNKONWN_ENTRY_STATUS[record.status])
      },
      {
        title: '对应案件号',
        dataIndex: 'caseNo',
        key: 'caseNo',
        width: 200,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 160,
        render: (text, record, index) => {
          if (record.status === 'PEND') { // 待处理
            return (
              <span className="theme cursor mar-r-8" onClick={() => this.onConfirm(record)}>确认医院退费还款</span>
            );
          } else {
            return (
              <span className="theme cursor mar-r-8" onClick={() => this.onView(record)}>详情</span>
            );
          }
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
    // console.log('filterData', filterData);
    const params = {
      paymentNo: filterData.paymentNo,
      start: filterData.timeArr && filterData.timeArr.length ? filterData.timeArr[0].format('YYYY-MM-DD') + ' 00:00:00' : '',
      end: filterData.timeArr && filterData.timeArr.length ? filterData.timeArr[1].format('YYYY-MM-DD') + ' 23:59:59' : '',
      status: filterData.status,
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

  onConfirm = (data) => {
    this.actionDrawer.showDrawer('add', undefined, data.paymentNo);
  }

  onView = (data) => {
    this.actionDrawer.showDrawer('view', undefined, data.paymentNo);
  }

  render() {
    const {
      total, pageNum, pageSize, data
    } = this.state;

    return (
      <div>
        <Spin spinning={this.state.loading} size="large">
          {/* 筛选条件 */}
          <FilterForm
            wrappedComponentRef={(form) => this.filterForm = form}
            onSearch={this.onSearch}
          >
          </FilterForm>
          {/* 表格 */}
          <Table
            columns={this.getColumns()}
            dataSource={data}
            scroll={{ x: 1500 }}
            className="fixedWidthTable"
            rowKey="id"
            style={{ marginTop: '20px' }}
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
