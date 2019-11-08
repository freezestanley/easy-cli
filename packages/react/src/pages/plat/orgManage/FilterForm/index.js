import React, { Component } from 'react';
import {
  Form, Select, Button
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import { PLAT_ORG_TYPE } from 'utils/constant';

const { Option } = Select;

@Form.create({
  name: 'filterForm'
})
class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
            <Form.Item label="机构类型">
              {getFieldDecorator('orgType', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(PLAT_ORG_TYPE).map((item, index) => {
                    return (<Option key={index} value={item}>{PLAT_ORG_TYPE[item]}</Option>);
                  })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="机构名称">
              {getFieldDecorator('orgName', {
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
