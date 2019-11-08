import React, { Component } from 'react';
import {
  Form, Input, Select, DatePicker, Radio, Checkbox,
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import ImgUpload from '../components/ImgUpload';
import { CARD_TYPE, CAUSE_REASON, CAPITAL_TYPE, } from 'utils/constant';
import moment from 'moment';

import styles from './index.module.scss';

const { Option } = Select;
const { TextArea } = Input;

@Form.create({
  name: 'basicInfoForm'
})
class BasicInfoForm extends Component {
  state = {
    originData: {
      policyNo: '',
      caseNo: '',
      advanceNo: '',
      capitalType: '',
      insuranceName: '',
      insuranceCardType: 'I',
      idCardF: 'http://za-charity-tst.oss-cn-hzfinance.aliyuncs.com/下载_1564639242946.png',
      idCardB: 'http://za-charity-tst.oss-cn-hzfinance.aliyuncs.com/下载_1564734021889.png',
      hospital: '',
      reason: '',
      reasonDesc: '',
      hospitalizationDate: '2019-10-10',
      rtgs: 'Y',
      stamp: 'N',
      advanceAmount: '',
      capitalAmount: '',
      otherAcInfo: {
        insuredSocialNo: '',
        insuredSocialAddress: '',
        insuredIllness: '',
        desc: '',
      }
    }
  }

  // 医保是否实时结算 change
  onRtgsChange = (e) => {
    const value = e.target.value;
    if (value === 'Y') {
      this.setState({
        originData: Object.assign({}, this.state.originData, {
          rtgs: 'Y',
          stamp: 'N'
        })
      });
    } else {
      this.setState({
        originData: Object.assign({}, this.state.originData, {
          rtgs: 'N',
          stamp: 'Y'
        })
      });
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
          <div className={styles.title}>基本信息</div>
          <Form.Item label="保单号">
            {getFieldDecorator('policyNo', {
              initialValue: originData.policyNo,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="案件号">
            {getFieldDecorator('caseNo', {
              initialValue: originData.caseNo,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="垫付号">
            {getFieldDecorator('advanceNo', {
              initialValue: originData.advanceNo,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="垫资类型">
            {getFieldDecorator('capitalType', {
              initialValue: originData.capitalType || undefined,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(CAPITAL_TYPE).map((item, index) => {
                  return (<Option key={index} value={item}>{CAPITAL_TYPE[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="被保险人">
            {getFieldDecorator('insuranceName', {
              initialValue: originData.insuranceName,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="被保险人证件类型">
            {getFieldDecorator('insuranceCardType', {
              initialValue: originData.insuranceCardType || undefined,
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
          <Form.Item label="出险医院">
            {getFieldDecorator('hospital', {
              initialValue: originData.hospital,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="出险原因">
            {getFieldDecorator('reason', {
              initialValue: originData.reason,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <Select placeholder="请选择">
                {Object.keys(CAUSE_REASON).map((item, index) => {
                  return (<Option key={index} value={item}>{CAUSE_REASON[item]}</Option>);
                })}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="原因描述">
            {getFieldDecorator('reasonDesc', {
              initialValue: originData.reasonDesc,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TextArea rows={4} maxLength={200} placeholder="出险原因描述" />,
            )}
          </Form.Item>
          <Form.Item label="住院日期">
            {getFieldDecorator('hospitalizationDate', {
              initialValue: originData.hospitalizationDate ? moment(originData.hospitalizationDate, 'YYYY-MM-DD') : undefined,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <DatePicker />,
            )}
          </Form.Item>
          <Form.Item
            label="医保是否实时结算"
            style={{
              marginBottom: originData.rtgs === 'Y' ? '20px' : '0px',
            }}
          >
            {getFieldDecorator('rtgs', {
              initialValue: originData.rtgs,
              rules: [
                { required: true, message: '请选择', },
              ],
            })(
              <Radio.Group onChange={this.onRtgsChange}>
                <Radio value="Y">是</Radio>
                <Radio value="N">否</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
          {originData.rtgs !== 'Y' ? (
            <Form.Item label="" wrapperCol={{ offset: 5 }}>
              {getFieldDecorator('stamp', {
                initialValue: [originData.stamp],
              })(
                <Checkbox.Group>
                  <Checkbox value="Y">先向保险公司理赔并接受保险公司在发票上盖章</Checkbox>
                </Checkbox.Group>,
              )}
            </Form.Item>
          ) : null}
          
          <Form.Item label="医院预交金额(元)">
            {getFieldDecorator('advanceAmount', {
              initialValue: originData.advanceAmount,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="申请垫资金额(元)">
            {getFieldDecorator('capitalAmount', {
              initialValue: originData.capitalAmount,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>

          <div className={styles.title}>其他信息</div>
          <Form.Item label="被保人社保号">
            {getFieldDecorator('otherAcInfo.insuredSocialNo', {
              initialValue: originData.otherAcInfo.insuredSocialNo,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="社保所在地">
            {getFieldDecorator('otherAcInfo.insuredSocialAddress', {
              initialValue: originData.otherAcInfo.insuredSocialAddress,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="被保人既往病情">
            {getFieldDecorator('otherAcInfo.insuredIllness', {
              initialValue: originData.otherAcInfo.insuredIllness,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="备注说明">
            {getFieldDecorator('otherAcInfo.desc', {
              initialValue: originData.otherAcInfo.desc,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TextArea rows={4} maxLength={100} />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
 
export default BasicInfoForm;
