import React, { Component } from 'react';
import { Drawer, Anchor, } from 'antd';
import ApplyInfo from './ApplyInfo/index.js';
import LoanInfo from './LoanInfo/index';
import RepayPlan from './RepayPlan/index';
import RepayDetail from './RepayDetail/index';

import styles from './index.module.scss';

import { getApplyInfoApi, getLoanInfoApi, getRepayPlanApi } from 'api/common/adMoneyManage';

const { Link } = Anchor;

class DetailDrawer extends Component {
  state = {
    loading: false,
    visible: false,
    record: {},
    applyInfoData: {},
    loanInfoData: {},
    repayPlanData: {},
  }

  getData = (record) => {
    this.setState({ record });
    this.getApplyInfo(record.id);
    this.getLoanInfo(record.advanceNo);
    this.getRepayPlan(record.advanceNo);
  }

  getApplyInfo = (id) => {
    getApplyInfoApi(id).then(res => {
      this.setState({
        applyInfoData: res.data || {},
      });
    });
  }

  getLoanInfo = (advanceNo) => {
    getLoanInfoApi(advanceNo).then(res => {
      this.setState({
        loanInfoData: res.data || {},
      });
    });
  }

  getRepayPlan = (advanceNo) => {
    getRepayPlanApi(advanceNo).then(res => {
      this.setState({
        repayPlanData: res.data || {},
      });
    });
  }

  showDrawer = (record) => {
    this.setState({
      visible: true,
    });
    this.getData(record);
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      visible, record, applyInfoData, loanInfoData, repayPlanData, 
    } = this.state;

    return (
      <Drawer
        title=""
        placement="right"
        width={1063}
        onClose={this.onClose}
        visible={visible}
        className={styles['drawer-container']}
      >
        <div className={styles['drawer-content']}>
          <div className={styles.title}>垫资详情</div>
          <div id="drawer-scroll-content" className={styles.content}>
            <div className={styles['info-container']}>
              <div id="anchor-item-1" className={styles['anchor-title']}>申请信息</div>
              <div id="anchor-item-2" className={styles['anchor-title']}>预审信息</div>
              <div id="anchor-item-3" className={styles['anchor-title']}>派单服务商</div>
              <div id="anchor-item-4" className={styles['anchor-title']}>服务商收单</div>
              <div id="anchor-item-5" className={styles['anchor-title']}>派单业务员</div>
              <div id="anchor-item-6"></div>
              <ApplyInfo caseInfo={applyInfoData.caseInfo} caseMaterial={applyInfoData.caseMaterial} loanCustomer={applyInfoData.loanCustomer}></ApplyInfo>
              <div id="anchor-item-7" className={styles['anchor-title']}>客户确认信息</div>
              <div id="anchor-item-8" className={styles['anchor-title']}>保险审核信息</div>
              <div id="anchor-item-9" className={styles['anchor-title']}>资金方审核信息</div>
              <div id="anchor-item-10" className={styles['anchor-title']}>合同信息</div>
              <div id="anchor-item-11" className={styles['anchor-title']}>放款信息</div>
              <LoanInfo loanInfoData={loanInfoData}></LoanInfo>
              <div id="anchor-item-12" className={styles['anchor-title']}>缴费资料</div>
              <div id="anchor-item-13" className={styles['anchor-title']}>展期申请</div>
              <div id="anchor-item-14" className={styles['anchor-title']}>展期保险审核</div>
              <div id="anchor-item-15" className={styles['anchor-title']}>展期资金方审核</div>
              <div id="anchor-item-16" className={styles['anchor-title']}>出院资料</div>
              <div id="anchor-item-17" className={styles['anchor-title']}>还款计划</div>
              <RepayPlan repayPlanData={repayPlanData}></RepayPlan>
              <div id="anchor-item-18" className={styles['anchor-title']}>还款明细</div>
              <RepayDetail advanceNo={record.advanceNo}></RepayDetail>
            </div>
            <div className={styles['anchor-container']}>
              <Anchor getContainer={() => document.querySelector('#drawer-scroll-content')}>
                <Link href="#anchor-item-1" title="申请信息" />
                <Link href="#anchor-item-2" title="预审信息" />
                <Link href="#anchor-item-3" title="派单服务商" />
                <Link href="#anchor-item-4" title="服务商收单" />
                <Link href="#anchor-item-5" title="派单业务员" />
                <Link href="#anchor-item-6" title="垫资申请信息与资料" />
                <Link href="#anchor-item-7" title="客户确认信息" />
                <Link href="#anchor-item-8" title="保险审核信息" />
                <Link href="#anchor-item-9" title="资金方审核信息" />
                <Link href="#anchor-item-10" title="合同信息" />
                <Link href="#anchor-item-11" title="放款信息" />
                <Link href="#anchor-item-12" title="缴费资料" />
                <Link href="#anchor-item-13" title="展期申请" />
                <Link href="#anchor-item-14" title="展期保险审核" />
                <Link href="#anchor-item-15" title="展期资金方审核" />
                <Link href="#anchor-item-16" title="出院资料" />
                <Link href="#anchor-item-17" title="还款计划" />
                <Link href="#anchor-item-18" title="还款明细" />
              </Anchor>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }
}
 
export default DetailDrawer;
