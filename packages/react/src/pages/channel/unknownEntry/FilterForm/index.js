import React, { Component } from 'react';
import {
  Form, Select, Button, DatePicker
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import { UNKONWN_ENTRY_STATUS, } from 'utils/constant';

const { RangePicker } = DatePicker;

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
            <Form.Item label="代收付申请单号">
              {getFieldDecorator('paymentNo', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="入账时间">
              {getFieldDecorator('timeArr', {
                initialValue: '',
                rules: [
                  { type: 'array', message: '请选择时间' }
                ],
              })(
                <RangePicker
                  suffixIcon=""
                  format="YYYY/MM/DD"
                />,
              )}
            </Form.Item>
            <Form.Item label="状态">
              {getFieldDecorator('status', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(UNKONWN_ENTRY_STATUS).map((item, index) => {
                    return (<Option key={index} value={item}>{UNKONWN_ENTRY_STATUS[item]}</Option>);
                  })}
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
