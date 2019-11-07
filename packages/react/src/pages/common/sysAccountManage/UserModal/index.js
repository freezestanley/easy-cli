import React, { Component } from 'react';
import { Modal, Spin } from 'antd';
import UserForm from './UserForm.js';
import { getRoleApi, addUserApi, updateUserApi, } from 'api/common/sysAccountManage';

const defaultFormData = {
  name: '',
  phone: '',
  email: '',
  loginName: '',
  roleId: '',
};

class UserModal extends Component {
  state = {
    loading: false,
    modalType: 'add',
    visible: false,
    confirmLoading: false,
    formData: defaultFormData,
    roleData: [],
  };

  componentDidMount() {
    this.getRoleData();
  }

  getRoleData() {
    if (this.state.loading) return;
    this.setState({ loading: true });

    getRoleApi().then(data => {
      this.setState({
        roleData: data.data.list,
      });
    }).finally(() => {
      this.setState({ loading: false });
    });
  }

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
        console.log('userinfo:', values);
        let api = modalType === 'add' ? addUserApi : updateUserApi;
        api({
          ...values,
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
            <UserForm
              wrappedComponentRef={(form) => this.userForm = form}
              originData={formData}
              roleData={roleData}
              modalType={modalType}
            >
            </UserForm>
          </Spin>
        </Modal>
      </div>
    );
  }
}

export default UserModal;
