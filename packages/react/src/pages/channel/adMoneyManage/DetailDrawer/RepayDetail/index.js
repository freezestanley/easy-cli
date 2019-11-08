import React, { Component } from 'react';
import { Spin, Table, } from 'antd';
import FilterForm from './FilterForm';
import { downloadFileFun } from 'utils/index';
import { REPAY_STATUS, REPAY_TYPE } from 'utils/constant';

import { getRepayDetailApi } from 'api/common/adMoneyManage';

class RepayDetail extends Component {
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
        title: '还款方式',
        dataIndex: 'repayType',
        key: 'repayType',
        width: 200,
        render: (text, record, index) => {
          return REPAY_TYPE[record.repayType];
        }
      },
      {
        title: '还款结果',
        dataIndex: 'result',
        key: 'result',
        width: 200,
        render: (text, record, index) => {
          return REPAY_STATUS[record.result];
        }
      },
      {
        title: '还款凭证号',
        dataIndex: 'paymentVoucherNo',
        key: 'paymentVoucherNo',
        width: 200,
      },
      {
        title: '业务处理日期',
        dataIndex: 'businessDate',
        key: 'businessDate',
        width: 200,
      },
      {
        title: '到期日',
        dataIndex: 'endDay',
        key: 'endDay',
        width: 200,
      },
      {
        title: '费用',
        dataIndex: 'fee',
        key: 'fee',
        width: 200,
      },
      {
        title: '费用滞纳金',
        dataIndex: 'fine',
        key: 'fine',
        width: 200,
      },
      {
        title: '利息',
        dataIndex: 'intr',
        key: 'intr',
        width: 200,
      },
      {
        title: '贷款状态',
        dataIndex: 'loanState',
        key: 'loanState',
        width: 200,
      },
      {
        title: '逾期天数',
        dataIndex: 'ovdDays',
        key: 'ovdDays',
        width: 200,
      },
      {
        title: '逾期费用',
        dataIndex: 'ovdFee',
        key: 'ovdFee',
        width: 200,
      },
      {
        title: '逾期利息',
        dataIndex: 'ovdIntr',
        key: 'ovdIntr',
        width: 200,
      },
      {
        title: '逾期利息罚息',
        dataIndex: 'ovdIntrPenalty',
        key: 'ovdIntrPenalty',
        width: 200,
      },
      {
        title: '逾期本金',
        dataIndex: 'ovdPrin',
        key: 'ovdPrin',
        width: 200,
      },
      {
        title: '逾期本金罚息',
        dataIndex: 'ovdPrinPenalty',
        key: 'ovdPrinPenalty',
        width: 200,
      },
      {
        title: '本金',
        dataIndex: 'prin',
        key: 'prin',
        width: 200,
      },
      {
        title: '剩余金额',
        dataIndex: 'surPri',
        key: 'surPri',
        width: 200,
      },
      {
        title: '总金额',
        dataIndex: 'total',
        key: 'total',
        width: 200,
      },
      {
        title: '还款凭证',
        dataIndex: 'paymentVoucher',
        key: 'paymentVoucher',
        fixed: 'right',
        width: 200,
        render: (text, record, index) => {
          return (
            <div>
              <span className="theme cursor mar-r-8" onClick={() => window.open(record.paymentVoucher)}>预览</span>
              <span className="theme cursor" onClick={() => downloadFileFun(record.paymentVoucher)}>下载</span>
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
    // console.log('filterData', filterData);
    const params = {
      advanceNo: this.props.advanceNo,
      start: filterData.timeArr && filterData.timeArr.length ? filterData.timeArr[0].format('YYYY-MM-DD') + ' 00:00:00' : '',
      end: filterData.timeArr && filterData.timeArr.length ? filterData.timeArr[1].format('YYYY-MM-DD') + ' 23:59:59' : '',
      repayType: filterData.repayType,
      tradeSt: filterData.tradeSt,
    };

    getRepayDetailApi(params).then(data => {
      this.setState({
        data: data.data || [],
        total: data.total
      });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

  onConfirm = (data) => {
    this.actionDrawer.showDrawer('add');
  }

  onView = (data) => {
    this.actionDrawer.showDrawer('view', undefined, data.paymentNo);
  }

  render() {
    // const {
    //   total, pageNum, pageSize, data
    // } = this.state;
    const { data } = this.state;

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
            scroll={{ x: 3800 }}
            className="fixedWidthTable"
            rowKey="id"
            style={{ marginTop: '20px' }}
            pagination={false}
            // pagination={{
            //   total: total,showTotal: total => `共 ${total} 条记录`,
            //   current: pageNum,
            //   pageSize: pageSize,
            //   hideOnSinglePage: true,
            //   showSizeChanger: true,
            //   showQuickJumper: true,
            //   onChange: (page, pageSize) => { this.onCurrentChange(page); },
            //   onShowSizeChange: (current, size) => { this.onSizeChange(size); },
            // }}
          />
        </Spin>
      </div>
    );
  }
}

export default RepayDetail;
