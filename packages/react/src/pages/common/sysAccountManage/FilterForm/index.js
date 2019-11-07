import React, { Component } from 'react';
import {
  Form, Select, Button
} from 'antd';
import TrimInput from 'components/TrimInput/index';

const { Option } = Select;

@Form.create({
  name: 'filterForm'
})
class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  reset = () => {
    this.props.form.resetFields();
  }

  render() { 
    const { getFieldDecorator, } = this.props.form;
    const { onSearch } = this.props;

    return (
      <div className="filter-form">
        <Form colon={false} layout="inline">
          <div className="filter-form-line">
            <Form.Item label="用户名称">
              {getFieldDecorator('name', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="登录账号">
              {getFieldDecorator('loginName', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  <Option value="VALID">启用</Option>
                  <Option value="INVALID">停用</Option>
                </Select>,
              )}
            </Form.Item>
            <Form.Item className="tar">
              <div>
                <Button type="primary" className="mar-r-12" onClick={onSearch}>查询</Button>
                <Button onClick={this.reset}>重置</Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }
}
 
export default FilterForm;
