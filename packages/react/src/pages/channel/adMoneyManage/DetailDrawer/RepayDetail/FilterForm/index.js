import React, { Component } from 'react';
import {
  Form, Select, Button, DatePicker, message,
} from 'antd';
import { REPAY_STATUS, REPAY_TYPE } from 'utils/constant';

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
            <Form.Item label="创建时间">
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
            <Form.Item label="还款方式">
              {getFieldDecorator('repayType', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(REPAY_TYPE).map((item, index) => {
                    return (<Option key={index} value={item}>{REPAY_TYPE[item]}</Option>);
                  })}
                </Select>,
              )}
            </Form.Item>
          </div>
          <div className="filter-form-line">
            <Form.Item label="还款结果">
              {getFieldDecorator('tradeSt', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(REPAY_STATUS).map((item, index) => {
                    return (<Option key={index} value={item}>{REPAY_STATUS[item]}</Option>);
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
