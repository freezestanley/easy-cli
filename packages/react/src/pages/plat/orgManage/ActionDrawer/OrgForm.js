import React, { Component } from 'react';
import { Form, Input, Select, } from 'antd';
import TrimInput from 'components/TrimInput/index';
import { PLAT_ORG_TYPE } from 'utils/constant';
import { isUSCC, isPhone, isIdNo } from 'utils/validate';

const { Option } = Select;
const { TextArea } = Input;

@Form.create({
  name: 'orgForm'
})
class OrgForm extends Component {
  state = {
  };

  unicodeValidator = (rule, value, callback) => {
    if (!isUSCC(value)) {
      return callback('统一社会信用代码格式不正确');
    }
    return callback();
  }

  isPhoneValidator = (rule, value, callback) => {
    if (!isPhone(value)) {
      return callback('手机格式不正确');
    }
    return callback();
  }

  isIdNoValidator = (rule, value, callback) => {
    if (!isIdNo(value)) {
      return callback('证件号格式不正确');
    }
    return callback();
  }


  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, actionType, } = this.props;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <div className="">
        <Form colon={false} hideRequiredMark={true} {...formItemLayout} labelAlign="left" style={{ paddingBottom: '53px' }}>
          {actionType === 'add' ? (
            <Form.Item label="机构类型">
              {getFieldDecorator('orgType', {
                initialValue: originData.orgType || undefined,
                rules: [
                  { required: true, message: '请选择', },
                ],
              })(
                <Select placeholder="请选择" disabled={actionType !== 'add'}>
                  {Object.keys(PLAT_ORG_TYPE).map((item, index) => {
                    return (<Option key={index} value={item}>{PLAT_ORG_TYPE[item]}</Option>);
                  })}
                </Select>,
              )}
            </Form.Item>
          ) : (
            <Form.Item label="机构类型">
              {PLAT_ORG_TYPE[originData.orgType]}
            </Form.Item>
          ) }

          {actionType !== 'add' ? (
            <Form.Item label="机构代码">
              {originData.orgCode}
            </Form.Item>
          ) : null}

          <Form.Item label="机构名称">
            {getFieldDecorator('orgName', {
              initialValue: originData.orgName,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>

          {actionType === 'add' ? (
            <Form.Item label="统一社会信用代码">
              {getFieldDecorator('creditCode', {
                initialValue: originData.creditCode,
                rules: [
                  { required: true, message: '请输入', },
                  { validator: this.unicodeValidator, },
                ],
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
          ) : (
            <Form.Item label="统一社会信用代码">
              {originData.creditCode}
            </Form.Item>
          )}
          

          <Form.Item label="法人姓名">
            {getFieldDecorator('legalName', {
              initialValue: originData.legalName,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="法人证件号">
            {getFieldDecorator('legalIdCard', {
              initialValue: originData.legalIdCard,
              rules: [
                { required: true, message: '请输入', },
                { validator: this.isIdNoValidator },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="法人手机号">
            {getFieldDecorator('legalPhone', {
              initialValue: originData.legalPhone,
              rules: [
                { required: true, message: '请输入', },
                { validator: this.isPhoneValidator },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="联系人">
            {getFieldDecorator('contectName', {
              initialValue: originData.contectName,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="联系人手机号">
            {getFieldDecorator('contectPhone', {
              initialValue: originData.contectPhone,
              rules: [
                { required: true, message: '请输入', },
                { validator: this.isPhoneValidator },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="联系人邮箱">
            {getFieldDecorator('contectMail', {
              initialValue: originData.contectMail,
              rules: [
                { required: true, message: '请输入', },
                { type: 'email', message: '邮箱格式不合法', },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>

          {actionType === 'add' ? (
            <Form.Item label="管理员账号">
              {getFieldDecorator('loginName', {
                initialValue: originData.loginName,
                rules: [
                  { required: true, message: '请输入', },
                ],
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
          ) : (
            <Form.Item label="管理员账号">
              {originData.loginName}
            </Form.Item>
          )}
          
          <Form.Item label="其他说明">
            {getFieldDecorator('otherDesc', {
              initialValue: originData.otherDesc,
            })(
              <TextArea rows={4} maxLength={100} />,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default OrgForm;
