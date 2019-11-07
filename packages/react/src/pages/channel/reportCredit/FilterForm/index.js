import React, { Component } from 'react';
import {
  Form, Select, Button,
} from 'antd';
import TrimInput from 'components/TrimInput/index';
import styles from './index.module.scss';
import { REPORT_CREDIT_STATUS, YUQI_STATUS } from 'utils/constant';

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
        <Form colon={false} layout="inline" className={styles['form-class']}>
          <div className="filter-form-line">
            <Form.Item label="案件号">
              {getFieldDecorator('caseNo', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="垫付号" className={styles['labe-width-4']}>
              {getFieldDecorator('advanceNo', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="逾期天数">
              {getFieldDecorator('overDays', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(YUQI_STATUS).map((item, index) => {
                    return (<Option key={index} value={item}>{YUQI_STATUS[item]}</Option>);
                  })}
                </Select>,
              )}
            </Form.Item>
            <Form.Item label="征信上报状态">
              {getFieldDecorator('queryType', {
                rules: [],
                initialValue: '',
              })(
                <Select>
                  <Option value="">全部</Option>
                  {Object.keys(REPORT_CREDIT_STATUS).map((item, index) => {
                    return (<Option key={index} value={item}>{REPORT_CREDIT_STATUS[item]}</Option>);
                  })}
                </Select>,
              )}
            </Form.Item>
          </div>
          <div className="filter-form-line">
            <Form.Item label="借款人">
              {getFieldDecorator('bwName', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item label="被保险人">
              {getFieldDecorator('insureName', {
                rules: [],
                initialValue: '',
              })(
                <TrimInput placeholder="请输入" />,
              )}
            </Form.Item>
            <Form.Item style={{ width: '266px' }}></Form.Item>
            <Form.Item style={{ width: '294px' }} className="tar">
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
