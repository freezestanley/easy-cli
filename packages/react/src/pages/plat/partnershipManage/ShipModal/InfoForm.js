import React, { Component } from 'react';
import { Form, Select, } from 'antd';
import { getOrgListApi } from 'api/plat/partnershipManage';

const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, type, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    getOrgListApi({
      orgType: type,
      orgName: value,
      status: 'VALID',
      pageNum: 1,
      pageSize: 20,
    }).then(d => {
      if (currentValue === value) {
        const { data } = d;
        const result = [];
        data.forEach(r => {
          result.push({
            value: r.id,
            text: r.orgName,
          });
        });
        callback(result);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

@Form.create({
  name: 'infoForm'
})
class InfoForm extends Component {
  state = {
    insData: [],
    insValue: undefined,
    fundData: [],
    fundValue: undefined,
  };

  handleInsSearch = value => {
    fetch(value, 'INS', data => this.setState({ insData: data }));
  };

  handleInsChange = value => {
    this.setState({ insValue: value });
  };

  handleInsFocus = () => {
    if (this.state.insData.length) return;
    const insure = this.props.form.getFieldValue('insure');
    const value = insure ? insure.label : '';
    fetch(value, 'INS', data => this.setState({ insData: data }));
  }

  handleFundSearch = value => {
    fetch(value, 'FUND', data => this.setState({ fundData: data }));
  };

  handleFundChange = value => {
    this.setState({ fundValue: value });
  };

  handleFundFocus = () => {
    if (this.state.fundData.length) return;
    const fund = this.props.form.getFieldValue('fund');
    const value = fund ? fund.label : '';
    fetch(value, 'FUND', data => this.setState({ fundData: data }));
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    const { originData, } = this.props;
    const { insData, fundData } = this.state;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const insOptions = insData.map(d => <Option key={d.value}>{d.text}</Option>);
    const fundOptions = fundData.map(d => <Option key={d.value}>{d.text}</Option>);

    return (
      <div className="">
        <Form colon={false} hideRequiredMark={true} {...formItemLayout}>
          <Form.Item label="渠道方名称">
            {getFieldDecorator('insure', {
              initialValue: originData.insureId ? {
                key: originData.insureId + '' || undefined,
                label: originData.insureName
              } : undefined,
              rules: [
                { required: true, message: '请输入', },
              ],
            })(
              <Select
                showSearch
                labelInValue
                // value={this.state.value}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleInsSearch}
                onChange={this.handleInsChange}
                onFocus={this.handleInsFocus}
                notFoundContent={null}
                placeholder="请选择"
              >
                {insOptions}
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="资金方名称">
            {getFieldDecorator('fund', {
              initialValue: originData.fundId ? {
                key: originData.fundId + '' || undefined,
                label: originData.fundName
              } : undefined,
              rules: [
                {
                  required: true,
                  message: '请输入',
                },
              ],
            })(
              <Select
                showSearch
                labelInValue
                // value={this.state.value}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleFundSearch}
                onChange={this.handleFundChange}
                onFocus={this.handleFundFocus}
                notFoundContent={null}
                placeholder="请选择"
              >
                {fundOptions}
              </Select>,
            )}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default InfoForm;
