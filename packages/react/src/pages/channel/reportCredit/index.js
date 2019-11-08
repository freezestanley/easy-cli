import React, { Component } from 'react';
import {
  Spin, Table, Button, Modal, message,
} from 'antd';
import FilterForm from './FilterForm';

import { REPORT_CREDIT_STATUS } from 'utils/constant';

import styles from './index.module.scss';

import { getListApi, reportApi, } from 'api/channel/reportCredit';

class ReportCredit extends Component {
  state = {
    loading: false,
    // pagination 配置
    total: 0,
    pageNum: 1,
    pageSize: 10,
    // 表格数据
    data: [],
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.getData();
  }

  getColumns() {
    return [
      {
        title: '借款人',
        width: 200,
        dataIndex: 'bwName',
        key: 'bwName',
        fixed: 'left',
      },
      {
        title: '案件号',
        width: 200,
        dataIndex: 'caseNo',
        key: 'caseNo',
      },
      {
        title: '垫付号',
        dataIndex: 'advanceNo',
        key: 'advanceNo',
        width: 200,
      },
      {
        title: '申请时间',
        dataIndex: 'contectName',
        key: 'contectName',
        width: 150,
      },
      {
        title: '被保险人',
        dataIndex: 'insureName',
        key: 'insureName',
        width: 200,
      },
      {
        title: '垫资类型',
        dataIndex: 'contectPhone',
        key: 'contectPhone',
        width: 150,
      },
      {
        title: '资金方',
        dataIndex: 'fundName',
        key: 'fundName',
        width: 150,
      },
      {
        title: '剩余应还(元)',
        dataIndex: 'modifier',
        key: 'modifier',
        width: 200,
      },
      {
        title: '逾期天数',
        dataIndex: 'days',
        key: 'days',
        width: 150,
      },
      {
        title: '征信上报状态',
        dataIndex: 'status',
        key: 'status',
        width: 200,
        render: (text, record, index) => {
          return REPORT_CREDIT_STATUS[record.status];
        }
      },
      {
        title: '上报失败原因',
        dataIndex: 'reason',
        key: 'reason',
        width: 200,
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, record, index) => {
          return (
            <div>
              <span className="theme cursor mar-r-8" onClick={() => this.onView(record)}>详情</span>
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

  onView = (data) => {
    
  }

  onReport = () => {
    const selectedRowKeys = this.state.selectedRowKeys;
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择需要上报的征信数据');
      return;
    }
    Modal.confirm({
      title: '上报征信',
      content: '确认对已选择垫资上报征信？',
      onOk: () => {
        reportApi({
          idList: selectedRowKeys
        }).then(res => {
          this.onSearch();
        });
      }
    });
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {
      total, pageNum, pageSize, data, selectedRowKeys
    } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <div className={styles['report-credit']}>
        <Spin spinning={this.state.loading} size="large">
          {/* 筛选条件 */}
          <FilterForm
            wrappedComponentRef={(form) => this.filterForm = form}
            onSearch={this.onSearch}
          >
          </FilterForm>
          {/* 添加按钮 */}
          <div className={styles['add-button-container']}>
            <Button type="primary" onClick={this.onReport}>
              上报征信
            </Button>
          </div>
          {/* 表格 */}
          <Table
            rowSelection={rowSelection}
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

      </div>
    );
  }
}

export default ReportCredit;
