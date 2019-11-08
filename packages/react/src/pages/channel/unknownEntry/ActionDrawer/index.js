import React, { Component } from 'react';
import {
  message, Drawer, Spin, Button,
} from 'antd';
import ConfirmForm from './ConfirmForm';
import ViewForm from './ViewForm';

import { confirmRefundApi, getDetailApi } from 'api/channel/unknownEntry';

const defaultFormData = {
  item1: '',
  item2: '',
};

class ActionDrawer extends Component {
  state = {
    actionType: 'add',
    loading: false,
    visible: false,
    formData: defaultFormData,
    viewData: {},
    paymentNo: '',
    confirmLoading: false,
  }

  showDrawer = (type, data, paymentNo) => {
    this.setState({
      actionType: type,
      visible: true,
      formData: data || this.state.formData,
      paymentNo: paymentNo,
    });
    if (type === 'view') {
      this.getDetailData(paymentNo);
    }
  };

  getDetailData = (paymentNo) => {
    if (this.state.loading) return;
    getDetailApi(paymentNo).then(res => {
      this.setState({
        viewData: res.data,
      });
    });
  }

  onClose = () => {
    this.setState({
      visible: false,
      formData: defaultFormData,
    });
    if (this.state.actionType !== 'view') {
      this.actionForm.props.form.resetFields();
      this.actionForm.state.data = [];
      this.actionForm.state.value = undefined;
      this.actionForm.state.info = { };
    }
  };

  onSubmit = () => {
    const { confirmLoading, paymentNo } = this.state;
    if (confirmLoading) return;
    this.actionForm.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        confirmRefundApi({
          ...values,
          paymentNo
        }).then(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          }, () => {
            this.actionForm.props.form.resetFields();
            this.props.callback();
          });
          message.success('确认退费成功');
        }).catch(() => {
          this.setState({ confirmLoading: false });
        });
      }
    });
  }

  render() {
    const {
      actionType, loading, visible, formData, viewData,
    } = this.state;

    const title = actionType === 'add' ? '确认医院退费还款' : '不明入账详情';

    return (
      <Drawer
        title={title}
        width={720}
        onClose={this.onClose}
        visible={visible}
      >
        <Spin spinning={loading}>
          <div>
            {actionType === 'add' ? (
              <ConfirmForm
                wrappedComponentRef={(form) => this.actionForm = form}
                originData={formData}
              >
              </ConfirmForm>
            ) : (
              <ViewForm originData={viewData}></ViewForm>
            )}

          </div>
        </Spin>
        {actionType === 'add' ? (
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
            <Button onClick={this.onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={this.onSubmit} type="primary">
              确定
            </Button>
          </div>
        ) : null}
      </Drawer>
    );
  }
}

export default ActionDrawer;
