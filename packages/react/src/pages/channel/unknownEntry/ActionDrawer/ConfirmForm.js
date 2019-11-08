import React, { Component } from 'react';
import { Form, Input, Select, } from 'antd';
import { getAdNoApi, getInfoByPaymentNoApi, } from 'api/channel/unknownEntry';

const { TextArea } = Input;
const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    getAdNoApi({
      caseNo: value,
      pageNum: 1,
      pageSize: 20,
    }).then(d => {
      if (currentValue === value) {
        const { data = [] } = d;
        
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

@Form.create({
  name: 'confirmForm'
})
class ConfirmForm extends Component {
  state = {
    data: [],
    value: undefined,
    info: {},
  };

  handleSearch = value => {
    fetch(value, data => {
      this.setState({ data: data });
    });
  };

  handleChange = value => {
    this.setState({ value });
    this.getInfoByPaymentNo(value);
  };

  getInfoByPaymentNo = (caseNo) => {
    getInfoByPaymentNoApi(caseNo).then(res => {
      this.setState({ info: res.data });
    });
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    // const { originData, } = this.props;
    const { data, info } = this.state;

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    const options = data.map(d => <Option key={d}>{d}</Option>);

    return (
      <div className="">
        <Form colon={false} hideRequiredMark={true} {...formItemLayout} labelAlign="left" style={{ paddingBottom: '53px' }}>

          <Form.Item label="对应案件号">
            {getFieldDecorator('caseNo', {
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <Select
                showSearch
                // labelInValue
                // value={this.state.value}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                notFoundContent={null}
                placeholder="请选择"
              >
                {options}
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="对应垫付号">
            {info.advanceNo}
          </Form.Item>
          <Form.Item label="被保险人名称">
            {info.insuranceName}
          </Form.Item>
          <Form.Item label="垫付总额(元)">
            {info.capitalAmount}
          </Form.Item>
          <Form.Item label="案件剩余应还总额(元)">
            {info.returnedPri}
          </Form.Item>
          <Form.Item label="确认说明">
            {getFieldDecorator('confirmNote', {
              // initialValue: originData.otherDesc,
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

export default ConfirmForm;
