import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import InfoForm from './InfoForm.js';
import { addApi, editApi, } from 'api/plat/partnershipManage';

const defaultFormData = {
  insureId: '',
  insureName: '',
  fundId: '',
  fundName: '',
};

class ShipModal extends Component {
  state = {
    loading: false,
    modalType: 'add',
    visible: false,
    confirmLoading: false,
    formData: defaultFormData,
    roleData: [],
  };

  showModal = (type, data) => {
    this.setState({
      modalType: type,
      visible: true,
      formData: data || defaultFormData,
    });
  };

  handleOk = () => {
    const { modalType, formData, confirmLoading } = this.state;
    if (confirmLoading) return;
    this.userForm.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        console.log('userinfo:', {
          insureId: values.insure.key,
          insureName: values.insure.label,
          fundId: values.fund.key,
          fundName: values.fund.label,
        });
        
        let api = modalType === 'add' ? addApi : editApi;
        api({
          insureId: values.insure.key,
          insureName: values.insure.label,
          fundId: values.fund.key,
          fundName: values.fund.label,
          id: formData.id,
        }).then(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          }, () => {
            this.userForm.props.form.resetFields();
            this.props.callback();
          });
        }).catch(() => {
          this.setState({ confirmLoading: false });
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.userForm.props.form.resetFields();
    this.userForm.state.insData = [];
    this.userForm.state.fundData = [];
  };

  render() {
    const {
      loading, visible, confirmLoading, modalType, formData, roleData,
    } = this.state;
    return (
      <div>
        <Modal
          title={modalType === 'add' ? '新建' : '编辑'}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Spin spinning={loading}>
            <InfoForm
              wrappedComponentRef={(form) => this.userForm = form}
              originData={formData}
              roleData={roleData}
              modalType={modalType}
            >
            </InfoForm>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default ShipModal;
