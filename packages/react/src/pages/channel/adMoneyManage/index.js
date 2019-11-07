import React, { Component } from 'react';
import { Table, Spin, } from 'antd';
import FilterForm from './FilterForm/index';
import DetailDrawer from './DetailDrawer/index.js';
import styles from './index.module.scss';

import { CAPITAL_TYPE, CARD_TYPE, AD_MONEY_STATUS } from 'utils/constant';
import { getListApi } from 'api/common/adMoneyManage';

class AdMoneyManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      // pagination 配置
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 表格数据
      data: [],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getColumns() {
    return [
      {
        title: '案件号',
        width: 100,
        dataIndex: 'caseNo',
        key: 'caseNo',
        fixed: 'left',
      },
      {
        title: '垫付号',
        width: 150,
        dataIndex: 'advanceNo',
        key: 'advanceNo',
      },
      {
        title: '被保险人名称',
        width: 150,
        dataIndex: 'insuranceName',
        key: 'insuranceName',
      },
      {
        title: '被保险人证件类型',
        width: 150,
        dataIndex: 'insuranceCardType',
        key: 'insuranceCardType',
        render: (text, record, index) => {
          return CARD_TYPE[record.insuranceCardType];
        }
      },
      {
        title: '被保险人证件号码',
        width: 150,
        dataIndex: 'insuranceIdCard',
        key: 'insuranceIdCard',
      },
      {
        title: '保单号',
        dataIndex: 'policyNo',
        key: 'policyNo',
        width: 150,
      },
      {
        title: '出险医院',
        dataIndex: 'hospital',
        key: 'hospital',
        width: 150,
      },
      {
        title: '医院所属省市',
        dataIndex: 'hospitalProvince',
        key: '3',
        width: 150,
        render: (text, record, index) => {
          return record.hospitalProvince + '/' + record.hospitalCity;
        }
      },
      {
        title: '出险原因',
        dataIndex: 'reason',
        key: 'reason',
        width: 150,
      },
      {
        title: '住院时间',
        dataIndex: 'hospitalizationDate',
        key: 'hospitalizationDate',
        width: 150,
      },
      {
        title: '联系人手机号',
        dataIndex: 'contactPhone',
        key: 'contactPhone',
        width: 150,
      },
      {
        title: '申请时间',
        dataIndex: 'capitalApplyTime',
        key: 'capitalApplyTime',
        width: 150,
      },
      {
        title: '服务商',
        dataIndex: 'spName',
        key: 'spName',
        width: 150,
      },
      {
        title: '业务员',
        dataIndex: 'clerkName',
        key: 'clerkName',
        width: 150,
      },
      {
        title: '借款人',
        dataIndex: 'address',
        key: '10',
        width: 150,
      },
      {
        title: '申请垫资金额（元）',
        dataIndex: 'capitalAmount',
        key: 'capitalAmount',
        width: 200,
      },
      {
        title: '垫资类型',
        dataIndex: 'capitalType',
        key: 'capitalType',
        width: 150,
        render: (text, record, index) => {
          return CAPITAL_TYPE[record.capitalType];
        }
      },
      {
        title: '资金方',
        dataIndex: 'fundName',
        key: '13',
        width: 150,
      },
      {
        title: '垫资状态',
        dataIndex: 'status',
        key: '14',
        width: 150,
        render: (text, record, index) => {
          return AD_MONEY_STATUS[record.status];
        }
      },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
          return (
            <div>
              <span className="theme cursor mar-r-8" onClick={() => this.viewDetail(record)}>垫资详情</span>
            </div>
          );
        },
      },
    ];
  }

  getData = () => {
    if (this.state.loading) return;
    this.setState({ loading: true });
    const filterData = this.filterForm.props.form.getFieldsValue();
    const params = {
      ...filterData,
      queryType: '',
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

  viewDetail = (data) => {
    this.detailDrawer.showDrawer(data);
  }

  render() {
    const {
      total, pageNum, pageSize, data
    } = this.state;
    return (
      <div className={styles['ad-money-manage']}>
        <Spin spinning={this.state.loading} size="large">
          {/* 筛选条件 */}
          <div className={styles['filter-container']}>
            <FilterForm wrappedComponentRef={(form) => this.filterForm = form} onSearch={this.onSearch}></FilterForm>
          </div>
          {/* 表格 */}
          <Table
            columns={this.getColumns()}
            dataSource={data}
            scroll={{ x: 2450 }}
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

          <DetailDrawer ref={(detailDrawer) => this.detailDrawer = detailDrawer}></DetailDrawer>
        </Spin>
      </div>
    );
  }
}
 
export default AdMoneyManage;
