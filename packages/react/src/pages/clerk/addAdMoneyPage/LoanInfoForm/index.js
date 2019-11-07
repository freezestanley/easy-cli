import React, { Component } from 'react';
import {
  Form, Select, DatePicker, Radio,
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import ImgUpload from '../components/ImgUpload';
import {
  RELATIONSHIP_ENUM, GENDER, CARD_TYPE, MARRY_FLAG, HIGHEST_EDU, HIGHEST_DEG, INDUSTRY, LIVING_CONDITION,
} from 'utils/constant';
import moment from 'moment';

import styles from './index.module.scss';

const { Option } = Select;

@Form.create({
  name: 'loanInfoForm'
})
class LoanInfoForm extends Component {
  state = {
    originData: {
      relationship: '',
      otherDesc: '',
      loanCustomerName: '',
      gender: '',
      birthday: '',
      cardType: 'I',
      idCard: '',
      cardExpirationDate: '',
      idCardF: '',
      idCardB: '',
      phone: '',
      marryFlag: '',
      highestEdu: '',
      highestDeg: '',
      occupation: '',
      company: '',
      industry: '',
      duty: '',
      title: '',
      address: '',
      postCode: '',
      livingCondition: '',
      postalAddr: '',
      postalAddrCode: '',
      homeAddr: '',
      spouseInfo: {
        name: '',
        cardType: 'I',
        idCard: '',
        // company: '',
        // phone: '',
      },
    }
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, } = this.state;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <div className={styles['form-class']}>
        <Form colon={false} hideRequiredMark={true} {...formItemLayout} labelAlign="left" layout="horizontal">
          <div className={styles.title}>借款人信息</div>
          <Form.Item label="与被保险人关系">
            {getFieldDecorator('relationship', {
              initialValue: originData.relationship,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Radio.Group>
                {Object.keys(RELATIONSHIP_ENUM).map((item, index) => {
                  return (<Radio key={index} value={item}>{RELATIONSHIP_ENUM[item]}</Radio>);
                })}
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="其他关系说明">
            {getFieldDecorator('otherDesc', {
              initialValue: originData.otherDesc,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="姓名">
            {getFieldDecorator('loanCustomerName', {
              initialValue: originData.loanCustomerName,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('gender', {
              initialValue: originData.gender,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Radio.Group>
                {Object.keys(GENDER).map((item, index) => {
                  return (<Radio key={index} value={item}>{GENDER[item]}</Radio>);
                })}
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item label="出生日期">
            {getFieldDecorator('birthday', {
              initialValue: originData.birthday ? moment(originData.birthday, 'YYYY-MM-DD') : undefined,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <DatePicker />,
            )}
          </Form.Item>
          <Form.Item label="证件类型">
            {getFieldDecorator('cardType', {
              initialValue: originData.cardType || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(CARD_TYPE).map((item, index) => {
                  return (<Option key={index} value={item}>{CARD_TYPE[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="证件号码">
            {getFieldDecorator('idCard', {
              initialValue: originData.idCard,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="证件到期日">
            {getFieldDecorator('cardExpirationDate', {
              initialValue: originData.cardExpirationDate ? moment(originData.cardExpirationDate, 'YYYY-MM-DD') : undefined,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <DatePicker />,
            )}
          </Form.Item>
          <Form.Item label="证件正面">
            {getFieldDecorator('idCardF', {
              initialValue: originData.idCardF ? [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: originData.idCardF,
              }] : [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <ImgUpload />,
            )}
          </Form.Item>
          <Form.Item label="证件反面">
            {getFieldDecorator('idCardB', {
              initialValue: originData.idCardB ? [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: originData.idCardB,
              }] : [],
              valuePropName: 'fileList',
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <ImgUpload />,
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
              initialValue: originData.phone,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="婚姻状况">
            {getFieldDecorator('marryFlag', {
              initialValue: originData.marryFlag || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(MARRY_FLAG).map((item, index) => {
                  return (<Option key={index} value={item}>{MARRY_FLAG[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="最高学历">
            {getFieldDecorator('highestEdu', {
              initialValue: originData.highestEdu || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(HIGHEST_EDU).map((item, index) => {
                  return (<Option key={index} value={item}>{HIGHEST_EDU[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="最高学位">
            {getFieldDecorator('highestDeg', {
              initialValue: originData.highestDeg || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(HIGHEST_DEG).map((item, index) => {
                  return (<Option key={index} value={item}>{HIGHEST_DEG[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="职业">
            {getFieldDecorator('occupation', {
              initialValue: originData.occupation,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="单位名称">
            {getFieldDecorator('company', {
              initialValue: originData.company,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="单位所属行业">
            {getFieldDecorator('industry', {
              initialValue: originData.industry || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(INDUSTRY).map((item, index) => {
                  return (<Option key={index} value={item}>{INDUSTRY[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="职务">
            {getFieldDecorator('duty', {
              initialValue: originData.duty,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="职称">
            {getFieldDecorator('title', {
              initialValue: originData.title,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="居住地址">
            {getFieldDecorator('address', {
              initialValue: originData.address,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="居住地邮政编码">
            {getFieldDecorator('postCode', {
              initialValue: originData.postCode,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="居住状况">
            {getFieldDecorator('livingCondition', {
              initialValue: originData.livingCondition || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(LIVING_CONDITION).map((item, index) => {
                  return (<Option key={index} value={item}>{LIVING_CONDITION[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="通讯地址">
            {getFieldDecorator('postalAddr', {
              initialValue: originData.postalAddr,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="通讯地址邮政编码">
            {getFieldDecorator('postalAddrCode', {
              initialValue: originData.postalAddrCode,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="住宅地址">
            {getFieldDecorator('homeAddr', {
              initialValue: originData.homeAddr,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>

          <div className={styles.title}>借款人配偶信息</div>
          <Form.Item label="姓名">
            {getFieldDecorator('spouseInfo.name', {
              initialValue: originData.spouseInfo.name,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="证件类型">
            {getFieldDecorator('spouseInfo.cardType', {
              initialValue: originData.spouseInfo.cardType || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(CARD_TYPE).map((item, index) => {
                  return (<Option key={index} value={item}>{CARD_TYPE[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="证件号码">
            {getFieldDecorator('spouseInfo.idCard', {
              initialValue: originData.spouseInfo.idCard,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          {/* <Form.Item label="工作单位">
            {getFieldDecorator('spouseInfo.company', {
              initialValue: originData.spouseInfo.company,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="联系电话">
            {getFieldDecorator('spouseInfo.phone', {
              initialValue: originData.spouseInfo.phone,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item> */}
        </Form>
      </div>
    );
  }
}
 
export default LoanInfoForm;
