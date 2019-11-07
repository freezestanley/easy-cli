import React, { Component } from 'react';
import {
  Form, Select,
} from 'antd';
import TrimInput from 'components/TrimInput/index';

import { isPhone } from 'utils/validate';

const { Option } = Select;

@Form.create({
  name: 'userForm'
})
class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isPhoneValidator = (rule, value, callback) => {
    if (!isPhone(value)) {
      return callback('手机格式不正确');
    }
    return callback();
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, roleData, modalType } = this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const optionNode = [];
    roleData.forEach((item, index) => {
      optionNode.push(<Option key={index} value={item.id}>{item.name}</Option>);
    });

    return (
      <div className="">
        <Form colon={false} hideRequiredMark={true} {...formItemLayout}>
          <Form.Item label="用户名称">
            {getFieldDecorator('name', {
              initialValue: originData.name,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="用户手机">
            {getFieldDecorator('phone', {
              initialValue: originData.phone,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
                { validator: this.isPhoneValidator },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="用户邮箱">
            {getFieldDecorator('email', {
              initialValue: originData.email,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
                {
                  type: 'email',
                  message: '邮箱格式不正确',
                },
              ],
            })(
              <TrimInput placeholder="请输入" />,
            )}
          </Form.Item>
          <Form.Item label="登录账号">
            {getFieldDecorator('loginName', {
              initialValue: originData.loginName,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })(
              <TrimInput placeholder="请输入" disabled={modalType !== 'add'} />,
            )}
          </Form.Item>
          <Form.Item label="系统角色">
            {getFieldDecorator('roleId', {
              initialValue: originData.roleId || undefined,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })(
              <Select placeholder="请选择">
                {optionNode}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default UserForm;
