import React, { Component } from 'react';
import { Steps, Button, message, } from 'antd';
import BasicInfoForm from './BasicInfoForm';
import LoanInfoForm from './LoanInfoForm';
import UploadInfoForm from './UploadInfoForm';

import { addCaseInfoApi } from 'api/clerk/addAdMoneyPage';

import styles from './index.module.scss';
import { Promise } from 'q';

const { Step } = Steps;

class AddAdMoney extends Component {
  state = {
    current: 0, // 从0开始计数
    basicFormData: {},
    loanFormData: {},
    uploadFormData: {},
  }

  // 上一步
  prevStep = () => {
    this.setState({
      current: this.state.current - 1
    });
  }

  // 下一步
  nextStep = () => {
    const current = this.state.current;

    if (current === 0) { // 基本信息
      this.getFormData('basicInfoForm').then(data => {
        console.log('基本信息:', data);
        this.setState({
          current: 1,
          basicFormData: data,
        });
      });
    } else if (current === 1) { // 借款人信息
      this.getFormData('loanInfoForm').then(data => {
        console.log('借款人信息:', data);
        this.setState({
          current: 2,
          loanFormData: data,
        });
      });
    }
  }

  // 暂存
  onStorage = () => {
    const current = this.state.current;

    if (current === 0) { // 基本信息
      this.getFormData('basicInfoForm').then(data => {
        console.log('基本信息:', data);
      });
    } else if (current === 1) { // 借款人信息
      this.getFormData('loanInfoForm').then(data => {
        console.log('借款人信息:', data);
      });
    } else if (current === 2) { // 上传资料
      this.getFormData('uploadInfoForm').then(data => {
        console.log('上传资料:', data);
      });
    }
  }

  // 获取表单数据
  getFormData = (formName) => {
    return Promise((resolve, reject) => {
      this[formName].props.form.validateFieldsAndScroll((err, data) => {
        if (!err) {
          if (formName === 'basicInfoForm') { // 基本信息
            data.hospitalizationDate = data.hospitalizationDate.format('YYYY-MM-DD');
            data.stamp = data.stamp ? data.stamp.toString() : 'N';
            data.idCardB = data.idCardB[0].url;
            data.idCardF = data.idCardF[0].url;
          } else if (formName === 'loanInfoForm') { // 借款人信息
            data.birthday = data.birthday.format('YYYY-MM-DD');
            data.cardExpirationDate = data.cardExpirationDate.format('YYYY-MM-DD');
            data.idCardB = data.idCardB[0].url;
            data.idCardF = data.idCardF[0].url;
          } else if (formName === 'uploadInfoForm') { // 上传资料
            data.medicalHistoryList = data.medicalHistoryList.map(this.getNameAndUrl);
            data.bandCardList = data.bandCardList.map(this.getNameAndUrl);
            data.claimsApplication = data.claimsApplication.map(this.getNameAndUrl);
            data.securityCardList = data.securityCardList.map(this.getNameAndUrl);
            data.inpatientMedicalRecords = data.inpatientMedicalRecords.map(this.getNameAndUrl);
            data.admissionNoticeList = data.admissionNoticeList.map(this.getNameAndUrl);
            data.advanceAmountNoticeList = data.advanceAmountNoticeList.map(this.getNameAndUrl);
          }
          resolve(data);
        }
      });
    });
  }

  getNameAndUrl = (item) => {
    return {
      name: item.name,
      url: item.url,
    };
  }

  submit = () => {
    this.getFormData('uploadInfoForm').then(data => {
      console.log('上传资料:', data);
      const { basicFormData, loanFormData } = this.state;
      addCaseInfoApi({
        ac: basicFormData,
        lc: loanFormData,
        cm: data,
      }).then(res => {
        message.success('添加成功');
        this.props.history.go(-1);
      });
    });
  }

  render() {
    const { current, basicFormData } = this.state;

    return (
      <div className={styles['add-ad-money-page']}>
        <div className={styles['step-block']}>
          <Steps current={current} style={{ width: '644px' }}>
            <Step title="基本信息" />
            <Step title="借款人信息" />
            <Step title="资料上传" />
          </Steps>
        </div>

        <div style={{ paddingBottom: '53px' }}>
          <div
            style={{
              display: current === 0 ? 'block' : 'none'
            }}
          >
            <BasicInfoForm
              wrappedComponentRef={(form) => this.basicInfoForm = form}
              originData={basicFormData}
            >
            </BasicInfoForm>
          </div>
          <div
            style={{
              display: current === 1 ? 'block' : 'none'
            }}
          >
            <LoanInfoForm
              wrappedComponentRef={(form) => this.loanInfoForm = form}
            >
            </LoanInfoForm>
          </div>
          <div
            style={{
              display: current === 2 ? 'block' : 'none'
            }}
          >
            <UploadInfoForm
              wrappedComponentRef={(form) => this.uploadInfoForm = form}
            >
            </UploadInfoForm>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            left: 200,
            bottom: 0,
            right: 0,
            borderTop: '1px solid #e9e9e9',
            padding: '10px 40px',
            background: '#fff',
            zIndex: '999',
          }}
        >
          {current > 0 ? (
            <Button style={{ marginRight: 8 }} onClick={this.prevStep}>上一步</Button>
          ) : null}
          <Button style={{ marginRight: 8 }} onClick={this.onStorage}>暂存</Button>
          {current < 2 ? (
            <Button type="primary" onClick={this.nextStep}>下一步</Button>
          ) : null}
          {current === 2 ? (
            <Button type="primary" onClick={this.submit}>提交垫资申请资料</Button>
          ) : null}
        </div>  
      </div>
    );
  }
}
 
export default AddAdMoney;
